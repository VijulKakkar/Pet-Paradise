
import React from 'react';
import { useData } from '../../context/DataContext';
import { ServiceProvider } from '../../types';
import Card from '../common/Card';
import { Briefcase, ArrowLeft, PlusCircle } from 'lucide-react';

interface ProviderSelectionProps {
    onSelectProvider: (providerId: string) => void;
    onBack: () => void;
    onRegisterNew: () => void;
}

const ProviderSelection: React.FC<ProviderSelectionProps> = ({ onSelectProvider, onBack, onRegisterNew }) => {
    const { providers } = useData();

    return (
        <div className="max-w-4xl mx-auto p-6 lg:p-8">
            <div className="text-center mb-8">
                <h1 className="text-4xl font-bold text-slate-800">Select a Provider</h1>
                <p className="mt-2 text-lg text-slate-600">Choose which service provider account you'd like to manage, or register a new one.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {providers.map(provider => (
                    <Card 
                        key={provider.id} 
                        onClick={() => onSelectProvider(provider.id)}
                        className="p-6 text-center"
                    >
                        <Briefcase className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                        <h2 className="text-xl font-bold text-slate-800">{provider.name}</h2>
                        <p className="text-slate-500">{provider.type}</p>
                    </Card>
                ))}
                 <Card 
                    key="add-new-provider" 
                    onClick={onRegisterNew}
                    className="p-6 text-center flex flex-col items-center justify-center border-2 border-dashed border-slate-300 hover:border-cyan-500 hover:bg-slate-50 text-slate-600 hover:text-cyan-600 cursor-pointer"
                >
                    <PlusCircle className="w-12 h-12 mx-auto mb-4" />
                    <h2 className="text-xl font-bold">Register New Service</h2>
                    <p className="text-slate-500 mt-1">List your business on Pet Paradise</p>
                </Card>
            </div>
        </div>
    );
};

export default ProviderSelection;