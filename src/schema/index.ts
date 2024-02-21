import { z } from "zod";

export const authSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username diperlukan" })
    .max(50, { message: "Username terlalu banyak" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});

export type User = z.infer<typeof authSchema>;

export const peserta = z.object({
  nama: z.string().min(2, { message: "Nama diperlukan" }),
  perguruan: z.string().min(2, { message: "Perguruan diperlukan" }),
  daerah: z.string().min(2, { message: "Daerah peserta diperlukan" }),
  kelas: z.enum(["A", "B", "C"]),
});
