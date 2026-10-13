import React, { useState } from 'react';
import { useMaison } from '../context/MaisonContext';

export const PatronGateway: React.FC = () => {
  const { setScreen, loginGoogle, simulatePatronAccess, submitInscription } = useMaison();

  const [authMethod, setAuthMethod] = useState<'credentials' | 'biometric'>('credentials');
  const [memberId, setMemberId] = useState('VAL-9921');
  const [passphrase, setPassphrase] = useState('••••••••••••••••••••');
  const [showPass, setShowPass] = useState(false);
  const [isDecrypting, setIsDecrypting] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  // Modals
  const [forgotModalOpen, setForgotModalOpen] = useState(false);
  const [inscriptionModalOpen, setInscriptionModalOpen] = useState(false);

  // Inscription Form State
  const [inscName, setInscName] = useState('');
  const [inscEmail, setInscEmail] = useState('');
  const [inscSponsor, setInscSponsor] = useState('');
  const [inscSuccess, setInscSuccess] = useState(false);

  const handleAccessSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDecrypting(true);
    setTimeout(() => {
      setIsDecrypting(false);
      simulatePatronAccess();
    }, 1100);
  };

  const handleGoogleAuth = async () => {
    try {
      setGoogleLoading(true);
      await loginGoogle();
    } catch (err) {
      console.error(err);
      // Fallback to demo patron session on popup closed or local preview
      simulatePatronAccess();
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleInscriptionSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitInscription(inscName, inscEmail, inscSponsor);
    setInscSuccess(true);
    setTimeout(() => {
      setInscSuccess(false);
      setInscriptionModalOpen(false);
      setInscName('');
      setInscEmail('');
      setInscSponsor('');
    }, 3000);
  };

  return (
    <div className="relative w-full min-h-screen flex items-center justify-center px-4 sm:px-8 py-24 overflow-hidden bg-[#0e0e0f] text-[#e5e2e3]">
      {/* Ambient Radial Bloom */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div className="w-[680px] h-[680px] rounded-full bg-gradient-to-tr from-[#f2ca50]/10 via-[#d2af48]/5 to-transparent blur-3xl transform -translate-y-12"></div>
        <div className="absolute top-1/4 -left-32 w-96 h-96 rounded-full bg-[#f2ca50]/5 blur-2xl"></div>
      </div>

      {/* Top Protocol Headers */}
      <div className="absolute top-24 left-6 sm:left-12 flex items-center gap-3 text-[#d0c5af]/60">
        <span className="font-sans text-[11px] tracking-[0.25em] text-[#f2ca50]/90 uppercase font-medium">
          18 PLACE VENDÔME · PARIS
        </span>
        <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50]/40"></span>
        <span className="font-sans text-[11px] tracking-[0.2em] hidden sm:inline uppercase">
          VAULT PROTOCOL V.4
        </span>
      </div>

      <div className="absolute top-24 right-6 sm:right-12 flex items-center gap-2 text-[#d0c5af]/70">
        <span className="material-symbols-outlined text-sm text-[#f2ca50]">lock</span>
        <span className="font-sans text-[10px] tracking-widest uppercase">
          EAL-6+ HSM ENCRYPTION
        </span>
      </div>

      {/* Main Two-Column Gateway Layout */}
      <div className="relative z-10 w-full max-w-5xl grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
        {/* Left Column: Dossier & Verified Lot Card */}
        <div className="lg:col-span-5 flex flex-col justify-between space-y-6 pr-0 lg:pr-4">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#1c1b1c] rounded-full border border-[#353436]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f2ca50] animate-pulse"></span>
              <span className="font-sans text-[10px] tracking-wider text-[#f2ca50] uppercase font-semibold">
                LE CERCLE PRIVÉ
              </span>
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl text-[#e5e2e3] tracking-tight leading-tight">
              Confidential<br />
              <span className="italic font-normal text-[#f2ca50]">Patron Gateway</span>
            </h1>
            <p className="font-sans text-xs sm:text-sm text-[#ccc6bd] leading-relaxed max-w-md font-light">
              Dedicated portal for patrons holding custody of bespoke high-carat parures, royal commission dossiers, and private viewing vaults.
            </p>
          </div>

          {/* Featured Lot Card */}
          <div className="relative group overflow-hidden rounded-lg bg-[#1c1b1c] p-3 shadow-2xl border border-[#353436]/50">
            <div className="relative h-48 sm:h-52 w-full rounded overflow-hidden">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDAu_ZHuBH9_EQxk6Dc1GGaIuzXZL9qrMagfnA5Ww2NxcP5sOUq0cq2G-def5nT7z8y7Uiglt5MNz8KkVrKGS70LJDOgiY9x4kzMiBCtCpz_2evSgjeKhkP-lXfBV0jbiNGa0qR1v3sPejnjzQTGlJdh8MEae3q18tKwdAzGVX8qSyev7cxjEhC-BPVbASr5C6meb1odXTUcHNNllQiNPmZ-2x_zgaTKBGTxnw4NqqJ0nHFHjlomUts9w"
                alt="The Sun of Vendôme Solitaire"
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e0f] via-[#0e0e0f]/20 to-transparent"></div>
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between">
                <div>
                  <p className="font-sans text-[10px] text-[#f2ca50] tracking-widest uppercase font-medium">
                    LOT 104 · SALON 3
                  </p>
                  <p className="font-serif text-lg text-[#e5e2e3]">The Sun of Vendôme (18.42 ct)</p>
                </div>
                <span className="material-symbols-outlined text-[#f2ca50] text-xl">verified</span>
              </div>
            </div>
          </div>

          {/* Concierge Hotline */}
          <div className="flex items-center justify-between pt-1 text-[#d0c5af]/80">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#f2ca50] text-base">support_agent</span>
              <span className="font-sans text-[10px] tracking-wider uppercase">CONCIERGE EMERGENCY:</span>
            </div>
            <a
              href="tel:+33142680000"
              className="font-sans text-xs text-[#f2ca50] tracking-wider hover:underline font-medium"
            >
              +33 1 42 68 00 00
            </a>
          </div>
        </div>

        {/* Right Column: Authentication Panel */}
        <div className="lg:col-span-7">
          <div className="relative rounded-xl bg-[#1c1b1c]/95 p-6 sm:p-10 shadow-2xl backdrop-blur-md border border-[#353436]">
            {/* Top Navigation Tabs */}
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-[#353436]/60">
              <div className="flex gap-2 p-1 bg-[#201f20] rounded-lg border border-[#353436]">
                <button
                  type="button"
                  className={`px-4 py-2 rounded font-sans text-[11px] tracking-wider uppercase transition-all ${
                    authMethod === 'credentials'
                      ? 'bg-[#d4af37] text-[#554300] font-semibold shadow-sm'
                      : 'text-[#ccc6bd] hover:text-[#e5e2e3]'
                  }`}
                  onClick={() => setAuthMethod('credentials')}
                >
                  CONCIERGE KEY
                </button>
                <button
                  type="button"
                  className={`px-4 py-2 rounded font-sans text-[11px] tracking-wider uppercase transition-all ${
                    authMethod === 'biometric'
                      ? 'bg-[#d4af37] text-[#554300] font-semibold shadow-sm'
                      : 'text-[#ccc6bd] hover:text-[#e5e2e3]'
                  }`}
                  onClick={() => setAuthMethod('biometric')}
                >
                  BIOMETRIC CARD / MONOGRAPH
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1.5 text-[#ccc6bd]">
                <span className="material-symbols-outlined text-sm text-[#f2ca50]">vpn_key</span>
                <span className="font-sans text-[11px] uppercase tracking-wider">SECURE GATE</span>
              </div>
            </div>

            {/* View 1: Credentials Form */}
            {authMethod === 'credentials' ? (
              <form onSubmit={handleAccessSubmit} className="space-y-5">
                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-sans text-[10px] text-[#ccc6bd] uppercase tracking-wider">
                      HONORIFIC MEMBER IDENTIFIER / CIPHER EMAIL
                    </label>
                    <span className="font-sans text-[10px] text-[#f2ca50]/80">e.g. VAL-9921</span>
                  </div>
                  <div className="relative">
                    <input
                      type="text"
                      value={memberId}
                      onChange={(e) => setMemberId(e.target.value)}
                      placeholder="VAL-XXXX or patron@domain.ch"
                      className="w-full bg-[#201f20] px-4 py-3 rounded text-[#e5e2e3] font-sans text-sm placeholder:text-[#4d4635] focus:outline-none focus:bg-[#2a2a2b] border border-[#353436] transition-colors"
                      required
                    />
                    <span className="material-symbols-outlined absolute right-3 top-3 text-[#99907c] pointer-events-none text-xl">
                      fingerprint
                    </span>
                  </div>
                </div>

                <div className="space-y-1">
                  <div className="flex justify-between items-center">
                    <label className="font-sans text-[10px] text-[#ccc6bd] uppercase tracking-wider">
                      MASTER PASSPHRASE / VAULT CIPHER
                    </label>
                    <button
                      type="button"
                      onClick={() => setForgotModalOpen(true)}
                      className="font-sans text-[10px] text-[#f2ca50] hover:underline"
                    >
                      FORGOTTEN CIPHER?
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showPass ? 'text' : 'password'}
                      value={passphrase}
                      onChange={(e) => setPassphrase(e.target.value)}
                      placeholder="Master Passphrase"
                      className="w-full bg-[#201f20] px-4 py-3 rounded text-[#e5e2e3] font-sans text-sm placeholder:text-[#4d4635] focus:outline-none focus:bg-[#2a2a2b] border border-[#353436] transition-colors tracking-widest"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPass(!showPass)}
                      className="material-symbols-outlined absolute right-3 top-3 text-[#99907c] hover:text-[#e5e2e3] text-xl"
                    >
                      {showPass ? 'visibility_off' : 'visibility'}
                    </button>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      defaultChecked
                      className="w-4 h-4 rounded bg-[#201f20] accent-[#f2ca50]"
                    />
                    <span className="font-sans text-[11px] text-[#ccc6bd]">
                      Remember Maison Session on Secure Terminal
                    </span>
                  </label>
                  <span className="font-sans text-[11px] text-[#f2ca50]/80">TLS 1.3 / HSM Verified</span>
                </div>

                <div className="pt-2 space-y-3">
                  <button
                    type="submit"
                    disabled={isDecrypting}
                    className="w-full py-3.5 bg-[#f2ca50] text-[#3c2f00] font-sans text-xs tracking-[0.22em] font-semibold rounded hover:bg-[#ffe088] transition-all flex items-center justify-center gap-3 group shadow-lg cursor-pointer disabled:opacity-75"
                  >
                    {isDecrypting ? (
                      <>
                        <span className="inline-block animate-spin mr-2">⟳</span>
                        <span>DECRYPTING HARDWARE HSM...</span>
                      </>
                    ) : (
                      <>
                        <span>ACCESS PRIVATE SALON &amp; VAULT</span>
                        <span className="material-symbols-outlined text-lg group-hover:translate-x-1 transition-transform">
                          arrow_forward
                        </span>
                      </>
                    )}
                  </button>

                  {/* Google OAuth Button Connected to Firebase Auth */}
                  <button
                    type="button"
                    onClick={handleGoogleAuth}
                    disabled={googleLoading}
                    className="w-full py-3 bg-[#201f20] hover:bg-[#2a2a2b] text-[#e5e2e3] border border-[#d4af37]/40 font-sans text-xs tracking-wider uppercase rounded transition-all flex items-center justify-center gap-3 cursor-pointer"
                  >
                    <svg className="w-4 h-4" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
                    </svg>
                    <span>{googleLoading ? 'Connecting to Firebase...' : 'Sign In with Google Patron Auth'}</span>
                  </button>
                </div>
              </form>
            ) : (
              /* View 2: Biometric Card / Monograph Scan */
              <div className="space-y-6 py-2">
                <div
                  className="flex flex-col items-center justify-center text-center p-8 bg-[#201f20] rounded-lg space-y-4 border border-[#353436] cursor-pointer group"
                  onClick={handleAccessSubmit}
                >
                  <div className="relative flex items-center justify-center w-20 h-20 rounded-full bg-[#2a2a2b] group-hover:scale-105 transition-transform">
                    <div className="absolute inset-0 rounded-full border-2 border-[#f2ca50]/40 animate-ping opacity-25"></div>
                    <span className="material-symbols-outlined text-[#f2ca50] text-4xl">contactless</span>
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl text-[#e5e2e3]">Present Diplomatic NFC Monograph</h3>
                    <p className="font-sans text-xs text-[#ccc6bd] max-w-sm">
                      Tap physical Aurelia Titanium Keycard or trigger Apple PassKey / YubiKey FIDO2 token.
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between text-[#99907c] font-sans text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#f2ca50]"></span>
                    Hardware Interface: Active
                  </span>
                  <span>ISO 7816 / FIPS 140-3</span>
                </div>

                <button
                  type="button"
                  onClick={handleAccessSubmit}
                  className="w-full py-3.5 bg-[#2a2a2b] text-[#f2ca50] font-sans text-xs uppercase tracking-[0.2em] rounded hover:bg-[#353436] transition-colors flex items-center justify-center gap-2 cursor-pointer font-semibold"
                >
                  <span>TRIGGER BIOMETRIC SCAN</span>
                  <span className="material-symbols-outlined text-base">sensors</span>
                </button>
              </div>
            )}

            {/* Bottom Inscription & Delegation Ribbon */}
            <div className="mt-8 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left bg-[#201f20]/60 -mx-6 -mb-6 sm:-mx-10 sm:-mb-10 px-6 sm:px-10 py-4 rounded-b-xl border-t border-[#353436]">
              <div>
                <p className="font-sans text-[11px] text-[#ccc6bd]">Prospective High Patron?</p>
                <button
                  type="button"
                  onClick={() => setInscriptionModalOpen(true)}
                  className="font-sans text-xs text-[#f2ca50] hover:text-[#ffe088] tracking-wider underline cursor-pointer"
                >
                  REQUEST INSCRIPTION INTO LE CERCLE PRIVÉ
                </button>
              </div>
              <div className="flex items-center gap-4 text-[#99907c] font-sans text-[11px]">
                <span>GENEVA</span>
                <span>LONDON</span>
                <span className="text-[#e5e2e3] font-medium">PARIS</span>
                <span>TOKYO</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Forgotten Cipher Modal */}
      {forgotModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0e0e0f]/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#1c1b1c] max-w-md w-full p-6 sm:p-8 rounded-xl shadow-2xl relative space-y-4 border border-[#353436]">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#f2ca50]">security</span>
                <h3 className="font-serif text-xl text-[#e5e2e3]">Restricted Cipher Recovery</h3>
              </div>
              <button
                onClick={() => setForgotModalOpen(false)}
                className="text-[#99907c] hover:text-[#e5e2e3]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>
            <p className="font-sans text-xs text-[#ccc6bd] leading-relaxed">
              In accordance with Place Vendôme Vault Protocol V.4, cryptographic seeds cannot be reset over unsecured HTTP.
              Please contact your dedicated Vendôme Concierge directly via priority diplomatic voice channel:
            </p>
            <div className="p-4 bg-[#201f20] rounded border border-[#4d4635] text-center space-y-1">
              <span className="font-sans text-[10px] text-[#99907c] uppercase tracking-wider block">
                Direct Liaison Desk
              </span>
              <a
                href="tel:+33142680000"
                className="font-serif text-2xl text-[#f2ca50] hover:underline"
              >
                +33 1 42 68 00 00
              </a>
              <p className="font-sans text-[11px] text-[#99907c]">Disponible 24h/24 • Chiffrement EAL-6+</p>
            </div>
            <button
              type="button"
              onClick={() => setForgotModalOpen(false)}
              className="w-full py-2.5 bg-[#2a2a2b] hover:bg-[#353436] text-[#e5e2e3] font-sans text-xs uppercase tracking-wider rounded"
            >
              Fermer la Fenêtre
            </button>
          </div>
        </div>
      )}

      {/* Inscription Modal */}
      {inscriptionModalOpen && (
        <div className="fixed inset-0 z-50 bg-[#0e0e0f]/90 backdrop-blur-xl flex items-center justify-center p-4">
          <div className="bg-[#1c1b1c] max-w-lg w-full p-6 sm:p-8 rounded-xl shadow-2xl relative space-y-5 border border-[#d4af37]/40">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-sans text-[10px] text-[#f2ca50] uppercase tracking-widest font-semibold">
                  CONFIDENTIAL PROTOCOL
                </span>
                <h3 className="font-serif text-2xl text-[#e5e2e3] mt-1">Request Patron Inscription</h3>
              </div>
              <button
                onClick={() => setInscriptionModalOpen(false)}
                className="text-[#99907c] hover:text-[#e5e2e3]"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <p className="font-sans text-xs text-[#ccc6bd] font-light leading-relaxed">
              Admission to Le Cercle Privé requires sponsorship by two existing patrons or an established private banking relationship with our Place Vendôme trust.
            </p>

            {inscSuccess ? (
              <div className="p-6 bg-[#201f20] rounded border border-[#f2ca50]/50 text-center space-y-2">
                <span className="material-symbols-outlined text-3xl text-[#f2ca50]">check_circle</span>
                <h4 className="font-serif text-lg text-[#e5e2e3]">Dossier Enregistré</h4>
                <p className="font-sans text-xs text-[#d0c5af]">
                  Your cryptographic dossier has been dispatched to the Vendôme Inscription Committee. Our chief officer will contact you within 24 hours via secure liaison.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInscriptionSubmit} className="space-y-4">
                <div>
                  <label className="font-sans text-[10px] text-[#ccc6bd] uppercase block mb-1">
                    Honorific Name &amp; Title
                  </label>
                  <input
                    type="text"
                    value={inscName}
                    onChange={(e) => setInscName(e.target.value)}
                    placeholder="e.g. Baroness / Lord / Excellency"
                    className="w-full bg-[#201f20] px-4 py-2.5 rounded text-[#e5e2e3] font-sans text-xs focus:outline-none border border-[#353436]"
                    required
                  />
                </div>
                <div>
                  <label className="font-sans text-[10px] text-[#ccc6bd] uppercase block mb-1">
                    Encrypted Liaison Contact
                  </label>
                  <input
                    type="email"
                    value={inscEmail}
                    onChange={(e) => setInscEmail(e.target.value)}
                    placeholder="confidential@familyoffice.ch"
                    className="w-full bg-[#201f20] px-4 py-2.5 rounded text-[#e5e2e3] font-sans text-xs focus:outline-none border border-[#353436]"
                    required
                  />
                </div>
                <div>
                  <label className="font-sans text-[10px] text-[#ccc6bd] uppercase block mb-1">
                    Primary Family Office or Sponsoring Patron
                  </label>
                  <input
                    type="text"
                    value={inscSponsor}
                    onChange={(e) => setInscSponsor(e.target.value)}
                    placeholder="Optional Sponsor Monogram"
                    className="w-full bg-[#201f20] px-4 py-2.5 rounded text-[#e5e2e3] font-sans text-xs focus:outline-none border border-[#353436]"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-3.5 bg-[#f2ca50] text-[#3c2f00] font-sans text-xs uppercase tracking-widest font-semibold rounded mt-2 hover:bg-[#ffe088] transition-colors"
                >
                  TRANSMIT SEALED DOSSIER
                </button>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
