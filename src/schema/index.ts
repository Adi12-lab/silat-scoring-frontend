import { z } from "zod";

export const authSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Username diperlukan" })
    .max(50, { message: "Username terlalu banyak" }),
  password: z.string().min(8, { message: "Password minimal 8 karakter" }),
});

// export type User = z.infer<typeof authSchema>;

export type Role = "PENGAWAS" | "JURI" | "ADMIN";
export type User = {
  id: string;
  username: string;
  role: Role;
  kegiatan_id: string;
};

export type UserContextType = {
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
};

export const peserta = z.object({
  nama: z.string().min(2, { message: "Nama diperlukan" }),
  perguruan: z.string().min(2, { message: "Perguruan diperlukan" }),
  daerah: z.string().min(2, { message: "Daerah peserta diperlukan" }),
  kelas: z.enum(["A", "B", "C"]),
});
