import React, { useState, useMemo } from 'react';
import { CheckCircle2, XCircle, RefreshCw, AlertCircle, TrendingUp, Clock, Zap, AlertTriangle, ChevronsRight, Target, HeartHandshake, DollarSign, ChevronDown, ChevronUp, FileText, Bot, Layers, Palette } from 'lucide-react';
import Card from '../common/Card';
import Modal from '../common/Modal';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';


interface ErrorDetail {
    testCase: string;
    reason: string;
    expected: string;
    actual: string;
}

interface Evaluation {
  id: string;
  name: string;
  description: string;
  status: 'Passed' | 'Failed' | 'Running' | 'Not Run';
  lastRun: string;
  metrics?: {
    successRate?: number;
    avgLatency?: number;
    errorCount?: number;
  };
  errorDetails?: ErrorDetail[];
  businessImpact?: {
    problem: string;
    impact: string;
    recommendation: string;
  };
}

interface EvaluationGroup {
  id:string;
  title: string;
  icon: React.ElementType;
  whyItMatters: string;
  goal: string;
  evaluations: Evaluation[];
}

const mockEvals: EvaluationGroup[] = [
  {
    id: 'core_funnels',
    title: 'Task-Based UX Evals',
    icon: Target,
    whyItMatters: "Validates our most critical user workflows. Failures here directly impact user retention, task success, and revenue.",
    goal: 'Validate Persona Workflows & Success Rates',
    evaluations: [
      {
        id: 'eval_1',
        name: 'Create Pet Profile',
        description: 'Ensures users can seamlessly create a new pet profile without errors.',
        status: 'Passed',
        lastRun: new Date(Date.now() - 1 * 60 * 60 * 1000).toISOString(),
        metrics: { successRate: 99.8, avgLatency: 850 },
      },
      {
        id: 'eval_2',
        name: 'Book, View & Cancel Appointments',
        description: 'Tests the end-to-end appointment management lifecycle for pet owners.',
        status: 'Failed',
        lastRun: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
        metrics: { successRate: 82.3, avgLatency: 1250, errorCount: 18 },
        errorDetails: [
          {
            testCase: "User clicks 'Cancel Appointment' button for a confirmed upcoming appointment.",
            reason: "The frontend confirmation action is not correctly triggering the `updateAppointmentStatus` function in the DataContext, resulting in no state change.",
            expected: "Appointment status changes to 'Cancelled', the UI updates, and the provider's slot becomes available again.",
            actual: "The UI shows no change. The appointment remains 'Confirmed' in the system, causing user confusion and blocking the slot."
          },
        ],
        businessImpact: {
            problem: "Users cannot cancel their appointments. The action fails silently without any feedback to the user or change in the system.",
            impact: "This is a critical failure of a core user journey. It leads to user frustration, increased customer support contacts, and no-shows for providers. This undermines the reliability of our platform and directly impacts provider revenue and user trust.",
            recommendation: "Elevate to P0. Assign dedicated engineering resources to patch the cancellation workflow immediately. ETA: 2 hours."
        }
      },
      {
        id: 'eval_3',
        name: 'View & Update Pet Health Record',
        description: 'Validates that users can add, view, and modify health records accurately.',
        status: 'Passed',
        lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        metrics: { successRate: 99.5, avgLatency: 600 },
      },
       {
        id: 'eval_4',
        name: 'View Provider Board & Services Info',
        description: 'Checks that provider profiles and service lists are displayed correctly and are up-to-date.',
        status: 'Passed',
        lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        metrics: { successRate: 100, avgLatency: 350 },
      },
      {
        id: 'eval_marketplace_view',
        name: 'View Pet Store Products',
        description: 'Ensures product images, descriptions, and prices are displayed correctly in the marketplace.',
        status: 'Failed',
        lastRun: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
        metrics: { successRate: 60, avgLatency: 450, errorCount: 38 },
        errorDetails: [
          {
            testCase: "User navigates to the Pet Store and views any product category.",
            reason: "The `imageUrl` property for many products in `demoData.ts` is pointing to URLs that are not loading correctly. This could be due to broken links, network issues, or third-party service unavailability (e.g., Unsplash).",
            expected: "All product cards display a valid, non-placeholder image for the product.",
            actual: "Many product cards are displayed with broken image icons, degrading the user experience and trust in the store."
          },
        ],
        businessImpact: {
            problem: "Product images are not loading across the Pet Store.",
            impact: "This severely degrades the shopping experience, making the store look unprofessional and untrustworthy. It will likely lead to a significant drop in product sales and user disengagement with the feature.",
            recommendation: "Elevate to P1. Investigate the root cause of the image loading failure (e.g., broken links, CDN issue). Roll back or patch immediately. ETA: 4 hours."
        }
      },
    ],
  },
  {
    id: 'ai_features',
    title: 'AI Feature Specific Evals',
    icon: Bot,
    whyItMatters: "Our AI is a key differentiator. These tests ensure its usability, accuracy, and authenticity, building user trust.",
    goal: "Validate UI Usability & Authenticity of Information",
    evaluations: [
      {
        id: 'eval_5',
        name: 'Help Pet Owner Easily Record Details',
        description: 'Evaluates the AI\'s ability to parse and store pet details from natural language input.',
        status: 'Passed',
        lastRun: new Date(Date.now() - 45 * 60 * 1000).toISOString(),
        metrics: { successRate: 97.2, avgLatency: 1100 },
      },
      {
        id: 'eval_6',
        name: 'Guide Owners to Schedule Appointments',
        description: 'Tests the conversational AI flow for guiding a user through the booking process.',
        status: 'Passed',
        lastRun: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        metrics: { successRate: 95.1, avgLatency: 1800 },
      },
      {
        id: 'eval_7',
        name: 'Showcase Service Provider Offerings',
        description: 'Checks if the AI can accurately describe and recommend provider services based on user queries.',
        status: 'Passed',
        lastRun: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
        metrics: { successRate: 98.0, avgLatency: 950 },
      },
    ],
  },
  {
    id: 'design_usability',
    title: 'Visual Design & Usability Evals',
    icon: Palette,
    whyItMatters: "A polished and intuitive design is crucial for user satisfaction. These evals check for clarity and accessibility.",
    goal: "Accessibility Evaluation & Clarity in the design",
    evaluations: [
       { id: 'eval_8', name: 'Easy Usability of the Prototype', description: 'Tests the overall navigational flow and ease of use across the app.', status: 'Passed', lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), metrics: { successRate: 98 } },
       { id: 'eval_9', name: 'Clickable Elements & Icon Clarity', description: 'Verifies that all interactive elements are clearly identifiable and icons are intuitive.', status: 'Passed', lastRun: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), metrics: { successRate: 99 } },
       { id: 'eval_10', name: 'User Connection with the App', description: 'Qualitative analysis of user session recordings to measure engagement.', status: 'Not Run', lastRun: 'N/A' },
    ]
  },
   {
    id: 'prototype_mock_demo',
    title: 'Platform & Frontend Integrity Evals',
    icon: Layers,
    whyItMatters: "Ensures the fundamental building blocks of our UI are correct, consistent, and performant.",
    goal: "Observe and Correct on clarity and usability",
    evaluations: [
       { id: 'eval_11', name: 'Prompt Correctness', description: 'Verifies that AI prompts are grammatically correct and clearly guide the user.', status: 'Passed', lastRun: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(), metrics: { successRate: 100 } },
       { id: 'eval_12', name: 'Design Consistency', description: 'Automated visual regression testing to check for design consistency across pages.', status: 'Passed', lastRun: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), metrics: { successRate: 99.1 } },
       { id: 'eval_13', name: 'Font, Alignment & Readability', description: 'Checks for adherence to typography guidelines and readability standards.', status: 'Passed', lastRun: new Date(Date.now() - 12 * 60 * 60 * 1000).toISOString(), metrics: { successRate: 99.5 } },
    ]
  }
];

