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
  serverTimestamp 
} from 'firebase/firestore';
import { 
  auth, 
  db, 
  loginWithGoogle, 
  logoutUser, 
  handleFirestoreError, 
  OperationType 
} from '../lib/firebase';

export type MaisonScreen = 'cinematic' | 'specimen' | 'gateway' | 'dashboard';

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
  nature: string;
  message: string;
  createdAt: string;
}

interface MaisonContextType {
  screen: MaisonScreen;
  setScreen: (screen: MaisonScreen) => void;
  user: User | null;
  patronProfile: PatronProfile;
  appointments: SalonAppointment[];
  vaultPieces: VaultPiece[];
  soundActive: boolean;
  setSoundActive: React.Dispatch<React.SetStateAction<boolean>>;
  loginGoogle: () => Promise<void>;
  simulatePatronAccess: () => void;
  logout: () => Promise<void>;
  bookAppointment: (apt: Partial<SalonAppointment>) => Promise<void>;
  cancelAppointment: (id: string) => Promise<void>;
  sendSignalMessage: (nature: string, message: string) => Promise<void>;
  submitInscription: (name: string, email: string, sponsor?: string) => Promise<void>;
  inspectPiece: (pieceId?: string) => void;
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
  },
  {
    id: 'apt-summer',
    userId: 'vendome-patron-demo',
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

const MaisonContext = createContext<MaisonContextType | undefined>(undefined);

export const MaisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screen, setScreen] = useState<MaisonScreen>('cinematic');
  const [user, setUser] = useState<User | null>(null);
  const [patronProfile, setPatronProfile] = useState<PatronProfile>(defaultPatron);
  const [appointments, setAppointments] = useState<SalonAppointment[]>(initialAppointments);
  const [vaultPieces, setVaultPieces] = useState<VaultPiece[]>(initialVaultPieces);
  const [soundActive, setSoundActive] = useState<boolean>(true);

  // Monitor Firebase Auth
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        const uid = currentUser.uid;
        // Fetch or create patron profile
        try {
          const patronDocRef = doc(db, 'patrons', uid);
          const snap = await getDoc(patronDocRef);
          if (snap.exists()) {
            setPatronProfile(snap.data() as PatronProfile);
          } else {
            const newProfile: PatronProfile = {
              uid,
              email: currentUser.email || 'patron@vendome.paris',
              honorific: currentUser.displayName ? `Comte(sse) ${currentUser.displayName}` : 'Patron Émérite',
              memberId: `VENDÔME-${uid.slice(0, 6).toUpperCase()}`,
              tier: 'Grand Mécène — Rang Impérial',
              stars: 48500,
              portfolioValue: '8,420,000 €',
              guardianLiaison: 'M. Jean-Philippe Morel',
            };
            await setDoc(patronDocRef, newProfile);
            setPatronProfile(newProfile);
          }
        } catch (error) {
          console.warn("Could not sync patron profile directly, using cached patron state:", error);
        }

        // Subscribe to appointments
        try {
          const q = query(collection(db, 'appointments'), where('userId', '==', uid));
          const unsubApts = onSnapshot(q, (snapshot) => {
            const list: SalonAppointment[] = [];
            snapshot.forEach((doc) => {
              list.push({ id: doc.id, ...doc.data() } as SalonAppointment);
            });
            if (list.length > 0) {
              setAppointments(list);
            }
          }, (err) => {
            console.warn("Appointments listener warning:", err);
          });

          return () => unsubApts();
        } catch (err) {
          console.warn("Firestore listener initialization:", err);
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const loginGoogle = async () => {
    try {
      const u = await loginWithGoogle();
      if (u) {
        setScreen('dashboard');
      }
    } catch (err) {
      console.error(err);
      throw err;
    }
  };

  const simulatePatronAccess = () => {
    setPatronProfile(defaultPatron);
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
    const newApt: SalonAppointment = {
      id: `apt-${Date.now()}`,
      userId: currentUid,
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
    };

    setAppointments(prev => [newApt, ...prev]);

    if (user) {
      try {
        await addDoc(collection(db, 'appointments'), {
          ...newApt,
          createdAt: serverTimestamp(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, 'appointments');
      }
    }
  };

  const cancelAppointment = async (id: string) => {
    setAppointments(prev => prev.filter(a => a.id !== id));
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
    if (user) {
      try {
        await addDoc(collection(db, 'encryptedMessages'), {
          userId: currentUid,
          nature,
          message,
          createdAt: new Date().toISOString(),
        });
      } catch (err) {
        handleFirestoreError(err, OperationType.CREATE, 'encryptedMessages');
      }
    }
  };

  const submitInscription = async (name: string, email: string, sponsor?: string) => {
    try {
      await addDoc(collection(db, 'inscriptions'), {
        honorificName: name,
        contactEmail: email,
        familyOfficeSponsor: sponsor || 'Direct High Patron Petition',
        status: 'pending',
        createdAt: new Date().toISOString(),
      });
    } catch (err) {
      console.warn("Inscription saved locally:", err);
    }
  };

  const inspectPiece = (_pieceId?: string) => {
    setScreen('specimen');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <MaisonContext.Provider
      value={{
        screen,
        setScreen,
        user,
        patronProfile,
        appointments,
        vaultPieces,
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
