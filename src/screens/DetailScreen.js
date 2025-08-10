import React from 'react';
import { View, Text, Image, ScrollView } from 'react-native';

export default function DetailScreen({ route }) {
  const { pokemon } = route.params;

  if (!pokemon) return <Text>Pas de données</Text>;

  const name = pokemon.name?.fr || pokemon.name?.english || 'Sans nom';
  const sprite = pokemon.sprites?.regular || pokemon.sprite || null;

  // Exemple pour afficher types et faiblesses (resistances)
  const types = Array.isArray(pokemon.types)
    ? pokemon.types.map(t => (typeof t === 'string' ? t : t.name)).join(', ')
    : 'Type inconnu';

const weaknesses = Array.isArray(pokemon.resistances)
  ? pokemon.resistances
      .filter(r => r.multiplier >= 2)
      .map(r => `${r.name} (x${r.multiplier})`)
      .join(', ') || 'Aucune faiblesse'
  : 'Données manquantes';

  
  let evolutions = "";
  const listEvo = pokemon.evolution.next; 
  if (pokemon.evolution.next != null){
    for(let i=0;i<listEvo.length;i++){
      evolutions += "\n" + listEvo[i].name + " " + listEvo[i].condition;
    }
  }
    else{
      evolutions = "Pas d'évolutions"
    }

  

  return (
    <ScrollView style={{ padding: 16 }}>
      {sprite && <Image source={{ uri: sprite }} style={{ width: 150, height: 150, alignSelf: 'center' }} />}
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginTop: 12 }}>{name}</Text>
      <Text style={{ marginTop: 8 }}><Text style={{fontWeight:'bold'}}>Types :</Text> {types}</Text>
      <Text style={{ marginTop: 8 }}><Text style={{fontWeight:'bold'}}>Faiblesses :</Text> {weaknesses}</Text>
      <Text style={{ marginTop: 8 }}><Text style={{fontWeight:'bold'}}>Évolutions :</Text> {evolutions}</Text>
      {/* Tu peux ajouter plus de détails ici, comme stats, talents, etc. */}
    </ScrollView>
  );
}
