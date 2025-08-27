
import React, { useState, useEffect, useRef } from 'react';
import { Pet, PetSpecies, Meetup } from '../../types';
import Card from '../common/Card';
import { useData } from '../../context/DataContext';
import Modal from '../common/Modal';
import { Users, MapPin, Calendar, Clock, Check, UserCheck, PlusCircle, Share2, Edit, Trash2, MoreVertical } from 'lucide-react';
import PetIcon from '../common/PetIcon';

interface SocialMeetupsProps {
  pet: Pet;
}

const MeetupForm: React.FC<{onClose: () => void; initialData: Meetup | null;}> = ({ onClose, initialData }) => {
    const { addMeetup, updateMeetup } = useData();
    const [formData, setFormData] = useState({
        title: initialData?.title || '',
        location: initialData?.location || '',
        date: initialData?.date || '',
        time: initialData?.time || '',
        description: initialData?.description || '',
    });
    const [selectedSpecies, setSelectedSpecies] = useState<PetSpecies[]>(initialData?.petSpecies || []);
    
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSpeciesChange = (species: PetSpecies) => {
        setSelectedSpecies(prev => 
            prev.includes(species)
                ? prev.filter(s => s !== species)
                : [...prev, species]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const finalMeetupData = { ...formData, petSpecies: selectedSpecies };

        if (initialData) {
            updateMeetup({ ...initialData, ...finalMeetupData });
        } else {
            addMeetup(finalMeetupData);
        }
        onClose();
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
            <div>
                <label className="block text-sm font-medium text-slate-700">Meetup Title</label>
                <input type="text" name="title" value={formData.title} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" placeholder="e.g., Sunday Morning Dog Walk"/>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Location</label>
                <input type="text" name="location" value={formData.location} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" placeholder="e.g., City Park Entrance"/>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-slate-700">Date</label>
                    <input type="date" name="date" value={formData.date} onChange={handleInputChange} required min={new Date().toISOString().split('T')[0]} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"/>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Time</label>
                    <input type="time" name="time" value={formData.time} onChange={handleInputChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"/>
                </div>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea name="description" value={formData.description} onChange={handleInputChange} required rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" placeholder="Tell us more about the event..."></textarea>
            </div>
             <div>
                <label className="block text-sm font-medium text-slate-700">Who is this for? (select all that apply)</label>
                 <div className="mt-2 grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {Object.values(PetSpecies).map(species => (
                        <label key={species} className={`flex items-center gap-2 p-2 rounded-md border cursor-pointer transition-colors ${selectedSpecies.includes(species) ? 'bg-cyan-50 border-cyan-400' : 'bg-white border-slate-300 hover:bg-slate-50'}`}>
                            <input
                                type="checkbox"
                                checked={selectedSpecies.includes(species)}
                                onChange={() => handleSpeciesChange(species)}
                                className="h-4 w-4 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500"
                            />
                            <PetIcon species={species} className="w-5 h-5" />
                            <span className="text-sm font-medium text-slate-700">{species}</span>
                        </label>
                    ))}
                </div>
                <p className="text-xs text-slate-500 mt-2">If no specific type is selected, the event will be open to all pets.</p>
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
                <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700">{initialData ? 'Save Changes' : 'Create Meetup'}</button>
            </div>
        </form>
    );
};

const ActionMenu: React.FC<{ onEdit: () => void; onDelete: () => void; }> = ({ onEdit, onDelete }) => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!isOpen) return;

        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [isOpen]);

    const handleEditClick = () => {
        setIsOpen(false);
        onEdit();
    };

    const handleDeleteClick = () => {
        setIsOpen(false);
        onDelete();
    };

    return (
        <div className="relative" ref={menuRef}>
            <button onClick={() => setIsOpen(v => !v)} className="p-2 rounded-full text-slate-500 hover:bg-slate-100 hover:text-slate-800">
                <MoreVertical size={20} />
            </button>
            {isOpen && (
                <div className="absolute right-0 mt-1 w-40 bg-white rounded-md shadow-lg z-10 border border-slate-200">
                    <ul className="py-1">
                        <li><button onMouseDown={handleEditClick} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"><Edit size={14}/> Edit</button></li>
                        <li><button onMouseDown={handleDeleteClick} className="w-full text-left flex items-center gap-2 px-4 py-2 text-sm text-red-600 hover:bg-red-50"><Trash2 size={14}/> Delete</button></li>
                    </ul>
                </div>
            )}
        </div>
    );
};


