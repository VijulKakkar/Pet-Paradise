import { Pet, ServiceProvider, Appointment, Tutorial, PetSpecies, ServiceType, AppointmentStatus, Meetup, Owner, Product, ProductCategory, ServiceLocation } from '../types';

export const DEMO_OWNERS: Owner[] = [
    { id: 'user_owner_01', name: 'Sarah', email: 'alex.j@example.com', phone: '555-123-4567' },
    { id: 'user_owner_02', name: 'Sam Miller', email: 'sam.m@example.com', phone: '555-987-6543' },
    { id: 'user_owner_03', name: 'Maria Garcia', email: 'maria.g@example.com', phone: '555-111-2222' },
    { id: 'user_owner_04', name: 'Kenji Tanaka', email: 'kenji.t@example.com', phone: '555-333-4444' },
    { id: 'user_owner_05', name: 'Chloe Dubois', email: 'chloe.d@example.com', phone: '555-555-6666' },
];

const ownerId = 'user_owner_01';
const ownerId2 = 'user_owner_02';
const ownerId3 = 'user_owner_03';
const ownerId4 = 'user_owner_04';
const ownerId5 = 'user_owner_05';

const getBirthDateFromAge = (age: number) => {
    const today = new Date();
    return new Date(today.setFullYear(today.getFullYear() - age)).toISOString();
}

export const DEMO_PETS: Pet[] = [
  {
    id: 'pet_01',
    ownerId,
    name: 'Buddy',
    species: PetSpecies.Dog,
    breed: 'Golden Retriever',
    birthDate: getBirthDateFromAge(5),
    gender: 'Male',
    height: 58,
    profilePhotoUrl: 'https://images.unsplash.com/photo-1600804340584-c7db2eacf0bf?q=80&w=400&h=400&fit=crop',
    galleryPhotos: [],
    microchipId: '985112003456789',
    healthRecords: [
      { id: 'hr_01', type: 'Vaccination', date: '2023-06-15', title: 'Rabies Vaccine', details: '3-year booster shot.', nextDueDate: '2026-06-15' },
      { id: 'hr_02', type: 'Vet Visit', date: '2024-01-20', title: 'Annual Checkup', details: 'All clear, healthy weight.' },
      { id: 'hr_03', type: 'Allergy', date: '2022-05-10', title: 'Pollen', details: 'Mild seasonal allergies. Shows signs of sneezing in spring.' }
    ],
    documents: [
        {
            id: 'doc_01', 
            name: 'Vet Receipt - Jan 2024', 
            uploadDate: '2024-01-20',
            fileName: 'vet-receipt-jan-2024.txt',
            mimeType: 'text/plain',
            content: `data:text/plain;base64,${btoa('Service: Annual Checkup\nCost: $75.00\nNotes: All clear, healthy weight.')}`
        }
    ],
    weightLog: [
      { date: '2023-01-01', weight: 34 },
      { date: '2023-07-01', weight: 35 },
      { date: '2024-01-01', weight: 34.5 },
      { date: '2024-07-01', weight: 35.5 },
    ],
    likes: 'Playing fetch, swimming in the lake, belly rubs',
    dislikes: 'Thunderstorms, being left alone for too long',
    favoriteFood: 'Peanut butter & kibble mix',
    dietaryNotes: '2 cups of sensitive stomach formula dry food, twice a day. Avoids chicken-based treats.'
  },
  {
    id: 'pet_02',
    ownerId,
    name: 'Lucy',
    species: PetSpecies.Cat,
    breed: 'Siamese',
    birthDate: getBirthDateFromAge(3),
    gender: 'Female',
    height: 25,
    profilePhotoUrl: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?q=80&w=400&h=400&fit=crop',
    galleryPhotos: [],
    healthRecords: [],
    documents: [],
    weightLog: [
        { date: '2023-06-01', weight: 4.5 },
        { date: '2024-01-01', weight: 4.7 },
        { date: '2024-06-01', weight: 4.8 },
    ],
    likes: 'Napping in sunbeams, chasing laser pointers, climbing on shelves',
    dislikes: 'Loud noises, vacuum cleaner',
    favoriteFood: 'Tuna-flavored wet food',
    dietaryNotes: '1/4 cup of indoor cat formula dry food in the morning, half a can of wet food at night.'
  },
  {
    id: 'pet_04', ownerId: ownerId2, name: 'Rocky', species: PetSpecies.Dog, breed: 'German Shepherd', birthDate: getBirthDateFromAge(7), gender: 'Male', 
    height: 63,
    profilePhotoUrl: 'https://images.unsplash.com/photo-1568572933382-74d440642117?q=80&w=400&h=400&fit=crop', 
    galleryPhotos: [], 
    healthRecords: [], 
    documents: [], 
    weightLog: [],
    likes: 'Playing fetch with a heavy-duty ball, going for long runs, learning new tricks',
    dislikes: 'Being left alone, strangers approaching too quickly',
    favoriteFood: 'Grilled chicken breast',
    dietaryNotes: 'High-protein diet for active dogs. 3 cups of large breed formula daily.'
  },
  {
    id: 'pet_05', ownerId: ownerId2, name: 'Misty', species: PetSpecies.Cat, breed: 'Persian', birthDate: getBirthDateFromAge(8), gender: 'Female', 
    height: 24,
    profilePhotoUrl: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?q=80&w=400&h=400&fit=crop', 
    galleryPhotos: [], 
    healthRecords: [], 
    documents: [], 
    weightLog: [],
    likes: 'Being brushed, sitting on laps, quiet afternoons',
    dislikes: 'Sudden movements, dogs',
    favoriteFood: 'Salmon pate',
    dietaryNotes: 'Specialty food for long-haired cats to prevent hairballs. Needs daily grooming.'
  },
  // Maria's Pets
  {
    id: 'pet_06',
    ownerId: ownerId3,
    name: 'Pepper',
    species: PetSpecies.Dog,
    breed: 'Dachshund',
    birthDate: getBirthDateFromAge(4),
    gender: 'Female',
    height: 23,
    profilePhotoUrl: 'https://images.unsplash.com/photo-1530281700549-e82e7bf110d6?q=80&w=400&h=400&fit=crop',
    galleryPhotos: [],
    healthRecords: [
      { id: 'hr_04', type: 'Vaccination', date: '2023-09-01', title: 'DHLPP Vaccine', details: '1-year booster.', nextDueDate: '2024-09-01' }
    ],
    documents: [],
    weightLog: [
      { date: '2023-10-01', weight: 7 },
      { date: '2024-04-01', weight: 7.2 }
    ],
    likes: 'Burrowing in blankets, sunbathing, barking at squirrels',
    dislikes: 'Rain, being picked up by strangers',
    favoriteFood: 'Cheese bits',
    dietaryNotes: 'Small breed formula, prone to back issues so keep weight managed.'
  },
  {
    id: 'pet_07',
    ownerId: ownerId3,
    name: 'Ginger',
    species: PetSpecies.Cat,
    breed: 'Orange Tabby',
    birthDate: getBirthDateFromAge(6),
    gender: 'Female',
    height: 24,
    profilePhotoUrl: 'https://images.unsplash.com/photo-1596854407944-bf87f6fdd49e?q=80&w=400&h=400&fit=crop',
    galleryPhotos: [],
    healthRecords: [],
    documents: [],
    weightLog: [
      { date: '2023-08-01', weight: 5.0 },
      { date: '2024-02-01', weight: 5.1 }
    ],
    likes: 'Bird watching from the window, kneading soft blankets',
    dislikes: 'The other cat getting attention',
    favoriteFood: 'Chicken and liver pate',
    dietaryNotes: 'Tends to overeat, portions should be measured.'
  },
  // Kenji's Pets
  {
    id: 'pet_08',
    ownerId: ownerId4,
    name: 'Kiko',
    species: PetSpecies.Dog,
    breed: 'Shiba Inu',
    birthDate: getBirthDateFromAge(3),
    gender: 'Male',
    height: 40,
    profilePhotoUrl: 'https://images.unsplash.com/photo-1543466835-00a7907e9de1?q=80&w=400&h=400&fit=crop',
    galleryPhotos: [],
    healthRecords: [
      { id: 'hr_05', type: 'Allergy', date: '2023-07-15', title: 'Seasonal Pollen', details: 'Gets itchy paws during spring.' }
    ],
    documents: [],
    weightLog: [
      { date: '2023-05-01', weight: 10 },
      { date: '2024-05-01', weight: 10.5 }
    ],
    likes: 'Going for hikes, puzzle toys, being independent',
    dislikes: 'Having his paws touched, overly enthusiastic dogs',
    favoriteFood: 'Salmon skin',
    dietaryNotes: 'No specific dietary restrictions.'
  },
  {
    id: 'pet_09',
    ownerId: ownerId4,
    name: 'Mochi',
    species: PetSpecies.Rabbit,
    breed: 'Netherland Dwarf',
    birthDate: getBirthDateFromAge(2),
    gender: 'Female',
    height: 15,
    profilePhotoUrl: 'https://images.unsplash.com/photo-1518796745738-41048802f99a?q=80&w=400&h=400&fit=crop',
    galleryPhotos: [],
    healthRecords: [],
    documents: [],
    weightLog: [
      { date: '2024-01-01', weight: 1.1 }
    ],
    likes: 'Timothy hay, cardboard tunnels, getting head scratches',
    dislikes: 'Loud noises, being held for too long',
    favoriteFood: 'Small piece of banana as a treat',
    dietaryNotes: 'Unlimited timothy hay, 1/8 cup of pellets daily, fresh greens.'
  },
  // Chloe's Pets
  {
    id: 'pet_10',
    ownerId: ownerId5,
    name: 'Oscar',
    species: PetSpecies.Dog,
    breed: 'French Bulldog',
    birthDate: getBirthDateFromAge(2),
    gender: 'Male',
    height: 30,
    profilePhotoUrl: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?q=80&w=400&h=400&fit=crop',
    galleryPhotos: [],
    healthRecords: [],
    documents: [],
    weightLog: [
      { date: '2023-09-01', weight: 12 },
      { date: '2024-03-01', weight: 12.8 }
    ],
    likes: 'Snoring on the couch, meeting new people, car rides',
    dislikes: 'Hot weather, stairs',
    favoriteFood: 'Anything he is not supposed to eat',
    dietaryNotes: 'Prone to skin allergies, feed hypoallergenic food.'
  },
  {
    id: 'pet_11',
    ownerId: ownerId5,
    name: 'Simone',
    species: PetSpecies.Cat,
    breed: 'Ragdoll',
    birthDate: getBirthDateFromAge(4),
    gender: 'Female',
    height: 26,
    profilePhotoUrl: 'https://images.unsplash.com/photo-1615789591457-74a63395c990?q=80&w=400&h=400&fit=crop',
    galleryPhotos: [],
    healthRecords: [
      { id: 'hr_06', type: 'Vet Visit', date: '2024-02-10', title: 'Dental Cleaning', details: 'Minor tartar buildup removed.' }
    ],
    documents: [],
    weightLog: [
      { date: '2023-06-01', weight: 5.5 },
      { date: '2024-06-01', weight: 5.6 }
    ],
    likes: 'Being carried around like a baby, gentle brushing',
    dislikes: 'Closed doors, being ignored',
    favoriteFood: 'Boiled shredded chicken',
    dietaryNotes: 'Can be a picky eater. Prefers wet food over dry kibble.'
  },
];

