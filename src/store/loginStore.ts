// loginStore.ts
import { create } from "zustand";
import Cookies from "js-cookie";
import CryptoJS from "crypto-js";

const SECRET_KEY = "bright-erp-secret";

export interface User {
  _id: string;
  full_name: string;
  email: string;
  workspace_id?: string | null;
  unique_id?: string; // ✅ optional unique_id
}

interface AuthState {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (data: { email: string; password: string; unique_id?: string }) => Promise<boolean>;
  logout: () => void;
}

// ✅ get user from cookie
const getUserFromCookie = (): User | null => {
  if (typeof window === "undefined") return null;
  const cookies = document.cookie.split("; ");
  const userCookie = cookies.find((c) => c.endsWith(".user_info"));
  if (!userCookie) return null;

  const value = userCookie.split("=")[1];
  try {
    const bytes = CryptoJS.AES.decrypt(value, SECRET_KEY);
    const decrypted = bytes.toString(CryptoJS.enc.Utf8);
    return JSON.parse(decrypted);
  } catch {
    return null;
  }
};

export const useAuthStore = create<AuthState>((set) => ({
  user: getUserFromCookie(),
  loading: false,
  error: null,

  login: async (data) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || "Login failed");

      const userData: User = { ...result.user, unique_id: data.unique_id };

      set({ user: userData });

      // ✅ set cookie
      const cookieName = `${data.unique_id}.user_info`;
      const encrypted = CryptoJS.AES.encrypt(JSON.stringify(userData), SECRET_KEY).toString();
      Cookies.set(cookieName, encrypted, { expires: 7, secure: true, sameSite: "strict" });

      return true;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      set({ error: err.message });
      return false;
    } finally {
      set({ loading: false });
    }
  },

  logout: () => {
    set({ user: null });
    const cookies = document.cookie.split("; ");
    cookies.forEach((c) => {
      const cookieName = c.split("=")[0];
      if (cookieName.endsWith(".user_info")) Cookies.remove(cookieName);
    });
  },
}));
