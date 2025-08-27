
import React, { useState } from 'react';
import { Pet, HealthRecord, PetDocument, WeightEntry } from '../../types';
import { useData } from '../../context/DataContext';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PlusCircle, FileText, HeartPulse, Pill, TestTube, Scale, Upload, Download, ArrowUpRight, ArrowDownRight, Minus, TrendingUp, BarChart3 } from 'lucide-react';
import Card from '../common/Card';
import Modal from '../common/Modal';

interface HealthManagerProps {
  pet: Pet;
}

const HealthManager: React.FC<HealthManagerProps> = ({ pet, }) => {
  const { updatePet } = useData();

  const [isRecordModalOpen, setRecordModalOpen] = useState(false);
  const [isDocModalOpen, setDocModalOpen] = useState(false);
  const [isWeightModalOpen, setWeightModalOpen] = useState(false);
  const [weightView, setWeightView] = useState<'chart' | 'log'>('chart');

  const sortedWeightLog = [...pet.weightLog].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const latestWeight = sortedWeightLog.length > 0 ? sortedWeightLog[sortedWeightLog.length - 1] : null;
  const previousWeight = sortedWeightLog.length > 1 ? sortedWeightLog[sortedWeightLog.length - 2] : null;
  let weightChange: number | null = null;
  if (latestWeight && previousWeight) {
      weightChange = latestWeight.weight - previousWeight.weight;
  }

  const getRecordIcon = (type: HealthRecord['type']) => {
    switch (type) {
      case 'Vaccination': return <HeartPulse className="text-blue-500" />;
      case 'Vet Visit': return <HeartPulse className="text-green-500" />;
      case 'Medication': return <Pill className="text-purple-500" />;
      case 'Allergy': return <TestTube className="text-red-500" />;
      default: return <HeartPulse className="text-slate-500" />;
    }
  };
  
  const handleAddRecord = (record: Omit<HealthRecord, 'id'>) => {
    const newRecord = { ...record, id: `hr_${Date.now()}` };
    const updatedPet = { ...pet, healthRecords: [...pet.healthRecords, newRecord] };
    updatePet(updatedPet);
  };
  
  const handleAddDocument = (doc: Omit<PetDocument, 'id' | 'uploadDate'>) => {
    const newDoc = { ...doc, id: `doc_${Date.now()}`, uploadDate: new Date().toISOString() };
    const updatedPet = { ...pet, documents: [...pet.documents, newDoc] };
    updatePet(updatedPet);
  };

  const handleAddWeight = (entry: Omit<WeightEntry, ''>) => {
    const updatedPet = { ...pet, weightLog: [...pet.weightLog, entry] };
    updatePet(updatedPet);
  };

  const HealthRecordForm = ({ onClose }: { onClose: () => void }) => {
    const [type, setType] = useState<HealthRecord['type']>('Vet Visit');
    const [title, setTitle] = useState('');
    const [date, setDate] = useState('');
    const [details, setDetails] = useState('');
    const [nextDueDate, setNextDueDate] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleAddRecord({ type, title, date, details, nextDueDate: nextDueDate || undefined });
      onClose();
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Record Type</label>
          <select value={type} onChange={(e) => setType(e.target.value as HealthRecord['type'])} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500">
            <option>Vet Visit</option>
            <option>Vaccination</option>
            <option>Medication</option>
            <option>Allergy</option>
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Title / Name</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
        </div>
         {type === 'Vaccination' && (
          <div>
            <label className="block text-sm font-medium text-slate-700">Next Due Date (optional)</label>
            <input type="date" value={nextDueDate} onChange={(e) => setNextDueDate(e.target.value)} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
          </div>
        )}
        <div>
          <label className="block text-sm font-medium text-slate-700">Details / Notes</label>
          <textarea value={details} onChange={(e) => setDetails(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
        </div>
        <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
            <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700">Add Record</button>
        </div>
      </form>
    );
  };
  
  const DocumentForm = ({ onClose }: { onClose: () => void }) => {
    const [name, setName] = useState('');
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
            if (!name) {
                setName(e.target.files[0].name);
            }
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!file || !name) {
            alert("Please provide a document name and select a file.");
            return;
        }

        const reader = new FileReader();
        reader.onload = (event) => {
            if (event.target?.result) {
                handleAddDocument({ 
                    name, 
                    fileName: file.name,
                    mimeType: file.type,
                    content: event.target.result as string 
                });
                onClose();
            }
        };
        reader.onerror = (error) => {
            console.error("Error reading file:", error);
            alert("Sorry, there was an error uploading the file.");
        };
        reader.readAsDataURL(file);
    };

    return (
       <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="docName" className="block text-sm font-medium text-slate-700">Document Name</label>
          <input id="docName" type="text" value={name} onChange={(e) => setName(e.target.value)} required placeholder="e.g., Lab Results March 2024" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
        </div>
        <div>
          <label htmlFor="file-upload" className="block text-sm font-medium text-slate-700">File</label>
          <div className="mt-2 flex justify-center rounded-lg border border-dashed border-slate-900/25 px-6 py-10">
            <div className="text-center">
              <Upload className="mx-auto h-12 w-12 text-slate-300" aria-hidden="true" />
              <div className="mt-4 flex text-sm leading-6 text-slate-600">
                <label htmlFor="file-upload" className="relative cursor-pointer rounded-md bg-white font-semibold text-cyan-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-cyan-600 focus-within:ring-offset-2 hover:text-cyan-500">
                  <span>Upload a file</span>
                  <input id="file-upload" name="file-upload" type="file" className="sr-only" onChange={handleFileChange} />
                </label>
                <p className="pl-1">or drag and drop</p>
              </div>
              {file ? (
                <p className="text-sm text-slate-500 mt-2 font-semibold">{file.name} ({(file.size / 1024).toFixed(2)} KB)</p>
              ) : (
                <p className="text-xs leading-5 text-slate-600">PDF, PNG, JPG, etc. up to 10MB</p>
              )}
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
            <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700">Save Document</button>
        </div>
      </form>
    )
  }

  const WeightForm = ({ onClose }: { onClose: () => void }) => {
    const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
    const [weight, setWeight] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      handleAddWeight({ date, weight: parseFloat(weight) });
      onClose();
    };
  
    return (
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-700">Date</label>
          <input type="date" value={date} onChange={e => setDate(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
        </div>
        <div>
          <label className="block text-sm font-medium text-slate-700">Weight (kg)</label>
          <input type="number" step="0.1" value={weight} onChange={e => setWeight(e.target.value)} required placeholder="e.g., 5.2" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"/>
        </div>
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
          <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700">Add Entry</button>
        </div>
      </form>
    );
  };
  

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-700">Health Records</h3>
            <button onClick={() => setRecordModalOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-800">
              <PlusCircle size={16} /> Add Record
            </button>
          </div>
          <div className="space-y-3">
            {pet.healthRecords.length > 0 ? pet.healthRecords.map(record => (
              <Card key={record.id} className="p-4">
                <div className="flex items-start gap-4">
                  <div className="mt-1">{getRecordIcon(record.type)}</div>
                  <div>
                    <p className="font-bold">{record.title}</p>
                    <p className="text-sm text-slate-500">{new Date(record.date).toLocaleDateString()}</p>
                    <p className="text-sm mt-1">{record.details}</p>
                    {record.nextDueDate && <p className="text-sm mt-1 font-semibold text-amber-600">Due: {new Date(record.nextDueDate).toLocaleDateString()}</p>}
                  </div>
                </div>
              </Card>
            )) : <p className="text-slate-500">No health records yet.</p>}
          </div>
        </div>
        <div>
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-slate-700">Documents</h3>
                <button onClick={() => setDocModalOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-800">
                    <Upload size={16} /> Add Document
                </button>
            </div>
             <div className="space-y-3">
                {pet.documents.length > 0 ? pet.documents.map(doc => (
                <Card key={doc.id} className="p-4">
                    <div className="flex justify-between items-center">
                        <div className="flex items-start gap-4">
                            <FileText className="text-slate-500 mt-1 flex-shrink-0" />
                            <div>
                                <p className="font-bold text-slate-800">{doc.name}</p>
                                <p className="text-sm text-slate-500">Uploaded: {new Date(doc.uploadDate).toLocaleDateString()}</p>
                            </div>
                        </div>
                        <a href={doc.content} download={doc.fileName} className="flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-800 bg-cyan-50 hover:bg-cyan-100 py-1 px-3 rounded-md transition-colors">
                            <Download size={14} /> Download
                        </a>
                    </div>
                </Card>
                )) : <p className="text-slate-500">No documents stored.</p>}
            </div>
        </div>
      </div>
      <div className="space-y-6">
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-700">Weight Tracking</h3>
            <button onClick={() => setWeightModalOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-800">
              <Scale size={16} /> Add Entry
            </button>
          </div>
          <Card className="p-4">
             {latestWeight && (
              <div className="p-4 mb-4 bg-slate-50 rounded-lg grid grid-cols-2 gap-4 text-center">
                <div>
                    <p className="text-sm text-slate-500">Latest Weight</p>
                    <p className="text-2xl font-bold text-slate-800">{latestWeight.weight.toFixed(1)} kg</p>
                    <p className="text-xs text-slate-400">{new Date(latestWeight.date).toLocaleDateString()}</p>
                </div>
                 <div>
                    <p className="text-sm text-slate-500">Change</p>
                    {weightChange !== null ? (
                        <div className={`flex items-center justify-center gap-1 text-2xl font-bold ${weightChange > 0 ? 'text-red-500' : weightChange < 0 ? 'text-green-500' : 'text-slate-800'}`}>
                           {weightChange === 0 && <Minus size={20}/>}
                           {weightChange > 0 && <ArrowUpRight size={20}/>}
                           {weightChange < 0 && <ArrowDownRight size={20}/>}
                           <span>{Math.abs(weightChange).toFixed(1)} kg</span>
                        </div>
                    ) : (
                        <p className="text-2xl font-bold text-slate-800">-</p>
                    )}
                    <p className="text-xs text-slate-400">since last entry</p>
                </div>
              </div>
            )}
             <div className="border-b border-slate-200 mb-4">
                <nav className="-mb-px flex space-x-6" aria-label="Tabs">
                    <button onClick={() => setWeightView('chart')} className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm ${weightView === 'chart' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                        <TrendingUp size={16} className="mr-2"/> Chart
                    </button>
                    <button onClick={() => setWeightView('log')} className={`group inline-flex items-center py-2 px-1 border-b-2 font-medium text-sm ${weightView === 'log' ? 'border-cyan-500 text-cyan-600' : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'}`}>
                        <BarChart3 size={16} className="mr-2"/> Log
                    </button>
                </nav>
            </div>
            
            {weightView === 'chart' && (
                sortedWeightLog.length > 1 ? (
                <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={sortedWeightLog} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" tickFormatter={(str) => new Date(str).toLocaleDateString('en-US', {month: 'short', year: '2-digit'})} />
                    <YAxis domain={['dataMin - 1', 'dataMax + 1']} />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="weight" stroke="#06b6d4" strokeWidth={2} name="Weight (kg)" />
                    </LineChart>
                </ResponsiveContainer>
                ) : (
                    <div className="h-[300px] flex items-center justify-center text-center">
                        <div>
                            <p className="text-slate-500">Add at least two weight entries to see a chart.</p>
                            <p className="text-sm text-slate-400 mt-1">Your pet's weight journey will be visualized here.</p>
                        </div>
                    </div>
                )
            )}

            {weightView === 'log' && (
                 <div className="max-h-[300px] overflow-y-auto space-y-2 pr-2">
                    {[...sortedWeightLog].reverse().map((entry, index) => (
                        <div key={index} className="flex justify-between items-center p-3 bg-slate-50 rounded-md">
                            <p className="font-semibold text-slate-700">{new Date(entry.date).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                            <p className="text-slate-600">{entry.weight.toFixed(1)} kg</p>
                        </div>
                    ))}
                    {sortedWeightLog.length === 0 && (
                        <div className="h-[300px] flex items-center justify-center text-center">
                            <p className="text-slate-500">No weight entries have been logged yet.</p>
                        </div>
                    )}
                </div>
            )}
          </Card>
        </div>
      </div>

      <Modal isOpen={isRecordModalOpen} onClose={() => setRecordModalOpen(false)} title="Add Health Record">
        <HealthRecordForm onClose={() => setRecordModalOpen(false)} />
      </Modal>

      <Modal isOpen={isDocModalOpen} onClose={() => setDocModalOpen(false)} title="Add Document">
        <DocumentForm onClose={() => setDocModalOpen(false)} />
      </Modal>

      <Modal isOpen={isWeightModalOpen} onClose={() => setWeightModalOpen(false)} title="Add Weight Entry">
        <WeightForm onClose={() => setWeightModalOpen(false)} />
      </Modal>
    </div>
  );
};

export default HealthManager;