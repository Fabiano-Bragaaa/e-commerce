import AsyncStorage from "@react-native-async-storage/async-storage";

import { TOKEN_STORAGE } from "@storage/storageConfig";

export async function storageTokenSave(token: string | null) {
  await AsyncStorage.setItem(TOKEN_STORAGE, JSON.stringify(token));
}

export async function storageTokenGet() {
  const storage = await AsyncStorage.getItem(TOKEN_STORAGE);

  const token: string | null = storage ? JSON.parse(storage) : {};

  return token;
}
