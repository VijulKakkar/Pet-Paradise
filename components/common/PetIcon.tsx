
import React from 'react';
import { PawPrint, Dog, Cat, Rabbit, Bird, Fish } from 'lucide-react';
import { PetSpecies } from '../../types';

interface PetIconProps extends React.SVGProps<SVGSVGElement> {
  species: PetSpecies;
  className?: string;
}

const PetIcon: React.FC<PetIconProps> = ({ species, className = 'w-6 h-6', ...props }) => {
  switch (species) {
    case PetSpecies.Dog:
      return <Dog className={className} {...props} />;
    case PetSpecies.Cat:
      return <Cat className={className} {...props} />;
    case PetSpecies.Rabbit:
      return <Rabbit className={className} {...props} />;
    case PetSpecies.Bird:
      return <Bird className={className} {...props} />;
    case PetSpecies.Fish:
      return <Fish className={className} {...props} />;
    case PetSpecies.Hamster:
       // Using PawPrint as a substitute for a specific hamster icon
      return <PawPrint className={className} {...props} />;
    default:
      return <PawPrint className={className} {...props} />;
  }
};

export default PetIcon;
