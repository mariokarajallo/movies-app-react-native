import { View, Text, Image, Pressable } from 'react-native';

interface Props {
  poster: string;
  id: number;
  smallPoster?: boolean;
  className?: string;
}

const MoviePoster = ({ poster, id, smallPoster = false, className }: Props) => {
  return (
    <Pressable className={`px-2 transition-opacity duration-300 active:opacity-80 ${className}`}>
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
  );
};

export default MoviePoster;
