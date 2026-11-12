import React from 'react';
import { ArrowDown, Calendar, MapPin, Play, Radio } from 'lucide-react';
import { ConcertEvent } from '../types';
import { ASSET_IMAGES, resolveAssetUrl } from '../assets/images';

interface HeroSectionProps {
  headlineEvent?: ConcertEvent;
  onDiscoverEvents: () => void;
  onGetAccess: (eventId?: string) => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  headlineEvent,
  onDiscoverEvents,
  onGetAccess
}) => {
  return (
    <section id="inicio" className="relative min-h-[92vh] lg:min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Cinematic Image with measured gradient scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={ASSET_IMAGES.heroStadium}
          alt="Estadio gigante iluminado durante un concierto masivo de Roblox por Ducky Productions"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center scale-105 animate-in fade-in zoom-in-105 duration-1000"
        />
        {/* Cinematic gradient overlays for legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#070709] via-[#070709]/70 to-[#070709]/40" />
        <div className="absolute inset-0 bg-radial from-transparent via-[#070709]/50 to-[#070709]/90" />
        {/* Subtle grid pattern texture */}
        <div className="absolute inset-0 cinematic-grid opacity-30 pointer-events-none" />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center flex flex-col items-center">
        
        {/* Clean Top Kicker - Unboxed editorial label */}
        <div className="flex items-center gap-3 text-xs uppercase tracking-[0.28em] text-zinc-400 font-mono mb-6">
          <span>DUCKY PRODUCTIONS</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>ROBLOX ENTERTAINMENT GROUP</span>
          <span aria-hidden="true" className="text-zinc-600">·</span>
          <span>TEMPORADA 2026/2027</span>
        </div>

        {/* Main Headline (User Mandated Exact Text) */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-black tracking-tight text-white uppercase max-w-5xl leading-[1.08] mb-6 drop-shadow-2xl text-balance">
          EL CONCIERTO DE ROBLOX MÁS IMPORTANTE DE TU VIDA.
        </h1>

        {/* Subtitle (User Mandated Exact Text) */}
        <p className="text-base sm:text-xl md:text-2xl font-normal text-zinc-300 max-w-3xl leading-relaxed mb-10 text-balance">
          Grandes espectáculos. Experiencias inolvidables. Un escenario sin límites.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto mb-16">
          <button
            onClick={onDiscoverEvents}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase text-black bg-white hover:bg-zinc-200 transition-all rounded-sm shadow-xl hover:shadow-white/20 active:scale-95 flex items-center justify-center gap-2"
          >
            <Calendar className="w-4 h-4" />
            <span>DESCUBRIR EVENTOS</span>
          </button>
          
          <button
            onClick={() => onGetAccess(headlineEvent?.id)}
            className="w-full sm:w-auto px-8 py-4 text-xs sm:text-sm font-bold tracking-widest uppercase text-white bg-transparent hover:bg-zinc-900/80 border border-zinc-700 hover:border-zinc-500 transition-all rounded-sm flex items-center justify-center gap-2 backdrop-blur-sm active:scale-95"
          >
            <span>CONSEGUIR ACCESO</span>
          </button>
        </div>

        {/* Headline Event Spotlight Banner */}
        {headlineEvent && (
          <div className="w-full max-w-3xl border border-zinc-800/80 bg-zinc-950/70 backdrop-blur-md p-4 sm:p-5 rounded-sm flex flex-col sm:flex-row items-center justify-between gap-4 text-left shadow-2xl">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden shrink-0 hidden sm:block">
                <img 
                  src={resolveAssetUrl(headlineEvent.posterImage)} 
                  alt={headlineEvent.title} 
                  className="w-full h-full object-cover" 
                  referrerPolicy="no-referrer"
                />
              </div>
              <div>
                <div className="flex items-center gap-2 text-[11px] font-mono uppercase text-zinc-400">
                  <span className="text-emerald-400 flex items-center gap-1 font-semibold">
                    <Radio className="w-3 h-3 animate-pulse" /> PRÓXIMO ESTRENO
                  </span>
                  <span>·</span>
                  <span>{headlineEvent.date}</span>
                </div>
                <h2 className="text-sm sm:text-base font-bold text-white tracking-wide">
                  {headlineEvent.title}
                </h2>
                <div className="flex items-center gap-2 text-xs text-zinc-400 mt-0.5">
                  <MapPin className="w-3 h-3 text-zinc-500" />
                  <span>{headlineEvent.venueName}</span>
                  <span>·</span>
                  <span className="font-mono">{headlineEvent.time}</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => onGetAccess(headlineEvent.id)}
              className="w-full sm:w-auto px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-black bg-zinc-100 hover:bg-white rounded-sm shrink-0 transition-colors"
            >
              Reservar Pase
            </button>
          </div>
        )}

      </div>

      {/* Quantitative Claim-to-Proof Row (Full 1440px baseline) */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-zinc-800/80 bg-[#070709]/90 backdrop-blur-md hidden md:block z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 grid grid-cols-4 divide-x divide-zinc-800/80 text-center text-xs">
          <div className="px-4">
            <p className="font-display font-bold text-lg text-white tabular-nums">85,000+</p>
            <p className="text-zinc-500 uppercase tracking-wider text-[11px] mt-0.5">Avatares por Espectáculo</p>
          </div>
          <div className="px-4">
            <p className="font-display font-bold text-lg text-white">LCS 4.0</p>
            <p className="text-zinc-500 uppercase tracking-wider text-[11px] mt-0.5">Iluminación Volumétrica</p>
          </div>
          <div className="px-4">
            <p className="font-display font-bold text-lg text-white">4 Recintos</p>
            <p className="text-zinc-500 uppercase tracking-wider text-[11px] mt-0.5">Estadios Oficiales DP</p>
          </div>
          <div className="px-4">
            <p className="font-display font-bold text-lg text-white tabular-nums">100% Nativo</p>
            <p className="text-zinc-500 uppercase tracking-wider text-[11px] mt-0.5">Plataforma Roblox Studio</p>
          </div>
        </div>
      </div>

    </section>
  );
};
