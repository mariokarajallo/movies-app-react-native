import { View, Text, FlatList, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Movie } from 'infrastucture/interfaces/movie.interface';
import MoviePoster from './MoviePoster';

interface Props {
  title?: string;
  movies: Movie[];
  className?: string;
  loadNextPage: () => void;
  showTitles?: boolean;
}

const MovieHorizontalList = ({
  movies,
  title,
  className,
  loadNextPage,
  showTitles = false,
}: Props) => {
  const isLoading = useRef(false);

  useEffect(() => {
    setTimeout(() => {
      isLoading.current = false;
    }, 200);
  }, [movies]);

  const onScroll = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
    if (isLoading.current) return;

    const { contentOffset, layoutMeasurement, contentSize } = event.nativeEvent;
    const isEndReached = contentOffset.x + layoutMeasurement.width + 600 >= contentSize.width;

    if (!isEndReached) return;

    isLoading.current = true;
    loadNextPage && loadNextPage();
  };

  return (
    <View className={`${className}`}>
      {title && (
        <View className="mb-4 px-4">
          <Text className="text-xl font-bold tracking-wide text-white">{title}</Text>
          <View className="bg-netflix-red mt-2 h-0.5 w-12" />
        </View>
      )}

      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        renderItem={({ item }) => (
          <MoviePoster
            poster={item.poster}
            id={item.id}
            smallPoster={true}
            showTitle={showTitles}
            title={item.title}
            rating={item.rating}
          />
        )}
        showsHorizontalScrollIndicator={false}
        onScroll={onScroll}
        contentContainerStyle={{ paddingHorizontal: 16 }}
      />
    </View>
  );
};

export default MovieHorizontalList;
