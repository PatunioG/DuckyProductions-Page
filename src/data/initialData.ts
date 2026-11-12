import { ConcertEvent, Venue, GalleryPhoto, AccessRegistration, StaffMember } from '../types';

export const INITIAL_VENUES: Venue[] = [
  {
    id: 'ducky-stadium',
    name: 'Ducky Stadium',
    code: 'DP-STAD-01',
    tagline: 'El coloso monumental al aire libre para eventos masivos globales.',
    capacity: 85000,
    status: 'operativo',
    specs: {
      stageWidth: '120 metros frontales con pasarela de 45m',
      soundSystem: 'Roblox 3D Spatial Audio Hi-Fi v4 (128 canales)',
      lighting: 'Torres truss de 60m, 800 focos móviles beam & pirotecnia sincronizada',
      avatarLOD: 'Optimizado para clústeres de 100+ avatares por instancia con mirroring en vivo'
    },
    description: 'El recinto insignia de Ducky Productions. Diseñado con una acústica virtual inmersiva y un sistema pirotécnico de última generación para albergar los espectáculos más masivos y apoteósicos de Roblox.',
    features: [
      'Capacidad récord de avatares sincronizados',
      'Pantalla central LED hiper-reactiva de 8K Roblox Canvas',
      'Foso Golden Pit con interacción por gestos y emotes',
      'Fuegos artificiales dinámicos de partículas en tiempo real'
    ],
    image: '/src/assets/images/venue_ducky_stadium_1794244584727.jpg',
    robloxGameUrl: 'https://www.roblox.com/games/18492049102/Ducky-Stadium-Experience'
  },
  {
    id: 'ducky-nexus',
    name: 'Ducky Nexus',
    code: 'DP-NEXS-02',
    tagline: 'El epicentro cyberpunk de la música electrónica y visuales holográficos.',
    capacity: 32000,
    status: 'operativo',
    specs: {
      stageWidth: 'Plataforma circular multi-nivel con vórtice holográfico',
      soundSystem: 'Audio sub-bass envolvente y ecualización procedural',
      lighting: 'Techo matricial de hexágonos LED cinéticos y láseres volumétricos',
      avatarLOD: 'Renderizado dinámico de shaders con iluminación global en tiempo real'
    },
    description: 'Una catedral tecnológica inspirada en las estéticas más vanguardistas. Sus balcones flotantes y pantallas volumétricas envuelven a los espectadores en una atmósfera hiperfuturista.',
    features: [
      'Estructura suspendida de iluminación cinemática',
      'Balcones VIP de cristal con vista cenital al DJ Booth',
      'Sincronización de visuales audiorreactivos en Roblox Studio',
      'Zonas lounge exclusivas para poses de avatares'
    ],
    image: '/src/assets/images/venue_ducky_nexus_1794244585585.jpg',
    robloxGameUrl: 'https://www.roblox.com/games/18492049103/Ducky-Nexus-Club'
  },
  {
    id: 'ducky-dome',
    name: 'Ducky Dome',
    code: 'DP-DOME-03',
    tagline: 'Cúpula inmersiva de 360 grados con proyección planetaria y escenario central.',
    capacity: 55000,
    status: 'operativo',
    specs: {
      stageWidth: 'Escenario giratorio central de 360° con elevadores hidráulicos',
      soundSystem: 'Binaural Ambisonic 360 Surround soundstage',
      lighting: 'Cúpula completa mapeada como proyección de cielo y constelaciones',
      avatarLOD: 'Malla esférica de baja latencia con telemetría de animación suave'
    },
    description: 'Una joya arquitectónica diseñada para espectáculos conceptuales. La bóveda celeste proyecta universos, nebulosas y mundos abstractos coordinados milimétricamente con cada nota musical.',
    features: [
      'Proyección esférica 360° sin puntos ciegos',
      'Escenario central con giro continuo y pasarelas telescópicas',
      'Iluminación suave envolvente para conciertos sinfónicos y pop estelar',
      'Gradas concéntricas con visibilidad perfecta desde cualquier ángulo'
    ],
    image: '/src/assets/images/venue_ducky_dome_1794244586856.jpg',
    robloxGameUrl: 'https://www.roblox.com/games/18492049105/Ducky-Dome-360'
  },
  {
    id: 'auditorio-ducky',
    name: 'Auditorio Ducky',
    code: 'DP-AUDI-04',
    tagline: 'Elegancia, acústica de alta fidelidad e intimidad para veladas exclusivas.',
    capacity: 12500,
    status: 'operativo',
    specs: {
      stageWidth: 'Escenario tradicional proscenio de 40m en madera de ébano virtual',
      soundSystem: 'Mastering acústico cálido para orquestas y directos vocales',
      lighting: 'Iluminación teatral cálida, focos de seguimiento y niebla baja',
      avatarLOD: 'Renderizado prioritario de detalles faciales y animaciones R15 fluidas'
    },
    description: 'El espacio más selecto de Ducky Productions para recitales de cámara, conciertos acústicos, estrenos exclusivos de bandas sonoras y galas de premiación en el metaverso.',
    features: [
      'Palcos privados con acceso VIP restringido',
      'Foso de orquesta con animación de instrumentos de viento y cuerda',
      'Camerinos virtuales de artistas completamente interactivos',
      'Alfombra roja y área fotográfica para la comunidad'
    ],
    image: '/src/assets/images/hero_roblox_stadium_concert_1794244583969.jpg',
    robloxGameUrl: 'https://www.roblox.com/games/18492049106/Auditorio-Ducky-Acoustic'
  },
  {
    id: 'ducky-colosseum',
    name: 'Ducky Colosseum (Futuro Recinto)',
    code: 'DP-COLO-05',
    tagline: 'Próxima mega-construcción: La arena flotante sobre agua en fase de desarrollo.',
    capacity: 110000,
    status: 'en_construccion',
    specs: {
      stageWidth: 'Isla flotante central rodeada de fuentes de agua dinámicas',
      soundSystem: 'Próxima generación Roblox Open-World Sound API',
      lighting: 'Drones de luz sincronizados y cascadas de partículas de agua',
      avatarLOD: 'Arquitectura experimental para servidores de ultradensidad'
    },
    description: 'En fase activa de construcción en Roblox Studio por el equipo de arquitectura de Ducky Productions. Un anfiteatro futurista inspirado en el Coliseo clásico con tecnología gravitacional.',
    features: [
      'Diseño colosal con gradas esculpidas en mármol y titanio oscuro',
      'Efectos de agua y lluvia controlada por compases musicales',
      'Inauguración prevista para la temporada de verano'
    ],
    image: '/src/assets/images/concert_neon_night_1794244586284.jpg',
    robloxGameUrl: 'https://www.roblox.com/games/18492049109/Ducky-Colosseum-Dev'
  }
];

