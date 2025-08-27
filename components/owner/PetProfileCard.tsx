import React from 'react';
import { Pet } from '../../types';
import PetIcon from '../common/PetIcon';

interface PetProfileCardProps {
  pet: Pet;
  isSelected: boolean;
  onSelect: () => void;
}

const PetProfileCard: React.FC<PetProfileCardProps> = ({ pet, isSelected, onSelect }) => {
  return (
    <div
      onClick={onSelect}
      className={`
        flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200
        group
        ${isSelected ? 'bg-cyan-50 text-cyan-800' : 'bg-white hover:bg-slate-50'}
      `}
    >
      <img src={pet.profilePhotoUrl} alt={pet.name} className={`w-12 h-12 rounded-full object-cover transition-all duration-300 ${isSelected ? 'ring-2 ring-cyan-500' : 'ring-2 ring-transparent group-hover:ring-cyan-200'}`} />
      <div className="ml-3 flex-grow">
        <h3 className={`font-bold text-base ${isSelected ? 'text-cyan-900' : 'text-slate-800'}`}>{pet.name}</h3>
        <p className={`text-sm ${isSelected ? 'text-cyan-700' : 'text-slate-500'}`}>{pet.species}</p>
      </div>
    </div>
  );
};

export default PetProfileCard;