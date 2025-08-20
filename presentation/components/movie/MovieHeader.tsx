import { View, Text, useWindowDimensions, Image, Pressable } from 'react-native';
import React from 'react';
import { MovieDetails } from 'infrastucture/interfaces/movie.interface';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  movie: MovieDetails;
}

const MovieHeader = ({ movie }: Props) => {
  const { height: screenHeight } = useWindowDimensions();

  return (
    <View className="flex-1">
      {/* boton de regresar */}
      <View style={{ position: 'absolute', top: 50, left: 20, zIndex: 1000 }}>
        <Pressable onPress={() => router.back()}>
          <Ionicons name="arrow-back" size={30} color="white" />
        </Pressable>
      </View>
      {/* Backdrop */}
      <View className="mb-5 shadow-lg shadow-black/50" style={{ height: screenHeight * 0.6 }}>
        <View className="bottom-0 left-0 right-0 top-0 flex-1 overflow-hidden rounded-b-[25px] shadow-lg shadow-black/50">
          <Image
            source={{ uri: movie.backdrop_path }}
            resizeMode="cover"
            className="flex-1"
            style={{ height: screenHeight * 0.7 }}
          />
        </View>
        {/* fondo gradiente */}
        <LinearGradient
          style={{ height: '100%', width: '100%', position: 'absolute', zIndex: 1 }}
          colors={['rgba(0, 0, 0, 0.8)', 'transparent']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 0.3 }}
        />
      </View>
    </View>
  );
};

export default MovieHeader;
