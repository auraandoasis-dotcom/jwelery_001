import React, { useState, useEffect, useRef } from 'react';
import { useMaison } from '../context/MaisonContext';

export const CinematicShowcase: React.FC = () => {
  const { setScreen, inspectPiece, bookAppointment, soundActive, setSoundActive } = useMaison();

  // Caustic Lighting Angle state (Chapter II)
  const [lightAngle, setLightAngle] = useState(45);

  // Scrubber video simulation state
  const [isPlaying, setIsPlaying] = useState(true);
  const [playbackSeconds, setPlaybackSeconds] = useState(24);
  const totalSeconds = 138;

  // Soundscape active state
  const [atelierSoundActive, setAtelierSoundActive] = useState(false);

  // Film Trailer Modal state
  const [filmModalOpen, setFilmModalOpen] = useState(false);

  // Reservation form state
  const [location, setLocation] = useState('Paris — 26 Place Vendôme');
  const [prefDate, setPrefDate] = useState('2025-05-15');
  const [creation, setCreation] = useState('Solitaire Sol Invictus & Collier Céleste');
  const [honorificEmail, setHonorificEmail] = useState('');
  const [bookingSuccess, setBookingSuccess] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  // Playback timer
  useEffect(() => {
    if (!isPlaying) return;
    const interval = setInterval(() => {
      setPlaybackSeconds((prev) => (prev >= totalSeconds ? 0 : prev + 1));
    }, 1000);
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = String(Math.floor(secs / 60)).padStart(2, '0');
    const s = String(secs % 60).padStart(2, '0');
    return `00:${m}:${s}`;
  };

  const handleScrubberClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    setPlaybackSeconds(Math.round(ratio * totalSeconds));
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setBookingLoading(true);
    await bookAppointment({
      salonLocation: location,
      preferredDate: prefDate,
      creationsOfInterest: creation,
      title: `Présentation Privée : ${creation}`,
      quote: `Réservation transmise pour ${honorificEmail || 'Client d\'Honneur'}. Confirmation sous sceau Place Vendôme.`,
    });
    setBookingLoading(false);
    setBookingSuccess(true);
    setTimeout(() => {
      setBookingSuccess(false);
      setHonorificEmail('');
    }, 4500);
  };

  return (
    <div className="flex flex-col w-full bg-[#131314] text-[#e5e2e3]">
      {/* =========================================================================
          ACT I: CINEMATIC HERO (The Illumination)
      ========================================================================= */}
      <section className="relative w-full min-h-[94vh] lg:min-h-screen bg-[#0e0e0f] overflow-hidden flex flex-col justify-between pt-24 px-4 sm:px-8 lg:px-16 select-none">
        {/* Ambient Film Layer & Golden Bokeh Dust */}
        <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
          <img
            alt="High Jewelry Gold Diamond Necklace Campaign - Aurelia Haute Joaillerie"
            className="w-full h-full object-cover object-center scale-105 transition-transform duration-[12000ms] ease-out will-change-transform opacity-75"
            src="https://lh3.googleusercontent.com/aida/AEtjO1Xz8Ry9pIY5eiY-1ClJBcmnsEhtJBjWcPHnAznptwnJDdS7fwuFQr7ct-droyYWSJa-ogQD8FmD-lxkOgX7KB1KMaT7Z9a4_7MIjraTQDVTjmLCTIau93s5ZUjlxdcui69HNpN1aTdJNBiWIU6EtjiJdYsDKVbQZNAii4rglqVqLT07DAxLKNXy-TBbc5qHzHV1eOOUkPZ7FYPXMEjcxJwtK-LquSxMEKT8nbGPVMlWiqnN-ShWflhAJ-gC"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-[#0e0e0f]/50 to-transparent"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-[#0e0e0f]/90 via-[#0e0e0f]/40 to-[#0e0e0f]/85"></div>

          {/* Anamorphic Golden Light Blobs */}
          <div className="absolute -top-32 left-1/3 w-96 h-96 bg-[#f2ca50]/10 rounded-full blur-[120px] pointer-events-none mix-blend-screen animate-pulse"></div>
          <div className="absolute bottom-20 right-1/4 w-[450px] h-[450px] bg-[#d4af37]/10 rounded-full blur-[140px] pointer-events-none mix-blend-screen"></div>

          {/* Golden Particle Sparkle Simulation */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-40 mix-blend-screen" xmlns="http://www.w3.org/2000/svg">
            <circle className="animate-ping" cx="20%" cy="35%" fill="#f2ca50" r="1.5" style={{ animationDuration: '4s' }} />
            <circle className="animate-pulse" cx="78%" cy="28%" fill="#ffe088" r="2" style={{ animationDuration: '6s' }} />
            <circle className="animate-ping" cx="55%" cy="65%" fill="#f2ca50" r="1" style={{ animationDuration: '5s' }} />
            <circle className="animate-pulse" cx="88%" cy="72%" fill="#d4af37" r="2.5" style={{ animationDuration: '7s' }} />
          </svg>
        </div>

        {/* Top Film Reel Strip Metadata */}
        <div className="relative z-10 w-full flex flex-wrap items-center justify-between text-[#d0c5af] gap-4 pt-4">
          <div className="flex items-center gap-3 bg-[#1c1b1c]/70 backdrop-blur-md px-4 py-1.5 rounded-full shadow-lg border border-[#353436]/40">
            <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-pulse"></span>
            <span className="font-sans text-[10px] sm:text-[11px] tracking-[0.25em] text-[#e5e2e3] uppercase font-medium">
              AURELIA CINÉMA D’ART • 70MM ANAMORPHIC
            </span>
          </div>
          <div className="hidden md:flex items-center gap-6 font-sans text-[11px] tracking-widest text-[#99907c]">
            <span>4K DCI MASTER</span>
            <span>•</span>
            <span>24.000 FPS</span>
            <span>•</span>
            <span>ISO 400</span>
            <span>•</span>
            <span className="text-[#f2ca50]">PLACE VENDÔME PARIS</span>
          </div>
        </div>

        {/* Hero Editorial Core */}
        <div className="relative z-10 max-w-4xl py-16 sm:py-20 flex flex-col gap-4">
          <div className="inline-flex items-center gap-3">
            <span className="h-[1px] w-8 bg-[#f2ca50]"></span>
            <span className="font-sans text-[11px] text-[#f2ca50] tracking-[0.3em] uppercase font-semibold">
              CHAPTER I — THE ILLUMINATION
            </span>
          </div>
          <h1 className="font-serif text-5xl sm:text-7xl lg:text-[76px] text-[#e5e2e3] tracking-tight leading-none drop-shadow-2xl">
            L’Aura <span className="italic text-[#ffe088]">Éternelle</span>
          </h1>
          <p className="font-serif text-lg sm:text-2xl text-[#ccc6bd] font-light max-w-2xl leading-relaxed">
            A Symphony of Celestial Refractions, Hand-Chiseled Gold &amp; Vivid Solitaires Captured in Living Light.
          </p>

          <div className="flex flex-wrap items-center gap-4 pt-4">
            <button
              type="button"
              className="px-8 py-3.5 bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-sans text-xs uppercase tracking-[0.22em] font-semibold shadow-[0_0_30px_rgba(242,202,80,0.25)] transition-all duration-300 cursor-pointer"
              onClick={() => {
                const el = document.getElementById('solitaire-inspect');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              Enter The Private Salon
            </button>
            <button
              type="button"
              className="px-6 py-3.5 bg-[#2a2a2b]/60 backdrop-blur-md text-[#e5e2e3] hover:text-[#f2ca50] hover:bg-[#2a2a2b] font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-2 border border-[#353436]/40 cursor-pointer"
              onClick={() => setFilmModalOpen(true)}
            >
              <span className="material-symbols-outlined text-[18px] text-[#f2ca50]">play_arrow</span>
              Stream Film Chapter
            </button>
          </div>
        </div>

        {/* Scrubbable Video / Chapter Timeline Bar */}
        <div className="relative z-10 w-full pb-8">
          <div className="bg-[#0e0e0f]/85 backdrop-blur-xl p-4 md:p-6 shadow-2xl border border-[#353436]/40 flex flex-col gap-3">
            <div className="flex items-center justify-between text-[#d0c5af] font-sans text-xs tracking-wider">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="text-[#f2ca50] hover:text-[#ffe088] transition-colors"
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? "Pause" : "Play"}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {isPlaying ? 'pause' : 'play_arrow'}
                  </span>
                </button>
                <span className="text-[#e5e2e3] font-mono font-medium">
                  {formatTime(playbackSeconds)}
                </span>
                <span className="text-[#99907c] font-mono">/ 00:02:18</span>
              </div>

              <div className="hidden sm:flex items-center gap-8 text-[#99907c] text-[11px] tracking-widest uppercase">
                <span className="text-[#f2ca50] font-medium flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]"></span> ACT I : L'AURA
                </span>
                <button
                  onClick={() => {
                    const el = document.getElementById('solitaire-inspect');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#e5e2e3] transition-colors"
                >
                  ACT II : THE SOLITAIRE
                </button>
                <button
                  onClick={() => {
                    const el = document.getElementById('metiers-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-[#e5e2e3] transition-colors"
                >
                  ACT III : MÉTIERS D'ART
                </button>
              </div>

              <div className="flex items-center gap-2 text-[#4d4635] text-[11px] uppercase tracking-widest">
                <span className="material-symbols-outlined text-[16px] text-[#f2ca50]">mouse</span>
                <span className="text-[#99907c]">Click Scrubber To Seek</span>
              </div>
            </div>

            {/* Custom Interactive Scrubber Bar */}
            <div
              className="relative w-full h-2 bg-[#353436] cursor-pointer group rounded-full overflow-hidden"
              onClick={handleScrubberClick}
              role="slider"
              aria-label="Chapter timeline"
            >
              <div
                className="h-full bg-gradient-to-r from-[#f2ca50] to-[#ffe088] transition-all duration-300 pointer-events-none"
                style={{ width: `${(playbackSeconds / totalSeconds) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER II: THE SOLITAIRE'S GAZE (Macro Spectrogram Inspection)
      ========================================================================= */}
      <section
        className="relative w-full py-20 px-4 sm:px-8 lg:px-16 bg-[#0e0e0f] overflow-hidden"
        id="solitaire-inspect"
      >
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-[#f2ca50]/5 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="flex flex-col gap-2 mb-12">
          <div className="flex items-center gap-3">
            <span className="font-sans text-[11px] text-[#f2ca50] tracking-[0.3em] uppercase font-medium">
              CHAPTER II
            </span>
            <span className="w-12 h-[1px] bg-[#4d4635]"></span>
            <span className="font-sans text-[11px] text-[#99907c] tracking-[0.2em] uppercase">
              MACRO SPECTROGRAM
            </span>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-[#e5e2e3]">The Solitaire’s Gaze</h2>
          <p className="font-sans text-sm sm:text-base text-[#d0c5af] max-w-xl font-light">
            A 14.28-carat Fancy Vivid Yellow emerald-cut diamond radiating primal solar warmth, held in an engineered micro-prong cradle.
          </p>
        </div>

        {/* Asymmetric Split Inspection Vitrine */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Left: Interactive Specimen Vitrine With Dynamic Caustic Shimmer */}
          <div className="lg:col-span-7 relative group">
            <div className="relative w-full aspect-[4/3] bg-[#1c1b1c] rounded-lg overflow-hidden shadow-2xl flex items-center justify-center border border-[#353436]/40">
              <img
                alt="Fancy Vivid Yellow Diamond Solitaire Ring Macro View - Aurelia Haute Joaillerie"
                className="w-full h-full object-cover object-center transition-all duration-700 ease-out group-hover:scale-105"
                style={{
                  filter: `contrast(${100 + (lightAngle - 50) * 0.25}%) brightness(${100 + (lightAngle - 50) * 0.18}%)`,
                }}
                src="https://lh3.googleusercontent.com/aida/AEtjO1U7KXfSUcHT1_dMGDlipMp3S3zuHJ_7-qX_2reqQHLMQJn5Y-PkxFDHBCCqAJdaK4SMpdF2i6IiXCWLR7cuW7QLJQuu1T1VlpN5gNXNBJyptssqW_kILULyUnEG4bAw4Bd-JAlmh1Wkd6vdtV_wIzrrXfY-4rupnykl_mKGbO7fu8L8jZAiSjDg_iaLeCaPITSKWvjp_dcweAKBur6y7MD1FzaS11yY7d3qn4p84zjS-eoltESE"
              />

              {/* Dynamic Shimmer Reflection Filter Layer Driven by Slider */}
              <div
                className="absolute inset-0 pointer-events-none mix-blend-color-dodge transition-all duration-300"
                style={{
                  background: `linear-gradient(${Math.floor((lightAngle / 100) * 360)}deg, rgba(242,202,80,0.25) 0%, transparent 40%, rgba(255,224,136,0.3) 70%, transparent 100%)`,
                  opacity: 0.65,
                }}
              ></div>

              {/* Hotspot 1: Diamond Table */}
              <div className="absolute top-[42%] left-[48%] -translate-x-1/2 -translate-y-1/2 group/hotspot cursor-pointer">
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#f2ca50] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#f2ca50]"></span>
                </span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover/hotspot:flex flex-col bg-[#353436]/95 backdrop-blur-md p-3 rounded shadow-2xl w-48 pointer-events-none border border-[#4d4635]">
                  <span className="font-sans text-[11px] text-[#f2ca50] tracking-widest uppercase font-semibold">
                    Facet Table
                  </span>
                  <span className="font-sans text-xs text-[#e5e2e3] font-light mt-1">
                    14.28 Carats • Natural Fancy Vivid Yellow • IF Clarity
                  </span>
                </div>
              </div>

              {/* Hotspot 2: Pavé Band */}
              <div className="absolute bottom-[35%] left-[28%] -translate-x-1/2 group/hotspot cursor-pointer">
                <span className="relative flex h-5 w-5 items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#e8e1d9] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-[#e8e1d9]"></span>
                </span>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 hidden group-hover/hotspot:flex flex-col bg-[#353436]/95 backdrop-blur-md p-3 rounded shadow-2xl w-52 pointer-events-none border border-[#4d4635]">
                  <span className="font-sans text-[11px] text-[#e8e1d9] tracking-widest uppercase font-semibold">
                    Pavé Setting
                  </span>
                  <span className="font-sans text-xs text-[#e5e2e3] font-light mt-1">
                    Triple-row French micro-pavé with D-Flawless round brilliants (1.92 ctw)
                  </span>
                </div>
              </div>

              {/* Caustic Light Scrub Angle Toggle Control */}
              <div className="absolute bottom-4 left-4 right-4 bg-[#0e0e0f]/90 backdrop-blur-md px-4 py-3 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-lg border border-[#353436]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[18px] text-[#f2ca50]">flare</span>
                  <span className="font-sans text-[11px] uppercase tracking-wider text-[#e5e2e3] font-medium">
                    Caustic Lighting Angle
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-sans text-[11px] text-[#99907c]">0° Dawn</span>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={lightAngle}
                    onChange={(e) => setLightAngle(Number(e.target.value))}
                    className="w-32 h-1 bg-[#353436] accent-[#f2ca50] rounded-lg appearance-none cursor-pointer"
                  />
                  <span className="font-sans text-[11px] text-[#99907c]">180° Zenith</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Technical Gem Dossier & Editorial Craft */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="font-sans text-[11px] text-[#99907c] uppercase tracking-[0.25em]">
                SPECIMEN N° V-8891
              </span>
              <h3 className="font-serif text-3xl sm:text-4xl text-[#e5e2e3] font-normal">
                The Sol Invictus Solitaire
              </h3>
              <p className="font-sans text-sm text-[#d0c5af] font-light leading-relaxed">
                Unearthed in South Africa's historic alluvial deposits and conserved for over three decades before its release. Each step-cut facet reflects a tailored angle calculated to maximize golden resonance without dispersing chromatic fire.
              </p>
            </div>

            {/* Spec Data Table Grid */}
            <div className="grid grid-cols-2 gap-4 bg-[#1c1b1c] p-6 rounded border border-[#353436]/40">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] text-[#99907c] uppercase tracking-wider">
                  Carat Mass
                </span>
                <span className="font-serif text-2xl text-[#f2ca50] font-medium">14.28 ct</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] text-[#99907c] uppercase tracking-wider">
                  Color Saturation
                </span>
                <span className="font-serif text-2xl text-[#e5e2e3]">Fancy Vivid</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] text-[#99907c] uppercase tracking-wider">
                  Mounting Metal
                </span>
                <span className="font-sans text-sm text-[#ccc6bd]">Pt950 &amp; 18K Yellow</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[10px] text-[#99907c] uppercase tracking-wider">
                  Atelier Hours
                </span>
                <span className="font-sans text-sm text-[#ccc6bd]">380 Hrs Devotion</span>
              </div>
            </div>

            {/* GIA Gemological Certificate Seal */}
            <div className="flex items-center gap-4 bg-[#201f20] px-4 py-3.5 rounded shadow-sm border border-[#353436]/60">
              <span className="material-symbols-outlined text-[24px] text-[#f2ca50]">verified</span>
              <div className="flex flex-col">
                <span className="font-sans text-xs font-semibold text-[#e5e2e3]">
                  GIA &amp; Gübelin Double Certified
                </span>
                <span className="font-sans text-[11px] text-[#99907c]">
                  Dossier #221849021 • Monograph Available Upon Request
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                className="px-6 py-3 bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-sans text-xs uppercase tracking-[0.2em] font-semibold transition-all duration-300 shadow-md cursor-pointer"
                onClick={() => inspectPiece('piece-sol-invictus')}
              >
                Inspect 8K Specimen View
              </button>
              <button
                type="button"
                className="px-6 py-3 bg-transparent hover:bg-[#2a2a2b] text-[#f2ca50] border border-[#d4af37]/40 font-sans text-xs uppercase tracking-[0.2em] transition-all duration-300 cursor-pointer"
                onClick={() => {
                  const el = document.getElementById('private-salon');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }}
              >
                Request Private Gem Dossier
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CHAPTER III: MÉTIERS D'ART (The Artisan's Atelier)
      ========================================================================= */}
      <section
        className="relative w-full py-20 px-4 sm:px-8 lg:px-16 bg-[#1c1b1c] overflow-hidden"
        id="metiers-section"
      >
        <div className="relative z-10 flex flex-col gap-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="flex flex-col gap-2 max-w-2xl">
              <div className="flex items-center gap-3">
                <span className="font-sans text-[11px] text-[#f2ca50] tracking-[0.3em] uppercase font-medium">
                  CHAPTER III
                </span>
                <span className="w-12 h-[1px] bg-[#4d4635]"></span>
                <span className="font-sans text-[11px] text-[#99907c] tracking-[0.2em] uppercase">
                  L'ATELIER VENDÔME
                </span>
              </div>
              <h2 className="font-serif text-4xl sm:text-5xl text-[#e5e2e3] font-light">
                Métiers d’Art : The Alchemist’s Hands
              </h2>
              <p className="font-sans text-base sm:text-lg text-[#ccc6bd] font-light leading-relaxed">
                Behind velvet drapes at 26 Place Vendôme, time ceases to flow by minutes. Master gem-setters work with single-hair chisels under natural daylight, breathing life into mineral perfection.
              </p>
            </div>

            {/* Audio Atmosphere Toggle */}
            <button
              type="button"
              className={`self-start md:self-auto flex items-center gap-3 px-5 py-2.5 rounded-full transition-all border ${
                atelierSoundActive
                  ? 'bg-[#353436] text-[#f2ca50] border-[#f2ca50]'
                  : 'bg-[#353436]/80 text-[#e5e2e3] hover:text-[#f2ca50] border-transparent'
              }`}
              onClick={() => setAtelierSoundActive(!atelierSoundActive)}
            >
              <span className="material-symbols-outlined text-[18px] text-[#f2ca50]">
                {atelierSoundActive ? 'graphic_eq' : 'volume_up'}
              </span>
              <span className="font-sans text-[11px] uppercase tracking-wider">
                {atelierSoundActive ? 'Soundscape : Active (24-bit Flac)' : 'Atelier Soundscape : Chisel & Loupe'}
              </span>
            </button>
          </div>

          {/* Feature Artisan Banner */}
          <div className="relative w-full h-[440px] lg:h-[540px] rounded-xl overflow-hidden shadow-2xl group border border-[#353436]/40">
            <img
              alt="Master Jeweler Tweezers Positioning Sapphire in Gold Royal Coronet - Aurelia"
              className="w-full h-full object-cover object-center group-hover:scale-102 transition-transform duration-1000"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UksdcaDM0eupucp9C8392SnKYMJhwq16pBMDdmLNg2PxVkyjXzmlDrMzWLKHrDcVh281aeovH6yH1I_qgPbLmqWl79cLH-5UPCYWLrwEw6HGU03X3vx_-yG0wtZxjZ-yaJI-_TW83b-cIWKm5ZrbD0p7kbhkqeQUeXpKnzRXgyRJ5mh-q1wfKRTFQLxV2Gb4TFzNTpUnfN2G7N1f4bKaM1hfOubrhbMu_szgldeSbFWeIvA4nU91Yj6Tp2"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-[#0e0e0f]/30 to-transparent"></div>

            {/* Float Highlight Card */}
            <div className="absolute bottom-6 left-6 right-6 lg:left-12 lg:right-auto lg:max-w-md bg-[#0e0e0f]/90 backdrop-blur-xl p-6 rounded shadow-2xl border border-[#353436]">
              <span className="font-sans text-[10px] text-[#f2ca50] uppercase tracking-[0.25em] font-semibold">
                MICRO-PRECISION
              </span>
              <h4 className="font-serif text-xl sm:text-2xl text-[#e5e2e3] mt-1 mb-2">
                320 Hours of Human Devotion
              </h4>
              <p className="font-sans text-xs sm:text-sm text-[#d0c5af] font-light leading-relaxed">
                Fitting an unheated Ceylon royal blue sapphire into a hand-engraved 18-karat filigree setting without fracturing the atomic prism structure.
              </p>
            </div>
          </div>

          {/* 3 Craft Phases */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <div className="bg-[#201f20] p-6 rounded flex flex-col gap-3 shadow-lg hover:bg-[#2a2a2b] transition-colors border border-[#353436]/40">
              <span className="font-sans text-[11px] text-[#f2ca50] font-bold tracking-widest">
                PHASE 01
              </span>
              <h4 className="font-serif text-xl text-[#e5e2e3]">The Gouache Rendering</h4>
              <p className="font-sans text-xs text-[#d0c5af] font-light leading-relaxed">
                Hand-painted on black Arches parchment using natural pigments, each reflection and facet depth is mapped to scale before gold is ever melted.
              </p>
            </div>

            <div className="bg-[#201f20] p-6 rounded flex flex-col gap-3 shadow-lg hover:bg-[#2a2a2b] transition-colors border border-[#353436]/40">
              <span className="font-sans text-[11px] text-[#f2ca50] font-bold tracking-widest">
                PHASE 02
              </span>
              <h4 className="font-serif text-xl text-[#e5e2e3]">Sculpted Cire Perdue</h4>
              <p className="font-sans text-xs text-[#d0c5af] font-light leading-relaxed">
                The lost-wax sculpture sculpts organic arches and structural hollows, ensuring maximum optical luminosity passes under the set gems.
              </p>
            </div>

            <div className="bg-[#201f20] p-6 rounded flex flex-col gap-3 shadow-lg hover:bg-[#2a2a2b] transition-colors border border-[#353436]/40">
              <span className="font-sans text-[11px] text-[#f2ca50] font-bold tracking-widest">
                PHASE 03
              </span>
              <h4 className="font-serif text-xl text-[#e5e2e3]">Invisible Grain Setting</h4>
              <p className="font-sans text-xs text-[#d0c5af] font-light leading-relaxed">
                Using microscopic burrs, our Meilleurs Ouvriers de France fold micro-beads of platinum over diamond girdles for seamless brilliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          THE CURATED HIGH CREATIONS GALLERY
      ========================================================================= */}
      <section
        className="relative w-full py-20 px-4 sm:px-8 lg:px-16 bg-[#0e0e0f]"
        id="curated-creations"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
          <div className="flex flex-col gap-2">
            <span className="font-sans text-[11px] text-[#f2ca50] tracking-[0.3em] uppercase font-semibold">
              CURATED REEL
            </span>
            <h2 className="font-serif text-4xl sm:text-5xl text-[#e5e2e3] font-light">
              The High Creations
            </h2>
          </div>
          <div className="font-sans text-[11px] text-[#99907c] tracking-widest uppercase">
            Pièces Uniques • Acquisition on Request
          </div>
        </div>

        {/* Gallery Bento Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Masterpiece 1: Collier Céleste */}
          <div className="group bg-[#1c1b1c] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col border border-[#353436]/40">
            <div className="relative w-full aspect-square overflow-hidden bg-[#0e0e0f] flex items-center justify-center">
              <img
                alt="Collier Céleste Yellow and White Diamonds Necklace Haute Joaillerie"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://lh3.googleusercontent.com/aida/AEtjO1Xz8Ry9pIY5eiY-1ClJBcmnsEhtJBjWcPHnAznptwnJDdS7fwuFQr7ct-droyYWSJa-ogQD8FmD-lxkOgX7KB1KMaT7Z9a4_7MIjraTQDVTjmLCTIau93s5ZUjlxdcui69HNpN1aTdJNBiWIU6EtjiJdYsDKVbQZNAii4rglqVqLT07DAxLKNXy-TBbc5qHzHV1eOOUkPZ7FYPXMEjcxJwtK-LquSxMEKT8nbGPVMlWiqnN-ShWflhAJ-gC"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-transparent to-transparent opacity-80"></div>
              <span className="absolute top-4 right-4 bg-[#0e0e0f]/80 backdrop-blur-md px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-[#f2ca50] rounded-full border border-[#4d4635]">
                Unique Piece
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[11px] text-[#99907c] uppercase tracking-wider">
                  High Jewelry Suite
                </span>
                <h3 className="font-serif text-2xl text-[#e5e2e3]">Collier Céleste</h3>
                <p className="font-sans text-xs text-[#d0c5af] font-light leading-relaxed">
                  Cascade of 1,280 brilliant-cut diamonds totaling 46.50 carats crowned by an extraordinary pear-cut Fancy Yellow diamond.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#201f20]">
                <span className="font-sans text-[11px] text-[#f2ca50] tracking-widest uppercase">
                  Price Upon Inscription
                </span>
                <button
                  type="button"
                  className="text-[#e5e2e3] hover:text-[#f2ca50] transition-colors flex items-center gap-1 font-sans text-xs uppercase tracking-wider cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById('private-salon');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Inspect</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Masterpiece 2: Solitaire Sol Invictus */}
          <div className="group bg-[#1c1b1c] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col border border-[#353436]/40">
            <div className="relative w-full aspect-square overflow-hidden bg-[#0e0e0f] flex items-center justify-center">
              <img
                alt="Solitaire Sol Invictus Fancy Vivid Yellow Diamond Ring"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://lh3.googleusercontent.com/aida/AEtjO1U7KXfSUcHT1_dMGDlipMp3S3zuHJ_7-qX_2reqQHLMQJn5Y-PkxFDHBCCqAJdaK4SMpdF2i6IiXCWLR7cuW7QLJQuu1T1VlpN5gNXNBJyptssqW_kILULyUnEG4bAw4Bd-JAlmh1Wkd6vdtV_wIzrrXfY-4rupnykl_mKGbO7fu8L8jZAiSjDg_iaLeCaPITSKWvjp_dcweAKBur6y7MD1FzaS11yY7d3qn4p84zjS-eoltESE"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-transparent to-transparent opacity-80"></div>
              <span className="absolute top-4 right-4 bg-[#0e0e0f]/80 backdrop-blur-md px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-[#f2ca50] rounded-full border border-[#4d4635]">
                Solitaire Royal
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[11px] text-[#99907c] uppercase tracking-wider">
                  Emerald Solitaire
                </span>
                <h3 className="font-serif text-2xl text-[#e5e2e3]">Bague Sol Invictus</h3>
                <p className="font-sans text-xs text-[#d0c5af] font-light leading-relaxed">
                  14.28 Carats Fancy Vivid Yellow mounted with platinum and 18K yellow gold prong pavilion with pavé collar.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#201f20]">
                <span className="font-sans text-[11px] text-[#f2ca50] tracking-widest uppercase">
                  Acquisition on Request
                </span>
                <button
                  type="button"
                  className="text-[#e5e2e3] hover:text-[#f2ca50] transition-colors flex items-center gap-1 font-sans text-xs uppercase tracking-wider cursor-pointer"
                  onClick={() => inspectPiece('piece-sol-invictus')}
                >
                  <span>Inspect</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>

          {/* Masterpiece 3: Bague Constellation Royale */}
          <div className="group bg-[#1c1b1c] rounded-lg overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 flex flex-col md:col-span-2 lg:col-span-1 border border-[#353436]/40">
            <div className="relative w-full aspect-square overflow-hidden bg-[#0e0e0f] flex items-center justify-center">
              <img
                alt="Bague Constellation Royale Sapphire Setting"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                src="https://lh3.googleusercontent.com/aida/AEtjO1UksdcaDM0eupucp9C8392SnKYMJhwq16pBMDdmLNg2PxVkyjXzmlDrMzWLKHrDcVh281aeovH6yH1I_qgPbLmqWl79cLH-5UPCYWLrwEw6HGU03X3vx_-yG0wtZxjZ-yaJI-_TW83b-cIWKm5ZrbD0p7kbhkqeQUeXpKnzRXgyRJ5mh-q1wfKRTFQLxV2Gb4TFzNTpUnfN2G7N1f4bKaM1hfOubrhbMu_szgldeSbFWeIvA4nU91Yj6Tp2"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-transparent to-transparent opacity-80"></div>
              <span className="absolute top-4 right-4 bg-[#0e0e0f]/80 backdrop-blur-md px-3 py-1 font-sans text-[10px] uppercase tracking-wider text-[#f2ca50] rounded-full border border-[#4d4635]">
                Archive Release
              </span>
            </div>
            <div className="p-6 flex flex-col justify-between flex-grow gap-4">
              <div className="flex flex-col gap-1">
                <span className="font-sans text-[11px] text-[#99907c] uppercase tracking-wider">
                  Coronet Ring
                </span>
                <h3 className="font-serif text-2xl text-[#e5e2e3]">Bague Constellation</h3>
                <p className="font-sans text-xs text-[#d0c5af] font-light leading-relaxed">
                  Hand-chiseled Renaissance filigree basket showcasing a cushion-cut royal blue unheated Ceylon sapphire of 9.15 carats.
                </p>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-[#201f20]">
                <span className="font-sans text-[11px] text-[#f2ca50] tracking-widest uppercase">
                  Private Viewing Only
                </span>
                <button
                  type="button"
                  className="text-[#e5e2e3] hover:text-[#f2ca50] transition-colors flex items-center gap-1 font-sans text-xs uppercase tracking-wider cursor-pointer"
                  onClick={() => {
                    const el = document.getElementById('metiers-section');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                >
                  <span>Inspect</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CINEMATIC PRIVATE SALON & CONCIERGE INVITATION (Form connected to Firestore)
      ========================================================================= */}
      <section
        className="relative w-full py-20 px-4 sm:px-8 lg:px-16 bg-[#1c1b1c] overflow-hidden"
        id="private-salon"
      >
        <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-[#f2ca50]/10 rounded-full blur-[140px] pointer-events-none"></div>

        <div className="max-w-5xl mx-auto bg-[#0e0e0f] p-8 md:p-14 rounded-xl shadow-2xl relative z-10 border border-[#353436]/50">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left: Editorial Invitation */}
            <div className="lg:col-span-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <span className="font-sans text-[11px] text-[#f2ca50] tracking-[0.3em] uppercase font-semibold">
                  SALON PRIVÉ
                </span>
                <span className="w-8 h-[1px] bg-[#f2ca50]"></span>
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl text-[#e5e2e3] leading-tight font-light">
                Experience the Collection in Person
              </h2>
              <p className="font-sans text-sm text-[#d0c5af] font-light leading-relaxed">
                Aurelia curates confidential private viewings in our historical salons or directly at your private residence anywhere worldwide.
              </p>

              <div className="flex flex-col gap-3 pt-2">
                <div className="flex items-center gap-3 text-[#e5e2e3]">
                  <span className="material-symbols-outlined text-[20px] text-[#f2ca50]">location_on</span>
                  <span className="font-sans text-xs">
                    Paris (Place Vendôme) • Geneva (Rue du Rhône) • New York • Zürich
                  </span>
                </div>
                <div className="flex items-center gap-3 text-[#e5e2e3]">
                  <span className="material-symbols-outlined text-[20px] text-[#f2ca50]">lock</span>
                  <span className="font-sans text-xs">
                    Complete Discretion &amp; Armored White-Glove Transfer
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Bespoke Reservation Form */}
            <div className="lg:col-span-6 bg-[#201f20] p-6 md:p-8 rounded-lg shadow-xl flex flex-col gap-4 border border-[#353436]">
              <span className="font-sans text-[11px] text-[#99907c] uppercase tracking-widest font-medium">
                Reserve Confidential Appointment
              </span>

              {bookingSuccess ? (
                <div className="p-6 bg-[#1c1b1c] rounded border border-[#f2ca50]/50 text-center space-y-2">
                  <span className="material-symbols-outlined text-4xl text-[#f2ca50]">verified</span>
                  <h4 className="font-serif text-xl text-[#e5e2e3]">Demande Transmise Sous Sceau</h4>
                  <p className="font-sans text-xs text-[#d0c5af]">
                    Votre requête a été synchronisée dans notre registre sécurisé Place Vendôme. Notre Directeur des Salons Privés vous contactera sous 24h.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleBookingSubmit} className="flex flex-col gap-4">
                  <div className="flex flex-col gap-1">
                    <label className="font-sans text-[10px] text-[#99907c] uppercase tracking-wider">
                      Salon Location
                    </label>
                    <select
                      value={location}
                      onChange={(e) => setLocation(e.target.value)}
                      className="w-full bg-[#1c1b1c] text-[#e5e2e3] px-3.5 py-2.5 rounded font-sans text-xs focus:outline-none focus:ring-1 focus:ring-[#f2ca50] border border-[#353436]"
                    >
                      <option value="Paris — 26 Place Vendôme">Paris — 26 Place Vendôme</option>
                      <option value="Geneva — Salon Privé Rue du Rhône">Geneva — Salon Privé Rue du Rhône</option>
                      <option value="New York — Madison Avenue Penthouse">New York — Madison Avenue Penthouse</option>
                      <option value="Zürich — Bahnhofstrasse Residence">Zürich — Bahnhofstrasse Residence</option>
                      <option value="Private Residence / International Delegation">Private Residence / International Delegation</option>
                    </select>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1">
                      <label className="font-sans text-[10px] text-[#99907c] uppercase tracking-wider">
                        Preferred Date
                      </label>
                      <input
                        type="date"
                        value={prefDate}
                        onChange={(e) => setPrefDate(e.target.value)}
                        className="w-full bg-[#1c1b1c] text-[#e5e2e3] px-3 py-2 rounded font-sans text-xs focus:outline-none focus:ring-1 focus:ring-[#f2ca50] border border-[#353436]"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label className="font-sans text-[10px] text-[#99907c] uppercase tracking-wider">
                        Creations of Interest
                      </label>
                      <select
                        value={creation}
                        onChange={(e) => setCreation(e.target.value)}
                        className="w-full bg-[#1c1b1c] text-[#e5e2e3] px-3 py-2 rounded font-sans text-xs focus:outline-none focus:ring-1 focus:ring-[#f2ca50] border border-[#353436]"
                      >
                        <option value="Collier Céleste">Collier Céleste</option>
                        <option value="Solitaire Sol Invictus">Solitaire Sol Invictus</option>
                        <option value="Bague Constellation">Bague Constellation</option>
                        <option value="Bespoke Commission">Bespoke Commission</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className="font-sans text-[10px] text-[#99907c] uppercase tracking-wider">
                      Client Honorific &amp; Email
                    </label>
                    <input
                      type="text"
                      value={honorificEmail}
                      onChange={(e) => setHonorificEmail(e.target.value)}
                      placeholder="e.g. Comtesse de Valmont • client@domaine.com"
                      className="w-full bg-[#1c1b1c] text-[#e5e2e3] px-3.5 py-2.5 rounded font-sans text-xs placeholder:text-[#99907c] focus:outline-none focus:ring-1 focus:ring-[#f2ca50] border border-[#353436]"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={bookingLoading}
                    className="w-full py-3.5 mt-2 bg-[#f2ca50] hover:bg-[#ffe088] text-[#3c2f00] font-sans text-xs uppercase tracking-[0.22em] font-semibold shadow-lg transition-all duration-300 disabled:opacity-50 cursor-pointer"
                  >
                    {bookingLoading ? 'Transmission en cours...' : 'Request Salon Confirmation'}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Stream Film Modal Preview */}
      {filmModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0e0e0f]/95 backdrop-blur-2xl flex items-center justify-center p-4">
          <div className="bg-[#1c1b1c] border border-[#d4af37]/40 max-w-3xl w-full p-6 sm:p-8 rounded-xl shadow-2xl relative space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-[#353436]">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#f2ca50] animate-pulse"></span>
                <span className="font-sans text-xs uppercase text-[#f2ca50] tracking-widest font-semibold">
                  Aurelia Cinéma d'Art • Master 4K
                </span>
              </div>
              <button
                onClick={() => setFilmModalOpen(false)}
                className="text-[#99907c] hover:text-[#e5e2e3] p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="relative aspect-video w-full rounded overflow-hidden bg-black flex items-center justify-center">
              <img
                src="https://lh3.googleusercontent.com/aida/AEtjO1Xz8Ry9pIY5eiY-1ClJBcmnsEhtJBjWcPHnAznptwnJDdS7fwuFQr7ct-droyYWSJa-ogQD8FmD-lxkOgX7KB1KMaT7Z9a4_7MIjraTQDVTjmLCTIau93s5ZUjlxdcui69HNpN1aTdJNBiWIU6EtjiJdYsDKVbQZNAii4rglqVqLT07DAxLKNXy-TBbc5qHzHV1eOOUkPZ7FYPXMEjcxJwtK-LquSxMEKT8nbGPVMlWiqnN-ShWflhAJ-gC"
                alt="Cinema preview"
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center gap-3">
                <div className="w-16 h-16 rounded-full bg-[#f2ca50] text-[#3c2f00] flex items-center justify-center shadow-2xl animate-pulse">
                  <span className="material-symbols-outlined text-4xl">play_arrow</span>
                </div>
                <span className="font-serif text-2xl text-[#e5e2e3] tracking-wide">
                  L'Aura Éternelle (70mm Master)
                </span>
                <span className="font-sans text-xs text-[#d0c5af] tracking-widest uppercase">
                  Auditorium 24-Bit Linear PCM Sound
                </span>
              </div>
            </div>

            <div className="flex items-center justify-between text-xs text-[#99907c] pt-2">
              <span>Durée : 02 min 18 sec</span>
              <button
                onClick={() => {
                  setFilmModalOpen(false);
                  inspectPiece();
                }}
                className="text-[#f2ca50] hover:underline uppercase tracking-wider font-sans text-xs"
              >
                Inspect Associated Solitaire Monograph →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
