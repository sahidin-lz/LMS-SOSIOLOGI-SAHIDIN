import { User, ClassStudent } from '../types';

export interface RawStudentInput {
  nisn: string;
  name: string;
  password: string;
  kelas: string;
  status: 'Aktif' | 'Izin' | 'Alumni';
}

export const RAW_STUDENTS_LIST: RawStudentInput[] = [
  { nisn: '1000000001', name: 'FAHRI RIZKI RAMADHAN', password: 'socio001', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000002', name: 'MUHAMMAD AFRAZ GHAZAWAN', password: 'socio002', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000003', name: 'MUHAMMAD ARKAN RYANDIKHA', password: 'socio003', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000004', name: 'MUHAMMAD FATHI KHALAFI MUSYAFFA', password: 'socio004', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000005', name: 'MUHAMMAD ROCHIL ARRANTISI', password: 'socio005', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000006', name: 'TAFAZZUL EL FAEYZA', password: 'socio006', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000007', name: 'MUHAMMAD SAHL ALFATIH', password: 'socio007', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000008', name: 'MUHAMMAD AFFAN ZAKY', password: 'socio008', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000009', name: 'MUHAMMAD SAYYID AL-KAMIL', password: 'socio009', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000010', name: 'RAZAN MUHAMMAD IHSAN', password: 'socio010', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000011', name: 'ALAIN REDIANWAR', password: 'socio011', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000012', name: 'HARUN AR-RASYID SAEDI', password: 'socio012', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000013', name: 'MUHAMMAD SATRIA AZIZY', password: 'socio013', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000014', name: 'RAYDIN MUHAMMAD ADYAKSA', password: 'socio014', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000015', name: 'ABDULLAH AZHFAR IZZUDDIN AL QOSSAM', password: 'socio015', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000016', name: 'MUHAMMAD BILLY MAULID', password: 'socio016', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000017', name: 'ARIQ ZAHRAN EL SHIREZY', password: 'socio017', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000018', name: 'GUSNALDI SATRIA DHARMA', password: 'socio018', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000019', name: 'IBRAHIM ALI NUROHMAN HM', password: 'socio019', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000020', name: 'MUZHAFFAR RAFIF ZAMZAMI', password: 'socio020', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000021', name: 'DARREN HAMDYA KANANTA', password: 'socio021', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000022', name: 'FATIH ALIE JUHRI', password: 'socio022', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000023', name: 'FAZA KHOIRI NUGRAHA', password: 'socio023', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000024', name: 'MUHAMMAD ATAYA FAKHRI RIZQULLAH', password: 'socio024', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000025', name: 'RAFIF SHIDDIQ NUGRAHA', password: 'socio025', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000026', name: 'RAJA\'A AZIZAN ALFARIH', password: 'socio026', kelas: '12 SOSHUM PUTRA', status: 'Aktif' },
  { nisn: '1000000027', name: 'MADINE MEUTIARANISSA GITA', password: 'socio027', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000028', name: 'FEBIYANTI DWI ANDINA', password: 'socio028', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000029', name: 'NABIILAH NASIROTUL IZZAH', password: 'socio029', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000030', name: 'ROISSATUZ ZHAHRA NUR ALIVIA', password: 'socio030', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000031', name: 'FILDZA DZAKIYYA', password: 'socio031', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000032', name: 'SALMA RIZKYTA NUR HIKMAH', password: 'socio032', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000033', name: 'SARAH ZAFIRA LARASATI', password: 'socio033', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000034', name: 'CINTA NURFITRI', password: 'socio034', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000035', name: 'NISRINA SALSABILA', password: 'socio035', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000036', name: 'SINTA NURLELA', password: 'socio036', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000037', name: 'WAODE ZAHRA NADHIRA RAHIM', password: 'socio037', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000038', name: 'FANEIZA YASMIN PUTRI GUNAWAN', password: 'socio038', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000039', name: 'NAURA AUNI HARYANTO', password: 'socio039', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000040', name: 'HURRIN JIYAN FIRDAUS', password: 'socio040', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000041', name: 'CHISA ALYSSA CUDO', password: 'socio041', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000042', name: 'KAYLA ALMIRA ANINDYA HARTONO', password: 'socio042', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000043', name: 'BILQIS GUNSTBEWIJS ASHIRU', password: 'socio043', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000044', name: 'DIANDRA KIRANA PUTRI', password: 'socio044', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000045', name: 'NAURA NAFISA TAMANYIRA', password: 'socio045', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000046', name: 'AISYAH RANIYA IZZATI', password: 'socio046', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000047', name: 'BRYNA DAMESWARI PRIYONO', password: 'socio047', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000048', name: 'CALVINA IZUMI WIWOHO', password: 'socio048', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000049', name: 'NAJWA SYAKIRAH', password: 'socio049', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000050', name: 'DALIA HILWANA FARAH', password: 'socio050', kelas: '12 SOSHUM PUTRI', status: 'Aktif' },
  { nisn: '1000000051', name: 'DELISA KHALIFA SANTOSA', password: 'socio051', kelas: '12 SOSHUM PUTRI', status: 'Aktif' }
];

export const TEACHER_USER: User = {
  id: 'usr_sahidin_01',
  name: 'Sahidin, S.Pd., Gr.',
  email: 'sahidin@sosiologimembumi.sch.id',
  role: 'admin',
  total_xp: 9990,
  levelTitle: 'Guru Pengampu Sosiologi',
  avatarUrl: 'https://api.dicebear.com/7.x/bottts/svg?seed=Sahidin',
  grade: 12,
  streakDays: 30,
  schoolName: 'SMA Negeri Sosiologi',
  group_name: 'Guru Sosiologi',
  nisn: '19880101202601',
  status: 'Aktif'
};

export const INITIAL_STUDENT_USERS: User[] = RAW_STUDENTS_LIST.map((s) => ({
  id: `usr_st_${s.nisn}`,
  name: s.name,
  email: `${s.nisn}@siswa.lms`,
  role: 'siswa',
  total_xp: 0,
  levelTitle: 'Siswa Sosiologi',
  avatarUrl: `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(s.nisn)}`,
  grade: 12,
  streakDays: 0,
  schoolName: 'SMA Negeri Sosiologi',
  group_name: s.kelas,
  nisn: s.nisn,
  status: s.status
}));

export const INITIAL_CLASSROOM_STUDENTS: ClassStudent[] = RAW_STUDENTS_LIST.map((s) => ({
  id: `st_${s.nisn}`,
  nisn: s.nisn,
  name: s.name,
  email: `${s.nisn}@siswa.lms`,
  password: s.password,
  classroom_name: s.kelas,
  total_xp: 0,
  mission_completed_count: 0,
  avg_cbt_score: 0,
  status: s.status
}));

export const TSV_STUDENTS_PRESET = `NISN\tNama_Lengkap\tPassword_Akun\tKelas\tStatus
` + RAW_STUDENTS_LIST.map(s => `${s.nisn}\t${s.name}\t${s.password}\t${s.kelas}\t${s.status}`).join('\n');
