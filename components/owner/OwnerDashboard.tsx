import React, { useState, useEffect, useRef } from 'react';
import { useData } from '../../context/DataContext';
import { Pet, ServiceProvider } from '../../types';
import OwnerSidebar, { View } from './OwnerSidebar';
import AppointmentManager from './AppointmentManager';
import HealthManager from './HealthManager';
import AICarePlanner from './AICarePlanner';
import InsuranceManager from './InsuranceManager';
import SocialMeetups from './SocialMeetups';
import Marketplace from './Marketplace';
import Resources from './Resources';
import BookingModal from './BookingModal';
import PetProfile from './PetProfile';
import ProviderProfileModal from '../provider/ProviderProfileModal';
import { Menu } from 'lucide-react';

// A stable and performant hook to check for media queries
const useMediaQuery = (query: string) => {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        if (typeof window === 'undefined') return;

        const mediaQueryList = window.matchMedia(query);
        
        // Set the initial state
        setMatches(mediaQueryList.matches);

        const listener = (event: MediaQueryListEvent) => {
            setMatches(event.matches);
        };
        
        // Add the listener
        mediaQueryList.addEventListener('change', listener);

        // Cleanup function to remove the listener
        return () => {
            mediaQueryList.removeEventListener('change', listener);
        };
    }, [query]); // Only re-run the effect if the query string changes

    return matches;
};

function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  }, [value]);
  return ref.current;
}

interface OwnerDashboardProps {
  ownerId: string;
}

const OwnerDashboard: React.FC<OwnerDashboardProps> = ({ ownerId }) => {
  const { pets } = useData();
  const ownerPets = pets.filter(p => p.ownerId === ownerId);

  const [selectedPet, setSelectedPet] = useState<Pet | null>(ownerPets[0] || null);
  const [activeView, setActiveView] = useState<View>(ownerPets.length > 0 ? 'Profile' : 'Appointments');
  const [bookingInfo, setBookingInfo] = useState<{isOpen: boolean, providerId?: string}>({isOpen: false, providerId: undefined});
  const [viewingProviderProfile, setViewingProviderProfile] = useState<ServiceProvider | null>(null);

  const prevPetCount = usePrevious(ownerPets.length);
  
  const isLg = useMediaQuery('(min-width: 1024px)');
  const [isSidebarOpen, setIsSidebarOpen] = useState(isLg);

  useEffect(() => {
    setIsSidebarOpen(isLg);
  }, [isLg]);

  useEffect(() => {
    // This effect ensures that the selectedPet state is kept in sync with the main pets list from the context.
    // When a pet's details are updated (e.g., adding a health record), the `pets` array in the context
    // gets updated, but the `selectedPet` state here would become stale without this effect.
    if (selectedPet) {
        // Find the latest version of the pet's data from the master list.
        const currentPetData = pets.find(p => p.id === selectedPet.id);
        
        // To prevent an infinite render loop, we only update the state if the data has actually changed.
        // JSON.stringify is a pragmatic way to do a deep comparison for this data structure.
        if (currentPetData && JSON.stringify(currentPetData) !== JSON.stringify(selectedPet)) {
            setSelectedPet(currentPetData);
        }
    }
  }, [pets, selectedPet]);

  useEffect(() => {
    if (prevPetCount === undefined) return; 

    if (ownerPets.length > prevPetCount) {
      const newPet = ownerPets[ownerPets.length - 1];
      setSelectedPet(newPet);
      setActiveView('Profile');
    } else if (selectedPet && !ownerPets.some(p => p.id === selectedPet.id)) {
      const petToSelect = ownerPets[0] || null;
      setSelectedPet(petToSelect);
      if(petToSelect) setActiveView('Profile');
    } else if (!selectedPet && ownerPets.length > 0) {
      setSelectedPet(ownerPets[0]);
      setActiveView('Profile');
    }
  }, [ownerPets, selectedPet, prevPetCount]);


  const handleSelectPet = (pet: Pet) => {
    setSelectedPet(pet);
    setActiveView('Profile');
    if (!isLg) {
        setIsSidebarOpen(false);
    }
  };
  
  const handleSelectView = (view: View) => {
    setActiveView(view);
    if (!isLg) {
        setIsSidebarOpen(false);
    }
  }

  const openBookingModal = (providerId?: string) => {
    if (!selectedPet) {
        alert("Please select a pet first.");
        return;
    }
    setBookingInfo({ isOpen: true, providerId: providerId });
  };
  
  const closeBookingModal = () => {
    setBookingInfo({ isOpen: false, providerId: undefined });
  };

  const renderContent = () => {
    if (!selectedPet) {
      return (
        <div className="flex items-center justify-center h-full bg-white rounded-lg shadow-md p-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-slate-700">Welcome!</h3>
            <p className="text-xl text-slate-500 mt-2">
              {ownerPets.length > 0 ? "Select a pet to see their details" : "Add a pet to get started."}
            </p>
          </div>
        </div>
      );
    }

    switch (activeView) {
      case 'Profile': return <PetProfile pet={selectedPet} />;
      case 'Appointments': return <AppointmentManager pet={selectedPet} onBookNew={() => openBookingModal()} />;
      case 'Health': return <HealthManager pet={selectedPet} />;
      case 'Pet Coach': return <AICarePlanner pet={selectedPet} />;
      case 'Insurance': return <InsuranceManager pet={selectedPet} />;
      case 'Social': return <SocialMeetups pet={selectedPet} />;
      case 'Marketplace': return <Marketplace onBookForProvider={openBookingModal} onProviderClick={setViewingProviderProfile} />;
      case 'Pawsitive Care Hub': return <Resources />;
      default: return null;
    }
  };

  return (
    <div className="relative h-[calc(100vh-4rem)]">
        {/* Mobile Overlay */}
        {isSidebarOpen && !isLg && (
            <div 
                onClick={() => setIsSidebarOpen(false)} 
                className="fixed inset-x-0 top-16 bottom-0 bg-black bg-opacity-50 z-40 lg:hidden"
                aria-hidden="true"
            />
        )}
      <OwnerSidebar
        pets={ownerPets}
        selectedPet={selectedPet}
        onSelectPet={handleSelectPet}
        activeView={activeView}
        onSelectView={handleSelectView}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="lg:ml-72 transition-all duration-300 flex flex-col h-full">
         {!isLg && (
            <header className="bg-white border-b border-slate-200 p-4 flex items-center sticky top-0 z-30">
                <button onClick={() => setIsSidebarOpen(true)} className="text-slate-600 mr-4" aria-label="Open menu">
                    <Menu size={24} />
                </button>
                <div className="font-bold text-slate-800 text-lg">
                    {selectedPet ? `${selectedPet.name} - ${activeView}` : "Pet Paradise"}
                </div>
            </header>
         )}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto bg-gray-50">
            <div className="max-w-7xl mx-auto">
                {renderContent()}
            </div>
        </main>
      </div>
      
      {selectedPet && <BookingModal 
        isOpen={bookingInfo.isOpen}
        onClose={closeBookingModal}
        pet={selectedPet}
        providerId={bookingInfo.providerId}
      />}

      {viewingProviderProfile && (
        <ProviderProfileModal
            key={viewingProviderProfile.id}
            provider={viewingProviderProfile}
            onClose={() => setViewingProviderProfile(null)}
        />
      )}
    </div>
  );
};

export default OwnerDashboard;