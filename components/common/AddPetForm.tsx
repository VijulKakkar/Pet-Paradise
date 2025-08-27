
import React, { useState } from 'react';
import { Pet, PetSpecies } from '../../types';
import { Camera } from 'lucide-react';

const DOG_BREEDS = ["Labrador Retriever", "German Shepherd", "Golden Retriever", "French Bulldog", "Bulldog", "Poodle", "Beagle", "Rottweiler", "Yorkshire Terrier", "Mixed Breed", "Other"];
const CAT_BREEDS = ["Domestic Shorthair", "Siamese", "Persian", "Maine Coon", "Ragdoll", "Bengal", "Sphynx", "Mixed Breed", "Other"];

const getDefaultPetImage = (species: PetSpecies): string => {
    switch (species) {
        case PetSpecies.Dog:
            return 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?q=80&w=400&h=400&fit=crop';
        case PetSpecies.Cat:
            return 'https://images.unsplash.com/photo-1574144611937-0df059b5ef3e?q=80&w=400&h=400&fit=crop';
        case PetSpecies.Rabbit:
            return 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?q=80&w=400&h=400&fit=crop';
        case PetSpecies.Bird:
            return 'https://images.unsplash.com/photo-1552728089-57bdde30beb3?q=80&w=400&h=400&fit=crop';
        case PetSpecies.Fish:
            return 'https://images.unsplash.com/photo-1535591273668-578e31182c4f?q=80&w=400&h=400&fit=crop';
        case PetSpecies.Hamster:
            return 'https://images.unsplash.com/photo-1425082661705-1834bfd09d64?q=80&w=400&h=400&fit=crop';
        case PetSpecies.Other:
        default:
            return 'https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=400&h=400&fit=crop';
    }
};

interface AddPetFormProps {
    onAddPet: (data: Omit<Pet, 'id' | 'ownerId' | 'healthRecords' | 'documents' | 'weightLog' | 'galleryPhotos'>) => void;
    onClose: () => void;
}

const AddPetForm: React.FC<AddPetFormProps> = ({ onAddPet, onClose }) => {
    const [name, setName] = useState('');
    const [species, setSpecies] = useState<PetSpecies>(PetSpecies.Dog);
    const [breed, setBreed] = useState('');
    const [otherBreed, setOtherBreed] = useState('');
    const [birthDate, setBirthDate] = useState('');
    const [gender, setGender] = useState<'Male' | 'Female'>('Male');
    const [photoUrl, setPhotoUrl] = useState('');
    const [microchipId, setMicrochipId] = useState('');

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed
    const dd = String(today.getDate()).padStart(2, '0');
    const maxDate = `${yyyy}-${mm}-${dd}`;

    const handleSpeciesChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSpecies(e.target.value as PetSpecies);
        setBreed('');
        setOtherBreed('');
    };

    const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setPhotoUrl(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalBreed = breed === 'Other' ? otherBreed : breed;
        if (!finalBreed) {
            alert("Please select or specify the breed.");
            return;
        }
        
        onAddPet({
            name,
            species,
            breed: finalBreed,
            birthDate,
            gender,
            profilePhotoUrl: photoUrl || getDefaultPetImage(species),
            microchipId: microchipId.trim() || undefined,
        });
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label className="block text-sm font-medium text-slate-700">Pet Name</label>
                <input type="text" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Species</label>
                    <select value={species} onChange={handleSpeciesChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500">
                        {Object.values(PetSpecies).map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Breed</label>
                    {species === PetSpecies.Dog || species === PetSpecies.Cat ? (
                        <div className="space-y-2">
                            <select
                                value={breed}
                                onChange={e => setBreed(e.target.value)}
                                required
                                className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                            >
                                <option value="" disabled>Select a breed</option>
                                {(species === PetSpecies.Dog ? DOG_BREEDS : CAT_BREEDS).map(b => (
                                    <option key={b} value={b}>{b}</option>
                                ))}
                            </select>
                            {breed === 'Other' && (
                                <input
                                    type="text"
                                    value={otherBreed}
                                    onChange={e => setOtherBreed(e.target.value)}
                                    placeholder="Please specify breed"
                                    required
                                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                                />
                            )}
                        </div>
                    ) : (
                        <input
                            type="text"
                            value={breed}
                            onChange={e => setBreed(e.target.value)}
                            required
                            className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500"
                        />
                    )}
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Date of Birth</label>
                    <input type="date" value={birthDate} onChange={e => setBirthDate(e.target.value)} required max={maxDate} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Gender</label>
                     <select value={gender} onChange={e => setGender(e.target.value as 'Male' | 'Female')} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500">
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Microchip ID (optional)</label>
                <input 
                    type="text" 
                    value={microchipId} 
                    onChange={e => setMicrochipId(e.target.value)} 
                    placeholder="e.g., 985112003456789" 
                    className="mt-1 block w-full rounded-md border-slate-300 shadow-sm focus:border-cyan-500 focus:ring-cyan-500 font-mono text-sm"
                />
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Pet Photo</label>
                <div className="mt-2 flex items-center gap-x-4">
                    {photoUrl ? (
                        <img src={photoUrl} alt="Pet preview" className="h-20 w-20 rounded-full object-cover" />
                    ) : (
                        <div className="h-20 w-20 flex justify-center items-center rounded-full bg-slate-100">
                            <Camera className="h-8 w-8 text-slate-400" />
                        </div>
                    )}
                    <label htmlFor="photo-upload" className="cursor-pointer rounded-md bg-white px-3 py-2 text-sm font-semibold text-slate-800 shadow-sm ring-1 ring-inset ring-slate-300 hover:bg-slate-50">
                        <span>Upload Photo</span>
                        <input id="photo-upload" name="photo-upload" type="file" className="sr-only" accept="image/*" onChange={handlePhotoChange} />
                    </label>
                </div>
                <p className="text-xs text-slate-500 mt-2">If no photo is uploaded, a default one will be assigned.</p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">Cancel</button>
                <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cyan-500">Add Pet</button>
            </div>
        </form>
    );
};

export default AddPetForm;
