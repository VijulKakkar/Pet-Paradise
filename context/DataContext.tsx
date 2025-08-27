


import React, { createContext, useState, useContext, ReactNode, useCallback } from 'react';
import { Pet, ServiceProvider, Appointment, Tutorial, AppointmentStatus, Meetup, Owner, ClientProviderLink, Product } from '../types';
import { DEMO_PETS, DEMO_PROVIDERS, DEMO_APPOINTMENTS, DEMO_TUTORIALS, DEMO_MEETUPS, DEMO_OWNERS, DEMO_PRODUCTS } from '../services/demoData';

interface IDataContext {
  pets: Pet[];
  providers: ServiceProvider[];
  appointments: Appointment[];
  tutorials: Tutorial[];
  meetups: Meetup[];
  owners: Owner[];
  products: Product[];
  getPetById: (id: string) => Pet | undefined;
  getProviderById: (id: string) => ServiceProvider | undefined;
  getOwnerById: (id: string) => Owner | undefined;
  getAppointmentsForOwner: (ownerId: string) => Appointment[];
  getAppointmentsForProvider: (providerId: string) => Appointment[];
  addAppointment: (appointment: Omit<Appointment, 'id' | 'status'>) => void;
  updateAppointmentStatus: (id: string, status: AppointmentStatus) => void;
  updatePet: (updatedPet: Pet) => void;
  addPet: (petData: Omit<Pet, 'id' | 'healthRecords' | 'documents' | 'weightLog' | 'galleryPhotos'>) => void;
  removePet: (petId: string) => void;
  addOwner: (ownerData: Omit<Owner, 'id'>) => Owner;
  updateOwner: (updatedOwner: Owner) => void;
  addMeetup: (meetupData: Omit<Meetup, 'id' | 'organizerId' | 'organizerName' | 'interestedCount'>) => void;
  updateMeetupInterest: (meetupId: string, wasInterested: boolean) => void;
  updateMeetup: (updatedMeetup: Meetup) => void;
  deleteMeetup: (meetupId: string) => void;
  updateProvider: (updatedProvider: ServiceProvider) => void;
  addProvider: (providerData: Omit<ServiceProvider, 'id' | 'rating' | 'reviews' | 'team' | 'gallery'>) => ServiceProvider;
  manuallyAddedClients: ClientProviderLink[];
  addClientToProvider: (providerId: string, ownerId: string) => void;
}

const DataContext = createContext<IDataContext | undefined>(undefined);

// Helper to load data from localStorage, falling back to demo data.
const loadFromStorage = <T,>(key: string, fallback: T): T => {
    try {
        const saved = window.localStorage.getItem(key);
        if (saved && saved !== 'undefined') {
            return JSON.parse(saved);
        }
        window.localStorage.setItem(key, JSON.stringify(fallback));
        return fallback;
    } catch (error) {
        console.error(`[DataContext] Failed to load '${key}' from localStorage. Using fallback.`, error);
        return fallback;
    }
};

