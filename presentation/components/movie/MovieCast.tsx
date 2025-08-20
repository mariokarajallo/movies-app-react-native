import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { Cast } from 'infrastucture/interfaces/cast.interface';
import { ActorCard } from './ActorCard';

interface Props {
  cast: Cast[];
}
const MovieCast = ({ cast }: Props) => {
  return (
    <View className="mb-20 py-4">
      <Text className="px-4 text-lg font-bold">Actores</Text>

      {/* {title && <Text className="mb-2 px-4 text-2xl font-bold">{title}</Text>} */}
      {/* TODO: add pagination */}
      <FlatList
        horizontal
        data={cast}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <ActorCard actor={item} />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MovieCast;
