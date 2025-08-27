
import React, { useState, useMemo, useEffect } from 'react';
import { Pet, ServiceType, AppointmentStatus } from '../../types';
import { useData } from '../../context/DataContext';
import Modal from '../common/Modal';

interface BookingModalProps {
    isOpen: boolean;
    onClose: () => void;
    pet: Pet;
    providerId?: string;
}

const BookingForm: React.FC<{onClose: () => void; pet: Pet; preselectedProviderId?: string;}> = ({onClose, pet, preselectedProviderId}) => {
    const { addAppointment, providers, getAppointmentsForProvider } = useData();

    const [providerId, setProviderId] = useState(preselectedProviderId || '');
    const [service, setService] = useState('');
    const [notes, setNotes] = useState('');
    
    // For slot-based services
    const [selectedDate, setSelectedDate] = useState('');
    const [selectedTime, setSelectedTime] = useState('');
    
    // For Daycare
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');

    const selectedProvider = useMemo(() => providers.find(p => p.id === providerId), [providers, providerId]);
    const isDaycare = useMemo(() => selectedProvider?.type === ServiceType.Daycare, [selectedProvider]);

    useEffect(() => {
        if (preselectedProviderId) {
            setProviderId(preselectedProviderId);
        }
    }, [preselectedProviderId]);
    
    useEffect(() => {
        // Reset selections when provider changes
        setService('');
        setSelectedDate('');
        setSelectedTime('');
        setStartDate('');
        setEndDate('');
    }, [providerId]);
    
    useEffect(() => {
        // Reset time when date changes
        setSelectedTime('');
    }, [selectedDate]);

    const availableSlots = useMemo(() => {
        if (!selectedProvider || isDaycare || !selectedDate) return [];

        const providerAppointments = getAppointmentsForProvider(selectedProvider.id);
        
        // Use a Set for faster lookups
        const bookedSlots = new Set(providerAppointments
            .filter(a => {
                const apptDate = new Date(a.dateRange.start);
                const selected = new Date(selectedDate);
                // Compare year, month, and day. Using toISOString().slice(0,10) is a reliable way to do this.
                return apptDate.toISOString().slice(0, 10) === selected.toISOString().slice(0, 10) 
                       && a.status !== AppointmentStatus.Cancelled 
                       && a.status !== AppointmentStatus.Declined;
            })
            .map(a => new Date(a.dateRange.start).toTimeString().substring(0, 5)));

        const slots = [];
        const { start, end } = selectedProvider.workingHours;
        const slotDuration = selectedProvider.slotDuration;
        
        let currentTime = new Date(`${selectedDate}T${start}`);
        const endTime = new Date(`${selectedDate}T${end}`);
        
        while (currentTime < endTime) {
            const timeString = currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
            if (!bookedSlots.has(timeString)) {
                slots.push(timeString);
            }
            currentTime.setMinutes(currentTime.getMinutes() + slotDuration);
        }
        return slots;
    }, [selectedDate, selectedProvider, getAppointmentsForProvider, isDaycare]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!providerId || !service) {
            alert("Please select a provider and service.");
            return;
        }

        let startDateTime, endDateTime;

        if (isDaycare) {
            if (!startDate) {
                alert("Please select a start date.");
                return;
            }
            startDateTime = new Date(`${startDate}T09:00:00`); // Daycare check-in at 9am
            endDateTime = new Date(`${endDate || startDate}T17:00:00`); // Daycare check-out at 5pm
            if (endDateTime < startDateTime) endDateTime.setDate(startDateTime.getDate());
        } else {
            if (!selectedDate || !selectedTime) {
                alert("Please select a date and time slot.");
                return;
            }
            startDateTime = new Date(`${selectedDate}T${selectedTime}`);
            endDateTime = new Date(startDateTime.getTime() + (selectedProvider?.slotDuration || 30) * 60 * 1000);
        }
        
        addAppointment({
            ownerId: pet.ownerId,
            petId: pet.id,
            providerId,
            service,
            dateRange: { start: startDateTime.toISOString(), end: endDateTime.toISOString() },
            ownerNotes: notes,
        });
        onClose();
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="provider" className="block text-sm font-medium text-slate-700">Service Provider</label>
                <select id="provider" value={providerId} onChange={e => setProviderId(e.target.value)} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md" disabled={!!preselectedProviderId}>
                    <option value="">Select a provider</option>
                    {providers.map(p => <option key={p.id} value={p.id}>{p.name} ({p.type})</option>)}
                </select>
            </div>
            {selectedProvider && (
                 <div>
                    <label htmlFor="service" className="block text-sm font-medium text-slate-700">Service</label>
                    <select id="service" value={service} onChange={e => setService(e.target.value)} required className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-slate-300 focus:outline-none focus:ring-cyan-500 focus:border-cyan-500 sm:text-sm rounded-md">
                        <option value="">Select a service</option>
                        {selectedProvider.servicesOffered.map(s => <option key={s} value={s}>{s}</option>)}
                    </select>
                </div>
            )}
            
            {isDaycare ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                     <div>
                        <label htmlFor="startDate" className="block text-sm font-medium text-slate-700">Start Date</label>
                        <input type="date" id="startDate" value={startDate} onChange={e => setStartDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"/>
                    </div>
                    <div>
                        <label htmlFor="endDate" className="block text-sm font-medium text-slate-700">End Date</label>
                        <input type="date" id="endDate" value={endDate} onChange={e => setEndDate(e.target.value)} required min={startDate || new Date().toISOString().split('T')[0]} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"/>
                    </div>
                </div>
            ) : (
                <>
                    <div>
                        <label htmlFor="date" className="block text-sm font-medium text-slate-700">Date</label>
                        <input type="date" id="date" value={selectedDate} onChange={e => setSelectedDate(e.target.value)} required min={new Date().toISOString().split('T')[0]} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"/>
                    </div>
                    {selectedDate && (
                        <div>
                            <label className="block text-sm font-medium text-slate-700">Available Slots</label>
                            {availableSlots.length > 0 ? (
                                <div className="mt-2 grid grid-cols-3 sm:grid-cols-4 gap-2">
                                    {availableSlots.map(slot => (
                                        <button 
                                            key={slot} 
                                            type="button"
                                            onClick={() => setSelectedTime(slot)}
                                            className={`py-2 px-3 text-sm font-semibold rounded-md transition-colors ${selectedTime === slot ? 'bg-cyan-600 text-white shadow' : 'bg-cyan-100 text-cyan-800 hover:bg-cyan-200'}`}
                                        >
                                            {new Date(`1970-01-01T${slot}`).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })}
                                        </button>
                                    ))}
                                </div>
                            ) : (
                                <p className="text-sm text-slate-500 mt-2">No available slots for this day. Please try another date.</p>
                            )}
                        </div>
                    )}
                </>
            )}
            
            <div>
                <label htmlFor="notes" className="block text-sm font-medium text-slate-700">Notes for provider (optional)</label>
                <textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} rows={3} className="mt-1 block w-full rounded-md border-slate-300 shadow-sm"></textarea>
            </div>
            <div className="flex justify-end gap-2 pt-4">
                <button type="button" onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Cancel</button>
                <button type="submit" className="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-cyan-600 hover:bg-cyan-700 disabled:bg-slate-400">Book Appointment</button>
            </div>
        </form>
    );
};

const BookingModal: React.FC<BookingModalProps> = ({isOpen, onClose, pet, providerId}) => {
    if (!isOpen) return null;
    return (
        <Modal isOpen={isOpen} onClose={onClose} title={`Book Appointment for ${pet.name}`}>
            <BookingForm onClose={onClose} pet={pet} preselectedProviderId={providerId} />
        </Modal>
    );
};

export default BookingModal;
