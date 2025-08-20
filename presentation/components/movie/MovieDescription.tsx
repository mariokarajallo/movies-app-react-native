import { View, Text } from 'react-native';
import React from 'react';
import { MovieDetails } from 'infrastucture/interfaces/movie.interface';
import { Formatter } from 'config/helpers/formatter';

interface Props {
  movie: MovieDetails;
}

const MovieDescription = ({ movie }: Props) => {
  const genresString = movie.genres.join(', ');

  return (
    <>
      {/* Content */}
      <View className="gap-4 px-5">
        <View className="flex-col items-start gap-2">
          <Text className="text-2xl font-bold">{movie.title}</Text>
          <View className="flex-row items-center gap-2">
            <Text className="text-md text-gray-500">{movie.original_title}</Text>
            <Text className="text-sm text-gray-500">
              {movie.duration} min | {movie.release_date.toLocaleDateString()}
            </Text>
          </View>
        </View>
        <View className="flex-row items-center gap-2">
          <Text className="text-sm font-normal text-gray-500">⭐️ {movie.rating.toFixed(1)}</Text>
          <View className="flex-row flex-wrap gap-2">
            {movie.genres.map((genre) => (
              <View key={genre} className="rounded-full bg-gray-200 px-3 py-1">
                <Text className="text-xs text-gray-600">{genre}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* sinopsis */}
        <View className="flex-col items-start gap-2">
          <Text className="text-lg font-bold">Sinopsis</Text>
          <Text className="text-sm text-gray-500">{movie.overview}</Text>
        </View>

        {/* presupuesto */}
        <View className="flex-col items-start gap-2">
          <Text className="text-lg font-bold">Presupuesto</Text>
          <Text className="text-sm font-bold text-gray-500">
            {Formatter.currency(movie.budget)}
          </Text>
        </View>
      </View>
    </>
  );
};

export default MovieDescription;
