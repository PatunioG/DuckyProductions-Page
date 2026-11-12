import React from 'react';
import { Layers, Volume2, Cpu, Sparkles, Shield, Compass } from 'lucide-react';

export const AboutSection: React.FC = () => {
  return (
    <section id="nosotros" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      
      {/* Editorial Quote Header */}
      <div className="max-w-4xl mx-auto text-center mb-16">
        <div className="text-xs uppercase tracking-[0.28em] text-zinc-400 font-mono mb-4">
          MANIFIESTO Y VISIÓN · DUCKY PRODUCTIONS
        </div>
        
        {/* Exact mandated quote */}
        <blockquote className="text-2xl sm:text-4xl md:text-5xl font-display font-black uppercase text-white tracking-tight leading-tight">
          "No organizamos simplemente conciertos. Creamos experiencias que merecen ser recordadas."
        </blockquote>
        
        <p className="mt-6 text-sm sm:text-base text-zinc-400 max-w-2xl mx-auto leading-relaxed">
          Ducky Productions es la compañía productora de entretenimiento pionera en transformar la plataforma Roblox en el escenario de conciertos más dinámico, multitudinario y tecnológicamente avanzado del mundo.
        </p>
      </div>

      {/* Narrative Split: Company Story + Visual Presentation */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        
        <div className="lg:col-span-6 space-y-6 text-sm text-zinc-300 leading-relaxed">
          <h3 className="text-xl sm:text-2xl font-display font-bold uppercase text-white tracking-tight">
            El Entretenimiento del Mañana, En Directo Hoy
          </h3>
          <p>
            Fundada con la convicción de que los mundos virtuales merecen los mismos estándares de producción que las giras mundiales de estadios físicos, Ducky Productions diseña cada espectáculo desde cero en Roblox Studio.
          </p>
          <p>
            Desde la colocación del primer truss metálico hasta la programación de cada láser volumétrico y la masterización del audio tridimensional, nuestro equipo de ingenieros, escenógrafos y directores de arte trabaja para que cada compás vibre en el avatar de cada asistente.
          </p>
          <p>
            No creemos en pantallas 2D pasivas dentro de un juego. Diseñamos arquitectura viva: escenarios que mutan en pleno solo de guitarra, efectos pirotécnicos con física de partículas reactiva y salas que responden al clamor del público.
          </p>
          
          <div className="pt-4 border-t border-zinc-800 grid grid-cols-3 gap-4 font-mono text-center">
            <div>
              <div className="text-2xl font-bold font-display text-white">4+</div>
              <div className="text-[10px] uppercase text-zinc-500 mt-0.5">Años de Innovación</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-white tabular-nums">250K+</div>
              <div className="text-[10px] uppercase text-zinc-500 mt-0.5">Pases Emitidos</div>
            </div>
            <div>
              <div className="text-2xl font-bold font-display text-white">100%</div>
              <div className="text-[10px] uppercase text-zinc-500 mt-0.5">Original Roblox IP</div>
            </div>
          </div>
        </div>

        {/* Visual Showcase Card */}
        <div className="lg:col-span-6 relative">
          <div className="aspect-[4/3] bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden shadow-2xl relative">
            <img
              src="/src/assets/images/concert_neon_night_1794244586284.jpg"
              alt="Producción en directo de Ducky Productions"
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <div className="absolute bottom-4 left-4 right-4 text-xs font-mono text-zinc-300">
              <span className="text-white font-bold block uppercase text-sm font-display">
                DP Direct Engine
              </span>
              <span>Sincronización milimétrica entre audio, visuales y avatares.</span>
            </div>
          </div>
        </div>

      </div>

      {/* Production Pillars Bento Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <div className="p-6 bg-zinc-950 border border-zinc-850 rounded-sm space-y-3">
          <div className="w-10 h-10 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
            <Layers className="w-5 h-5 text-zinc-300" />
          </div>
          <h4 className="text-base font-display font-bold uppercase text-white tracking-tight">
            Escenografía Viva
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Estructuras de escenario que reaccionan proceduralmente a las frecuencias de audio, cambiando de geometría y elevación durante el show.
          </p>
        </div>

        <div className="p-6 bg-zinc-950 border border-zinc-850 rounded-sm space-y-3">
          <div className="w-10 h-10 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
            <Volume2 className="w-5 h-5 text-zinc-300" />
          </div>
          <h4 className="text-base font-display font-bold uppercase text-white tracking-tight">
            Audio Espacial Binaural
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Ingeniería de sonido 3D posicional nativa de Roblox para percibir con exactitud la distancia a los altavoces de foso o a la grada alta.
          </p>
        </div>

        <div className="p-6 bg-zinc-950 border border-zinc-850 rounded-sm space-y-3">
          <div className="w-10 h-10 rounded-sm bg-zinc-900 border border-zinc-800 flex items-center justify-center text-white">
            <Sparkles className="w-5 h-5 text-zinc-300" />
          </div>
          <h4 className="text-base font-display font-bold uppercase text-white tracking-tight">
            Mocap & Avatares R15
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Trajes de captura de movimiento conectados en directo con artistas reales tocando instrumentos virtuales en el escenario.
          </p>
        </div>

        <div className="p-6 bg-zinc-950 border border-zinc-850 rounded-sm space-y-3">
          <div className="w-10 h-10 rounded-sm bg-zinc-900 border border-zinc-850 flex items-center justify-center text-white">
            <Cpu className="w-5 h-5 text-zinc-300" />
          </div>
          <h4 className="text-base font-display font-bold uppercase text-white tracking-tight">
            Mega-Clúster Sharding
          </h4>
          <p className="text-xs text-zinc-400 leading-relaxed">
            Arquitectura de sincronización multi-servidor con baja latencia y optimización de mallas LOD para albergar decenas de miles de avatares.
          </p>
        </div>

      </div>

    </section>
  );
};
