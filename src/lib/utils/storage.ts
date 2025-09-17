export const saveToStorage = async (key: string, value: any): Promise<void> => {
  await chrome.storage.local.set({ [key]: value });
};

export const getFromStorage = async (key: string): Promise<any> => {
  const result = await chrome.storage.local.get(key);
  return result[key] || null;
};
