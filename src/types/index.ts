export type EventStatus = 
  | 'entradas_disponibles' 
  | 'ultimos_accesos' 
  | 'aforo_completo' 
  | 'en_directo' 
  | 'finalizado' 
  | 'proximamente';

export interface ConcertEvent {
  id: string;
  title: string;
  artist: string;
  date: string;
  isoDate: string;
  time: string;
  venueId: string;
  venueName: string;
  description: string;
  extendedBio: string;
  status: EventStatus;
  posterImage: string;
  robloxExperienceUrl: string;
  robloxPlaceId?: string;
  maxCapacity: number;
  registeredCount: number;
  ageRating: string;
  lightingTech: string;
  soundTech: string;
  genre: string;
  featured: boolean;
  vipTiers: string[];
}

export interface Venue {
  id: string;
  name: string;
  code: string;
  tagline: string;
  capacity: number;
  status: 'operativo' | 'en_mantenimiento' | 'en_construccion';
  specs: {
    stageWidth: string;
    soundSystem: string;
    lighting: string;
    avatarLOD: string;
  };
  description: string;
  features: string[];
  image: string;
  robloxGameUrl?: string;
}

export interface StaffMember {
  id: string;
  robloxUsername: string;
  role: string;
  addedAt: string;
  notes?: string;
}

export type TicketTier = 'General' | 'VIP Golden Pit' | 'Backstage Pass';

export interface AccessRegistration {
  id: string;
  eventId: string;
  eventTitle: string;
  eventDate: string;
  eventTime: string;
  venueName: string;
  robloxUsername: string;
  email: string;
  tier: TicketTier;
  registeredAt: string;
  qrPayload: string;
  seatZone: string;
  status: 'valido' | 'utilizado' | 'cancelado';
}

export interface GalleryPhoto {
  id: string;
  title: string;
  category: 'Escenarios' | 'Artistas' | 'Luces y Efectos' | 'Público';
  image: string;
  venue: string;
  year: string;
  description: string;
}

export interface ContactMessage {
  id: string;
  name: string;
  robloxUsername: string;
  email: string;
  type: 'general' | 'artista' | 'productor' | 'staff_tecnico' | 'patrocinio';
  subject: string;
  portfolioUrl?: string;
  message: string;
  createdAt: string;
  status: 'nuevo' | 'leido' | 'respondido';
}
