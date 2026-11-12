import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Sparkles, ExternalLink, ArrowRight, X, Info } from 'lucide-react';
import { ConcertEvent, EventStatus } from '../types';
import { resolveAssetUrl } from '../assets/images';

interface EventsSectionProps {
  events: ConcertEvent[];
  onSelectEventForAccess: (eventId: string) => void;
}

export const EventsSection: React.FC<EventsSectionProps> = ({
  events,
  onSelectEventForAccess
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'disponibles' | 'proximos'>('all');
  const [selectedEventModal, setSelectedEventModal] = useState<ConcertEvent | null>(null);

  const filteredEvents = events.filter(evt => {
    if (activeFilter === 'disponibles') {
      return evt.status === 'entradas_disponibles' || evt.status === 'ultimos_accesos';
    }
    if (activeFilter === 'proximos') {
      return evt.status === 'proximamente';
    }
    return true;
  });

  const getStatusLabel = (status: EventStatus) => {
    switch (status) {
      case 'entradas_disponibles':
        return { text: 'Accesos Disponibles', color: 'text-emerald-400' };
      case 'ultimos_accesos':
        return { text: 'Últimos Accesos', color: 'text-amber-400' };
      case 'aforo_completo':
        return { text: 'Aforo Completo', color: 'text-rose-400' };
      case 'en_directo':
        return { text: 'EN VIVO AHORA', color: 'text-rose-500 font-bold' };
      case 'finalizado':
        return { text: 'Concluido', color: 'text-zinc-500' };
      case 'proximamente':
        return { text: 'Próximamente', color: 'text-zinc-400' };
      default:
        return { text: status, color: 'text-zinc-400' };
    }
  };

  return (
    <section id="eventos" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-mono mb-2">
            CARTELERA OFICIAL · TEMPORADA 2026/2027
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
            Próximos Conciertos y Espectáculos
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mt-2">
            Producciones exclusivas en Roblox con despliegue de iluminación, sonido inmersivo y aforos masivos.
          </p>
        </div>

        {/* Filter Segmented Controls */}
        <div className="flex items-center gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-sm self-start md:self-auto">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm ${
              activeFilter === 'all'
                ? 'bg-white text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Todos ({events.length})
          </button>
          <button
            onClick={() => setActiveFilter('disponibles')}
            className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm ${
              activeFilter === 'disponibles'
                ? 'bg-white text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Disponibles
          </button>
          <button
            onClick={() => setActiveFilter('proximos')}
            className={`px-4 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm ${
              activeFilter === 'proximos'
                ? 'bg-white text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            Próximos
          </button>
        </div>
      </div>

      {/* Events Grid or Empty State */}
      {filteredEvents.length === 0 ? (
        <div className="p-12 text-center bg-zinc-950/60 border border-zinc-800 rounded-sm">
          <Calendar className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-display font-bold uppercase text-white">
            No Hay Conciertos en la Cartelera
          </h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1 leading-relaxed">
            Actualmente no hay espectáculos activos. El equipo de producción de Ducky Productions anunciará los próximos eventos paso a paso.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((event) => {
            const statusInfo = getStatusLabel(event.status);
            const capacityPercent = Math.min(100, Math.round((event.registeredCount / event.maxCapacity) * 100));

          return (
            <article
              key={event.id}
              className="group flex flex-col bg-zinc-950/80 border border-zinc-800 hover:border-zinc-600 transition-all duration-300 rounded-sm overflow-hidden"
            >
              {/* Poster Image Container */}
              <div className="relative aspect-[16/10] overflow-hidden bg-zinc-900">
                <img
                  src={resolveAssetUrl(event.posterImage)}
                  alt={`Cartel oficial del concierto ${event.title}`}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
                
                {/* Status and genre unboxed metadata */}
                <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-xs font-mono">
                  <span className={`bg-black/80 backdrop-blur-md px-2.5 py-1 border border-zinc-800/80 ${statusInfo.color}`}>
                    {statusInfo.text}
                  </span>
                  <span className="bg-black/80 backdrop-blur-md px-2 py-1 text-zinc-400 border border-zinc-800/80 text-[10px]">
                    {event.genre}
                  </span>
                </div>

                {/* Date overlay badge */}
                <div className="absolute bottom-3 left-3 flex items-center gap-2 text-xs font-mono text-zinc-300 bg-black/70 backdrop-blur-sm px-2.5 py-1 border border-zinc-800/60">
                  <Calendar className="w-3.5 h-3.5 text-zinc-400" />
                  <span className="font-semibold text-white">{event.date}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-2 text-xs text-zinc-400 mb-1 font-mono">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{event.venueName}</span>
                    <span>·</span>
                    <Clock className="w-3.5 h-3.5 text-zinc-500" />
                    <span>{event.time}</span>
                  </div>

                  <h3 className="text-xl font-display font-bold text-white uppercase tracking-tight group-hover:text-zinc-200 transition-colors mb-2">
                    {event.title}
                  </h3>

                  <p className="text-xs font-mono text-zinc-400 mb-3 uppercase tracking-wider">
                    {event.artist}
                  </p>

                  <p className="text-sm text-zinc-400 line-clamp-3 leading-relaxed mb-4">
                    {event.description}
                  </p>
                </div>

                {/* Capacity progress & action buttons */}
                <div className="pt-4 border-t border-zinc-850">
                  <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                    <span className="flex items-center gap-1.5">
                      <Users className="w-3 h-3 text-zinc-500" />
                      <span>Aforo: {event.registeredCount.toLocaleString()} / {event.maxCapacity.toLocaleString()}</span>
                    </span>
                    <span className="tabular-nums text-zinc-400 font-semibold">{capacityPercent}%</span>
                  </div>
                  
                  {/* Subtle capacity bar */}
                  <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden mb-4">
                    <div 
                      className={`h-full transition-all duration-500 ${
                        capacityPercent >= 90 ? 'bg-amber-400' : 'bg-zinc-200'
                      }`}
                      style={{ width: `${capacityPercent}%` }}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      onClick={() => setSelectedEventModal(event)}
                      className="py-2.5 px-3 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-sm transition-colors text-center"
                    >
                      Ver Ficha
                    </button>
                    <button
                      onClick={() => onSelectEventForAccess(event.id)}
                      disabled={event.status === 'aforo_completo' || event.status === 'finalizado'}
                      className={`py-2.5 px-3 text-xs font-bold uppercase tracking-wider text-center rounded-sm transition-all ${
                        event.status === 'aforo_completo' || event.status === 'finalizado'
                          ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                          : 'bg-white hover:bg-zinc-200 text-black shadow-md'
                      }`}
                    >
                      Conseguir Acceso
                    </button>
                  </div>
                </div>

              </div>
            </article>
          );
        })}
      </div>
      )}

      {/* Event Details Modal */}
      {selectedEventModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden shadow-2xl max-h-[90vh] flex flex-col">
            
            {/* Modal Header Image */}
            <div className="relative h-56 sm:h-64 bg-zinc-900 shrink-0">
              <img
                src={resolveAssetUrl(selectedEventModal.posterImage)}
                alt={selectedEventModal.title}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
              
              <button
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-4 right-4 p-2 bg-black/80 hover:bg-black text-zinc-400 hover:text-white rounded-full transition-colors border border-zinc-800"
                aria-label="Cerrar modal"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="absolute bottom-4 left-6 right-6">
                <div className="text-xs font-mono uppercase text-zinc-400 mb-1">
                  {selectedEventModal.artist}
                </div>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                  {selectedEventModal.title}
                </h3>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-sm text-zinc-300">
              
              {/* Event Quick Facts */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 p-4 bg-zinc-900/60 border border-zinc-800/80 rounded-sm font-mono text-xs">
                <div>
                  <span className="text-zinc-500 uppercase block text-[10px]">Fecha</span>
                  <span className="text-white font-semibold">{selectedEventModal.date}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block text-[10px]">Horario</span>
                  <span className="text-white font-semibold">{selectedEventModal.time}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block text-[10px]">Recinto</span>
                  <span className="text-white font-semibold">{selectedEventModal.venueName}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block text-[10px]">Clasificación</span>
                  <span className="text-zinc-300">{selectedEventModal.ageRating}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block text-[10px]">Género</span>
                  <span className="text-zinc-300">{selectedEventModal.genre}</span>
                </div>
                <div>
                  <span className="text-zinc-500 uppercase block text-[10px]">Capacidad</span>
                  <span className="text-zinc-300 tabular-nums">{selectedEventModal.maxCapacity.toLocaleString()} avatares</span>
                </div>
              </div>

              {/* Extended Synopsis */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Sinopsis del Concierto
                </h4>
                <p className="leading-relaxed text-zinc-300">
                  {selectedEventModal.extendedBio || selectedEventModal.description}
                </p>
              </div>

              {/* Production & Technical Specifications in Roblox */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Especificaciones de Producción en Roblox Studio
                </h4>
                <ul className="space-y-2 text-xs font-mono text-zinc-400 bg-zinc-900/40 p-3 border border-zinc-850 rounded-sm">
                  <li className="flex items-center gap-2">
                    <span className="text-white font-medium">Iluminación:</span>
                    <span>{selectedEventModal.lightingTech}</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="text-white font-medium">Ingeniería de Audio:</span>
                    <span>{selectedEventModal.soundTech}</span>
                  </li>
                  <li className="flex items-center justify-between gap-2">
                    <span className="text-white font-medium">Servidor Directo Roblox:</span>
                    <a
                      href={selectedEventModal.robloxExperienceUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="text-emerald-400 hover:text-emerald-300 underline flex items-center gap-1 font-semibold"
                    >
                      <span>Abrir Juego de Roblox</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </li>
                </ul>
              </div>

              {/* Tiers Available */}
              <div>
                <h4 className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Modalidades de Acceso Digital
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedEventModal.vipTiers.map((tier, idx) => (
                    <span 
                      key={idx}
                      className={`px-3 py-1 border text-xs rounded-sm font-mono ${
                        tier === 'Backstage Pass'
                          ? 'bg-amber-950/60 text-amber-300 border-amber-800'
                          : 'bg-zinc-900 border-zinc-800 text-zinc-300'
                      }`}
                    >
                      {tier} {tier === 'Backstage Pass' ? '(Solo Staff)' : ''}
                    </span>
                  ))}
                </div>
              </div>

              {/* Honest Disclaimer */}
              <div className="p-3 bg-zinc-900/50 border border-zinc-800 rounded-sm flex items-start gap-2.5 text-xs text-zinc-400">
                <Info className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                <span>
                  El registro genera un pase de acceso digital con código nominativo para el evento en Roblox. No conlleva ningún cargo monetario real.
                </span>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-zinc-900/90 border-t border-zinc-800 flex items-center justify-between gap-4 shrink-0">
              <a
                href={selectedEventModal.robloxExperienceUrl}
                target="_blank"
                rel="noreferrer"
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-semibold rounded-sm transition-colors flex items-center gap-1.5"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>Entrar al Juego</span>
              </a>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setSelectedEventModal(null)}
                  className="px-4 py-2 text-xs font-semibold text-zinc-400 hover:text-white transition-colors"
                >
                  Cerrar
                </button>
                <button
                  onClick={() => {
                    const evId = selectedEventModal.id;
                    setSelectedEventModal(null);
                    onSelectEventForAccess(evId);
                  }}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-black bg-white hover:bg-zinc-200 transition-colors rounded-sm flex items-center gap-2 shadow"
                >
                  <span>Conseguir Acceso</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
