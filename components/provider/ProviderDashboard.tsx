







import React, { useState, useMemo } from 'react';
import { useData } from '../../context/DataContext';
import { Appointment, AppointmentStatus, ServiceProvider, Review, Owner, ServiceType, ServiceLocation } from '../../types';
import { Calendar, Clock, CheckCircle2, XCircle, AlertTriangle, MoreVertical, Briefcase, ShoppingCart, User, Edit, Star, MapPin, Phone, Mail, MessageSquare, Info, Image as ImageIcon, Users, FileText, Sparkles, UploadCloud, PlusCircle, Home, Store } from 'lucide-react';
import Card from '../common/Card';
import PetIcon from '../common/PetIcon';
import Marketplace from '../owner/Marketplace';
import ProviderProfileModal from './ProviderProfileModal';
import Modal from '../common/Modal';
import ClientsView from './ClientsView';

interface ProviderDashboardProps {
    providerId: string;
}

type ProviderAppointmentFilter = 'Upcoming' | 'Cancelled' | 'All';
type ProviderDashboardTab = 'My Profile' | 'Appointments' | 'Clients' | 'Browse Marketplace';

const EditProfileModal: React.FC<{ provider: ServiceProvider; onClose: () => void }> = ({ provider, onClose }) => {
    const { updateProvider } = useData();
    const [formData, setFormData] = useState({
        name: provider.name,
        location: provider.location,
        phone: provider.contact.phone,
        email: provider.contact.email,
        workingHoursStart: provider.workingHours.start,
        workingHoursEnd: provider.workingHours.end,
        slotDuration: provider.slotDuration.toString(),
        about: provider.about,
        servicesOffered: provider.servicesOffered.join('\n'),
        amenities: provider.amenities.join('\n'),
        businessPolicies: provider.businessPolicies,
        serviceLocation: provider.serviceLocation || ServiceLocation.InStore,
    });

    const isLocationRelevant = provider.type === ServiceType.Grooming || provider.type === ServiceType.Spa || provider.type === ServiceType.Training;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const updatedProviderData: ServiceProvider = {
            ...provider,
            name: formData.name,
            location: formData.location,
            contact: {
                phone: formData.phone,
                email: formData.email,
            },
            workingHours: {
                start: formData.workingHoursStart,
                end: formData.workingHoursEnd,
            },
            slotDuration: parseInt(formData.slotDuration, 10),
            about: formData.about,
            servicesOffered: formData.servicesOffered.split('\n').filter(s => s.trim() !== ''),
            amenities: formData.amenities.split('\n').filter(a => a.trim() !== ''),
            businessPolicies: formData.businessPolicies,
            serviceLocation: isLocationRelevant ? formData.serviceLocation : undefined,
        };
        updateProvider(updatedProviderData);
        onClose();
    };

    return (
        <Modal isOpen={true} onClose={onClose} title={`Edit ${provider.name}'s Profile`}>
            <form onSubmit={handleSubmit} className="space-y-4 max-h-[70vh] overflow-y-auto pr-2">
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Business Name</label>
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">Location</label>
                    <input type="text" name="location" value={formData.location} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                </div>
                 {isLocationRelevant && (
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Service Location</label>
                        <select name="serviceLocation" value={formData.serviceLocation} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm">
                            {Object.values(ServiceLocation).map(loc => (
                                <option key={loc} value={loc}>{loc}</option>
                            ))}
                        </select>
                    </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Phone Number</label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700">Email Address</label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                    </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Opens At</label>
                        <input type="time" name="workingHoursStart" value={formData.workingHoursStart} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                    </div>
                     <div>
                        <label className="block text-sm font-medium text-slate-700">Closes At</label>
                        <input type="time" name="workingHoursEnd" value={formData.workingHoursEnd} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-700">Slot Duration (min)</label>
                        <input type="number" name="slotDuration" value={formData.slotDuration} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                    </div>
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-700">About Us</label>
                    <textarea name="about" value={formData.about} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Services Offered (one per line)</label>
                    <textarea name="servicesOffered" value={formData.servicesOffered} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Amenities (one per line)</label>
                    <textarea name="amenities" value={formData.amenities} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-700">Business Policies</label>
                    <textarea name="businessPolicies" value={formData.businessPolicies} onChange={handleChange} rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                </div>
                <div className="flex justify-end gap-2 pt-4">
                    <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
                    <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700">Save Changes</button>
                </div>
            </form>
        </Modal>
    );
};

const AddProviderPhotoModal: React.FC<{ provider: ServiceProvider; onClose: () => void }> = ({ provider, onClose }) => {
    const { updateProvider } = useData();
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
        const updatedProvider = {
            ...provider,
            gallery: [...provider.gallery, photoPreview],
        };
        updateProvider(updatedProvider);
        setTimeout(() => {
            setIsUploading(false);
            onClose();
        }, 500);
    };

    return (
        <Modal isOpen={true} onClose={onClose} title={`Add Photo to ${provider.name}'s Gallery`}>
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
                    <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
                    <button onClick={handleSavePhoto} disabled={!photoPreview || isUploading} className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-400">
                        {isUploading ? 'Saving...' : 'Save to Gallery'}
                    </button>
                </div>
            </div>
        </Modal>
    );
};

