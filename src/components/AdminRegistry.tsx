import React, { useState } from 'react';
import { 
  useMaison, 
  PatronLoginRecord, 
  SalonAppointment, 
  PatronInscription, 
  EncryptedMessage 
} from '../context/MaisonContext';

export const AdminRegistry: React.FC = () => {
  const { 
    user, 
    isAdmin, 
    loginsRegistry, 
    allAppointments, 
    allInscriptions, 
    allMessages,
    setScreen,
    downloadStandaloneHTML
  } = useMaison();

  const [activeTab, setActiveTab] = useState<'logins' | 'appointments' | 'inscriptions' | 'messages' | 'export'>('logins');
  const [searchTerm, setSearchTerm] = useState('');
  const [copySuccess, setCopySuccess] = useState('');

  const filteredLogins = loginsRegistry.filter((l: PatronLoginRecord) => 
    (l.email || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.displayName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.authMethod || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (l.userId || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredAppointments = allAppointments.filter((a: SalonAppointment) =>
    (a.clientEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.title || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.salonLocation || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (a.creationsOfInterest || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredInscriptions = allInscriptions.filter((i: PatronInscription) =>
    (i.honorificName || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (i.contactEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (i.familyOfficeSponsor || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredMessages = allMessages.filter((m: EncryptedMessage) =>
    (m.senderEmail || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.nature || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
    (m.message || '').toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopySuccess(`${label} copié dans le presse-papier !`);
    setTimeout(() => setCopySuccess(''), 2500);
  };

  return (
    <div className="min-h-screen bg-[#0e0e0f] text-[#ede0d4] pt-28 pb-24 px-4 sm:px-6 md:px-12">
      {/* Top Header Bar */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between border-b border-[#cca76a]/20 pb-6 gap-4">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="px-2.5 py-0.5 text-[10px] tracking-[0.25em] uppercase font-mono bg-[#cca76a]/15 text-[#cca76a] border border-[#cca76a]/30 rounded">
                Directoire & Registre Privé
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                LIVE AUDIT RECORD
              </span>
            </div>
            <h1 className="text-3xl md:text-4xl font-serif text-[#f5ebd7] tracking-tight">
              Maison Aurelia · Journal d'Accès & Registre
            </h1>
            <p className="text-sm text-[#c5a059]/80 font-serif italic mt-1">
              Place Vendôme Paris · Console Administrative & Collecteur des Demandes Clients
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => setScreen('cinematic')}
              className="px-4 py-2 border border-[#cca76a]/30 hover:border-[#cca76a] text-xs uppercase tracking-wider text-[#cca76a] bg-[#1c1b1c] transition-colors cursor-pointer"
            >
              ← Retour au Showcase
            </button>
            <button
              onClick={downloadStandaloneHTML}
              className="px-4 py-2 bg-[#cca76a] hover:bg-[#b89555] text-[#0e0e0f] font-semibold text-xs uppercase tracking-wider transition-colors flex items-center gap-2 shadow-lg shadow-[#cca76a]/20 cursor-pointer"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Télécharger HTML Autonome (.html)
            </button>
          </div>
        </div>

        {/* Admin status pill */}
        <div className="bg-[#1c1b1c] border border-[#cca76a]/20 p-4 rounded-sm flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#cca76a]/20 border border-[#cca76a]/40 flex items-center justify-center text-[#cca76a] font-serif">
              {user ? (user.email?.[0].toUpperCase() || 'P') : 'A'}
            </div>
            <div>
              <div className="text-[#f5ebd7] font-medium flex items-center gap-2">
                <span>{user ? (user.displayName || user.email) : 'Session Active'}</span>
                {isAdmin && (
                  <span className="bg-[#cca76a] text-[#0e0e0f] text-[9px] font-bold px-1.5 py-0.5 rounded tracking-wider uppercase">
                    Administrateur Certifié
                  </span>
                )}
              </div>
              <div className="text-[#a89f91] text-[11px] font-mono">
                {user?.email || 'visiteur@cercle-aurelia.paris'} · UID: {user?.uid || 'vendome-patron-demo'}
              </div>
            </div>
          </div>
          <div className="text-right">
            <span className="text-emerald-400 font-mono text-[11px] block">
              Compte administrateur : auraandoasis@gmail.com
            </span>
            <span className="text-[#a89f91] text-[10px]">
              Toutes les connexions et soumissions sont synchronisées en direct sur Firestore
            </span>
          </div>
        </div>
      </div>

      {/* Main Tabbed Container */}
      <div className="max-w-7xl mx-auto">
        {/* Navigation Tabs */}
        <div className="flex border-b border-[#cca76a]/20 mb-6 overflow-x-auto gap-2">
          <button
            onClick={() => setActiveTab('logins')}
            className={`px-5 py-3 text-xs uppercase tracking-wider font-mono border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'logins'
                ? 'border-[#cca76a] text-[#cca76a] bg-[#cca76a]/10'
                : 'border-transparent text-[#a89f91] hover:text-[#ede0d4]'
            }`}
          >
            <span>Journal des Connexions ({loginsRegistry.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('appointments')}
            className={`px-5 py-3 text-xs uppercase tracking-wider font-mono border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'appointments'
                ? 'border-[#cca76a] text-[#cca76a] bg-[#cca76a]/10'
                : 'border-transparent text-[#a89f91] hover:text-[#ede0d4]'
            }`}
          >
            <span>Rendez-vous Salon Privé ({allAppointments.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('inscriptions')}
            className={`px-5 py-3 text-xs uppercase tracking-wider font-mono border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'inscriptions'
                ? 'border-[#cca76a] text-[#cca76a] bg-[#cca76a]/10'
                : 'border-transparent text-[#a89f91] hover:text-[#ede0d4]'
            }`}
          >
            <span>Inscriptions Cercle Privé ({allInscriptions.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('messages')}
            className={`px-5 py-3 text-xs uppercase tracking-wider font-mono border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'messages'
                ? 'border-[#cca76a] text-[#cca76a] bg-[#cca76a]/10'
                : 'border-transparent text-[#a89f91] hover:text-[#ede0d4]'
            }`}
          >
            <span>Liaison Chiffrée ({allMessages.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('export')}
            className={`px-5 py-3 text-xs uppercase tracking-wider font-mono border-b-2 transition-all flex items-center gap-2 whitespace-nowrap cursor-pointer ${
              activeTab === 'export'
                ? 'border-[#cca76a] text-[#cca76a] bg-[#cca76a]/10'
                : 'border-transparent text-[#a89f91] hover:text-[#ede0d4]'
            }`}
          >
            <span>Fichier HTML Autonome (.html)</span>
          </button>
        </div>

        {/* Global Search and Filter */}
        {activeTab !== 'export' && (
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-6">
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Rechercher par email, nom, pièce, salon..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-[#1c1b1c] border border-[#cca76a]/30 px-4 py-2 text-xs text-[#ede0d4] rounded focus:outline-none focus:border-[#cca76a] placeholder:text-[#a89f91]/50 font-sans"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm('')}
                  className="absolute right-3 top-2.5 text-xs text-[#a89f91] hover:text-[#cca76a] cursor-pointer"
                >
                  ✕
                </button>
              )}
            </div>
            {copySuccess && (
              <span className="text-emerald-400 text-xs font-mono animate-fade-in">
                {copySuccess}
              </span>
            )}
          </div>
        )}

        {/* TAB 1: Logins */}
        {activeTab === 'logins' && (
          <div className="bg-[#161516] border border-[#cca76a]/20 rounded overflow-hidden">
            <div className="p-4 border-b border-[#cca76a]/20 flex justify-between items-center bg-[#1c1b1c]">
              <div>
                <h2 className="text-sm font-semibold tracking-wider uppercase text-[#f5ebd7]">
                  Qui s'est connecté à l'application
                </h2>
                <p className="text-xs text-[#a89f91]">
                  Chaque authentification (Google OAuth, Simulation VIP, Carte NFC) est enregistrée avec horodatage et appareil
                </p>
              </div>
              <span className="text-xs font-mono text-[#cca76a]">
                {filteredLogins.length} entrées
              </span>
            </div>

            {filteredLogins.length === 0 ? (
              <div className="p-12 text-center text-[#a89f91] font-serif italic">
                Aucune entrée de connexion trouvée.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1f1e1f] text-[#cca76a] font-mono uppercase text-[11px] tracking-wider border-b border-[#cca76a]/20">
                    <tr>
                      <th className="p-3">Utilisateur / Profil</th>
                      <th className="p-3">Email</th>
                      <th className="p-3">Méthode d'Accès</th>
                      <th className="p-3">Date & Heure</th>
                      <th className="p-3">UID Firebase</th>
                      <th className="p-3">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#cca76a]/10 font-mono">
                    {filteredLogins.map((item: PatronLoginRecord) => (
                      <tr key={item.id} className="hover:bg-[#1f1e1f]/70 transition-colors">
                        <td className="p-3 font-medium text-[#f5ebd7] font-sans">
                          <div className="flex items-center gap-2">
                            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                            {item.displayName || 'Patron Anonyme'}
                          </div>
                        </td>
                        <td className="p-3 text-[#ede0d4]">
                          <span className="bg-[#242324] px-2 py-0.5 rounded border border-[#cca76a]/20">
                            {item.email || 'Non spécifié'}
                          </span>
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                            item.authMethod?.includes('google')
                              ? 'bg-blue-900/40 text-blue-300 border border-blue-500/30'
                              : 'bg-amber-900/40 text-amber-300 border border-amber-500/30'
                          }`}>
                            {item.authMethod || 'google'}
                          </span>
                        </td>
                        <td className="p-3 text-[#a89f91]">
                          {item.loginAt ? new Date(item.loginAt).toLocaleString('fr-FR', {
                            dateStyle: 'short',
                            timeStyle: 'medium'
                          }) : 'En direct'}
                        </td>
                        <td className="p-3 text-[10px] text-[#a89f91] max-w-[150px] truncate" title={item.userId}>
                          {item.userId}
                        </td>
                        <td className="p-3">
                          <button
                            onClick={() => handleCopy(item.email || item.userId, 'Email')}
                            className="text-[#cca76a] hover:text-[#f5ebd7] text-[11px] underline cursor-pointer"
                          >
                            Copier
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

        {/* TAB 2: Appointments */}
        {activeTab === 'appointments' && (
          <div className="bg-[#161516] border border-[#cca76a]/20 rounded overflow-hidden">
            <div className="p-4 border-b border-[#cca76a]/20 flex justify-between items-center bg-[#1c1b1c]">
              <div>
                <h2 className="text-sm font-semibold tracking-wider uppercase text-[#f5ebd7]">
                  Détails entrés : Réservations de Salons Privés
                </h2>
                <p className="text-xs text-[#a89f91]">
                  Toutes les présentations sollicitées par les clients (Paris, Genève, Tokyo, New York)
                </p>
              </div>
              <span className="text-xs font-mono text-[#cca76a]">
                {filteredAppointments.length} demandes
              </span>
            </div>

            {filteredAppointments.length === 0 ? (
              <div className="p-12 text-center text-[#a89f91] font-serif italic">
                Aucune réservation de salon enregistrée. Les demandes soumises dans le formulaire apparaîtront ici.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1f1e1f] text-[#cca76a] font-mono uppercase text-[11px] tracking-wider border-b border-[#cca76a]/20">
                    <tr>
                      <th className="p-3">Titre de la Séance</th>
                      <th className="p-3">Email Client</th>
                      <th className="p-3">Pièce d'Exception</th>
                      <th className="p-3">Ville & Salon</th>
                      <th className="p-3">Date Prévue</th>
                      <th className="p-3">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#cca76a]/10 font-sans">
                    {filteredAppointments.map((app: SalonAppointment) => (
                      <tr key={app.id} className="hover:bg-[#1f1e1f]/70 transition-colors">
                        <td className="p-3 font-medium text-[#f5ebd7]">
                          <div>{app.title || 'Séance Privée'}</div>
                          {app.sessionCode && (
                            <div className="text-[10px] font-mono text-[#a89f91]">{app.sessionCode}</div>
                          )}
                        </td>
                        <td className="p-3 font-mono text-[#ede0d4]">
                          {app.clientEmail || 'Client de la Maison'}
                        </td>
                        <td className="p-3 text-[#cca76a] font-serif">
                          {app.creationsOfInterest}
                        </td>
                        <td className="p-3 text-[#ede0d4]">
                          <span className="font-mono text-xs">{app.salonLocation}</span>
                        </td>
                        <td className="p-3 font-mono text-[#a89f91]">
                          {app.preferredDate} {app.timeSlot && `· ${app.timeSlot}`}
                        </td>
                        <td className="p-3">
                          <span className={`px-2 py-0.5 rounded text-[10px] uppercase font-bold tracking-wider ${
                            app.status === 'confirmed'
                              ? 'bg-emerald-900/40 text-emerald-300 border border-emerald-500/30'
                              : 'bg-amber-900/40 text-amber-300 border border-amber-500/30'
                          }`}>
                            {app.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: Inscriptions */}
        {activeTab === 'inscriptions' && (
          <div className="bg-[#161516] border border-[#cca76a]/20 rounded overflow-hidden">
            <div className="p-4 border-b border-[#cca76a]/20 flex justify-between items-center bg-[#1c1b1c]">
              <div>
                <h2 className="text-sm font-semibold tracking-wider uppercase text-[#f5ebd7]">
                  Détails entrés : Demandes d'Inscription au Cercle Privé
                </h2>
                <p className="text-xs text-[#a89f91]">
                  Formulaires de parrainage et demandes de clés d'accès soumises via la porte d'entrée
                </p>
              </div>
              <span className="text-xs font-mono text-[#cca76a]">
                {filteredInscriptions.length} candidatures
              </span>
            </div>

            {filteredInscriptions.length === 0 ? (
              <div className="p-12 text-center text-[#a89f91] font-serif italic">
                Aucune inscription en attente.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs">
                  <thead className="bg-[#1f1e1f] text-[#cca76a] font-mono uppercase text-[11px] tracking-wider border-b border-[#cca76a]/20">
                    <tr>
                      <th className="p-3">Nom du Candidat</th>
                      <th className="p-3">Contact Email</th>
                      <th className="p-3">Parrain / Référent</th>
                      <th className="p-3">Date</th>
                      <th className="p-3">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#cca76a]/10 font-sans">
                    {filteredInscriptions.map((insc: PatronInscription) => (
                      <tr key={insc.id} className="hover:bg-[#1f1e1f]/70 transition-colors">
                        <td className="p-3 font-medium text-[#f5ebd7]">
                          {insc.honorificName}
                        </td>
                        <td className="p-3 font-mono text-[#ede0d4]">
                          {insc.contactEmail}
                        </td>
                        <td className="p-3 text-[#a89f91] italic">
                          {insc.familyOfficeSponsor || 'Spontanée'}
                        </td>
                        <td className="p-3 font-mono text-[#a89f91]">
                          {insc.createdAt ? new Date(insc.createdAt).toLocaleDateString('fr-FR') : 'Aujourd’hui'}
                        </td>
                        <td className="p-3">
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-amber-900/40 text-amber-300 border border-amber-500/30 uppercase">
                            {insc.status || 'En examen'}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {/* TAB 4: Messages */}
        {activeTab === 'messages' && (
          <div className="bg-[#161516] border border-[#cca76a]/20 rounded overflow-hidden">
            <div className="p-4 border-b border-[#cca76a]/20 flex justify-between items-center bg-[#1c1b1c]">
              <div>
                <h2 className="text-sm font-semibold tracking-wider uppercase text-[#f5ebd7]">
                  Détails entrés : Messages & Liaisons Chiffrées
                </h2>
                <p className="text-xs text-[#a89f91]">
                  Échanges confidentiels entre patrons et le conservateur de la Maison
                </p>
              </div>
              <span className="text-xs font-mono text-[#cca76a]">
                {filteredMessages.length} messages
              </span>
            </div>

            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center text-[#a89f91] font-serif italic">
                Aucun message chiffré dans le registre.
              </div>
            ) : (
              <div className="divide-y divide-[#cca76a]/15">
                {filteredMessages.map((msg: EncryptedMessage) => (
                  <div key={msg.id} className="p-4 hover:bg-[#1c1b1c] transition-colors">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm text-[#f5ebd7] font-serif">{msg.nature}</span>
                        <span className="text-[10px] font-mono px-2 py-0.5 bg-[#cca76a]/15 text-[#cca76a] rounded border border-[#cca76a]/30">
                          {msg.senderEmail || 'Client de la Maison'}
                        </span>
                      </div>
                      <span className="text-xs font-mono text-[#a89f91]">
                        {msg.createdAt ? new Date(msg.createdAt).toLocaleString('fr-FR') : 'Récemment'}
                      </span>
                    </div>
                    <p className="text-xs text-[#ede0d4]/80 font-sans leading-relaxed">
                      {msg.message}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* TAB 5: Standalone HTML Conversion & Export */}
        {activeTab === 'export' && (
          <div className="bg-[#161516] border border-[#cca76a]/20 rounded p-6">
            <div className="max-w-3xl">
              <span className="px-2.5 py-0.5 text-[10px] font-mono uppercase bg-[#cca76a]/20 text-[#cca76a] border border-[#cca76a]/40 rounded">
                Format HTML Autonome
              </span>
              <h2 className="text-2xl font-serif text-[#f5ebd7] mt-3 mb-2">
                Conversion TypeScript → Fichier HTML Complet
              </h2>
              <p className="text-sm text-[#a89f91] mb-6 leading-relaxed">
                Le code de l'application a été converti en un fichier HTML unique 100% autonome et exécutable directement dans votre navigateur.
                Ce fichier intègre l'ensemble des 4 écrans de la Haute Joaillerie, les polices de caractères, les styles de luxe et les scripts d'interactivité (angle de réfraction caustique, scrubber de film, zoom loupe 40X, et registre admin).
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <button
                  onClick={downloadStandaloneHTML}
                  className="px-6 py-3 bg-[#cca76a] hover:bg-[#b89555] text-[#0e0e0f] font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-2 shadow-lg shadow-[#cca76a]/20 cursor-pointer"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Télécharger le fichier aurelia-haute-joaillerie.html
                </button>
              </div>

              <div className="border border-[#cca76a]/30 bg-[#0e0e0f] p-4 rounded text-xs font-mono">
                <div className="text-[#cca76a] font-bold mb-2">
                  Comment déployer ou ouvrir le fichier HTML :
                </div>
                <ol className="list-decimal pl-5 space-y-1 text-[#ede0d4]/80">
                  <li>Téléchargez le fichier en cliquant sur le bouton doré ci-dessus (ou ouvrez <code className="text-[#cca76a]">/public/aurelia-haute-joaillerie.html</code>).</li>
                  <li>Double-cliquez directement sur le fichier pour l'ouvrir dans n'importe quel navigateur (Chrome, Safari, Edge, Firefox).</li>
                  <li>Aucun serveur Node.js ni compilation TypeScript n'est requis : toutes les feuilles de styles, polices et scripts interactifs fonctionnent de manière 100% autonome.</li>
                  <li>Vous pouvez aussi l'héberger sur n'importe quel hébergement statique ou serveur web.</li>
                </ol>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
