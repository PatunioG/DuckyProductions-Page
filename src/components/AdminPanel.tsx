import React, { useState, useEffect, useCallback } from 'react';
import { ConcertEvent, Venue, AccessRegistration, ContactMessage, EventStatus, StaffMember } from '../types';
import { StorageService } from '../services/storageService';
import { 
  Shield, Lock, Plus, Edit2, Trash2, Users, Calendar, 
  MapPin, Download, RefreshCw, X, ExternalLink, UserCheck, 
  Check, FileText, CheckCircle2, LogOut
} from 'lucide-react';

interface AdminPanelProps {
  isOpen: boolean;
  onClose: () => void;
  events: ConcertEvent[];
  venues: Venue[];
  onDataChanged: () => void;
}

export const AdminPanel: React.FC<AdminPanelProps> = ({
  isOpen,
  onClose,
  events,
  venues,
  onDataChanged
}) => {
  // Authentication State (with sessionStorage to avoid having to re-login every time the modal re-opens)
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      return sessionStorage.getItem('ducky_admin_authenticated') === 'true';
    }
    return false;
  });
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab in Admin
  const [activeTab, setActiveTab] = useState<'events' | 'venues' | 'staff' | 'registrations' | 'inquiries'>('events');

  // Reactive Data States inside Admin
  const [eventsList, setEventsList] = useState<ConcertEvent[]>(events);
  const [venuesList, setVenuesList] = useState<Venue[]>(venues);
  const [staffList, setStaffList] = useState<StaffMember[]>([]);
  const [registrationsList, setRegistrationsList] = useState<AccessRegistration[]>([]);
  const [inquiriesList, setInquiriesList] = useState<ContactMessage[]>([]);

  // Instant Feedback Toast Notification
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Event Form Modal State
  const [editingEvent, setEditingEvent] = useState<ConcertEvent | null>(null);
  const [isCreatingEvent, setIsCreatingEvent] = useState(false);
  const [previewPosterUrl, setPreviewPosterUrl] = useState('');
  const [eventVenueRobloxUrl, setEventVenueRobloxUrl] = useState('');

  // Venue Form Modal State
  const [editingVenue, setEditingVenue] = useState<Venue | null>(null);
  const [isCreatingVenue, setIsCreatingVenue] = useState(false);
  const [previewVenueImageUrl, setPreviewVenueImageUrl] = useState('');

  // New Staff Form State
  const [newStaffUser, setNewStaffUser] = useState('');
  const [newStaffRole, setNewStaffRole] = useState('Staff Oficial');
  const [newStaffNotes, setNewStaffNotes] = useState('');
  const [staffError, setStaffError] = useState('');

  // Search/Filter in Registrations
  const [regSearch, setRegSearch] = useState('');
  const [regEventFilter, setRegEventFilter] = useState('all');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 4000);
  };

  // Refresh reactive data from StorageService
  const refreshLocalData = useCallback(() => {
    setEventsList(StorageService.getEvents());
    setVenuesList(StorageService.getVenues());
    setStaffList(StorageService.getStaff());
    setRegistrationsList(StorageService.getRegistrations());
    setInquiriesList(StorageService.getInquiries());
  }, []);

  useEffect(() => {
    if (isOpen) {
      refreshLocalData();
    }
  }, [refreshLocalData, events, venues, isOpen]);

  if (!isOpen) return null;

  // Handle Login (Strict: no visible clues, no hints for unauthorized users)
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (passwordInput.trim() === 'ducky2026') {
      setIsAuthenticated(true);
      sessionStorage.setItem('ducky_admin_authenticated', 'true');
      setAuthError('');
      setPasswordInput('');
      refreshLocalData();
      showToast('Sesión de producción iniciada correctamente.');
    } else {
      setAuthError('Acceso denegado. Credencial de producción no válida.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    sessionStorage.removeItem('ducky_admin_authenticated');
    showToast('Sesión cerrada.');
  };

  // ==========================================
  // DIRECT DELETE & CLEAR HANDLERS (NO BLOCKED MODALS)
  // ==========================================

  // --- EVENTS HANDLERS ---
  const handleOpenCreateEvent = () => {
    setEditingEvent(null);
    setPreviewPosterUrl('/src/assets/images/hero_roblox_stadium_concert_1794244583969.jpg');
    setEventVenueRobloxUrl(venuesList[0]?.robloxGameUrl || 'https://www.roblox.com/games/ducky-productions');
    setIsCreatingEvent(true);
  };

  const handleOpenEditEvent = (evt: ConcertEvent) => {
    setEditingEvent(evt);
    setPreviewPosterUrl(evt.posterImage);
    setEventVenueRobloxUrl(evt.robloxExperienceUrl);
    setIsCreatingEvent(true);
  };

  const handleSaveEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedVenueId = formData.get('venueId') as string;
    const targetVenue = venuesList.find(v => v.id === selectedVenueId) || (venuesList[0] || {
      id: 'recinto-general',
      name: 'Escenario Principal'
    });

    const posterUrl = (formData.get('posterImage') as string)?.trim() || previewPosterUrl;
    const robloxGameUrl = (formData.get('robloxExperienceUrl') as string)?.trim() || 'https://www.roblox.com/games/ducky-productions';

    const eventData: ConcertEvent = {
      id: editingEvent ? editingEvent.id : `event-${Date.now()}`,
      title: (formData.get('title') as string).trim(),
      artist: (formData.get('artist') as string).trim() || 'Ducky Productions Live',
      date: (formData.get('date') as string).trim(),
      isoDate: (formData.get('isoDate') as string) || new Date().toISOString().split('T')[0],
      time: (formData.get('time') as string).trim(),
      venueId: targetVenue.id,
      venueName: targetVenue.name,
      description: (formData.get('description') as string).trim(),
      extendedBio: (formData.get('extendedBio') as string)?.trim() || (formData.get('description') as string).trim(),
      status: formData.get('status') as EventStatus,
      posterImage: posterUrl,
      robloxExperienceUrl: robloxGameUrl,
      robloxPlaceId: formData.get('robloxPlaceId') as string || '18492049100',
      maxCapacity: Number(formData.get('maxCapacity')) || 50000,
      registeredCount: editingEvent ? editingEvent.registeredCount : 0,
      ageRating: (formData.get('ageRating') as string) || 'Todas las edades',
      lightingTech: (formData.get('lightingTech') as string) || 'DMX Mesh LCS 4.0',
      soundTech: (formData.get('soundTech') as string) || 'Roblox 3D Spatial Audio Hi-Fi',
      genre: (formData.get('genre') as string) || 'Música en Vivo',
      featured: formData.get('featured') === 'true',
      vipTiers: ['General Admission', 'VIP Golden Pit', 'Backstage Pass']
    };

    StorageService.saveEvent(eventData);
    setEditingEvent(null);
    setIsCreatingEvent(false);
    refreshLocalData();
    onDataChanged();
    showToast(editingEvent ? `✓ Concierto "${eventData.title}" actualizado.` : `✓ Concierto "${eventData.title}" publicado en la cartelera.`);
  };

  const handleDeleteEvent = (id: string, title: string) => {
    StorageService.deleteEvent(id);
    refreshLocalData();
    onDataChanged();
    showToast(`✓ Concierto "${title}" eliminado.`);
  };

  const handleClearAllEvents = () => {
    StorageService.clearAllEvents();
    refreshLocalData();
    onDataChanged();
    showToast('✓ Cartelera vaciada (0 eventos). Ahora puedes publicar tus conciertos.');
  };

  // --- VENUES HANDLERS ---
  const handleOpenCreateVenue = () => {
    setEditingVenue(null);
    setPreviewVenueImageUrl('/src/assets/images/venue_ducky_stadium_1794244584727.jpg');
    setIsCreatingVenue(true);
  };

  const handleOpenEditVenue = (venue: Venue) => {
    setEditingVenue(venue);
    setPreviewVenueImageUrl(venue.image);
    setIsCreatingVenue(true);
  };

  const handleSaveVenue = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const venueId = editingVenue ? editingVenue.id : `venue-${Date.now()}`;
    
    const venueData: Venue = {
      id: venueId,
      name: (formData.get('name') as string).trim(),
      code: (formData.get('code') as string).trim() || `DP-${venueId.substring(0, 4).toUpperCase()}`,
      capacity: Number(formData.get('capacity')) || 25000,
      status: (formData.get('status') as any) || 'operativo',
      tagline: (formData.get('tagline') as string).trim() || 'Recinto oficial Ducky Productions',
      description: (formData.get('description') as string).trim(),
      robloxGameUrl: (formData.get('robloxGameUrl') as string)?.trim() || 'https://www.roblox.com/games/ducky-productions',
      image: (formData.get('image') as string)?.trim() || previewVenueImageUrl,
      specs: {
        stageWidth: (formData.get('stageWidth') as string) || 'Escenario Modular 80m',
        soundSystem: (formData.get('soundSystem') as string) || 'Roblox 3D Spatial Audio v4',
        lighting: (formData.get('lighting') as string) || 'Torres truss e iluminación volumétrica',
        avatarLOD: (formData.get('avatarLOD') as string) || 'Optimizado para servidores de alta concurrencia'
      },
      features: [
        'Renderizado acústico en Roblox Studio',
        'Zonas VIP y foso interactivo',
        'Efectos audiorreactivos dinámicos'
      ]
    };

    StorageService.saveVenue(venueData);
    setEditingVenue(null);
    setIsCreatingVenue(false);
    refreshLocalData();
    onDataChanged();
    showToast(editingVenue ? `✓ Recinto "${venueData.name}" modificado.` : `✓ Recinto "${venueData.name}" registrado con éxito.`);
  };

  const handleDeleteVenue = (id: string, name: string) => {
    StorageService.deleteVenue(id);
    refreshLocalData();
    onDataChanged();
    showToast(`✓ Recinto "${name}" eliminado.`);
  };

  const handleClearAllVenues = () => {
    StorageService.clearAllVenues();
    refreshLocalData();
    onDataChanged();
    showToast('✓ Catálogo de recintos vaciado (0 recintos).');
  };

  // --- STAFF HANDLERS ---
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    setStaffError('');
    const cleanUser = newStaffUser.trim().replace(/^@/, '');
    if (!cleanUser) {
      setStaffError('Introduce un nombre de usuario de Roblox válido.');
      return;
    }

    if (StorageService.isRobloxUserStaff(cleanUser)) {
      setStaffError(`El usuario @${cleanUser} ya está acreditado en el equipo Staff.`);
      return;
    }

    StorageService.addStaff({
      robloxUsername: cleanUser,
      role: newStaffRole.trim() || 'Staff Oficial',
      notes: newStaffNotes.trim()
    });

    setNewStaffUser('');
    setNewStaffNotes('');
    refreshLocalData();
    onDataChanged();
    showToast(`✓ Usuario @${cleanUser} acreditado como Staff oficial.`);
  };

  const handleRemoveStaff = (id: string, username: string) => {
    StorageService.removeStaff(id);
    refreshLocalData();
    onDataChanged();
    showToast(`✓ Usuario @${username} removido del Staff.`);
  };

  const handleClearAllStaff = () => {
    StorageService.clearAllStaff();
    refreshLocalData();
    onDataChanged();
    showToast('✓ Todo el Staff ha sido vaciado (0 miembros).');
  };

  // --- REGISTRATIONS HANDLERS ---
  const handleDeleteRegistration = (id: string, username: string) => {
    StorageService.deleteRegistration(id);
    refreshLocalData();
    onDataChanged();
    showToast(`✓ Pase ${id} de @${username} cancelado y eliminado.`);
  };

  const handleClearAllRegistrations = () => {
    StorageService.clearAllRegistrations();
    refreshLocalData();
    onDataChanged();
    showToast('✓ Se han eliminado todos los registros de asistentes (0 pases).');
  };

  const handleExportCSV = () => {
    const headers = ['ID', 'Evento', 'Fecha', 'Usuario Roblox', 'Email', 'Categoria', 'Zona', 'Estado', 'Registro'];
    const rows = registrationsList.map(r => [
      r.id,
      `"${r.eventTitle.replace(/"/g, '""')}"`,
      r.eventDate,
      r.robloxUsername,
      r.email,
      r.tier,
      r.seatZone,
      r.status,
      r.registeredAt
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `ducky_registros_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast('Archivo CSV descargado con éxito.');
  };

  // --- MASTER ACTION: INICIAR DESDE CERO (BORRAR ABSOLUTAMENTE TODO) ---
  const handleMasterClearAllData = () => {
    StorageService.clearAllData();
    refreshLocalData();
    onDataChanged();
    showToast('💥 BASE DE DATOS LIMPIA A 0: Conciertos, recintos, staff y asistentes vaciados.');
  };

  const handleResetDemoData = () => {
    StorageService.resetDefaults();
    refreshLocalData();
    onDataChanged();
    showToast('✓ Datos de demostración de Ducky Productions restaurados.');
  };

  // Filtered registrations
  const filteredRegistrations = registrationsList.filter(r => {
    const matchesSearch = 
      r.robloxUsername.toLowerCase().includes(regSearch.toLowerCase()) || 
      r.id.toLowerCase().includes(regSearch.toLowerCase()) ||
      r.email.toLowerCase().includes(regSearch.toLowerCase());
    const matchesEvent = regEventFilter === 'all' || r.eventId === regEventFilter;
    return matchesSearch && matchesEvent;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/90 backdrop-blur-md">
      <div className="relative w-full max-w-6xl bg-[#09090d] border border-zinc-800 rounded-sm shadow-2xl flex flex-col h-[94vh] overflow-hidden text-zinc-100">
        
        {/* Floating Instant Toast Notification */}
        {toastMessage && (
          <div className="absolute top-16 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-emerald-500 text-black font-mono font-bold text-xs rounded shadow-2xl flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
            <CheckCircle2 className="w-4 h-4 text-black shrink-0" />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Top Header */}
        <div className="px-6 py-4 bg-zinc-950 border-b border-zinc-800 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-sm bg-white text-black font-display font-black text-xs flex items-center justify-center tracking-tighter">
              DP
            </div>
            <div>
              <span className="font-display font-black tracking-widest text-xs uppercase block text-white">
                DUCKY PRODUCTIONS · PANEL DE ADMINISTRACIÓN
              </span>
              <span className="font-mono text-[10px] text-zinc-400">
                SISTEMA PRIVADO DE PRODUCCIÓN Y GESTIÓN EN ROBLOX
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isAuthenticated && (
              <>
                <button
                  type="button"
                  onClick={handleMasterClearAllData}
                  className="px-3.5 py-1.5 text-xs font-mono font-bold text-rose-300 hover:text-white bg-rose-950/70 hover:bg-rose-900 border border-rose-800 rounded-sm flex items-center gap-1.5 transition-colors shadow-sm"
                  title="Elimina todos los eventos, recintos, staff y pases para publicar paso a paso desde cero"
                >
                  <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                  <span>Vaciar Todo (0 Datos)</span>
                </button>

                <button
                  type="button"
                  onClick={handleResetDemoData}
                  className="px-3 py-1.5 text-[11px] font-mono text-zinc-400 hover:text-white bg-zinc-900 border border-zinc-800 rounded-sm flex items-center gap-1.5 transition-colors hidden sm:flex"
                  title="Restaurar conciertos y recintos de ejemplo oficiales"
                >
                  <RefreshCw className="w-3 h-3" />
                  <span>Cargar Demo</span>
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="p-1.5 text-zinc-400 hover:text-rose-400 hover:bg-zinc-900 rounded-sm transition-colors"
                  title="Cerrar sesión de admin"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            )}
            <button
              onClick={onClose}
              className="p-1.5 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-sm ml-2"
              aria-label="Cerrar panel admin"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Content Area */}
        {!isAuthenticated ? (
          /* Login Screen - STRICT, WITHOUT ANY PASSWORDS, HINTS OR CLUES VISIBLE */
          <div className="flex-1 flex items-center justify-center p-6">
            <div className="w-full max-w-sm bg-zinc-950 border border-zinc-800 p-8 rounded-sm text-center shadow-2xl">
              <div className="w-12 h-12 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center mx-auto mb-4 text-white">
                <Lock className="w-5 h-5 text-zinc-300" />
              </div>
              
              <h3 className="text-lg font-display font-bold uppercase text-white mb-1">
                Acceso a Producción DP
              </h3>
              <p className="text-xs text-zinc-400 mb-6">
                Área reservada para el equipo de dirección y producción.
              </p>

              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <input
                    type="password"
                    value={passwordInput}
                    onChange={(e) => setPasswordInput(e.target.value)}
                    placeholder="Contraseña de producción"
                    className="w-full px-4 py-3 bg-zinc-900 border border-zinc-700 rounded-sm text-sm text-white focus:outline-none focus:border-white font-mono text-center tracking-widest"
                    autoFocus
                  />
                </div>

                {authError && (
                  <div className="text-xs text-rose-400 bg-rose-950/40 p-2.5 border border-rose-900 rounded-sm font-mono">
                    {authError}
                  </div>
                )}

                <button
                  type="submit"
                  className="w-full py-3 bg-white hover:bg-zinc-200 text-black font-bold uppercase text-xs tracking-wider rounded-sm transition-colors"
                >
                  Acceder al Panel
                </button>
              </form>
            </div>
          </div>
        ) : (
          /* Authenticated Dashboard */
          <div className="flex-1 flex flex-col overflow-hidden">
            
            {/* Dashboard Sub-nav Tabs */}
            <div className="px-6 py-2.5 bg-zinc-950 border-b border-zinc-850 flex items-center justify-between gap-4 overflow-x-auto shrink-0">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setActiveTab('events')}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'events' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Calendar className="w-3.5 h-3.5" />
                  <span>Cartelera ({eventsList.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('venues')}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'venues' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5" />
                  <span>Recintos ({venuesList.length})</span>
                </button>

                {/* Staff Oficial Tab */}
                <button
                  type="button"
                  onClick={() => setActiveTab('staff')}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'staff' ? 'bg-zinc-800 text-amber-300 font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <UserCheck className="w-3.5 h-3.5 text-amber-400" />
                  <span>Staff Oficial ({staffList.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('registrations')}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'registrations' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <Users className="w-3.5 h-3.5" />
                  <span>Asistentes ({registrationsList.length})</span>
                </button>

                <button
                  type="button"
                  onClick={() => setActiveTab('inquiries')}
                  className={`px-3.5 py-2 text-xs font-semibold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-2 whitespace-nowrap ${
                    activeTab === 'inquiries' ? 'bg-zinc-800 text-white font-bold' : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  <FileText className="w-3.5 h-3.5" />
                  <span>Mensajes ({inquiriesList.length})</span>
                </button>
              </div>

              {/* Tab specific top actions */}
              <div className="flex items-center gap-2 shrink-0">
                {activeTab === 'events' && (
                  <>
                    {eventsList.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearAllEvents}
                        className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-800 text-xs font-mono rounded-sm transition-colors"
                        title="Borra todos los conciertos"
                      >
                        Vaciar Cartelera ({eventsList.length})
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleOpenCreateEvent}
                      className="px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Crear Concierto</span>
                    </button>
                  </>
                )}

                {activeTab === 'venues' && (
                  <>
                    {venuesList.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearAllVenues}
                        className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-800 text-xs font-mono rounded-sm transition-colors"
                        title="Borra todos los recintos"
                      >
                        Vaciar Recintos ({venuesList.length})
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleOpenCreateVenue}
                      className="px-4 py-2 bg-white hover:bg-zinc-200 text-black text-xs font-bold uppercase tracking-wider rounded-sm transition-colors flex items-center gap-1.5 shadow"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Crear Recinto</span>
                    </button>
                  </>
                )}

                {activeTab === 'staff' && staffList.length > 0 && (
                  <button
                    type="button"
                    onClick={handleClearAllStaff}
                    className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-800 text-xs font-mono rounded-sm transition-colors"
                    title="Remueve a todos los miembros de staff"
                  >
                    Vaciar Todo el Staff ({staffList.length})
                  </button>
                )}

                {activeTab === 'registrations' && (
                  <>
                    {registrationsList.length > 0 && (
                      <button
                        type="button"
                        onClick={handleClearAllRegistrations}
                        className="px-3 py-1.5 bg-rose-950/60 hover:bg-rose-900 text-rose-300 hover:text-white border border-rose-800 text-xs font-mono rounded-sm transition-colors"
                        title="Borra todos los pases y registros"
                      >
                        Vaciar Asistentes ({registrationsList.length})
                      </button>
                    )}
                    <button
                      type="button"
                      onClick={handleExportCSV}
                      className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-200 text-xs font-mono rounded-sm flex items-center gap-1.5"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Exportar CSV</span>
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Tab 1: Events Manager */}
            {activeTab === 'events' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {eventsList.length === 0 ? (
                  <div className="p-12 text-center bg-zinc-950 border border-zinc-800 rounded-sm">
                    <Calendar className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                    <h4 className="text-base font-display font-bold uppercase text-white">
                      No Hay Eventos en la Cartelera (0 Eventos)
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto leading-relaxed">
                      La cartelera está completamente limpia. Ya puedes publicar tus propios conciertos y festivales paso a paso con el botón de abajo.
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenCreateEvent}
                      className="mt-5 px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-zinc-200 transition-colors shadow"
                    >
                      Publicar Primer Concierto
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 gap-4">
                    {eventsList.map((evt) => (
                      <div
                        key={evt.id}
                        className="p-5 bg-zinc-950 border border-zinc-800 rounded-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:border-zinc-700 transition-colors"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-20 h-16 bg-zinc-900 border border-zinc-800 rounded-sm overflow-hidden shrink-0">
                            <img 
                              src={evt.posterImage} 
                              alt={evt.title} 
                              className="w-full h-full object-cover" 
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-xs font-mono">
                              <span className="font-bold text-white uppercase">{evt.title}</span>
                              <span className="text-zinc-600">·</span>
                              <span className="text-zinc-400">{evt.artist}</span>
                            </div>
                            <div className="text-xs text-zinc-400 font-mono mt-1 flex flex-wrap gap-x-3 gap-y-1">
                              <span>📅 {evt.date}</span>
                              <span>⏰ {evt.time}</span>
                              <span>📍 {evt.venueName}</span>
                              <span className="text-zinc-300">Aforo: {evt.registeredCount.toLocaleString()} / {evt.maxCapacity.toLocaleString()}</span>
                            </div>
                            <div className="text-[11px] font-mono text-zinc-400 mt-1 flex items-center gap-1.5">
                              <ExternalLink className="w-3 h-3 text-emerald-400 shrink-0" />
                              <a href={evt.robloxExperienceUrl} target="_blank" rel="noreferrer" className="text-emerald-400 underline hover:text-emerald-300 truncate max-w-md">
                                {evt.robloxExperienceUrl}
                              </a>
                            </div>
                            <div className="mt-2 flex items-center gap-2">
                              <span className="px-2 py-0.5 bg-zinc-900 border border-zinc-800 text-[10px] font-mono text-zinc-300 rounded-sm uppercase">
                                Estado: {evt.status}
                              </span>
                              {evt.featured && (
                                <span className="px-2 py-0.5 bg-amber-950 border border-amber-800 text-[10px] font-mono text-amber-300 rounded-sm uppercase">
                                  Destacado en Portada
                                </span>
                              )}
                            </div>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 self-end md:self-auto shrink-0">
                          <button
                            type="button"
                            onClick={() => handleOpenEditEvent(evt)}
                            className="px-3.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono rounded-sm flex items-center gap-1.5 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Editar</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteEvent(evt.id, evt.title)}
                            className="px-3.5 py-1.5 bg-rose-950 hover:bg-rose-900 text-rose-200 hover:text-white border border-rose-800 text-xs font-mono font-bold rounded-sm flex items-center gap-1.5 transition-colors shadow-sm"
                            title="Eliminar este concierto inmediatamente"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                            <span>Eliminar</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 2: Venues Manager */}
            {activeTab === 'venues' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {venuesList.length === 0 ? (
                  <div className="p-12 text-center bg-zinc-950 border border-zinc-800 rounded-sm">
                    <MapPin className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                    <h4 className="text-base font-display font-bold uppercase text-white">
                      No Hay Recintos en el Catálogo (0 Recintos)
                    </h4>
                    <p className="text-xs text-zinc-400 mt-1 max-w-md mx-auto leading-relaxed">
                      El catálogo está vacío. Puedes registrar tus propios estadios oficiales con sus capacidades y enlace directo al juego de Roblox.
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenCreateVenue}
                      className="mt-5 px-6 py-2.5 bg-white text-black text-xs font-bold uppercase tracking-wider rounded-sm hover:bg-zinc-200 transition-colors shadow"
                    >
                      Registrar Primer Recinto
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {venuesList.map((venue) => (
                      <div
                        key={venue.id}
                        className="p-5 bg-zinc-950 border border-zinc-800 rounded-sm flex flex-col justify-between hover:border-zinc-700 transition-colors"
                      >
                        <div>
                          <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2">
                            <span>{venue.code}</span>
                            <span className={venue.status === 'operativo' ? 'text-emerald-400' : 'text-amber-400'}>
                              {venue.status.toUpperCase()}
                            </span>
                          </div>
                          <h4 className="text-lg font-display font-bold uppercase text-white mb-1">
                            {venue.name}
                          </h4>
                          <p className="text-xs text-zinc-400 mb-3">{venue.tagline}</p>
                          <div className="text-xs font-mono text-zinc-300 bg-zinc-900/60 p-3 rounded-sm border border-zinc-850 space-y-1 mb-4">
                            <div><span className="text-zinc-500">Capacidad:</span> {venue.capacity.toLocaleString()} avatares</div>
                            <div><span className="text-zinc-500">Escenario:</span> {venue.specs?.stageWidth || 'Estándar'}</div>
                            <div>
                              <span className="text-zinc-500">Enlace Roblox:</span>{' '}
                              <span className="text-emerald-400 truncate block">{venue.robloxGameUrl || 'No configurado'}</span>
                            </div>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-2 pt-2 border-t border-zinc-850">
                          <button
                            type="button"
                            onClick={() => handleOpenEditVenue(venue)}
                            className="py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-200 border border-zinc-700 text-xs font-mono rounded-sm flex items-center justify-center gap-1.5 transition-colors"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                            <span>Modificar</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteVenue(venue.id, venue.name)}
                            className="py-2 bg-rose-950 hover:bg-rose-900 text-rose-200 hover:text-white border border-rose-800 text-xs font-mono font-bold rounded-sm flex items-center justify-center gap-1.5 transition-colors shadow-sm"
                            title="Eliminar este recinto inmediatamente"
                          >
                            <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                            <span>Eliminar</span>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: STAFF OFICIAL */}
            {activeTab === 'staff' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                
                {/* Description Banner */}
                <div className="p-4 bg-zinc-950 border border-amber-900/50 rounded-sm flex items-start gap-3">
                  <Shield className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                  <div className="text-xs">
                    <h4 className="font-bold text-amber-300 uppercase font-mono">
                      Acreditación de Staff Oficial (Requisito para Backstage Pass)
                    </h4>
                    <p className="text-zinc-300 mt-1 leading-relaxed">
                      Únicamente los usuarios de Roblox acreditados en esta lista pueden solicitar y obtener el <span className="text-amber-400 font-semibold">Backstage Pass</span> con código QR oficial. Los usuarios no autorizados serán rechazados.
                    </p>
                  </div>
                </div>

                {/* Add New Staff Form */}
                <div className="p-5 bg-zinc-950 border border-zinc-800 rounded-sm">
                  <h4 className="text-xs font-mono uppercase tracking-wider text-white mb-3 flex items-center gap-2">
                    <Plus className="w-4 h-4 text-amber-400" />
                    <span>Acreditar Nuevo Miembro de Staff</span>
                  </h4>
                  <form onSubmit={handleAddStaff} className="grid grid-cols-1 sm:grid-cols-12 gap-3 text-xs font-mono">
                    <div className="sm:col-span-4">
                      <label className="block text-zinc-400 mb-1">Usuario de Roblox (sin @) *</label>
                      <input
                        type="text"
                        value={newStaffUser}
                        onChange={(e) => setNewStaffUser(e.target.value)}
                        placeholder="Ej: patuniog"
                        className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="sm:col-span-4">
                      <label className="block text-zinc-400 mb-1">Cargo / Especialidad</label>
                      <input
                        type="text"
                        value={newStaffRole}
                        onChange={(e) => setNewStaffRole(e.target.value)}
                        placeholder="Ej: Director Técnico / Mocap"
                        className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label className="block text-zinc-400 mb-1">Notas / Permiso</label>
                      <input
                        type="text"
                        value={newStaffNotes}
                        onChange={(e) => setNewStaffNotes(e.target.value)}
                        placeholder="Acceso Escenario / Cabina"
                        className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-sm text-white focus:outline-none focus:border-amber-400"
                      />
                    </div>
                    <div className="sm:col-span-1 flex items-end">
                      <button
                        type="submit"
                        className="w-full py-2.5 bg-amber-400 hover:bg-amber-300 text-black font-bold uppercase rounded-sm flex items-center justify-center transition-colors shadow"
                        title="Añadir miembro staff"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                  {staffError && (
                    <div className="mt-2 text-rose-400 text-xs font-mono">
                      {staffError}
                    </div>
                  )}
                </div>

                {/* Staff List Table */}
                {staffList.length === 0 ? (
                  <div className="p-8 text-center bg-zinc-950 border border-zinc-800 rounded-sm text-zinc-400 text-xs">
                    No hay miembros de staff registrados (0 miembros). Añade tu usuario de Roblox arriba para poder solicitar Backstage Passes.
                  </div>
                ) : (
                  <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-hidden">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-3">Usuario Roblox</th>
                          <th className="p-3">Cargo / Rol</th>
                          <th className="p-3">Fecha Acreditación</th>
                          <th className="p-3">Notas</th>
                          <th className="p-3 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-850">
                        {staffList.map((st) => (
                          <tr key={st.id} className="hover:bg-zinc-900/40">
                            <td className="p-3 font-bold text-white flex items-center gap-2">
                              <span className="w-6 h-6 rounded-full bg-amber-400/20 text-amber-300 border border-amber-400/40 flex items-center justify-center text-[10px]">
                                {st.robloxUsername.substring(0, 2).toUpperCase()}
                              </span>
                              <span>@{st.robloxUsername}</span>
                            </td>
                            <td className="p-3 text-amber-300">{st.role}</td>
                            <td className="p-3 text-zinc-500">{st.addedAt}</td>
                            <td className="p-3 text-zinc-400">{st.notes || '-'}</td>
                            <td className="p-3 text-right">
                              <button
                                type="button"
                                onClick={() => handleRemoveStaff(st.id, st.robloxUsername)}
                                className="px-3 py-1.5 text-xs font-bold text-rose-300 hover:text-white bg-rose-950/70 hover:bg-rose-900 border border-rose-800 rounded-sm transition-colors"
                                title="Eliminar miembro de Staff inmediatamente"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                                <span>Eliminar</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>
            )}

            {/* Tab 4: Registrations / Attendees */}
            {activeTab === 'registrations' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {/* Search & Filter Strip */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <input
                    type="text"
                    value={regSearch}
                    onChange={(e) => setRegSearch(e.target.value)}
                    placeholder="Filtrar por usuario de Roblox, ID de pase o correo..."
                    className="flex-1 px-4 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-xs text-white focus:outline-none font-mono"
                  />
                  <select
                    value={regEventFilter}
                    onChange={(e) => setRegEventFilter(e.target.value)}
                    className="px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-xs text-white focus:outline-none font-mono"
                  >
                    <option value="all">Todos los eventos</option>
                    {eventsList.map((evt) => (
                      <option key={evt.id} value={evt.id}>{evt.title}</option>
                    ))}
                  </select>
                </div>

                {/* Table of Registrations */}
                {filteredRegistrations.length === 0 ? (
                  <div className="p-8 text-center bg-zinc-950 border border-zinc-800 rounded-sm text-zinc-400 text-xs">
                    No hay registros de asistentes en la base de datos (0 pases).
                  </div>
                ) : (
                  <div className="bg-zinc-950 border border-zinc-800 rounded-sm overflow-x-auto">
                    <table className="w-full text-left text-xs font-mono">
                      <thead className="bg-zinc-900/80 text-zinc-400 border-b border-zinc-800 uppercase tracking-wider text-[10px]">
                        <tr>
                          <th className="p-3">ID Pase</th>
                          <th className="p-3">Usuario Roblox</th>
                          <th className="p-3">Concierto</th>
                          <th className="p-3">Categoría</th>
                          <th className="p-3">Emisión</th>
                          <th className="p-3">Estado</th>
                          <th className="p-3 text-right">Acción</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-zinc-850">
                        {filteredRegistrations.map((reg) => (
                          <tr key={reg.id} className="hover:bg-zinc-900/40">
                            <td className="p-3 font-bold text-white">{reg.id}</td>
                            <td className="p-3 text-zinc-200">@{reg.robloxUsername}</td>
                            <td className="p-3 text-zinc-300 max-w-[200px] truncate">{reg.eventTitle}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-sm text-[10px] ${
                                reg.tier === 'Backstage Pass'
                                  ? 'bg-amber-400 text-black font-bold'
                                  : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
                              }`}>
                                {reg.tier}
                              </span>
                            </td>
                            <td className="p-3 text-zinc-500 text-[11px]">{reg.registeredAt}</td>
                            <td className="p-3">
                              <span className={`px-2 py-0.5 rounded-sm text-[10px] uppercase font-semibold ${
                                reg.status === 'valido' ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                              }`}>
                                {reg.status}
                              </span>
                            </td>
                            <td className="p-3 text-right space-x-2">
                              <button
                                type="button"
                                onClick={() => {
                                  const nextStatus = reg.status === 'valido' ? 'utilizado' : 'valido';
                                  StorageService.updateRegistrationStatus(reg.id, nextStatus);
                                  refreshLocalData();
                                  onDataChanged();
                                  showToast(`Pase ${reg.id} marcado como "${nextStatus}".`);
                                }}
                                className="px-2 py-1 text-[10px] bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-zinc-300 rounded-sm"
                              >
                                {reg.status === 'valido' ? 'Marcar Usado' : 'Validar'}
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteRegistration(reg.id, reg.robloxUsername)}
                                className="px-2.5 py-1 text-xs font-bold bg-rose-950 hover:bg-rose-900 text-rose-200 hover:text-white border border-rose-800 rounded-sm transition-colors"
                                title="Eliminar pase"
                              >
                                <Trash2 className="w-3.5 h-3.5 inline mr-1" />
                                <span>Eliminar</span>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            )}

            {/* Tab 5: Inquiries / Artist Collaborations */}
            {activeTab === 'inquiries' && (
              <div className="flex-1 overflow-y-auto p-6 space-y-4">
                {inquiriesList.length === 0 ? (
                  <div className="p-8 text-center bg-zinc-950 border border-zinc-800 rounded-sm text-zinc-400 text-xs">
                    No hay solicitudes o mensajes nuevos todavía (0 mensajes).
                  </div>
                ) : (
                  <div className="space-y-3">
                    {inquiriesList.map((inq) => (
                      <div key={inq.id} className="p-5 bg-zinc-950 border border-zinc-800 rounded-sm space-y-2">
                        <div className="flex items-center justify-between text-xs font-mono">
                          <span className="px-2 py-0.5 bg-zinc-900 text-zinc-300 border border-zinc-800 uppercase rounded-sm">
                            {inq.type}
                          </span>
                          <span className="text-zinc-500">{new Date(inq.createdAt).toLocaleString()}</span>
                        </div>
                        <h4 className="text-sm font-bold text-white font-display uppercase">
                          {inq.subject}
                        </h4>
                        <div className="text-xs font-mono text-zinc-400">
                          De: <span className="text-white font-semibold">{inq.name}</span> (@{inq.robloxUsername}) · {inq.email}
                          {inq.portfolioUrl && (
                            <span className="ml-2 text-zinc-300 underline">
                              <a href={inq.portfolioUrl} target="_blank" rel="noreferrer">Ver Portfolio</a>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-zinc-300 bg-zinc-900/50 p-3 rounded-sm border border-zinc-850 leading-relaxed">
                          {inq.message}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>
        )}

        {/* Modal for Creating / Publishing / Editing Event */}
        {isCreatingEvent && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-700 rounded-sm p-6 overflow-y-auto max-h-[92vh] shadow-2xl">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-display font-bold uppercase text-white">
                  {editingEvent ? 'Editar Concierto' : 'Publicar y Crear Nuevo Evento'}
                </h3>
                <button 
                  type="button"
                  onClick={() => setIsCreatingEvent(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveEvent} className="space-y-4 text-xs font-mono">
                
                {/* 1. Nombre del Evento */}
                <div>
                  <label className="block text-zinc-300 font-bold mb-1 uppercase">
                    1. Nombre del Evento *
                  </label>
                  <input
                    type="text"
                    name="title"
                    defaultValue={editingEvent?.title || ''}
                    required
                    placeholder="Ej: KORBLOX RECKONING LIVE"
                    className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-sm text-white focus:outline-none focus:border-white text-sm"
                  />
                </div>

                {/* Artista y Género */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Artista(s) o Banda Principal</label>
                    <input
                      type="text"
                      name="artist"
                      defaultValue={editingEvent?.artist || ''}
                      required
                      placeholder="Ej: Korblox Symphony & Guests"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Género Musical</label>
                    <input
                      type="text"
                      name="genre"
                      defaultValue={editingEvent?.genre || 'Electronic Live Show'}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                    />
                  </div>
                </div>

                {/* 2. Fecha y Hora del Evento */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-300 font-bold mb-1 uppercase">
                      2. Fecha del Evento *
                    </label>
                    <input
                      type="text"
                      name="date"
                      defaultValue={editingEvent?.date || '20 FEB 2027'}
                      required
                      placeholder="Ej: 20 FEB 2027"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-300 font-bold mb-1 uppercase">
                      Hora del Evento *
                    </label>
                    <input
                      type="text"
                      name="time"
                      defaultValue={editingEvent?.time || '21:00 CET / 15:00 EST'}
                      required
                      placeholder="Ej: 21:00 CET / 15:00 EST"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                    />
                  </div>
                </div>

                {/* 3. Recinto con enlace directo al juego de Roblox */}
                <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-sm space-y-3">
                  <div className="text-zinc-200 font-bold uppercase flex items-center justify-between">
                    <span>3. Recinto & Enlace Directo al Juego de Roblox *</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-zinc-400 mb-1">Recinto</label>
                      <select
                        name="venueId"
                        defaultValue={editingEvent?.venueId || (venuesList[0]?.id || '')}
                        onChange={(e) => {
                          const v = venuesList.find(item => item.id === e.target.value);
                          if (v && v.robloxGameUrl) {
                            setEventVenueRobloxUrl(v.robloxGameUrl);
                          }
                        }}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                      >
                        {venuesList.length === 0 ? (
                          <option value="recinto-general">Recinto Virtual General</option>
                        ) : (
                          venuesList.map(v => (
                            <option key={v.id} value={v.id}>{v.name}</option>
                          ))
                        )}
                      </select>
                    </div>

                    <div>
                      <label className="block text-zinc-400 mb-1">Aforo Máximo de Avatares</label>
                      <input
                        type="number"
                        name="maxCapacity"
                        defaultValue={editingEvent?.maxCapacity || 50000}
                        className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">
                      Enlace Directo al Juego de Roblox (Experiencia) *
                    </label>
                    <input
                      type="url"
                      name="robloxExperienceUrl"
                      value={eventVenueRobloxUrl}
                      onChange={(e) => setEventVenueRobloxUrl(e.target.value)}
                      required
                      placeholder="https://www.roblox.com/games/..."
                      className="w-full px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-sm text-emerald-400 font-mono"
                    />
                    <p className="text-[10px] text-zinc-500 mt-1">
                      Este enlace conducirá directamente a los usuarios al juego oficial de Roblox del concierto.
                    </p>
                  </div>
                </div>

                {/* 4. Descripción del Evento */}
                <div>
                  <label className="block text-zinc-300 font-bold mb-1 uppercase">
                    4. Descripción del Evento *
                  </label>
                  <textarea
                    name="description"
                    rows={2}
                    defaultValue={editingEvent?.description || ''}
                    required
                    placeholder="Describe el concepto del concierto, artistas invitados y escenografía..."
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white resize-none"
                  />
                </div>

                {/* 5. Portada del Evento con URL */}
                <div className="p-3 bg-zinc-900/60 border border-zinc-800 rounded-sm space-y-2">
                  <label className="block text-zinc-300 font-bold uppercase">
                    5. Portada del Evento (URL de la Imagen) *
                  </label>
                  
                  <div className="flex gap-3 items-center">
                    <input
                      type="text"
                      name="posterImage"
                      value={previewPosterUrl}
                      onChange={(e) => setPreviewPosterUrl(e.target.value)}
                      required
                      placeholder="https://... o ruta de imagen"
                      className="flex-1 px-3 py-2 bg-zinc-950 border border-zinc-700 rounded-sm text-white font-mono"
                    />
                    {previewPosterUrl && (
                      <div className="w-14 h-10 bg-zinc-900 border border-zinc-700 rounded-sm overflow-hidden shrink-0">
                        <img 
                          src={previewPosterUrl} 
                          alt="Vista previa" 
                          className="w-full h-full object-cover" 
                          onError={(e) => {
                            (e.target as HTMLElement).style.display = 'none';
                          }}
                        />
                      </div>
                    )}
                  </div>

                  <div className="flex flex-wrap gap-2 pt-1 text-[10px]">
                    <span className="text-zinc-500">Presets disponibles:</span>
                    <button
                      type="button"
                      onClick={() => setPreviewPosterUrl('/src/assets/images/hero_roblox_stadium_concert_1794244583969.jpg')}
                      className="text-zinc-400 hover:text-white underline"
                    >
                      Estadio Iluminado
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewPosterUrl('/src/assets/images/venue_ducky_stadium_1794244584727.jpg')}
                      className="text-zinc-400 hover:text-white underline"
                    >
                      Ducky Stadium Pyro
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewPosterUrl('/src/assets/images/venue_ducky_nexus_1794244585585.jpg')}
                      className="text-zinc-400 hover:text-white underline"
                    >
                      Ducky Nexus Cyber
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewPosterUrl('/src/assets/images/venue_ducky_dome_1794244586856.jpg')}
                      className="text-zinc-400 hover:text-white underline"
                    >
                      Ducky Dome 360
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewPosterUrl('/src/assets/images/concert_neon_night_1794244586284.jpg')}
                      className="text-zinc-400 hover:text-white underline"
                    >
                      Guitar Solo Festival
                    </button>
                  </div>
                </div>

                {/* Estado y Destacado */}
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Estado del Concierto</label>
                    <select
                      name="status"
                      defaultValue={editingEvent?.status || 'entradas_disponibles'}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                    >
                      <option value="entradas_disponibles">Entradas Disponibles</option>
                      <option value="ultimos_accesos">Últimos Accesos</option>
                      <option value="aforo_completo">Aforo Completo</option>
                      <option value="en_directo">En Directo (Live)</option>
                      <option value="proximamente">Próximamente</option>
                      <option value="finalizado">Finalizado</option>
                    </select>
                  </div>

                  <div className="flex items-center gap-2 pt-6">
                    <input
                      type="checkbox"
                      id="featured"
                      name="featured"
                      value="true"
                      defaultChecked={editingEvent?.featured || false}
                      className="w-4 h-4 rounded bg-zinc-900 border-zinc-700"
                    />
                    <label htmlFor="featured" className="text-zinc-300">
                      Destacar en Hero Portada
                    </label>
                  </div>
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatingEvent(false)}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-white hover:bg-zinc-200 text-black font-bold uppercase rounded-sm tracking-wider shadow"
                  >
                    {editingEvent ? 'Guardar Cambios' : 'Publicar Concierto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

        {/* Modal for Creating / Editing Venue */}
        {isCreatingVenue && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
            <div className="relative w-full max-w-xl bg-zinc-950 border border-zinc-700 rounded-sm p-6 overflow-y-auto max-h-[92vh] shadow-2xl">
              <div className="flex items-center justify-between mb-4 border-b border-zinc-800 pb-3">
                <h3 className="text-lg font-display font-bold uppercase text-white">
                  {editingVenue ? `Modificar Recinto: ${editingVenue.name}` : 'Registrar Nuevo Recinto Oficial'}
                </h3>
                <button 
                  type="button"
                  onClick={() => setIsCreatingVenue(false)}
                  className="text-zinc-400 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <form onSubmit={handleSaveVenue} className="space-y-4 text-xs font-mono">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Nombre del Recinto *</label>
                    <input
                      type="text"
                      name="name"
                      defaultValue={editingVenue?.name || ''}
                      required
                      placeholder="Ej: Auditorio Ducky"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Código de Recinto</label>
                    <input
                      type="text"
                      name="code"
                      defaultValue={editingVenue?.code || 'DP-AUD-01'}
                      required
                      placeholder="DP-CODE-01"
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Capacidad Total de Avatares *</label>
                    <input
                      type="number"
                      name="capacity"
                      defaultValue={editingVenue?.capacity || 40000}
                      required
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-zinc-400 mb-1">Estado Operativo</label>
                    <select
                      name="status"
                      defaultValue={editingVenue?.status || 'operativo'}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                    >
                      <option value="operativo">Operativo</option>
                      <option value="en_mantenimiento">En Mantenimiento</option>
                      <option value="en_construccion">En Construcción / Desarrollo</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Enlace Directo al Juego de Roblox (Experiencia) *</label>
                  <input
                    type="url"
                    name="robloxGameUrl"
                    defaultValue={editingVenue?.robloxGameUrl || 'https://www.roblox.com/games/ducky-productions'}
                    placeholder="https://www.roblox.com/games/..."
                    required
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-emerald-400 font-mono"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Lema / Subtítulo</label>
                  <input
                    type="text"
                    name="tagline"
                    defaultValue={editingVenue?.tagline || 'El coloso monumental para eventos masivos.'}
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                  />
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">URL de la Imagen del Recinto *</label>
                  <div className="flex gap-2 items-center">
                    <input
                      type="text"
                      name="image"
                      value={previewVenueImageUrl}
                      onChange={(e) => setPreviewVenueImageUrl(e.target.value)}
                      required
                      className="flex-1 px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                    />
                    {previewVenueImageUrl && (
                      <div className="w-12 h-9 bg-zinc-900 border border-zinc-700 rounded-sm overflow-hidden shrink-0">
                        <img src={previewVenueImageUrl} alt="Preview" className="w-full h-full object-cover" />
                      </div>
                    )}
                  </div>
                  <div className="flex gap-2 mt-1 text-[10px] text-zinc-400">
                    <button
                      type="button"
                      onClick={() => setPreviewVenueImageUrl('/src/assets/images/venue_ducky_stadium_1794244584727.jpg')}
                      className="underline hover:text-white"
                    >
                      Preset Stadium
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewVenueImageUrl('/src/assets/images/venue_ducky_nexus_1794244585585.jpg')}
                      className="underline hover:text-white"
                    >
                      Preset Nexus
                    </button>
                    <button
                      type="button"
                      onClick={() => setPreviewVenueImageUrl('/src/assets/images/venue_ducky_dome_1794244586856.jpg')}
                      className="underline hover:text-white"
                    >
                      Preset Dome
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-zinc-400 mb-1">Escenario</label>
                    <input
                      type="text"
                      name="stageWidth"
                      defaultValue={editingVenue?.specs?.stageWidth || '100m Frontales con pasarela'}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                    />
                  </div>
                  <div>
                    <label className="block text-zinc-400 mb-1">Sistema de Sonido</label>
                    <input
                      type="text"
                      name="soundSystem"
                      defaultValue={editingVenue?.specs?.soundSystem || 'Roblox 3D Spatial Audio Hi-Fi'}
                      className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-zinc-400 mb-1">Descripción</label>
                  <textarea
                    name="description"
                    rows={2}
                    defaultValue={editingVenue?.description || ''}
                    placeholder="Describe la arquitectura y ambientación del recinto en Roblox..."
                    className="w-full px-3 py-2 bg-zinc-900 border border-zinc-700 rounded-sm text-white resize-none"
                  />
                </div>

                <div className="pt-4 border-t border-zinc-800 flex justify-end gap-3">
                  <button
                    type="button"
                    onClick={() => setIsCreatingVenue(false)}
                    className="px-4 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-sm"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2 bg-white hover:bg-zinc-200 text-black font-bold uppercase rounded-sm shadow"
                  >
                    {editingVenue ? 'Guardar Cambios' : 'Registrar Recinto'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
