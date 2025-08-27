


import React, { useState } from 'react';
import { useData } from '../../context/DataContext';
import { ServiceProvider, ServiceType, Product, ProductCategory, ServiceLocation } from '../../types';
import { Star, MapPin, Phone, Mail, CalendarPlus, Briefcase, ShoppingCart, Dog, Cat, Fish, Bug as SmallAnimalIcon, Bone as FoodIcon, ToyBrick, Scissors, HeartPulse, ArrowLeft, DollarSign, Home, Store } from 'lucide-react';
import Card from '../common/Card';

interface MarketplaceProps {
  onBookForProvider?: (providerId: string) => void;
  onProviderClick?: (provider: ServiceProvider) => void;
}

const renderStars = (rating: number) => {
  return Array.from({ length: 5 }, (_, i) => (
    <Star key={i} size={16} className={i < Math.round(rating) ? 'text-yellow-400 fill-current' : 'text-slate-300'} />
  ));
};

const ServiceProviderCard: React.FC<{provider: ServiceProvider, onBookForProvider?: (providerId: string) => void, onProviderClick?: (provider: ServiceProvider) => void}> = ({provider, onBookForProvider, onProviderClick}) => (
    <Card 
        className="flex flex-col justify-between"
        onClick={onProviderClick ? () => onProviderClick(provider) : undefined}
    >
        <div>
            <div className="p-6">
                <p className="text-sm font-semibold text-cyan-600">{provider.type}</p>
                <h4 className="text-xl font-bold mt-1 text-slate-800">{provider.name}</h4>
                <div className="flex items-center gap-2 mt-2">
                    {renderStars(provider.rating)}
                    <span className="text-sm text-slate-500">({provider.rating.toFixed(1)})</span>
                </div>
                <div className="mt-4 space-y-2 text-slate-600">
                    <p className="flex items-center gap-2"><MapPin size={16} /> {provider.location}</p>
                    <p className="flex items-center gap-2"><Phone size={16} /> {provider.contact.phone}</p>
                    <p className="flex items-center gap-2"><Mail size={16} /> {provider.contact.email}</p>
                </div>
                {provider.serviceLocation && (
                    <div className="mt-4 pt-3 border-t border-slate-100">
                        <div className="flex items-center gap-2 text-sm text-slate-600 font-medium">
                            {provider.serviceLocation.includes('Store') && <Store size={16} className="text-slate-500"/>}
                            {provider.serviceLocation.includes('Home') && <Home size={16} className="text-slate-500"/>}
                            <span className="font-semibold">{provider.serviceLocation}</span>
                        </div>
                    </div>
                )}
            </div>
            <div className="bg-slate-50 p-4">
                <h5 className="font-semibold text-sm text-slate-700 mb-2">Services</h5>
                <div className="flex flex-wrap gap-2">
                    {provider.servicesOffered.map(service => (
                        <span key={service} className="text-xs bg-slate-200 text-slate-700 px-2 py-1 rounded-full">{service}</span>
                    ))}
                </div>
            </div>
        </div>
        {onBookForProvider && (
            <div className="p-4 border-t border-slate-200">
                <button 
                    onClick={(e) => {
                        e.stopPropagation(); // prevent card's onClick from firing
                        onBookForProvider(provider.id);
                    }}
                    className="w-full flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors"
                >
                    <CalendarPlus size={18} />
                    Book Appointment
                </button>
            </div>
        )}
    </Card>
  );

