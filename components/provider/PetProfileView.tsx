
import React from 'react';
import { Pet } from '../../types';
import Card from '../common/Card';
import PetIcon from '../common/PetIcon';
import { Cake, Binary, Scan, Info, Heart, ThumbsDown, Utensils, ShieldAlert, ArrowUpRight } from 'lucide-react';

const calculateAge = (birthDate: string): string => {
    const birth = new Date(birthDate);
    const today = new Date();
    let ageYears = today.getFullYear() - birth.getFullYear();
    let ageMonths = today.getMonth() - birth.getMonth();
    if (ageMonths < 0 || (ageMonths === 0 && today.getDate() < birth.getDate())) {
        ageYears--;
        ageMonths = (12 + ageMonths) % 12;
    }
    let result = '';
    if (ageYears > 0) result += `${ageYears} year${ageYears > 1 ? 's' : ''}`;
    if (ageYears > 0 && ageMonths > 0) result += ', ';
    if (ageMonths > 0) result += `${ageMonths} month${ageMonths > 1 ? 's' : ''}`;
    if (ageYears === 0 && ageMonths === 0) {
        const ageDays = Math.floor((today.getTime() - birth.getTime()) / (1000 * 60 * 60 * 24));
        return `${ageDays} day${ageDays > 1 ? 's' : ''} old`;
    }
    return result + ' old';
};

const PetProfileView: React.FC<{ pet: Pet }> = ({ pet }) => {
  const allergies = pet.healthRecords.filter(hr => hr.type === 'Allergy');

  return (
    <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-4 -mr-4">
        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
            <img src={pet.profilePhotoUrl} alt={pet.name} className="w-24 h-24 rounded-full object-cover ring-4 ring-white shadow-lg flex-shrink-0" />
            <div className="text-center sm:text-left">
              <p className="text-sm font-semibold text-cyan-600 flex items-center justify-center sm:justify-start gap-2">
                <PetIcon species={pet.species} className="w-5 h-5" /> {pet.species}
              </p>
              <h2 className="text-2xl font-bold text-slate-800">{pet.name}</h2>
              <p className="text-lg text-slate-500">{pet.breed}</p>
            </div>
        </div>

        <div className="space-y-4">
            <InfoSection title="Basic Information" icon={Info}>
                <InfoRow icon={<Cake className="w-5 h-5 text-cyan-600" />} label="Birthday" value={new Date(pet.birthDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} />
                <InfoRow icon={<Cake className="w-5 h-5 text-cyan-600" />} label="Current Age" value={calculateAge(pet.birthDate)} />
                <InfoRow icon={<Binary className="w-5 h-5 text-cyan-600" />} label="Gender" value={pet.gender} />
                <InfoRow icon={<ArrowUpRight className="w-5 h-5 text-cyan-600" />} label="Height" value={pet.height ? `${pet.height} cm` : 'N/A'} />
                <InfoRow icon={<Scan className="w-5 h-5 text-cyan-600" />} label="Microchip ID" value={<span className="font-mono text-sm">{pet.microchipId || 'N/A'}</span>} />
            </InfoSection>

             <InfoSection title="Personality & Diet" icon={Heart}>
                <InfoRow icon={<Heart className="w-5 h-5 text-pink-500" />} label="Likes" value={pet.likes || 'Not specified'} multiline />
                <InfoRow icon={<ThumbsDown className="w-5 h-5 text-amber-600" />} label="Dislikes" value={pet.dislikes || 'Not specified'} multiline />
                <InfoRow icon={<Utensils className="w-5 h-5 text-green-600" />} label="Favorite Food" value={pet.favoriteFood || 'Not specified'} />
                <InfoRow icon={<Info className="w-5 h-5 text-green-600" />} label="Dietary Notes" value={pet.dietaryNotes || 'Not specified'} multiline />
             </InfoSection>

            <InfoSection title="Allergies & Medical Notes" icon={ShieldAlert}>
                {allergies.length > 0 ? (
                    <div className="space-y-3">
                        {allergies.map(allergy => (
                            <div key={allergy.id} className="text-sm">
                                <p className="font-semibold text-slate-800">{allergy.title}</p>
                                <p className="text-slate-600">{allergy.details}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-slate-500 text-sm">No known allergies recorded.</p>
                )}
            </InfoSection>
        </div>
    </div>
  );
};

const InfoSection: React.FC<{title: string, icon: React.ElementType, children: React.ReactNode}> = ({title, icon: Icon, children}) => (
    <Card className="bg-slate-50/50 p-4">
        <h3 className="text-md font-bold text-slate-700 flex items-center gap-2 mb-3 border-b border-slate-200 pb-2">
            <Icon size={18} />
            {title}
        </h3>
        <div className="space-y-3">
            {children}
        </div>
    </Card>
);

const InfoRow: React.FC<{icon: React.ReactNode, label: string, value: string | React.ReactNode, multiline?: boolean}> = ({icon, label, value, multiline}) => (
    <div className="flex items-start gap-3">
        <div className="flex-shrink-0 mt-1">
            {icon}
        </div>
        <div className="flex-1 text-sm">
            <p className="text-slate-500">{label}</p>
            <div className={`font-semibold text-slate-700 ${multiline ? 'whitespace-pre-wrap' : ''}`}>{value}</div>
        </div>
    </div>
);

export default PetProfileView;
