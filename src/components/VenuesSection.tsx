import React, { useState } from 'react';
import { Venue } from '../types';
import { Building2, Users, Layers, Volume2, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { resolveAssetUrl } from '../assets/images';

interface VenuesSectionProps {
  venues: Venue[];
  onExploreEventsAtVenue?: (venueId: string) => void;
}

export const VenuesSection: React.FC<VenuesSectionProps> = ({ venues }) => {
  const [selectedVenueId, setSelectedVenueId] = useState<string>(venues[0]?.id || 'ducky-stadium');

  const selectedVenue = venues.find(v => v.id === selectedVenueId) || venues[0];

  return (
    <section id="recintos" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      
      {/* Header */}
      <div className="mb-12">
        <div className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-mono mb-2">
          INFRAESTRUCTURA VIRTUAL EXCLUSIVA
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
          Recintos Oficiales Ducky Productions
        </h2>
        <p className="text-sm text-zinc-400 max-w-2xl mt-2">
          Complejos arquitectónicos diseñados en Roblox Studio con ingeniería acústica 3D, trusses cinéticos y optimización de malla para concentraciones masivas.
        </p>
      </div>

      {/* Main Showcase Layout or Empty State */}
      {venues.length === 0 ? (
        <div className="p-12 text-center bg-zinc-950/60 border border-zinc-800 rounded-sm">
          <Building2 className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
          <h3 className="text-base font-display font-bold uppercase text-white">
            No Hay Recintos Registrados
          </h3>
          <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1 leading-relaxed">
            El catálogo de recintos oficiales está vacío. Puedes registrar nuevos estadios o complejos en Roblox desde el panel de producción.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
        
        {/* Left Venue Selector List (4 cols) */}
        <div className="lg:col-span-4 flex flex-col gap-3">
          {venues.map((venue) => {
            const isSelected = venue.id === selectedVenueId;
            return (
              <button
                key={venue.id}
                onClick={() => setSelectedVenueId(venue.id)}
                className={`w-full p-4 text-left border rounded-sm transition-all flex items-center justify-between group ${
                  isSelected
                    ? 'bg-zinc-900 border-white text-white shadow-lg'
                    : 'bg-zinc-950/60 border-zinc-800/80 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center gap-2 text-[10px] font-mono uppercase">
                    <span className={isSelected ? 'text-white' : 'text-zinc-500'}>{venue.code}</span>
                    <span>·</span>
                    <span className={venue.status === 'en_construccion' ? 'text-amber-400' : 'text-emerald-400'}>
                      {venue.status === 'en_construccion' ? 'En Desarrollo' : 'Operativo'}
                    </span>
                  </div>
                  <h3 className="font-display font-bold text-base uppercase tracking-tight text-white mt-1">
                    {venue.name}
                  </h3>
                  <div className="text-xs font-mono text-zinc-400 mt-1 flex items-center gap-1.5">
                    <Users className="w-3 h-3 text-zinc-500" />
                    <span>Capacidad: {venue.capacity.toLocaleString()} avatares</span>
                  </div>
                </div>

                <ChevronRight className={`w-4 h-4 transition-transform ${isSelected ? 'text-white translate-x-1' : 'text-zinc-600 group-hover:text-zinc-400'}`} />
              </button>
            );
          })}
        </div>

        {/* Right Active Venue Card Detail (8 cols) */}
        {selectedVenue && (
          <div className="lg:col-span-8 bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden flex flex-col justify-between shadow-2xl">
            
            {/* Visual Header Image */}
            <div className="relative aspect-[16/9] w-full bg-zinc-900 overflow-hidden">
              <img
                src={resolveAssetUrl(selectedVenue.image)}
                alt={`Recinto oficial ${selectedVenue.name}`}
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent" />
              
              {/* Floating Tag */}
              <div className="absolute top-4 left-4">
                <span className="px-3 py-1 bg-black/80 backdrop-blur-md border border-zinc-700 text-xs font-mono text-white uppercase tracking-wider">
                  {selectedVenue.code}
                </span>
              </div>

              {/* Title Overlay */}
              <div className="absolute bottom-4 left-6 right-6">
                <p className="text-xs font-mono text-zinc-300 uppercase tracking-widest mb-1">
                  {selectedVenue.tagline}
                </p>
                <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
                  {selectedVenue.name}
                </h3>
              </div>
            </div>

            {/* Description & Technical Specs */}
            <div className="p-6 sm:p-8 space-y-6">
              
              <p className="text-sm text-zinc-300 leading-relaxed">
                {selectedVenue.description}
              </p>

              {/* Specs Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
                <div className="p-3.5 bg-zinc-900/60 border border-zinc-850 rounded-sm">
                  <div className="text-[10px] uppercase text-zinc-500 mb-1 flex items-center gap-1.5">
                    <Layers className="w-3.5 h-3.5 text-zinc-400" /> Dimensiones de Escenario
                  </div>
                  <div className="text-zinc-200 font-medium">
                    {selectedVenue.specs.stageWidth}
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-900/60 border border-zinc-850 rounded-sm">
                  <div className="text-[10px] uppercase text-zinc-500 mb-1 flex items-center gap-1.5">
                    <Volume2 className="w-3.5 h-3.5 text-zinc-400" /> Sistema de Sonido
                  </div>
                  <div className="text-zinc-200 font-medium">
                    {selectedVenue.specs.soundSystem}
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-900/60 border border-zinc-850 rounded-sm">
                  <div className="text-[10px] uppercase text-zinc-500 mb-1 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-zinc-400" /> Tecnología de Iluminación
                  </div>
                  <div className="text-zinc-200 font-medium">
                    {selectedVenue.specs.lighting}
                  </div>
                </div>

                <div className="p-3.5 bg-zinc-900/60 border border-zinc-850 rounded-sm">
                  <div className="text-[10px] uppercase text-zinc-500 mb-1 flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-zinc-400" /> Optimización de Avatares (LOD)
                  </div>
                  <div className="text-zinc-200 font-medium">
                    {selectedVenue.specs.avatarLOD}
                  </div>
                </div>
              </div>

              {/* Key Features List */}
              <div>
                <div className="text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
                  Características de Producción
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-zinc-300">
                  {selectedVenue.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-3.5 h-3.5 text-zinc-400 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Bottom Capacity Metric Bar and Direct Game Link */}
              <div className="pt-4 border-t border-zinc-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs font-mono">
                <div>
                  <span className="text-zinc-500 block text-[10px] uppercase">
                    Capacidad Total Autorizada en Roblox
                  </span>
                  <span className="text-lg font-bold font-display text-white tabular-nums">
                    {selectedVenue.capacity.toLocaleString()} Avatares
                  </span>
                </div>

                {selectedVenue.robloxGameUrl && (
                  <a
                    href={selectedVenue.robloxGameUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 border border-zinc-700 hover:border-zinc-500 text-zinc-200 hover:text-white rounded-sm transition-colors flex items-center gap-2 font-mono text-xs"
                  >
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Abrir Recinto en Roblox</span>
                  </a>
                )}
              </div>

            </div>

          </div>
        )}

        </div>
      )}

    </section>
  );
};
