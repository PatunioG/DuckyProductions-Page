/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useCallback } from 'react';
import { StorageService } from './services/storageService';
import { ConcertEvent, Venue, GalleryPhoto } from './types';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { EventsSection } from './components/EventsSection';
import { RegistrationSection } from './components/RegistrationSection';
import { VenuesSection } from './components/VenuesSection';
import { AboutSection } from './components/AboutSection';
import { GallerySection } from './components/GallerySection';
import { ContactSection } from './components/ContactSection';
import { AdminPanel } from './components/AdminPanel';
import { Footer } from './components/Footer';

export default function App() {
  const [events, setEvents] = useState<ConcertEvent[]>([]);
  const [venues, setVenues] = useState<Venue[]>([]);
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [selectedEventForAccess, setSelectedEventForAccess] = useState<string | undefined>(undefined);

  const loadData = useCallback(() => {
    setEvents(StorageService.getEvents());
    setVenues(StorageService.getVenues());
    setPhotos(StorageService.getGallery());
  }, []);

  useEffect(() => {
    loadData();

    const handleStorageUpdate = () => {
      loadData();
    };

    window.addEventListener('ducky-storage-updated', handleStorageUpdate);
    return () => window.removeEventListener('ducky-storage-updated', handleStorageUpdate);
  }, [loadData]);

  const handleDiscoverEvents = () => {
    const el = document.getElementById('eventos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenRegistration = (eventId?: string) => {
    if (eventId) {
      setSelectedEventForAccess(eventId);
    }
    const el = document.getElementById('accesos');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Find featured or first headline event
  const headlineEvent = events.find(e => e.featured) || events[0];

  return (
    <div className="min-h-screen bg-[#070709] text-zinc-100 flex flex-col selection:bg-white selection:text-black">
      
      {/* Navigation */}
      <Navbar
        onOpenAdmin={() => setIsAdminOpen(true)}
        onOpenRegistration={handleOpenRegistration}
      />

      {/* Main Content */}
      <main className="flex-1">
        {/* 1. Inicio / Hero */}
        <HeroSection
          headlineEvent={headlineEvent}
          onDiscoverEvents={handleDiscoverEvents}
          onGetAccess={handleOpenRegistration}
        />

        {/* 2. Próximos Eventos */}
        <EventsSection
          events={events}
          onSelectEventForAccess={handleOpenRegistration}
        />

        {/* 3. Consigue Tu Acceso & Entradas Digitales */}
        <RegistrationSection
          events={events}
          initialSelectedEventId={selectedEventForAccess}
        />

        {/* 4. Recintos Oficiales */}
        <VenuesSection
          venues={venues}
        />

        {/* 5. Sobre Nosotros */}
        <AboutSection />

        {/* 6. Galería Fotográfica */}
        <GallerySection
          photos={photos}
        />

        {/* 7. Contacto & Artistas */}
        <ContactSection />
      </main>

      {/* Footer */}
      <Footer
        onOpenAdmin={() => setIsAdminOpen(true)}
      />

      {/* 8. Panel de Administración Privado */}
      <AdminPanel
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        events={events}
        venues={venues}
        onDataChanged={loadData}
      />

    </div>
  );
}
