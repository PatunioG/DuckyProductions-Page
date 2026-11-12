import React, { useState, useEffect } from 'react';
import { ConcertEvent, AccessRegistration, TicketTier } from '../types';
import { StorageService } from '../services/storageService';
import { DigitalTicket } from './DigitalTicket';
import { Ticket, Search, CheckCircle, AlertCircle, Sparkles, User, Mail, ShieldAlert, ArrowRight } from 'lucide-react';
import { resolveAssetUrl } from '../assets/images';

interface RegistrationSectionProps {
  events: ConcertEvent[];
  initialSelectedEventId?: string;
}

export const RegistrationSection: React.FC<RegistrationSectionProps> = ({
  events,
  initialSelectedEventId
}) => {
  const [activeTab, setActiveTab] = useState<'register' | 'search'>('register');
  const [selectedEventId, setSelectedEventId] = useState<string>(
    initialSelectedEventId || (events[0] ? events[0].id : '')
  );
  
  // Registration Form State
  const [robloxUsername, setRobloxUsername] = useState('');
  const [email, setEmail] = useState('');
  const [tier, setTier] = useState<TicketTier>('General');
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [validationError, setValidationError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmedPass, setConfirmedPass] = useState<AccessRegistration | null>(null);

  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<AccessRegistration[]>([]);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    if (initialSelectedEventId) {
      setSelectedEventId(initialSelectedEventId);
      setActiveTab('register');
      setConfirmedPass(null);
    }
  }, [initialSelectedEventId]);

  const selectedEvent = events.find(e => e.id === selectedEventId) || events[0];

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setValidationError('');

    const cleanUsername = robloxUsername.trim();
    if (!cleanUsername) {
      setValidationError('Por favor ingresa tu nombre de usuario de Roblox.');
      return;
    }
    if (cleanUsername.length < 3 || cleanUsername.length > 20) {
      setValidationError('El usuario de Roblox debe tener entre 3 y 20 caracteres.');
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(cleanUsername)) {
      setValidationError('El nombre de usuario contiene caracteres no válidos (solo letras, números y guión bajo).');
      return;
    }
    if (!email || !email.includes('@')) {
      setValidationError('Por favor ingresa un correo electrónico de contacto válido.');
      return;
    }

    // MANDATORY REQUIREMENT: Backstage Pass requires official STAFF status
    if (tier === 'Backstage Pass') {
      const isStaff = StorageService.isRobloxUserStaff(cleanUsername);
      if (!isStaff) {
        setValidationError(
          `ACCESO DENEGADO A BACKSTAGE: El "Backstage Pass" está reservado únicamente para miembros acreditados del STAFF oficial de Ducky Productions. El usuario de Roblox "@${cleanUsername}" no figura en el registro de Staff. Selecciona acceso "General" o "VIP Golden Pit", o solicita acreditación en el Panel de Administración.`
        );
        return;
      }
    }

    if (!acceptedTerms) {
      setValidationError('Debes confirmar que comprendes las condiciones oficiales de acceso a la experiencia de Roblox.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      let seatZone = 'Pista General - Acceso Estándar';
      if (tier === 'VIP Golden Pit') {
        seatZone = 'Foso Golden Pit - Primeras Filas';
      } else if (tier === 'Backstage Pass') {
        seatZone = 'Pase Backstage - STAFF Oficial Acreditado';
      }

      const newPass = StorageService.createRegistration({
        eventId: selectedEvent.id,
        eventTitle: selectedEvent.title,
        eventDate: selectedEvent.date,
        eventTime: selectedEvent.time,
        venueName: selectedEvent.venueName,
        robloxUsername: cleanUsername,
        email: email.trim(),
        tier,
        seatZone
      });

      setConfirmedPass(newPass);
      setIsSubmitting(false);
    }, 400);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const results = StorageService.findRegistrationsByRobloxUser(searchQuery);
    setSearchResults(results);
    setHasSearched(true);
  };

  return (
    <section id="accesos" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-zinc-900">
      
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-12">
        <div className="text-xs uppercase tracking-[0.25em] text-zinc-400 font-mono mb-2">
          SISTEMA OFICIAL DE REGISTRO · ACCESO A CONCIERTOS
        </div>
        <h2 className="text-3xl sm:text-4xl font-display font-black uppercase text-white tracking-tight">
          Consigue Tu Acceso Digital
        </h2>
        <p className="text-sm text-zinc-400 mt-2">
          Reserva tu pase nominativo para las experiencias musicales de Ducky Productions en Roblox y gestiona tus credenciales.
        </p>

        {/* Tab switch */}
        <div className="inline-flex p-1 bg-zinc-900 border border-zinc-800 rounded-sm mt-8">
          <button
            onClick={() => {
              setActiveTab('register');
              setConfirmedPass(null);
            }}
            className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm flex items-center gap-2 ${
              activeTab === 'register'
                ? 'bg-white text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Ticket className="w-3.5 h-3.5" />
            <span>Nuevo Registro</span>
          </button>

          <button
            onClick={() => setActiveTab('search')}
            className={`px-5 py-2 text-xs font-semibold tracking-wider uppercase transition-colors rounded-sm flex items-center gap-2 ${
              activeTab === 'search'
                ? 'bg-white text-black shadow-sm'
                : 'text-zinc-400 hover:text-white'
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Consultar Mis Accesos</span>
          </button>
        </div>
      </div>

      {/* Mode 1: Registration Form */}
      {activeTab === 'register' && (
        <div className="max-w-4xl mx-auto">
          {events.length === 0 ? (
            <div className="p-12 text-center bg-zinc-950/60 border border-zinc-800 rounded-sm">
              <Ticket className="w-10 h-10 text-zinc-600 mx-auto mb-3" />
              <h3 className="text-base font-display font-bold uppercase text-white">
                No Hay Eventos Disponibles para Registro
              </h3>
              <p className="text-xs text-zinc-400 max-w-md mx-auto mt-1 leading-relaxed">
                El registro se habilitará automáticamente en cuanto el equipo de producción publique los nuevos conciertos oficiales desde el panel.
              </p>
            </div>
          ) : confirmedPass ? (
            /* Confirmation View */
            <div className="animate-in fade-in duration-300">
              <div className="p-4 bg-emerald-950/40 border border-emerald-800/60 rounded-sm text-center mb-6 max-w-xl mx-auto">
                <CheckCircle className="w-8 h-8 text-emerald-400 mx-auto mb-2" />
                <h3 className="text-lg font-display font-bold text-white uppercase">
                  ¡Registro Confirmado con Éxito!
                </h3>
                <p className="text-xs text-zinc-300 mt-1">
                  Tu pase de acceso para <span className="text-white font-semibold">{confirmedPass.eventTitle}</span> ha sido emitido con el identificador <span className="font-mono text-emerald-300">{confirmedPass.id}</span>.
                </p>
              </div>

              {/* Digital Pass Render */}
              <DigitalTicket pass={confirmedPass} />

              <div className="text-center mt-6">
                <button
                  onClick={() => {
                    setConfirmedPass(null);
                    setRobloxUsername('');
                  }}
                  className="px-6 py-2.5 text-xs font-bold uppercase tracking-wider text-zinc-300 hover:text-white bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-sm transition-colors"
                >
                  Registrar Otro Acceso
                </button>
              </div>
            </div>
          ) : (
            /* Form Grid */
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
              
              {/* Event Preview Summary Card (5 cols) */}
              {selectedEvent && (
                <div className="lg:col-span-5 bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden p-6 space-y-4">
                  <div className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Evento Seleccionado
                  </div>

                  <div className="aspect-video bg-zinc-900 rounded-sm overflow-hidden relative">
                    <img
                      src={resolveAssetUrl(selectedEvent.posterImage)}
                      alt={selectedEvent.title}
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent" />
                    <div className="absolute bottom-2 left-3 right-3 text-xs font-mono text-white font-semibold truncate">
                      {selectedEvent.title}
                    </div>
                  </div>

                  <div className="space-y-2 text-xs font-mono text-zinc-400 border-t border-zinc-850 pt-3">
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Artista:</span>
                      <span className="text-zinc-200">{selectedEvent.artist}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Fecha:</span>
                      <span className="text-zinc-200">{selectedEvent.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Recinto:</span>
                      <span className="text-zinc-200">{selectedEvent.venueName}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-500">Horario:</span>
                      <span className="text-zinc-200">{selectedEvent.time}</span>
                    </div>
                  </div>

                  {/* Honest Disclosure notice */}
                  <div className="p-3 bg-zinc-900/60 border border-zinc-800/80 rounded-sm text-[11px] text-zinc-400 leading-relaxed flex items-start gap-2">
                    <ShieldAlert className="w-4 h-4 text-zinc-400 shrink-0 mt-0.5" />
                    <span>
                      Este registro es una credencial digital gratuita oficial. No garantiza la disponibilidad en servidores privados de Roblox si se alcanza el aforo máximo de la instancia simultánea.
                    </span>
                  </div>
                </div>
              )}

              {/* Registration Form (7 cols) */}
              <div className="lg:col-span-7 bg-zinc-950 border border-zinc-800 p-6 sm:p-8 rounded-sm">
                <form onSubmit={handleRegister} className="space-y-6">
                  
                  {/* Event Selector */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                      1. Selecciona el Concierto
                    </label>
                    <select
                      value={selectedEventId}
                      onChange={(e) => setSelectedEventId(e.target.value)}
                      className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                    >
                      {events.map((evt) => (
                        <option key={evt.id} value={evt.id} disabled={evt.status === 'aforo_completo' || evt.status === 'finalizado'}>
                          {evt.title} ({evt.date}) - {evt.venueName} {evt.status === 'aforo_completo' ? '[AFORO COMPLETO]' : ''}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Roblox Username Input */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                      2. Nombre de Usuario de Roblox
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500 font-mono text-sm">
                        @
                      </div>
                      <input
                        type="text"
                        value={robloxUsername}
                        onChange={(e) => setRobloxUsername(e.target.value)}
                        placeholder="Ejemplo: Patunio_RBX"
                        className="w-full pl-8 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors font-mono"
                      />
                    </div>
                    <p className="text-[11px] text-zinc-500 font-mono mt-1">
                      Tu nombre exacto de Roblox para la credencial oficial de asistencia.
                    </p>
                  </div>

                  {/* Email for Confirmation */}
                  <div>
                    <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300 mb-2">
                      3. Correo Electrónico de Contacto
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                        <Mail className="w-4 h-4" />
                      </div>
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="tu.correo@ejemplo.com"
                        className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-700 rounded-sm text-sm text-white focus:outline-none focus:border-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Tier Choice */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="block text-xs font-mono uppercase tracking-wider text-zinc-300">
                        4. Modalidad de Acceso Digital
                      </label>
                      <span className="text-[10px] font-mono text-zinc-400">
                        Backstage reservado para Staff
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      {(['General', 'VIP Golden Pit', 'Backstage Pass'] as TicketTier[]).map((t) => {
                        const isBackstage = t === 'Backstage Pass';
                        const isSelected = tier === t;
                        const isStaffUser = robloxUsername.trim() && StorageService.isRobloxUserStaff(robloxUsername.trim());

                        return (
                          <button
                            key={t}
                            type="button"
                            onClick={() => setTier(t)}
                            className={`p-3 text-left border rounded-sm transition-all relative ${
                              isSelected
                                ? isBackstage
                                  ? 'bg-amber-400 text-black border-amber-300 shadow-md font-semibold'
                                  : 'bg-zinc-100 text-black border-white shadow-md font-semibold'
                                : 'bg-zinc-900 text-zinc-300 border-zinc-800 hover:border-zinc-700'
                            }`}
                          >
                            {isBackstage && (
                              <span className={`absolute top-2 right-2 px-1.5 py-0.5 text-[9px] font-mono uppercase rounded-xs ${
                                isSelected ? 'bg-black text-amber-300 font-bold' : 'bg-amber-950 text-amber-400 border border-amber-800'
                              }`}>
                                STAFF
                              </span>
                            )}
                            <div className="font-bold text-xs uppercase font-mono">{t}</div>
                            <div className={`text-[10px] mt-1 ${isSelected ? 'text-zinc-800' : 'text-zinc-400'}`}>
                              {t === 'General' && 'Acceso estándar a pista'}
                              {t === 'VIP Golden Pit' && 'Foso frontal y gestos'}
                              {t === 'Backstage Pass' && 'Solo Staff acreditado'}
                            </div>
                          </button>
                        );
                      })}
                    </div>

                    {/* Live indicator if Backstage is selected */}
                    {tier === 'Backstage Pass' && (
                      <div className="mt-3 p-2.5 rounded-sm text-xs font-mono border transition-all">
                        {robloxUsername.trim() ? (
                          StorageService.isRobloxUserStaff(robloxUsername.trim()) ? (
                            <div className="text-emerald-400 flex items-center gap-1.5 bg-emerald-950/40 border-emerald-800/80 p-2 rounded-sm">
                              <CheckCircle className="w-4 h-4 shrink-0" />
                              <span>Usuario @{robloxUsername.trim()} verificado como STAFF oficial autorizado.</span>
                            </div>
                          ) : (
                            <div className="text-amber-400 flex items-center gap-1.5 bg-amber-950/30 border-amber-800/60 p-2 rounded-sm">
                              <AlertCircle className="w-4 h-4 shrink-0" />
                              <span>@{robloxUsername.trim()} no figura como Staff oficial. Los administradores gestionan el Staff en el Panel Admin.</span>
                            </div>
                          )
                        ) : (
                          <div className="text-zinc-400 bg-zinc-900/60 border-zinc-800 p-2 rounded-sm">
                            Introduce tu usuario de Roblox arriba para validar tu acreditación como STAFF oficial.
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Terms acceptance checkbox */}
                  <div className="pt-2">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={acceptedTerms}
                        onChange={(e) => setAcceptedTerms(e.target.checked)}
                        className="mt-1 w-4 h-4 rounded bg-zinc-900 border-zinc-700 text-white focus:ring-0"
                      />
                      <span className="text-xs text-zinc-400 leading-relaxed">
                        Entiendo que este es un registro digital de Ducky Productions para eventos dentro de Roblox. No implica transacción monetaria ni garantiza reserva física de servidores privados en caso de saturación global de Roblox.
                      </span>
                    </label>
                  </div>

                  {/* Error display */}
                  {validationError && (
                    <div className="p-3 bg-rose-950/50 border border-rose-800 text-rose-300 text-xs flex items-center gap-2 rounded-sm">
                      <AlertCircle className="w-4 h-4 shrink-0" />
                      <span>{validationError}</span>
                    </div>
                  )}

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 text-xs sm:text-sm font-bold uppercase tracking-widest text-black bg-white hover:bg-zinc-200 transition-all rounded-sm flex items-center justify-center gap-2 active:scale-95 shadow-xl disabled:opacity-50"
                  >
                    <span>{isSubmitting ? 'Generando Pase...' : 'Confirmar Registro y Emitir Pase'}</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>

                </form>
              </div>

            </div>
          )}
        </div>
      )}

      {/* Mode 2: Search Existing Accesses */}
      {activeTab === 'search' && (
        <div className="max-w-3xl mx-auto">
          <form onSubmit={handleSearch} className="mb-8">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Ingresa tu usuario de Roblox (ej: AlexGamer_99) o código de pase (DP-2026-...)"
                  className="w-full px-4 py-3.5 bg-zinc-900 border border-zinc-700 rounded-sm text-sm text-white focus:outline-none focus:border-white font-mono"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3.5 bg-white hover:bg-zinc-200 text-black font-bold uppercase text-xs tracking-wider rounded-sm transition-colors flex items-center justify-center gap-2"
              >
                <Search className="w-4 h-4" />
                <span>Buscar</span>
              </button>
            </div>
            <p className="text-[11px] text-zinc-500 font-mono mt-2">
              Prueba buscar los pases de demostración: <span className="text-zinc-300">AlexGamer_99</span> o <span className="text-zinc-300">CyberValkyrie_RBX</span>
            </p>
          </form>

          {/* Results Display */}
          {hasSearched && (
            <div>
              {searchResults.length === 0 ? (
                <div className="p-8 text-center bg-zinc-950 border border-zinc-800 rounded-sm">
                  <p className="text-zinc-400 text-sm">
                    No se encontraron accesos registrados para "<span className="text-white font-mono">{searchQuery}</span>".
                  </p>
                  <button
                    onClick={() => {
                      setActiveTab('register');
                      setRobloxUsername(searchQuery);
                    }}
                    className="mt-4 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-black bg-white rounded-sm"
                  >
                    Registrar Ahora
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  <div className="text-xs font-mono uppercase text-zinc-400">
                    Se encontraron {searchResults.length} acceso(s) registrado(s):
                  </div>
                  {searchResults.map((pass) => (
                    <DigitalTicket key={pass.id} pass={pass} />
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}

    </section>
  );
};