// Helper to save data to localStorage
const saveToStorage = <T,>(key:string, data: T) => {
    try {
        window.localStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
        console.error(`[DataContext] Failed to save '${key}' to localStorage.`, error);
    }
};

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [pets, setPets] = useState<Pet[]>(() => loadFromStorage('pet-paradise-pets', DEMO_PETS));
  const [providers, setProviders] = useState<ServiceProvider[]>(() => loadFromStorage('pet-paradise-providers', DEMO_PROVIDERS));
  const [appointments, setAppointments] = useState<Appointment[]>(() => loadFromStorage('pet-paradise-appointments', DEMO_APPOINTMENTS));
  const [tutorials] = useState<Tutorial[]>(DEMO_TUTORIALS);
  const [products] = useState<Product[]>(DEMO_PRODUCTS);
  const [meetups, setMeetups] = useState<Meetup[]>(() => loadFromStorage('pet-paradise-meetups', DEMO_MEETUPS));
  const [owners, setOwners] = useState<Owner[]>(() => loadFromStorage('pet-paradise-owners', DEMO_OWNERS));
  const [manuallyAddedClients, setManuallyAddedClients] = useState<ClientProviderLink[]>(() => loadFromStorage('pet-paradise-manual-clients', []));


  const getPetById = useCallback((id: string) => pets.find(p => p.id === id), [pets]);
  const getProviderById = useCallback((id: string) => providers.find(p => p.id === id), [providers]);
  const getOwnerById = useCallback((id: string) => owners.find(o => o.id === id), [owners]);

  const getAppointmentsForOwner = useCallback((ownerId: string) => 
    appointments.filter(a => a.ownerId === ownerId).sort((a,b) => new Date(b.dateRange.start).getTime() - new Date(a.dateRange.start).getTime()), [appointments]);

  const getAppointmentsForProvider = useCallback((providerId: string) => 
    appointments.filter(a => a.providerId === providerId).sort((a,b) => new Date(b.dateRange.start).getTime() - new Date(a.dateRange.start).getTime()), [appointments]);

  const addAppointment = useCallback((appointment: Omit<Appointment, 'id' | 'status'>) => {
    const newAppointment: Appointment = {
      ...appointment,
      id: `appt_${new Date().getTime()}`,
      status: AppointmentStatus.Confirmed,
    };
    setAppointments(prev => {
        const updated = [newAppointment, ...prev];
        saveToStorage('pet-paradise-appointments', updated);
        return updated;
    });
  }, []);

  const updateAppointmentStatus = ((id: string, status: AppointmentStatus) => {
    setAppointments(prev => {
        const updated = prev.map(a => a.id === id ? { ...a, status } : a);
        saveToStorage('pet-paradise-appointments', updated);
        return updated;
    });
  });
  
  const updatePet = useCallback((updatedPet: Pet) => {
    setPets(prev => {
        const updated = prev.map(p => p.id === updatedPet.id ? updatedPet : p);
        saveToStorage('pet-paradise-pets', updated);
        return updated;
    });
  }, []);

  const addPet = useCallback((petData: Omit<Pet, 'id' | 'healthRecords' | 'documents' | 'weightLog' | 'galleryPhotos'>) => {
    const newPet: Pet = {
        ...petData,
        id: `pet_${new Date().getTime()}`,
        healthRecords: [],
        documents: [],
        weightLog: [],
        galleryPhotos: petData.profilePhotoUrl ? [petData.profilePhotoUrl] : [],
    };
    setPets(prev => {
        const updated = [...prev, newPet];
        saveToStorage('pet-paradise-pets', updated);
        return updated;
    });
  }, []);
  
  const removePet = useCallback((petId: string) => {
      setPets(prev => {
          // Also remove any appointments for this pet to maintain data integrity
          setAppointments(currentAppointments => {
              const updatedAppointments = currentAppointments.filter(a => a.petId !== petId);
              saveToStorage('pet-paradise-appointments', updatedAppointments);
              return updatedAppointments;
          });
          
          const updated = prev.filter(p => p.id !== petId);
          saveToStorage('pet-paradise-pets', updated);
          return updated;
      });
  }, []);

  const addOwner = useCallback((ownerData: Omit<Owner, 'id'>): Owner => {
    const newOwner: Owner = {
      ...ownerData,
      id: `owner_${new Date().getTime()}`,
    };
    setOwners(prev => {
        const updated = [...prev, newOwner];
        saveToStorage('pet-paradise-owners', updated);
        return updated;
    });
    return newOwner;
  }, []);
  
  const updateOwner = useCallback((updatedOwner: Owner) => {
      setOwners(prev => {
          const updated = prev.map(o => o.id === updatedOwner.id ? updatedOwner : o);
          saveToStorage('pet-paradise-owners', updated);
          return updated;
      });
  }, []);

  const addMeetup = useCallback((meetupData: Omit<Meetup, 'id' | 'organizerId' | 'organizerName' | 'interestedCount'>) => {
    const newMeetup: Meetup = {
        ...meetupData,
        id: `meetup_${new Date().getTime()}`,
        organizerId: 'user_owner_01', // Hardcoded for demo
        organizerName: 'You', // The current user
        interestedCount: 1, // Organizer is always interested
    };
    setMeetups(prev => {
        const updated = [newMeetup, ...prev];
        saveToStorage('pet-paradise-meetups', updated);
        return updated;
    });
  }, []);

  const updateMeetupInterest = useCallback((meetupId: string, wasInterested: boolean) => {
    setMeetups(prev => {
        const updated = prev.map(m => {
            if (m.id === meetupId) {
                return { ...m, interestedCount: wasInterested ? m.interestedCount - 1 : m.interestedCount + 1 };
            }
            return m;
        });
        saveToStorage('pet-paradise-meetups', updated);
        return updated;
    });
  }, []);

  const updateMeetup = useCallback((updatedMeetup: Meetup) => {
    setMeetups(prev => {
        const updated = prev.map(m => (m.id === updatedMeetup.id ? updatedMeetup : m));
        saveToStorage('pet-paradise-meetups', updated);
        return updated;
    });
  }, []);

  const deleteMeetup = useCallback((meetupId: string) => {
    setMeetups(prev => {
        const updated = prev.filter(m => m.id !== meetupId);
        saveToStorage('pet-paradise-meetups', updated);
        return updated;
    });
  }, []);

  const updateProvider = useCallback((updatedProvider: ServiceProvider) => {
    setProviders(prev => {
        const updated = prev.map(p => p.id === updatedProvider.id ? updatedProvider : p);
        saveToStorage('pet-paradise-providers', updated);
        return updated;
    });
  }, []);

  const addProvider = useCallback((providerData: Omit<ServiceProvider, 'id' | 'rating' | 'reviews' | 'team' | 'gallery'>): ServiceProvider => {
    const newProvider: ServiceProvider = {
      ...providerData,
      id: `provider_${new Date().getTime()}`,
      rating: 0, // Initial rating
      reviews: [],
      team: [],
      gallery: [],
    };
    setProviders(prev => {
        const updated = [...prev, newProvider];
        saveToStorage('pet-paradise-providers', updated);
        return updated;
    });
    return newProvider;
  }, []);
  
  const addClientToProvider = useCallback((providerId: string, ownerId: string) => {
    setManuallyAddedClients(prev => {
        const entryExists = prev.some(e => e.providerId === providerId && e.ownerId === ownerId);
        if (entryExists) return prev; // Don't add duplicates
        
        const updated = [...prev, { providerId, ownerId }];
        saveToStorage('pet-paradise-manual-clients', updated);
        return updated;
    });
  }, []);

  const contextValue = { 
    pets, 
    providers, 
    appointments, 
    tutorials,
    products,
    meetups,
    owners,
    getPetById, 
    getProviderById,
    getOwnerById, 
    getAppointmentsForOwner,
    getAppointmentsForProvider,
    addAppointment, 
    updateAppointmentStatus,
    updatePet,
    addPet,
    removePet,
    addOwner,
    updateOwner,
    addMeetup,
    updateMeetupInterest,
    updateMeetup,
    deleteMeetup,
    updateProvider,
    addProvider,
    manuallyAddedClients,
    addClientToProvider,
  };

  return (
    <DataContext.Provider value={contextValue}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
