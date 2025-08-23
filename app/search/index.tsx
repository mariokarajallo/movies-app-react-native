import React, { useCallback, useEffect, useState, useMemo } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRouter } from 'expo-router';
import { useMovieSearch } from '../../presentation/hooks/useMovieSearch';
import SearchMovieGrid from '../../presentation/components/movies/SearchMovieGrid';
import YearFilter from '../../presentation/components/movies/YearFilter';

// Estado global para mantener la búsqueda en memoria durante la sesión
let globalSearchState = {
  query: '',
  year: '',
};

export default function SearchScreen() {
  const [searchQuery, setSearchQuery] = useState(globalSearchState.query);
  const [selectedYear, setSelectedYear] = useState(globalSearchState.year);
  const safeArea = useSafeAreaInsets();
  const router = useRouter();

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovieSearch(
    { query: searchQuery, year: selectedYear },
    true // Siempre activo en esta pantalla
  );

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
    globalSearchState.query = text;
  }, []);

  const handleYearChange = useCallback((year: string) => {
    console.log('Year changed to:', year);
    setSelectedYear(year);
    globalSearchState.year = year;
  }, []);

  const handleGoBack = () => {
    // Intentamos ir de vuelta al home
    router.push('/');
  };

  // Aplanar todos los resultados de todas las páginas
  const allMovies = useMemo(() => data?.pages.flatMap((page) => page.movies) || [], [data]);
  const totalResults = useMemo(() => data?.pages[0]?.totalResults || 0, [data]);

  // Debug logs
  useEffect(() => {
    console.log('SearchScreen state:', {
      searchQuery,
      selectedYear,
      moviesCount: allMovies.length,
      totalResults,
    });
  }, [searchQuery, selectedYear, allMovies.length, totalResults]);

  useEffect(() => {
    if (data && allMovies.length > 0) {
      console.log('Search results:', {
        totalPages: data.pages.length,
        totalResults,
        firstMovie: allMovies[0],
        moviesCount: allMovies.length,
        selectedYear,
      });
    }
  }, [data, allMovies, totalResults, selectedYear]);

  return (
    <View className="flex-1 bg-netflix-black">
      <StatusBar barStyle="light-content" backgroundColor="#141414" />

      {/* Header */}
      <View
        className="flex-row items-center justify-between border-b border-gray-800 px-4 pb-4"
        style={{ paddingTop: safeArea.top + 10 }}>
        <TouchableOpacity onPress={handleGoBack} className="mr-4">
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>

        <View className="flex-1 flex-row items-center rounded-lg bg-gray-800 px-3 py-2">
          <Ionicons name="search" size={20} color="gray" />
          <TextInput
            className="ml-2 flex-1 text-base text-white"
            placeholder="Buscar películas..."
            placeholderTextColor="gray"
            value={searchQuery}
            onChangeText={handleSearch}
            autoFocus={searchQuery.length === 0} // Solo autofocus si no hay query
            returnKeyType="search"
          />
          {searchQuery.length > 0 && (
            <TouchableOpacity onPress={() => handleSearch('')}>
              <Ionicons name="close-circle" size={20} color="gray" />
            </TouchableOpacity>
          )}
        </View>
      </View>

      {/* Filtros */}
      <View className="flex-row items-center justify-between border-b border-gray-800 px-4 py-3">
        <Text className="text-sm text-gray-400">Filtros:</Text>
        <YearFilter selectedYear={selectedYear} onYearChange={handleYearChange} />
      </View>

      {/* Contenido */}
      <View className="flex-1 px-4 pt-4">
        {searchQuery.length === 0 && (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="search" size={64} color="gray" />
            <Text className="mt-4 text-center text-lg text-gray-400">
              Busca tus películas favoritas
            </Text>
            <Text className="mt-2 text-center text-sm text-gray-500">
              Escribe al menos 3 caracteres para comenzar
            </Text>
          </View>
        )}

        {searchQuery.length > 0 && searchQuery.length < 3 && (
          <View className="flex-1 items-center justify-center">
            <Text className="text-center text-lg text-gray-400">
              Escribe al menos 3 caracteres para buscar
            </Text>
          </View>
        )}

        {isLoading && searchQuery.length >= 3 && (
          <View className="flex-1 items-center justify-center">
            <ActivityIndicator size={40} color="#E50914" />
            <Text className="mt-4 text-netflix-light-gray">Buscando...</Text>
          </View>
        )}

        {error && searchQuery.length >= 3 && (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="alert-circle" size={48} color="#E50914" />
            <Text className="mt-4 px-6 text-center text-netflix-light-gray">
              Error: {error.message}
            </Text>
          </View>
        )}

        {data && allMovies.length === 0 && searchQuery.length >= 3 && (
          <View className="flex-1 items-center justify-center">
            <Ionicons name="film-outline" size={64} color="gray" />
            <Text className="mt-4 text-center text-lg text-gray-400">
              No se encontraron resultados
            </Text>
            <Text className="mt-2 text-center text-sm text-gray-500">
              Intenta con otros términos de búsqueda
            </Text>
          </View>
        )}

        {data && allMovies.length > 0 && (
          <View className="flex-1">
            <View className="mb-4 flex-row items-center justify-between">
              <Text className="text-lg font-semibold text-white">Resultados ({totalResults})</Text>
              {selectedYear && (
                <View className="flex-row items-center">
                  <Text className="text-sm text-gray-400">Año: </Text>
                  <Text className="text-sm text-white">{selectedYear}</Text>
                </View>
              )}
            </View>
            <SearchMovieGrid
              movies={allMovies}
              onLoadMore={() => fetchNextPage()}
              isLoadingMore={isFetchingNextPage}
              hasMorePages={hasNextPage || false}
              onCloseModal={() => {}} // Función vacía ya que no es un modal
            />
          </View>
        )}
      </View>
    </View>
  );
}
