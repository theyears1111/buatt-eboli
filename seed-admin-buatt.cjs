// seed-admin-buatt.cjs
// Configura le email autorizzate per l'accesso admin di Buatt
// Eseguire con regole Firebase aperte
// node seed-admin-buatt.cjs

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

async function seed() {
  await setDoc(doc(db, 'ristoranti/buatt/admin/accesso'), {
    utenti: ['buatteboli@gmail.com'], // ← cambia con l'email reale del cliente
  });
  console.log('✅ Admin accessi Buatt configurati');
  process.exit(0);
}

seed().catch(err => { console.error(err); process.exit(1); });
