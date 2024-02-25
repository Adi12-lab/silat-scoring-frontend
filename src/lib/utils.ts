import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function rgbToHex(rgb: string): string {
  // Memisahkan string RGB menjadi array
  const splitedRgb = rgb.split(",").map(Number);

  // Fungsi untuk mengubah satu nilai RGB menjadi Hex
  const toHex = (rgbValue: number): string => {
    const hex = rgbValue.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
  };

  // Mengubah setiap nilai RGB menjadi Hex dan menggabungkannya
  const hexColor =
    "#" + toHex(splitedRgb[0]) + toHex(splitedRgb[1]) + toHex(splitedRgb[2]);

  return hexColor;
}

export function formatTanggal(date: Date) {
  const f = new Intl.DateTimeFormat("id-ID", {
    dateStyle: "full",
  });
  return f.format(date);
}

export function generateString(length: number) {
  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let result = "";
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }

  return result;
}

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});
