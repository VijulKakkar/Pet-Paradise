
import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { getAIResourceInfo, AIResourceResponse } from '../../services/geminiService';
import { Search, Link as LinkIcon, BookOpen } from 'lucide-react';
import Card from '../common/Card';

const Resources: React.FC = () => {
  const { tutorials } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<AIResourceResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchTerm.trim()) {
      setSearchResult(null);
      return;
    }

    setIsLoading(true);
    setSearchResult(null);
    setError(null);

    try {
      const result = await getAIResourceInfo(searchTerm);
      setSearchResult(result);
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const LoadingState = () => (
    <Card className="p-6 text-center">
      <div className="flex items-center justify-center gap-3 text-slate-600">
        <svg className="animate-spin h-6 w-6 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
        <span className="font-semibold text-lg">Searching for the best pet care info...</span>
      </div>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-700">Pawsitive Care Hub</h3>
        <p className="text-slate-500 mt-1">Ask anything about pet care and get instant, reliable answers.</p>
      </div>
      
      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          placeholder="Search for topics like 'how to trim dog nails', 'cat nutrition', etc."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
          className="w-full pl-4 pr-28 py-3 border border-slate-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500 text-base"
        />
        <button 
          type="submit"
          className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-slate-400"
          disabled={isLoading || !searchTerm.trim()}
        >
          <Search size={18} /> Search
        </button>
      </form>

      <div className="space-y-4">
        {isLoading && <LoadingState />}
        
        {error && <Card className="p-5 bg-red-50 border-red-200"><p className="text-red-700 font-semibold">{error}</p></Card>}

        {searchResult && (
          <Card className="animate-fade-in">
            <div className="p-6">
              <h4 className="text-xl font-bold mt-1 text-slate-800">Search Results for "{searchTerm}"</h4>
              <p className="mt-4 text-slate-700 whitespace-pre-wrap font-sans leading-relaxed">{searchResult.text}</p>
            </div>
            {searchResult.sources && searchResult.sources.length > 0 && (
              <div className="p-6 border-t border-slate-200 bg-slate-50">
                <h5 className="font-bold text-slate-600 flex items-center gap-2 mb-3">
                  <LinkIcon size={18}/>
                  Sources
                </h5>
                <ul className="space-y-2">
                  {searchResult.sources.map((source, index) => (
                    <li key={index}>
                      <a 
                        href={source.web.uri}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-cyan-700 hover:text-cyan-900 hover:underline flex items-center gap-2"
                      >
                        <span>{source.web.title}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </Card>
        )}

        {!isLoading && !searchResult && (
          <div>
            <h4 className="text-lg font-semibold text-slate-600 mb-3 flex items-center gap-2">
              <BookOpen size={20} />
              Quick Guides
            </h4>
            <div className="space-y-4">
              {tutorials.map(tutorial => (
                <Card key={tutorial.id} className="p-5">
                  <p className="text-sm font-semibold text-cyan-600">{tutorial.category}</p>
                  <h4 className="text-lg font-bold mt-1 text-slate-800">{tutorial.title}</h4>
                  <p className="mt-2 text-slate-600 whitespace-pre-line">{tutorial.content}</p>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Resources;
