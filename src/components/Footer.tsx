import React, { useState } from 'react';
import { useMaison } from '../context/MaisonContext';

export const Footer: React.FC = () => {
  const { setScreen, inspectPiece } = useMaison();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
        setSubscribed(false);
      }, 3000);
    }
  };

  return (
    <footer className="w-full bg-[#0e0e0f] border-t border-[#201f20] text-[#e5e2e3]">
      <div className="w-full px-4 sm:px-8 lg:px-16 pt-16 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Column 1: Maison & Address */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-serif text-2xl text-[#e5e2e3] tracking-tight">
              Aurelia Haute Joaillerie
            </span>
            <p className="font-sans text-sm text-[#d0c5af] max-w-sm font-light leading-relaxed">
              Salon de Prestige Privé<br />
              26 Place Vendôme, 75001 Paris, France
            </p>
            <div className="pt-2">
              <span className="font-sans text-[11px] text-[#99907c] uppercase tracking-[0.2em] block mb-1">
                Direct Concierge
              </span>
              <a 
                href="tel:+33142680000" 
                className="font-sans text-base text-[#f2ca50] tracking-wide hover:underline"
              >
                +33 1 42 68 00 00
              </a>
            </div>
          </div>

          {/* Column 2: Curations */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <span className="font-sans text-[11px] uppercase text-[#e5e2e3] tracking-[0.2em] mb-2 font-medium">
              Curations
            </span>
            <button 
              onClick={() => {
                setScreen('cinematic');
                const el = document.getElementById('curated-creations');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left font-sans text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
            >
              High Jewelry Suites
            </button>
            <button 
              onClick={() => inspectPiece()}
              className="text-left font-sans text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
            >
              Master Solitaires
            </button>
            <button 
              onClick={() => setScreen('gateway')}
              className="text-left font-sans text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
            >
              Historic Archives
            </button>
            <button 
              onClick={() => {
                setScreen('cinematic');
                const el = document.getElementById('private-salon');
                if (el) el.scrollIntoView({ behavior: 'smooth' });
              }}
              className="text-left font-sans text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
            >
              Bespoke Commissions
            </button>
          </div>

          {/* Column 3: Ethics & Maison */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <span className="font-sans text-[11px] uppercase text-[#e5e2e3] tracking-[0.2em] mb-2 font-medium">
              Ethics &amp; Maison
            </span>
            <span className="font-sans text-xs text-[#d0c5af]">Kimberley Process</span>
            <span className="font-sans text-xs text-[#d0c5af]">Responsible Jewellery Council</span>
            <span className="font-sans text-xs text-[#d0c5af]">Fairmined Fine Gold</span>
            <button 
              onClick={() => inspectPiece()}
              className="text-left font-sans text-xs text-[#d0c5af] hover:text-[#f2ca50] transition-colors"
            >
              Gemological Dossiers
            </button>
          </div>

          {/* Column 4: Private Salons & Reveals */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="font-sans text-[11px] uppercase text-[#e5e2e3] tracking-[0.2em] font-medium">
              Private Salons &amp; Reveals
            </span>
            <p className="font-sans text-xs text-[#d0c5af] font-light leading-relaxed">
              Receive confidential monographs and invitations to ephemeral vernissages.
            </p>
            <form onSubmit={handleSubscribe} className="flex items-center pt-1 border-b border-[#4d4635] focus-within:border-[#f2ca50] transition-colors">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={subscribed ? "Inscription transmise ✓" : "Enter your correspondence email"}
                className="w-full bg-transparent text-[#e5e2e3] font-sans text-xs placeholder:text-[#99907c] py-2 focus:outline-none"
                required
              />
              <button 
                type="submit" 
                className="px-3 py-2 font-sans text-[11px] uppercase text-[#f2ca50] hover:text-[#e5e2e3] transition-colors flex items-center justify-center"
              >
                <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Credits & Legal */}
        <div className="pt-10 mt-10 border-t border-[#201f20] flex flex-col md:flex-row items-center justify-between gap-4 text-[#99907c]">
          <div className="font-sans text-[11px] uppercase tracking-wider">
            © 2025 Aurelia Haute Joaillerie Maison S.A. Tous Droits Réservés.
          </div>
          <div className="flex flex-wrap items-center gap-6">
            <button 
              onClick={() => setScreen('admin')}
              className="font-sans text-[11px] uppercase text-[#f2ca50] hover:underline cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
              Console &amp; Registre Admin
            </button>
            <span className="font-sans text-[11px] uppercase hover:text-[#f2ca50] cursor-pointer transition-colors">
              Instagram
            </span>
            <span className="font-sans text-[11px] uppercase hover:text-[#f2ca50] cursor-pointer transition-colors">
              Vogue Runway
            </span>
            <span className="font-sans text-[11px] uppercase hover:text-[#f2ca50] cursor-pointer transition-colors">
              Legal &amp; Privacy
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};
