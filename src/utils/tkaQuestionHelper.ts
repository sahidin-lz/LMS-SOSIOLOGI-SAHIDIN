import { Question } from '../types';

export type TkaType = 'pilihan_ganda' | 'kompleks' | 'sebab_akibat';

export interface TkaTypeDetails {
  type: TkaType;
  label: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  description: string;
  optionsLegend: Record<'A' | 'B' | 'C' | 'D' | 'E', string>;
}

export const KOMPLEKS_OPTIONS: Record<'A' | 'B' | 'C' | 'D' | 'E', string> = {
  A: '(1), (2), dan (3) benar',
  B: '(1) dan (3) benar',
  C: '(2) dan (4) benar',
  D: 'Hanya (4) yang benar',
  E: 'Semua pernyataan (1), (2), (3), dan (4) benar',
};

export const SEBAB_AKIBAT_OPTIONS: Record<'A' | 'B' | 'C' | 'D' | 'E', string> = {
  A: 'Pernyataan BENAR, alasan BENAR, dan keduanya menunjukkan hubungan SEBAB-AKIBAT',
  B: 'Pernyataan BENAR, alasan BENAR, tetapi keduanya TIDAK menunjukkan hubungan sebab-akibat',
  C: 'Pernyataan BENAR dan alasan SALAH',
  D: 'Pernyataan SALAH dan alasan BENAR',
  E: 'Pernyataan dan alasan, KEDUANYA SALAH',
};

export function detectTkaType(q: Question): TkaType {
  if (q.question_type) {
    return q.question_type;
  }

  // Heuristic detection if not explicitly set
  const textLower = (q.text || '').toLowerCase();
  
  if (q.pernyataan || q.alasan || textLower.includes('sebab-akibat') || textLower.includes('pernyataan:') && textLower.includes('alasan:')) {
    return 'sebab_akibat';
  }

  if (
    q.statement_1 ||
    textLower.includes('asosiatif') ||
    textLower.includes('kompleks') ||
    (textLower.includes('(1)') && textLower.includes('(2)') && textLower.includes('(3)'))
  ) {
    return 'kompleks';
  }

  return 'pilihan_ganda';
}

export function getTkaTypeDetails(q: Question): TkaTypeDetails {
  const type = detectTkaType(q);

  if (type === 'kompleks') {
    return {
      type: 'kompleks',
      label: 'Pilihan Ganda Kompleks (Asosiatif)',
      badgeBg: 'bg-purple-950/80',
      badgeText: 'text-purple-300',
      badgeBorder: 'border-purple-500/40',
      description: 'Model soal ini menggunakan format pernyataan (1), (2), (3), dan (4). Tentukan kombinasi pernyataan mana yang benar.',
      optionsLegend: KOMPLEKS_OPTIONS,
    };
  }

  if (type === 'sebab_akibat') {
    return {
      type: 'sebab_akibat',
      label: 'Soal Hubungan Sebab-Akibat',
      badgeBg: 'bg-amber-950/80',
      badgeText: 'text-amber-300',
      badgeBorder: 'border-amber-500/40',
      description: 'Model soal ini terdiri dari dua kalimat (Pernyataan dan Alasan). Uji kebenaran masing-masing kalimat sekaligus hubungan logis keduanya.',
      optionsLegend: SEBAB_AKIBAT_OPTIONS,
    };
  }

  return {
    type: 'pilihan_ganda',
    label: 'Pilihan Ganda Biasa (A, B, C, D, E)',
    badgeBg: 'bg-blue-950/80',
    badgeText: 'text-blue-300',
    badgeBorder: 'border-blue-500/40',
    description: 'Pilihlah satu jawaban paling tepat dari lima pilihan yang tersedia berdasarkan analisis kasus/teori.',
    optionsLegend: {
      A: q.option_a,
      B: q.option_b,
      C: q.option_c,
      D: q.option_d,
      E: q.option_e,
    },
  };
}

export function getOptionText(q: Question, key: 'A' | 'B' | 'C' | 'D' | 'E'): string {
  const type = detectTkaType(q);
  const rawOpt = q[`option_${key.toLowerCase()}` as keyof Question] as string;

  if (type === 'kompleks') {
    if (!rawOpt || rawOpt.trim().length <= 3 || rawOpt.toLowerCase() === key.toLowerCase()) {
      return KOMPLEKS_OPTIONS[key];
    }
    return rawOpt;
  }

  if (type === 'sebab_akibat') {
    if (!rawOpt || rawOpt.trim().length <= 3 || rawOpt.toLowerCase() === key.toLowerCase()) {
      return SEBAB_AKIBAT_OPTIONS[key];
    }
    return rawOpt;
  }

  return rawOpt || `Option ${key}`;
}