const MyProfileView: React.FC<{ provider: ServiceProvider, onEditClick: () => void, onAddPhotoClick: () => void }> = ({ provider, onEditClick, onAddPhotoClick }) => {
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={16} className={i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-slate-300'} />
        ));
    };

    const ReviewCard: React.FC<{review: Review}> = ({review}) => (
        <div className="bg-slate-50 p-4 rounded-lg">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-800">{review.author}</p>
                <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
            </div>
            <p className="text-slate-600 mt-2 italic">"{review.comment}"</p>
        </div>
    );
    
    const ProfileSection: React.FC<{ title: string, icon: React.ElementType, children: React.ReactNode, noBorder?: boolean }> = ({ title, icon: Icon, children, noBorder = false }) => (
        <div className={`py-6 ${noBorder ? '' : 'border-t border-slate-200'}`}>
            <h4 className="font-bold text-slate-800 text-xl mb-4 flex items-center gap-3">
                <Icon size={22} className="text-cyan-600" />
                {title}
            </h4>
            {children}
        </div>
    );

    return (
         <Card className="p-6 md:p-8">
            <div className="flex justify-between items-start">
                <div>
                    <p className="text-lg font-semibold text-cyan-600">{provider.type}</p>
                     <div className="flex items-center gap-2 mt-1">
                        {renderStars(provider.rating)}
                        <span className="text-sm text-slate-500">({provider.rating.toFixed(1)} from {provider.reviews.length} review{provider.reviews.length !== 1 && 's'})</span>
                    </div>
                </div>
                <button onClick={onEditClick} className="flex items-center gap-2 bg-white text-slate-700 font-semibold py-2 px-4 rounded-lg shadow-sm border border-slate-300 hover:bg-slate-50 transition-colors">
                    <Edit size={16} /> Edit Profile
                </button>
            </div>
            
            <ProfileSection title="About Us" icon={Info} noBorder>
                <p className="text-slate-600 leading-relaxed">{provider.about}</p>
            </ProfileSection>

            <ProfileSection title="Gallery" icon={ImageIcon}>
                {provider.gallery.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {provider.gallery.map((url, index) => (
                            <a key={index} href={url} target="_blank" rel="noopener noreferrer" className="aspect-video block">
                                <img src={url} alt={`${provider.name} gallery image ${index + 1}`} className="w-full h-full object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow" />
                            </a>
                        ))}
                         <button onClick={onAddPhotoClick} className="flex items-center justify-center aspect-video w-full h-full bg-slate-50 border-2 border-dashed border-slate-300 rounded-lg text-slate-500 hover:bg-slate-100 hover:border-cyan-500 hover:text-cyan-600 transition-colors">
                            <PlusCircle size={24} />
                        </button>
                    </div>
                ) : (
                    <div className="text-center py-8 bg-slate-50 rounded-lg border-2 border-dashed border-slate-200">
                        <p className="text-slate-500">Your gallery is empty.</p>
                        <p className="text-sm text-slate-400 mt-1">Showcase your space by adding photos.</p>
                        <button onClick={onAddPhotoClick} className="mt-4 inline-flex items-center gap-2 bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors">
                            <PlusCircle size={20} />
                            Upload First Photo
                        </button>
                    </div>
                )}
            </ProfileSection>
            
            {provider.team.length > 0 && (
                <ProfileSection title="Meet the Team" icon={Users}>
                    <div className="flex gap-6 overflow-x-auto pb-2 -mx-6 px-6">
                        {provider.team.map((member, index) => (
                            <div key={index} className="text-center flex-shrink-0 w-36">
                                <img src={member.photoUrl} alt={member.name} className="w-28 h-28 rounded-full object-cover mx-auto shadow-md" />
                                <p className="font-semibold text-slate-800 mt-3">{member.name}</p>
                                <p className="text-sm text-slate-500">{member.title}</p>
                            </div>
                        ))}
                    </div>
                </ProfileSection>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border-t border-slate-200 pt-6">
                 <div>
                     <h4 className="font-bold text-slate-800 text-xl mb-4 flex items-center gap-3"><Briefcase size={22} className="text-cyan-600" />Services Offered</h4>
                     <div className="flex flex-wrap gap-2">
                        {provider.servicesOffered.map(service => (
                            <span key={service} className="text-sm bg-slate-100 text-slate-700 px-3 py-1.5 rounded-full">{service}</span>
                        ))}
                    </div>
                </div>
                 <div>
                     <h4 className="font-bold text-slate-800 text-xl mb-4 flex items-center gap-3"><Sparkles size={22} className="text-cyan-600" />Special Amenities</h4>
                     <div className="flex flex-wrap gap-2">
                        {provider.amenities.map(amenity => (
                            <span key={amenity} className="text-sm bg-cyan-50 text-cyan-800 px-3 py-1.5 rounded-full">{amenity}</span>
                        ))}
                    </div>
                </div>
            </div>

            <ProfileSection title="Contact & Location" icon={MapPin}>
                 <div className="space-y-3 text-slate-600">
                    <p className="flex items-center gap-3"><MapPin size={18} className="text-slate-400" /> {provider.location}</p>
                    <p className="flex items-center gap-3"><Phone size={18} className="text-slate-400" /> {provider.contact.phone}</p>
                    <p className="flex items-center gap-3"><Mail size={18} className="text-slate-400" /> {provider.contact.email}</p>
                    {provider.serviceLocation && (
                        <div className="flex items-center gap-3 pt-2">
                            {provider.serviceLocation.includes('Store') && <Store size={18} className="text-slate-400"/>}
                            {provider.serviceLocation.includes('Home') && <Home size={18} className="text-slate-400"/>}
                            <span className="font-semibold">{provider.serviceLocation}</span>
                        </div>
                    )}
                </div>
            </ProfileSection>

            <ProfileSection title="Business Policies" icon={FileText}>
                <p className="text-sm text-slate-600 bg-slate-50 p-4 rounded-lg border border-slate-200">{provider.businessPolicies}</p>
            </ProfileSection>

            {provider.reviews.length > 0 && (
                 <ProfileSection title="Reviews" icon={MessageSquare}>
                     <div className="space-y-4">
                        {provider.reviews.map(review => (
                            <ReviewCard key={review.id} review={review} />
                        ))}
                     </div>
                 </ProfileSection>
             )}
        </Card>
    );
};

