import { useState } from 'react';
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db, RISTORANTE_ID } from './firebase';
import AdminPanel from './AdminPanel';

const MASTER_EMAIL = 'g.neymar96@gmail.com';

export default function Admin() {
  const [user, setUser] = useState<string | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    setError(''); setInfo(''); setLoading(true);
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const uid = cred.user.email ?? '';

      // Master bypassa controllo
      if (uid !== MASTER_EMAIL) {
        const snap = await getDoc(doc(db, `ristoranti/${RISTORANTE_ID}/admin/accesso`));
        const utenti: string[] = snap.exists() ? (snap.data().utenti ?? []) : [];
        if (!utenti.includes(uid)) {
          await signOut(auth);
          setError('Non sei autorizzato ad accedere a questo sito.');
          setLoading(false);
          return;
        }
      }
      setUser(uid);
    } catch {
      setError('Email o password errati.');
    }
    setLoading(false);
  };

  const resetPwd = async () => {
    if (!email) { setError('Inserisci la tua email per ricevere il link.'); return; }
    try {
      await sendPasswordResetEmail(auth, email);
      setInfo('Email di reset inviata! Controlla la tua casella.');
    } catch {
      setError('Impossibile inviare email. Controlla l\'indirizzo.');
    }
  };

  if (user) return <AdminPanel email={user} onLogout={() => { signOut(auth); setUser(null); }} />;

  return (
    <div className="min-h-screen flex items-center justify-center bg-mocha px-4">
      <div className="w-full max-w-md border-2 border-kraft-light/20 bg-mocha/80 p-8 shadow-hard">
        {/* Logo */}
        <div className="mb-8 text-center">
          <p className="font-display text-3xl tracking-widest text-kraft-light">BUATT</p>
          <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-mustard">Admin Panel</p>
        </div>

        {error && <p className="mb-4 border border-brick/60 bg-brick/10 px-4 py-2 font-mono text-xs text-brick">{error}</p>}
        {info  && <p className="mb-4 border border-mustard/60 bg-mustard/10 px-4 py-2 font-mono text-xs text-mustard">{info}</p>}

        <div className="space-y-4">
          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-kraft-light/60">Email</label>
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              className="w-full border-2 border-kraft-light/20 bg-transparent px-4 py-3 font-mono text-sm text-kraft-light outline-none focus:border-mustard"
            />
          </div>
          <div>
            <label className="mb-1 block font-mono text-[10px] uppercase tracking-widest text-kraft-light/60">Password</label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && login()}
              className="w-full border-2 border-kraft-light/20 bg-transparent px-4 py-3 font-mono text-sm text-kraft-light outline-none focus:border-mustard"
            />
          </div>
        </div>

        <button
          onClick={login}
          disabled={loading}
          className="mt-6 w-full border-2 border-kraft-light bg-brick py-3 font-display text-sm tracking-widest text-kraft-light transition-all hover:bg-brick/80 disabled:opacity-50"
        >
          {loading ? 'Accesso...' : 'ACCEDI'}
        </button>

        <button
          onClick={resetPwd}
          className="mt-3 w-full py-2 font-mono text-[10px] uppercase tracking-widest text-kraft-light/40 hover:text-mustard transition-colors"
        >
          Password dimenticata?
        </button>
      </div>
    </div>
  );
}
