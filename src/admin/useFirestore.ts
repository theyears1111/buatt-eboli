import { useEffect, useState } from 'react';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { db, RISTORANTE_ID } from './firebase';

/** Legge/scrive una sezione del ristorante con cache localStorage */
export function useFirestore<T>(sezione: string, fallback: T) {
  const path = `ristoranti/${RISTORANTE_ID}/dati/${sezione}`;
  const cacheKey = `buatt_${sezione}`;

  const cached = (() => {
    try { return JSON.parse(localStorage.getItem(cacheKey) ?? '') as T; }
    catch { return null; }
  })();

  const [data, setData] = useState<T>(cached ?? fallback);

  useEffect(() => {
    const ref = doc(db, path);
    const unsub = onSnapshot(ref, snap => {
      if (snap.exists()) {
        const val = snap.data() as T;
        setData(val);
        localStorage.setItem(cacheKey, JSON.stringify(val));
      }
    });
    return unsub;
  }, [path, cacheKey]);

  const save = async (val: T) => {
    await setDoc(doc(db, path), val as object);
  };

  return { data, save };
}
