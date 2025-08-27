

import React, { useState, useMemo } from 'react';
import { DataProvider } from './context/DataContext';
import { UserRole } from './types';
import LandingPage from './components/LandingPage';
import OwnerDashboard from './components/owner/OwnerDashboard';
import ProviderDashboard from './components/provider/ProviderDashboard';
import Header from './components/Header';
import ProviderSelection from './components/provider/ProviderSelection';
import ProviderRegistrationForm from './components/provider/ProviderRegistrationForm';
import EvalsPage from './components/EvalsPage';

const App: React.FC = () => {
  const [role, setRole] = useState<UserRole | null>(null);
  const [activeProviderId, setActiveProviderId] = useState<string | null>(null);
  const [ownerId, setOwnerId] = useState<string>('user_owner_01'); // Simulated logged-in owner
  const [isRegisteringProvider, setIsRegisteringProvider] = useState<boolean>(false);

  const handleSelectRole = (selectedRole: UserRole) => {
    setRole(selectedRole);
    setActiveProviderId(null);
    setIsRegisteringProvider(false);
  };

  const handleSwitchRole = (newRole: UserRole) => {
    setRole(newRole);
    setActiveProviderId(null);
    setIsRegisteringProvider(false);
  };
  
  const handleSelectProvider = (providerId: string) => {
    setActiveProviderId(providerId);
  }
  
  const handleSelectOwner = (ownerId: string) => {
    setOwnerId(ownerId);
  }

  const resetRole = () => {
    setRole(null);
    setActiveProviderId(null);
    setIsRegisteringProvider(false);
  }

  const handleStartRegistration = () => {
    setIsRegisteringProvider(true);
  };

  const handleCancelRegistration = () => {
    setIsRegisteringProvider(false);
  };

  const handleRegistrationSuccess = (newProviderId: string) => {
    setIsRegisteringProvider(false);
    setActiveProviderId(newProviderId);
  };

  const mainContent = useMemo(() => {
    if (!role) {
      return <LandingPage onSelectRole={handleSelectRole} />;
    }
    
    switch (role) {
      case UserRole.PetOwner:
        return <OwnerDashboard key={ownerId} ownerId={ownerId} />;
      case UserRole.ServiceProvider:
        if (isRegisteringProvider) {
          return <ProviderRegistrationForm onSuccess={handleRegistrationSuccess} onCancel={handleCancelRegistration} />;
        }
        if (activeProviderId) {
          return <ProviderDashboard providerId={activeProviderId} />;
        }
        return <ProviderSelection onSelectProvider={handleSelectProvider} onBack={resetRole} onRegisterNew={handleStartRegistration} />;
      case UserRole.Evaluator:
        return <EvalsPage />;
      default:
        return <LandingPage onSelectRole={handleSelectRole} />;
    }
  }, [role, ownerId, activeProviderId, isRegisteringProvider]);


  return (
    <DataProvider>
      <div className="bg-gray-50 min-h-screen font-sans text-slate-900">
        {role && <Header 
            currentRole={role} 
            onSwitchRole={handleSwitchRole} 
            onLogoClick={resetRole} 
            providerId={activeProviderId} 
            onSelectProvider={handleSelectProvider}
            ownerId={ownerId}
            onSelectOwner={handleSelectOwner}
        />}
        <main>
          {mainContent}
        </main>
      </div>
    </DataProvider>
  );
};

export default App;