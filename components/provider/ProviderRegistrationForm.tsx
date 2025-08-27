

import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ServiceProvider, ServiceType, ServiceLocation } from '../../types';
import Card from '../common/Card';
import { Briefcase, ArrowLeft } from 'lucide-react';

interface ProviderRegistrationFormProps {
    onSuccess: (newProviderId: string) => void;
    onCancel: () => void;
}

const FormSection: React.FC<{title: string, children: React.ReactNode}> = ({ title, children }) => (
    <fieldset className="border-t border-slate-200 pt-6">
        <legend className="text-lg font-bold text-slate-700 mb-4">{title}</legend>
        <div className="space-y-4">
            {children}
        </div>
    </fieldset>
);

const ProviderRegistrationForm: React.FC<ProviderRegistrationFormProps> = ({ onSuccess, onCancel }) => {
    const { addProvider } = useData();

    const [formData, setFormData] = useState({
        name: '',
        type: ServiceType.Vet,
        serviceLocation: ServiceLocation.InStore,
        location: '',
        phone: '',
        email: '',
        opens: '09:00',
        closes: '17:00',
        slotDuration: '30',
        about: '',
        servicesOffered: '',
        amenities: '',
        businessPolicies: '',
    });
    
    const isLocationRelevant = 
        formData.type === ServiceType.Grooming || 
        formData.type === ServiceType.Spa || 
        formData.type === ServiceType.Training;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { id, value } = e.target;

        if (id === 'type' || id === 'serviceLocation') {
             setFormData(prev => ({ ...prev, [id]: value }));
        } else {
            setFormData(prev => ({ ...prev, [id]: value }));
        }
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        const { name, location, phone, email, about, servicesOffered, businessPolicies } = formData;
        if (!name || !location || !phone || !email || !about || !servicesOffered || !businessPolicies) {
            alert('Please fill out all required fields.');
            return;
        }

        const providerData: Omit<ServiceProvider, 'id' | 'rating' | 'reviews' | 'team' | 'gallery'> = {
            name: formData.name,
            type: formData.type,
            serviceLocation: isLocationRelevant ? formData.serviceLocation : undefined,
            servicesOffered: formData.servicesOffered.split('\n').map(s => s.trim()).filter(Boolean),
            location: formData.location,
            contact: { phone: formData.phone, email: formData.email },
            workingHours: { start: formData.opens, end: formData.closes },
            slotDuration: parseInt(formData.slotDuration, 10) || 30,
            about: formData.about,
            amenities: formData.amenities.split('\n').map(a => a.trim()).filter(Boolean),
            businessPolicies: formData.businessPolicies,
        };
        const newProvider = addProvider(providerData);
        onSuccess(newProvider.id);
    };

    return (
        <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
            <button onClick={onCancel} className="flex items-center gap-2 text-slate-600 font-semibold hover:text-slate-900 mb-6">
                <ArrowLeft size={18} />
                Back to Role Selection
            </button>
            <Card className="p-6 md:p-8">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div className="text-center">
                        <Briefcase className="w-12 h-12 text-cyan-500 mx-auto mb-2" />
                        <h1 className="text-3xl font-bold text-slate-800">Register Your Service</h1>
                        <p className="mt-2 text-lg text-slate-600">Join our network of trusted pet care professionals.</p>
                    </div>
                    
                    <FormSection title="Business Details">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Business Name</label>
                                <input type="text" id="name" value={formData.name} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                            </div>
                             <div>
                                <label htmlFor="type" className="block text-sm font-medium text-slate-700">Service Type</label>
                                <select id="type" value={formData.type} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm">
                                    {Object.values(ServiceType).map(t => <option key={t} value={t}>{t}</option>)}
                                </select>
                            </div>
                        </div>
                         {isLocationRelevant && (
                            <div>
                                <label htmlFor="serviceLocation" className="block text-sm font-medium text-slate-700">Service Location</label>
                                <select id="serviceLocation" value={formData.serviceLocation} onChange={handleChange} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm">
                                    {Object.values(ServiceLocation).map(loc => (
                                        <option key={loc} value={loc}>{loc}</option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div>
                            <label htmlFor="location" className="block text-sm font-medium text-slate-700">Location</label>
                            <input type="text" id="location" value={formData.location} onChange={handleChange} required placeholder="e.g., Sunnyvale, CA" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Contact Email</label>
                                <input type="email" id="email" value={formData.email} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                            </div>
                             <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-700">Contact Phone</label>
                                <input type="tel" id="phone" value={formData.phone} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                            </div>
                        </div>
                    </FormSection>

                    <FormSection title="Operations">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label htmlFor="opens" className="block text-sm font-medium text-slate-700">Opening Time</label>
                                <input type="time" id="opens" value={formData.opens} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="closes" className="block text-sm font-medium text-slate-700">Closing Time</label>
                                <input type="time" id="closes" value={formData.closes} onChange={handleChange} required className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                            </div>
                            <div>
                                <label htmlFor="slotDuration" className="block text-sm font-medium text-slate-700">Slot Duration (min)</label>
                                <input type="number" id="slotDuration" value={formData.slotDuration} onChange={handleChange} required min="15" step="5" className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" />
                            </div>
                        </div>
                    </FormSection>

                    <FormSection title="Service Information">
                        <div>
                            <label htmlFor="about" className="block text-sm font-medium text-slate-700">About Your Business</label>
                            <textarea id="about" value={formData.about} onChange={handleChange} required rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" placeholder="Tell pet owners what makes your service special."></textarea>
                        </div>
                         <div>
                            <label htmlFor="servicesOffered" className="block text-sm font-medium text-slate-700">Services Offered (one per line)</label>
                            <textarea id="servicesOffered" value={formData.servicesOffered} onChange={handleChange} required rows={4} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" placeholder="e.g., Annual Checkups&#10;Vaccinations&#10;Dental Care"></textarea>
                        </div>
                         <div>
                            <label htmlFor="amenities" className="block text-sm font-medium text-slate-700">Amenities (one per line)</label>
                            <textarea id="amenities" value={formData.amenities} onChange={handleChange} rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" placeholder="e.g., In-house Laboratory&#10;Digital X-Ray"></textarea>
                        </div>
                        <div>
                            <label htmlFor="businessPolicies" className="block text-sm font-medium text-slate-700">Business Policies</label>
                            <textarea id="businessPolicies" value={formData.businessPolicies} onChange={handleChange} required rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm" placeholder="e.g., Cancellation policy, payment methods, etc."></textarea>
                        </div>
                    </FormSection>

                    <div className="flex justify-end gap-4 border-t border-slate-200 pt-6">
                        <button type="button" onClick={onCancel} className="py-2 px-4 border border-slate-300 rounded-md text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
                        <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700">Complete Registration</button>
                    </div>
                </form>
            </Card>
        </div>
    );
};

export default ProviderRegistrationForm;