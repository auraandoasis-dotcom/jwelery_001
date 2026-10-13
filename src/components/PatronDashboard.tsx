import React, { useState } from 'react';
import { useMaison, SalonAppointment } from '../context/MaisonContext';

export const PatronDashboard: React.FC = () => {
  const { 
    patronProfile, 
    appointments, 
    vaultPieces, 
    bookAppointment, 
    cancelAppointment, 
    sendSignalMessage,
    logout,
    inspectPiece,
    setScreen 
  } = useMaison();

  const [activeTab, setActiveTab] = useState<'all' | 'appointments' | 'vault' | 'privileges'>('all');
  
  // Modals
  const [signalModalOpen, setSignalModalOpen] = useState(false);
  const [signalNature, setSignalNature] = useState("Demande d'Armored Delivery Immédiate");
  const [signalText, setSignalText] = useState('');
  const [signalSent, setSignalSent] = useState(false);

  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [newLoc, setNewLoc] = useState('Paris — 26 Place Vendôme');
  const [newDate, setNewDate] = useState('2025-06-12');
  const [newCreation, setNewCreation] = useState('Bespoke Commission');

  const [model3dOpen, setModel3dOpen] = useState(false);
  const [modelRotation, setModelRotation] = useState(0);
  const [modelWireframe, setModelWireframe] = useState(false);

  const [transferModalOpen, setTransferModalOpen] = useState(false);
  const [selectedPieceTitle, setSelectedPieceTitle] = useState('');

  const handleSendSignal = async (e: React.FormEvent) => {
    e.preventDefault();
    await sendSignalMessage(signalNature, signalText);
    setSignalSent(true);
    setTimeout(() => {
      setSignalSent(false);
      setSignalModalOpen(false);
      setSignalText('');
    }, 1500);
  };

  const handleNewBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    await bookAppointment({
      salonLocation: newLoc,
      preferredDate: newDate,
      creationsOfInterest: newCreation,
      title: `Séance Confidentielle : ${newCreation}`,
      status: 'confirmed',
    });
    setBookingModalOpen(false);
  };

  const handleDiplomaticTransfer = (title: string) => {
    setSelectedPieceTitle(title);
    setTransferModalOpen(true);
  };

  return (
    <div className="flex flex-col w-full bg-[#0e0e0f] text-[#e5e2e3] min-h-screen pt-24 pb-20 px-4 sm:px-8 lg:px-16">
      {/* Background Ambience */}
      <div className="pointer-events-none fixed -top-40 right-1/4 w-[600px] h-[600px] rounded-full bg-[#f2ca50]/5 blur-[140px]"></div>
      <div className="pointer-events-none fixed top-[600px] -left-32 w-[500px] h-[500px] rounded-full bg-[#d4af37]/5 blur-[120px]"></div>

      {/* Top Liaison & Patron Header */}
      <section className="w-full pb-8">
        <div className="flex flex-col xl:flex-row xl:items-end justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#d4af37] font-semibold">
                Espace Client Privé
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4d4635]"></span>
              <span className="font-sans text-[11px] text-[#ccc6bd] tracking-widest uppercase">
                ID: {patronProfile.memberId}
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-[#4d4635]"></span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f2ca50]/10 text-[#f2ca50] font-sans text-[10px] tracking-wider uppercase border border-[#f2ca50]/20 font-semibold">
                <span className="material-symbols-outlined text-[13px]">stars</span>
                {patronProfile.tier}
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#e5e2e3] tracking-tight font-normal">
              Bienvenue, <span className="italic font-normal text-[#f2ca50]">{patronProfile.honorific}</span>
            </h1>

            <p className="font-sans text-xs sm:text-sm text-[#ccc6bd] max-w-2xl font-light leading-relaxed">
              Votre sanctuaire personnel d’art joaillier au 26 Place Vendôme. Vos pièces d’exception, acquisitions sous scellé diplomatique et créations sur-mesure vous attendent.
            </p>
          </div>

          {/* Master Concierge Liaison Card */}
          <div className="bg-[#1c1b1c] p-5 rounded-xl max-w-md w-full shadow-2xl border border-[#353436]">
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBqFRdasvApXv8WLOB_qQgZf7h9i1TbgDPQKI5P38sy9AKBAah68tmfUklk0D4R3MPONsTC1pBN5zymJa5PkZ4nufZPYpGGSPCE2bjAKC75qpMsHvdf6BG1wcDqONcN_VWNdynM2gb4S38h7LKeIR-bpkmRwseyetPdPLPOe9Rq7vs8n4G4MwgguxldofKGGhkQO-UzIfMoHZbSHqjiJalrlB89FxCGImq6we4r5CLDYJywlhS4r5z1lA"
                    alt="Directeur M. Jean-Philippe Morel"
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-[#d4af37]/40"
                  />
                  <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22c55e] ring-2 ring-[#1c1b1c]"></span>
                </div>
                <div>
                  <span className="font-sans text-[10px] text-[#f2ca50] uppercase tracking-[0.2em] block font-semibold">
                    Liaison Dédiée
                  </span>
                  <p className="font-serif text-lg text-[#e5e2e3] leading-tight font-medium">
                    {patronProfile.guardianLiaison}
                  </p>
                  <p className="font-sans text-[11px] text-[#99907c]">Directeur des Salons Privés</p>
                </div>
              </div>
              <span className="material-symbols-outlined text-[#d4af37] text-xl">verified</span>
            </div>

            <div className="mt-4 pt-3 border-t border-[#353436] flex items-center justify-between gap-2">
              <a
                href="tel:+33142680026"
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#201f20] hover:bg-[#2a2a2b] px-3 py-2 rounded text-[#e5e2e3] hover:text-[#f2ca50] transition-colors border border-[#353436]"
              >
                <span className="material-symbols-outlined text-sm text-[#f2ca50]">call</span>
                <span className="font-sans text-[10px] tracking-wider uppercase font-medium">Ligne 24/7</span>
              </a>
              <button
                type="button"
                onClick={() => setSignalModalOpen(true)}
                className="flex-1 inline-flex items-center justify-center gap-1.5 bg-[#201f20] hover:bg-[#2a2a2b] px-3 py-2 rounded text-[#e5e2e3] hover:text-[#f2ca50] transition-colors border border-[#353436]"
              >
                <span className="material-symbols-outlined text-sm text-[#f2ca50]">encrypted</span>
                <span className="font-sans text-[10px] tracking-wider uppercase font-medium">Signal Sécurisé</span>
              </button>
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] p-2 rounded transition-colors flex items-center justify-center font-semibold"
                title="Prendre rendez-vous privé"
              >
                <span className="material-symbols-outlined text-base">calendar_add_on</span>
              </button>
            </div>
          </div>
        </div>

        {/* Segmented Navigation Tabs */}
        <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2 border-b border-[#201f20]">
          <button
            onClick={() => setActiveTab('all')}
            className={`px-5 py-2.5 rounded font-sans text-xs uppercase tracking-[0.2em] transition-all cursor-pointer font-medium ${
              activeTab === 'all'
                ? 'bg-[#f2ca50] text-[#3c2f00] font-semibold shadow-md'
                : 'bg-[#1c1b1c] text-[#ccc6bd] hover:text-[#e5e2e3]'
            }`}
          >
            Vue d'Ensemble
          </button>
          <button
            onClick={() => setScreen('admin')}
            className="px-5 py-2.5 rounded font-sans text-xs uppercase tracking-[0.2em] transition-all cursor-pointer font-mono bg-[#1c1b1c] hover:bg-[#cca76a]/20 text-[#cca76a] border border-[#cca76a]/30 flex items-center gap-2"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Journal &amp; Registre Admin
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-5 py-2.5 rounded font-sans text-xs uppercase tracking-[0.2em] transition-all cursor-pointer font-medium ${
              activeTab === 'appointments'
                ? 'bg-[#f2ca50] text-[#3c2f00] font-semibold shadow-md'
                : 'bg-[#1c1b1c] text-[#ccc6bd] hover:text-[#e5e2e3]'
            }`}
          >
            Salons &amp; Vernissages ({appointments.length})
          </button>
          <button
            onClick={() => setActiveTab('vault')}
            className={`px-5 py-2.5 rounded font-sans text-xs uppercase tracking-[0.2em] transition-all cursor-pointer font-medium ${
              activeTab === 'vault'
                ? 'bg-[#f2ca50] text-[#3c2f00] font-semibold shadow-md'
                : 'bg-[#1c1b1c] text-[#ccc6bd] hover:text-[#e5e2e3]'
            }`}
          >
            Mon Coffre &amp; Pièces ({vaultPieces.length})
          </button>
          <button
            onClick={() => setActiveTab('privileges')}
            className={`px-5 py-2.5 rounded font-sans text-xs uppercase tracking-[0.2em] transition-all cursor-pointer font-medium ${
              activeTab === 'privileges'
                ? 'bg-[#f2ca50] text-[#3c2f00] font-semibold shadow-md'
                : 'bg-[#1c1b1c] text-[#ccc6bd] hover:text-[#e5e2e3]'
            }`}
          >
            Les Privilèges Impériaux
          </button>

          <div className="ml-auto">
            <button
              onClick={() => logout()}
              className="px-4 py-2 bg-[#201f20] hover:bg-[#2a2a2b] text-[#99907c] hover:text-[#e5e2e3] rounded font-sans text-[11px] uppercase tracking-wider transition-colors border border-[#353436]"
            >
              Quitter le Coffre
            </button>
          </div>
        </div>
      </section>

      {/* Maison Loyalty & Privilèges Ribbon */}
      {(activeTab === 'all' || activeTab === 'privileges') && (
        <section className="w-full pb-8">
          <div className="bg-[#201f20] p-6 sm:p-8 rounded-xl shadow-2xl relative overflow-hidden border border-[#353436]">
            <div className="pointer-events-none absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#f2ca50]/10 blur-[80px]"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              {/* Balance Metric */}
              <div className="lg:col-span-4 space-y-1">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#f2ca50] text-lg">diamond</span>
                  <span className="font-sans text-[11px] text-[#f2ca50] uppercase tracking-[0.22em] font-semibold">
                    Points d'Art &amp; Étoiles
                  </span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-4xl text-[#e5e2e3] font-medium tracking-tight">
                    {patronProfile.stars.toLocaleString()}
                  </span>
                  <span className="font-sans text-xs text-[#ccc6bd] tracking-widest uppercase">
                    Étoiles Actives
                  </span>
                </div>
                <p className="font-sans text-xs text-[#ccc6bd] pt-1 font-light">
                  Équivalence : Droit d’accès aux gemmes d’investissement non cataloguées &amp; 15,000 € de crédit sur atelier d'orfèvrerie.
                </p>
              </div>

              {/* Progress to Next Circle */}
              <div className="lg:col-span-5 space-y-2">
                <div className="flex justify-between items-center text-xs">
                  <span className="font-sans uppercase tracking-wider text-[#e5e2e3]">
                    Cap vers : Le Cercle des Fondateurs
                  </span>
                  <span className="font-sans text-[#f2ca50] font-medium">
                    {patronProfile.stars.toLocaleString()} / 50,000 pts (97%)
                  </span>
                </div>
                {/* Progress Bar Tracker */}
                <div className="w-full h-2 rounded-full bg-[#353436] overflow-hidden p-0.5">
                  <div
                    className="h-full bg-gradient-to-r from-[#f2ca50] to-[#ffe088] rounded-full transition-all duration-1000"
                    style={{ width: '97%' }}
                  ></div>
                </div>
                <div className="flex items-center gap-2 text-[#ccc6bd]">
                  <span className="material-symbols-outlined text-sm text-[#f2ca50]">lock_open</span>
                  <span className="font-sans text-xs">
                    Prochain privilège : Visite secrète des archives historiques 1920 à Genève.
                  </span>
                </div>
              </div>

              {/* Action Trigger */}
              <div className="lg:col-span-3 flex lg:justify-end">
                <button
                  type="button"
                  onClick={() => alert("Vos 48,500 étoiles vous accordent la priorité absolue sur l'attribution du Sol Invictus. Un bon notarié a été déposé dans votre coffre.")}
                  className="w-full lg:w-auto inline-flex items-center justify-center gap-2 bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] px-6 py-3 rounded font-sans text-xs uppercase tracking-[0.2em] font-semibold shadow-lg transition-all"
                >
                  <span className="material-symbols-outlined text-base">card_giftcard</span>
                  Convertir Mes Droits
                </button>
              </div>
            </div>

            {/* 3 Pillars of Patronage Perks */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6 pt-5 bg-[#1c1b1c]/80 -mx-6 sm:-mx-8 px-6 sm:px-8 -mb-6 sm:-mb-8 py-4 border-t border-[#353436]">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#f2ca50]/10 flex items-center justify-center text-[#f2ca50] shrink-0">
                  <span className="material-symbols-outlined text-base">security</span>
                </div>
                <div>
                  <p className="font-sans text-xs text-[#e5e2e3] uppercase tracking-wider font-medium">
                    Convoi Blindé Offert
                  </p>
                  <p className="font-sans text-[11px] text-[#ccc6bd]">
                    Livraison diplomatique gant blanc en Europe.
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#f2ca50]/10 flex items-center justify-center text-[#f2ca50] shrink-0">
                  <span className="material-symbols-outlined text-base">celebration</span>
                </div>
                <div>
                  <p className="font-sans text-xs text-[#e5e2e3] uppercase tracking-wider font-medium">
                    Gala Haute Joaillerie
                  </p>
                  <p className="font-sans text-[11px] text-[#ccc6bd]">
                    Ritz Paris — 18 Novembre 2025 (2 Couverts réservés).
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded bg-[#f2ca50]/10 flex items-center justify-center text-[#f2ca50] shrink-0">
                  <span className="material-symbols-outlined text-base">search_check</span>
                </div>
                <div>
                  <p className="font-sans text-xs text-[#e5e2e3] uppercase tracking-wider font-medium">
                    Monographie Gübelin
                  </p>
                  <p className="font-sans text-[11px] text-[#ccc6bd]">
                    Expertise gemmologique annuelle à discrétion.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Main Dynamic Grid: Appointments on Left, Vault on Right */}
      <section className="w-full pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column: Appointments & Vernissages (7 COLS) */}
          {(activeTab === 'all' || activeTab === 'appointments') && (
            <div className={`space-y-6 ${activeTab === 'appointments' ? 'lg:col-span-12' : 'lg:col-span-7'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#f2ca50] text-xl">event_upcoming</span>
                  <h2 className="font-serif text-2xl text-[#e5e2e3]">Vernissages &amp; Présentations Réservées</h2>
                </div>
                <span className="font-sans text-[10px] text-[#f2ca50] uppercase tracking-widest bg-[#f2ca50]/10 px-2.5 py-1 rounded border border-[#f2ca50]/20 font-medium">
                  Confirmé Par Maître Morel
                </span>
              </div>

              {/* Appointments List */}
              {appointments.map((apt, idx) => (
                <div
                  key={apt.id || idx}
                  className="bg-[#201f20] p-6 rounded-xl shadow-xl space-y-5 border border-[#353436] relative overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-start justify-between gap-3 pb-4 bg-[#1c1b1c] -mx-6 -mt-6 p-6 border-b border-[#353436]">
                    <div className="space-y-1">
                      <span className="font-sans text-[11px] text-[#f2ca50] tracking-[0.22em] uppercase font-semibold">
                        {apt.sessionCode || `Séance Confidentielle #${idx + 1}`}
                      </span>
                      <h3 className="font-serif text-xl sm:text-2xl text-[#e5e2e3]">{apt.title}</h3>
                      <p className="font-sans text-xs text-[#ccc6bd]">{apt.salonLocation}</p>
                    </div>
                    <div className="flex flex-col md:items-end shrink-0">
                      <span className="font-serif text-lg text-[#f2ca50] font-medium">{apt.preferredDate}</span>
                      <span className="font-sans text-xs text-[#ccc6bd] uppercase">{apt.timeSlot}</span>
                    </div>
                  </div>

                  {/* Two-Column Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
                    <div className="relative rounded-lg overflow-hidden h-48 bg-[#0e0e0f] border border-[#353436]">
                      <img
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDRmQscHccvIjn2nit-KU4zNjwE5f3hMzUl-1veEL4s2XdZS5iG5WodVTSSUwn0ogD7bV1gYD5xVTqltHIRP2KWNZQbARLk32qUI_pgovzBvpQ3QhK6UvTvnMse29kaA0r--_Yo62FmYE7YqE_ow693uOR_bduvvx-YAvczSq5PsIhSaWkLmdagJh1taFlmwsIxrA3u8a7U4qWLBM-xJco8_4bIjNiFInq64AmM3-O82LSLNQgIpGZihw"
                        alt="Solitaire preview"
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute bottom-2 left-2 right-2 flex items-center justify-between text-xs">
                        <span className="font-sans text-[10px] tracking-wider uppercase bg-[#0e0e0f]/80 px-2 py-0.5 rounded text-[#e5e2e3]">
                          Pièce Présentée N° 1
                        </span>
                        <span className="font-sans text-[11px] text-[#f2ca50] font-medium bg-[#0e0e0f]/80 px-2 py-0.5 rounded">
                          14.28 ct VVS1
                        </span>
                      </div>
                    </div>

                    <div className="space-y-2.5 font-sans text-xs">
                      <div className="flex items-center justify-between p-2.5 rounded bg-[#1c1b1c] border border-[#353436]">
                        <span className="text-[#ccc6bd] flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#f2ca50]">shield</span>
                          Escorte Armée &amp; Chauffeur
                        </span>
                        <span className="font-sans text-[10px] text-[#f2ca50] uppercase font-semibold">
                          Activée (Hôtel Ritz)
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded bg-[#1c1b1c] border border-[#353436]">
                        <span className="text-[#ccc6bd] flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#f2ca50]">group</span>
                          Invités Autorisés
                        </span>
                        <span className="font-sans text-[10px] text-[#e5e2e3] uppercase">
                          {apt.guestsAllowed || '1 Accompagnant'}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-2.5 rounded bg-[#1c1b1c] border border-[#353436]">
                        <span className="text-[#ccc6bd] flex items-center gap-2">
                          <span className="material-symbols-outlined text-sm text-[#f2ca50]">wine_bar</span>
                          Accueil Champagne
                        </span>
                        <span className="font-sans text-[10px] text-[#e5e2e3] uppercase">
                          {apt.champagne || 'Dom Pérignon P2 2004'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Concierge Quote */}
                  {apt.quote && (
                    <div className="bg-[#1c1b1c] p-4 rounded-lg flex items-start gap-3 border border-[#353436]/60">
                      <span className="material-symbols-outlined text-[#f2ca50] text-base mt-0.5">format_quote</span>
                      <p className="font-sans text-xs text-[#ccc6bd] italic leading-relaxed">
                        {apt.quote}
                        <span className="block text-right text-[#f2ca50] not-italic font-sans text-[10px] uppercase mt-1">
                          — J.-P. Morel
                        </span>
                      </p>
                    </div>
                  )}

                  {/* Actions Ribbon */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => alert(`Rendez-vous du ${apt.preferredDate} ajouté à vos calendriers iCloud et Outlook sécurisés.`)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1c1b1c] hover:bg-[#2a2a2b] text-[#ccc6bd] hover:text-[#e5e2e3] font-sans text-[10px] uppercase tracking-wider transition-colors border border-[#353436]"
                      >
                        <span className="material-symbols-outlined text-sm">event</span>
                        Ajouter au Calendrier
                      </button>
                      <button
                        onClick={() => inspectPiece('piece-sol-invictus')}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded bg-[#1c1b1c] hover:bg-[#2a2a2b] text-[#f2ca50] font-sans text-[10px] uppercase tracking-wider transition-colors border border-[#353436]"
                      >
                        <span className="material-symbols-outlined text-sm">visibility</span>
                        Inspecter le Solitaire
                      </button>
                    </div>

                    <button
                      onClick={() => cancelAppointment(apt.id)}
                      className="text-[#99907c] hover:text-[#ffb4ab] font-sans text-[10px] uppercase tracking-widest transition-colors flex items-center gap-1"
                    >
                      <span>Annuler / Reporter</span>
                      <span className="material-symbols-outlined text-sm">close</span>
                    </button>
                  </div>
                </div>
              ))}

              {/* Solliciter un Salon Privé Trigger Card */}
              <div className="bg-[#1c1b1c] p-6 rounded-xl border border-[#353436] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <span className="font-sans text-[10px] text-[#99907c] uppercase tracking-widest font-semibold">
                    Désir Particulier
                  </span>
                  <p className="font-serif text-xl text-[#e5e2e3] mt-0.5">Solliciter un Salon Privé Personnalisé</p>
                  <p className="font-sans text-xs text-[#ccc6bd]">Paris, Monaco, Genève ou à votre résidence privée.</p>
                </div>
                <button
                  type="button"
                  onClick={() => setBookingModalOpen(true)}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2a2a2b] hover:bg-[#f2ca50] hover:text-[#3c2f00] text-[#f2ca50] px-5 py-2.5 rounded font-sans text-xs uppercase tracking-[0.18em] transition-all font-semibold border border-[#d4af37]/40 cursor-pointer"
                >
                  <span className="material-symbols-outlined text-sm">schedule_send</span>
                  Réserver une Séance
                </button>
              </div>
            </div>
          )}

          {/* Right Column: Mon Coffre & Patrimoine (5 COLS) */}
          {(activeTab === 'all' || activeTab === 'vault') && (
            <div className={`space-y-6 ${activeTab === 'vault' ? 'lg:col-span-12' : 'lg:col-span-5'}`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#f2ca50] text-xl">inventory_2</span>
                  <h2 className="font-serif text-2xl text-[#e5e2e3]">Mon Coffre &amp; Patrimoine</h2>
                </div>
                <button
                  onClick={() => alert("Inventaire Notarié délivré sous sceau par Maître de La Tour, Notaire à Paris.")}
                  className="font-sans text-[10px] text-[#f2ca50] uppercase tracking-widest hover:underline"
                >
                  Inventaire Notarié
                </button>
              </div>

              {/* Vault Summary Card */}
              <div className="bg-[#1c1b1c] p-6 rounded-xl space-y-3 border border-[#353436]">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-xs text-[#ccc6bd] uppercase">Valeur Assurée Déclarée</span>
                  <span className="material-symbols-outlined text-[#ccc6bd] text-base">verified_user</span>
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="font-serif text-3xl sm:text-4xl text-[#e5e2e3] tracking-tight font-medium">
                    {patronProfile.portfolioValue}
                  </span>
                  <span className="font-sans text-xs text-[#f2ca50] font-medium">
                    +12.4% (Index Gemmes Rares 2024-25)
                  </span>
                </div>
                <div className="flex items-center justify-between text-xs text-[#ccc6bd] pt-1 border-t border-[#353436]">
                  <span>3 Pièces Custodiales</span>
                  <span className="text-[#f2ca50]">1 En Cours d'Acquisition (Sol Invictus)</span>
                </div>
              </div>

              {/* Vault Pieces Bento */}
              {vaultPieces.map((piece) => (
                <div
                  key={piece.id}
                  className="bg-[#201f20] p-5 rounded-xl shadow-lg space-y-4 border border-[#353436]"
                >
                  <div className="flex gap-4">
                    <div className="w-24 h-28 rounded-lg overflow-hidden shrink-0 relative bg-[#0e0e0f] border border-[#353436]">
                      <img
                        src={piece.imageUrl}
                        alt={piece.title}
                        className="w-full h-full object-cover"
                      />
                      <span className={`absolute top-1 left-1 px-1.5 py-0.5 rounded text-[9px] font-sans uppercase font-semibold ${
                        piece.status === 'option_vip' 
                          ? 'bg-[#f2ca50] text-[#3c2f00]' 
                          : 'bg-[#0e0e0f]/90 text-[#f2ca50]'
                      }`}>
                        {piece.status === 'option_vip' ? 'Option VIP' : 'Custodie'}
                      </span>
                    </div>

                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-1">
                        <h4 className="font-serif text-xl text-[#e5e2e3] leading-tight">{piece.title}</h4>
                        <span className="font-sans text-xs text-[#f2ca50] font-medium shrink-0">
                          {piece.caratWeight}
                        </span>
                      </div>
                      <p className="font-sans text-xs text-[#ccc6bd] leading-relaxed">{piece.specs}</p>
                      <div className="pt-1 flex items-center gap-1.5 text-[#ccc6bd]">
                        <span className="material-symbols-outlined text-[13px] text-[#f2ca50]">location_on</span>
                        <span className="font-sans text-[11px]">{piece.location}</span>
                      </div>
                      {piece.reservedUntil && (
                        <div className="pt-0.5 flex items-center gap-1.5 text-[#f2ca50]">
                          <span className="material-symbols-outlined text-[13px]">lock_clock</span>
                          <span className="font-sans text-[11px]">Réservé jusqu'au {piece.reservedUntil}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Actions for Piece */}
                  <div className="pt-1 grid grid-cols-2 gap-2">
                    {piece.status === 'option_vip' ? (
                      <>
                        <button
                          onClick={() => alert("Acquisition confirmée. Votre contrat notarié a été acheminé à votre banque privée.")}
                          className="bg-[#f2ca50] text-[#3c2f00] hover:bg-[#ffe088] py-2 px-2.5 rounded text-center font-sans text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1 font-semibold cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-xs">gavel</span>
                          Finaliser l'Acquisition
                        </button>
                        <button
                          onClick={() => setModel3dOpen(true)}
                          className="bg-[#1c1b1c] hover:bg-[#2a2a2b] py-2 px-2.5 rounded text-[#e5e2e3] text-center font-sans text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1 border border-[#353436] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-xs text-[#f2ca50]">3d_rotation</span>
                          Modèle Facettes 3D
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleDiplomaticTransfer(piece.title)}
                          className="bg-[#1c1b1c] hover:bg-[#2a2a2b] py-2 px-2.5 rounded text-[#e5e2e3] text-center font-sans text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1 border border-[#353436] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-xs text-[#f2ca50]">local_shipping</span>
                          Transfert Diplomatique
                        </button>
                        <button
                          onClick={() => alert(`Certificat délivré par le laboratoire Gübelin de Lucerne : Réf. #${piece.gemReportNumber || '9811'}.`)}
                          className="bg-[#1c1b1c] hover:bg-[#2a2a2b] py-2 px-2.5 rounded text-[#e5e2e3] text-center font-sans text-[10px] uppercase tracking-wider transition-colors flex items-center justify-center gap-1 border border-[#353436] cursor-pointer"
                        >
                          <span className="material-symbols-outlined text-xs text-[#f2ca50]">description</span>
                          Certificat Gübelin
                        </button>
                      </>
                    )}
                  </div>
                </div>
              ))}

              {/* Dossier Juridique */}
              <div className="bg-[#1c1b1c] p-4 rounded-xl flex items-center justify-between border border-[#353436]">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded bg-[#201f20] flex items-center justify-center text-[#f2ca50]">
                    <span className="material-symbols-outlined text-xl">folder_shared</span>
                  </div>
                  <div>
                    <p className="font-sans text-xs text-[#e5e2e3] uppercase tracking-wider font-medium">
                      Dossier Juridique &amp; Assurances
                    </p>
                    <p className="font-sans text-[11px] text-[#ccc6bd]">Lloyd's of London — Police #VAULT-PAR-4820</p>
                  </div>
                </div>
                <button
                  onClick={() => alert("Téléchargement du dossier de police d'assurance Lloyd's scellé EAL-6+.")}
                  className="p-2 text-[#ccc6bd] hover:text-[#f2ca50] transition-colors"
                  title="Télécharger l'attestation"
                >
                  <span className="material-symbols-outlined text-xl">download</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Bottom Atelier Consultation Banner */}
      <section className="w-full pt-4">
        <div className="bg-gradient-to-r from-[#1c1b1c] via-[#201f20] to-[#1c1b1c] p-8 sm:p-10 rounded-xl shadow-2xl relative overflow-hidden border border-[#353436]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8 space-y-3">
              <span className="font-sans text-[11px] text-[#f2ca50] uppercase tracking-[0.22em] font-semibold">
                Haute Création &amp; Commande Spéciale
              </span>
              <h3 className="font-serif text-3xl text-[#e5e2e3]">
                Initier une Pièce Unique avec notre Premier Maître d’Atelier
              </h3>
              <p className="font-sans text-xs sm:text-sm text-[#ccc6bd] max-w-2xl font-light leading-relaxed">
                Votre statut impérial vous accorde l’accès exclusif aux tables de dessin d’Aurelia. Transformez une gemme brute rare en parure patrimoniale signée selon vos désirs.
              </p>
              <div className="flex flex-wrap items-center gap-6 pt-2 text-[#ccc6bd] font-sans text-xs">
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#f2ca50] text-sm">palette</span>
                  Gouaché Original Offert
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#f2ca50] text-sm">history_edu</span>
                  Gravure Secrète au Poinçon Impérial
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[#f2ca50] text-sm">token</span>
                  Livre d'Art Monographique Dédié
                </span>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-3 lg:items-end">
              <button
                type="button"
                onClick={() => setBookingModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] px-6 py-3.5 rounded font-sans text-xs uppercase tracking-[0.2em] font-semibold shadow-xl transition-all cursor-pointer"
              >
                <span className="material-symbols-outlined text-base">architecture</span>
                Ouvrir un Projet d'Atelier
              </button>
              <button
                type="button"
                onClick={() => setSignalModalOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-[#2a2a2b] hover:bg-[#353436] text-[#e5e2e3] px-6 py-3 rounded font-sans text-xs uppercase tracking-wider hover:text-[#f2ca50] transition-all border border-[#353436] cursor-pointer"
              >
                <span className="material-symbols-outlined text-sm">chat</span>
                Message Privé au Maître Joaillier
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Signal Encrypted Direct Line Modal */}
      {signalModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0e0e0f]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#201f20] p-6 sm:p-8 rounded-xl max-w-lg w-full shadow-2xl space-y-5 relative border border-[#d4af37]/40">
            <div className="flex items-center justify-between pb-2 border-b border-[#353436]">
              <div className="flex items-center gap-2 text-[#f2ca50]">
                <span className="material-symbols-outlined">encrypted</span>
                <span className="font-sans text-xs uppercase tracking-widest font-semibold">
                  Canal Direct Chiffré PGP 4096-bit
                </span>
              </div>
              <button
                onClick={() => setSignalModalOpen(false)}
                className="text-[#99907c] hover:text-[#e5e2e3]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>

            <div className="space-y-1">
              <h3 className="font-serif text-xl text-[#e5e2e3]">Liaison Privée avec M. Jean-Philippe Morel</h3>
              <p className="font-sans text-xs text-[#ccc6bd]">
                Protocole PGP End-to-End. Réponse sous 15 minutes garantie 24h/24.
              </p>
            </div>

            <form onSubmit={handleSendSignal} className="space-y-4">
              <div className="space-y-1">
                <label className="font-sans text-[10px] text-[#f2ca50] uppercase tracking-wider">
                  Nature du Message
                </label>
                <select
                  value={signalNature}
                  onChange={(e) => setSignalNature(e.target.value)}
                  className="w-full bg-[#1c1b1c] text-[#e5e2e3] text-xs rounded p-3 focus:outline-none border border-[#353436]"
                >
                  <option value="Demande d'Armored Delivery Immédiate">Demande d'Armored Delivery Immédiate</option>
                  <option value="Réservation Privatisée Place Vendôme">Réservation Privatisée Place Vendôme</option>
                  <option value="Acquisition Confidential Gem (Sol Invictus)">Acquisition Confidential Gem (Sol Invictus)</option>
                  <option value="Autre Demande Personnelle">Autre Demande Personnelle</option>
                </select>
              </div>

              <div className="space-y-1">
                <label className="font-sans text-[10px] text-[#ccc6bd] uppercase tracking-wider">
                  Instructions pour la Maison
                </label>
                <textarea
                  value={signalText}
                  onChange={(e) => setSignalText(e.target.value)}
                  rows={4}
                  placeholder="Écrivez votre consigne confidentielle..."
                  className="w-full bg-[#1c1b1c] text-[#e5e2e3] placeholder:text-[#99907c] text-xs rounded p-3 focus:outline-none border border-[#353436]"
                  required
                ></textarea>
              </div>

              <div className="flex items-center justify-between pt-2">
                <span className="font-sans text-[11px] text-[#ccc6bd] flex items-center gap-1">
                  <span className="material-symbols-outlined text-xs text-[#f2ca50]">lock</span> Chiffrement 4096-bit
                </span>
                <button
                  type="submit"
                  className="bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] px-6 py-2.5 rounded font-sans text-xs uppercase tracking-widest font-semibold transition-colors cursor-pointer"
                >
                  {signalSent ? 'Transmis ✓' : 'Transmettre'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Book Private Salon Modal from Dashboard */}
      {bookingModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0e0e0f]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1c1b1c] p-6 sm:p-8 rounded-xl max-w-lg w-full shadow-2xl space-y-5 border border-[#d4af37]/40">
            <div className="flex items-center justify-between pb-2 border-b border-[#353436]">
              <span className="font-sans text-xs uppercase text-[#f2ca50] tracking-widest font-semibold">
                Salon Privé Vendôme
              </span>
              <button
                onClick={() => setBookingModalOpen(false)}
                className="text-[#99907c] hover:text-[#e5e2e3]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <h3 className="font-serif text-2xl text-[#e5e2e3]">Solliciter une Séance Privatisée</h3>

            <form onSubmit={handleNewBooking} className="space-y-4 font-sans text-xs">
              <div>
                <label className="block text-[#ccc6bd] uppercase mb-1">Lieu Souhaité</label>
                <select
                  value={newLoc}
                  onChange={(e) => setNewLoc(e.target.value)}
                  className="w-full bg-[#201f20] text-[#e5e2e3] p-3 rounded border border-[#353436]"
                >
                  <option value="Paris — 26 Place Vendôme">Paris — 26 Place Vendôme</option>
                  <option value="Geneva — Salon Privé Rue du Rhône">Geneva — Salon Privé Rue du Rhône</option>
                  <option value="New York — Madison Avenue Penthouse">New York — Madison Avenue Penthouse</option>
                  <option value="Zürich — Private Suite">Zürich — Private Suite</option>
                  <option value="Résidence Privée du Patron">Résidence Privée du Patron</option>
                </select>
              </div>

              <div>
                <label className="block text-[#ccc6bd] uppercase mb-1">Date Préférée</label>
                <input
                  type="date"
                  value={newDate}
                  onChange={(e) => setNewDate(e.target.value)}
                  className="w-full bg-[#201f20] text-[#e5e2e3] p-3 rounded border border-[#353436]"
                  required
                />
              </div>

              <div>
                <label className="block text-[#ccc6bd] uppercase mb-1">Pièce d'intérêt ou Commission</label>
                <input
                  type="text"
                  value={newCreation}
                  onChange={(e) => setNewCreation(e.target.value)}
                  className="w-full bg-[#201f20] text-[#e5e2e3] p-3 rounded border border-[#353436]"
                  placeholder="e.g. Bague Sol Invictus ou Commande Spéciale"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 bg-[#f2ca50] text-[#3c2f00] font-sans text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#ffe088] transition-colors"
              >
                Confirmer la Séance
              </button>
            </form>
          </div>
        </div>
      )}

      {/* 3D Facet Turntable Viewer Modal */}
      {model3dOpen && (
        <div className="fixed inset-0 z-50 bg-[#0e0e0f]/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-[#1c1b1c] max-w-2xl w-full p-6 sm:p-8 rounded-xl shadow-2xl space-y-4 border border-[#d4af37]/40">
            <div className="flex items-center justify-between pb-2 border-b border-[#353436]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50]">3d_rotation</span>
                <span className="font-sans text-xs uppercase text-[#f2ca50] tracking-widest font-semibold">
                  Modèle Numérique Facettes 3D : Sol Invictus
                </span>
              </div>
              <button
                onClick={() => setModel3dOpen(false)}
                className="text-[#99907c] hover:text-[#e5e2e3]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="relative aspect-video w-full rounded overflow-hidden bg-[#0e0e0f] border border-[#353436] flex items-center justify-center">
              <div
                className="relative transition-transform duration-300 flex items-center justify-center"
                style={{ transform: `rotateY(${modelRotation}deg)` }}
              >
                <img
                  src="https://lh3.googleusercontent.com/aida/AEtjO1U7KXfSUcHT1_dMGDlipMp3S3zuHJ_7-qX_2reqQHLMQJn5Y-PkxFDHBCCqAJdaK4SMpdF2i6IiXCWLR7cuW7QLJQuu1T1VlpN5gNXNBJyptssqW_kILULyUnEG4bAw4Bd-JAlmh1Wkd6vdtV_wIzrrXfY-4rupnykl_mKGbO7fu8L8jZAiSjDg_iaLeCaPITSKWvjp_dcweAKBur6y7MD1FzaS11yY7d3qn4p84zjS-eoltESE"
                  alt="3D Turntable"
                  className={`max-h-64 object-contain ${modelWireframe ? 'contrast-200 invert opacity-80' : ''}`}
                />
                {modelWireframe && (
                  <div className="absolute inset-0 border border-[#f2ca50]/50 rounded pointer-events-none flex items-center justify-center">
                    <span className="font-mono text-[10px] text-[#f2ca50] bg-black/80 px-2 py-1">WIREFRAME CAD 0.01mm</span>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-4 font-sans text-xs">
              <div className="flex items-center gap-2 flex-1">
                <span className="text-[#99907c]">Rotation:</span>
                <input
                  type="range"
                  min="0"
                  max="360"
                  value={modelRotation}
                  onChange={(e) => setModelRotation(Number(e.target.value))}
                  className="w-full h-1 bg-[#353436] accent-[#f2ca50] rounded cursor-pointer"
                />
                <span className="font-mono text-[#f2ca50]">{modelRotation}°</span>
              </div>
              <button
                type="button"
                onClick={() => setModelWireframe(!modelWireframe)}
                className={`px-3 py-1.5 rounded text-[11px] uppercase tracking-wider border ${
                  modelWireframe ? 'bg-[#f2ca50] text-[#3c2f00] border-[#f2ca50]' : 'bg-[#201f20] text-[#ccc6bd] border-[#353436]'
                }`}
              >
                Mode Fil de Fer
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Diplomatic Transfer Confirmation Modal */}
      {transferModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0e0e0f]/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-[#1c1b1c] max-w-md w-full p-6 sm:p-8 rounded-xl shadow-2xl space-y-4 border border-[#353436]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50]">local_shipping</span>
                <h3 className="font-serif text-xl text-[#e5e2e3]">Ordre de Transfert Blindé</h3>
              </div>
              <button
                onClick={() => setTransferModalOpen(false)}
                className="text-[#99907c] hover:text-[#e5e2e3]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="font-sans text-xs text-[#ccc6bd] leading-relaxed">
              Voulez-vous dépêcher un convoi diplomatique avec escorte armée certifiée EAL-6+ pour la pièce : <strong>{selectedPieceTitle}</strong> ?
            </p>
            <div className="p-3 bg-[#201f20] rounded border border-[#353436] space-y-1 font-sans text-xs">
              <div className="flex justify-between">
                <span className="text-[#99907c]">Origine :</span>
                <span className="text-[#e5e2e3]">Coffre Fort Haute Sécurité Genève</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#99907c]">Destination :</span>
                <span className="text-[#f2ca50]">Sanctuaire 26 Place Vendôme, Paris</span>
              </div>
              <div className="flex justify-between">
                <span className="text-[#99907c]">Couverture :</span>
                <span className="text-[#e5e2e3]">100% Police Lloyd's of London</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                alert(`Ordre de convoi blindé émis pour ${selectedPieceTitle}. Départ sous 6 heures.`);
                setTransferModalOpen(false);
              }}
              className="w-full py-3 bg-[#f2ca50] text-[#3c2f00] font-sans text-xs uppercase tracking-widest font-semibold rounded hover:bg-[#ffe088]"
            >
              Signer le Mandat Diplomatique
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
