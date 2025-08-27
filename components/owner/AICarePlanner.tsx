
import React, { useState, useCallback } from 'react';
import { Pet } from '../../types';
import { getAIBasedCarePlan, getAISymptomTriage } from '../../services/geminiService';
import { BrainCircuit, Sparkles, Send, FileQuestion } from 'lucide-react';
import Card from '../common/Card';

interface AICarePlannerProps {
    pet: Pet;
}

const AICarePlanner: React.FC<AICarePlannerProps> = ({ pet }) => {
    const [carePlan, setCarePlan] = useState<string>('');
    const [triageResult, setTriageResult] = useState<string>('');
    const [symptoms, setSymptoms] = useState<string>('');
    const [isPlanLoading, setIsPlanLoading] = useState<boolean>(false);
    const [isTriageLoading, setIsTriageLoading] = useState<boolean>(false);

    const handleGeneratePlan = useCallback(async () => {
        setIsPlanLoading(true);
        setCarePlan('');
        const result = await getAIBasedCarePlan(pet);
        setCarePlan(result);
        setIsPlanLoading(false);
    }, [pet]);

    const handleSymptomCheck = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!symptoms.trim()) return;
        setIsTriageLoading(true);
        setTriageResult('');
        const result = await getAISymptomTriage(pet, symptoms);
        setTriageResult(result);
        setIsTriageLoading(false);
    }, [pet, symptoms]);

    const LoadingSpinner = () => (
        <div className="flex items-center justify-center gap-2 text-slate-500">
            <svg className="animate-spin h-5 w-5 text-cyan-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span>Thinking...</span>
        </div>
    );
    
    return (
        <div className="space-y-8">
             <Card>
                <div className="p-6">
                    <div className="flex items-center gap-3">
                        <BrainCircuit className="w-8 h-8 text-cyan-500" />
                        <h3 className="text-xl font-bold text-slate-700">AI-Powered Care Plan</h3>
                    </div>
                    <p className="mt-2 text-slate-500">
                        Get personalized diet, exercise, and grooming recommendations for {pet.name} based on their profile.
                    </p>
                    <button
                        onClick={handleGeneratePlan}
                        disabled={isPlanLoading}
                        className="mt-4 inline-flex items-center gap-2 bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors disabled:bg-slate-400"
                    >
                        <Sparkles size={20} />
                        {isPlanLoading ? 'Generating...' : 'Generate Care Plan'}
                    </button>
                </div>
                {isPlanLoading && <div className="p-6 border-t border-slate-200"><LoadingSpinner /></div>}
                {carePlan && (
                    <div className="p-6 border-t border-slate-200">
                        <pre className="text-slate-700 whitespace-pre-wrap font-sans bg-slate-50 p-4 rounded-md">{carePlan}</pre>
                    </div>
                )}
            </Card>

            <Card>
                <div className="p-6">
                     <div className="flex items-center gap-3">
                        <FileQuestion className="w-8 h-8 text-orange-500" />
                        <h3 className="text-xl font-bold text-slate-700">Symptom Checker</h3>
                    </div>
                    <p className="mt-2 text-slate-500">
                        Describe {pet.name}'s symptoms to get instant triage advice. <span className="font-semibold">Not a substitute for veterinary diagnosis.</span>
                    </p>
                    <form onSubmit={handleSymptomCheck} className="mt-4 space-y-3">
                        <textarea
                            value={symptoms}
                            onChange={(e) => setSymptoms(e.target.value)}
                            placeholder="e.g., 'lethargic and not eating for a day', 'coughing after drinking water'"
                            rows={3}
                            className="w-full p-2 border border-slate-300 rounded-lg focus:ring-cyan-500 focus:border-cyan-500"
                        />
                        <button
                            type="submit"
                            disabled={isTriageLoading || !symptoms.trim()}
                            className="inline-flex items-center gap-2 bg-orange-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-orange-600 transition-colors disabled:bg-slate-400"
                        >
                            <Send size={20} />
                            {isTriageLoading ? 'Analyzing...' : 'Check Symptoms'}
                        </button>
                    </form>
                </div>
                {isTriageLoading && <div className="p-6 border-t border-slate-200"><LoadingSpinner /></div>}
                {triageResult && (
                    <div className="p-6 border-t border-slate-200">
                         <pre className="text-slate-700 whitespace-pre-wrap font-sans bg-orange-50 p-4 rounded-md">{triageResult}</pre>
                    </div>
                )}
            </Card>
        </div>
    );
};

export default AICarePlanner;
