import { View, Text, ActivityIndicator, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import useMovie from 'presentation/hooks/useMovie';
import MovieHeader from 'presentation/components/movie/MovieHeader';
import MovieDescription from 'presentation/components/movie/MovieDescription';
import MovieCast from 'presentation/components/movie/MovieCast';

const MovieScreem = () => {
  const { id } = useLocalSearchParams();

  const { movieQuery, castQuery } = useMovie(+id);

  if (movieQuery.isLoading || !movieQuery.data) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Text className="mb-4">Cargando...</Text>
        <ActivityIndicator size={40} color="indigo" />
      </View>
    );
  }

  if (movieQuery.error || !movieQuery.data) {
    return (
      <View className="flex flex-1 items-center justify-center">
        <Text>Error: {movieQuery.error.message}</Text>
      </View>
    );
  }

  const movie = movieQuery.data;

  return (
    <ScrollView>
      <MovieHeader movie={movie} />
      <MovieDescription movie={movie} />
      <MovieCast cast={castQuery.data ?? []} />
    </ScrollView>
  );
};

export default MovieScreem;
