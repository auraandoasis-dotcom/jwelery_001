/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useEffect } from 'react';
import { MaisonProvider, useMaison } from './context/MaisonContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CinematicShowcase } from './components/CinematicShowcase';
import { SpecimenDossier } from './components/SpecimenDossier';
import { PatronGateway } from './components/PatronGateway';
import { PatronDashboard } from './components/PatronDashboard';
import { AdminRegistry } from './components/AdminRegistry';

const MaisonApp: React.FC = () => {
  const { screen, soundActive } = useMaison();

  // Gentle ambient audio tone synthesis when sound is toggled or interacting
  useEffect(() => {
    if (!soundActive) return;

    // We can initialize an optional Web Audio context on user gesture for luxurious subtle feedback
    const handleFirstGesture = () => {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const ctx = new AudioCtx();
          if (ctx.state === 'suspended') {
            ctx.resume();
          }
        }
      } catch (e) {
        // Silent catch for audio policy
      }
      window.removeEventListener('click', handleFirstGesture);
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    return () => window.removeEventListener('click', handleFirstGesture);
  }, [soundActive]);

  return (
    <div className="min-h-screen flex flex-col bg-[#131314] text-[#e5e2e3] selection:bg-[#f2ca50] selection:text-[#3c2f00]">
      <Header />
      <main className="flex-1 w-full">
        {screen === 'cinematic' && <CinematicShowcase />}
        {screen === 'specimen' && <SpecimenDossier />}
        {screen === 'gateway' && <PatronGateway />}
        {screen === 'dashboard' && <PatronDashboard />}
        {screen === 'admin' && <AdminRegistry />}
      </main>
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <MaisonProvider>
      <MaisonApp />
    </MaisonProvider>
  );
}
