import { View, Text, useWindowDimensions, Image, Pressable } from 'react-native';
import React from 'react';
import { MovieDetails } from 'infrastucture/interfaces/movie.interface';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface Props {
  movie: MovieDetails;
}

const MovieHeader = ({ movie }: Props) => {
  const { height: screenHeight } = useWindowDimensions();
  const safeArea = useSafeAreaInsets();

  return (
    <View className="relative">
      {/* Backdrop Image */}
      <View className="relative overflow-hidden" style={{ height: screenHeight * 0.7 }}>
        <Image
          source={{ uri: movie.backdrop_path }}
          resizeMode="cover"
          className="absolute inset-0"
          style={{ height: screenHeight * 0.7 }}
        />

        {/* Gradient Overlay */}
        <LinearGradient
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 1,
          }}
          colors={[
            'rgba(20,20,20,0.3)',
            'rgba(20,20,20,0.5)',
            'rgba(20,20,20,0.8)',
            'rgba(20,20,20,1)',
          ]}
          locations={[0, 0.3, 0.7, 1]}
        />
      </View>

      {/* Navigation Bar */}
      <View
        className="absolute left-0 right-0 top-0 z-10 flex-row items-center justify-between px-4"
        style={{ paddingTop: safeArea.top + 10 }}>
        <Pressable
          onPress={() => router.back()}
          className="rounded-full bg-black/30 p-2 backdrop-blur-sm">
          <Ionicons name="arrow-back" size={24} color="white" />
        </Pressable>

        <View className="flex-row space-x-3">
          <Pressable className="rounded-full bg-black/30 p-2 backdrop-blur-sm">
            <Ionicons name="search" size={24} color="white" />
          </Pressable>
          <Pressable className="rounded-full bg-black/30 p-2 backdrop-blur-sm">
            <Ionicons name="share-outline" size={24} color="white" />
          </Pressable>
        </View>
      </View>

      {/* Movie Info Overlay */}
      <View className="absolute bottom-0 left-0 right-0 z-10 p-6" style={{ paddingBottom: 40 }}>
        {/* Title and Rating */}
        <View className="mb-4">
          <Text className="mb-2 text-3xl font-bold text-white" numberOfLines={2}>
            {movie.title}
          </Text>

          <View className="mb-3 flex-row items-center space-x-4">
            <View className="bg-imdb-yellow flex-row items-center rounded-full px-3 py-1">
              <Ionicons name="star" size={16} color="#1A1A1A" />
              <Text className="text-imdb-dark ml-1 font-bold">{movie.rating.toFixed(1)}</Text>
            </View>

            <Text className="text-netflix-light-gray font-medium">{movie.duration} min</Text>

            <Text className="text-netflix-light-gray font-medium">
              {movie.release_date.getFullYear()}
            </Text>
          </View>
        </View>

        {/* Action Buttons */}
        <View className="mb-4 flex-row items-center space-x-3">
          <Pressable className="bg-netflix-red flex-1 flex-row items-center justify-center rounded-lg px-6 py-3">
            <Ionicons name="play" size={20} color="white" />
            <Text className="ml-2 text-base font-semibold text-white">Reproducir</Text>
          </Pressable>

          <Pressable className="bg-netflix-gray/30 rounded-lg p-3 backdrop-blur-sm">
            <Ionicons name="add" size={24} color="white" />
          </Pressable>

          <Pressable className="bg-netflix-gray/30 rounded-lg p-3 backdrop-blur-sm">
            <Ionicons name="download-outline" size={24} color="white" />
          </Pressable>
        </View>

        {/* Genres */}
        <View className="flex-row flex-wrap gap-2">
          {movie.genres.slice(0, 3).map((genre) => (
            <View key={genre} className="rounded-full bg-white/20 px-3 py-1 backdrop-blur-sm">
              <Text className="text-sm font-medium text-white">{genre}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
};

export default MovieHeader;
