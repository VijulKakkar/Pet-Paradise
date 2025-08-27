

import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { Owner, Pet } from '../../types';
import Card from '../common/Card';
import Modal from '../common/Modal';
import AddPetForm from '../common/AddPetForm';
import PetProfileView from './PetProfileView';
import { UserPlus, PlusCircle, ChevronDown, ChevronUp, Mail, Phone, PawPrint, Trash2, Edit } from 'lucide-react';
import PetIcon from '../common/PetIcon';

const AddClientAndPetsModal: React.FC<{
    onClose: () => void;
    onSave: (ownerData: Omit<Owner, 'id'>, petsData: Array<Omit<Pet, 'id' | 'ownerId' | 'healthRecords' | 'documents' | 'weightLog' | 'galleryPhotos'>>) => void;
}> = ({ onClose, onSave }) => {
    const [ownerData, setOwnerData] = useState({ name: '', email: '', phone: '' });
    const [petsToAdd, setPetsToAdd] = useState<Array<Omit<Pet, 'id' | 'ownerId' | 'healthRecords' | 'documents' | 'weightLog' | 'galleryPhotos'>>>([]);
    const [isAddingPet, setIsAddingPet] = useState(false);

    const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOwnerData({ ...ownerData, [e.target.name]: e.target.value });
    };

    const handleAddPetToList = (petData: Omit<Pet, 'id' | 'ownerId' | 'healthRecords' | 'documents' | 'weightLog' | 'galleryPhotos'>) => {
        setPetsToAdd(prev => [...prev, petData]);
        setIsAddingPet(false); // Hide the form after adding
    };

    const handleRemovePet = (indexToRemove: number) => {
        setPetsToAdd(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = () => {
        if (!ownerData.name || !ownerData.email) {
            alert('Client name and email are required.');
            return;
        }
        onSave(ownerData, petsToAdd);
    };

    return (
        <Modal isOpen={true} onClose={onClose} title="Add New Client and Pets">
            <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-4 -mr-4">
                <fieldset>
                    <legend className="text-lg font-bold text-slate-700 mb-2">Client Information</legend>
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Full Name</label>
                            <input type="text" name="name" value={ownerData.name} onChange={handleOwnerChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Email Address</label>
                            <input type="email" name="email" value={ownerData.email} onChange={handleOwnerChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                            <input type="tel" name="phone" value={ownerData.phone} onChange={handleOwnerChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                    </div>
                </fieldset>

                <fieldset className="border-t border-slate-200 pt-4">
                    <legend className="text-lg font-bold text-slate-700 mb-2">Pets</legend>
                    {petsToAdd.length > 0 && (
                        <div className="space-y-2 mb-4">
                            {petsToAdd.map((pet, index) => (
                                <div key={index} className="flex justify-between items-center bg-slate-100 p-2 rounded-md">
                                    <div className="flex items-center gap-3">
                                        <img src={pet.profilePhotoUrl} alt={pet.name} className="w-8 h-8 rounded-full object-cover" />
                                        <div>
                                            <p className="font-semibold text-slate-800">{pet.name}</p>
                                            <p className="text-xs text-slate-500">{pet.breed}</p>
                                        </div>
                                    </div>
                                    <button onClick={() => handleRemovePet(index)} className="p-1 hover:bg-red-100 rounded-full" aria-label={`Remove ${pet.name}`}>
                                        <Trash2 className="w-4 h-4 text-red-500" />
                                    </button>
                                </div>
                            ))}
                        </div>
                    )}

                    {isAddingPet ? (
                        <div className="p-4 border border-dashed rounded-lg bg-slate-50/50">
                             <AddPetForm
                                onAddPet={handleAddPetToList}
                                onClose={() => setIsAddingPet(false)}
                            />
                        </div>
                    ) : (
                        <button onClick={() => setIsAddingPet(true)} className="w-full flex items-center justify-center gap-2 bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg shadow-sm border border-slate-300 hover:bg-slate-50 transition-colors">
                            <PlusCircle size={16} /> Add a Pet
                        </button>
                    )}
                </fieldset>
                
                <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                    <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
                    <button type="button" onClick={handleSubmit} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700">Save Client and Pets</button>
                </div>
            </div>
        </Modal>
    );
};

const EditClientModal: React.FC<{
    client: Owner;
    onClose: () => void;
    onSave: (
        updatedOwner: Owner,
        petsToAdd: Array<Omit<Pet, 'id' | 'ownerId' | 'healthRecords' | 'documents' | 'weightLog' | 'galleryPhotos'>>,
        petIdsToRemove: string[]
    ) => void;
}> = ({ client, onClose, onSave }) => {
    const { pets: allPets } = useData();
    const [ownerData, setOwnerData] = useState(client);
    const [clientPets] = useState<Pet[]>(() => allPets.filter(p => p.ownerId === client.id));
    
    const [newlyAddedPets, setNewlyAddedPets] = useState<Array<Omit<Pet, 'id' | 'ownerId' | 'healthRecords' | 'documents' | 'weightLog' | 'galleryPhotos'>>>([]);
    const [petIdsToRemove, setPetIdsToRemove] = useState<string[]>([]);
    const [isAddingPet, setIsAddingPet] = useState(false);

    const handleOwnerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setOwnerData({ ...ownerData, [e.target.name]: e.target.value });
    };

    const handleAddPetToList = (petData: Omit<Pet, 'id' | 'ownerId' | 'healthRecords' | 'documents' | 'weightLog' | 'galleryPhotos'>) => {
        setNewlyAddedPets(prev => [...prev, petData]);
        setIsAddingPet(false);
    };
    
    const handleRemoveExistingPet = (petId: string) => {
        if (window.confirm("Are you sure you want to remove this pet? This action cannot be undone.")) {
            setPetIdsToRemove(prev => [...prev, petId]);
        }
    };
    
    const handleRemoveNewPet = (indexToRemove: number) => {
        setNewlyAddedPets(prev => prev.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = () => {
        if (!ownerData.name || !ownerData.email) {
            alert('Client name and email are required.');
            return;
        }
        onSave(ownerData, newlyAddedPets, petIdsToRemove);
    };
    
    const visibleClientPets = clientPets.filter(p => !petIdsToRemove.includes(p.id));

    return (
        <Modal isOpen={true} onClose={onClose} title={`Edit ${client.name}`}>
            <div className="space-y-6 max-h-[75vh] overflow-y-auto pr-4 -mr-4">
                <fieldset>
                    <legend className="text-lg font-bold text-slate-700 mb-2">Client Information</legend>
                     <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Full Name</label>
                            <input type="text" name="name" value={ownerData.name} onChange={handleOwnerChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Email Address</label>
                            <input type="email" name="email" value={ownerData.email} onChange={handleOwnerChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                            <input type="tel" name="phone" value={ownerData.phone} onChange={handleOwnerChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                    </div>
                </fieldset>
                
                <fieldset className="border-t border-slate-200 pt-4">
                    <legend className="text-lg font-bold text-slate-700 mb-2">Pets</legend>
                    <div className="space-y-2 mb-4">
                         {visibleClientPets.map(pet => (
                            <div key={pet.id} className="flex justify-between items-center bg-slate-100 p-2 rounded-md">
                                <div className="flex items-center gap-3">
                                    <img src={pet.profilePhotoUrl} alt={pet.name} className="w-8 h-8 rounded-full object-cover" />
                                    <div><p className="font-semibold text-slate-800">{pet.name}</p></div>
                                </div>
                                <button onClick={() => handleRemoveExistingPet(pet.id)} className="p-1 hover:bg-red-100 rounded-full" aria-label={`Remove ${pet.name}`}>
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        ))}
                         {newlyAddedPets.map((pet, index) => (
                            <div key={index} className="flex justify-between items-center bg-green-50 p-2 rounded-md">
                                <div className="flex items-center gap-3">
                                    <img src={pet.profilePhotoUrl} alt={pet.name} className="w-8 h-8 rounded-full object-cover" />
                                    <div><p className="font-semibold text-green-800">{pet.name} (New)</p></div>
                                </div>
                                <button onClick={() => handleRemoveNewPet(index)} className="p-1 hover:bg-red-100 rounded-full" aria-label={`Remove ${pet.name}`}>
                                    <Trash2 className="w-4 h-4 text-red-500" />
                                </button>
                            </div>
                        ))}
                    </div>
                    {isAddingPet ? (
                        <div className="p-4 border border-dashed rounded-lg bg-slate-50/50">
                             <AddPetForm onAddPet={handleAddPetToList} onClose={() => setIsAddingPet(false)} />
                        </div>
                    ) : (
                        <button onClick={() => setIsAddingPet(true)} className="w-full flex items-center justify-center gap-2 bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg shadow-sm border border-slate-300 hover:bg-slate-50 transition-colors">
                            <PlusCircle size={16} /> Add a Pet
                        </button>
                    )}
                </fieldset>

                <div className="flex justify-end gap-2 pt-4 border-t border-slate-200">
                    <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
                    <button type="button" onClick={handleSubmit} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700">Save Changes</button>
                </div>
            </div>
        </Modal>
    );
};

const ClientsView: React.FC<{ providerId: string }> = ({ providerId }) => {
    const { getAppointmentsForProvider, getOwnerById, pets, addPet, removePet, addOwner, updateOwner, manuallyAddedClients, addClientToProvider } = useData();
    const [isAddClientModalOpen, setAddClientModalOpen] = useState(false);
    const [editingClient, setEditingClient] = useState<Owner | null>(null);
    const [viewingPet, setViewingPet] = useState<Pet | null>(null);
    const [expandedClient, setExpandedClient] = useState<string | null>(null);
    const [searchTerm, setSearchTerm] = useState('');

    const providerAppointments = useMemo(() => getAppointmentsForProvider(providerId), [getAppointmentsForProvider, providerId]);
    
    const allClients = useMemo(() => {
        const clientIdsFromAppointments = providerAppointments.map(a => a.ownerId);

        const manuallyAddedClientIds = manuallyAddedClients
            .filter(c => c.providerId === providerId)
            .map(c => c.ownerId);
            
        const allClientIds = [...new Set([...clientIdsFromAppointments, ...manuallyAddedClientIds])];

        return allClientIds
            .map(id => getOwnerById(id))
            .filter((o): o is Owner => !!o)
            .sort((a, b) => a.name.localeCompare(b.name));
    }, [providerAppointments, getOwnerById, manuallyAddedClients, providerId]);

    const filteredClients = useMemo(() => {
        if (!searchTerm) return allClients;
        const lowercasedFilter = searchTerm.toLowerCase();
        return allClients.filter(client =>
            client.name.toLowerCase().includes(lowercasedFilter) ||
            client.email.toLowerCase().includes(lowercasedFilter)
        );
    }, [allClients, searchTerm]);

    const getPetsForOwner = (ownerId: string) => pets.filter(p => p.ownerId === ownerId);

    const handleSaveNewClientAndPets = (
        ownerData: Omit<Owner, 'id'>,
        petsData: Array<Omit<Pet, 'id' | 'ownerId' | 'healthRecords' | 'documents' | 'weightLog' | 'galleryPhotos'>>
    ) => {
        const newOwner = addOwner(ownerData);
        addClientToProvider(providerId, newOwner.id);
        petsData.forEach(pet => {
            addPet({ ...pet, ownerId: newOwner.id });
        });
        setExpandedClient(newOwner.id);
        setAddClientModalOpen(false);
    };
    
    const handleUpdateClient = (
        updatedOwner: Owner,
        petsToAdd: Array<Omit<Pet, 'id' | 'ownerId' | 'healthRecords' | 'documents' | 'weightLog' | 'galleryPhotos'>>,
        petIdsToRemove: string[]
    ) => {
        updateOwner(updatedOwner);
        petIdsToRemove.forEach(petId => removePet(petId));
        petsToAdd.forEach(petData => addPet({ ...petData, ownerId: updatedOwner.id }));
        setEditingClient(null);
    };

    const handleToggleClient = (clientId: string) => {
        if(editingClient) return; // Don't toggle if a modal is open
        setExpandedClient(prev => prev === clientId ? null : clientId);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                <div>
                     <h3 className="text-xl font-bold text-slate-700">Your Clients</h3>
                    <p className="text-slate-500 mt-1">View client information and their pets.</p>
                </div>
                <button
                    onClick={() => setAddClientModalOpen(true)}
                    className="flex-shrink-0 flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                    <UserPlus size={20} />
                    Add New Client
                </button>
            </div>

            <input
                type="text"
                placeholder="Search clients by name or email..."
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg"
            />

            <div className="space-y-4">
                {filteredClients.map(client => {
                    const clientPets = getPetsForOwner(client.id);
                    const isExpanded = expandedClient === client.id;
                    return (
                        <Card key={client.id} className="overflow-hidden">
                            <div className="p-4 flex flex-col sm:flex-row justify-between sm:items-center cursor-pointer hover:bg-slate-50" onClick={() => handleToggleClient(client.id)}>
                                <div>
                                    <p className="font-bold text-lg text-slate-800">{client.name}</p>
                                    <div className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-slate-500 mt-1">
                                        <span className="flex items-center gap-1.5"><Mail size={14} /> {client.email}</span>
                                        <span className="flex items-center gap-1.5"><Phone size={14} /> {client.phone}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4 mt-3 sm:mt-0">
                                    <div className="flex items-center gap-2 text-slate-600 font-semibold">
                                        <PawPrint size={16} />
                                        <span>{clientPets.length} Pet{clientPets.length !== 1 && 's'}</span>
                                    </div>
                                    {isExpanded ? <ChevronUp /> : <ChevronDown />}
                                </div>
                            </div>
                            {isExpanded && (
                                <div className="p-4 border-t border-slate-200 bg-slate-50/50">
                                    <div className="flex justify-between items-center mb-3">
                                        <h4 className="font-semibold text-slate-600">Pets</h4>
                                        <button 
                                            onClick={() => setEditingClient(client)} 
                                            className="flex items-center gap-2 bg-white text-slate-700 font-semibold py-1.5 px-3 rounded-lg shadow-sm border border-slate-300 hover:bg-slate-50 transition-colors text-sm"
                                        >
                                            <Edit size={14} />
                                            Edit Client & Pets
                                        </button>
                                    </div>
                                    {clientPets.length > 0 ? (
                                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                                            {clientPets.map(pet => (
                                                <div key={pet.id} onClick={() => setViewingPet(pet)} className="flex items-center gap-3 p-3 bg-white rounded-lg shadow-sm border border-slate-200 cursor-pointer hover:bg-cyan-50">
                                                    <img src={pet.profilePhotoUrl} alt={pet.name} className="w-12 h-12 rounded-full object-cover"/>
                                                    <div>
                                                        <p className="font-bold text-slate-800">{pet.name}</p>
                                                        <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                                            <PetIcon species={pet.species} className="w-4 h-4"/>
                                                            <span>{pet.breed}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-sm text-slate-500 text-center py-4">This client has no pets added yet.</p>
                                    )}
                                </div>
                            )}
                        </Card>
                    );
                })}
            </div>

            {isAddClientModalOpen && (
                 <AddClientAndPetsModal
                    onClose={() => setAddClientModalOpen(false)}
                    onSave={handleSaveNewClientAndPets}
                />
            )}
            
            {editingClient && (
                <EditClientModal
                    client={editingClient}
                    onClose={() => setEditingClient(null)}
                    onSave={handleUpdateClient}
                />
            )}

            {viewingPet && (
                <Modal isOpen={!!viewingPet} onClose={() => setViewingPet(null)} title={`${viewingPet.name}'s Profile`}>
                    <PetProfileView pet={viewingPet} />
                </Modal>
            )}
        </div>
    );
};

export default ClientsView;