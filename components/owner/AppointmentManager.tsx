
import React from 'react';
import { Pet, AppointmentStatus, ServiceType, Appointment } from '../../types';
import { useData } from '../../context/DataContext';
import { PlusCircle, Calendar, CheckCircle2, XCircle, AlertTriangle, CircleDotDashed, Clock } from 'lucide-react';
import Card from '../common/Card';

interface AppointmentManagerProps {
  pet: Pet;
  onBookNew: () => void;
}

const AppointmentManager: React.FC<AppointmentManagerProps> = ({ pet, onBookNew }) => {
  const { getAppointmentsForOwner, getProviderById, updateAppointmentStatus } = useData();
  
  const appointments = getAppointmentsForOwner(pet.ownerId).filter(a => a.petId === pet.id);
  
  const upcomingAppointments = appointments.filter(a => a.status === AppointmentStatus.Confirmed || a.status === AppointmentStatus.Pending);
  const pastAppointments = appointments.filter(a => a.status === AppointmentStatus.Completed || a.status === AppointmentStatus.Cancelled || a.status === AppointmentStatus.Declined);

  const getStatusIcon = (status: AppointmentStatus) => {
    switch (status) {
        case AppointmentStatus.Confirmed: return <CheckCircle2 className="text-green-500" />;
        case AppointmentStatus.Pending: return <Clock className="text-yellow-500" />;
        case AppointmentStatus.Completed: return <CheckCircle2 className="text-slate-500" />;
        case AppointmentStatus.Cancelled: return <XCircle className="text-red-500" />;
        case AppointmentStatus.Declined: return <AlertTriangle className="text-orange-500" />;
        default: return <CircleDotDashed className="text-slate-400" />;
    }
  };
  
  const handleCancelAppointment = (appointmentId: string) => {
    if (window.confirm("Are you sure you want to cancel this appointment? This action cannot be undone.")) {
        updateAppointmentStatus(appointmentId, AppointmentStatus.Cancelled);
    }
  };

  const AppointmentCard: React.FC<{appt: Appointment}> = ({appt}) => {
    const provider = getProviderById(appt.providerId);
    if (!provider) return null;
    
    const isDayCareBooking = provider.type === ServiceType.Daycare;
    const dateDisplay = isDayCareBooking && (new Date(appt.dateRange.start).toDateString() !== new Date(appt.dateRange.end).toDateString())
      ? `${new Date(appt.dateRange.start).toLocaleDateString()} - ${new Date(appt.dateRange.end).toLocaleDateString()}`
      : `${new Date(appt.dateRange.start).toLocaleDateString()} at ${new Date(appt.dateRange.start).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}`;

    const isCancellable = appt.status === AppointmentStatus.Pending || appt.status === AppointmentStatus.Confirmed;

    return (
        <Card className="p-4 flex flex-col sm:flex-row justify-between items-start gap-4">
            <div className="flex-grow">
                <p className="font-bold text-lg text-slate-800">{appt.service} at {provider.name}</p>
                <p className="text-slate-500 flex items-center gap-2 mt-1">
                    <Calendar size={16} />
                    {dateDisplay}
                </p>
                {appt.ownerNotes && <p className="text-sm text-slate-600 mt-2 italic">Your notes: "{appt.ownerNotes}"</p>}
                {appt.providerNotes && <p className="text-sm text-slate-600 mt-2">Provider notes: "{appt.providerNotes}"</p>}
            </div>
            <div className="flex flex-col sm:items-end gap-2 shrink-0">
                <div className="flex items-center gap-2 font-semibold text-sm">
                    {getStatusIcon(appt.status)}
                    <span>{appt.status}</span>
                </div>
                {isCancellable && (
                    <button
                        onClick={() => handleCancelAppointment(appt.id)}
                        className="text-sm font-semibold text-red-600 hover:text-red-800 bg-red-50 hover:bg-red-100 py-1 px-3 rounded-md transition-colors"
                    >
                        Cancel Appointment
                    </button>
                )}
            </div>
        </Card>
    );
  };

  return (
    <div className="space-y-8">
      <div>
        <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-slate-700">Appointments</h3>
            <button
                onClick={onBookNew}
                className="flex items-center gap-2 bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
            >
                <PlusCircle size={20} />
                Book New
            </button>
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-slate-600 mb-3">Upcoming & Pending</h4>
        <div className="space-y-3">
          {upcomingAppointments.length > 0 ? (
            upcomingAppointments.map(appt => <AppointmentCard key={appt.id} appt={appt}/>)
          ) : (
            <p className="text-slate-500">No upcoming appointments.</p>
          )}
        </div>
      </div>
      <div>
        <h4 className="text-lg font-semibold text-slate-600 mb-3">History</h4>
        <div className="space-y-3">
          {pastAppointments.length > 0 ? (
            pastAppointments.map(appt => <AppointmentCard key={appt.id} appt={appt}/>)
          ) : (
            <p className="text-slate-500">No past appointments.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AppointmentManager;