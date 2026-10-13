import React from 'react';
import { useMaison } from '../context/MaisonContext';

export const Header: React.FC = () => {
  const { screen, setScreen, user, patronProfile, soundActive, setSoundActive, logout } = useMaison();

  return (
    <header className="fixed top-0 w-full z-50 bg-[#0e0e0f]/85 backdrop-blur-2xl border-b border-[#353436]/40">
      <div className="h-20 w-full px-4 sm:px-8 lg:px-16 flex items-center justify-between">
        {/* Brand Logo & Vendôme Marker */}
        <div 
          className="flex items-center gap-3 cursor-pointer group"
          onClick={() => setScreen('cinematic')}
        >
          <img 
            alt="Aurelia Haute Joaillerie Logo" 
            className="h-8 w-auto object-contain transition-transform group-hover:scale-105 duration-300"
            src="https://lh3.googleusercontent.com/aida/AEtjO1VghILk0qG3zFYAPOSWkZypXh5stewvFQOAwJ7ts3fNUk069OJ4nm0jZ2xPLMBh2LKQFDDa5iG6jeAtA8m-VxySjuzc7RxssuAL8r-0nJJ3le1GtD-i5Qw_ih27XNkO7EWDYNVAzXPNk7JUJg-paK-48eb0E16-638sTdZUwqenlmnC2ENNMNHnoxf9ClAtXQ6MthJVYIRmabINSJpgqnbdMjwXW5D19Y4QY00wdPCmw50AMA5O-CS0_A7R"
          />
          <div className="flex flex-col">
            <span className="font-serif text-xl sm:text-2xl tracking-wide text-[#e5e2e3] leading-none group-hover:text-[#f2ca50] transition-colors">
              Aurelia
            </span>
            <span className="font-sans text-[10px] sm:text-[11px] text-[#99907c] uppercase tracking-[0.22em] mt-1 font-medium">
              Place Vendôme • Paris
            </span>
          </div>
        </div>

        {/* Desktop Navigation Links */}
        <nav className="hidden xl:flex items-center gap-10">
          <button 
            className={`font-sans text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
              screen === 'cinematic' ? 'text-[#f2ca50] border-b border-[#f2ca50] pb-1' : 'text-[#d0c5af] hover:text-[#f2ca50]'
            }`}
            onClick={() => {
              setScreen('cinematic');
              const el = document.getElementById('curated-creations');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
          >
            The High Creations
          </button>
          <button 
            className="font-sans text-[11px] uppercase tracking-[0.2em] text-[#d0c5af] hover:text-[#f2ca50] transition-colors duration-300"
            onClick={() => {
              setScreen('cinematic');
              setTimeout(() => {
                const el = document.getElementById('metiers-section');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }, 50);
            }}
          >
            Métiers d'Art
          </button>
          <button 
            className={`font-sans text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
              screen === 'specimen' ? 'text-[#f2ca50] border-b border-[#f2ca50] pb-1' : 'text-[#d0c5af] hover:text-[#f2ca50]'
            }`}
            onClick={() => setScreen('specimen')}
          >
            Cinematic Archive (Solitaire)
          </button>
          <button 
            className={`font-sans text-[11px] uppercase tracking-[0.2em] transition-all duration-300 ${
              screen === 'dashboard' ? 'text-[#f2ca50] border-b border-[#f2ca50] pb-1' : 'text-[#d0c5af] hover:text-[#f2ca50]'
            }`}
            onClick={() => setScreen(user ? 'dashboard' : 'gateway')}
          >
            {user ? 'Espace Client Privé' : 'The Maison Vault'}
          </button>
          <button 
            className={`font-sans text-[11px] uppercase tracking-[0.2em] transition-all duration-300 flex items-center gap-1.5 ${
              screen === 'admin' ? 'text-[#f2ca50] border-b border-[#f2ca50] pb-1' : 'text-[#f2ca50]/90 hover:text-[#f2ca50]'
            }`}
            onClick={() => setScreen('admin')}
            title="Registre & Journal des connexions et formulaires"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
            Registre Admin / Logins
          </button>
        </nav>

        {/* Right Actions & Utilities */}
        <div className="flex items-center gap-3 sm:gap-5">
          {/* Admin quick access icon */}
          <button 
            type="button"
            className="flex items-center gap-1 px-2.5 py-1 text-[11px] font-mono text-[#f2ca50] border border-[#f2ca50]/30 hover:border-[#f2ca50] hover:bg-[#f2ca50]/10 rounded transition-colors"
            onClick={() => setScreen('admin')}
            title="Accéder au Registre des Connexions & Données"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="hidden sm:inline text-[10px] uppercase tracking-wider font-semibold">Registre</span>
          </button>

          {/* Sound Atmospheric Toggle */}
          <button 
            type="button"
            className="hidden sm:flex items-center gap-2 px-2 py-1 text-[#d0c5af] hover:text-[#f2ca50] transition-colors group"
            onClick={() => setSoundActive(prev => !prev)}
            title="Atmosphere Soundscape"
          >
            <span className={`w-1.5 h-1.5 rounded-full ${soundActive ? 'bg-[#f2ca50] animate-ping' : 'bg-[#99907c]'}`}></span>
            <span className="font-sans text-[10px] tracking-widest uppercase">
              Sound: {soundActive ? 'On' : 'Off'}
            </span>
          </button>

          {/* VIP Client Concierge / Direct Vault Gateway */}
          <button 
            type="button"
            className="text-[#d0c5af] hover:text-[#f2ca50] transition-colors flex items-center justify-center p-2 rounded-full hover:bg-[#201f20]"
            onClick={() => setScreen(user ? 'dashboard' : 'gateway')}
            title="VIP Client Concierge Gateway"
          >
            <span className="material-symbols-outlined text-[20px] text-[#f2ca50]">diamond</span>
          </button>

          {/* Book Private Salon Button */}
          <button 
            type="button"
            className="hidden md:inline-flex items-center justify-center px-4 py-2 font-sans text-[11px] uppercase tracking-[0.22em] text-[#f2ca50] border border-[#d4af37]/40 hover:bg-[#d4af37] hover:text-[#3c2f00] transition-all duration-300 shadow-[0_0_15px_rgba(212,175,55,0.1)]"
            onClick={() => {
              if (screen !== 'cinematic') {
                setScreen('cinematic');
                setTimeout(() => {
                  const el = document.getElementById('private-salon');
                  if (el) el.scrollIntoView({ behavior: 'smooth' });
                }, 100);
              } else {
                const el = document.getElementById('private-salon');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }
            }}
          >
            Book Private Salon
          </button>

          {/* Patron Avatar / Authentication Icon */}
          <div 
            className="relative cursor-pointer group"
            onClick={() => setScreen(user ? 'dashboard' : 'gateway')}
            title={user ? `Signed in as ${user.displayName || user.email}` : "Access Patron Gateway"}
          >
            {user?.photoURL ? (
              <img 
                src={user.photoURL} 
                alt="Patron Avatar" 
                className="w-8 h-8 rounded-full object-cover ring-1 ring-[#f2ca50]"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-[#f2ca50] flex items-center justify-center hover:bg-[#ffe088] transition-colors shadow-sm">
                <span className="material-symbols-outlined text-[#3c2f00] text-[18px]">
                  {user ? 'verified_user' : 'person'}
                </span>
              </div>
            )}
            {user && (
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#22c55e] border-2 border-[#0e0e0f]" title="Active Patron Session" />
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
