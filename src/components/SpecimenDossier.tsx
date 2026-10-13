import React, { useState } from 'react';
import { useMaison } from '../context/MaisonContext';

export const SpecimenDossier: React.FC = () => {
  const { setScreen, bookAppointment } = useMaison();

  // 40x Loupe Magnification
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [reticleActive, setReticleActive] = useState<boolean>(true);
  const [fullscreen, setFullscreen] = useState<boolean>(false);

  // Azimuth and Lighting modes
  const [activeAzimuth, setActiveAzimuth] = useState<string>('0° Table Facet');
  const [activeLight, setActiveLight] = useState<'daylight' | 'candlelight' | 'museum' | 'uv'>('daylight');

  // Blueprint drawer
  const [blueprintOpen, setBlueprintOpen] = useState<boolean>(false);

  // Reservation modal
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [patronHonorific, setPatronHonorific] = useState<string>('Comtesse de Valmont');
  const [liaisonContact, setLiaisonContact] = useState<string>('+33 6 42 68 00 00');
  const [salonLoc, setSalonLoc] = useState<string>('26 Place Vendôme, Paris');
  const [armoredTransport, setArmoredTransport] = useState<boolean>(true);
  const [bookingDispatched, setBookingDispatched] = useState<boolean>(false);

  // Background glow mapping
  const getAmbientStyle = () => {
    switch (activeLight) {
      case 'uv':
        return 'radial-gradient(circle at center, rgba(168, 85, 247, 0.28) 0%, transparent 65%)';
      case 'candlelight':
        return 'radial-gradient(circle at center, rgba(217, 119, 6, 0.25) 0%, transparent 65%)';
      case 'museum':
        return 'radial-gradient(circle at center, rgba(254, 240, 138, 0.22) 0%, transparent 65%)';
      default:
        return 'radial-gradient(circle at center, rgba(242, 202, 80, 0.16) 0%, transparent 65%)';
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await bookAppointment({
      title: 'Présentation Spécimen N° V-8891 : Sol Invictus Solitaire',
      salonLocation: salonLoc,
      preferredDate: '2025-05-18',
      timeSlot: '17:00 CET (Spectre Nordique)',
      creationsOfInterest: 'Sol Invictus Solitaire (14.28 ct Fancy Vivid Yellow)',
      armedEscort: armoredTransport,
      quote: `Réservation pour ${patronHonorific}. Convoi blindé : ${armoredTransport ? 'Activé' : 'Non requis'}.`,
    });
    setBookingDispatched(true);
    setTimeout(() => {
      setBookingDispatched(false);
      setModalOpen(false);
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full bg-[#131314] text-[#e5e2e3] min-h-screen pt-20">
      {/* =========================================================================
          TOP CONCIERGE & TELEMETRY NAV BAR
      ========================================================================= */}
      <div className="w-full bg-[#0e0e0f]/90 border-b border-[#201f20] px-4 sm:px-8 lg:px-16 py-3">
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4">
          {/* Breadcrumb Hierarchy */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 font-sans text-xs text-[#99907c] uppercase tracking-[0.2em]">
              <button onClick={() => setScreen('gateway')} className="hover:text-[#f2ca50] transition-colors cursor-pointer">
                Le Cercle Privé
              </button>
              <span className="text-[#4d4635] text-[10px]">/</span>
              <button onClick={() => setScreen('cinematic')} className="hover:text-[#f2ca50] transition-colors cursor-pointer">
                The High Creations
              </button>
              <span className="text-[#4d4635] text-[10px]">/</span>
              <span className="text-[#ccc6bd] font-medium">Specimen N° V-8891</span>
              <span className="text-[#4d4635] text-[10px]">/</span>
              <span className="text-[#f2ca50] font-medium tracking-widest">Sol Invictus Solitaire</span>
            </div>

            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[#201f20] text-[#d0c5af] font-sans text-xs border border-[#353436]">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f2ca50] opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-[#f2ca50]"></span>
              </span>
              <span className="tracking-wider uppercase font-sans text-[10px] text-[#e5e2e3] font-semibold">
                Custodial Reserve
              </span>
              <span className="text-[#99907c] text-[11px]">— On Temporary Hold for Comtesse de Valmont</span>
            </div>
          </div>

          {/* Quick Action Utilities */}
          <div className="flex items-center gap-3 self-start xl:self-auto">
            <button
              onClick={() => setScreen('cinematic')}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1c1b1c] hover:bg-[#201f20] text-[#d0c5af] hover:text-[#f2ca50] transition-all rounded font-sans text-[11px] uppercase tracking-wider border border-[#353436] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">keyboard_backspace</span>
              <span>Return to Main Reel</span>
            </button>
            <button
              onClick={() => alert("Monographie Gübelin #9811 : Rapport minéralogique complet avec spectrogramme d'absorption FTIR téléchargeable.")}
              className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#1c1b1c] hover:bg-[#201f20] text-[#d0c5af] hover:text-[#f2ca50] transition-all rounded font-sans text-[11px] uppercase tracking-wider border border-[#353436] cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">description</span>
              <span>Certified Gübelin Monograph</span>
            </button>
            <button
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-sans text-[11px] uppercase tracking-wider font-semibold transition-all shadow-md cursor-pointer"
            >
              <span className="material-symbols-outlined text-[16px]">visibility</span>
              <span>Schedule Viewing</span>
            </button>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN CINEMATIC INSPECTION STAGE (Bento / Two-Column Master View)
      ========================================================================= */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* LEFT COLUMN: MACRO GEMOLOGICAL VITRINE & INTERACTIVE HUD (7 COLS) */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            {/* Primary Viewport Canvas */}
            <div
              className={`relative w-full aspect-[4/3] bg-[#0e0e0f] rounded-lg overflow-hidden shadow-2xl flex items-center justify-center border border-[#353436] group ${
                fullscreen ? 'fixed inset-4 z-50 aspect-auto h-auto' : ''
              }`}
            >
              {/* Dynamic Ambient Underglow */}
              <div
                className="absolute inset-0 pointer-events-none transition-all duration-700"
                style={{ background: getAmbientStyle() }}
              ></div>

              {/* High Jewelry Visual Specimen with dynamic Loupe zoom */}
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuAY2Fnny4isuEUkatFH1BFLA7nwpuDhVZjdnq4HvBmE7TDE9_YC8w_YHRDWWwRyh7lynb305QRta172T3w7LDRFaZu16AB0YW97AprqVk31k4dGqlVAHMfb5gyi6GFadMMEP862hZUrjtT1Bt6xTCb8eYb4J-ram9n8Osge3BpE48R293MxzGt-Xb0Pcfpoou6og6GRNM4vK5C6kTEGCqCRcn-cxRBY8evNei2s1fLIqGDdf-Hi_KA_PA"
                alt="The Sol Invictus Solitaire Macro View"
                className="w-full h-full object-cover select-none transition-transform duration-300 ease-out"
                style={{
                  transform: `scale(${1 + (zoomLevel - 1) * 0.075})`,
                  filter: activeLight === 'uv' ? 'hue-rotate(240deg) saturate(180%) contrast(125%)' : undefined,
                }}
              />

              {/* Optical Reticle / Laser GIA Grid Overlay */}
              {reticleActive && (
                <div className="absolute inset-0 pointer-events-none transition-opacity duration-300">
                  {/* Subtle Grid Points */}
                  <div className="absolute inset-0 bg-[radial-gradient(#d4af37_1px,transparent_1px)] [background-size:32px_32px] opacity-25"></div>

                  {/* Center Alignment Box */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="relative w-48 h-56 border border-[#f2ca50]/30">
                      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-[#f2ca50] -translate-x-0.5 -translate-y-0.5"></div>
                      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-[#f2ca50] translate-x-0.5 -translate-y-0.5"></div>
                      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-[#f2ca50] -translate-x-0.5 translate-y-0.5"></div>
                      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-[#f2ca50] translate-x-0.5 translate-y-0.5"></div>

                      {/* Micro Inscription Marker */}
                      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 bg-[#0e0e0f]/85 px-2 py-0.5 rounded text-[9px] font-mono tracking-widest text-[#f2ca50] flex items-center gap-1 border border-[#f2ca50]/40">
                        <span className="material-symbols-outlined text-[10px]">barcode_reader</span>
                        GIA : 221849021
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Viewport Top Telemetry Tags */}
              <div className="absolute top-4 left-4 flex flex-col gap-1 pointer-events-none">
                <div className="flex items-center gap-2 bg-[#0e0e0f]/85 backdrop-blur-md px-2.5 py-1 rounded border border-[#353436]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse"></span>
                  <span className="font-sans text-[10px] uppercase tracking-widest text-[#e5e2e3] font-semibold">
                    Sensor: Multi-Spectral 8K
                  </span>
                </div>
                <div className="font-sans text-[9px] tracking-widest text-[#99907c] uppercase pl-1">
                  Field Depth: f/4.0 Macro • Polarization 98%
                </div>
              </div>

              {/* Viewport Control Buttons */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setReticleActive(!reticleActive)}
                  className={`p-2 rounded backdrop-blur-md transition-colors border ${
                    reticleActive
                      ? 'bg-[#201f20] text-[#f2ca50] border-[#f2ca50]/50'
                      : 'bg-[#0e0e0f]/80 text-[#99907c] border-[#353436]'
                  }`}
                  title="Toggle Optical Reticle"
                >
                  <span className="material-symbols-outlined text-[18px]">grid_4x4</span>
                </button>
                <button
                  type="button"
                  onClick={() => setFullscreen(!fullscreen)}
                  className="bg-[#0e0e0f]/80 hover:bg-[#201f20] text-[#ccc6bd] hover:text-[#f2ca50] p-2 rounded backdrop-blur-md transition-colors border border-[#353436]"
                  title="Toggle Fullscreen"
                >
                  <span className="material-symbols-outlined text-[18px]">
                    {fullscreen ? 'close_fullscreen' : 'fullscreen'}
                  </span>
                </button>
              </div>

              {/* Interactive 40x Gemological Loupe Zoom Bar Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0e0e0f]/85 backdrop-blur-md px-4 py-2.5 rounded flex items-center justify-between gap-4 border border-[#353436]">
                <div className="flex items-center gap-2 min-w-max">
                  <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">zoom_in</span>
                  <span className="font-sans text-[10px] uppercase text-[#e5e2e3] tracking-widest font-semibold">
                    Loupe Magnification
                  </span>
                </div>
                <div className="flex-1 flex items-center gap-3 max-w-xs">
                  <span className="text-[10px] text-[#99907c] font-sans">1X</span>
                  <input
                    type="range"
                    min="1"
                    max="40"
                    step="0.5"
                    value={zoomLevel}
                    onChange={(e) => setZoomLevel(parseFloat(e.target.value))}
                    className="w-full accent-[#f2ca50] h-1 bg-[#353436] rounded cursor-pointer"
                  />
                  <span className="text-[10px] text-[#99907c] font-sans">40X</span>
                </div>
                <div className="font-mono text-xs text-[#f2ca50] bg-[#2a2a2b] px-2 py-0.5 rounded tracking-wider border border-[#4d4635]">
                  {zoomLevel.toFixed(1)}X
                </div>
              </div>
            </div>

            {/* Azimuth & Spectral Simulator Controller Bar */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-3 bg-[#1c1b1c] p-4 rounded border border-[#353436]">
              {/* Azimuth 360 Rotation Tabs */}
              <div className="md:col-span-7 flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-sans text-[11px] uppercase text-[#99907c] tracking-wider flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-[14px] text-[#f2ca50]">360</span>
                    Photogrammetric Azimuth
                  </span>
                  <span className="font-mono text-[10px] text-[#d0c5af]">{activeAzimuth}</span>
                </div>
                <div className="grid grid-cols-4 gap-1.5">
                  {[
                    { label: '0° Table', fullName: '0° Table Facet' },
                    { label: '90° Pavilion', fullName: '90° Pavilion Angle' },
                    { label: '180° Micro-Pavé', fullName: '180° Micro-Pavé Shank' },
                    { label: '270° Under-Girdle', fullName: '270° Under-Girdle Well' },
                  ].map((item) => (
                    <button
                      key={item.label}
                      type="button"
                      onClick={() => setActiveAzimuth(item.fullName)}
                      className={`px-2 py-2 font-sans text-[10px] uppercase tracking-wider text-center rounded transition-all cursor-pointer ${
                        activeAzimuth === item.fullName
                          ? 'bg-[#201f20] text-[#f2ca50] border border-[#f2ca50]/50 font-semibold'
                          : 'bg-[#0e0e0f] text-[#d0c5af] hover:text-[#e5e2e3] border border-transparent'
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Light Source Spectral Simulator */}
              <div className="md:col-span-5 flex flex-col gap-2">
                <span className="font-sans text-[11px] uppercase text-[#99907c] tracking-wider flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-[14px] text-[#f2ca50]">wb_twilight</span>
                  Illumination Spectrum
                </span>
                <div className="grid grid-cols-2 gap-1.5">
                  <button
                    type="button"
                    onClick={() => setActiveLight('daylight')}
                    className={`px-2 py-2 font-sans text-[10px] uppercase tracking-wider text-center rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeLight === 'daylight'
                        ? 'bg-[#201f20] text-[#f2ca50] border border-[#f2ca50]/50 font-semibold'
                        : 'bg-[#0e0e0f] text-[#d0c5af] border border-transparent'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-200"></span>
                    5500K Sun
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLight('candlelight')}
                    className={`px-2 py-2 font-sans text-[10px] uppercase tracking-wider text-center rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeLight === 'candlelight'
                        ? 'bg-[#201f20] text-[#f2ca50] border border-[#f2ca50]/50 font-semibold'
                        : 'bg-[#0e0e0f] text-[#d0c5af] border border-transparent'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-amber-600"></span>
                    2400K Salon
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLight('museum')}
                    className={`px-2 py-2 font-sans text-[10px] uppercase tracking-wider text-center rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeLight === 'museum'
                        ? 'bg-[#201f20] text-[#f2ca50] border border-[#f2ca50]/50 font-semibold'
                        : 'bg-[#0e0e0f] text-[#d0c5af] border border-transparent'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-yellow-400"></span>
                    Spotlight
                  </button>
                  <button
                    type="button"
                    onClick={() => setActiveLight('uv')}
                    className={`px-2 py-2 font-sans text-[10px] uppercase tracking-wider text-center rounded transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                      activeLight === 'uv'
                        ? 'bg-[#201f20] text-[#a855f7] border border-[#a855f7]/50 font-semibold'
                        : 'bg-[#0e0e0f] text-[#d0c5af] border border-transparent'
                    }`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-violet-400"></span>
                    UV Fluoresce
                  </button>
                </div>
              </div>
            </div>

            {/* Spectral Metric Bar */}
            <div className="p-3 bg-[#0e0e0f] rounded flex flex-wrap items-center justify-between gap-4 border border-[#353436]">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded bg-[#201f20] flex items-center justify-center text-[#f2ca50]">
                  <span className="material-symbols-outlined text-[20px]">flare</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-sans text-[11px] uppercase text-[#e5e2e3] font-semibold">
                    Light Return Index
                  </span>
                  <span className="font-mono text-xs text-[#ccc6bd]">
                    99.4% Fire &amp; Scintillation Equivalence
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-6 text-xs">
                <div className="text-right">
                  <span className="font-sans text-[9px] uppercase text-[#99907c] block">Fluorescence</span>
                  <span className="font-mono text-[#e5e2e3]">None / Faint Nil</span>
                </div>
                <div className="text-right">
                  <span className="font-sans text-[9px] uppercase text-[#99907c] block">Culet Dimension</span>
                  <span className="font-mono text-[#e5e2e3]">Pointed (0.00%)</span>
                </div>
                <div className="text-right">
                  <span className="font-sans text-[9px] uppercase text-[#99907c] block">Girdle Thickness</span>
                  <span className="font-mono text-[#f2ca50]">Med to Sl. Thick</span>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: GEM SPECIMEN DOSSIER & PROVENANCE RECORD (5 COLS) */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            {/* Specimen Header */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded bg-[#d4af37] text-[#554300] font-sans text-[10px] tracking-widest uppercase font-semibold">
                  Piece Unique • Archive 2025
                </span>
                <span className="font-sans text-[11px] text-[#99907c] uppercase tracking-wider">
                  Lot 142 • Place Vendôme
                </span>
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#e5e2e3] tracking-tight leading-tight">
                The Sol Invictus Solitaire
              </h1>
              <p className="font-serif text-lg text-[#f2ca50] italic">
                14.28 Carat Fancy Vivid Yellow • Modified Emerald Cut
              </p>
            </div>

            {/* Editorial Provenance */}
            <div className="bg-[#1c1b1c] p-4 rounded flex flex-col gap-2 border border-[#353436]">
              <span className="font-sans text-[11px] uppercase text-[#99907c] tracking-widest font-semibold">
                Curatorial Provenance &amp; Devotion
              </span>
              <p className="font-sans text-xs sm:text-sm text-[#d0c5af] leading-relaxed font-light">
                Unearthed from historic South African alluvial gravels in the late 20th century, the rough octahedral crystal was quietly preserved untouched for nearly three decades before its crystallographic planes were unlocked. Sculpted through <strong className="text-[#e5e2e3] font-normal">380 hours of hand-chiseled devotion</strong> at the Aurelia High Atelier at 26 Place Vendôme, it mirrors the zenith of the sun at the summer solstice.
              </p>
            </div>

            {/* 4 Cs Ledger */}
            <div className="bg-[#0e0e0f] p-4 rounded flex flex-col gap-3 border border-[#353436]">
              <div className="flex items-center justify-between pb-1 border-b border-[#201f20]">
                <span className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#e5e2e3] font-semibold">
                  Gemological Ledger &amp; Specifications
                </span>
                <span className="material-symbols-outlined text-[#f2ca50] text-[18px]">verified</span>
              </div>
              <div className="grid grid-cols-2 gap-2.5">
                <div className="p-3 bg-[#201f20] rounded flex flex-col border border-[#353436]">
                  <span className="font-sans text-[9px] uppercase text-[#99907c]">Carat Weight</span>
                  <span className="font-serif text-xl text-[#f2ca50] mt-0.5">14.28 ct</span>
                  <span className="font-sans text-[11px] text-[#d0c5af]">Spread Factor: 1.04 mm/ct</span>
                </div>
                <div className="p-3 bg-[#201f20] rounded flex flex-col border border-[#353436]">
                  <span className="font-sans text-[9px] uppercase text-[#99907c]">Color Saturation</span>
                  <span className="font-serif text-xl text-[#e5e2e3] mt-0.5">Fancy Vivid</span>
                  <span className="font-sans text-[11px] text-[#d0c5af]">Even Golden Canary Tint</span>
                </div>
                <div className="p-3 bg-[#201f20] rounded flex flex-col border border-[#353436]">
                  <span className="font-sans text-[9px] uppercase text-[#99907c]">Clarity Grade</span>
                  <span className="font-serif text-xl text-[#e5e2e3] mt-0.5">IF</span>
                  <span className="font-sans text-[11px] text-[#d0c5af]">Internally Flawless (10x Loupe)</span>
                </div>
                <div className="p-3 bg-[#201f20] rounded flex flex-col border border-[#353436]">
                  <span className="font-sans text-[9px] uppercase text-[#99907c]">Cut &amp; Polish</span>
                  <span className="font-serif text-xl text-[#f2ca50] mt-0.5">Ex / Ex</span>
                  <span className="font-sans text-[11px] text-[#d0c5af]">Zero Dispersion Deviation</span>
                </div>
              </div>

              {/* Mounting Spec */}
              <div className="p-3 bg-[#201f20] rounded flex flex-col gap-1 border border-[#353436]">
                <span className="font-sans text-[9px] uppercase text-[#99907c]">Mounting &amp; Pavé Architecture</span>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-[#e5e2e3]">Platinum 950 &amp; 18K Auric Yellow Gold</span>
                  <span className="font-mono text-[#f2ca50]">142 Brilliant Melee</span>
                </div>
                <p className="font-sans text-[11px] text-[#d0c5af] font-light">
                  Micro-bead pavé set with 1.92 ctw of D-Flawless round cut side stones, contoured to minimize light loss under the yellow core.
                </p>
              </div>
            </div>

            {/* Certified Dual Monograph Verification Block */}
            <div className="bg-[#1c1b1c] p-4 rounded flex flex-col gap-2 border border-[#353436]">
              <div className="flex items-center justify-between">
                <span className="font-sans text-[11px] uppercase text-[#99907c] tracking-wider font-semibold">
                  Certified Verification Dossiers
                </span>
                <span className="font-sans text-[10px] text-[#f2ca50] uppercase font-medium">Seal Confirmed</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div
                  onClick={() => alert("GIA Diamond Report #221849021 vérifié auprès de Carlsbad. Inscription laser confirmée.")}
                  className="bg-[#201f20] hover:bg-[#2a2a2b] p-3 rounded flex items-start gap-3 transition-colors cursor-pointer border border-[#353436]"
                >
                  <span className="material-symbols-outlined text-[#f2ca50] text-[20px] mt-0.5">verified_user</span>
                  <div className="flex flex-col">
                    <span className="font-sans text-xs text-[#e5e2e3] font-semibold">GIA Diamond Report</span>
                    <span className="font-mono text-[10px] text-[#99907c]">#221849021 • Carlsbad</span>
                    <span className="font-sans text-[9px] text-[#ccc6bd] uppercase mt-1">Full Laser Inscribed</span>
                  </div>
                </div>

                <div
                  onClick={() => alert("Gübelin Gem Lab Lucerne : Provenance Dossier N° 9811 validé avec cachet de cire.")}
                  className="bg-[#201f20] hover:bg-[#2a2a2b] p-3 rounded flex items-start gap-3 transition-colors cursor-pointer border border-[#353436]"
                >
                  <span className="material-symbols-outlined text-[#f2ca50] text-[20px] mt-0.5">history_edu</span>
                  <div className="flex flex-col">
                    <span className="font-sans text-xs text-[#e5e2e3] font-semibold">Gübelin Gem Lab</span>
                    <span className="font-mono text-[10px] text-[#99907c]">Dossier N° 9811</span>
                    <span className="font-sans text-[9px] text-[#ccc6bd] uppercase mt-1">Lucerne Seal of Authenticity</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          SAVOIR-FAIRE & CHRONOLOGY (De la Pierre Brute au Chef-d'Œuvre)
      ========================================================================= */}
      <div className="w-full px-4 sm:px-8 lg:px-16 py-16 bg-[#0e0e0f] border-t border-[#201f20]">
        <div className="flex flex-col gap-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="flex flex-col gap-1 max-w-xl">
              <span className="font-sans text-[11px] uppercase tracking-[0.25em] text-[#f2ca50] font-semibold">
                Savoir-Faire &amp; Chronology
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#e5e2e3]">
                De la Pierre Brute au Chef-d'Œuvre
              </h2>
              <p className="font-sans text-xs sm:text-sm text-[#d0c5af] font-light">
                From tectonic gestation to the micro-faceting benches of Place Vendôme: every milestone recorded in the Maison's registry.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setBlueprintOpen(!blueprintOpen)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#201f20] hover:bg-[#2a2a2b] text-[#e5e2e3] hover:text-[#f2ca50] transition-all rounded border border-[#353436] font-sans text-xs uppercase tracking-wider cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">architecture</span>
              <span>{blueprintOpen ? 'Hide Prong Blueprint' : 'Inspect Prong Blueprint'}</span>
            </button>
          </div>

          {/* 4 Chronological Milestone Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stage I */}
            <div className="bg-[#1c1b1c] p-4 rounded flex flex-col justify-between gap-4 group hover:bg-[#201f20] transition-all border border-[#353436]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#f2ca50]">01 / CHRONO</span>
                  <span className="font-sans text-[10px] text-[#99907c] uppercase">Kimberley, 1989</span>
                </div>
                <div className="w-full aspect-[4/3] rounded overflow-hidden bg-[#0e0e0f] relative my-1">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNxYRoJXqoJjIjfZcYJNELMyZ8AVCUHzOg-xcStClaiTWr449XsD6aj1zSJSVeXGq9duqxO7jthcruVow7ReTNLHUn9oIW42GgPVrrqKK3kDn56ErrPDfa5Exc9J-syeLZzrnknmELPuCFbu5uEkizsEUKrlY9EoJ13rUQz0ZyMxE-jZuFm2twKTrSaEtxdVzquvjQ4SZoju9XBzzDPlAP0nKbm6twGQ4pUDi39SBOHG5Y3zRdpiN9Fw"
                    alt="Rough Canary Diamond"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-transparent to-transparent"></div>
                </div>
                <h3 className="font-serif text-lg text-[#e5e2e3]">Discovery &amp; Spectral Analysis</h3>
                <p className="font-sans text-xs text-[#d0c5af] font-light leading-relaxed">
                  Excavated as a 38.6 carat raw rough crystalline octahedron. Infrared spectrometry confirms Type Ib nitrogen aggregation.
                </p>
              </div>
              <div className="pt-2 border-t border-[#353436]">
                <span className="font-mono text-xs text-[#ccc6bd]">38.60 ct → Initial Mass</span>
              </div>
            </div>

            {/* Stage II */}
            <div className="bg-[#1c1b1c] p-4 rounded flex flex-col justify-between gap-4 group hover:bg-[#201f20] transition-all border border-[#353436]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#f2ca50]">02 / CHRONO</span>
                  <span className="font-sans text-[10px] text-[#99907c] uppercase">Paris, 2014</span>
                </div>
                <div className="w-full aspect-[4/3] rounded overflow-hidden bg-[#0e0e0f] relative my-1">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuDNOoyRG7fPxzXWrGxp8mYKDVLr9AjvBXb-T4hpAV9Od7ZVB7HmgK7F3SRiX3unGdOQaE_LcMWs2oRx5GHBqpi7kjJDW2gEEGYLRwv9B1syP4yICmIoLYw9-B1esfNzUhRbak42qyjTK6X2zGdd9YE_tK_4X7SQlixM_-QcGXmo1SYFh5kAa7M1oyqhAkUEuRuJepvVUOnalpVWIdyR4bTRNG26tYBRjEXzwwTwrPfue89Ys10mhP3JYA"
                    alt="Gouache Jewelry Sketch"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-transparent to-transparent"></div>
                </div>
                <h3 className="font-serif text-lg text-[#e5e2e3]">Architectural Gouache Drawing</h3>
                <p className="font-sans text-xs text-[#d0c5af] font-light leading-relaxed">
                  Master Jean-Philippe Morel drafts the four-pillar tapered claw structure on parchment, balancing the pavilion's light well.
                </p>
              </div>
              <div className="pt-2 border-t border-[#353436]">
                <span className="font-mono text-xs text-[#ccc6bd]">J-P Morel • Drawing #48</span>
              </div>
            </div>

            {/* Stage III */}
            <div className="bg-[#1c1b1c] p-4 rounded flex flex-col justify-between gap-4 group hover:bg-[#201f20] transition-all border border-[#353436]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#f2ca50]">03 / CHRONO</span>
                  <span className="font-sans text-[10px] text-[#99907c] uppercase">Antwerp, 2018</span>
                </div>
                <div className="w-full aspect-[4/3] rounded overflow-hidden bg-[#0e0e0f] relative my-1">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuCqMTK1Bcgqvo7TiqTzNz8xuid6akNKmjk0NXKwEEFdm6k6wqU3O0VmV_rh1yXUrDX2NEIowy0WAa2rCM1PFbc_R6JyjSthaytGGUkGtlAE4oOvkrhQGseB9JWKvhvChG0pK5cJYkTn3gmYhqNYnkVThxFuuinq3rZVcWiieUxqQ7MfTWCYJ_PGqc_D7BJQXASibcLwSTFS7TwTq3_RT1AoRJkn_keOaXKUqLdJoc08qPsf1w_WRTYIZw"
                    alt="Laser Diamond Faceting"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-transparent to-transparent"></div>
                </div>
                <h3 className="font-serif text-lg text-[#e5e2e3]">Laser Cleaving &amp; Facet Angle</h3>
                <p className="font-sans text-xs text-[#d0c5af] font-light leading-relaxed">
                  112 painstaking cutting cycles across 9 months to isolate the internally flawless 14.28 carat core without color dilution.
                </p>
              </div>
              <div className="pt-2 border-t border-[#353436]">
                <span className="font-mono text-xs text-[#ccc6bd]">Yield: 37.0% • Perfect Axis</span>
              </div>
            </div>

            {/* Stage IV */}
            <div className="bg-[#1c1b1c] p-4 rounded flex flex-col justify-between gap-4 group hover:bg-[#201f20] transition-all border border-[#353436]">
              <div className="flex flex-col gap-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#f2ca50]">04 / CHRONO</span>
                  <span className="font-sans text-[10px] text-[#99907c] uppercase">Place Vendôme, 2024</span>
                </div>
                <div className="w-full aspect-[4/3] rounded overflow-hidden bg-[#0e0e0f] relative my-1">
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuADT6tV7xD1UICYmZJ4VaHT6aV5JJ-ScaNLc2VuU_29cK9DLRQ0GiOlL4KhSNcIfdM4WeJnw4q_b2WfST6exl3EIzLm5S_nFv_fuLrHKSsPI0Ja3JHqa08HIxL0xKzFnp4F-1IkM8wrr3pBxn1e7kBphEERHcbOZxQ_4sWbO8AzftjU33BkCsQrDuS6J66McVUcZx7J6Z26o2jr-TUsMlgK53Xns3iJN22wVFLctcz2DgHuWwiF2nXfbw"
                    alt="Atelier Micro-Setting"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-transparent to-transparent"></div>
                </div>
                <h3 className="font-serif text-lg text-[#e5e2e3]">Micro-Grain Pavilion Setting</h3>
                <p className="font-sans text-xs text-[#d0c5af] font-light leading-relaxed">
                  Platinum 950 claw burnishing with 142 micro-pave melee gems bead-set under microscope with zero visible metal overlap.
                </p>
              </div>
              <div className="pt-2 border-t border-[#353436]">
                <span className="font-mono text-xs text-[#f2ca50]">380 Atelier Hours</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Architectural Blueprint Accordion Drawer */}
      {blueprintOpen && (
        <div className="w-full px-4 sm:px-8 lg:px-16 py-6 bg-[#1c1b1c] border-t border-[#353436]">
          <div className="bg-[#0e0e0f] p-6 rounded flex flex-col gap-4 border border-[#353436]">
            <div className="flex items-center justify-between pb-2 border-b border-[#201f20]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50] text-[20px]">straighten</span>
                <span className="font-serif text-lg text-[#e5e2e3]">
                  Atelier Micro-Engineering Dimensions: Plate #440-B
                </span>
              </div>
              <button
                onClick={() => setBlueprintOpen(false)}
                className="text-[#99907c] hover:text-[#e5e2e3]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 font-sans text-xs text-[#d0c5af]">
              <div className="p-4 bg-[#201f20] rounded flex flex-col gap-1 border border-[#353436]">
                <span className="text-[#f2ca50] font-sans text-[10px] uppercase font-semibold">TAPER PROFILE</span>
                <span className="text-[#e5e2e3] font-semibold text-sm">0.85mm Double-Claw Taper</span>
                <p className="text-[11px] text-[#ccc6bd]">
                  Cast in 18K Yellow Gold to eliminate cold-metal refraction against the corner cut facets.
                </p>
              </div>
              <div className="p-4 bg-[#201f20] rounded flex flex-col gap-1 border border-[#353436]">
                <span className="text-[#f2ca50] font-sans text-[10px] uppercase font-semibold">ANTI-TWIST ANATOMY</span>
                <span className="text-[#e5e2e3] font-semibold text-sm">Comfort D-Shape Ergonomic Shank</span>
                <p className="text-[11px] text-[#ccc6bd]">
                  Interior counter-weighted platinum arch prevents rotation on the finger during wear.
                </p>
              </div>
              <div className="p-4 bg-[#201f20] rounded flex flex-col gap-1 border border-[#353436]">
                <span className="text-[#f2ca50] font-sans text-[10px] uppercase font-semibold">LIGHT CLEARANCE</span>
                <span className="text-[#e5e2e3] font-semibold text-sm">4.12mm Under-Culet Well</span>
                <p className="text-[11px] text-[#ccc6bd]">
                  Enables 360-degree ambient luminescence to traverse the deep step pavilion unchecked.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Persistent Bottom Concierge Acquisition Dock */}
      <div className="sticky bottom-0 z-40 w-full bg-[#1c1b1c]/95 backdrop-blur-md px-4 sm:px-8 lg:px-16 py-4 border-t border-[#353436] shadow-2xl">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="w-12 h-12 rounded bg-[#201f20] flex items-center justify-center text-[#f2ca50] shrink-0 border border-[#353436]">
              <span className="material-symbols-outlined text-[24px]">lock</span>
            </div>
            <div className="flex flex-col">
              <span className="font-sans text-[10px] uppercase text-[#99907c] tracking-wider font-semibold">
                Custodial Reserve • Place Vendôme Vault N° 4
              </span>
              <div className="flex flex-wrap items-baseline gap-2">
                <span className="font-serif text-lg sm:text-xl text-[#e5e2e3] leading-none">
                  Acquisition on Private Request
                </span>
                <span className="font-mono text-xs sm:text-sm text-[#f2ca50]">
                  (Ref. Guide €3,850,000 — €4,100,000)
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 w-full lg:w-auto justify-end">
            <a
              href="tel:+33142680000"
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-[#201f20] hover:bg-[#2a2a2b] text-[#e5e2e3] hover:text-[#f2ca50] transition-all rounded border border-[#353436]"
            >
              <span className="material-symbols-outlined text-[18px] text-[#f2ca50]">phone_in_talk</span>
              <div className="flex flex-col text-left">
                <span className="font-sans text-[9px] uppercase tracking-wider text-[#99907c]">Direct Line</span>
                <span className="font-sans text-xs uppercase text-[#e5e2e3] font-medium">M. Jean-Philippe Morel</span>
              </div>
            </a>
            <button
              type="button"
              onClick={() => setModalOpen(true)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all shadow-xl rounded cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">verified</span>
              <span>Reserve Salon Presentation</span>
            </button>
          </div>
        </div>
      </div>

      {/* Confidential Viewing Reservation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0e0e0f]/95 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-[#1c1b1c] p-6 sm:p-8 rounded-xl shadow-2xl relative flex flex-col gap-5 border border-[#d4af37]/40">
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-6 right-6 text-[#99907c] hover:text-[#e5e2e3]"
            >
              <span className="material-symbols-outlined text-[24px]">close</span>
            </button>

            <div className="flex flex-col gap-1">
              <span className="font-sans text-[10px] uppercase tracking-widest text-[#f2ca50] font-semibold">
                Salon de Prestige Privé • Place Vendôme
              </span>
              <h3 className="font-serif text-2xl text-[#e5e2e3]">Confidential Viewing Request</h3>
              <p className="font-sans text-xs text-[#d0c5af]">
                Specimen N° V-8891: The Sol Invictus Solitaire (14.28 ct Fancy Vivid Yellow).
              </p>
            </div>

            {bookingDispatched ? (
              <div className="p-6 bg-[#201f20] rounded border border-[#f2ca50]/50 text-center space-y-2">
                <span className="material-symbols-outlined text-4xl text-[#f2ca50]">verified</span>
                <h4 className="font-serif text-xl text-[#e5e2e3]">Dossier Transmis</h4>
                <p className="font-sans text-xs text-[#d0c5af]">
                  Votre requête a été transmise à M. Jean-Philippe Morel. La pièce sera rapatriée sous escorte diplomatique pour votre séance.
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4 font-sans text-xs">
                <div className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase text-[#99907c]">Patron Name / Honorific</label>
                  <input
                    type="text"
                    value={patronHonorific}
                    onChange={(e) => setPatronHonorific(e.target.value)}
                    placeholder="e.g. Comtesse de Valmont"
                    className="w-full bg-[#201f20] text-[#e5e2e3] py-2.5 px-3 rounded border border-[#353436] focus:outline-none focus:ring-1 focus:ring-[#f2ca50]"
                    required
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase text-[#99907c]">Direct Contact / Liaison</label>
                    <input
                      type="text"
                      value={liaisonContact}
                      onChange={(e) => setLiaisonContact(e.target.value)}
                      placeholder="+33 6 00 00 00 00"
                      className="w-full bg-[#201f20] text-[#e5e2e3] py-2.5 px-3 rounded border border-[#353436] focus:outline-none focus:ring-1 focus:ring-[#f2ca50]"
                      required
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label className="text-[10px] uppercase text-[#99907c]">Preferred Salon Location</label>
                    <select
                      value={salonLoc}
                      onChange={(e) => setSalonLoc(e.target.value)}
                      className="w-full bg-[#201f20] text-[#e5e2e3] py-2.5 px-3 rounded border border-[#353436] focus:outline-none"
                    >
                      <option value="26 Place Vendôme, Paris">26 Place Vendôme, Paris</option>
                      <option value="Salon Privé, Geneva">Salon Privé, Geneva</option>
                      <option value="Mayfair Residence, London">Mayfair Residence, London</option>
                      <option value="Private Residence (Armored Courier)">Private Residence (Armored Courier)</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center gap-3 pt-1">
                  <input
                    type="checkbox"
                    id="armoredCheck"
                    checked={armoredTransport}
                    onChange={(e) => setArmoredTransport(e.target.checked)}
                    className="accent-[#f2ca50] w-4 h-4 rounded cursor-pointer"
                  />
                  <label htmlFor="armoredCheck" className="text-xs text-[#ccc6bd] cursor-pointer">
                    Include complimentary armored diplomatic transfer for patron arrival.
                  </label>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[#353436]">
                  <span className="text-[9px] uppercase tracking-wider text-[#99907c]">
                    Encrypted TLS 256-bit • Direct Gemologist Dispatch
                  </span>
                  <button
                    type="submit"
                    className="px-5 py-2.5 bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-sans text-xs uppercase tracking-wider font-semibold rounded transition-all cursor-pointer"
                  >
                    Transmit Dossier Request
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
