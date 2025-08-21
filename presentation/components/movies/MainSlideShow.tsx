import { View, Text, useWindowDimensions, Pressable, Image } from 'react-native';
import { Movie } from 'infrastucture/interfaces/movie.interface';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

interface Props {
  movies: Movie[];
}

const MainSlideShow = ({ movies }: Props) => {
  const ref = useRef<ICarouselInstance>(null);
  const width = useWindowDimensions().width;

  return (
    <View className="h-[500px] w-full">
      <Carousel
        ref={ref}
        data={movies}
        renderItem={({ item }) => (
          <View className="relative mx-4 overflow-hidden rounded-2xl">
            {/* Backdrop Image */}
            <Image
              source={{ uri: item.backdrop_path }}
              className="h-full w-full"
              resizeMode="cover"
            />

            {/* Gradient Overlay */}
            <LinearGradient
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
              }}
              colors={[
                'rgba(20,20,20,0.2)',
                'rgba(20,20,20,0.4)',
                'rgba(20,20,20,0.7)',
                'rgba(20,20,20,0.9)',
              ]}
              locations={[0, 0.3, 0.7, 1]}
            />

            {/* Content Overlay */}
            <View className="absolute bottom-0 left-0 right-0 p-6">
              {/* Movie Info */}
              <View className="mb-6">
                {/* Title */}
                <Text className="mb-3 text-3xl font-bold text-white" numberOfLines={2}>
                  {item.title}
                </Text>

                {/* Rating and Year */}
                <View className="mb-4 flex-row items-center space-x-4">
                  <View className="bg-imdb-yellow flex-row items-center rounded-full px-3 py-1">
                    <Ionicons name="star" size={16} color="#1A1A1A" />
                    <Text className="text-imdb-dark ml-1 font-bold">{item.rating.toFixed(1)}</Text>
                  </View>

                  <Text className="text-netflix-light-gray font-medium">
                    {item.release_date.getFullYear()}
                  </Text>
                </View>

                {/* Description */}
                <Text
                  className="text-netflix-light-gray mb-6 text-base leading-6"
                  numberOfLines={3}>
                  {item.description}
                </Text>
              </View>

              {/* Action Buttons */}
              <View className="flex-row items-center space-x-3">
                <Pressable
                  className="bg-netflix-red flex-1 flex-row items-center justify-center rounded-lg px-8 py-3"
                  onPress={() => router.push(`/movie/${item.id}`)}>
                  <Ionicons name="play" size={20} color="white" />
                  <Text className="ml-2 text-base font-semibold text-white">Reproducir</Text>
                </Pressable>

                <Pressable
                  className="bg-netflix-gray/30 rounded-lg p-3 backdrop-blur-sm"
                  onPress={() => router.push(`/movie/${item.id}`)}>
                  <Ionicons name="information-circle" size={24} color="white" />
                </Pressable>

                <Pressable className="bg-netflix-gray/30 rounded-lg p-3 backdrop-blur-sm">
                  <Ionicons name="add" size={24} color="white" />
                </Pressable>
              </View>
            </View>

            {/* Play Button Overlay (Center) */}
            <Pressable
              className="absolute inset-0 items-center justify-center opacity-0"
              onPress={() => router.push(`/movie/${item.id}`)}>
              <View className="rounded-full bg-white/20 p-4 backdrop-blur-sm">
                <Ionicons name="play" size={32} color="white" />
              </View>
            </Pressable>
          </View>
        )}
        width={width - 32}
        height={500}
        style={{
          width: width,
          height: 500,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        autoPlay={true}
        loop={true}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        defaultIndex={1}
        autoPlayInterval={6000}
        panGestureHandlerProps={{
          activeOffsetX: [-10, 10],
        }}
      />

      {/* Pagination Dots */}
      <View className="mt-4 flex-row justify-center space-x-2">
        {movies.slice(0, 5).map((_, index) => (
          <View key={index} className="bg-netflix-gray/50 h-2 w-2 rounded-full" />
        ))}
      </View>
    </View>
  );
};

export default MainSlideShow;
