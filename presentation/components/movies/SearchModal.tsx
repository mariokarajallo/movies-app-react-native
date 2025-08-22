import React, { useState, useCallback, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  Modal,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useMovieSearch } from '../../hooks/useMovieSearch';
import SearchMovieGrid from './SearchMovieGrid';
import YearFilter from './YearFilter';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
}

export default function SearchModal({ visible, onClose }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const safeArea = useSafeAreaInsets();

  const { data, isLoading, error, fetchNextPage, hasNextPage, isFetchingNextPage } = useMovieSearch(
    { query: searchQuery, year: selectedYear },
    visible
  );

  const handleSearch = useCallback((text: string) => {
    setSearchQuery(text);
  }, []);

  const handleYearChange = useCallback((year: string) => {
    console.log('Year changed to:', year); // Debug log
    setSelectedYear(year);
  }, []);

  // Aplanar todos los resultados de todas las páginas
  const allMovies = data?.pages.flatMap((page) => page.movies) || [];
  const totalResults = data?.pages[0]?.totalResults || 0;

  // Debug logs
  useEffect(() => {
    console.log('SearchModal state:', {
      searchQuery,
      selectedYear,
      visible,
      moviesCount: allMovies.length,
      totalResults,
    });
  }, [searchQuery, selectedYear, visible, allMovies.length, totalResults]);

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
    <Modal visible={visible} animationType="slide" presentationStyle="fullScreen">
      <View className="flex-1 bg-netflix-black">
        <StatusBar barStyle="light-content" backgroundColor="#141414" />

        {/* Header */}
        <View
          className="flex-row items-center justify-between border-b border-gray-800 px-4 pb-4"
          style={{ paddingTop: safeArea.top + 10 }}>
          <TouchableOpacity onPress={onClose} className="mr-4">
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
              autoFocus
              returnKeyType="search"
            />
            {searchQuery.length > 0 && (
              <TouchableOpacity onPress={() => setSearchQuery('')}>
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
                <Text className="text-lg font-semibold text-white">
                  Resultados ({totalResults})
                </Text>
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
                onCloseModal={onClose} // Pasamos la función para cerrar el modal
              />
            </View>
          )}
        </View>
      </View>
    </Modal>
  );
}