const SocialMeetups: React.FC<SocialMeetupsProps> = ({ pet }) => {
  const { meetups, updateMeetupInterest, addMeetup, updateMeetup, deleteMeetup } = useData();
  const [userInterestedIds, setUserInterestedIds] = useState<Set<string>>(new Set());
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [editingMeetup, setEditingMeetup] = useState<Meetup | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleInterestClick = (meetupId: string) => {
    const newInterestedIds = new Set(userInterestedIds);
    const isCurrentlyInterested = newInterestedIds.has(meetupId);

    if (isCurrentlyInterested) {
      newInterestedIds.delete(meetupId);
    } else {
      newInterestedIds.add(meetupId);
    }
    setUserInterestedIds(newInterestedIds);
    updateMeetupInterest(meetupId, isCurrentlyInterested);
  };
  
  const handleShare = async (meetup: Meetup) => {
    const shareText = `Let's go to a pet meetup!\n\n🐾 What: ${meetup.title}\n📍 Where: ${meetup.location}\n🗓️ When: ${new Date(meetup.date).toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric' })} at ${meetup.time}\n\n${meetup.description}`;

    // Prepare the data for sharing. It's crucial to only include title and text,
    // as providing a `url` can fail in sandboxed environments where window.location.href
    // is not a valid, shareable URL (e.g., 'about:srcdoc').
    const shareData = {
        title: `Pet Meetup: ${meetup.title}`,
        text: shareText,
    };

    // Use Web Share API if available
    if (navigator.share) {
        try {
            await navigator.share(shareData);
        } catch (error) {
            // A DOMException with name 'AbortError' is thrown if the user cancels the share.
            // We can safely ignore this.
            if (error instanceof DOMException && error.name === 'AbortError') {
                console.log('Share was cancelled by the user.');
            } else {
                console.error('Error sharing:', error);
                // Fallback to clipboard if sharing fails for other reasons
                navigator.clipboard.writeText(shareText).then(() => {
                    setCopiedId(meetup.id);
                    setTimeout(() => setCopiedId(null), 2500);
                });
            }
        }
    } else {
        // Fallback for browsers that don't support Web Share API at all
        console.warn("Web Share API not supported, falling back to clipboard.");
        navigator.clipboard.writeText(shareText).then(() => {
            setCopiedId(meetup.id);
            setTimeout(() => setCopiedId(null), 2500);
        }).catch(err => {
            console.error('Failed to copy to clipboard:', err);
            alert('Sharing is not supported on this browser, and we could not copy to clipboard.');
        });
    }
  };
  
  const handleOpenCreate = () => {
    setEditingMeetup(null);
    setFormModalOpen(true);
  };

  const handleOpenEdit = (meetup: Meetup) => {
    setEditingMeetup(meetup);
    setFormModalOpen(true);
  };
  
  const handleDelete = (meetupId: string) => {
    if (window.confirm("Are you sure you want to delete this meetup? This cannot be undone.")) {
        deleteMeetup(meetupId);
    }
  };

  const handleCloseModal = () => {
    setFormModalOpen(false);
    setEditingMeetup(null);
  };


  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-700">Social Meetups</h3>
        <p className="text-slate-500 mt-1">Find fun events for you and {pet.name} to meet other pets and owners.</p>
      </div>

      <Card>
        <div className="p-6 text-center">
            <h4 className="text-lg font-bold text-slate-800">Have an idea for a get-together?</h4>
            <p className="text-slate-600 mt-1">Organize your own meetup and invite the community!</p>
            <button
                onClick={handleOpenCreate}
                className="mt-4 inline-flex items-center gap-2 bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
            >
                <PlusCircle size={20} />
                Organize a New Meetup
            </button>
        </div>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {meetups.map(meetup => {
          const isInterested = userInterestedIds.has(meetup.id);
          const isOrganizer = meetup.organizerId === 'user_owner_01';
          return (
          <Card key={meetup.id} className="flex flex-col">
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start gap-3">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="bg-cyan-100 p-2 rounded-full">
                      <Users className="w-6 h-6 text-cyan-600" />
                    </div>
                    <h4 className="text-xl font-bold text-slate-800">{meetup.title}</h4>
                  </div>
                  <div className="flex items-center gap-1">
                    <div className="text-xs text-slate-500 text-right shrink-0">
                        Organized by<br/>
                        <span className="font-semibold">{isOrganizer ? 'You' : meetup.organizerName}</span>
                    </div>
                    {isOrganizer && <ActionMenu onEdit={() => handleOpenEdit(meetup)} onDelete={() => handleDelete(meetup.id)} />}
                  </div>
              </div>
              <p className="text-slate-600 text-sm mb-4">{meetup.description}</p>
              
              <div className="text-sm space-y-2 text-slate-700">
                <p className="flex items-center gap-2"><Calendar size={16} className="text-slate-500" /> {new Date(meetup.date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
                <p className="flex items-center gap-2"><Clock size={16} className="text-slate-500" /> {meetup.time}</p>
                <p className="flex items-center gap-2"><MapPin size={16} className="text-slate-500" /> {meetup.location}</p>
              </div>

            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-200 flex justify-between items-center">
                <div className="flex items-center gap-2 flex-wrap">
                    {meetup.petSpecies.length === 0 ? (
                        <div className="flex items-center gap-1.5 bg-slate-200 text-slate-700 px-2 py-1 rounded-full text-xs font-semibold">
                            <PetIcon species={PetSpecies.Other} className="w-4 h-4" />
                            <span>All Pets Welcome</span>
                        </div>
                    ) : (
                        meetup.petSpecies.map(s => (
                            <div key={s} className="flex items-center gap-1.5 bg-slate-200 text-slate-700 px-2 py-1 rounded-full text-xs font-semibold">
                                <PetIcon species={s} className="w-4 h-4" />
                                <span>{s}</span>
                            </div>
                        ))
                    )}
                </div>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 text-slate-600" title={`${meetup.interestedCount} interested`}>
                  <UserCheck size={16} />
                  <span className="font-semibold text-sm">{meetup.interestedCount}</span>
                </div>
                 <button 
                  onClick={() => handleShare(meetup)}
                  className={`font-semibold py-1 px-3 rounded-full text-sm transition-colors flex items-center gap-1.5 ${copiedId === meetup.id ? 'bg-indigo-500 text-white' : 'bg-slate-200 text-slate-700 hover:bg-slate-300'}`}
                >
                    {copiedId === meetup.id ? 'Copied!' : <><Share2 size={14}/> Share</>}
                </button>
                <button 
                  onClick={() => handleInterestClick(meetup.id)}
                  className={`font-semibold py-1 px-3 rounded-full text-sm transition-colors flex items-center gap-1.5 ${
                    isInterested
                      ? 'bg-teal-600 text-white hover:bg-teal-700'
                      : 'bg-green-500 text-white hover:bg-green-600'
                  }`}
                >
                  {isInterested ? (
                    <>
                      <Check size={16} />
                      I'm Going
                    </>
                  ) : (
                    "I'm Interested"
                  )}
                </button>
              </div>
            </div>
          </Card>
        )})}
      </div>
      
      <Modal 
        isOpen={isFormModalOpen} 
        onClose={handleCloseModal} 
        title={editingMeetup ? 'Edit Meetup' : 'Organize a New Meetup'}
      >
        <MeetupForm
            onClose={handleCloseModal}
            initialData={editingMeetup}
        />
     </Modal>
    </div>
  );
};

export default SocialMeetups;
