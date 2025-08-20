import { View, Text, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import React, { useRef } from 'react';
import { Movie } from 'infrastucture/interfaces/movie.interface';
import MoviePoster from './MoviePoster';

interface Props {
  title?: string;
  movies: Movie[];
  className?: string;
  loadNextPage: () => void;
}

const MovieHorizontalList = ({ movies, title, className, loadNextPage }: Props) => {
  const isLoading = useRef(false);

  /**
   * Función que maneja el scroll horizontal de la lista de películas
   * @param event - Evento de scroll nativo
   *
   * Esta función realiza lo siguiente:
   * 1. Verifica si ya está cargando más películas para evitar múltiples llamadas
   * 2. Obtiene las medidas del scroll actual (posición, tamaño visible y tamaño total)
   * 3. Calcula si el usuario está cerca del final de la lista (600px antes del final)
   * 4. Si llega al final, marca como cargando y ejecuta la función para cargar más películas
   */
  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    // Si ya está cargando, no hacer nada
    if (isLoading.current) return;

    // Obtener medidas del scroll
    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;

    // Calcular si estamos cerca del final (600px antes)
    const isEndReached = contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;

    // Si no está cerca del final, no hacer nada
    if (!isEndReached) return;

    // Marcar como cargando
    isLoading.current = true;

    // Cargar más películas si existe la función
    console.log('cargar mas peliculas');
    loadNextPage && loadNextPage();
  };

  return (
    <View className={`${className}`}>
      {title && <Text className="mb-2 px-4 text-2xl font-bold">{title}</Text>}

      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MoviePoster poster={item.poster} id={item.id} smallPoster />}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
      />
    </View>
  );
};

export default MovieHorizontalList;
