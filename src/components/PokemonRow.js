import React from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

function PokemonRowComponent({ item, navigation }) {
  const name = item.name?.fr || item.name?.english || 'Sans nom';
  const sprite = item.sprites?.regular || item.sprite || null;

  return (
    <TouchableOpacity
      style={{ flexDirection: 'row', padding: 10, alignItems: 'center' }}
      onPress={() => navigation.navigate('DetailScreen', { pokemon: item })}
    >
      {sprite && <Image source={{ uri: sprite }} style={{ width: 50, height: 50, marginRight: 10 }} />}
      <Text>{name}</Text>
    </TouchableOpacity>
  );
}

export default React.memo(PokemonRowComponent);
