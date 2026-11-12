import React, { useState } from 'react';
import { StorageService } from '../services/storageService';
import { Send, CheckCircle2, MessageSquare, Music, Shield, ExternalLink, AlertCircle } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const [formType, setFormType] = useState<'general' | 'artista' | 'staff_tecnico'>('artista');
  const [name, setName] = useState('');
  const [robloxUsername, setRobloxUsername] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [portfolioUrl, setPortfolioUrl] = useState('');
  const [message, setMessage] = useState('');
  const [isSent, setIsSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!name.trim()) {
      setErrorMsg('Por favor introduce tu nombre o alias.');
      return;
    }
    if (!robloxUsername.trim()) {
      setErrorMsg('Por favor introduce tu usuario de Roblox.');
      return;
    }
    if (!email.trim() || !email.includes('@')) {
      setErrorMsg('Por favor introduce un correo electrónico válido.');
      return;
    }
    if (!message.trim()) {
      setErrorMsg('Por favor escribe tu propuesta o consulta.');
      return;
    }

    StorageService.createInquiry({
      name: name.trim(),
      robloxUsername: robloxUsername.trim(),
      email: email.trim(),
      type: formType,
      subject: subject.trim() || (formType === 'artista' ? 'Propuesta de Artista / Show' : 'Consulta General'),
      portfolioUrl: portfolioUrl.trim(),
      message: message.trim()
    });

    setIsSent(true);
    setName('');
    setRobloxUsername('');
    setEmail('');
    setSubject('');
    setPortfolioUrl('');
    setMessage('');
  };

  return (
    <section id="contacto" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-mono mb-2">
          CANALES OFICIALES & TALENTO
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
          Contacto & Colaboraciones
        </h2>
        <p className="text-sm text-zinc-400 mt-2">
          ¿Eres un artista musical, DJ, animador o desarrollador en Roblox? Conecta con el equipo de producción de Ducky Productions.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        
        {/* Left Column: Official Social Channels & Booking Info (5 cols) */}
        <div className="lg:col-span-5 space-y-8">
          
          <div className="bg-zinc-950 border border-zinc-800 p-6 rounded-sm space-y-4">
            <h3 className="text-lg font-display font-bold uppercase text-white tracking-tight">
              Comunidad & Redes Oficiales
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Sigue los anuncios de cartelera, ensayos en directo y aperturas de recintos a través de nuestros canales oficiales:
            </p>

            <div className="space-y-3 font-mono text-xs pt-2">
              <a
                href="https://www.roblox.com/groups/ducky-productions"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-sm transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-400 group-hover:bg-white" />
                  <span className="font-semibold text-white">Grupo Oficial de Roblox</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-500 group-hover:text-zinc-300">
                  <span>ducky-productions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>

              <a
                href="https://discord.gg/duckyproductions"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-sm transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-indigo-400" />
                  <span className="font-semibold text-white">Servidor de Discord</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-500 group-hover:text-zinc-300">
                  <span>/duckyproductions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>

              <a
                href="https://youtube.com/@duckyproductions"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-sm transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-rose-400" />
                  <span className="font-semibold text-white">Canal de YouTube</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-500 group-hover:text-zinc-300">
                  <span>@duckyproductions</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>

              <a
                href="https://x.com/ducky_prod_rbx"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between p-3 bg-zinc-900/70 hover:bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-zinc-300 hover:text-white rounded-sm transition-all group"
              >
                <div className="flex items-center gap-2.5">
                  <span className="w-2 h-2 rounded-full bg-zinc-300" />
                  <span className="font-semibold text-white">X (Twitter)</span>
                </div>
                <div className="flex items-center gap-1 text-[11px] text-zinc-500 group-hover:text-zinc-300">
                  <span>@ducky_prod_rbx</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </a>
            </div>
          </div>

          {/* Artist & Creator Pitch Note */}
          <div className="p-6 bg-zinc-950/60 border border-zinc-850 rounded-sm space-y-3">
            <div className="flex items-center gap-2 text-xs font-mono uppercase text-zinc-400">
              <Music className="w-4 h-4 text-zinc-300" />
              <span>Convocatoria de Artistas & DJs</span>
            </div>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Buscamos continuamente músicos, productores y cantantes independientes que deseen llevar su obra a un público global de avatares. Proporcionamos avatar R15 personalizado, escenografía completa y masterización espacial.
            </p>
          </div>

        </div>

        {/* Right Column: Contact & Application Form (7 cols) */}
        <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-sm">
          
          {isSent ? (
            <div className="p-8 text-center space-y-4 animate-in fade-in duration-200">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto" />
              <h3 className="text-xl font-display font-bold uppercase text-white">
                Mensaje Recibido
              </h3>
              <p className="text-sm text-zinc-300 max-w-md mx-auto">
                Tu solicitud ha sido remitida al equipo de coordinación de Ducky Productions. Revisamos todas las propuestas en un plazo de 48-72 horas.
              </p>
              <button
                onClick={() => setIsSent(false)}
                className="mt-4 px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-zinc-200"
              >
                Enviar Otro Mensaje
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              {/* Type Selector Tabs */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Tipo de Solicitud
                </label>
                <div className="grid grid-cols-3 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormType('artista')}
                    className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider border rounded-sm transition-colors text-center ${
                      formType === 'artista'
                        ? 'bg-white text-black border-white'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    Artista / DJ
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('staff_tecnico')}
                    className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider border rounded-sm transition-colors text-center ${
                      formType === 'staff_tecnico'
                        ? 'bg-white text-black border-white'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    Staff / Mapeador
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormType('general')}
                    className={`py-2 px-3 text-xs font-semibold uppercase tracking-wider border rounded-sm transition-colors text-center ${
                      formType === 'general'
                        ? 'bg-white text-black border-white'
                        : 'bg-zinc-900 text-zinc-400 border-zinc-800 hover:text-white'
                    }`}
                  >
                    Consulta General
                  </button>
                </div>
              </div>

              {/* Name & Roblox Username Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Nombre o Nombre Artístico
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tu nombre artístico"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Usuario de Roblox
                  </label>
                  <input
                    type="text"
                    value={robloxUsername}
                    onChange={(e) => setRobloxUsername(e.target.value)}
                    placeholder="@TuUsuarioRoblox"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors font-mono"
                  />
                </div>
              </div>

              {/* Email & Portfolio Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contacto@ejemplo.com"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                    Enlace de Portfolio / Soundcloud / Demo
                  </label>
                  <input
                    type="url"
                    value={portfolioUrl}
                    onChange={(e) => setPortfolioUrl(e.target.value)}
                    placeholder="https://..."
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                  />
                </div>
              </div>

              {/* Subject */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Asunto
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Ej: Propuesta de show para Ducky Stadium en temporada 2027"
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                />
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2">
                  Mensaje / Descripción del Proyecto
                </label>
                <textarea
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Cuéntanos sobre tu trayectoria, género musical, propuesta escénica o cómo te gustaría colaborar con Ducky Productions..."
                  className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors resize-none"
                />
              </div>

              {/* Error notice */}
              {errorMsg && (
                <div className="p-3 bg-rose-950/60 border border-rose-800 text-rose-300 text-xs flex items-center gap-2 rounded-sm">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMsg}</span>
                </div>
              )}

              {/* Submit CTA */}
              <button
                type="submit"
                className="w-full py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-zinc-200 transition-all rounded-sm flex items-center justify-center gap-2 shadow-xl active:scale-95"
              >
                <Send className="w-4 h-4" />
                <span>Enviar Solicitud a Producción</span>
              </button>

            </form>
          )}

        </div>

      </div>

    </section>
  );
};
