import { View, Text, FlatList, Pressable } from 'react-native';
import React from 'react';
import { Cast } from 'infrastucture/interfaces/cast.interface';
import { ActorCard } from './ActorCard';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  cast: Cast[];
}

const MovieCast = ({ cast }: Props) => {
  const topCast = cast.slice(0, 10); // Mostrar solo los primeros 10 actores

  return (
    <View className="mb-20 py-6">
      {/* Header Section */}
      <View className="mb-6 px-6">
        <View className="mb-4 flex-row items-center justify-between">
          <Text className="text-2xl font-bold text-white">Reparto</Text>
          <Pressable className="flex-row items-center">
            <Text className="text-netflix-red mr-1 font-semibold">Ver todo</Text>
            <Ionicons name="chevron-forward" size={16} color="#E50914" />
          </Pressable>
        </View>

        <Text className="text-netflix-gray">{cast.length} actores en el reparto</Text>
      </View>

      {/* Cast List */}
      <FlatList
        horizontal
        data={topCast}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => <ActorCard actor={item} />}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        ItemSeparatorComponent={() => <View className="w-4" />}
      />

      {/* View All Cast Button */}
      {cast.length > 10 && (
        <View className="mt-6 px-6">
          <Pressable className="bg-netflix-dark flex-row items-center justify-center rounded-xl p-4">
            <Ionicons name="people" size={20} color="white" />
            <Text className="ml-2 font-semibold text-white">
              Ver todos los {cast.length} actores
            </Text>
            <Ionicons name="chevron-forward" size={16} color="white" className="ml-2" />
          </Pressable>
        </View>
      )}
    </View>
  );
};

export default MovieCast;
