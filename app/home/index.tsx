import { View, Text, ActivityIndicator, ScrollView, StatusBar } from 'react-native';
import { useMovies } from 'presentation/hooks/useMovies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainSlideShow from 'presentation/components/movies/MainSlideShow';
import MovieHorizontalList from 'presentation/components/movies/MovieHorizontalList';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const safeArea = useSafeAreaInsets();
  const { nowPlayingQuery, popularQuery, topRatedQuery, upComingQuery } = useMovies();

  if (nowPlayingQuery.isLoading || popularQuery.isLoading)
    return (
      <View className="bg-netflix-black flex-1 items-center justify-center">
        <ActivityIndicator size={40} color="#E50914" />
        <Text className="text-netflix-light-gray mt-4 font-medium">Cargando...</Text>
      </View>
    );

  if (nowPlayingQuery.error || popularQuery.error)
    return (
      <View className="bg-netflix-black flex-1 items-center justify-center">
        <Ionicons name="alert-circle" size={48} color="#E50914" />
        <Text className="text-netflix-light-gray mt-4 px-6 text-center">
          Error: {nowPlayingQuery.error?.message}
        </Text>
      </View>
    );

  return (
    <View className="bg-netflix-black flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <View className="pb-10" style={{ paddingTop: safeArea.top + 10 }}>
          {/* Header con logo */}
          <View className="mb-6 flex-row items-center justify-between px-4">
            <View className="flex-row items-center">
              <View className="bg-netflix-red mr-3 h-8 w-8 rounded-sm" />
              <Text className="text-2xl font-bold tracking-wide text-white">Movies</Text>
            </View>
            <View className="flex-row space-x-4">
              <Ionicons name="search" size={24} color="white" />
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
    </View>
  );
}
