import { ConcertEvent, Venue, AccessRegistration, GalleryPhoto, ContactMessage, StaffMember } from '../types';
import { INITIAL_EVENTS, INITIAL_VENUES, INITIAL_REGISTRATIONS, INITIAL_GALLERY, INITIAL_STAFF } from '../data/initialData';

const STORAGE_KEYS = {
  EVENTS: 'ducky_productions_events_v2',
  VENUES: 'ducky_productions_venues_v2',
  REGISTRATIONS: 'ducky_productions_registrations_v2',
  GALLERY: 'ducky_productions_gallery_v2',
  INQUIRIES: 'ducky_productions_inquiries_v2',
  STAFF: 'ducky_productions_staff_v2',
  INITIALIZED: 'ducky_productions_initialized_flag_v2',
  ADMIN_SESSION: 'ducky_productions_admin_auth_v2',
};

const notifyChange = () => {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new CustomEvent('ducky-storage-updated'));
  }
};

export const StorageService = {
  // EVENTS
  getEvents(): ConcertEvent[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.EVENTS);
      if (data !== null) {
        return JSON.parse(data);
      }
      if (localStorage.getItem(STORAGE_KEYS.INITIALIZED) === 'true') {
        return [];
      }
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
      return INITIAL_EVENTS;
    } catch {
      return [];
    }
  },

  getEventById(id: string): ConcertEvent | undefined {
    return this.getEvents().find(e => e.id === id);
  },

  saveEvent(event: ConcertEvent): void {
    const events = this.getEvents();
    const index = events.findIndex(e => e.id === event.id);
    if (index >= 0) {
      events[index] = event;
    } else {
      events.unshift(event);
    }
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    notifyChange();
  },

  deleteEvent(id: string): void {
    const events = this.getEvents().filter(e => e.id !== id);
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    notifyChange();
  },

  clearAllEvents(): void {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    notifyChange();
  },

  // VENUES
  getVenues(): Venue[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.VENUES);
      if (data !== null) {
        return JSON.parse(data);
      }
      if (localStorage.getItem(STORAGE_KEYS.INITIALIZED) === 'true') {
        return [];
      }
      localStorage.setItem(STORAGE_KEYS.VENUES, JSON.stringify(INITIAL_VENUES));
      return INITIAL_VENUES;
    } catch {
      return [];
    }
  },

  getVenueById(id: string): Venue | undefined {
    return this.getVenues().find(v => v.id === id);
  },

  saveVenue(venue: Venue): void {
    const venues = this.getVenues();
    const index = venues.findIndex(v => v.id === venue.id);
    if (index >= 0) {
      venues[index] = venue;
    } else {
      venues.push(venue);
    }
    localStorage.setItem(STORAGE_KEYS.VENUES, JSON.stringify(venues));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    notifyChange();
  },

  deleteVenue(id: string): void {
    const venues = this.getVenues().filter(v => v.id !== id);
    localStorage.setItem(STORAGE_KEYS.VENUES, JSON.stringify(venues));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    notifyChange();
  },

  clearAllVenues(): void {
    localStorage.setItem(STORAGE_KEYS.VENUES, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    notifyChange();
  },

  // REGISTRATIONS (PASSES)
  getRegistrations(): AccessRegistration[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      if (data !== null) {
        return JSON.parse(data);
      }
      if (localStorage.getItem(STORAGE_KEYS.INITIALIZED) === 'true') {
        return [];
      }
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
      return INITIAL_REGISTRATIONS;
    } catch {
      return [];
    }
  },

  createRegistration(registration: Omit<AccessRegistration, 'id' | 'registeredAt' | 'qrPayload' | 'securityHash' | 'status'>): AccessRegistration {
    const existing = this.getRegistrations();
    const passNumber = Math.floor(10000 + Math.random() * 90000);
    const newId = `DP-2026-${passNumber}`;
    const now = new Date();
    const registeredAt = `${now.toISOString().split('T')[0]} ${now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;

    const newPass: AccessRegistration = {
      ...registration,
      id: newId,
      registeredAt,
      qrPayload: `DP-VERIFIED:${registration.eventId}:${registration.robloxUsername}:${registration.tier}:${newId}`,
      status: 'valido'
    };

    existing.unshift(newPass);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(existing));

    // Also increment registeredCount for the event
    const events = this.getEvents();
    const event = events.find(e => e.id === registration.eventId);
    if (event) {
      event.registeredCount = (event.registeredCount || 0) + 1;
      localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(events));
    }

    notifyChange();
    return newPass;
  },

  deleteRegistration(id: string): void {
    const list = this.getRegistrations().filter(r => r.id !== id);
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(list));
    notifyChange();
  },

  clearAllRegistrations(): void {
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify([]));
    notifyChange();
  },

  updateRegistrationStatus(id: string, status: 'valido' | 'utilizado' | 'cancelado'): void {
    const list = this.getRegistrations();
    const item = list.find(r => r.id === id);
    if (item) {
      item.status = status;
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(list));
      notifyChange();
    }
  },

  findRegistrationsByRobloxUser(username: string): AccessRegistration[] {
    const term = username.trim().toLowerCase();
    if (!term) return [];
    return this.getRegistrations().filter(r => 
      r.robloxUsername.toLowerCase().includes(term) || r.id.toLowerCase() === term
    );
  },

  // GALLERY
  getGallery(): GalleryPhoto[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.GALLERY);
      if (data === null) {
        localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
        return INITIAL_GALLERY;
      }
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  // INQUIRIES & CONTACT
  getInquiries(): ContactMessage[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.INQUIRIES);
      return data ? JSON.parse(data) : [];
    } catch {
      return [];
    }
  },

  createInquiry(data: Omit<ContactMessage, 'id' | 'createdAt' | 'status'>): ContactMessage {
    const inquiries = this.getInquiries();
    const newMsg: ContactMessage = {
      ...data,
      id: `INQ-${Date.now()}`,
      createdAt: new Date().toISOString(),
      status: 'nuevo'
    };
    inquiries.unshift(newMsg);
    localStorage.setItem(STORAGE_KEYS.INQUIRIES, JSON.stringify(inquiries));
    notifyChange();
    return newMsg;
  },

  // STAFF MANAGEMENT
  getStaff(): StaffMember[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.STAFF);
      if (data !== null) {
        return JSON.parse(data);
      }
      if (localStorage.getItem(STORAGE_KEYS.INITIALIZED) === 'true') {
        return [];
      }
      localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
      return INITIAL_STAFF;
    } catch {
      return [];
    }
  },

  addStaff(member: { robloxUsername: string; role: string; notes?: string }): StaffMember {
    const list = this.getStaff();
    const cleanUser = member.robloxUsername.trim().replace(/^@/, '');
    const newStaff: StaffMember = {
      id: `staff-${Date.now()}`,
      robloxUsername: cleanUser,
      role: member.role.trim() || 'Staff Oficial',
      addedAt: new Date().toISOString().split('T')[0],
      notes: member.notes?.trim() || ''
    };
    list.unshift(newStaff);
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(list));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    notifyChange();
    return newStaff;
  },

  removeStaff(id: string): void {
    const list = this.getStaff().filter(s => s.id !== id);
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(list));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    notifyChange();
  },

  clearAllStaff(): void {
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    notifyChange();
  },

  isRobloxUserStaff(username: string): boolean {
    if (!username) return false;
    const clean = username.trim().toLowerCase().replace(/^@/, '');
    const list = this.getStaff();
    return list.some(s => s.robloxUsername.toLowerCase() === clean);
  },

  // CLEAR ALL DATA (START FROM ZERO)
  clearAllData(): void {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.VENUES, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify([]));
    localStorage.setItem(STORAGE_KEYS.INITIALIZED, 'true');
    notifyChange();
  },

  // RESET TO DEMO DATA
  resetDefaults(): void {
    localStorage.setItem(STORAGE_KEYS.EVENTS, JSON.stringify(INITIAL_EVENTS));
    localStorage.setItem(STORAGE_KEYS.VENUES, JSON.stringify(INITIAL_VENUES));
    localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(INITIAL_REGISTRATIONS));
    localStorage.setItem(STORAGE_KEYS.GALLERY, JSON.stringify(INITIAL_GALLERY));
    localStorage.setItem(STORAGE_KEYS.STAFF, JSON.stringify(INITIAL_STAFF));
    notifyChange();
  }
};
