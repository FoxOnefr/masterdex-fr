import React, { useEffect, useState } from 'react';
import { View, TextInput, FlatList, ActivityIndicator, Text, TouchableOpacity } from 'react-native';
import PokemonRow from '../components/PokemonRow';

const generations = [
  { label: 'Toutes', value: 0 },
  { label: '1', value: 1 },
  { label: '2', value: 2 },
  { label: '3', value: 3 },
  { label: '4', value: 4 },
  { label: '5', value: 5 },
  { label: '6', value: 6 },
  { label: '7', value: 7 },
  { label: '8', value: 8 },
  { label: '9', value: 9 },
  // Ajoute d’autres si besoin
];

export default function ListScreen({ navigation }) {
  const [list, setList] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [q, setQ] = useState('');
  const [loading, setLoading] = useState(false);
  const [generation, setGeneration] = useState(0);

  useEffect(() => {
    load();
  }, [generation]);

  useEffect(() => {
    filterList();
  }, [q, list]);

  async function load() {
    setLoading(true);
    try {
      let url = 'https://tyradex.app/api/v1/pokemon';
      if (generation !== 0) {
        url = `https://tyradex.app/api/v1/gen/${generation}`;
      }
      const response = await fetch(url);
      const data = await response.json();
      setList(data);
      setFiltered(data);
    } catch (e) {
      console.warn(e);
    } finally {
      setLoading(false);
    }
  }

  function filterList() {
    const t = q.toLowerCase().trim();
    if (t === '') {
      setFiltered(list);
      return;
    }
    setFiltered(
      list.filter(p => {
        const name = (p.name?.fr || p.name?.en || p.name?.english || p.name || '').toString().toLowerCase();
        return name.includes(t) || (p.id && p.id.toString().startsWith(t));
      })
    );
  }

  if (loading) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" /></View>;

  return (
    <View style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        <TextInput
          placeholder="Recherche par nom ou numéro"
          value={q}
          onChangeText={setQ}
          style={{ borderWidth: 1, borderRadius: 8, padding: 8, marginBottom: 10 }}
        />
        <View style={{ flexDirection: 'row', justifyContent: 'space-around', marginBottom: 10 }}>
          {generations.map(gen => (
            <TouchableOpacity
              key={gen.value}
              onPress={() => setGeneration(gen.value)}
              style={{
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 20,
                borderWidth: 1,
                borderColor: generation === gen.value ? 'blue' : 'gray',
                backgroundColor: generation === gen.value ? 'lightblue' : 'white',
              }}
            >
              <Text style={{ color: generation === gen.value ? 'blue' : 'gray', fontWeight: 'bold' }}>{gen.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <FlatList
        data={filtered}
        keyExtractor={(item, index) => item.pokedex_id?.toString() || item.id?.toString() || index.toString()}
        renderItem={({ item }) => <PokemonRow item={item} navigation={navigation} />}
      />
    </View>
  );
}