const healthTrendData = [
  { name: '30 days ago', score: 98 },
  { name: '20 days ago', score: 95 },
  { name: '10 days ago', score: 96 },
  { name: 'Today', score: 85 },
];

const StatusBadge: React.FC<{ status: Evaluation['status'] }> = ({ status }) => {
    const styles = { Passed: 'bg-green-100 text-green-800', Failed: 'bg-red-100 text-red-800', Running: 'bg-blue-100 text-blue-800', 'Not Run': 'bg-slate-100 text-slate-800' };
    const icons = { Passed: CheckCircle2, Failed: XCircle, Running: RefreshCw, 'Not Run': AlertCircle };
    const Icon = icons[status];
    return (
        <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}>
            <Icon size={14} className={status === 'Running' ? 'animate-spin' : ''} />
            {status}
        </span>
    );
};

const ExecutiveSummary: React.FC<{ evals: EvaluationGroup[] }> = ({ evals }) => {
    const { overallScore, totalEvals, passedEvals, failedEvals } = useMemo(() => {
        const allEvals = evals.flatMap(g => g.evaluations).filter(e => e.status !== 'Not Run');
        const passedCount = allEvals.filter(e => e.status === 'Passed').length;
        const failedCount = allEvals.filter(e => e.status === 'Failed').length;
        return {
            overallScore: allEvals.length > 0 ? Math.round((passedCount / allEvals.length) * 100) : 100,
            totalEvals: allEvals.length,
            passedEvals: passedCount,
            failedEvals: failedCount,
        };
    }, [evals]);

    const criticalFailures = evals.flatMap(g => g.evaluations).filter(e => e.status === 'Failed');

    return (
        <Card className="p-6 mb-8 bg-white">
            <h2 className="text-2xl font-bold text-slate-800 mb-1">Executive Summary</h2>
            <p className="text-slate-600 mb-6 text-base">This dashboard translates system health and AI performance into direct business impact, enabling data-driven decisions to protect user satisfaction and mitigate revenue risk.</p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="p-4 flex flex-col items-center justify-center text-center bg-slate-50">
                        <div className="relative w-32 h-32">
                             <svg className="w-full h-full" viewBox="0 0 36 36">
                                <path className="text-slate-200" strokeWidth="3" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                                <path className={overallScore > 90 ? "text-green-500" : overallScore > 75 ? "text-yellow-500" : "text-red-500"} strokeWidth="3" fill="none" strokeDasharray={`${overallScore}, 100`} d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <span className="text-4xl font-extrabold text-slate-800">{overallScore}</span>
                                <span className="text-sm font-semibold text-slate-500">Health Score</span>
                            </div>
                        </div>
                    </Card>
                    <Card className="p-4 flex flex-col justify-center">
                        <Target size={24} className="text-cyan-500 mb-2"/>
                        <p className="text-sm text-slate-500">Evals Passing</p>
                        <p className="text-3xl font-bold text-slate-800">{passedEvals} <span className="text-lg font-medium text-slate-500">/ {totalEvals}</span></p>
                        <p className="text-xs text-red-600 font-semibold flex items-center gap-1"><TrendingUp size={12} className="transform -rotate-45"/> {failedEvals} Failure{failedEvals !== 1 && 's'}</p>
                    </Card>
                     <Card className="p-4 flex flex-col justify-center">
                        <HeartHandshake size={24} className="text-pink-500 mb-2"/>
                        <p className="text-sm text-slate-500">User Satisfaction (est.)</p>
                        <p className="text-3xl font-bold text-slate-800">92%</p>
                        <p className="text-xs text-slate-500">Stable</p>
                    </Card>
                     <Card className="p-4 flex flex-col justify-center bg-amber-50 border border-amber-200">
                        <DollarSign size={24} className="text-amber-600 mb-2"/>
                        <p className="text-sm text-amber-700">Est. Risk Exposure</p>
                        <p className="text-3xl font-bold text-amber-800">$1.5k<span className="text-lg">/day</span></p>
                        <p className="text-xs text-amber-600 font-semibold">From booking failures</p>
                    </Card>
                </div>
                <div className="lg:col-span-1">
                    <h3 className="font-bold text-slate-700 mb-2">Health Score Over Time</h3>
                    <ResponsiveContainer width="100%" height={160}>
                        <LineChart data={healthTrendData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="name" tick={{fontSize: 10}} axisLine={false} tickLine={false} />
                            <YAxis domain={[70, 100]} hide />
                            <Tooltip />
                            <Line type="monotone" dataKey="score" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }}/>
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </div>
            {criticalFailures.length > 0 && (
                <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                    <h3 className="font-bold text-red-800 flex items-center gap-2 mb-2"><AlertTriangle size={20}/> Priority Intel: {criticalFailures.length} Critical Failure{criticalFailures.length > 1 && 's'}</h3>
                    <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
                         {criticalFailures.map(failure => (
                            <li key={failure.id}>
                                <span className="font-semibold">{failure.name}:</span> {failure.businessImpact?.problem || failure.description}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </Card>
    )
};

const ErrorDetailsModal: React.FC<{ evalItem: Evaluation; onClose: () => void; }> = ({ evalItem, onClose }) => {
    const [isTechDetailsOpen, setIsTechDetailsOpen] = useState(false);
    return (
        <Modal isOpen={!!evalItem} onClose={onClose} title={`Failure Analysis: ${evalItem.name}`}>
            <div className="space-y-4 max-h-[80vh] overflow-y-auto pr-2 -mr-2">
                {evalItem.businessImpact && (
                    <Card className="p-4 bg-red-50 border-red-200">
                        <h3 className="font-bold text-red-800 text-lg">Business Impact Analysis</h3>
                        <div className="mt-3 text-sm space-y-3">
                            <div>
                                <p className="font-semibold text-slate-700">The Problem:</p>
                                <p className="text-slate-600">{evalItem.businessImpact.problem}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700">Business Impact:</p>
                                <p className="text-slate-600">{evalItem.businessImpact.impact}</p>
                            </div>
                            <div>
                                <p className="font-semibold text-slate-700">Recommendation:</p>
                                <p className="text-slate-600">{evalItem.businessImpact.recommendation}</p>
                            </div>
                        </div>
                    </Card>
                )}

                <div>
                    <button onClick={() => setIsTechDetailsOpen(!isTechDetailsOpen)} className="w-full flex justify-between items-center p-2 text-left font-semibold text-slate-700">
                        <span>Technical Root Cause</span>
                        {isTechDetailsOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                    </button>
                    {isTechDetailsOpen && (
                        <div className="mt-2 space-y-4 animate-fade-in">
                            {evalItem.errorDetails?.map((error, index) => (
                                <Card key={index} className="p-4 bg-white">
                                    <p className="font-semibold text-slate-800 flex items-center gap-2">
                                        <FileText size={18} className="text-slate-500" />
                                        Test Case: <span className="font-normal text-slate-700">"{error.testCase}"</span>
                                    </p>
                                    <div className="mt-3 text-sm space-y-3 pl-2 border-l-2 border-slate-200 ml-3">
                                        <div>
                                            <p className="font-semibold text-slate-600">Reason for Failure:</p>
                                            <p className="text-slate-800">{error.reason}</p>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-600">Expected Output:</p>
                                            <div className="font-mono bg-green-50 text-green-900 p-2 rounded text-xs mt-1 border border-green-200">{error.expected}</div>
                                        </div>
                                        <div>
                                            <p className="font-semibold text-slate-600">Actual Output:</p>
                                            <div className="font-mono bg-red-50 text-red-900 p-2 rounded text-xs mt-1 border border-red-200">{error.actual}</div>
                                        </div>
                                    </div>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>
                 <style>{`
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(-10px); }
                        to { opacity: 1; translateY(0); }
                    }
                    .animate-fade-in { animation: fade-in 0.3s ease-out forwards; }
                `}</style>
            </div>
        </Modal>
    );
};

const EvalsView: React.FC = () => {
    const [viewingEvalDetails, setViewingEvalDetails] = useState<Evaluation | null>(null);

    return (
        <>
            <div className="space-y-10">
                <ExecutiveSummary evals={mockEvals} />

                {mockEvals.map((group) => (
                    <div key={group.id}>
                        <div className="mb-4 p-4 bg-white rounded-lg shadow-sm border border-slate-200">
                            <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3"><group.icon size={24} className="text-cyan-600" />{group.title}</h3>
                            <p className="text-slate-600 mt-1 font-semibold text-cyan-700 border-b border-cyan-100 pb-2 mb-2">Goal: {group.goal}</p>
                            <p className="text-sm text-slate-500">{group.whyItMatters}</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                            {group.evaluations.map((evalItem) => (
                                <Card key={evalItem.id} className="flex flex-col hover:shadow-lg transition-shadow duration-300">
                                    <div className="p-5 flex-grow">
                                        <div className="flex justify-between items-start">
                                            <h4 className="font-bold text-slate-800 text-base pr-4">{evalItem.name}</h4>
                                            <StatusBadge status={evalItem.status} />
                                        </div>
                                        <p className="text-sm text-slate-500 mt-2">{evalItem.description}</p>
                                    </div>
                                    <div className="bg-slate-50 border-t border-slate-200 p-4 space-y-3">
                                        <div className="flex items-center justify-between text-xs text-slate-500">
                                            <div className="flex items-center gap-1.5"><Clock size={12} /><span>Last Run: {evalItem.status === 'Not Run' ? 'N/A' : new Date(evalItem.lastRun).toLocaleTimeString()}</span></div>
                                            {evalItem.metrics?.avgLatency && <div className="flex items-center gap-1.5"><Zap size={12} /><span>{evalItem.metrics.avgLatency}ms</span></div>}
                                        </div>
                                        {evalItem.status === 'Failed' && (
                                            <button
                                                onClick={() => setViewingEvalDetails(evalItem)}
                                                className="w-full text-center mt-1 text-sm font-semibold text-red-600 hover:text-red-800 bg-red-100 hover:bg-red-200 py-1.5 px-3 rounded-md transition-colors flex items-center justify-center gap-2"
                                            >
                                                Analyze Failure <ChevronsRight size={16} />
                                            </button>
                                        )}
                                    </div>
                                </Card>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            {viewingEvalDetails && (
                <ErrorDetailsModal evalItem={viewingEvalDetails} onClose={() => setViewingEvalDetails(null)} />
            )}
        </>
    );
};

export default EvalsView;