const AppointmentsView: React.FC<{ providerId: string }> = ({ providerId }) => {
    const { getAppointmentsForProvider, pets, updateAppointmentStatus } = useData();
    const [filter, setFilter] = useState<ProviderAppointmentFilter>('Upcoming');

    const providerAppointments = useMemo(() => getAppointmentsForProvider(providerId), [getAppointmentsForProvider, providerId]);
    
    const filteredAppointments = useMemo(() => {
        switch(filter) {
            case 'Upcoming':
                return providerAppointments.filter(a => a.status === AppointmentStatus.Confirmed || a.status === AppointmentStatus.Pending);
            case 'Cancelled':
                return providerAppointments.filter(a => a.status === AppointmentStatus.Cancelled);
            case 'All':
            default:
                return providerAppointments;
        }
    }, [filter, providerAppointments]);

    const getPetForAppointment = (petId: string) => pets.find(p => p.id === petId);

    const StatusBadge: React.FC<{ status: AppointmentStatus }> = ({ status }) => {
        const base = 'px-3 py-1 text-xs font-semibold rounded-full inline-flex items-center gap-1.5';
        const styles = {
            [AppointmentStatus.Pending]: 'bg-yellow-100 text-yellow-800',
            [AppointmentStatus.Confirmed]: 'bg-green-100 text-green-800',
            [AppointmentStatus.Completed]: 'bg-slate-200 text-slate-800',
            [AppointmentStatus.Cancelled]: 'bg-red-100 text-red-800',
            [AppointmentStatus.Declined]: 'bg-orange-100 text-orange-800',
        };
        const icons = {
            [AppointmentStatus.Pending]: <Clock size={12} />,
            [AppointmentStatus.Confirmed]: <CheckCircle2 size={12} />,
            [AppointmentStatus.Completed]: <CheckCircle2 size={12} />,
            [AppointmentStatus.Cancelled]: <XCircle size={12} />,
            [AppointmentStatus.Declined]: <AlertTriangle size={12} />,
        }
        return <div className={`${base} ${styles[status]}`}>{icons[status]} {status}</div>;
    };
    
    const ActionMenu: React.FC<{ appointment: Appointment }> = ({ appointment }) => {
        const [isOpen, setIsOpen] = useState(false);
        const canBeCompleted = appointment.status === AppointmentStatus.Confirmed;
        const canBeCancelled = appointment.status !== AppointmentStatus.Cancelled && appointment.status !== AppointmentStatus.Completed;
    
        const handleAction = (status: AppointmentStatus) => {
          updateAppointmentStatus(appointment.id, status);
          setIsOpen(false);
        };
    
        return (
          <div className="relative">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-full hover:bg-slate-100">
              <MoreVertical size={20} />
            </button>
            {isOpen && (
              <div 
                className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-10 border"
                onMouseLeave={() => setIsOpen(false)}
              >
                <ul className="py-1">
                  {canBeCompleted && <li className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm" onClick={() => handleAction(AppointmentStatus.Completed)}>Mark as Completed</li>}
                  {canBeCancelled && <li className="px-4 py-2 hover:bg-slate-100 cursor-pointer text-sm text-red-600" onClick={() => handleAction(AppointmentStatus.Cancelled)}>Cancel Appointment</li>}
                  { !canBeCompleted && !canBeCancelled && <li className="px-4 py-2 text-sm text-slate-400">No actions available</li> }
                </ul>
              </div>
            )}
          </div>
        );
      };

    return (
        <>
            <div className="flex flex-wrap items-center gap-4 mt-6">
                <span className="font-semibold text-slate-600">Filter by status:</span>
                <div className="flex flex-wrap gap-2">
                    {(['Upcoming', 'Cancelled', 'All'] as ProviderAppointmentFilter[]).map(s => (
                        <button
                            key={s}
                            onClick={() => setFilter(s)}
                            className={`px-3 py-1.5 text-sm font-semibold rounded-lg transition-colors ${
                                filter === s ? 'bg-cyan-600 text-white shadow-sm' : 'bg-white text-slate-700 hover:bg-slate-100 border border-slate-300'
                            }`}
                        >
                            {s}
                        </button>
                    ))}
                </div>
            </div>
            
            <div className="space-y-4 mt-6">
                {filteredAppointments.length > 0 ? (
                    filteredAppointments.map(appt => {
                        const pet = getPetForAppointment(appt.petId);
                        if (!pet) return null;
                        
                        return (
                            <Card key={appt.id} className="p-5">
                                <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                                    <div className="md:col-span-3 flex items-center gap-4">
                                        <img src={pet.profilePhotoUrl} alt={pet.name} className="w-16 h-16 rounded-full object-cover"/>
                                        <div>
                                            <p className="font-bold text-lg text-slate-800">{pet.name}</p>
                                            <div className="flex items-center gap-1.5 text-sm text-slate-500">
                                                <PetIcon species={pet.species} className="w-4 h-4" />
                                                <span>{pet.species}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:col-span-3">
                                        <p className="font-semibold text-slate-700">{appt.service}</p>
                                        <p className="text-sm text-slate-500 flex items-center gap-1.5 mt-1">
                                            <Calendar size={14}/> {new Date(appt.dateRange.start).toLocaleString()}
                                        </p>
                                    </div>
                                    <div className="md:col-span-4">
                                        <p className="font-semibold text-slate-700">Notes from Owner</p>
                                        <p className="text-sm text-slate-500 italic mt-1">{appt.ownerNotes || "None"}</p>
                                    </div>
                                    <div className="md:col-span-2 flex justify-end items-center gap-2">
                                       <StatusBadge status={appt.status} />
                                       <ActionMenu appointment={appt} />
                                    </div>
                                </div>
                            </Card>
                        )
                    })
                ) : (
                    <Card className="p-8 text-center bg-slate-50">
                        <p className="text-slate-500">No appointments match the current filter.</p>
                    </Card>
                )}
            </div>
        </>
    );
};


const ProviderDashboard: React.FC<ProviderDashboardProps> = ({ providerId }) => {
    const { providers } = useData();
    const [activeTab, setActiveTab] = useState<ProviderDashboardTab>('My Profile');
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [isAddPhotoModalOpen, setIsAddPhotoModalOpen] = useState(false);
    const [viewingProviderProfile, setViewingProviderProfile] = useState<ServiceProvider | null>(null);

    const self = useMemo(() => providers.find(p => p.id === providerId), [providers, providerId]);

    if (!self) {
        return <div className="p-8 text-center">Error: Provider profile could not be loaded.</div>;
    }

    const renderContent = () => {
        switch (activeTab) {
            case 'My Profile':
                return <MyProfileView provider={self} onEditClick={() => setIsEditModalOpen(true)} onAddPhotoClick={() => setIsAddPhotoModalOpen(true)} />;
            case 'Appointments':
                return <AppointmentsView providerId={providerId} />;
            case 'Clients':
                return <ClientsView providerId={providerId} />;
            case 'Browse Marketplace':
                return <Marketplace onProviderClick={setViewingProviderProfile} />;
            default:
                return null;
        }
    };
    
    const TABS: { name: ProviderDashboardTab, icon: React.ElementType }[] = [
        { name: 'My Profile', icon: User },
        { name: 'Appointments', icon: Briefcase },
        { name: 'Clients', icon: Users },
        { name: 'Browse Marketplace', icon: ShoppingCart },
    ];

    return (
        <div className="p-4 sm:p-6 lg:p-8 max-w-screen-xl mx-auto">
            <div className="space-y-6">
                <div>
                    <h2 className="text-3xl font-bold text-slate-800">{self.name}</h2>
                    <p className="text-slate-500 mt-1">Manage your profile, appointments, and browse the marketplace.</p>
                </div>
                
                <div className="border-b border-slate-200">
                    <nav className="flex -mb-px space-x-2 sm:space-x-6 overflow-x-auto pb-1" aria-label="Tabs">
                        {TABS.map(tab => (
                            <button
                                key={tab.name}
                                onClick={() => setActiveTab(tab.name)}
                                className={`flex-shrink-0 group inline-flex items-center py-3 px-2 sm:px-4 border-b-2 font-semibold text-sm transition-colors duration-200 ${
                                    activeTab === tab.name
                                    ? 'border-cyan-500 text-cyan-600'
                                    : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
                                }`}
                            >
                                <tab.icon className="-ml-0.5 mr-2 h-5 w-5" />
                                <span className="hidden sm:inline">{tab.name}</span>
                                <span className="sm:hidden">{tab.name.split(' ')[0]}</span>
                            </button>
                        ))}
                    </nav>
                </div>
                
                <div className="mt-6">
                    {renderContent()}
                </div>
                
                {viewingProviderProfile && (
                    <ProviderProfileModal 
                        key={viewingProviderProfile.id}
                        provider={viewingProviderProfile}
                        onClose={() => setViewingProviderProfile(null)}
                    />
                )}
                {isEditModalOpen && <EditProfileModal provider={self} onClose={() => setIsEditModalOpen(false)} />}
                {isAddPhotoModalOpen && <AddProviderPhotoModal provider={self} onClose={() => setIsAddPhotoModalOpen(false)} />}
            </div>
        </div>
    );
};

export default ProviderDashboard;