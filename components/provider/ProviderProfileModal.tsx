


import React from 'react';
import { ServiceProvider, Review, ServiceLocation } from '../../types';
import Modal from '../common/Modal';
import { Star, MapPin, Phone, Mail, MessageSquare, Info, Image, Users, FileText, Sparkles, Home, Store } from 'lucide-react';

interface ProviderProfileModalProps {
    provider: ServiceProvider;
    onClose: () => void;
}

const ProviderProfileModal: React.FC<ProviderProfileModalProps> = ({ provider, onClose }) => {
    
    const renderStars = (rating: number) => {
        return Array.from({ length: 5 }, (_, i) => (
          <Star key={i} size={16} className={i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-slate-300'} />
        ));
      };

    const ReviewCard: React.FC<{review: Review}> = ({review}) => (
        <div className="bg-slate-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
                <p className="font-semibold text-slate-800">{review.author}</p>
                <div className="flex items-center gap-1">{renderStars(review.rating)}</div>
            </div>
            <p className="text-slate-600 mt-2 italic">"{review.comment}"</p>
        </div>
    );

    const Section: React.FC<{ title: string, icon: React.ElementType, children: React.ReactNode, noBorder?: boolean }> = ({ title, icon: Icon, children, noBorder = false }) => (
        <div className={noBorder ? '' : 'border-t border-slate-200 pt-4'}>
            <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                <Icon size={20} className="text-cyan-600" />
                {title}
            </h4>
            {children}
        </div>
    );

    return (
        <Modal isOpen={true} onClose={onClose} title={provider.name}>
            <div className="space-y-6 max-h-[80vh] overflow-y-auto pr-4">
                {/* Header */}
                <div>
                    <p className="text-lg font-semibold text-cyan-600">{provider.type}</p>
                     <div className="flex items-center gap-2 mt-1">
                        {renderStars(provider.rating)}
                        <span className="text-sm text-slate-500">({provider.rating.toFixed(1)} from {provider.reviews.length} review{provider.reviews.length !== 1 && 's'})</span>
                    </div>
                </div>

                <Section title="About Us" icon={Info} noBorder>
                    <p className="text-slate-600 text-sm leading-relaxed">{provider.about}</p>
                </Section>
                
                {provider.gallery.length > 0 && (
                    <Section title="Gallery" icon={Image}>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                            {provider.gallery.map((url, index) => (
                                <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                                    <img src={url} alt={`${provider.name} gallery image ${index + 1}`} className="aspect-square w-full h-full object-cover rounded-lg shadow-sm hover:shadow-md transition-shadow" />
                                </a>
                            ))}
                        </div>
                    </Section>
                )}
                
                {provider.team.length > 0 && (
                    <Section title="Meet the Team" icon={Users}>
                        <div className="flex gap-4 overflow-x-auto pb-2">
                            {provider.team.map((member, index) => (
                                <div key={index} className="text-center flex-shrink-0 w-32">
                                    <img src={member.photoUrl} alt={member.name} className="w-24 h-24 rounded-full object-cover mx-auto shadow-md" />
                                    <p className="font-semibold text-slate-800 mt-2 text-sm">{member.name}</p>
                                    <p className="text-xs text-slate-500">{member.title}</p>
                                </div>
                            ))}
                        </div>
                    </Section>
                )}
                 
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6 border-t border-slate-200 pt-4">
                    <div>
                         <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                            Services Offered
                         </h4>
                         <div className="flex flex-wrap gap-2">
                            {provider.servicesOffered.map(service => (
                                <span key={service} className="text-sm bg-slate-200 text-slate-700 px-3 py-1 rounded-full">{service}</span>
                            ))}
                        </div>
                    </div>
                     <div>
                         <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
                            <Sparkles size={16} className="text-cyan-600" />
                            Special Amenities
                         </h4>
                         <div className="flex flex-wrap gap-2">
                            {provider.amenities.map(amenity => (
                                <span key={amenity} className="text-sm bg-cyan-50 text-cyan-800 px-3 py-1 rounded-full">{amenity}</span>
                            ))}
                        </div>
                    </div>
                </div>

                <Section title="Contact & Location" icon={MapPin}>
                     <div className="space-y-2 text-slate-600 text-sm">
                        <p className="flex items-center gap-3"><MapPin size={16} className="text-slate-400" /> {provider.location}</p>
                        <p className="flex items-center gap-3"><Phone size={16} className="text-slate-400" /> {provider.contact.phone}</p>
                        <p className="flex items-center gap-3"><Mail size={16} className="text-slate-400" /> {provider.contact.email}</p>
                        {provider.serviceLocation && (
                            <div className="flex items-center gap-3 pt-2">
                                {provider.serviceLocation.includes('Store') && <Store size={16} className="text-slate-400"/>}
                                {provider.serviceLocation.includes('Home') && <Home size={16} className="text-slate-400"/>}
                                <span className="font-semibold">{provider.serviceLocation}</span>
                            </div>
                        )}
                    </div>
                </Section>
                 
                <Section title="Business Policies" icon={FileText}>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg">{provider.businessPolicies}</p>
                </Section>
                
                 {provider.reviews.length > 0 && (
                     <Section title="Reviews" icon={MessageSquare}>
                         <div className="space-y-3 max-h-48 overflow-y-auto pr-2">
                            {provider.reviews.map(review => (
                                <ReviewCard key={review.id} review={review} />
                            ))}
                         </div>
                     </Section>
                 )}

                <div className="flex justify-end pt-4 border-t border-slate-200">
                     <button onClick={onClose} className="py-2 px-4 border border-slate-300 rounded-md shadow-sm text-sm font-medium text-slate-700 bg-white hover:bg-slate-50">Close</button>
                </div>
            </div>
        </Modal>
    )
}

export default ProviderProfileModal;