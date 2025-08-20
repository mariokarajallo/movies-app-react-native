import { View, Text, FlatList } from 'react-native';
import React from 'react';
import { Movie } from 'infrastucture/interfaces/movie.interface';
import MoviePoster from './MoviePoster';

interface Props {
  title?: string;
  movies: Movie[];
  className?: string;
}

const MovieHorizontalList = ({ movies, title, className }: Props) => {
  return (
    <View className={`${className}`}>
      {title && <Text className="mb-2 px-4 text-2xl font-bold">{title}</Text>}

      <FlatList
        horizontal
        data={movies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <MoviePoster poster={item.poster} id={item.id} smallPoster />}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

export default MovieHorizontalList;
