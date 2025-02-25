import { useState, useRef } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Video } from 'expo-av';

const { width, height } = Dimensions.get('window');

interface Artist {
  id: string;
  name: string;
  avatar: string;
}

interface VideoPostProps {
  video: {
    id: string;
    url: string;
    artist: Artist;
  };
  onDoubleTap: () => void;
}

export default function VideoPost({ video, onDoubleTap }: VideoPostProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(true);
  const videoRef = useRef<Video>(null);

  const handleSingleTap = () => {
    setIsMuted(!isMuted);
  };

  const handleLongPress = () => {
    if (isPlaying) {
      videoRef.current?.pauseAsync();
      setIsPlaying(false);
    }
  };

  const handlePressOut = () => {
    if (!isPlaying) {
      videoRef.current?.playAsync();
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.videoWrapper}
        onPress={handleSingleTap}
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}
        onDoubleTap={onDoubleTap}
        activeOpacity={1}>
        <Video
          ref={videoRef}
          source={require('../assets/videos/sample_1.mp4')} // source={{ uri: video.url }}
          style={StyleSheet.absoluteFillObject}
          resizeMode="cover"
          isLooping
          shouldPlay
          isMuted={isMuted}
        />
      </TouchableOpacity>

      {/*
      <View style={styles.overlay}>
        <View style={styles.rightControls}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => setIsLiked(!isLiked)}>
            <Ionicons
              name={isLiked ? 'heart' : 'heart-outline'}
              size={30}
              color={isLiked ? '#ff2d55' : '#fff'}
            />
          </TouchableOpacity>

          <TouchableOpacity style={styles.actionButton}>
            <Ionicons name="share-outline" size={30} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      */}

      <View style={styles.profilePhotoContainer}>
        <Link href={`/artist/${video.artist.id}`} asChild>
          <>
            <TouchableOpacity style={styles.artistContainer}>
              <Image
                source={require('../assets/images/image.png')}
                style={styles.avatar}
              />
            </TouchableOpacity>
          </>
        </Link>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  videoWrapper: {
    flex: 1,
  },
  video: {
    flex: 1,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    flexDirection: 'row',
    padding: 20,
  },
  rightControls: {
    position: 'absolute',
    right: 10,
    bottom: 200,
    alignItems: 'center',
    gap: 20,
  },
  actionButton: {
    alignItems: 'center',
    gap: 10,
  },
  profilePhotoContainer: {
    position: 'absolute',
    bottom: 70, // Adjust this value to position the profile photo above the home tab
    left: '44.7%',
    transform: [{ translateX: -25 }], // Adjust this value based on the width of the profile photo
    alignItems: 'center',
  },
  artistContainer: {
    alignItems: 'center',
    gap: 10,
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
});