export const DEMO_PROVIDERS: ServiceProvider[] = [
  // Vets
  { 
    id: 'provider_vet_01', 
    name: 'Oakwood Animal Hospital', 
    type: ServiceType.Vet, 
    servicesOffered: ['Annual Checkups', 'Vaccinations', 'Surgery', 'Dental Care'], 
    location: 'Sunnyvale, CA', 
    contact: { phone: '555-0101', email: 'contact@oakwoodvet.com' }, 
    rating: 4.8, 
    reviews: [{id: 'r1', author: 'Jane D.', rating: 5, comment: 'Very caring staff!'}], 
    workingHours: { start: '09:00', end: '17:00' }, 
    slotDuration: 30,
    about: 'Oakwood Animal Hospital is a full-service veterinary medical facility, located in Sunnyvale, CA. Our professional and courteous staff seeks to provide the best possible medical, surgical, and dental care for our highly-valued patients.',
    team: [
      { name: 'Dr. Emily Carter, DVM', title: 'Lead Veterinarian', photoUrl: 'https://images.unsplash.com/photo-1559839734-2b71ea197ec2?q=80&w=200&h=200&fit=crop' },
      { name: 'Dr. Ben Hanson, DVM', title: 'Associate Veterinarian', photoUrl: 'https://images.unsplash.com/photo-1622253692010-333f2da6031d?q=80&w=200&h=200&fit=crop' }
    ],
    gallery: [],
    amenities: ['In-house Laboratory', 'Digital X-Ray', 'Surgical Suite', 'Online Pharmacy'],
    businessPolicies: 'Appointments cancelled with less than 24 hours notice may be subject to a cancellation fee. For the safety of all animals in our care, we require that all vaccinations be up-to-date.'
  },
  { 
    id: 'provider_vet_02', 
    name: 'Bayside Veterinary Clinic', 
    type: ServiceType.Vet, 
    servicesOffered: ['Emergency Care', 'Checkups', 'X-Rays'], 
    location: 'Redwood City, CA', 
    contact: { phone: '555-0102', email: 'info@baysidevet.com' }, 
    rating: 4.6, 
    reviews: [], 
    workingHours: { start: '08:00', end: '18:00' }, 
    slotDuration: 30,
    about: 'We are committed to promoting responsible pet ownership, preventative health care and health-related educational opportunities for our clients. Bayside Veterinary Clinic strives to offer excellence in veterinary care to Redwood City and surrounding areas.',
    team: [
      { name: 'Dr. Jessica Chen, DVM', title: 'Head of Surgery', photoUrl: 'https://images.unsplash.com/photo-1537368910025-70035079f59f?q=80&w=200&h=200&fit=crop' }
    ],
    gallery: [],
    amenities: ['24/7 Emergency Services', 'Ultrasound Imaging', 'Intensive Care Unit (ICU)'],
    businessPolicies: 'Payment is expected when services are rendered. In order to streamline our services, we do not bill. We accept debit cards, credit cards (Visa, Mastercard, Discover, American Express) and cash.'
  },
  { 
    id: 'provider_vet_03', 
    name: 'Greenfield Pet Wellness', 
    type: ServiceType.Vet, 
    servicesOffered: ['Holistic Care', 'Acupuncture', 'Checkups'], 
    location: 'Palo Alto, CA', 
    contact: { phone: '555-0103', email: 'support@greenfieldpet.com' }, 
    rating: 4.9, 
    reviews: [], 
    workingHours: { start: '10:00', end: '16:00' }, 
    slotDuration: 60,
    about: 'A holistic approach to pet wellness. We integrate conventional and alternative therapies to promote healing and provide the highest quality of life for your pet.',
    team: [
      { name: 'Dr. Alan Green, DVM, CVA', title: 'Holistic Vet & Acupuncturist', photoUrl: 'https://images.unsplash.com/photo-1580281658223-9b93f18ae9ae?q=80&w=200&h=200&fit=crop' }
    ],
    gallery: [],
    amenities: ['Pet Acupuncture', 'Herbal Medicine', 'Nutritional Counseling', 'Aromatherapy'],
    businessPolicies: 'Due to the longer appointment times for holistic consultations, a deposit is required at the time of booking.'
  },
  // Groomers
  { 
    id: 'provider_groom_01', 
    name: 'Pristine Paws Grooming', 
    type: ServiceType.Grooming,
    serviceLocation: ServiceLocation.InStore,
    servicesOffered: ['Full Groom', 'Bath & Brush', 'Nail Trim', 'Teeth Cleaning'], 
    location: 'Sunnyvale, CA', 
    contact: { phone: '555-0201', email: 'appointments@pristinepaws.com' }, 
    rating: 4.7, 
    reviews: [], 
    workingHours: { start: '08:30', end: '18:00' }, 
    slotDuration: 90,
    about: 'We believe grooming is an essential part of a pet\'s health. Our experienced groomers provide top-notch service in a calm and safe environment.',
    team: [
        { name: 'Maria Rodriguez', title: 'Master Groomer', photoUrl: 'https://images.unsplash.com/photo-1525011214256-820f4c15b1a3?q=80&w=200&h=200&fit=crop' }
    ],
    gallery: [],
    amenities: ['Hypoallergenic Shampoos', 'Walk-in Nail Trims', 'Express Grooming Option', 'Blueberry Facials'],
    businessPolicies: 'All pets must be up-to-date on Rabies vaccinations. Please mention any matting or behavioral issues when booking.'
  },
  { 
    id: 'provider_groom_02', 
    name: 'The Fluffy Puppy Salon', 
    type: ServiceType.Grooming, 
    serviceLocation: ServiceLocation.InStore,
    servicesOffered: ['Breed-specific Cuts', 'De-shedding', 'Flea Bath'], 
    location: 'Mountain View, CA', 
    contact: { phone: '555-0202', email: 'fluffypuppy@email.com' }, 
    rating: 4.8, 
    reviews: [], 
    workingHours: { start: '09:00', end: '17:00' }, 
    slotDuration: 120,
    about: 'Specializing in breed-specific styles and de-shedding treatments to make your pet look and feel their best. We treat every dog like family.',
    team: [
      { name: 'David Chen', title: 'Stylist & Owner', photoUrl: 'https://images.unsplash.com/photo-1621257912239-a9a3857e4e1f?q=80&w=200&h=200&fit=crop' }
    ],
    gallery: [],
    amenities: ['Creative Coloring (Pet-Safe)', 'Deep-Conditioning Treatments', 'Paw Pad Moisturizing'],
    businessPolicies: 'We book by appointment only to ensure a one-on-one experience. A no-show fee will be applied for missed appointments without notice.'
  },
  { 
    id: 'provider_groom_03', 
    name: 'Sleek Whiskers Cat Grooming', 
    type: ServiceType.Grooming, 
    serviceLocation: ServiceLocation.InStore,
    servicesOffered: ['Lion Cut', 'Mat Removal', 'Waterless Shampoo'], 
    location: 'Santa Clara, CA', 
    contact: { phone: '555-0203', email: 'contact@sleekwhiskers.com' }, 
    rating: 4.9, 
    reviews: [], 
    workingHours: { start: '10:00', end: '16:00' }, 
    slotDuration: 60,
    about: 'A cats-only salon dedicated to providing a quiet, dog-free environment for our feline friends. We are experts in handling cats of all temperaments.',
    team: [
        { name: 'Samantha Jones', title: 'Certified Feline Master Groomer', photoUrl: 'https://images.unsplash.com/photo-1608848461950-0fe51dfc41cb?q=80&w=200&h=200&fit=crop' }
    ],
    gallery: [],
    amenities: ['Dog-Free Environment', 'Soft Paws Nail Caps Application', 'Calming Pheromone Diffusers'],
    businessPolicies: 'For the safety of our staff and other clients, we do not groom highly aggressive cats. Sedated grooming is available upon veterinary recommendation.'
  },
   {
    id: 'provider_groom_04',
    name: 'Mobile Pet Cuts',
    type: ServiceType.Grooming,
    serviceLocation: ServiceLocation.AtHome,
    servicesOffered: ['Full Groom', 'Bath & Brush', 'Nail Trim', 'Mobile Van Service'],
    location: 'Serves Sunnyvale & Mountain View',
    contact: { phone: '555-0204', email: 'hello@mobilepetcuts.com' },
    rating: 4.9,
    reviews: [],
    workingHours: { start: '09:00', end: '18:00' },
    slotDuration: 120,
    about: 'We bring the grooming salon to your doorstep! Our state-of-the-art mobile van is fully equipped to provide a stress-free grooming experience for your pet right outside your home.',
    team: [{ name: 'Jake Miller', title: 'Owner & Groomer', photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200&h=200&fit=crop' }],
    gallery: [],
    amenities: ['Climate-Controlled Van', 'One-on-One Attention', 'No Cages', 'Servicing Local Area'],
    businessPolicies: 'Appointments must be booked 48 hours in advance. We require a safe and legal place to park our van.'
  },
  // Spas
  { 
    id: 'provider_spa_01', 
    name: 'Zen Paws Pet Spa', 
    type: ServiceType.Spa, 
    serviceLocation: ServiceLocation.InStore,
    servicesOffered: ['Aromatherapy Baths', 'Pawdicures', 'Blueberry Facials', 'Massage'], 
    location: 'Saratoga, CA', 
    contact: { phone: '555-0204', email: 'relax@zenpawsspa.com' }, 
    rating: 4.9, 
    reviews: [], 
    workingHours: { start: '10:00', end: '18:00' }, 
    slotDuration: 75,
    about: 'Indulge your pet in a world of tranquility and relaxation. Our spa services are designed to soothe the body and mind.',
    team: [
        { name: 'Isabella Rossi', title: 'Certified Pet Esthetician', photoUrl: 'https://images.unsplash.com/photo-1596796938602-ab3963a7f6b0?q=80&w=200&h=200&fit=crop' }
    ],
    gallery: [],
    amenities: ['Relaxing Ambient Music', 'All-Natural & Organic Products', 'Warm Towel Wraps', 'Take-home Spa Treats'],
    businessPolicies: 'Our spa is a quiet environment. We ask that owners drop off their pets and return at the designated pickup time to maintain a serene atmosphere.'
  },
  { 
    id: 'provider_spa_02', 
    name: 'Paws & Relax Spa', 
    type: ServiceType.Spa, 
    serviceLocation: ServiceLocation.Both,
    servicesOffered: ['Deep-Conditioning Treatment', 'Pet Massage', 'Blueberry Facial'], 
    location: 'Los Gatos, CA', 
    contact: { phone: '555-0501', email: 'getaway@pawsrelax.com'}, 
    rating: 4.8, 
    reviews: [], 
    workingHours: { start: '09:00', end: '17:00' }, 
    slotDuration: 60,
    about: 'A luxurious getaway for your pet. We focus on therapeutic treatments that rejuvenate and revitalize.',
    team: [],
    gallery: [],
    amenities: ['Therapeutic Massage', 'Aromatherapy', 'Quiet Rooms', 'Mobile Service Available'],
    businessPolicies: 'Please book at least 48 hours in advance. Same-day appointments are not available. Travel surcharge applies for at-home services.'
  },
  { 
    id: 'provider_spa_03', 
    name: 'The Serene Pet Sanctuary', 
    type: ServiceType.Spa, 
    serviceLocation: ServiceLocation.InStore,
    servicesOffered: ['Hydrotherapy Swim', 'Acupressure', 'Soothing Mud Bath'], 
    location: 'Campbell, CA', 
    contact: { phone: '555-0502', email: 'serenity@pet-sanctuary.com'}, 
    rating: 4.9, 
    reviews: [], 
    workingHours: { start: '10:00', end: '16:00' }, 
    slotDuration: 90,
    about: 'A wellness sanctuary offering unique, restorative treatments for pets in need of special care.',
    team: [],
    gallery: [],
    amenities: ['Heated Hydrotherapy Pool', 'Certified Acupressure Specialist', 'Mineral Mud Baths'],
    businessPolicies: 'A veterinary referral may be required for certain hydrotherapy and acupressure services.'
  },
  {
    id: 'provider_spa_04',
    name: 'Home Body Pet Spa',
    type: ServiceType.Spa,
    serviceLocation: ServiceLocation.AtHome,
    servicesOffered: ['Relaxation Massage', 'Aromatherapy', 'Paw-dicure', 'In-Home Consultation'],
    location: 'Serves Palo Alto & Los Gatos',
    contact: { phone: '555-0503', email: 'pamper@homebodyspa.com' },
    rating: 4.8,
    reviews: [],
    workingHours: { start: '10:00', end: '19:00' },
    slotDuration: 90,
    about: 'Bringing the ultimate spa experience to the comfort of your pet\'s favorite place: home. We specialize in relaxation and therapeutic services for anxious or elderly pets.',
    team: [],
    gallery: [],
    amenities: ['Uses Your Pet\'s Familiar Environment', 'Specializes in Anxious Pets', 'All-Natural Products'],
    businessPolicies: 'A quiet, dedicated space is required for the duration of the service. Travel fees may apply for locations outside our primary service area.'
  },
  // Daycares
  { 
    id: 'provider_daycare_01', 
    name: 'Happy Tails Dog Daycare', 
    type: ServiceType.Daycare, 
    servicesOffered: ['Full Day Care', 'Half Day Care', 'Overnight Boarding'], 
    location: 'Sunnyvale, CA', 
    contact: { phone: '555-0301', email: 'play@happytails.com' }, 
    rating: 4.9, 
    reviews: [], 
    workingHours: { start: '07:00', end: '19:00' }, 
    slotDuration: 60,
    about: 'A safe and fun environment for dogs to play, socialize, and burn off energy under the supervision of our trained staff.',
    team: [
        { name: 'Tom Johnson', title: 'Daycare Manager', photoUrl: 'https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?q=80&w=200&h=200&fit=crop' }
    ],
    gallery: [],
    amenities: ['Large Indoor Play Area', 'Supervised Outdoor Yard', 'Live Webcams', 'Nap Time in Crates'],
    businessPolicies: 'All dogs must pass a temperament test before their first day. Proof of vaccination for Rabies, DHLPP, and Bordetella is required.'
  },
  { 
    id: 'provider_daycare_02', 
    name: 'The Urban Paw', 
    type: ServiceType.Daycare, 
    servicesOffered: ['Doggie Daycare', 'Luxury Boarding Suites', 'Webcam Access'], 
    location: 'San Jose, CA', 
    contact: { phone: '555-0302', email: 'stay@theurbanpaw.com' }, 
    rating: 4.7, 
    reviews: [], 
    workingHours: { start: '07:30', end: '18:30' }, 
    slotDuration: 60,
    about: 'A premier pet resort offering upscale daycare and boarding. We provide a clean, secure, and engaging environment for your peace of mind.',
    team: [],
    gallery: [],
    amenities: ['Climate-Controlled Indoor Playgrounds', 'Private Luxury Suites', 'Gourmet Meal Options', 'Pool Parties'],
    businessPolicies: 'Reservations are required for all services. Holiday bookings fill up fast, so please plan ahead!'
  },
  { 
    id: 'provider_daycare_03', 
    name: 'Catopia Cat Boarding', 
    type: ServiceType.Daycare, 
    servicesOffered: ['Individual Cat Condos', 'Playtime', 'Gourmet Meals'], 
    location: 'Cupertino, CA', 
    contact: { phone: '555-0303', email: 'purr@catopia.com' }, 
    rating: 5.0, 
    reviews: [], 
    workingHours: { start: '09:00', end: '17:00' }, 
    slotDuration: 60,
    about: 'A tranquil, dogs-free boarding facility exclusively for cats. Our multi-level condos provide plenty of space to climb and relax.',
    team: [],
    gallery: [],
    amenities: ['Spacious Multi-Level Condos', 'Individual Play Sessions', 'Window Views with Bird Feeders', 'Calming Music'],
    businessPolicies: 'We require proof of FVRCP and Rabies vaccinations. We do not accept un-neutered male cats over 6 months of age.'
  },
  // Trainers
  { 
    id: 'provider_train_01', 
    name: 'Good Boy Dog Training', 
    type: ServiceType.Training, 
    serviceLocation: ServiceLocation.InStore,
    servicesOffered: ['Puppy Kindergarten', 'Basic Obedience', 'Agility Basics'], 
    location: 'Mountain View, CA', 
    contact: { phone: '555-0401', email: 'info@goodboytraining.com' }, 
    rating: 4.9, 
    reviews: [{id: 'rev_t1', author: 'Alex P.', rating: 5, comment: 'Transformed our rambunctious puppy into a well-behaved companion!'}], 
    workingHours: { start: '10:00', end: '19:00' }, 
    slotDuration: 50,
    about: 'Using positive reinforcement techniques, we help you build a stronger bond with your dog and achieve your training goals.',
    team: [
        { name: 'Sarah Miller', title: 'Certified Professional Dog Trainer (CPDT-KA)', photoUrl: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=200&h=200&fit=crop' }
    ],
    gallery: [],
    amenities: ['Indoor Training Facility', 'Small Class Sizes', 'Private One-on-One Sessions', 'Agility Equipment'],
    businessPolicies: 'Group classes are non-refundable. Please ensure your dog is comfortable in a group setting before enrolling.'
  },
  { 
    id: 'provider_train_02', 
    name: 'The Confident Canine', 
    type: ServiceType.Training, 
    serviceLocation: ServiceLocation.Both,
    servicesOffered: ['Behavioral Consultation', 'Leash Manners', 'Socialization Classes'], 
    location: 'San Jose, CA', 
    contact: { phone: '555-0402', email: 'help@confidentcanine.com' }, 
    rating: 4.8, 
    reviews: [], 
    workingHours: { start: '09:00', end: '17:00' }, 
    slotDuration: 60,
    about: 'Specializing in helping anxious or reactive dogs build confidence and navigate the world calmly.',
    team: [],
    gallery: [],
    amenities: ['Reactive Rover Classes', 'In-Home Consultations', 'Controlled Socialization Setups'],
    businessPolicies: 'An initial behavioral consultation is required before enrolling in any group classes for reactive dogs.'
  },
  {
    id: 'provider_train_03',
    name: 'Pawsitive Steps Home Training',
    type: ServiceType.Training,
    serviceLocation: ServiceLocation.AtHome,
    servicesOffered: ['In-Home Puppy Training', 'Behavioral Modification', 'Family Integration', 'Leash Walking Skills'],
    location: 'Serves Entire South Bay Area',
    contact: { phone: '555-0403', email: 'sara@pawsitivesteps.com' },
    rating: 5.0,
    reviews: [],
    workingHours: { start: '09:00', end: '17:00' },
    slotDuration: 60,
    about: 'Personalized, one-on-one training sessions in your home environment where most behavioral issues occur. We work with your whole family to build a better bond with your dog.',
    team: [],
    gallery: [],
    amenities: ['Personalized Training Plan', 'Focus on Real-World Scenarios', 'Family-Friendly Methods'],
    businessPolicies: 'An initial 90-minute consultation is required for all new clients. Package rates are available.'
  },
];

export const DEMO_PRODUCTS: Product[] = [
  // Pet Food
  { id: 'prod_food_01', name: 'Premium Natural Dog Food', description: 'High-protein, grain-free formula for adult dogs.', price: 59.99, imageUrl: 'https://images.unsplash.com/photo-1587300003487-449746238b76?q=80&w=600&h=600&fit=crop', category: ProductCategory.PetFood },
  { id: 'prod_food_02', name: 'Gourmet Cat Pâté Variety Pack', description: 'Real salmon and tuna in a delicious pâté for picky eaters.', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1627826555694-b9a5b3a4f6b0?q=80&w=600&h=600&fit=crop', category: ProductCategory.PetFood },
  { id: 'prod_food_05', name: 'Puppy Growth Formula', description: 'Specially formulated with DHA for brain development in puppies.', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1591735143340-02a145899b82?q=80&w=600&h=600&fit=crop', category: ProductCategory.PetFood },
  { id: 'prod_food_06', name: 'Senior Dog Vitality 7+', description: 'Supports joint health and energy levels in older dogs.', price: 49.99, imageUrl: 'https://images.unsplash.com/photo-1555518463-70e2813a8a3c?q=80&w=600&h=600&fit=crop', category: ProductCategory.PetFood },
  { id: 'prod_food_07', name: 'Cat Food for Weight Management', description: 'Lower calorie formula to help your cat achieve a healthy weight.', price: 22.99, imageUrl: 'https://images.unsplash.com/photo-1598822941578-1a557451a5e1?q=80&w=600&h=600&fit=crop', category: ProductCategory.PetFood },
  { id: 'prod_food_08', name: 'Crunchy Cat Treats - Salmon Flavor', description: 'Deliciously crunchy treats that help clean teeth. Under 2 calories per treat.', price: 4.99, imageUrl: 'https://images.unsplash.com/photo-1621308331828-a2b84494ab57?q=80&w=600&h=600&fit=crop', category: ProductCategory.PetFood },
  { id: 'prod_food_09', name: 'Natural Dog Jerky Treats', description: 'Single-ingredient beef jerky, slow-smoked for a taste dogs love.', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1608245437985-1522e841262d?q=80&w=600&h=600&fit=crop', category: ProductCategory.PetFood },
  { id: 'prod_food_10', name: 'Wild Bird Seed Mix', description: 'A premium blend of seeds to attract a variety of wild birds to your garden.', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1615118224524-184843949989?q=80&w=600&h=600&fit=crop', category: ProductCategory.PetFood },
  { id: 'prod_food_11', name: 'Fortified Rabbit Pellets', description: 'Complete and balanced nutrition for adult rabbits, with essential vitamins.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1599182315041-860f429671f6?q=80&w=600&h=600&fit=crop', category: ProductCategory.PetFood },

  // Toys
  { id: 'prod_toy_01', name: 'Indestructible Squeaky Ball', description: 'Durable rubber ball that stands up to heavy chewers.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1597853482563-346c1a85117f?q=80&w=600&h=600&fit=crop', category: ProductCategory.Toys },
  { id: 'prod_toy_02', name: 'Catnip Feather Wand', description: 'Interactive wand with natural feathers to engage your cat.', price: 7.99, imageUrl: 'https://images.unsplash.com/photo-1599591436350-f4d43e7de71b?q=80&w=600&h=600&fit=crop', category: ProductCategory.Toys },
  { id: 'prod_toy_03', name: 'Dog Puzzle Toy', description: 'Interactive feeder that challenges your dog and slows down eating.', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1611090098674-7546a36c11d4?q=80&w=600&h=600&fit=crop', category: ProductCategory.Toys },
  { id: 'prod_toy_04', name: 'Tug-of-War Rope Toy', description: 'Durable cotton rope for interactive play, helps clean teeth.', price: 11.99, imageUrl: 'https://images.unsplash.com/photo-1587201775732-6804523771a2?q=80&w=600&h=600&fit=crop', category: ProductCategory.Toys },
  { id: 'prod_toy_05', name: 'Automatic Cat Laser Pointer', description: 'Keeps your cat entertained with random laser patterns. USB rechargeable.', price: 25.99, imageUrl: 'https://images.unsplash.com/photo-1631835147895-b9f518a2489c?q=80&w=600&h=600&fit=crop', category: ProductCategory.Toys },
  { id: 'prod_toy_06', name: 'Plush Squirrel Dog Toy', description: 'Soft plush toy with multiple squeakers for extra fun.', price: 9.99, imageUrl: 'https://images.unsplash.com/photo-1597793005553-6238b184e1b4?q=80&w=600&h=600&fit=crop', category: ProductCategory.Toys },
  { id: 'prod_toy_07', name: 'Collapsible Cat Tunnel', description: 'A crinkly, collapsible tunnel for hours of feline fun and hide-and-seek.', price: 17.99, imageUrl: 'https://images.unsplash.com/photo-1610992361138-1a40342894d8?q=80&w=600&h=600&fit=crop', category: ProductCategory.Toys },
  { id: 'prod_toy_08', name: 'Silent Spinner Hamster Wheel', description: 'A quiet exercise wheel that won\'t keep you up at night.', price: 13.99, imageUrl: 'https://images.unsplash.com/photo-1549598462-09a2d6b38f8c?q=80&w=600&h=600&fit=crop', category: ProductCategory.Toys },
  
  // Dog Supplies
  { id: 'prod_dog_01', name: 'Adjustable Nylon Dog Collar', description: 'Durable and comfortable collar for everyday use. Available in multiple colors.', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1605330364983-4905f31971f8?q=80&w=600&h=600&fit=crop', category: ProductCategory.DogSupplies },
  { id: 'prod_dog_02', name: 'Cozy Orthopedic Dog Bed', description: 'Memory foam bed to support joints and provide maximum comfort.', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1528183429752-a97d0bfd377b?q=80&w=600&h=600&fit=crop', category: ProductCategory.DogSupplies },
  { id: 'prod_dog_03', name: 'Heavy-Duty Retractable Leash', description: '16ft retractable leash with anti-slip handle for dogs up to 110 lbs.', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1551815124-94943795a146?q=80&w=600&h=600&fit=crop', category: ProductCategory.DogSupplies },
  { id: 'prod_dog_04', name: 'No-Pull Dog Harness', description: 'Front clip design to discourage pulling, with padded straps for comfort.', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1624451909789-38b9a1011406?q=80&w=600&h=600&fit=crop', category: ProductCategory.DogSupplies },
  { id: 'prod_dog_05', name: 'Stainless Steel Bowl Set', description: 'Set of two rust-resistant bowls with a non-slip rubber base.', price: 19.99, imageUrl: 'https://images.unsplash.com/photo-1563291938-1662c2f254b4?q=80&w=600&h=600&fit=crop', category: ProductCategory.DogSupplies },
  { id: 'prod_dog_06', name: 'Travel Water Bottle for Dogs', description: '2-in-1 bottle and bowl for easy hydration on the go.', price: 15.99, imageUrl: 'https://images.unsplash.com/photo-1562306400-42b79a554a93?q=80&w=600&h=600&fit=crop', category: ProductCategory.DogSupplies },
  { id: 'prod_dog_07', name: 'Biodegradable Poop Bags', description: 'Extra thick and leak-proof waste bags. 900 bags + 2 dispensers.', price: 16.99, imageUrl: 'https://images.unsplash.com/photo-1608404221775-68e5470d0d5a?q=80&w=600&h=600&fit=crop', category: ProductCategory.DogSupplies },
  { id: 'prod_dog_08', name: 'Foldable Metal Dog Crate', description: 'Double-door design with a removable tray for easy cleaning.', price: 54.99, imageUrl: 'https://images.unsplash.com/photo-1587304917170-a359280d8591?q=80&w=600&h=600&fit=crop', category: ProductCategory.DogSupplies },
  
  // Cat Supplies
  { id: 'prod_cat_01', name: 'Modern Cat Tree Tower', description: 'Multi-level cat tree with scratching posts and a cozy condo.', price: 129.99, imageUrl: 'https://images.unsplash.com/photo-1595433231364-f05045437637?q=80&w=600&h=600&fit=crop', category: ProductCategory.CatSupplies },
  { id: 'prod_cat_02', name: 'Self-Cleaning Litter Box', description: 'Automatic litter box that does the scooping for you.', price: 149.99, imageUrl: 'https://images.unsplash.com/photo-1620579294523-23321568264a?q=80&w=600&h=600&fit=crop', category: ProductCategory.CatSupplies },
  { id: 'prod_cat_03', name: 'Premium Clumping Cat Litter', description: 'Dust-free, hard-clumping litter for easy scooping and odor control.', price: 18.99, imageUrl: 'https://images.unsplash.com/photo-1570716492211-5a413a6111f5?q=80&w=600&h=600&fit=crop', category: ProductCategory.CatSupplies },
  { id: 'prod_cat_04', name: 'Sisal Scratching Post', description: 'Durable, vertical scratching post to satisfy natural instincts and save furniture.', price: 39.99, imageUrl: 'https://images.unsplash.com/photo-1616429583210-91107536aa74?q=80&w=600&h=600&fit=crop', category: ProductCategory.CatSupplies },
  { id: 'prod_cat_05', name: 'Airline-Approved Pet Carrier', description: 'Soft-sided carrier with mesh ventilation and fleece bedding.', price: 34.99, imageUrl: 'https://images.unsplash.com/photo-1581888628038-a51717204481?q=80&w=600&h=600&fit=crop', category: ProductCategory.CatSupplies },
  { id: 'prod_cat_06', name: 'Ceramic Cat Water Fountain', description: 'Encourages hydration with circulating, filtered water. Dishwasher safe.', price: 45.99, imageUrl: 'https://images.unsplash.com/photo-1615678815155-24a6015561b3?q=80&w=600&h=600&fit=crop', category: ProductCategory.CatSupplies },
  
  // Fish & Aquatics
  { id: 'prod_food_03', name: 'Tropical Fish Flakes', description: 'Nutritionally balanced flakes for vibrant colors in tropical fish.', price: 8.99, imageUrl: 'https://images.unsplash.com/photo-1628184532877-354d801123a3?q=80&w=600&h=600&fit=crop', category: ProductCategory.FishAquatics },
  { id: 'prod_fish_01', name: '10-Gallon Aquarium Kit', description: 'Includes glass tank, LED hood, quiet filter, and setup guide.', price: 79.99, imageUrl: 'https://images.unsplash.com/photo-1611095966436-57c211516b9b?q=80&w=600&h=600&fit=crop', category: ProductCategory.FishAquatics },
  { id: 'prod_fish_02', name: 'Submersible Aquarium Heater', description: '50W adjustable heater for aquariums up to 10 gallons.', price: 17.99, imageUrl: 'https://images.unsplash.com/photo-1622149344935-8c3806208889?q=80&w=600&h=600&fit=crop', category: ProductCategory.FishAquatics },
  { id: 'prod_fish_03', name: 'Natural Aquarium Gravel', description: '5 lb bag of premium, coated gravel that is safe for fish.', price: 9.99, imageUrl: 'https://images.unsplash.com/photo-1560969184-10fe8719e047?q=80&w=600&h=600&fit=crop', category: ProductCategory.FishAquatics },
  { id: 'prod_fish_04', name: 'Aquarium Water Conditioner', description: 'Instantly makes tap water safe for fish by removing chlorine.', price: 6.99, imageUrl: 'https://images.unsplash.com/photo-1580757468132-35870b230f42?q=80&w=600&h=600&fit=crop', category: ProductCategory.FishAquatics },
  { id: 'prod_fish_05', name: 'Long-Handle Algae Scraper', description: 'Effectively removes algae from glass aquariums without scratching.', price: 11.99, imageUrl: 'https://images.unsplash.com/photo-1619495764350-b5c73f5a3e47?q=80&w=600&h=600&fit=crop', category: ProductCategory.FishAquatics },
  
  // Small Animals
  { id: 'prod_food_04', name: 'Timothy Hay for Small Animals', description: 'High-fiber, sun-cured hay for rabbits, guinea pigs, and chinchillas.', price: 15.99, imageUrl: 'https://images.unsplash.com/photo-1629219321947-193a02ef496f?q=80&w=600&h=600&fit=crop', category: ProductCategory.SmallAnimals },
  { id: 'prod_sm_animal_01', name: 'Multi-Level Ferret Cage', description: 'Spacious cage with ramps and platforms for small animals.', price: 89.99, imageUrl: 'https://images.unsplash.com/photo-1601758176589-72b1a8ac2051?q=80&w=600&h=600&fit=crop', category: ProductCategory.SmallAnimals },
  { id: 'prod_sm_animal_02', name: 'Soft Paper Bedding', description: '99.9% dust-free and ultra-absorbent paper bedding.', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1598653284048-11b79f6e613b?q=80&w=600&h=600&fit=crop', category: ProductCategory.SmallAnimals },
  { id: 'prod_sm_animal_03', name: 'Chew-Proof Water Bottle', description: 'Drip-resistant sipper bottle with glass container.', price: 13.99, imageUrl: 'https://images.unsplash.com/photo-1599411936573-a7590897b205?q=80&w=600&h=600&fit=crop', category: ProductCategory.SmallAnimals },
  { id: 'prod_sm_animal_04', name: 'Apple Wood Chew Sticks', description: 'Natural chew sticks to promote healthy teeth for rabbits and rodents.', price: 7.99, imageUrl: 'https://images.unsplash.com/photo-1606856402833-c15b15b3c21d?q=80&w=600&h=600&fit=crop', category: ProductCategory.SmallAnimals },

  // Grooming
  { id: 'prod_groom_01', name: 'De-Shedding Brush', description: 'Reduces shedding by up to 95% with a stainless steel edge.', price: 24.99, imageUrl: 'https://images.unsplash.com/photo-1626583005089-a764a1377a06?q=80&w=600&h=600&fit=crop', category: ProductCategory.Grooming },
  { id: 'prod_groom_02', name: 'Oatmeal Shampoo for Sensitive Skin', description: 'Soothing and moisturizing shampoo for pets with dry, itchy skin.', price: 15.99, imageUrl: 'https://images.unsplash.com/photo-1629256954493-aa8304a6b2b5?q=80&w=600&h=600&fit=crop', category: ProductCategory.Grooming },
  { id: 'prod_groom_03', name: 'Professional Pet Nail Clippers', description: 'Sharp, stainless steel clippers with a safety guard to prevent over-cutting.', price: 12.99, imageUrl: 'https://images.unsplash.com/photo-1596792461833-21a403759955?q=80&w=600&h=600&fit=crop', category: ProductCategory.Grooming },
  { id: 'prod_groom_04', name: 'Quiet Electric Nail Grinder', description: 'Low-noise, low-vibration grinder for stress-free nail trimming.', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1597589929231-1e9d17424683?q=80&w=600&h=600&fit=crop', category: ProductCategory.Grooming },
  { id: 'prod_groom_05', name: 'Pet Toothbrush & Toothpaste Kit', description: 'Enzymatic toothpaste and dual-head toothbrush for oral hygiene.', price: 9.99, imageUrl: 'https://images.unsplash.com/photo-1559828946-b331405a415a?q=80&w=600&h=600&fit=crop', category: ProductCategory.Grooming },
  { id: 'prod_groom_06', name: 'Waterless Shampoo Spray', description: 'Quickly clean and deodorize your pet between baths. No rinsing required.', price: 14.99, imageUrl: 'https://images.unsplash.com/photo-1553102148-de76a5245107?q=80&w=600&h=600&fit=crop', category: ProductCategory.Grooming },
  { id: 'prod_groom_07', name: 'Paw Protection Balm', description: 'Heals and protects dry, cracked paws from hot pavement and ice.', price: 11.99, imageUrl: 'https://images.unsplash.com/photo-1615234981444-486a42250268?q=80&w=600&h=600&fit=crop', category: ProductCategory.Grooming },

  // Health
  { id: 'prod_health_01', name: 'Joint Support Chews for Dogs', description: 'Tasty soft chews with glucosamine for hip and joint health.', price: 29.99, imageUrl: 'https://images.unsplash.com/photo-1605030465548-c8a7f05a9f5f?q=80&w=600&h=600&fit=crop', category: ProductCategory.Health },
  { id: 'prod_health_02', name: 'Dental Care Water Additive', description: 'Simply add to your pet\'s water to fight plaque and freshen breath.', price: 18.99, imageUrl: 'https://images.unsplash.com/photo-1541336032412-2048a678540d?q=80&w=600&h=600&fit=crop', category: ProductCategory.Health },
  { id: 'prod_health_03', name: 'Flea & Tick Topical Treatment', description: '3-month supply of waterproof, fast-acting flea and tick prevention.', price: 44.99, imageUrl: 'https://images.unsplash.com/photo-1604115852234-93444971c26f?q=80&w=600&h=600&fit=crop', category: ProductCategory.Health },
  { id: 'prod_health_04', name: 'Calming Chews for Anxiety', description: 'Natural chews with hemp and chamomile to ease stress from storms or travel.', price: 22.99, imageUrl: 'https://images.unsplash.com/photo-1613539862808-59f5b61005a7?q=80&w=600&h=600&fit=crop', category: ProductCategory.Health },
  { id: 'prod_health_05', name: 'Probiotic Digestive Support', description: 'Powder supplement to support healthy digestion and gut flora.', price: 25.99, imageUrl: 'https://images.unsplash.com/photo-1628178873439-01124115f2a1?q=80&w=600&h=600&fit=crop', category: ProductCategory.Health },
  { id: 'prod_health_06', name: 'Hairball Control Gel for Cats', description: 'A tasty salmon-flavored gel that helps eliminate and prevent hairballs.', price: 9.99, imageUrl: 'https://images.unsplash.com/photo-1598425828858-689139856f6b?q=80&w=600&h=600&fit=crop', category: ProductCategory.Health },
  { id: 'prod_health_07', name: 'Pet First-Aid Kit', description: '100-piece kit with essential supplies for common pet emergencies.', price: 34.99, imageUrl: 'https://images.unsplash.com/photo-1603398938378-e54eab446dde?q=80&w=600&h=600&fit=crop', category: ProductCategory.Health },
];

const now = new Date();
const tomorrow = new Date(now);
tomorrow.setDate(now.getDate() + 1);
tomorrow.setHours(10, 0, 0, 0);

const nextWeek = new Date(now);
nextWeek.setDate(now.getDate() + 7);
nextWeek.setHours(14, 30, 0, 0);

const lastWeek = new Date(now);
lastWeek.setDate(now.getDate() - 7);

const twoDaysFromNow = new Date();
twoDaysFromNow.setDate(twoDaysFromNow.getDate() + 2);
twoDaysFromNow.setHours(11, 0, 0, 0);


export const DEMO_APPOINTMENTS: Appointment[] = [
  {
    id: 'appt_01',
    ownerId,
    providerId: 'provider_groom_01',
    petId: 'pet_01',
    service: 'Full Groom',
    status: AppointmentStatus.Confirmed,
    dateRange: { start: tomorrow.toISOString(), end: new Date(tomorrow.getTime() + 90 * 60000).toISOString() },
    ownerNotes: 'Buddy can be a little nervous around dryers.'
  },
  {
    id: 'appt_02',
    ownerId,
    providerId: 'provider_vet_01',
    petId: 'pet_02',
    service: 'Annual Checkup',
    status: AppointmentStatus.Confirmed,
    dateRange: { start: nextWeek.toISOString(), end: new Date(nextWeek.getTime() + 30 * 60000).toISOString() },
  },
  {
    id: 'appt_03',
    ownerId,
    providerId: 'provider_daycare_01',
    petId: 'pet_01', // Changed pet to one owned by user_owner_01
    service: 'Overnight Boarding',
    status: AppointmentStatus.Completed,
    dateRange: { start: lastWeek.toISOString(), end: new Date(lastWeek.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString() },
    providerNotes: 'Buddy had a great time playing with the other large dogs!'
  },
   {
    id: 'appt_04_booked',
    ownerId,
    providerId: 'provider_vet_01',
    petId: 'pet_02', // Changed pet to one owned by user_owner_01
    service: 'Vaccinations',
    status: AppointmentStatus.Confirmed,
    dateRange: { 
        start: twoDaysFromNow.toISOString(), 
        end: new Date(twoDaysFromNow.getTime() + 30 * 60000).toISOString()
    },
  },
  {
    id: 'appt_05',
    ownerId: ownerId2,
    providerId: 'provider_vet_01',
    petId: 'pet_04',
    service: 'Annual Checkup',
    status: AppointmentStatus.Completed,
    dateRange: { start: new Date(new Date().setDate(now.getDate() - 14)).toISOString(), end: new Date(new Date().setDate(now.getDate() - 14)).toISOString() },
    providerNotes: 'Rocky seems to have a sensitive stomach. Recommended a diet change.'
  },
  {
    id: 'appt_06',
    ownerId: ownerId2,
    providerId: 'provider_groom_02',
    petId: 'pet_05',
    service: 'Full Groom',
    status: AppointmentStatus.Confirmed,
    dateRange: { start: new Date(new Date().setDate(now.getDate() + 5)).toISOString(), end: new Date(new Date().setDate(now.getDate() + 5)).toISOString() },
    ownerNotes: 'Misty is very shy, please be gentle.'
  }
];

export const DEMO_TUTORIALS: Tutorial[] = [
    {
      id: 'tut_01',
      category: 'Grooming',
      title: 'How to Trim Your Dog\'s Nails Safely',
      content: '1. Gather your tools: nail clippers and styptic powder.\n2. Hold your dog\'s paw firmly but gently.\n3. Trim only the tip of the nail, avoiding the quick.\n4. If you cut the quick, apply styptic powder to stop bleeding.\n5. Praise your dog and offer a treat afterwards.'
    },
    {
      id: 'tut_02',
      category: 'First Aid',
      title: 'Basic First Aid for Minor Cuts',
      content: '1. Clean the wound with mild soap and water.\n2. Apply gentle pressure with a clean cloth to stop any bleeding.\n3. Apply a pet-safe antiseptic ointment.\n4. Cover with a loose bandage if necessary, but ensure your pet cannot ingest it.\n5. Monitor for signs of infection.'
    },
    {
      id: 'tut_03',
      category: 'Diet & Nutrition',
      title: 'Choosing the Right Food for Your Cat',
      content: 'Consider your cat\'s age, activity level, and health conditions. Look for foods with a named meat source as the first ingredient. Avoid fillers like corn and soy. Both wet and dry food have benefits; a combination can be ideal. Consult your vet for personalized recommendations.'
    }
];

export const DEMO_MEETUPS: Meetup[] = [
  {
    id: 'meetup_1',
    organizerId: 'system_user',
    organizerName: 'Pet Paradise Community',
    title: 'Golden Retriever Romp in the Park',
    location: 'Central Park Meadows',
    date: '2024-08-15',
    time: '10:00 AM',
    description: 'A fun morning for all Golden Retrievers to play and socialize. Bring your favorite toys!',
    petSpecies: [PetSpecies.Dog],
    interestedCount: 12,
  },
  {
    id: 'meetup_2',
    organizerId: 'system_user',
    organizerName: 'Pet Paradise Community',
    title: 'Small Dog Social Hour',
    location: 'Sunnyvale Dog Park (Small Dog Area)',
    date: '2024-08-18',
    time: '4:00 PM',
    description: 'An exclusive event for our smaller furry friends to meet and greet in a safe environment.',
    petSpecies: [PetSpecies.Dog],
    interestedCount: 8,
  },
  {
    id: 'meetup_3',
    organizerId: 'user_owner_01',
    organizerName: 'You',
    title: 'Caturday Cafe Mixer',
    location: 'The Purrfect Cup Cafe',
    date: '2024-08-20',
    time: '2:00 PM',
    description: 'Cat owners unite! Share stories and tips while your feline friends enjoy a cat-friendly space (for socialized cats).',
    petSpecies: [PetSpecies.Cat],
    interestedCount: 15,
  },
  {
    id: 'meetup_4',
    organizerId: 'system_user',
    organizerName: 'Pet Paradise Community',
    title: 'Weekend Walkers',
    location: 'Lakeside Trailhead',
    date: '2024-08-24',
    time: '9:00 AM',
    description: 'Join us for a scenic 3-mile walk around the lake. All leashed pets are welcome!',
    petSpecies: [],
    interestedCount: 22,
  }
];