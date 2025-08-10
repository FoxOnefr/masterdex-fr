import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY_POKEMON = 'cache_pokemon_';

export async function savePokemonToCache(id, data) {
  try {
    await AsyncStorage.setItem(KEY_POKEMON + id, JSON.stringify({data, ts: Date.now()}));
  } catch (e) {
    console.warn('cache save err', e);
  }
}

export async function readPokemonFromCache(id) {
  try {
    const raw = await AsyncStorage.getItem(KEY_POKEMON + id);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed.data;
  } catch (e) {
    return null;
  }
}