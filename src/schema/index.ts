import { z } from "zod";
import Kategori from "~/pages/Admin/Kategori/Kategori";

export const authSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username diperlukan" })
    .max(50, { message: "Username terlalu panjang" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});

export const roleSchema = z.enum(["JURI", "ADMIN"]); // Membuat schema untuk Role

export const userSchema = authSchema.merge(
  z.object({ id: z.string().optional(), role: roleSchema })
);

export const kegiatanSchema = z.object({
  nama: z.string().min(2, { message: "Nama kegiatan diperlukan" }),
  tanggal: z.date({ required_error: "Tanggal kegiatan diperlukan" }),
});

export const kategoriSchema = z.object({
  nama: z.string().min(2, { message: "Nama kategori diperlukan" }),
});

export const kelasSchema = z.object({
  nama: z.string().length(1, { message: "Nama kelas harus 1 karakter" }),
  berat_badan: z.number().min(2, { message: "Berat badan diperlukan" }),
});

export const pesertaSchema = z.object({
  nama: z.string().min(2, { message: "Nama diperlukan" }),
  perguruan: z.string().min(2, { message: "Perguruan diperlukan" }),
  daerah: z.string().min(2, { message: "Daerah peserta diperlukan" }),
  kegiatan_id: z.string().min(2, { message: "Kegiatan harus ada" }),
  kategori_id: z.number({ required_error: "Kategori peserta harus ada" }),
  kelas_id: z.number({ required_error: "Kelas peserta harus ada" }),
});

export const pertandinganSchema = z.object({
  sudut_merah_id: z.string().min(2, { message: "Sudut merah harus ada" }),
  sudut_biru_id: z.string().min(2, { message: "Sudut biru harus ada" }),
  gelanggang: z.string().min(2, { message: "Nama gelanggang" }),
  kegiatan_id: z.string().min(2, { message: "Kegiatan harus ada" }),
});

export const babakStatusSchema = z.enum([
  "belum_dimulai",
  "berjalan",
  "jeda",
  "selesai",
]);

export const babakSchema = z.object({
  no: z.number().min(1, {message: 'No tidak valid'}),
  status: babakStatusSchema,
  timer: z.number().min(1, {message: 'Timer tidak valid'}),
  waktu_mulai: z.date().optional(),
  pertandingan_id: z.number({ required_error: "Pertandingan harus ada" }),
});

//Types

export type NewKegiatan = z.infer<typeof kegiatanSchema>;
export type Kegiatan = NewKegiatan & { id: string };

export type Role = z.infer<typeof roleSchema>;
export type User = z.infer<typeof userSchema>;
export type UserNoPassword = Omit<User, "password">;

export type NewKelas = z.infer<typeof kelasSchema>;
export type Kelas = NewKelas & { id: number };

export type NewKategori = z.infer<typeof kategoriSchema>;
export type Kategori = NewKategori & { id: number };

export type NewPeserta = z.infer<typeof pesertaSchema>;
export type Peserta = NewPeserta & { id: string };
export type PesertaComplete = Peserta & { kategori: Kategori } & {
  kelas: Kelas;
};

export type NewPertandingan = z.infer<typeof pertandinganSchema>;
export type Pertandingan = NewPertandingan & { id: number };
export type PertandinganComplete = Pertandingan & {
  sudut_merah: Peserta;
} & {
  sudut_biru: Peserta;
  kelas: string;
  kategori: string;
};

export type BabakStatus = z.infer<typeof babakStatusSchema>;
export type NewBabak = z.infer<typeof babakSchema>;
export type Babak = NewBabak & { id: number };
