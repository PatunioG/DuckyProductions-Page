import React, { useState, useEffect } from 'react';
import { Shield, Menu, X, ArrowUpRight } from 'lucide-react';

interface NavbarProps {
  onOpenAdmin: () => void;
  onOpenRegistration: (eventId?: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenAdmin, onOpenRegistration }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b ${
        scrolled 
          ? 'bg-[#070709]/95 backdrop-blur-md border-zinc-800/80 shadow-2xl py-3' 
          : 'bg-gradient-to-b from-black/90 via-black/50 to-transparent border-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between gap-8">
          
          {/* Zone 1: Single text element wordmark / Brand */}
          <a 
            href="#inicio" 
            className="flex items-center gap-3 text-white group cursor-pointer shrink-0"
            aria-label="Ducky Productions Home"
          >
            {/* DP Monogram Emblem */}
            <div className="w-9 h-9 rounded-sm bg-gradient-to-br from-zinc-100 to-zinc-400 text-black flex items-center justify-center font-black tracking-tighter text-sm font-display shadow-md group-hover:scale-105 transition-transform">
              DP
            </div>
            <div className="flex flex-col">
              <span className="font-display font-black tracking-wider text-base uppercase text-white group-hover:text-zinc-200 transition-colors">
                DUCKY PRODUCTIONS
              </span>
              <span className="text-[10px] tracking-widest text-zinc-400 font-mono uppercase -mt-0.5">
                ROBLOX LIVE EXPERIENCES
              </span>
            </div>
          </a>

          {/* Zone 2: Navigation Links (single-line, subtle hover) */}
          <nav className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-medium text-zinc-400">
            <a href="#eventos" className="hover:text-white transition-colors whitespace-nowrap">
              Próximos Eventos
            </a>
            <a href="#accesos" className="hover:text-white transition-colors whitespace-nowrap">
              Conseguir Acceso
            </a>
            <a href="#recintos" className="hover:text-white transition-colors whitespace-nowrap">
              Recintos
            </a>
            <a href="#nosotros" className="hover:text-white transition-colors whitespace-nowrap">
              Sobre Nosotros
            </a>
            <a href="#galeria" className="hover:text-white transition-colors whitespace-nowrap">
              Galería
            </a>
            <a href="#contacto" className="hover:text-white transition-colors whitespace-nowrap">
              Contacto
            </a>
          </nav>

          {/* Zone 3: 1 Primary Action + Quick Admin link */}
          <div className="hidden sm:flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800/80 rounded transition-colors text-xs font-mono flex items-center gap-1.5"
              title="Panel de Administración"
            >
              <Shield className="w-3.5 h-3.5 text-zinc-300" />
              <span className="hidden xl:inline">Admin</span>
            </button>
            <button
              onClick={() => onOpenRegistration()}
              className="px-5 py-2.5 text-xs font-semibold tracking-wider uppercase text-black bg-white hover:bg-zinc-200 transition-all rounded-sm flex items-center gap-1.5 shadow-lg hover:shadow-white/10 active:scale-95"
            >
              <span>Conseguir Acceso</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={onOpenAdmin}
              className="p-2 text-zinc-400 hover:text-white"
              aria-label="Panel Admin"
            >
              <Shield className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-zinc-300 hover:text-white focus:outline-none"
              aria-label="Abrir menú"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden bg-[#070709] border-b border-zinc-800 px-6 py-6 space-y-4 animate-in fade-in duration-150">
          <nav className="flex flex-col gap-4 text-sm font-medium tracking-wider uppercase text-zinc-300">
            <a 
              href="#eventos" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Próximos Eventos
            </a>
            <a 
              href="#accesos" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Conseguir Acceso
            </a>
            <a 
              href="#recintos" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Recintos Oficiales
            </a>
            <a 
              href="#nosotros" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Sobre Nosotros
            </a>
            <a 
              href="#galeria" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Galería
            </a>
            <a 
              href="#contacto" 
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-white transition-colors"
            >
              Contacto
            </a>
          </nav>
          <div className="pt-4 border-t border-zinc-800/80 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenRegistration();
              }}
              className="w-full py-3 text-center text-xs font-semibold tracking-wider uppercase text-black bg-white rounded-sm"
            >
              Conseguir Acceso
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdmin();
              }}
              className="w-full py-2.5 text-center text-xs text-zinc-400 hover:text-white border border-zinc-800 rounded-sm"
            >
              Acceso a Administración
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
