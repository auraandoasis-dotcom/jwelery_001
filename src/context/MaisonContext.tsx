import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  User, 
  onAuthStateChanged 
} from 'firebase/auth';
import { 
  doc, 
  setDoc, 
  getDoc, 
  collection, 
  query, 
  where, 
  onSnapshot, 
  addDoc, 
  updateDoc, 
  deleteDoc,
  serverTimestamp,
  getDocs 
} from 'firebase/firestore';
import { 
  auth, 
  db, 
  loginWithGoogle, 
  logoutUser, 
  handleFirestoreError, 
  OperationType 
} from '../lib/firebase';

export type MaisonScreen = 'cinematic' | 'specimen' | 'gateway' | 'dashboard' | 'admin';

export interface PatronProfile {
  uid: string;
  email: string;
  honorific: string;
  memberId: string;
  tier: string;
  stars: number;
  portfolioValue: string;
  guardianLiaison: string;
}

export interface SalonAppointment {
  id: string;
  userId: string;
  sessionCode?: string;
  title: string;
  salonLocation: string;
  preferredDate: string;
  timeSlot: string;
  creationsOfInterest: string;
  armedEscort: boolean;
  guestsAllowed: string;
  champagne: string;
  quote?: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  clientEmail?: string;
  createdAt?: string;
}

export interface VaultPiece {
  id: string;
  userId: string;
  title: string;
  category: string;
  caratWeight: string;
  specs: string;
  valuation: string;
  status: 'custodial' | 'option_vip' | 'in_atelier';
  location: string;
  imageUrl: string;
  reservedUntil?: string;
  gemReportNumber?: string;
}

export interface EncryptedMessage {
  id: string;
  userId: string;
  senderEmail?: string;
  nature: string;
  message: string;
  createdAt: string;
}

export interface PatronInscription {
  id: string;
  honorificName: string;
  contactEmail: string;
  familyOfficeSponsor?: string;
  status: string;
  createdAt: string;
}

export interface PatronLoginRecord {
  id: string;
  userId: string;
  email: string;
  displayName: string;
  authMethod: string;
  terminalInfo: string;
  loginAt: string;
}

interface MaisonContextType {
  screen: MaisonScreen;
  setScreen: (screen: MaisonScreen) => void;
  user: User | null;
  isAdmin: boolean;
  patronProfile: PatronProfile;
  appointments: SalonAppointment[];
  vaultPieces: VaultPiece[];
  loginsRegistry: PatronLoginRecord[];
  allAppointments: SalonAppointment[];
  allInscriptions: PatronInscription[];
  allMessages: EncryptedMessage[];
  soundActive: boolean;
  setSoundActive: React.Dispatch<React.SetStateAction<boolean>>;
  loginGoogle: () => Promise<void>;
  simulatePatronAccess: (customEmail?: string, customName?: string) => Promise<void>;
  logout: () => Promise<void>;
  bookAppointment: (apt: Partial<SalonAppointment>) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  sendSignalMessage: (nature: string, message: string) => Promise<void>;
  submitInscription: (name: string, email: string, sponsor?: string) => Promise<void>;
  inspectPiece: (pieceId?: string) => void;
  recordLoginAudit: (uid: string, email: string, displayName: string, method: string) => Promise<void>;
  downloadStandaloneHTML: () => void;
}

const defaultPatron: PatronProfile = {
  uid: 'vendome-patron-demo',
  email: 'valmont@cercle-aurelia.paris',
  honorific: 'Comtesse de Valmont',
  memberId: 'VENDÔME-ROYAL-781',
  tier: 'Grand Mécène — Rang Impérial',
  stars: 48500,
  portfolioValue: '8,420,000 €',
  guardianLiaison: 'M. Jean-Philippe Morel',
};

