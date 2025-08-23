import React from 'react';
import { View, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Movie } from 'infrastucture/interfaces/movie.interface';

interface SearchMovieGridProps {
  movies: Movie[];
  onLoadMore: () => void;
  isLoadingMore: boolean;
  hasMorePages: boolean;
  onCloseModal: () => void; // Mantenemos por compatibilidad pero ya no se usa
}

const SearchMovieGrid = ({
  movies,
  onLoadMore,
  isLoadingMore,
  hasMorePages,
  onCloseModal,
}: SearchMovieGridProps) => {
  const handleMoviePress = (movieId: number) => {
    console.log('🔍 Navigating to movie:', movieId);
    console.log('🔍 Router available:', !!router);
    console.log('🔍 Router.push available:', !!router.push);

    try {
      // Navegamos a los detalles con parámetros para indicar que venimos de búsqueda
      router.push({
        pathname: `/movie/${movieId}`,
        params: { fromSearch: 'true' },
      });

      console.log('🔍 Navigation successful');
    } catch (error) {
      console.error('🔍 Navigation error:', error);
    }
  };

  const renderMovieItem = ({ item, index }: { item: Movie; index: number }) => {
    console.log('🔍 Rendering movie:', { id: item.id, title: item.title, poster: item.poster });

    return (
      <TouchableOpacity
        onPress={() => handleMoviePress(item.id)}
        className="mb-4 w-1/3 px-1"
        activeOpacity={0.7}>
        <View className="relative">
          <Image
            source={{ uri: item.poster }}
            className="h-48 w-full rounded-lg"
            resizeMode="cover"
          />

          {/* Rating badge */}
          {item.rating > 0 && (
            <View className="absolute right-2 top-2 rounded-sm bg-imdb-yellow px-2 py-1">
              <Text className="text-xs font-bold text-imdb-dark">{item.rating.toFixed(1)}</Text>
            </View>
          )}
        </View>

        {/* Movie info */}
        <View className="mt-2 px-1">
          <Text className="text-xs font-medium text-white" numberOfLines={2}>
            {item.title}
          </Text>
          <Text className="mt-1 text-xs text-netflix-light-gray">
            {item.release_date.getFullYear()}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const renderFooter = () => {
    if (!isLoadingMore) return null;

    return (
      <View className="py-4">
        <View className="flex-row items-center justify-center">
          <Ionicons name="reload" size={20} color="#E50914" />
          <Text className="ml-2 text-netflix-light-gray">Cargando más...</Text>
        </View>
      </View>
    );
  };

  const handleLoadMore = () => {
    if (!isLoadingMore && hasMorePages) {
      onLoadMore();
    }
  };

  console.log('🔍 SearchMovieGrid render:', { moviesCount: movies.length, firstMovie: movies[0] });

  return (
    <FlatList
      data={movies}
      renderItem={renderMovieItem}
      keyExtractor={(item) => item.id.toString()}
      numColumns={3}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingBottom: 20 }}
      onEndReached={handleLoadMore}
      onEndReachedThreshold={0.1}
      ListFooterComponent={renderFooter}
    />
  );
};

export default SearchMovieGrid;
