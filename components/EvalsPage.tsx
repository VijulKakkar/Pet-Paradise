import React from 'react';
import EvalsView from './provider/EvalsView';

const EvalsPage: React.FC = () => {
  return (
    <div className="bg-slate-50 min-h-[calc(100vh-4rem)] p-4 sm:p-6 lg:p-8">
        <div className="max-w-screen-2xl mx-auto">
             <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">System Health & AI Evaluation Dashboard</h1>
            <p className="text-lg text-slate-600 mb-8">
                A real-time dashboard monitoring the health and business impact of our core product funnels and AI systems.
            </p>
            <EvalsView />
        </div>
    </div>
  );
};

export default EvalsPage;