const initialAppointments: SalonAppointment[] = [
  {
    id: 'apt-784',
    userId: 'vendome-patron-demo',
    clientEmail: 'valmont@cercle-aurelia.paris',
    sessionCode: 'Séance Confidentielle #784',
    title: 'Présentation : Le Solitaire Fancy Vivid Yellow 14.28ct & Collier Céleste',
    salonLocation: 'Salon Privé Impérial — 26 Place Vendôme, 75001 Paris',
    preferredDate: 'Jeudi 15 Mai 2025',
    timeSlot: '16:30 — 18:30 CET',
    creationsOfInterest: 'Solitaire Sol Invictus & Collier Céleste',
    armedEscort: true,
    guestsAllowed: '1 Accompagnant (Max 2)',
    champagne: 'Dom Pérignon P2 2004',
    quote: '« Chère Comtesse, la pièce a été spécialement rapatriée du coffre fortifié de Zurich pour votre regard exclusif avant sa présentation publique à Genève. La lumière du Salon Impérial sera calibrée sur le spectre nordique à 17h00. »',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
  },
  {
    id: 'apt-summer',
    userId: 'vendome-patron-demo',
    clientEmail: 'valmont@cercle-aurelia.paris',
    sessionCode: 'Salon Privé — Suisse',
    title: 'Vernissage d’Été au Lac Léman',
    salonLocation: 'Palais privé au bord du Lac Léman, Genève',
    preferredDate: '04 Juillet 2025',
    timeSlot: '18:00 CET',
    creationsOfInterest: 'Émeraudes de Colombie du XVIIIe siècle',
    armedEscort: true,
    guestsAllowed: '2 Invités',
    champagne: 'Krug Clos d\'Ambonnay',
    status: 'confirmed',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

const initialVaultPieces: VaultPiece[] = [
  {
    id: 'piece-collier-celeste',
    userId: 'vendome-patron-demo',
    title: 'Collier Céleste',
    category: 'High Jewelry Suite',
    caratWeight: '46.50 ct',
    specs: '1,280 diamants taille brillant & poire sertis sur platine 950/1000.',
    valuation: '€4,250,000',
    status: 'custodial',
    location: 'Coffre Fort Haute Sécurité — Genève',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBo2R5AF4duioqgE0Fdrsi2SvH5IGVwcmAvH3syI_zMnXGBOpp6_GhUCuOG8I0foXzkSg40JsjsTJ8XnVk3L8w9kan2yldQqjNdzGLN4szoG-xFgZuEoDHMaukYe5H75vfdzmVe5WvoABxIGqSohhOCS6Q0wJITccmKBAXmMvBO-TQpMUQHZCmERDJBi3wGEfG6ThXSEvbLDrDol5DXyBud_9aLsUpNOodbIFInDSqTrqWvjJJd2dpR-Q',
    gemReportNumber: 'GIA #55198201',
  },
  {
    id: 'piece-sol-invictus',
    userId: 'vendome-patron-demo',
    title: 'Bague Sol Invictus',
    category: 'Emerald Solitaire',
    caratWeight: '14.28 ct',
    specs: 'Fancy Vivid Yellow Diamant Émeraude, certifié GIA Natural Diamond.',
    valuation: '€3,950,000',
    status: 'option_vip',
    location: 'Salon Privé Vendôme — Coffre Fort N° 4',
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD8zkxOEYoIrbKazQtwfOgs3SIN2W3LB045So8cHIRphGY3Ax40kN1b5tvaJ4YZNHjmfe6vm9XMQiUImNn6CS7IgCMkxBmBtw8o5DdkEZn1eLF-pMZW4-i6Kzij-HGItES1zUdYm-a_ZfVu1ip2RHlDat1_aGvq90QvozoxFkHTiY4T1IFCBLm50bjazgdUodW-XU4HGA_8d60AShzbp0OXFnUktqeBr4Y4l4sEHg14FUFj8ViazDyHMQ',
    reservedUntil: '20 Mai 2025',
    gemReportNumber: 'GIA #221849021',
  },
  {
    id: 'piece-constellation',
    userId: 'vendome-patron-demo',
    title: 'Bague Constellation Royale',
    category: 'Coronet Ring',
    caratWeight: '9.15 ct',
    specs: 'Coussin bleu royal saphir non chauffé Ceylan dans un panier filigrane Renaissance.',
    valuation: '€1,820,000',
    status: 'custodial',
    location: 'Sanctuaire Place Vendôme, Paris',
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UksdcaDM0eupucp9C8392SnKYMJhwq16pBMDdmLNg2PxVkyjXzmlDrMzWLKHrDcVh281aeovH6yH1I_qgPbLmqWl79cLH-5UPCYWLrwEw6HGU03X3vx_-yG0wtZxjZ-yaJI-_TW83b-cIWKm5ZrbD0p7kbhkqeQUeXpKnzRXgyRJ5mh-q1wfKRTFQLxV2Gb4TFzNTpUnfN2G7N1f4bKaM1hfOubrhbMu_szgldeSbFWeIvA4nU91Yj6Tp2',
    gemReportNumber: 'Gübelin #9811',
  }
];

const initialSampleLogins: PatronLoginRecord[] = [
  {
    id: 'log-1',
    userId: 'patron-auraandoasis',
    email: 'auraandoasis@gmail.com',
    displayName: 'Maison Directrice / Admin',
    authMethod: 'Google OAuth (Secured)',
    terminalInfo: 'Macintosh / Chrome 124 (Place Vendôme HQ)',
    loginAt: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'log-2',
    userId: 'vendome-patron-demo',
    email: 'valmont@cercle-aurelia.paris',
    displayName: 'Comtesse de Valmont',
    authMethod: 'Concierge Key (HSM EAL-6+)',
    terminalInfo: 'Secure Vendôme Touch Terminal 04',
    loginAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
  }
];

const initialSampleInscriptions: PatronInscription[] = [
  {
    id: 'insc-1',
    honorificName: 'Baronne Éléonore de Rothschild',
    contactEmail: 'e.rothschild@geneva-trust.ch',
    familyOfficeSponsor: 'Cercle Privé Suisse Sponsor Monogram',
    status: 'pending',
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
  },
  {
    id: 'insc-2',
    honorificName: 'Lord Alistair Sterling of Mayfair',
    contactEmail: 'sterling@mayfair-holdings.co.uk',
    familyOfficeSponsor: 'London Private Banking Trust #882',
    status: 'reviewed',
    createdAt: new Date(Date.now() - 86400000 * 5).toISOString(),
  }
];

const initialSampleMessages: EncryptedMessage[] = [
  {
    id: 'msg-1',
    userId: 'vendome-patron-demo',
    senderEmail: 'valmont@cercle-aurelia.paris',
    nature: 'Acquisition Confidential Gem (Sol Invictus)',
    message: 'Je souhaite confirmer le transfert du Sol Invictus pour notre présentation du 15 mai avec calibrage nordique.',
    createdAt: new Date(Date.now() - 86400000).toISOString(),
  }
];

const MaisonContext = createContext<MaisonContextType | undefined>(undefined);

export const MaisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<MaisonScreen>('cinematic');
  const [user, setUser] = useState<User | null>(null);
  const [patronProfile, setPatronProfile] = useState<PatronProfile>(defaultPatron);
  const [appointments, setAppointments] = useState<SalonAppointment[]>(initialAppointments);
  const [vaultPieces, setVaultPieces] = useState<VaultPiece[]>(initialVaultPieces);
  const [soundActive, setSoundActive] = useState<boolean>(true);

  // Admin and Auditing registries
  const [loginsRegistry, setLoginsRegistry] = useState<PatronLoginRecord[]>(initialSampleLogins);
  const [allAppointments, setAllAppointments] = useState<SalonAppointment[]>(initialAppointments);
  const [allInscriptions, setAllInscriptions] = useState<PatronInscription[]>(initialSampleInscriptions);
  const [allMessages, setAllMessages] = useState<EncryptedMessage[]>(initialSampleMessages);

  const isAdmin = user?.email === 'auraandoasis@gmail.com' || patronProfile.email === 'auraandoasis@gmail.com' || screen === 'admin';

  // Audit record function
  const recordLoginAudit = async (uid: string, email: string, displayName: string, method: string) => {
    const record: PatronLoginRecord = {
      id: `login-${Date.now()}`,
      userId: uid,
      email: email || 'patron@vendome.paris',
      displayName: displayName || 'Patron d\'Honneur',
      authMethod: method,
      terminalInfo: typeof navigator !== 'undefined' ? `${navigator.platform || 'Client Terminal'} • ${navigator.userAgent.slice(0, 40)}` : 'Secure Terminal',
      loginAt: new Date().toISOString(),
    };

    setLoginsRegistry(prev => [record, ...prev]);

    try {
      await addDoc(collection(db, 'patronLogins'), {
        ...record,
        timestamp: serverTimestamp(),
      });
    } catch (err) {
      console.warn("Could not write patronLogin to Firestore:", err);
    }
  };

  // Monitor Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const uid = currentUser.uid;
        const email = currentUser.email || 'auraandoasis@gmail.com';
        const name = currentUser.displayName || (email.split('@')[0]);

        // Record login audit in Firestore
        await recordLoginAudit(uid, email, name, 'Google OAuth (Firebase Auth)');

        // Fetch or create patron profile
        try {
          const patronDocRef = doc(db, 'patrons', uid);
          const snap = await getDoc(patronDocRef);
          if (snap.exists()) {
            setPatronProfile(snap.data() as PatronProfile);
          } else {
            const isOwnerEmail = email.toLowerCase() === 'auraandoasis@gmail.com';
            const newProfile: PatronProfile = {
              uid,
              email,
              honorific: isOwnerEmail ? 'Maison Directrice / Admin' : `Comte(sse) ${name}`,
              memberId: `VENDÔME-${uid.slice(0, 6).toUpperCase()}`,
              tier: isOwnerEmail ? 'Grand Maître Directoire' : 'Grand Mécène — Rang Impérial',
              stars: 50000,
              portfolioValue: '€14,850,000',
              guardianLiaison: 'M. Jean-Philippe Morel',
            };
            await setDoc(patronDocRef, newProfile);
            setPatronProfile(newProfile);
          }
        } catch (error) {
          console.warn("Profile sync warning:", error);
        }

        // Realtime Listeners for Appointments
        try {
          const qApt = query(collection(db, 'appointments'));
          const unsubApts = onSnapshot(qApt, (snapshot) => {
            const list: SalonAppointment[] = [];
            snapshot.forEach((docSnap) => {
              list.push({ id: docSnap.id, ...docSnap.data() } as SalonAppointment);
            });
            if (list.length > 0) {
              setAllAppointments(list);
              // Filter for current user or show all for admin
              if (email === 'auraandoasis@gmail.com') {
                setAppointments(list);
              } else {
                const userList = list.filter(a => a.userId === uid);
                if (userList.length > 0) setAppointments(userList);
              }
            }
          }, (err) => console.warn("Appointments listener:", err));

          // Realtime Listeners for Logins
          const qLogins = query(collection(db, 'patronLogins'));
          const unsubLogins = onSnapshot(qLogins, (snapshot) => {
            const list: PatronLoginRecord[] = [];
            snapshot.forEach((docSnap) => {
              list.push({ id: docSnap.id, ...docSnap.data() } as PatronLoginRecord);
            });
            if (list.length > 0) {
              // Sort descending by loginAt
              list.sort((a, b) => new Date(b.loginAt).getTime() - new Date(a.loginAt).getTime());
              setLoginsRegistry(list);
            }
          }, (err) => console.warn("Logins listener:", err));

          // Realtime Listeners for Inscriptions
          const qInsc = query(collection(db, 'inscriptions'));
          const unsubInsc = onSnapshot(qInsc, (snapshot) => {
            const list: PatronInscription[] = [];
            snapshot.forEach((docSnap) => {
              list.push({ id: docSnap.id, ...docSnap.data() } as PatronInscription);
            });
            if (list.length > 0) {
              setAllInscriptions(list);
            }
          }, (err) => console.warn("Inscriptions listener:", err));

          // Realtime Listeners for Messages
          const qMsg = query(collection(db, 'encryptedMessages'));
          const unsubMsg = onSnapshot(qMsg, (snapshot) => {
            const list: EncryptedMessage[] = [];
            snapshot.forEach((docSnap) => {
              list.push({ id: docSnap.id, ...docSnap.data() } as EncryptedMessage);
            });
            if (list.length > 0) {
              setAllMessages(list);
            }
          }, (err) => console.warn("Messages listener:", err));

          return () => {
            unsubApts();
            unsubLogins();
            unsubInsc();
            unsubMsg();
          };
        } catch (err) {
          console.warn("Realtime listeners init:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const loginGoogle = async () => {
    try {
      const u = await loginWithGoogle();
      if (u) {
        if (u.email === 'auraandoasis@gmail.com') {
          setScreen('admin');
        } else {
          setScreen('dashboard');
        }
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const simulatePatronAccess = async (customEmail?: string, customName?: string) => {
    const email = customEmail || 'valmont@cercle-aurelia.paris';
    const name = customName || 'Comtesse de Valmont';
    await recordLoginAudit('demo-patron-key', email, name, 'Concierge Key (HSM EAL-6+)');
    setPatronProfile({
      ...defaultPatron,
      email,
      honorific: name,
    });
    setScreen('dashboard');
  };

  const logout = async () => {
    try {
      await logoutUser();
      setPatronProfile(defaultPatron);
      setScreen('cinematic');
    } catch (err) {
      setScreen('cinematic');
    }
  };

  const bookAppointment = async (apt: Partial<SalonAppointment>) => {
    const currentUid = user?.uid || 'vendome-patron-demo';
    const currentEmail = user?.email || patronProfile.email || 'client@vendome.paris';
    const newApt: SalonAppointment = {
      id: `apt-${Date.now()}`,
      userId: currentUid,
      clientEmail: currentEmail,
      sessionCode: `Séance Confidentielle #${Math.floor(100 + Math.random() * 900)}`,
      title: apt.title || `Présentation Privée : ${apt.creationsOfInterest || 'The High Creations'}`,
      salonLocation: apt.salonLocation || '26 Place Vendôme, 75001 Paris',
      preferredDate: apt.preferredDate || '2025-05-20',
      timeSlot: apt.timeSlot || '16:30 CET',
      creationsOfInterest: apt.creationsOfInterest || 'Collier Céleste & Sol Invictus',
      armedEscort: apt.armedEscort ?? true,
      guestsAllowed: apt.guestsAllowed || '1 Accompagnant (Max 2)',
      champagne: 'Dom Pérignon P2 2004',
      status: 'confirmed',
      createdAt: new Date().toISOString(),
    };

    setAppointments(prev => [newApt, ...prev]);
    setAllAppointments(prev => [newApt, ...prev]);

    try {
      await addDoc(collection(db, 'appointments'), {
        ...newApt,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn("Appointment write warning:", err);
    }
  };

  const cancelAppointment = async (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
    setAllAppointments(prev => prev.filter(a => a.id !== id));
    if (user) {
      try {
        await deleteDoc(doc(db, 'appointments', id));
      } catch (err) {
        handleFirestoreError(err, OperationType.DELETE, `appointments/${id}`);
      }
    }
  };

  const sendSignalMessage = async (nature: string, message: string) => {
    const currentUid = user?.uid || 'vendome-patron-demo';
    const currentEmail = user?.email || patronProfile.email || 'patron@cercle-aurelia.paris';
    const newMsg: EncryptedMessage = {
      id: `msg-${Date.now()}`,
      userId: currentUid,
      senderEmail: currentEmail,
      nature,
      message,
      createdAt: new Date().toISOString(),
    };

    setAllMessages(prev => [newMsg, ...prev]);

    try {
      await addDoc(collection(db, 'encryptedMessages'), {
        userId: currentUid,
        senderEmail: currentEmail,
        nature,
        message,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Message write warning:", err);
    }
  };

  const submitInscription = async (name: string, email: string, sponsor?: string) => {
    const newInsc: PatronInscription = {
      id: `insc-${Date.now()}`,
      honorificName: name,
      contactEmail: email,
      familyOfficeSponsor: sponsor || 'Direct High Patron Petition',
      status: 'pending',
      createdAt: new Date().toISOString(),
    };

    setAllInscriptions(prev => [newInsc, ...prev]);

    try {
      await addDoc(collection(db, 'inscriptions'), {
        ...newInsc,
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Inscription write warning:", err);
    }
  };

  const inspectPiece = (_pieceId?: string) => {
    setScreen('specimen');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper to trigger browser download of the standalone HTML file
  const downloadStandaloneHTML = () => {
    const link = document.createElement('a');
    link.href = '/aurelia-haute-joaillerie.html';
    link.download = 'aurelia-haute-joaillerie.html';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <MaisonContext.Provider
      value={{
        screen,
        setScreen,
        user,
        isAdmin,
        patronProfile,
        appointments,
        vaultPieces,
        loginsRegistry,
        allAppointments,
        allInscriptions,
        allMessages,
        soundActive,
        setSoundActive,
        loginGoogle,
        simulatePatronAccess,
        logout,
        bookAppointment,
        cancelAppointment,
        sendSignalMessage,
        submitInscription,
        inspectPiece,
        recordLoginAudit,
        downloadStandaloneHTML,
      }}
    >
      {children}
    </MaisonContext.Provider>
  );
};

export const useMaison = () => {
  const context = useContext(MaisonContext);
  if (!context) {
    throw new Error('useMaison must be used within a MaisonProvider');
  }
  return context;
};
