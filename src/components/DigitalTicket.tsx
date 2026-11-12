import React, { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import { AccessRegistration } from '../types';
import { Download, Copy, Check, ShieldCheck, MapPin, Calendar, Clock, User, Sparkles, QrCode as QrIcon } from 'lucide-react';

interface DigitalTicketProps {
  pass: AccessRegistration;
  onPrint?: () => void;
}

export const DigitalTicket: React.FC<DigitalTicketProps> = ({ pass }) => {
  const [copied, setCopied] = useState(false);
  const [qrDataUrl, setQrDataUrl] = useState<string>('');

  useEffect(() => {
    // Generate real scannable QR code
    QRCode.toDataURL(
      pass.qrPayload,
      {
        width: 320,
        margin: 1.5,
        color: {
          dark: '#000000',
          light: '#ffffff'
        },
        errorCorrectionLevel: 'M'
      },
      (err, url) => {
        if (!err && url) {
          setQrDataUrl(url);
        }
      }
    );
  }, [pass.qrPayload]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(`${pass.id} | ${pass.robloxUsername} | ${pass.eventTitle} | ${pass.tier}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (!qrDataUrl) return;
    const link = document.createElement('a');
    link.download = `QR_Acceso_Ducky_${pass.robloxUsername}_${pass.id}.png`;
    link.href = qrDataUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  const isStaffTier = pass.tier === 'Backstage Pass';

  return (
    <div className="w-full max-w-xl mx-auto my-6 text-zinc-100">
      
      {/* The Printable / Viewable Pass Card */}
      <div 
        id={`ticket-${pass.id}`}
        className="relative bg-[#0c0c10] border border-zinc-700/80 rounded-sm shadow-2xl overflow-hidden transition-all duration-300"
        style={{
          boxShadow: '0 20px 50px -15px rgba(0, 0, 0, 0.9), 0 0 30px rgba(255, 255, 255, 0.03)'
        }}
      >
        {/* Holographic metallic header strip */}
        <div className={`h-2.5 w-full ${
          isStaffTier
            ? 'bg-gradient-to-r from-amber-400 via-zinc-100 to-amber-500'
            : 'bg-gradient-to-r from-zinc-600 via-zinc-200 to-zinc-500'
        }`} />

        {/* Top Header */}
        <div className="p-6 border-b border-zinc-800/80 bg-zinc-950/70 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-sm bg-white text-black font-display font-black text-xs flex items-center justify-center tracking-tighter shadow">
              DP
            </div>
            <div>
              <span className="font-display font-black tracking-widest text-xs uppercase block text-white">
                DUCKY PRODUCTIONS
              </span>
              <span className="font-mono text-[9px] uppercase tracking-wider text-zinc-400">
                {isStaffTier ? 'PASE OFICIAL STAFF · ACCESO BACKSTAGE' : 'PASE OFICIAL DE ACCESO DIGITAL · ROBLOX'}
              </span>
            </div>
          </div>

          <div className="text-right">
            <span className={`inline-flex items-center gap-1 text-[11px] font-mono font-semibold ${
              isStaffTier ? 'text-amber-400' : 'text-emerald-400'
            }`}>
              <ShieldCheck className="w-3.5 h-3.5" /> {isStaffTier ? 'STAFF VERIFICADO' : 'VERIFICADO'}
            </span>
            <span className="block font-mono text-[10px] text-zinc-400 tracking-wider">
              {pass.id}
            </span>
          </div>
        </div>

        {/* Main Body */}
        <div className="p-6 sm:p-8 space-y-6">
          
          {/* Concert Title */}
          <div>
            <div className="text-[10px] uppercase font-mono tracking-widest text-zinc-400 mb-1">
              ESPECTÁCULO / CONCIERTO OFICIAL
            </div>
            <h3 className="text-2xl sm:text-3xl font-display font-black text-white uppercase tracking-tight">
              {pass.eventTitle}
            </h3>
          </div>

          {/* Logistics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 py-4 border-y border-zinc-850 font-mono text-xs">
            <div>
              <div className="text-[10px] text-zinc-500 uppercase flex items-center gap-1 mb-1">
                <Calendar className="w-3 h-3" /> Fecha
              </div>
              <div className="font-bold text-white text-sm">{pass.eventDate}</div>
            </div>

            <div>
              <div className="text-[10px] text-zinc-500 uppercase flex items-center gap-1 mb-1">
                <Clock className="w-3 h-3" /> Horario
              </div>
              <div className="font-bold text-white text-sm">{pass.eventTime}</div>
            </div>

            <div>
              <div className="text-[10px] text-zinc-500 uppercase flex items-center gap-1 mb-1">
                <MapPin className="w-3 h-3" /> Recinto
              </div>
              <div className="font-bold text-white text-sm truncate">{pass.venueName}</div>
            </div>
          </div>

          {/* Attendee Details & Tier */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 border rounded-sm ${
            isStaffTier 
              ? 'bg-amber-950/20 border-amber-800/40' 
              : 'bg-zinc-900/60 border-zinc-800'
          }`}>
            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase mb-1 flex items-center gap-1">
                <User className="w-3 h-3" /> Asistente de Roblox
              </div>
              <div className="flex items-center gap-2">
                <div className={`w-8 h-8 rounded-sm flex items-center justify-center text-xs font-bold font-mono border ${
                  isStaffTier 
                    ? 'bg-amber-400 text-black border-amber-300' 
                    : 'bg-zinc-800 text-white border-zinc-700'
                }`}>
                  {pass.robloxUsername.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <div className="font-mono font-bold text-white text-sm">
                    @{pass.robloxUsername}
                  </div>
                  {isStaffTier && (
                    <div className="text-[10px] font-mono text-amber-400 font-semibold">
                      Miembro de Producción Oficial
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div>
              <div className="text-[10px] font-mono text-zinc-400 uppercase mb-1">
                Categoría de Entrada
              </div>
              <div className={`inline-block px-3 py-1 font-mono font-bold text-xs uppercase tracking-wider rounded-sm ${
                isStaffTier ? 'bg-amber-400 text-black' : 'bg-white text-black'
              }`}>
                {pass.tier}
              </div>
              <div className="text-[10px] font-mono text-zinc-400 mt-1">
                {pass.seatZone}
              </div>
            </div>
          </div>

          {/* Authentic Scannable QR Code and Barcode Section */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-dashed border-zinc-800">
            {/* Scannable Real QR Code */}
            <div className="bg-white p-2.5 rounded-sm shrink-0 flex flex-col items-center shadow-xl border border-zinc-300">
              {qrDataUrl ? (
                <img 
                  src={qrDataUrl} 
                  alt={`Código QR de acceso para ${pass.robloxUsername}`} 
                  className="w-28 h-28 object-contain"
                />
              ) : (
                <div className="w-28 h-28 bg-zinc-200 animate-pulse" />
              )}
              <span className="text-[9px] font-mono text-black font-bold tracking-tight mt-1">
                {pass.id}
              </span>
            </div>

            {/* Simulated Barcode & Serial */}
            <div className="flex-1 w-full text-center sm:text-right font-mono text-xs">
              <div className="h-10 w-full flex items-end justify-center sm:justify-end gap-1 opacity-80">
                {[2, 5, 1, 4, 6, 2, 5, 1, 4, 3, 6, 2, 5, 1, 3, 6, 2, 4, 1, 5, 2, 6, 3, 1].map((h, i) => (
                  <div 
                    key={i} 
                    className="bg-zinc-200 w-1" 
                    style={{ height: `${h * 4 + 8}px` }} 
                  />
                ))}
              </div>
              <p className="text-[10px] text-zinc-400 tracking-widest mt-2 uppercase">
                CODEX ID: {pass.id.replace('DP-', '')}·8920
              </p>
              <p className="text-[9px] text-zinc-500 mt-0.5">
                Emisión registrada: {pass.registeredAt}
              </p>
              <p className="text-[10px] text-emerald-400 mt-1 flex items-center justify-center sm:justify-end gap-1">
                <Check className="w-3 h-3" /> Conserva este QR para ingresar al evento
              </p>
            </div>
          </div>

          {/* Legal / Honest Disclaimer Box */}
          <div className="p-3 bg-zinc-950 border border-zinc-850 rounded-sm text-[11px] text-zinc-400 font-sans leading-relaxed">
            <span className="font-semibold text-zinc-300">Aviso oficial de conservación:</span> Guarda y conserva este código QR escaneable en tu dispositivo. Tu registro está guardado permanentemente en la plataforma. Recuerda que el acceso final a las salas de concierto se realiza a través del enlace directo al servidor oficial de Roblox del evento.
          </div>

        </div>

        {/* Action Controls Bar */}
        <div className="p-4 bg-zinc-950/90 border-t border-zinc-800 flex flex-wrap items-center justify-between gap-3 text-xs">
          <button
            onClick={handleCopyCode}
            className="px-3.5 py-2 bg-zinc-900 hover:bg-zinc-800 text-zinc-300 rounded-sm border border-zinc-800 transition-colors flex items-center gap-1.5 font-mono"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Copiado' : 'Copiar Datos'}</span>
          </button>

          <div className="flex items-center gap-2">
            <button
              onClick={handleDownloadQR}
              className="px-3.5 py-2 bg-zinc-800 hover:bg-zinc-700 text-white font-semibold rounded-sm transition-colors flex items-center gap-1.5 font-mono"
              title="Guardar código QR como imagen PNG"
            >
              <QrIcon className="w-3.5 h-3.5" />
              <span>Guardar QR (PNG)</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-4 py-2 bg-white hover:bg-zinc-200 text-black font-bold uppercase rounded-sm transition-colors flex items-center gap-1.5 shadow"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Imprimir / PDF</span>
            </button>
          </div>
        </div>

      </div>

    </div>
  );
};
