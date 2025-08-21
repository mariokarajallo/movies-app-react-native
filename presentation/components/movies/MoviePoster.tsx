import { router } from 'expo-router';
import { Image, Pressable, View, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  withTiming,
  useSharedValue,
  withSpring,
} from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  poster: string;
  id: number;
  smallPoster?: boolean;
  className?: string;
  showTitle?: boolean;
  title?: string;
  rating?: number;
}

const MoviePoster = ({
  poster,
  id,
  smallPoster = false,
  className,
  showTitle = false,
  title,
  rating,
}: Props) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
      opacity: opacity.value,
    };
  });

  const handlePressIn = () => {
    scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
    opacity.value = withTiming(0.8, { duration: 150 });
  };

  const handlePressOut = () => {
    scale.value = withSpring(1, { damping: 15, stiffness: 300 });
    opacity.value = withTiming(1, { duration: 150 });
  };

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className={`px-2 ${className}`}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={() => router.push(`/movie/${id}`)}>
        <View className="relative">
          <Image
            source={{ uri: poster }}
            className="rounded-lg"
            style={{
              width: smallPoster ? 120 : 200,
              height: smallPoster ? 180 : 300,
            }}
            resizeMode="cover"
          />

          {/* Overlay con gradiente sutil */}
          <View className="absolute inset-0 rounded-lg bg-gradient-to-t from-black/20 to-transparent" />

          {/* Rating badge (estilo IMDB) */}
          {rating !== undefined && rating !== null && rating > 0 && (
            <View className="bg-imdb-yellow absolute right-2 top-2 rounded-sm px-2 py-1">
              <Text className="text-imdb-dark text-xs font-bold">{Number(rating).toFixed(1)}</Text>
            </View>
          )}

          {/* Play button overlay */}
          <View className="absolute inset-0 items-center justify-center opacity-0">
            <View className="rounded-full bg-white/20 p-3 backdrop-blur-sm">
              <Ionicons name="play" size={24} color="white" />
            </View>
          </View>
        </View>

        {/* Título de la película */}
        {showTitle && title && (
          <View className="mt-2 px-1">
            <Text numberOfLines={2} className="text-sm font-medium leading-tight text-white">
              {title}
            </Text>
          </View>
        )}
      </Pressable>
    </Animated.View>
  );
};

export default MoviePoster;
