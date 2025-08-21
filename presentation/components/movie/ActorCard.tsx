import { Image, Text, View, Pressable } from 'react-native';
import { Cast } from 'infrastucture/interfaces/cast.interface';
import Animated, { useAnimatedStyle, withSpring, useSharedValue } from 'react-native-reanimated';
import { Ionicons } from '@expo/vector-icons';

interface Props {
  actor: Cast;
}

export const ActorCard = ({ actor }: Props) => {
  const scale = useSharedValue(1);

  const animatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <Animated.View style={animatedStyle}>
      <Pressable
        className="w-[120px]"
        onPressIn={() => {
          scale.value = withSpring(0.95, { damping: 15, stiffness: 300 });
        }}
        onPressOut={() => {
          scale.value = withSpring(1, { damping: 15, stiffness: 300 });
        }}>
        <View className="relative">
          <Image
            source={{ uri: actor.avatar }}
            className="h-[160px] w-[120px] rounded-xl"
            resizeMode="cover"
          />

          {/* Overlay con gradiente */}
          <View className="absolute inset-0 rounded-xl bg-gradient-to-t from-black/40 to-transparent" />

          {/* Character name overlay */}
          <View className="absolute bottom-0 left-0 right-0 p-2">
            <Text numberOfLines={1} className="text-center text-xs font-medium text-white">
              {actor.character}
            </Text>
          </View>
        </View>

        <View className="mt-3 px-1">
          <Text
            numberOfLines={2}
            className="text-center text-sm font-semibold leading-tight text-white">
            {actor.name}
          </Text>
        </View>
      </Pressable>
    </Animated.View>
  );
};
