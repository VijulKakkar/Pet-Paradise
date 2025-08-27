


import React, { useState } from 'react';
import { Pet } from '../../types';
import Card from '../common/Card';
import PetIcon from '../common/PetIcon';
import Modal from '../common/Modal';
import { useData } from '../../context/DataContext';
import { Cake, Binary, Scan, Info, PlusCircle, Image as ImageIcon, UploadCloud, Camera, Edit, Heart, ThumbsDown, Utensils, ShieldAlert, ArrowUpRight } from 'lucide-react';

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

const EditProfileModal: React.FC<{ pet: Pet; onClose: () => void }> = ({ pet, onClose }) => {
    const { updatePet } = useData();
    const [formData, setFormData] = useState({
        name: pet.name,
        breed: pet.breed,
        birthDate: pet.birthDate.split('T')[0],
        gender: pet.gender,
        microchipId: pet.microchipId || '',
        likes: pet.likes || '',
        dislikes: pet.dislikes || '',
        favoriteFood: pet.favoriteFood || '',
        dietaryNotes: pet.dietaryNotes || '',
    });

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    const maxDate = `${yyyy}-${mm}-${dd}`;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedPetData: Pet = {
            ...pet,
            name: formData.name,
            breed: formData.breed,
            birthDate: new Date(formData.birthDate).toISOString(),
            gender: formData.gender as 'Male' | 'Female',
            microchipId: formData.microchipId || undefined,
            likes: formData.likes,
            dislikes: formData.dislikes,
            favoriteFood: formData.favoriteFood,
            dietaryNotes: formData.dietaryNotes,
        };
        updatePet(updatedPetData);
        onClose();
    };

    return (
        <Modal isOpen={true} onClose={onClose} title={`Edit ${pet.name}'s Profile`}>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Name</label>
                        <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Breed</label>
                        <input type="text" name="breed" value={formData.breed} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Date of Birth</label>
                        <input type="date" name="birthDate" value={formData.birthDate} onChange={handleChange} required max={maxDate} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Gender</label>
                        <select name="gender" value={formData.gender} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm">
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Microchip ID</label>
                    <input type="text" name="microchipId" value={formData.microchipId} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                </div>
                <hr className="my-4" />
                <div>
                    <label className="block text-sm font-medium text-slate-700">Likes</label>
                    <textarea name="likes" value={formData.likes} onChange={handleChange} rows={2} placeholder="e.g., Playing fetch, belly rubs..." className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Dislikes</label>
                    <textarea name="dislikes" value={formData.dislikes} onChange={handleChange} rows={2} placeholder="e.g., Thunderstorms, the vacuum cleaner..." className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Favorite Food</label>
                    <input type="text" name="favoriteFood" value={formData.favoriteFood} onChange={handleChange} placeholder="e.g., Peanut butter treats" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Dietary Notes</label>
                    <textarea name="dietaryNotes" value={formData.dietaryNotes} onChange={handleChange} rows={3} placeholder="e.g., 2 cups twice a day, grain-free" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                    <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
                    <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700">Save Changes</button>
                </div>
            </form>
        </Modal>
    );
};

