import AsyncStorage from "@react-native-async-storage/async-storage";

import { TOKEN_STORAGE } from "@storage/storageConfig";

type storageTokenProps = {
  token: string;
  refresh_token: string;
};

export async function storageTokenSave({
  token,
  refresh_token,
}: storageTokenProps) {
  await AsyncStorage.setItem(
    TOKEN_STORAGE,
    JSON.stringify({ token, refresh_token })
  );
}

export async function storageTokenGet() {
  const storage = await AsyncStorage.getItem(TOKEN_STORAGE);

  const { refresh_token, token }: storageTokenProps = storage
    ? JSON.parse(storage)
    : {};

  return { refresh_token, token };
}

export async function storageTokenRemove() {
  await AsyncStorage.removeItem(TOKEN_STORAGE);
}