export const INITIAL_EVENTS: ConcertEvent[] = [
  {
    id: 'event-korblox-live',
    title: 'KORBLOX LIVE: THE RECKONING',
    artist: 'Korblox Symphony & Synthetic Pulse',
    date: '21 NOV 2026',
    isoDate: '2026-11-21',
    time: '21:00 CET / 15:00 EST',
    venueId: 'ducky-stadium',
    venueName: 'Ducky Stadium',
    description: 'El concierto inaugural de la temporada de otoño. Una ópera sinfónica y electrónica con orquesta en directo, solos de guitarra virtual y un despliegue de pirotecnia jamás visto en Roblox.',
    extendedBio: 'Korblox Symphony une la majestuosidad de la instrumentación clásica con los bajos demoledores del bass music contemporáneo. Con un montaje de escenario de más de 120 metros de envergadura, el espectáculo incluirá transformaciones de escenario en vivo y sincronización háptica con emotes especiales para avatares.',
    status: 'entradas_disponibles',
    posterImage: '/src/assets/images/hero_roblox_stadium_concert_1794244583969.jpg',
    robloxExperienceUrl: 'https://www.roblox.com/games/ducky-productions-stadium',
    robloxPlaceId: '18492049102',
    maxCapacity: 85000,
    registeredCount: 68420,
    ageRating: 'Para todas las edades (All Ages)',
    lightingTech: 'DMX Live Mesh, 800 cabezas móviles y láser verde Korblox',
    soundTech: 'Spatial Binaural 3D Mastered Audio',
    genre: 'Electronic Symphony / Bass Live',
    featured: true,
    vipTiers: ['General Admission', 'VIP Golden Pit', 'Backstage Pass']
  },
  {
    id: 'event-astral-supernova',
    title: 'ASTRAL SUPERNOVA TOUR',
    artist: 'Virtual Sonic & The Void Collective',
    date: '05 DIC 2026',
    isoDate: '2026-12-05',
    time: '22:00 CET / 16:00 EST',
    venueId: 'ducky-nexus',
    venueName: 'Ducky Nexus',
    description: 'Una inmersión audiovisual de clubbing futurista en el recinto más avanzado de Ducky Productions. Efectos láser volumétricos y sets de drum & bass melódico sin interrupciones.',
    extendedBio: 'The Void Collective presenta su nuevo álbum conceptual bajo la cúpula de Ducky Nexus. Diseñado para vivirse en primera persona con avatares sincronizados, el show contará con efectos de gravedad cero durante los momentos clímax del set.',
    status: 'ultimos_accesos',
    posterImage: '/src/assets/images/venue_ducky_nexus_1794244585585.jpg',
    robloxExperienceUrl: 'https://www.roblox.com/games/ducky-productions-nexus',
    robloxPlaceId: '18492049103',
    maxCapacity: 32000,
    registeredCount: 30890,
    ageRating: 'Para todas las edades (All Ages)',
    lightingTech: 'Láseres volumétricos 3D y techo cinético de hexágonos LED',
    soundTech: 'Ultra-low Bass Engine & Audio Reverb Shaders',
    genre: 'Synthwave / Future Drum & Bass',
    featured: true,
    vipTiers: ['General Admission', 'VIP Balcony Pass']
  },
  {
    id: 'event-electric-nights',
    title: 'ELECTRIC NIGHTS: ROCK THE ARENA',
    artist: 'The Blockheads & Guest Avatars',
    date: '19 DIC 2026',
    isoDate: '2026-12-19',
    time: '20:30 CET / 14:30 EST',
    venueId: 'ducky-stadium',
    venueName: 'Ducky Stadium',
    description: 'Potencia pura de guitarras distorsionadas, confeti dorado y fuego en el escenario principal. El festival de rock y pop que une a la comunidad mundial de creadores.',
    extendedBio: 'Celebrando el fin de año con los himnos más aclamados de la cultura virtual. La producción cuenta con 40 torres de pirotecnia de fósforo frío y un pasillo central interactivo donde los asistentes podrán cantar a coro con animaciones de micrófono personalizadas.',
    status: 'entradas_disponibles',
    posterImage: '/src/assets/images/venue_ducky_stadium_1794244584727.jpg',
    robloxExperienceUrl: 'https://www.roblox.com/games/ducky-productions-stadium',
    robloxPlaceId: '18492049104',
    maxCapacity: 85000,
    registeredCount: 41200,
    ageRating: 'Para todas las edades (All Ages)',
    lightingTech: 'Pirotecnia sincronizada y pantallas modulares 8K',
    soundTech: 'Direct Live Rock Amplification Modeling',
    genre: 'Rock Virtual / Pop Festival',
    featured: false,
    vipTiers: ['General Admission', 'VIP Front Row']
  },
  {
    id: 'event-celestial-odyssey',
    title: 'CELESTIAL ODYSSEY: 360 GALA',
    artist: 'Cosmica Philharmonia',
    date: '02 ENE 2027',
    isoDate: '2027-01-02',
    time: '19:00 CET / 13:00 EST',
    venueId: 'ducky-dome',
    venueName: 'Ducky Dome',
    description: 'El concierto de año nuevo definitivo. Un viaje orquestal a través de las galaxias con la cúpula de Ducky Dome proyectando constelaciones en movimiento continuo.',
    extendedBio: 'Más de 60 músicos virtuales interpretarán bandas sonoras originales mientras la cúpula esférica de 360 grados sumerge a los espectadores en una expedición por nebulosas y agujeros de gusano. Una experiencia sosegada, sobrecogedora y visualmente impecable.',
    status: 'proximamente',
    posterImage: '/src/assets/images/venue_ducky_dome_1794244586856.jpg',
    robloxExperienceUrl: 'https://www.roblox.com/games/ducky-productions-dome',
    robloxPlaceId: '18492049105',
    maxCapacity: 55000,
    registeredCount: 15400,
    ageRating: 'Para todas las edades (All Ages)',
    lightingTech: 'Dome Mapping 360 Projection & Atmospheric Dimming',
    soundTech: 'Dolby Atmos Spatial Virtual Simulation',
    genre: 'Cinematic Classical / Ambient',
    featured: false,
    vipTiers: ['General Seating', 'VIP Dome Center']
  },
  {
    id: 'event-ducky-sessions',
    title: 'DUCKY ACOUSTIC SESSIONS #04',
    artist: 'Luna Solaris (Unplugged)',
    date: '16 ENE 2027',
    isoDate: '2027-01-16',
    time: '21:30 CET / 15:30 EST',
    venueId: 'auditorio-ducky',
    venueName: 'Auditorio Ducky',
    description: 'Una velada íntima de piano de cola, guitarras de cuerdas de nylon y voces cristalinas en el exclusivo Auditorio Ducky.',
    extendedBio: 'Sesión exclusiva para aforo reducido con pase nominativo. Diseñada para apreciar la calidez vocal y la lírica en un auditorio con acústica de madera natural simulada en Roblox Studio.',
    status: 'proximamente',
    posterImage: '/src/assets/images/concert_neon_night_1794244586284.jpg',
    robloxExperienceUrl: 'https://www.roblox.com/games/ducky-productions-auditorio',
    robloxPlaceId: '18492049106',
    maxCapacity: 12500,
    registeredCount: 6200,
    ageRating: 'Para todas las edades (All Ages)',
    lightingTech: 'Focos de seguimiento cálidos y niebla teatral',
    soundTech: 'Pure Acoustic Natural Stage Modeling',
    genre: 'Indie Pop / Acoustic Unplugged',
    featured: false,
    vipTiers: ['Asiento Patio de Butacas', 'Palco Presidencial']
  }
];

