import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useMovies } from 'presentation/hooks/useMovies';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import MainSlideShow from 'presentation/components/movies/MainSlideShow';
import MovieHorizontalList from 'presentation/components/movies/MovieHorizontalList';

export default function HomeScreen() {
  const safeArea = useSafeAreaInsets();
  const { nowPlayingQuery, popularQuery, topRatedQuery, upComingQuery } = useMovies();

  if (nowPlayingQuery.isLoading || popularQuery.isLoading)
    return (
      <View className="flex-1 items-center justify-center">
        <ActivityIndicator size={40} color="indigo" />
        <Text>Loading...</Text>
      </View>
    );
  if (nowPlayingQuery.error || popularQuery.error)
    return <Text>Error: {nowPlayingQuery.error?.message}</Text>;

  return (
    <ScrollView showsVerticalScrollIndicator={true}>
      <View className="mt-2 pb-10" style={{ paddingTop: safeArea.top }}>
        <Text className="mb-2 px-4 text-3xl font-bold">Movies App</Text>
        {/* Carousel de imagenes */}
        <MainSlideShow movies={nowPlayingQuery.data || []} />

        {/* Lista horizontal de peliculas populares */}
        <MovieHorizontalList movies={popularQuery.data || []} title="Popular" className="mb-5" />

        {/* Lista horizontal de peliculas top rated */}
        <MovieHorizontalList movies={topRatedQuery.data || []} title="Top Rated" className="mb-5" />

        {/* Lista horizontal de peliculas de proximos estrenos*/}
        <MovieHorizontalList movies={upComingQuery.data || []} title="Up Coming" className="mb-5" />
      </View>
    </ScrollView>
  );
}
