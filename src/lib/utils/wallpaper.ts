import { getFromStorage, saveToStorage } from "@/lib/utils/storage";

// User-uploaded wallpaper (data URL) utilities
export const WALLPAPER_STORAGE_KEY = "wallpaper:user-upload";
export const WALLPAPER_UPDATED_EVENT = "wallpaper:updated";

export interface IStoredWallpaper {
  dataUrl: string;
  updatedAt: number;
}

export const fileToDataUrl = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (e) => reject(e);
    reader.readAsDataURL(file);
  });
};

export const saveWallpaperDataUrl = async (dataUrl: string): Promise<void> => {
  const payload: IStoredWallpaper = { dataUrl, updatedAt: Date.now() };
  await saveToStorage(WALLPAPER_STORAGE_KEY, payload);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(WALLPAPER_UPDATED_EVENT));
  }
};

export const getWallpaperDataUrl = async (): Promise<string | null> => {
  const stored = (await getFromStorage(
    WALLPAPER_STORAGE_KEY
  )) as IStoredWallpaper | null;
  return stored?.dataUrl ?? null;
};

export const clearWallpaper = async (): Promise<void> => {
  await saveToStorage(WALLPAPER_STORAGE_KEY, null);
  if (typeof window !== "undefined") {
    window.dispatchEvent(new Event(WALLPAPER_UPDATED_EVENT));
  }
};
