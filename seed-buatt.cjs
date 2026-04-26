// seed-buatt.cjs
// Popola Firebase con i dati reali di Buatt Eboli
// Eseguire con regole Firebase aperte (allow read, write: if true)
// node seed-buatt.cjs

const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDe89pW8QGSLEZLI8DAFCieKIw63xZVmUc",
  authDomain: "siti-ristoranti.firebaseapp.com",
  projectId: "siti-ristoranti",
  storageBucket: "siti-ristoranti.firebasestorage.app",
  messagingSenderId: "1040982710454",
  appId: "1:1040982710454:web:258e9aab18e5e55d972e17",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const RID = 'buatt';

async function seed() {
  // ── Info ────────────────────────────────────────────────────────────────────
  await setDoc(doc(db, `ristoranti/${RID}/dati/info`), {
    nome: 'Buatt',
    indirizzo: 'Corso Umberto I, 16 — 84025 Eboli (SA)',
    telefono: '334 190 6133',
    email: 'ciao@buatt.it',
    orari: 'Mar–Dom: 18:30 – 00:00 · Lunedì: chiuso',
    thefork: '',
    instagram: 'https://www.instagram.com/buatt_bistro/',
    facebook: 'https://www.facebook.com/Buatt',
  });
  console.log('✅ info');

  // ── Home ────────────────────────────────────────────────────────────────────
  await setDoc(doc(db, `ristoranti/${RID}/dati/home`), {
    tagline: 'Global Street, Local Soul.',
    sottotitolo: 'Bistrò + pub a Eboli dal 2014. Panini, bun, carne alla brace, birre artigianali.',
    piatto1: { nome: 'Buatt', desc: 'Doppio hamburger, cheddar, patatine fritte, bacon e maionese. Il signature.', prezzo: '13', img: '' },
    piatto2: { nome: 'Tagliata di vitello', desc: '300gr di vitello selezionato alla brace. Il fuoco vivo trasforma la materia.', prezzo: '20', img: '' },
    piatto3: { nome: 'Bun Crock Thai', desc: 'Cotoletta panata, cheddar, insalata thai. L\'oriente al centro di Eboli.', prezzo: '10', img: '' },
  });
  console.log('✅ home');

  // ── Galleria ────────────────────────────────────────────────────────────────
  await setDoc(doc(db, `ristoranti/${RID}/dati/galleria`), {
    foto: [], // da popolare tramite admin upload
  });
  console.log('✅ galleria');

  // ── Eventi ──────────────────────────────────────────────────────────────────
  await setDoc(doc(db, `ristoranti/${RID}/dati/eventi`), {
    eventi: [
      { titolo: 'Live Music', data: 'Ogni venerdì sera', desc: 'Live music dal vivo con artisti del territorio.', img: '' },
      { titolo: 'Secret Dinner', data: 'Data da definire', desc: 'Una serata speciale con menu a sorpresa.', img: '' },
    ],
  });
  console.log('✅ eventi');

  console.log('\n🎉 Seed Buatt completato!');
  console.log(`📌 Dati scritti in: ristoranti/${RID}/dati/{sezione}`);
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