export const INITIAL_REGISTRATIONS: AccessRegistration[] = [
  {
    id: 'DP-2026-90412',
    eventId: 'event-korblox-live',
    eventTitle: 'KORBLOX LIVE: THE RECKONING',
    eventDate: '21 NOV 2026',
    eventTime: '21:00 CET',
    venueName: 'Ducky Stadium',
    robloxUsername: 'AlexGamer_99',
    email: 'alex.roblox@example.com',
    tier: 'VIP Golden Pit',
    registeredAt: '2026-11-08 14:22',
    qrPayload: 'DP-VERIFIED:event-korblox-live:AlexGamer_99:VIP-GOLDEN',
    seatZone: 'Golden Pit - Sector A1',
    status: 'valido'
  },
  {
    id: 'DP-2026-78104',
    eventId: 'event-astral-supernova',
    eventTitle: 'ASTRAL SUPERNOVA TOUR',
    eventDate: '05 DIC 2026',
    eventTime: '22:00 CET',
    venueName: 'Ducky Nexus',
    robloxUsername: 'CyberValkyrie_RBX',
    email: 'valk@example.com',
    tier: 'General',
    registeredAt: '2026-11-07 18:40',
    qrPayload: 'DP-VERIFIED:event-astral-supernova:CyberValkyrie_RBX:GENERAL',
    seatZone: 'Pista Central - Nivel 0',
    status: 'valido'
  },
  {
    id: 'DP-2026-64301',
    eventId: 'event-korblox-live',
    eventTitle: 'KORBLOX LIVE: THE RECKONING',
    eventDate: '21 NOV 2026',
    eventTime: '21:00 CET',
    venueName: 'Ducky Stadium',
    robloxUsername: 'NeonDuckyFan',
    email: 'neon.fan@ducky.pro',
    tier: 'Backstage Pass',
    registeredAt: '2026-11-09 08:15',
    qrPayload: 'DP-VERIFIED:event-korblox-live:NeonDuckyFan:BACKSTAGE',
    seatZone: 'Backstage All-Access & Artist Lounge',
    status: 'valido'
  }
];

