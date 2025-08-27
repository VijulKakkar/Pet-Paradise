


export interface Owner {
  id: string;
  name: string;
  email: string;
  phone: string;
}

export enum UserRole {
  PetOwner = 'Pet Owner',
  ServiceProvider = 'Service Provider',
  Evaluator = 'Evaluator',
}

export enum PetSpecies {
  Dog = 'Dog',
  Cat = 'Cat',
  Rabbit = 'Rabbit',
  Bird = 'Bird',
  Fish = 'Fish',
  Hamster = 'Hamster',
  Other = 'Other',
}

export interface Pet {
  id: string;
  ownerId: string;
  name: string;
  species: PetSpecies;
  breed: string;
  birthDate: string; // ISO string format
  gender: 'Male' | 'Female';
  profilePhotoUrl: string;
  galleryPhotos: string[];
  microchipId?: string;
  height?: number; // in cm
  healthRecords: HealthRecord[];
  documents: PetDocument[];
  weightLog: WeightEntry[];
  likes?: string;
  dislikes?: string;
  favoriteFood?: string;
  dietaryNotes?: string;
}

export interface HealthRecord {
  id: string;
  type: 'Vaccination' | 'Vet Visit' | 'Medication' | 'Allergy';
  date: string;
  title: string;
  details: string;
  nextDueDate?: string;
}

export interface PetDocument {
  id: string;
  name: string; // User-provided name for the document
  uploadDate: string;
  fileName: string; // e.g., 'lab_results.pdf'
  mimeType: string; // e.g., 'application/pdf'
  content: string; // Base64 data URI
}

export interface WeightEntry {
  date: string; // ISO string format
  weight: number; // in kg
}

export enum ServiceType {
  Vet = 'Vet',
  Grooming = 'Grooming',
  Daycare = 'Daycare',
  Training = 'Training',
  Spa = 'Spa',
}

export enum ServiceLocation {
  InStore = 'In-Store Only',
  AtHome = 'At Home Only',
  Both = 'In-Store & At Home',
}

export interface TeamMember {
    name: string;
    title: string;
    photoUrl: string;
}

export interface ServiceProvider {
  id: string;
  name: string;
  type: ServiceType;
  serviceLocation?: ServiceLocation;
  servicesOffered: string[];
  location: string;
  contact: {
    phone: string;
    email: string;
  };
  rating: number;
  reviews: Review[];
  workingHours: {
    start: string; // e.g., "09:00"
    end: string;   // e.g., "17:00"
  };
  slotDuration: number; // in minutes
  about: string;
  team: TeamMember[];
  gallery: string[];
  amenities: string[];
  businessPolicies: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
}

export enum AppointmentStatus {
  Pending = 'Pending',
  Confirmed = 'Confirmed',
  Completed = 'Completed',
  Cancelled = 'Cancelled',
  Declined = 'Declined'
}

export interface Appointment {
  id: string;
  ownerId: string;
  providerId: string;
  petId: string;
  service: string;
  status: AppointmentStatus;
  ownerNotes?: string;
  providerNotes?: string;
  dateRange: {
    start: string;
    end: string;
  };
}

export interface Tutorial {
  id: string;
  category: string;
  title: string;
  content: string;
}

export interface Meetup {
  id: string;
  organizerId: string;
  organizerName: string;
  title: string;
  location: string;
  date: string;
  time: string;
  description: string;
  petSpecies: PetSpecies[];
  interestedCount: number;
}

export interface ClientProviderLink {
  providerId: string;
  ownerId: string;
}

export enum ProductCategory {
  DogSupplies = 'Dog Supplies',
  CatSupplies = 'Cat Supplies',
  FishAquatics = 'Fish & Aquatics',
  SmallAnimals = 'Small Animals',
  PetFood = 'Pet Food',
  Toys = 'Toys',
  Grooming = 'Grooming Tools',
  Health = 'Health & Wellness',
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: ProductCategory;
}