import {
  View,
  Text,
  ActivityIndicator,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import { useMovies } from 'presentation/hooks/useMovies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainSlideShow from 'presentation/components/movies/MainSlideShow';
import MovieHorizontalList from 'presentation/components/movies/MovieHorizontalList';
import SearchModal from 'presentation/components/movies/SearchModal';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

export default function HomeScreen() {
  const safeArea = useSafeAreaInsets();
  const { nowPlayingQuery, popularQuery, topRatedQuery, upComingQuery } = useMovies();
  const [searchModalVisible, setSearchModalVisible] = useState(false);

  if (nowPlayingQuery.isLoading || popularQuery.isLoading)
    return (
      <View className="flex-1 items-center justify-center bg-netflix-black">
        <ActivityIndicator size={40} color="#E50914" />
        <Text className="mt-4 font-medium text-netflix-light-gray">Cargando...</Text>
      </View>
    );

  if (nowPlayingQuery.error || popularQuery.error)
    return (
      <View className="flex-1 items-center justify-center bg-netflix-black">
        <Ionicons name="alert-circle" size={48} color="#E50914" />
        <Text className="mt-4 px-6 text-center text-netflix-light-gray">
          Error: {nowPlayingQuery.error?.message}
        </Text>
      </View>
    );

  return (
    <View className="flex-1 bg-netflix-black">
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="pb-10" style={{ paddingTop: safeArea.top + 10 }}>
          {/* Header con logo */}
          <View className="mb-6 flex-row items-center justify-between px-4">
            <View className="flex-row items-center">
              <View className="mr-3 h-8 w-8 rounded-sm bg-netflix-red" />
              <Text className="text-2xl font-bold tracking-wide text-white">Movies</Text>
            </View>
            <View className="flex-row space-x-4">
              <TouchableOpacity onPress={() => setSearchModalVisible(true)}>
                <Ionicons name="search" size={24} color="white" />
              </TouchableOpacity>
              <Ionicons name="notifications-outline" size={24} color="white" />
            </View>
          </View>

          {/* Carousel principal */}
          <MainSlideShow movies={nowPlayingQuery.data || []} />

          {/* Secciones de películas */}
          <View className="mt-8">
            <MovieHorizontalList
              movies={popularQuery.data || []}
              title="Tendencias"
              className="mb-8"
              loadNextPage={() => {}}
            />

            <MovieHorizontalList
              movies={topRatedQuery.data?.pages.flat() || []}
              title="Mejor Valoradas"
              className="mb-8"
              loadNextPage={topRatedQuery.fetchNextPage}
            />

            <MovieHorizontalList
              movies={upComingQuery.data || []}
              title="Próximos Estrenos"
              className="mb-8"
              loadNextPage={() => {}}
            />
          </View>
        </View>
      </ScrollView>

      {/* Modal de búsqueda */}
      <SearchModal visible={searchModalVisible} onClose={() => setSearchModalVisible(false)} />
    </View>
  );
}
