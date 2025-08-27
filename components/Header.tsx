
import React from 'react';
import { UserRole } from '../types';
import { useData } from '../context/DataContext';
import { PawPrint, User, ChevronDown } from 'lucide-react';

interface HeaderProps {
  currentRole: UserRole;
  onSwitchRole: (newRole: UserRole) => void;
  onLogoClick: () => void;
  providerId?: string | null;
  onSelectProvider: (providerId: string) => void;
  ownerId: string;
  onSelectOwner: (ownerId: string) => void;
}

const Header: React.FC<HeaderProps> = ({ currentRole, onSwitchRole, onLogoClick, providerId, onSelectProvider, ownerId, onSelectOwner }) => {
  const { providers, owners } = useData();
  
  const handleProviderChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectProvider(e.target.value);
  };

  const handleOwnerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSelectOwner(e.target.value);
  };
  
  const renderUserContext = () => {
    if (currentRole === UserRole.PetOwner) {
        return (
            <div className="relative">
                <select
                    value={ownerId}
                    onChange={handleOwnerChange}
                    className="appearance-none bg-transparent font-semibold py-2 pl-1 pr-8 cursor-pointer focus:outline-none text-slate-700"
                    aria-label="Select pet owner"
                >
                    {owners.map(o => <option key={o.id} value={o.id}>{o.name}</option>)}
                </select>
                <ChevronDown className="w-5 h-5 text-slate-500 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none" />
            </div>
        )
    }

    if (currentRole === UserRole.ServiceProvider) {
        if (providerId) {
             return (
                <div className="relative">
                  <select
                    value={providerId}
                    onChange={handleProviderChange}
                    className="appearance-none bg-transparent font-semibold py-2 pl-1 pr-8 cursor-pointer focus:outline-none text-slate-700"
                    aria-label="Select a provider to manage"
                  >
                    {providers.map((p) => (
                      <option key={p.id} value={p.id}>{p.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-5 h-5 text-slate-500 absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none" />
                </div>
            )
        }
        return <span>Manage Providers</span>;
    }

    if (currentRole === UserRole.Evaluator) {
      return <span>System Evaluator</span>;
    }

    return null;
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-40">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div 
            className="flex items-center gap-2 cursor-pointer"
            onClick={onLogoClick}
          >
            <PawPrint className="w-8 h-8 text-cyan-500" />
            <h1 className="text-2xl font-bold text-slate-800 hidden sm:block">Pet Paradise</h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-500">
              <User size={16} />
              {renderUserContext()}
            </div>
            <div className="relative">
              <select
                value={currentRole}
                onChange={(e) => onSwitchRole(e.target.value as UserRole)}
                className="appearance-none bg-cyan-500 text-white font-semibold py-2 pl-4 pr-8 rounded-lg cursor-pointer focus:outline-none focus:ring-2 focus:ring-cyan-300"
              >
                <option value={UserRole.PetOwner}>Pet Owner</option>
                <option value={UserRole.ServiceProvider}>Service Provider</option>
                <option value={UserRole.Evaluator}>Evaluator</option>
              </select>
              <ChevronDown className="w-5 h-5 text-white absolute top-1/2 right-2 -translate-y-1/2 pointer-events-none" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