const AddPhotoModal: React.FC<{ pet: Pet; onClose: () => void }> = ({ pet, onClose }) => {
    const { updatePet } = useData();
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSavePhoto = () => {
        if (!photoPreview) return;
        setIsUploading(true);
        const updatedPet = {
            ...pet,
            galleryPhotos: [...pet.galleryPhotos, photoPreview],
        };
        updatePet(updatedPet);
        // Simulate upload time
        setTimeout(() => {
            setIsUploading(false);
            onClose();
        }, 500);
    };

    return (
        <Modal isOpen={true} onClose={onClose} title={`Add Photo to ${pet.name}'s Gallery`}>
            <div className="space-y-4">
                {photoPreview ? (
                    <div className="flex flex-col items-center">
                        <img src={photoPreview} alt="New photo preview" className="max-h-64 w-auto rounded-lg object-contain" />
                        <button onClick={() => setPhotoPreview(null)} className="mt-2 text-sm text-red-500 hover:text-red-700">Choose a different photo</button>
                    </div>
                ) : (
                    <label htmlFor="photo-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
                        <UploadCloud className="w-10 h-10 text-slate-400" />
                        <p className="mt-2 text-sm text-slate-500">Click to upload or drag and drop</p>
                        <p className="text-xs text-slate-400">PNG, JPG, GIF up to 10MB</p>
                        <input id="photo-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                    </label>
                )}
                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
                    <button onClick={handleSavePhoto} disabled={!photoPreview || isUploading} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-400">
                        {isUploading ? 'Saving...' : 'Save to Gallery'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

const ChangeProfilePhotoModal: React.FC<{ pet: Pet; onClose: () => void }> = ({ pet, onClose }) => {
    const { updatePet } = useData();
    const [photoPreview, setPhotoPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSavePhoto = () => {
        if (!photoPreview) return;
        setIsUploading(true);
        const updatedPet = {
            ...pet,
            profilePhotoUrl: photoPreview,
        };
        updatePet(updatedPet);
        setTimeout(() => {
            setIsUploading(false);
            onClose();
        }, 500);
    };

    return (
        <Modal isOpen={true} onClose={onClose} title={`Change ${pet.name}'s Profile Photo`}>
            <div className="space-y-4">
                {photoPreview ? (
                    <div className="flex flex-col items-center">
                        <img src={photoPreview} alt="New photo preview" className="max-h-64 w-auto rounded-lg object-contain" />
                        <button onClick={() => setPhotoPreview(null)} className="mt-2 text-sm text-red-500 hover:text-red-700">Choose a different photo</button>
                    </div>
                ) : (
                    <label htmlFor="profile-photo-upload" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed border-slate-300 rounded-lg cursor-pointer hover:bg-slate-50">
                        <UploadCloud className="w-10 h-10 text-slate-400" />
                        <p className="mt-2 text-sm text-slate-500">Click to upload a new photo</p>
                        <input id="profile-photo-upload" type="file" className="sr-only" accept="image/*" onChange={handleFileChange} />
                    </label>
                )}
                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
                    <button onClick={handleSavePhoto} disabled={!photoPreview || isUploading} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-400">
                        {isUploading ? 'Saving...' : 'Save Photo'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};


const PetProfile: React.FC<{ pet: Pet }> = ({ pet }) => {
  const [isGalleryModalOpen, setGalleryModalOpen] = useState(false);
  const [isProfilePhotoModalOpen, setProfilePhotoModalOpen] = useState(false);
  const [isEditModalOpen, setEditModalOpen] = useState(false);
  
  const allergies = pet.healthRecords.filter(hr => hr.type === 'Allergy');

  return (
    <div className="animate-fade-in space-y-8">
      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-8">
        <div className="relative group">
            <img src={pet.profilePhotoUrl} alt={pet.name} className="w-40 h-40 rounded-full object-cover ring-4 ring-white shadow-lg" />
            <button
                onClick={() => setProfilePhotoModalOpen(true)}
                className="absolute inset-0 w-full h-full bg-black bg-opacity-0 group-hover:bg-opacity-50 flex items-center justify-center rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100"
                aria-label="Change profile photo"
            >
                <div className="text-center text-white">
                    <Camera className="w-8 h-8 mx-auto" />
                    <span className="text-xs font-semibold">Change Photo</span>
                </div>
            </button>
        </div>
        <div className="pt-4 text-center sm:text-left flex-grow">
          <p className="text-sm font-semibold text-cyan-600 flex items-center justify-center sm:justify-start gap-2">
            <PetIcon species={pet.species} className="w-5 h-5" /> {pet.species}
          </p>
          <h2 className="text-4xl font-extrabold text-slate-800 mt-1">{pet.name}</h2>
          <p className="text-xl text-slate-500">{pet.breed}</p>
        </div>
        <button 
            onClick={() => setEditModalOpen(true)}
            className="flex items-center gap-2 bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg shadow-sm border border-slate-300 hover:bg-slate-50 transition-colors"
        >
            <Edit size={16} /> Edit Profile
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
            <div className="p-6">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
                <Info size={20} />
                Basic Information
            </h3>
            <div className="space-y-4">
                <InfoRow icon={<Cake className="w-5 h-5 text-cyan-600" />} label="Birthday" value={new Date(pet.birthDate).toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })} />
                <InfoRow icon={<Cake className="w-5 h-5 text-cyan-600" />} label="Current Age" value={calculateAge(pet.birthDate)} />
                <InfoRow icon={<Binary className="w-5 h-5 text-cyan-600" />} label="Gender" value={pet.gender} />
                <InfoRow icon={<ArrowUpRight className="w-5 h-5 text-cyan-600" />} label="Height" value={pet.height ? `${pet.height} cm` : 'N/A'} />
                <InfoRow icon={<Scan className="w-5 h-5 text-cyan-600" />} label="Microchip ID" value={<span className="font-mono text-sm">{pet.microchipId || 'N/A'}</span>} />
            </div>
            </div>
        </Card>
        <Card>
            <div className="p-6">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
                <Utensils size={20} />
                Nutrition
            </h3>
            <div className="space-y-4">
                 <InfoRow icon={<Utensils className="w-5 h-5 text-green-600" />} label="Favorite Food" value={pet.favoriteFood || 'Not specified'} />
                 <InfoRow icon={<Info className="w-5 h-5 text-green-600" />} label="Dietary Notes" value={pet.dietaryNotes || 'Not specified'} multiline />
            </div>
            </div>
        </Card>
        <Card>
            <div className="p-6">
            <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
                <Heart size={20} />
                Personality
            </h3>
            <div className="space-y-4">
                 <InfoRow icon={<Heart className="w-5 h-5 text-pink-500" />} label="Likes" value={pet.likes || 'Not specified'} multiline />
                 <InfoRow icon={<ThumbsDown className="w-5 h-5 text-amber-600" />} label="Dislikes" value={pet.dislikes || 'Not specified'} multiline />
            </div>
            </div>
        </Card>
        <Card>
            <div className="p-6">
                <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2 mb-4">
                    <ShieldAlert size={20} className="text-red-500" />
                    Allergies & Medical Notes
                </h3>
                {allergies.length > 0 ? (
                    <div className="space-y-3">
                    {allergies.map(allergy => (
                        <div key={allergy.id}>
                            <p className="font-semibold text-slate-800">{allergy.title}</p>
                            <p className="text-sm text-slate-600">{allergy.details}</p>
                        </div>
                    ))}
                    </div>
                ) : (
                    <p className="text-slate-500 text-sm">No known allergies recorded.</p>
                )}
            </div>
        </Card>
      </div>
      
      <Card>
        <div className="p-6">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-slate-700 flex items-center gap-2">
                    <ImageIcon size={20} />
                    Photo Gallery
                </h3>
                <button onClick={() => setGalleryModalOpen(true)} className="flex items-center gap-2 text-sm font-semibold text-cyan-600 hover:text-cyan-800">
                    <PlusCircle size={16} /> Add Photo
                </button>
            </div>
            {pet.galleryPhotos.length > 0 ? (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {pet.galleryPhotos.map((photo, index) => (
                        <div key={index} className="aspect-w-1 aspect-h-1">
                            <img src={photo} alt={`${pet.name} gallery photo ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-md" />
                        </div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-8 bg-slate-50 rounded-lg">
                    <p className="text-slate-500">No photos in the gallery yet.</p>
                    <p className="text-sm text-slate-400 mt-1">Add your first photo to start building memories!</p>
                </div>
            )}
        </div>
      </Card>

      {isEditModalOpen && <EditProfileModal pet={pet} onClose={() => setEditModalOpen(false)} />}
      {isGalleryModalOpen && <AddPhotoModal pet={pet} onClose={() => setGalleryModalOpen(false)} />}
      {isProfilePhotoModalOpen && <ChangeProfilePhotoModal pet={pet} onClose={() => setProfilePhotoModalOpen(false)} />}


      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

const InfoRow: React.FC<{icon: React.ReactNode, label: string, value: string | React.ReactNode, multiline?: boolean}> = ({icon, label, value, multiline}) => (
    <div className="flex items-start gap-4">
        <div className="p-2 bg-slate-100 rounded-full mt-1">
            {icon}
        </div>
        <div className="flex-1">
            <p className="text-sm text-slate-500">{label}</p>
            <div className={`font-semibold text-slate-700 ${multiline ? 'whitespace-pre-wrap' : ''}`}>{value}</div>
        </div>
    </div>
);

export default PetProfile;