const ServiceProvidersView: React.FC<MarketplaceProps> = ({ onBookForProvider, onProviderClick }) => {
    const { providers } = useData();
    const [filter, setFilter] = useState<ServiceType | 'All'>('All');
    const filteredProviders = filter === 'All' ? providers : providers.filter(p => p.type === filter);
    
    return (
        <div className="space-y-4">
            <div className="flex flex-wrap gap-2">
                {(['All', ...Object.values(ServiceType)] as const).map(type => (
                <button
                    key={type}
                    onClick={() => setFilter(type)}
                    className={`px-4 py-2 text-sm font-semibold rounded-full transition-colors ${
                    filter === type ? 'bg-cyan-500 text-white' : 'bg-white text-slate-600 hover:bg-slate-100'
                    }`}
                >
                    {type}
                </button>
                ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProviders.map(provider => (
                    <ServiceProviderCard key={provider.id} provider={provider} onBookForProvider={onBookForProvider} onProviderClick={onProviderClick} />
                ))}
            </div>
      </div>
    );
};

const ProductCard: React.FC<{product: Product}> = ({product}) => {
    return (
        <Card className="flex flex-col justify-between group">
            <div className="overflow-hidden rounded-t-xl">
                <img src={product.imageUrl} alt={product.name} className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"/>
            </div>
            <div className="p-4 flex-grow flex flex-col">
                <h4 className="text-lg font-bold text-slate-800 truncate">{product.name}</h4>
                <p className="text-sm text-slate-500 mt-1 flex-grow h-10">{product.description}</p>
                <p className="text-2xl font-bold text-slate-900 mt-4 flex items-center gap-1"><DollarSign size={20} className="text-slate-500"/>{product.price.toFixed(2)}</p>
            </div>
            <div className="p-4 border-t border-slate-200 bg-slate-50 rounded-b-xl">
                <button className="w-full flex items-center justify-center gap-2 bg-cyan-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-cyan-600 transition-colors">
                    <ShoppingCart size={18}/> Add to Cart
                </button>
            </div>
        </Card>
    );
};

const PetStoreView: React.FC = () => {
    const { products } = useData();
    const [selectedCategory, setSelectedCategory] = useState<ProductCategory | null>(null);

    const categories = Object.values(ProductCategory);
    const categoryIcons: Record<ProductCategory, React.ElementType> = {
        [ProductCategory.DogSupplies]: Dog,
        [ProductCategory.CatSupplies]: Cat,
        [ProductCategory.FishAquatics]: Fish,
        [ProductCategory.SmallAnimals]: SmallAnimalIcon,
        [ProductCategory.PetFood]: FoodIcon,
        [ProductCategory.Toys]: ToyBrick,
        [ProductCategory.Grooming]: Scissors,
        [ProductCategory.Health]: HeartPulse,
    };

    const categoryDescriptions: Record<ProductCategory, string> = {
        [ProductCategory.DogSupplies]: 'Everything your dog needs, from collars to comfy beds.',
        [ProductCategory.CatSupplies]: 'Find the perfect towers, toys, and litter solutions for your feline.',
        [ProductCategory.FishAquatics]: 'Equip your aquarium with filters, decor, and more.',
        [ProductCategory.SmallAnimals]: 'Supplies for rabbits, hamsters, and other small pets.',
        [ProductCategory.PetFood]: 'A wide selection of nutritious food and tasty treats for all pets.',
        [ProductCategory.Toys]: 'Keep your pets entertained with our fun and durable toys.',
        [ProductCategory.Grooming]: 'Tools and products to keep your pet looking and feeling great.',
        [ProductCategory.Health]: 'Supplements and supplies for your pet\'s well-being.',
    };

    if (selectedCategory) {
        const filteredProducts = products.filter(p => p.category === selectedCategory);
        return (
            <div className="animate-fade-in">
                <button onClick={() => setSelectedCategory(null)} className="flex items-center gap-2 text-cyan-600 font-semibold hover:text-cyan-800 mb-6 bg-cyan-50 hover:bg-cyan-100 py-2 px-4 rounded-lg transition-colors">
                    <ArrowLeft size={18} /> Back to Store Categories
                </button>
                <h3 className="text-3xl font-bold text-slate-700 mb-6">{selectedCategory}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredProducts.map(product => <ProductCard key={product.id} product={product} />)}
                </div>
            </div>
        );
    }
    
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
            {categories.map(category => {
                const Icon = categoryIcons[category];
                return (
                    <Card key={category} onClick={() => setSelectedCategory(category)} className="p-6 text-center">
                        <Icon className="w-12 h-12 text-cyan-500 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-slate-800">{category}</h3>
                        <p className="text-sm text-slate-500 mt-1 h-10">{categoryDescriptions[category]}</p>
                    </Card>
                );
            })}
        </div>
    );
};


const Marketplace: React.FC<MarketplaceProps> = ({ onBookForProvider, onProviderClick }) => {
  const [view, setView] = useState<'services' | 'store'>('services');
  
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl font-bold text-slate-700">Marketplace</h3>
        <p className="text-slate-500 mt-1">
          {view === 'services'
            ? 'Browse our network of trusted vets, groomers, and daycares.'
            : 'Shop for all your pet needs, from food to fun.'}
        </p>
      </div>
      
       <div className="flex justify-center mb-6 border border-slate-200 rounded-full p-1 bg-slate-100 w-fit mx-auto shadow-sm">
        <button
            onClick={() => setView('services')}
            className={`flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${view === 'services' ? 'bg-white text-cyan-600 shadow' : 'text-slate-600 hover:bg-slate-200'}`}
        >
            <Briefcase size={16} /> Services
        </button>
        <button
            onClick={() => setView('store')}
            className={`flex items-center gap-2 px-6 py-2 text-sm font-semibold rounded-full transition-all duration-300 ${view === 'store' ? 'bg-white text-cyan-600 shadow' : 'text-slate-600 hover:bg-slate-200'}`}
        >
            <ShoppingCart size={16} /> Pet Store
        </button>
      </div>

      {view === 'services' ? (
        <ServiceProvidersView onBookForProvider={onBookForProvider} onProviderClick={onProviderClick} />
      ) : (
        <PetStoreView />
      )}
      
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

export default Marketplace;