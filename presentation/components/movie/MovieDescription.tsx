import { View, Text, Pressable } from 'react-native';
import React, { useState } from 'react';
import { MovieDetails } from 'infrastucture/interfaces/movie.interface';
import { Formatter } from 'config/helpers/formatter';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  movie: MovieDetails;
}

const MovieDescription = ({ movie }: Props) => {
  const [showFullOverview, setShowFullOverview] = useState(false);

  const toggleOverview = () => {
    setShowFullOverview(!showFullOverview);
  };

  return (
    <View className="px-6 py-8">
      {/* Overview Section */}
      <View className="mb-8">
        <Text className="mb-4 text-xl font-bold text-white">Sinopsis</Text>
        <View className="bg-netflix-dark rounded-xl p-4">
          <Text
            className="text-netflix-light-gray leading-6"
            numberOfLines={showFullOverview ? undefined : 4}>
            {movie.overview}
          </Text>

          {movie.overview.length > 150 && (
            <Pressable onPress={toggleOverview} className="mt-2">
              <Text className="text-netflix-red font-semibold">
                {showFullOverview ? 'Mostrar menos' : 'Leer más'}
              </Text>
            </Pressable>
          )}
        </View>
      </View>

      {/* Movie Details Grid */}
      <View className="space-y-6">
        {/* Cast & Crew */}
        <View className="bg-netflix-dark rounded-xl p-4">
          <Text className="mb-3 text-lg font-bold text-white">Detalles</Text>

          <View className="space-y-3">
            <View className="flex-row justify-between">
              <Text className="text-netflix-gray">Título Original</Text>
              <Text className="font-medium text-white">{movie.original_title}</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-netflix-gray">Fecha de Estreno</Text>
              <Text className="font-medium text-white">
                {movie.release_date.toLocaleDateString('es-ES', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-netflix-gray">Duración</Text>
              <Text className="font-medium text-white">{movie.duration} minutos</Text>
            </View>

            <View className="flex-row justify-between">
              <Text className="text-netflix-gray">Géneros</Text>
              <Text className="ml-2 flex-1 text-right font-medium text-white">
                {movie.genres.join(', ')}
              </Text>
            </View>
          </View>
        </View>

        {/* Financial Info */}
        {movie.budget > 0 && (
          <View className="bg-netflix-dark rounded-xl p-4">
            <Text className="mb-3 text-lg font-bold text-white">Información Financiera</Text>

            <View className="space-y-3">
              <View className="flex-row justify-between">
                <Text className="text-netflix-gray">Presupuesto</Text>
                <Text className="font-medium text-white">{Formatter.currency(movie.budget)}</Text>
              </View>

              {movie.revenue > 0 && (
                <View className="flex-row justify-between">
                  <Text className="text-netflix-gray">Ingresos</Text>
                  <Text className="font-medium text-white">
                    {Formatter.currency(movie.revenue)}
                  </Text>
                </View>
              )}
            </View>
          </View>
        )}

        {/* Rating Details */}
        <View className="bg-netflix-dark rounded-xl p-4">
          <Text className="mb-3 text-lg font-bold text-white">Valoración</Text>

          <View className="flex-row items-center space-x-4">
            <View className="bg-imdb-yellow flex-row items-center rounded-lg px-4 py-2">
              <Ionicons name="star" size={20} color="#1A1A1A" />
              <Text className="text-imdb-dark ml-2 text-lg font-bold">
                {movie.rating.toFixed(1)}
              </Text>
            </View>

            <View>
              <Text className="font-medium text-white">Puntuación</Text>
              <Text className="text-netflix-gray text-sm">Basada en {movie.vote_count} votos</Text>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default MovieDescription;
