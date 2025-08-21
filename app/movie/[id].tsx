import { View, Text, ActivityIndicator, ScrollView, StatusBar } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import useMovie from 'presentation/hooks/useMovie';
import MovieHeader from 'presentation/components/movie/MovieHeader';
import MovieDescription from 'presentation/components/movie/MovieDescription';
import MovieCast from 'presentation/components/movie/MovieCast';
import { Ionicons } from '@expo/vector-icons';

const MovieScreen = () => {
  const { id } = useLocalSearchParams();

  const { movieQuery, castQuery } = useMovie(+id);

  if (movieQuery.isLoading || !movieQuery.data) {
    return (
      <View className="bg-netflix-black flex-1 items-center justify-center">
        <StatusBar barStyle="light-content" backgroundColor="#141414" />
        <ActivityIndicator size={40} color="#E50914" />
        <Text className="text-netflix-light-gray mt-4 font-medium">Cargando película...</Text>
      </View>
    );
  }

  if (movieQuery.error || !movieQuery.data) {
    return (
      <View className="bg-netflix-black flex-1 items-center justify-center">
        <StatusBar barStyle="light-content" backgroundColor="#141414" />
        <Ionicons name="alert-circle" size={48} color="#E50914" />
        <Text className="text-netflix-light-gray mt-4 px-6 text-center">
          Error: {movieQuery.error?.message}
        </Text>
      </View>
    );
  }

  const movie = movieQuery.data;

  return (
    <View className="bg-netflix-black flex-1">
      <StatusBar barStyle="light-content" backgroundColor="#141414" />
      <ScrollView showsVerticalScrollIndicator={false} className="flex-1">
        <MovieHeader movie={movie} />
        <MovieDescription movie={movie} />
        <MovieCast cast={castQuery.data ?? []} />
      </ScrollView>
    </View>
  );
};

export default MovieScreen;
