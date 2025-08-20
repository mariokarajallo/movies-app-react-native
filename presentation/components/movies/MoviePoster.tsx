import { router } from 'expo-router';
import { Image, Pressable } from 'react-native';
import Animated, { useAnimatedStyle, withTiming, useSharedValue } from 'react-native-reanimated';

interface Props {
  poster: string;
  id: number;
  smallPoster?: boolean;
  className?: string;
}

const MoviePoster = ({ poster, id, smallPoster = false, className }: Props) => {
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className={`px-2 ${className}`}
        onPressIn={() => {
          opacity.value = withTiming(0.8, { duration: 150 });
        }}
        onPressOut={() => {
          opacity.value = withTiming(1, { duration: 150 });
        }}
        onPress={() => {
          router.push(`/movie/${id}`);
        }}>
        <Image
          source={{ uri: poster }}
          className={`h-full w-full rounded-2xl shadow-lg shadow-black/50`}
          style={{
            width: smallPoster ? 85 : 150,
            height: smallPoster ? 130 : 250,
          }}
          resizeMode="cover"
        />
      </Pressable>
    </Animated.View>
  );
};

export default MoviePoster;
