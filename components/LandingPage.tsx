
import React from 'react';
import { UserRole } from '../types';
import { PawPrint, User, Briefcase, ClipboardCheck } from 'lucide-react';

interface LandingPageProps {
  onSelectRole: (role: UserRole) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onSelectRole }) => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen p-6 overflow-hidden">
      {/* Animated Gradient Background */}
      <div className="absolute inset-0 z-0 animated-gradient" />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center flex-grow text-center w-full">
        <div className="animate-fade-in-up">
          <PawPrint className="w-24 h-24 text-cyan-500 mx-auto mb-4 drop-shadow-md" />
          <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-slate-800">
            Welcome to Pet Paradise
          </h1>
          <p className="mt-4 text-xl md:text-2xl text-slate-600">
            Everything You Need for Healthier Pets and Happier Homes
          </p>
        </div>

        <div className="w-full max-w-6xl mt-16 animate-fade-in-up" style={{animationDelay: '0.3s'}}>
          <h2 className="text-3xl font-semibold mb-8 text-slate-700">
            Ready to Dive In? Let’s Go!
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <RoleCard 
              icon={<User size={32} className="text-cyan-500" />}
              title="I'm their Human"
              description="Manage your pet's health, appointments, and well-being with ease."
              onClick={() => onSelectRole(UserRole.PetOwner)}
            />
            <RoleCard 
              icon={<Briefcase size={32} className="text-teal-500" />}
              title="I care for pets Professionally"
              description="Streamline your appointment management and connect with pet owners."
              onClick={() => onSelectRole(UserRole.ServiceProvider)}
            />
            <RoleCard 
              icon={<ClipboardCheck size={32} className="text-indigo-500" />}
              title="I am a System Evaluator"
              description="Access high-level dashboards & deep-dive reports on AI performance and system health."
              onClick={() => onSelectRole(UserRole.Evaluator)}
            />
          </div>
        </div>
      </div>
      
      <style>{`
        .animated-gradient {
          background: linear-gradient(-45deg, #e0f7fa, #e8eaf6, #fce4ec, #e0f2f1);
          background-size: 400% 400%;
          animation: gradientBG 15s ease infinite;
        }

        @keyframes gradientBG {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        @keyframes fade-in-up {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up {
          animation: fade-in-up 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

interface RoleCardProps {
    icon: React.ReactNode;
    title: string;
    description: string;
    onClick: () => void;
}

const RoleCard: React.FC<RoleCardProps> = ({ icon, title, description, onClick }) => {
    return (
        <div 
            onClick={onClick}
            className="
                group p-8 text-center bg-white/70 backdrop-blur-sm 
                rounded-2xl border border-white/30 shadow-lg transition-all duration-300 
                hover:bg-white/90 hover:shadow-xl hover:-translate-y-2 cursor-pointer
            "
        >
            <div className="w-16 h-16 mx-auto mb-6 rounded-full flex items-center justify-center bg-white/50 border border-white/60">
                {icon}
            </div>
            <h3 className="text-2xl font-bold text-slate-800">{title}</h3>
            <p className="mt-3 text-slate-600 leading-relaxed">{description}</p>
        </div>
    )
}

export default LandingPage;
