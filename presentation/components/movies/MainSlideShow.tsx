import { View, Text, useWindowDimensions } from 'react-native';
import { Movie } from 'infrastucture/interfaces/movie.interface';
import Carousel, { ICarouselInstance } from 'react-native-reanimated-carousel';
import { useRef } from 'react';
import MoviePoster from './MoviePoster';

interface Props {
  movies: Movie[];
}

const MainSlideShow = ({ movies }: Props) => {
  const ref = useRef<ICarouselInstance>(null);
  const width = useWindowDimensions().width;
  return (
    <View className="h-[250px] w-full">
      <Carousel
        ref={ref}
        data={movies}
        renderItem={({ item }) => (
          <MoviePoster poster={item.poster} id={item.id} smallPoster={false} />
        )}
        width={200}
        height={350}
        style={{
          width: width,
          height: 350,
          // borderRadius: 20,
          // marginHorizontal: 20,
          // shadowColor: '#000',
          // shadowOffset: {
          //   width: 0,
          //   height: 10,
          // },
          // shadowOpacity: 0.25,
          // shadowRadius: 3.84,
          // elevation: 10,
          alignItems: 'center',
          justifyContent: 'center',
        }}
        autoPlay={false}
        loop={true}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        defaultIndex={1}
      />
    </View>
  );
};

export default MainSlideShow;
