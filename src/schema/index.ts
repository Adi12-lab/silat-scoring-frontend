import { z } from "zod";

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
  id: z.number().optional(),
  nama: z.string().min(2, { message: "Nama kegiatan diperlukan" }),
  tanggal: z.date({ required_error: "Tanggal kegiatan diperlukan" }),
});

export const Kelas = ["A", "B", "C"] as const;
export const pesertaSchema = z.object({
  id: z.string().optional(),
  nama: z.string().min(2, { message: "Nama diperlukan" }),
  perguruan: z.string().min(2, { message: "Perguruan diperlukan" }),
  daerah: z.string().min(2, { message: "Daerah peserta diperlukan" }),
  kegiatan_id: z.string().min(2, { message: "Kegiatan harus ada" }),
  kelas: z.enum(Kelas),
});

//Types

export type Role = z.infer<typeof roleSchema>;
export type User = z.infer<typeof userSchema>;
export type UserNoPassword = Omit<User, "password">;
export type Peserta = z.infer<typeof pesertaSchema>;
