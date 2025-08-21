import React, { useState } from 'react';
import { View, Text, Pressable, Modal, Dimensions } from 'react-native';
import { WebView } from 'react-native-webview';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'infrastucture/interfaces/video.interface';

interface Props {
  video: Video;
  isVisible: boolean;
  onClose: () => void;
}

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

const VideoPlayer = ({ video, isVisible, onClose }: Props) => {
  const [isLoading, setIsLoading] = useState(true);

  const getYouTubeEmbedUrl = (videoKey: string) => {
    return `https://www.youtube.com/embed/${videoKey}?autoplay=1&rel=0&showinfo=0`;
  };

  return (
    <Modal
      visible={isVisible}
      animationType="slide"
      presentationStyle="fullScreen"
      onRequestClose={onClose}>
      <View className="flex-1 bg-black">
        {/* Header */}
        <View className="flex-row items-center justify-between p-4 pt-12">
          <Text className="mr-4 flex-1 text-lg font-semibold text-white" numberOfLines={1}>
            {video.name}
          </Text>
          <Pressable onPress={onClose} className="rounded-full bg-black/50 p-2">
            <Ionicons name="close" size={24} color="white" />
          </Pressable>
        </View>

        {/* Video Container */}
        <View className="flex-1 items-center justify-center">
          {isLoading && (
            <View className="absolute z-10">
              <Text className="text-lg text-white">Cargando video...</Text>
            </View>
          )}

          <WebView
            source={{ uri: getYouTubeEmbedUrl(video.key) }}
            style={{ width: screenWidth, height: screenHeight * 0.6 }}
            onLoadStart={() => setIsLoading(true)}
            onLoadEnd={() => setIsLoading(false)}
            allowsFullscreenVideo={true}
            mediaPlaybackRequiresUserAction={false}
            javaScriptEnabled={true}
            domStorageEnabled={true}
          />
        </View>

        {/* Video Info */}
        <View className="p-4">
          <Text className="mb-2 text-xl font-bold text-white">{video.name}</Text>
          <Text className="text-sm text-gray-400">
            {video.official ? 'Trailer Oficial' : 'Trailer'} •
            {video.published_at.toLocaleDateString('es-ES')}
          </Text>
        </View>
      </View>
    </Modal>
  );
};

export default VideoPlayer;