export const INITIAL_GALLERY: GalleryPhoto[] = [
  {
    id: 'gal-01',
    title: 'Apoteosis en el Escenario Principal',
    category: 'Escenarios',
    image: '/src/assets/images/hero_roblox_stadium_concert_1794244583969.jpg',
    venue: 'Ducky Stadium',
    year: '2026',
    description: 'Vista panorámica con más de 70,000 avatares presenciando el despliegue de láseres Korblox en directo.'
  },
  {
    id: 'gal-02',
    title: 'Pirotecnia y Trusses Monumentales',
    category: 'Luces y Efectos',
    image: '/src/assets/images/venue_ducky_stadium_1794244584727.jpg',
    venue: 'Ducky Stadium',
    year: '2026',
    description: 'Disparo sincronizado de fuegos artificiales de alta velocidad sobre el cielo nocturno del estadio.'
  },
  {
    id: 'gal-03',
    title: 'Inmersión Volumétrica en el Vórtice',
    category: 'Escenarios',
    image: '/src/assets/images/venue_ducky_nexus_1794244585585.jpg',
    venue: 'Ducky Nexus',
    year: '2026',
    description: 'La cúpula de Ducky Nexus con su entramado de hexágonos LED cinéticos y balcones a triple altura.'
  },
  {
    id: 'gal-04',
    title: 'Guitar Solo y Lluvia de Confeti',
    category: 'Artistas',
    image: '/src/assets/images/concert_neon_night_1794244586284.jpg',
    venue: 'Ducky Stadium - Stage Front',
    year: '2026',
    description: 'La vocalista virtual en el clímax del show mientras caen miles de partículas de confeti luminiscente.'
  },
  {
    id: 'gal-05',
    title: 'Bóveda Galáctica 360 Grados',
    category: 'Luces y Efectos',
    image: '/src/assets/images/venue_ducky_dome_1794244586856.jpg',
    venue: 'Ducky Dome',
    year: '2026',
    description: 'Proyección cenital de nebulosas y galaxias envolviendo las gradas concéntricas de Ducky Dome.'
  },
  {
    id: 'gal-06',
    title: 'La Marea de Bastones de Luz',
    category: 'Público',
    image: '/src/assets/images/hero_roblox_stadium_concert_1794244583969.jpg',
    venue: 'Ducky Stadium - Floor Pit',
    year: '2026',
    description: 'La comunidad de Roblox unida en una sola vibra agitando glow sticks sincronizados por código.'
  }
];

export const INITIAL_STAFF: StaffMember[] = [
  {
    id: 'staff-01',
    robloxUsername: 'patuniog',
    role: 'Director General & Productor Ejecutivo',
    addedAt: '2026-11-01',
    notes: 'Acceso Total Backstage & Control de Escenario'
  },
  {
    id: 'staff-02',
    robloxUsername: 'DuckyFounder_RBX',
    role: 'Arquitecto Principal de Recintos',
    addedAt: '2026-11-02',
    notes: 'Ingeniería en Roblox Studio'
  },
  {
    id: 'staff-03',
    robloxUsername: 'StageMaster_DP',
    role: 'Jefe de Iluminación DMX & Mocap',
    addedAt: '2026-11-05',
    notes: 'Control de Cabina FOH'
  }
];
