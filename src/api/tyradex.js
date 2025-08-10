const BASE = 'https://tyradex.app/api/v1';

export async function fetchPokemonList() {
  const res = await fetch(`${BASE}/pokemon`);
  if (!res.ok) throw new Error('Erreur Tyradex');
  return res.json();
}

export async function fetchPokemonById(id) {
  const res = await fetch(`${BASE}/pokemon/${id}`);
  if (!res.ok) throw new Error('Erreur Tyradex');
  return res.json();
}