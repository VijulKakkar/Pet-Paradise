import React from 'react';
import { Pet } from '../../types';
import Card from '../common/Card';
import { ShieldCheck, CheckCircle, ExternalLink } from 'lucide-react';

interface InsuranceManagerProps {
  pet: Pet;
}

const InsuranceManager: React.FC<InsuranceManagerProps> = ({ pet }) => {
  const insuranceProviders = [
    {
      name: 'Pawsitive Insurance',
      logo: 'https://placehold.co/100x40/06b6d4/ffffff?text=Pawsitive',
      description: 'Comprehensive plans covering accidents, illnesses, and wellness.',
      features: ['Up to 90% reimbursement', '24/7 vet chat', 'No age limits'],
      link: 'https://www.lemonade.com/pet'
    },
    {
      name: 'FetchSure Pet Health',
      logo: 'https://placehold.co/100x40/10b981/ffffff?text=FetchSure',
      description: 'Flexible and affordable coverage for unexpected vet bills.',
      features: ['Customizable deductibles', 'Fast claims processing', 'Covers hereditary conditions'],
      link: 'https://spotpetins.com/'
    },
    {
      name: 'Guardian Paws',
      logo: 'https://placehold.co/100x40/f59e0b/ffffff?text=Guardian',
      description: 'Protect your pet and your wallet with our top-rated plans.',
      features: ['Accident-only plans available', 'Multi-pet discounts', '30-day money-back guarantee'],
      link: 'https://www.manypets.com/'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-700">Pet Insurance Marketplace</h3>
        <p className="text-slate-500 mt-1">Find the perfect insurance plan to keep {pet.name} safe and healthy.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {insuranceProviders.map((provider) => (
          <Card key={provider.name} className="flex flex-col">
            <div className="p-6 flex-grow">
              <img src={provider.logo} alt={`${provider.name} logo`} className="h-10 mb-4" />
              <p className="text-slate-600 text-sm">{provider.description}</p>
              <ul className="mt-4 space-y-2 text-sm">
                {provider.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-slate-50 p-4 border-t border-slate-200">
              <a 
                href={provider.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="w-full flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
              >
                <ExternalLink size={18} />
                Get a Quote
              </a>
            </div>
          </Card>
        ))}
      </div>

      <Card className="p-6 bg-blue-50">
        <div className="flex items-start gap-4">
          <ShieldCheck className="w-8 h-8 text-blue-500 flex-shrink-0" />
          <div>
            <h4 className="font-bold text-slate-800">Why Get Pet Insurance?</h4>
            <p className="text-slate-600 mt-1">Pet insurance helps manage the costs of unexpected veterinary care, ensuring you can make decisions about your pet's health based on need, not cost. It provides peace of mind for accidents, illnesses, and can even cover routine wellness visits.</p>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default InsuranceManager;