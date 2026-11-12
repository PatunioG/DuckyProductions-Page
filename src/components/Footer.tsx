import React from 'react';
import { Shield } from 'lucide-react';

interface FooterProps {
  onOpenAdmin: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenAdmin }) => {
  return (
    <footer className="border-t border-zinc-900 bg-[#050507] text-zinc-400 py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-zinc-900">
          
          {/* Brand Info (5 cols) */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-sm bg-white text-black font-display font-black text-xs flex items-center justify-center tracking-tighter">
                DP
              </div>
              <span className="font-display font-black tracking-widest text-base uppercase text-white">
                DUCKY PRODUCTIONS
              </span>
            </div>
            <p className="text-xs text-zinc-400 max-w-sm leading-relaxed">
              Productora profesional líder de conciertos, giras masivas, festivales y escenografía arquitectónica dentro del metaverso de Roblox.
            </p>
            <p className="text-[11px] font-mono text-zinc-400">
              EL CONCIERTO DE ROBLOX MÁS IMPORTANTE DE TU VIDA.
            </p>
          </div>

          {/* Quick Links (3 cols) */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">
              Navegación Oficial
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#inicio" className="hover:text-white transition-colors">Inicio</a>
              </li>
              <li>
                <a href="#eventos" className="hover:text-white transition-colors">Próximos Eventos</a>
              </li>
              <li>
                <a href="#accesos" className="hover:text-white transition-colors">Conseguir Acceso</a>
              </li>
              <li>
                <a href="#recintos" className="hover:text-white transition-colors">Recintos Oficiales</a>
              </li>
              <li>
                <a href="#nosotros" className="hover:text-white transition-colors">Sobre Nosotros</a>
              </li>
              <li>
                <a href="#galeria" className="hover:text-white transition-colors">Galería Fotográfica</a>
              </li>
              <li>
                <a href="#contacto" className="hover:text-white transition-colors">Contacto & Booking</a>
              </li>
            </ul>
          </div>

          {/* Community & Legal (4 cols) */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono uppercase tracking-wider text-white">
              Aviso Legal & Transparencia
            </h4>
            <p className="text-[11px] text-zinc-400 leading-relaxed">
              Ducky Productions es un colectivo de producción independiente sin afiliación directa, patrocinio ni respaldo formal de Roblox Corporation. "Roblox" es una marca comercial registrada propiedad de Roblox Corporation.
            </p>
            <div className="pt-2">
              <button
                onClick={onOpenAdmin}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-zinc-400 hover:text-white transition-colors py-1 px-2.5 bg-zinc-900 border border-zinc-800 rounded-sm"
              >
                <Shield className="w-3 h-3 text-zinc-400" />
                <span>Portal de Gestión Interna / Admin</span>
              </button>
            </div>
          </div>

        </div>

        {/* Bottom copyright bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-400">
          <div>
            © {new Date().getFullYear()} DUCKY PRODUCTIONS. TODOS LOS DERECHOS RESERVADOS.
          </div>
          <div className="flex items-center gap-4">
            <span>TERMINOS DE SERVICIO</span>
            <span>·</span>
            <span>POLÍTICA DE PRIVACIDAD</span>
            <span>·</span>
            <span>EXPERIENCIAS VIRTUALES</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
