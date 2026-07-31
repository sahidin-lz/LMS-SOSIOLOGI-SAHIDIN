import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from './firebase';

/**
 * Utility Firebase Storage untuk LMS Sosiologi Membumi
 * Mengunggah dokumen/file asli (PDF, Word, PPT, Excel, Gambar) ke Firebase Storage
 * dan mengembalikan Download URL publik.
 */
export async function uploadFileToStorage(
  file: File,
  folderPath: string = 'documents',
  onProgress?: (progressPercent: number) => void
): Promise<string> {
  if (!file) {
    throw new Error('File tidak valid atau tidak ditemukan.');
  }

  // Sanitasi nama file dan buat jalur penyimpanan unik
  const timestamp = Date.now();
  const sanitizedFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
  const fullPath = `${folderPath}/${timestamp}_${sanitizedFileName}`;

  const storageRef = ref(storage, fullPath);
  const uploadTask = uploadBytesResumable(storageRef, file);

  return new Promise((resolve, reject) => {
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        if (onProgress) {
          onProgress(Math.round(progress));
        }
      },
      (error) => {
        console.error('Firebase Storage Upload Error:', error);
        reject(error);
      },
      async () => {
        try {
          const downloadUrl = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadUrl);
        } catch (err) {
          console.error('Gagal mengambil Download URL dari Firebase Storage:', err);
          reject(err);
        }
      }
    );
  });
}
