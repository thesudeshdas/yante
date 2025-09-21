const getChromeStorage = () =>
  (globalThis as any)?.chrome?.storage?.local as
    | { get: (keys: any) => Promise<any>; set: (items: any) => Promise<void> }
    | undefined;

export const saveToStorage = async (key: string, value: any): Promise<void> => {
  const cs = getChromeStorage();
  if (cs) {
    await cs.set({ [key]: value });
    return;
  }
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch {}
};

export const getFromStorage = async (key: string): Promise<any> => {
  const cs = getChromeStorage();
  if (cs) {
    const result = await cs.get(key);
    return result[key] ?? null;
  }
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};
