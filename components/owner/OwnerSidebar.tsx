import React, { useState } from 'react';
import { Pet } from '../../types';
import { useData } from '../../context/DataContext';
import PetProfileCard from './PetProfileCard';
import Modal from '../common/Modal';
import AddPetForm from '../common/AddPetForm';
import { PlusCircle, Calendar, Stethoscope, BrainCircuit, ShieldCheck, Users, ShoppingCart, BookOpen, User, X } from 'lucide-react';

export type View = 'Profile' | 'Appointments' | 'Health' | 'Pet Coach' | 'Insurance' | 'Social' | 'Marketplace' | 'Pawsitive Care Hub';

interface OwnerSidebarProps {
  pets: Pet[];
  selectedPet: Pet | null;
  onSelectPet: (pet: Pet) => void;
  activeView: View;
  onSelectView: (view: View) => void;
  isOpen: boolean;
  onClose: () => void;
}

const NAV_ITEMS: { name: View; icon: React.ElementType }[] = [
    { name: 'Profile', icon: User },
    { name: 'Appointments', icon: Calendar },
    { name: 'Health', icon: Stethoscope },
    { name: 'Pet Coach', icon: BrainCircuit },
    { name: 'Insurance', icon: ShieldCheck },
    { name: 'Social', icon: Users },
    { name: 'Marketplace', icon: ShoppingCart },
    { name: 'Pawsitive Care Hub', icon: BookOpen },
];

const OwnerSidebar: React.FC<OwnerSidebarProps> = ({ pets, selectedPet, onSelectPet, activeView, onSelectView, isOpen, onClose }) => {
  const { addPet } = useData();
  const [isAddPetModalOpen, setAddPetModalOpen] = useState(false);
  const ownerId = 'user_owner_01'; // Simulated logged-in owner

  const handleAddPet = (petData: Omit<Pet, 'id' | 'ownerId' | 'healthRecords' | 'documents' | 'weightLog' | 'galleryPhotos'>) => {
    addPet({ ...petData, ownerId });
    setAddPetModalOpen(false);
  };
  
  return (
    <>
      <aside className={`
        fixed top-16 bottom-0 left-0 z-50
        w-72 bg-white flex flex-col border-r border-slate-200
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-800">My Pets</h2>
            <button onClick={onClose} className="lg:hidden text-slate-500 hover:text-slate-800" aria-label="Close menu">
              <X size={24} />
            </button>
        </div>
        <div className="p-2 border-b border-slate-200">
             <button
              onClick={() => setAddPetModalOpen(true)}
              className="w-full flex items-center justify-center gap-2 text-sm font-semibold text-cyan-600 hover:text-white bg-cyan-50 hover:bg-cyan-500 border border-cyan-200 hover:border-cyan-500 transition-colors py-2 rounded-lg"
              title="Add a new pet"
            >
              <PlusCircle size={18} />
              <span>Add a New Pet</span>
            </button>
        </div>
        
        <div className="flex-grow p-2 space-y-1 overflow-y-auto">
          {pets.length > 0 ? pets.map(pet => (
            <PetProfileCard
              key={pet.id}
              pet={pet}
              isSelected={selectedPet?.id === pet.id}
              onSelect={() => onSelectPet(pet)}
            />
          )) : (
            <div className="p-4 text-center text-sm text-slate-500">
                You have no pets yet. Add one to get started!
            </div>
          )}
        </div>

        {selectedPet && (
            <>
                <div className="p-4 border-t border-slate-200">
                     <h3 className="text-sm font-semibold text-slate-500 uppercase tracking-wider">{selectedPet.name}'s Dashboard</h3>
                </div>
                <nav className="p-2 space-y-1">
                {NAV_ITEMS.map(item => (
                    <a
                    key={item.name}
                    href="#"
                    onClick={(e) => {
                        e.preventDefault();
                        onSelectView(item.name);
                    }}
                    className={`
                        flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors
                        ${activeView === item.name
                        ? 'bg-cyan-500 text-white shadow'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                        }
                    `}
                    >
                    <item.icon className="w-5 h-5 mr-3" />
                    <span>{item.name}</span>
                    </a>
                ))}
                </nav>
            </>
        )}
      </aside>

      <Modal isOpen={isAddPetModalOpen} onClose={() => setAddPetModalOpen(false)} title="Add a New Pet">
          <AddPetForm onAddPet={handleAddPet} onClose={() => setAddPetModalOpen(false)} />
      </Modal>
    </>
  );
};

export default OwnerSidebar;
