const CLOUD = 'dmybopb31';
const PRESET = 'bollicine_upload'; // preset unsigned condiviso

/** Carica un File su Cloudinary, restituisce l'URL pubblico */
export async function uploadToCloudinary(file: File): Promise<string> {
  const fd = new FormData();
  fd.append('file', file);
  fd.append('upload_preset', PRESET);
  const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD}/image/upload`, {
    method: 'POST',
    body: fd,
  });
  if (!res.ok) throw new Error('Upload fallito');
  const json = await res.json();
  return json.secure_url as string;
}
