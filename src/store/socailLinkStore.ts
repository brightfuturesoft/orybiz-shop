/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from "zustand";

type SocialLinks = {
  facebook_url?: string;
  instagram_url?: string;
  youtube_url?: string;
  whatsapp_url?: string;
  twitter_url?: string;
  linkedin_url?: string;
  [key: string]: string | undefined; 
};

type SocialLinkState = {
  socialLinks: SocialLinks | null;
  loading: boolean;
  error: string | null;
  fetchSocialLinks: (workspaceId: string) => Promise<void>;
};

export const useSocialLinkStore = create<SocialLinkState>((set) => ({
  socialLinks: null,
  loading: false,
  error: null,

  fetchSocialLinks: async (workspaceId: string) => {
    set({ loading: true, error: null });
    try {
      const res = await fetch(`/api/social-links?workspaceId=${workspaceId}`, {
        cache: "no-store",
      });
      if (!res.ok) throw new Error("Failed to fetch social links");

      const data: { socialLinks: SocialLinks } = await res.json();
      set({ socialLinks: data.socialLinks, loading: false, error: null });
    } catch (err: any) {
      console.error(err);
      set({ socialLinks: null, loading: false, error: err.message });
    }
  },
}));
