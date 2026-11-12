import React, { useState } from 'react';
import { GalleryPhoto } from '../types';
import { Eye, X, MapPin, Calendar } from 'lucide-react';
import { resolveAssetUrl } from '../assets/images';

interface GallerySectionProps {
  photos: GalleryPhoto[];
}

export const GallerySection: React.FC<GallerySectionProps> = ({ photos }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('todos');
  const [activePhoto, setActivePhoto] = useState<GalleryPhoto | null>(null);

  const categories = ['todos', 'Escenarios', 'Artistas', 'Luces y Efectos', 'Público'];

  const filteredPhotos = selectedCategory === 'todos' 
    ? photos 
    : photos.filter(p => p.category === selectedCategory);

  return (
    <section id="galeria" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      
      {/* Header & Category Filter */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
        <div>
          <div className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-mono mb-2">
            REGISTRO VISUAL · MOMENTOS HISTÓRICOS
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
            Galería Oficial de Conciertos
          </h2>
          <p className="text-sm text-zinc-400 max-w-xl mt-2">
            Capturas cinemáticas directas desde el motor de renderizado de nuestros espectáculos en vivo dentro de Roblox.
          </p>
        </div>

        {/* Filter Pills / Tabs */}
        <div className="flex flex-wrap gap-1 p-1 bg-zinc-900 border border-zinc-800 rounded-sm self-start md:self-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm ${
                selectedCategory === cat
                  ? 'bg-white text-black shadow-sm'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {cat === 'todos' ? 'Todo el Archivo' : cat}
            </button>
          ))}
        </div>
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPhotos.map((photo) => (
          <div
            key={photo.id}
            onClick={() => setActivePhoto(photo)}
            className="group relative aspect-[16/10] bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden cursor-pointer"
          >
            <img
              src={resolveAssetUrl(photo.image)}
              alt={photo.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              referrerPolicy="no-referrer"
            />
            {/* Scrim Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80 group-hover:opacity-95 transition-opacity" />
            
            {/* Hover Indicator */}
            <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 border border-zinc-700 flex items-center justify-center text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">
              <Eye className="w-4 h-4" />
            </div>

            {/* Bottom Caption */}
            <div className="absolute bottom-3 left-3 right-3 text-left">
              <div className="flex items-center gap-2 text-[10px] font-mono text-zinc-400 mb-1">
                <span>{photo.category}</span>
                <span>·</span>
                <span>{photo.venue}</span>
              </div>
              <h3 className="text-sm font-bold font-display text-white uppercase tracking-tight group-hover:text-zinc-200">
                {photo.title}
              </h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-4xl bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden shadow-2xl">
            
            {/* Close Button */}
            <button
              onClick={() => setActivePhoto(null)}
              className="absolute top-4 right-4 z-10 p-2 bg-black/80 hover:bg-black text-zinc-400 hover:text-white rounded-full transition-colors border border-zinc-800"
              aria-label="Cerrar imagen"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Large Image */}
            <div className="relative aspect-[16/10] bg-black">
              <img
                src={resolveAssetUrl(activePhoto.image)}
                alt={activePhoto.title}
                className="w-full h-full object-contain"
                referrerPolicy="no-referrer"
              />
            </div>

            {/* Lightbox Details */}
            <div className="p-6 bg-zinc-950 border-t border-zinc-850 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="flex items-center gap-3 text-xs font-mono text-zinc-400 mb-1">
                  <span className="text-white font-semibold">{activePhoto.category}</span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-zinc-500" />
                    {activePhoto.venue}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-zinc-500" />
                    {activePhoto.year}
                  </span>
                </div>
                <h3 className="text-lg font-display font-bold text-white uppercase tracking-tight">
                  {activePhoto.title}
                </h3>
                <p className="text-xs text-zinc-400 mt-1 max-w-2xl">
                  {activePhoto.description}
                </p>
              </div>

              <button
                onClick={() => setActivePhoto(null)}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 text-xs font-semibold rounded-sm border border-zinc-800"
              >
                Cerrar Visor
              </button>
            </div>

          </div>
        </div>
      )}

    </section>
  );
};
