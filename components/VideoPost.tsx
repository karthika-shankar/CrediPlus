// VideoPost.tsx
import React, { useState, useRef, useCallback, useEffect } from 'react';
import { View, StyleSheet, Image, Dimensions, TouchableWithoutFeedback } from 'react-native';
import { Link } from 'expo-router';
import { Video } from 'expo-av';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

interface Artist {
  id: string;
  name: string;
  avatar: string;
}

interface VideoPostProps {
  video: {
    id: string;
    url: any; // Use require(…) for local assets or a URL object for remote videos
    artist: Artist;
  };
  onDoubleTap: () => void;
  isActive: boolean;
}

export default function VideoPost({ video, onDoubleTap, isActive }: VideoPostProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const videoRef = useRef<Video>(null);
  const lastTapRef = useRef<number>(0);
  const isLongPressing = useRef<boolean>(false);
  const [userInteracted, setUserInteracted] = useState(false);

  // Handle screen focus changes
  useFocusEffect(
    useCallback(() => {
      return () => {
        if (videoRef.current) {
          videoRef.current.pauseAsync();
          setIsPlaying(false);
          setUserInteracted(false);
        }
      };
    }, [])
  );

  // Modified isActive effect to respect user interactions
  useEffect(() => {
    if (videoRef.current && !userInteracted) {
      if (isActive) {
        videoRef.current.playAsync();
        setIsPlaying(true);
      } else {
        videoRef.current.pauseAsync();
        setIsPlaying(false);
      }
    }
  }, [isActive]);

  const handlePress = () => {
    const now = Date.now();
    const DOUBLE_TAP_DELAY = 300; // ms
    
    if (now - lastTapRef.current < DOUBLE_TAP_DELAY) {
      // Double tap detected
      onDoubleTap();
      lastTapRef.current = 0;
    } else {
      // Single tap - ONLY toggle mute, don't affect playback
      if (!isLongPressing.current) {
        setIsMuted((prev) => {
          const newMuted = !prev;
          if (videoRef.current) {
            // Just update the mute status, don't change playback state
            videoRef.current.setStatusAsync({ isMuted: newMuted });
          }
          return newMuted;
        });
      }
      lastTapRef.current = now;
    }
  };

  // Modified long press handler
  const handleLongPress = () => {
    isLongPressing.current = true;
    setUserInteracted(true);
    if (isPlaying && videoRef.current) {
      videoRef.current.pauseAsync();
      setIsPlaying(false);
    }
  };

  // Modified press out handler
  const handlePressOut = () => {
    if (isLongPressing.current) {
      isLongPressing.current = false;
      if (!isPlaying && videoRef.current && isActive) {
        videoRef.current.playAsync();
        setIsPlaying(true);
        setUserInteracted(false); // Reset user interaction when resuming
      }
    }
  };

  return (
    <View style={styles.container}>
      <TouchableWithoutFeedback
        onPress={handlePress}
        onLongPress={handleLongPress}
        onPressOut={handlePressOut}
        delayLongPress={500}
      >
        <View style={styles.videoWrapper}>
          <Video
            ref={videoRef}
            source={video.url}
            style={StyleSheet.absoluteFillObject}
            resizeMode="cover"
            isLooping
            shouldPlay={false} // Playback is controlled via isActive
            isMuted={isMuted}
          />
          {/* Overlay border */}
          <View style={styles.borderOverlay} pointerEvents="none" />
        </View>
      </TouchableWithoutFeedback>
      
      <View style={styles.profilePhotoContainer}>
        <Link href={`/artist/${video.artist.id}`} asChild>
          <View style={styles.artistContainer}>
            <Image
              source={video.artist.avatar}
              style={styles.avatar}
            />
          </View>
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
    borderRadius: 50,
    overflow: 'hidden',
  },
  // The border overlay is absolutely positioned to cover the entire video area.
  borderOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderWidth: 10,
    borderColor: '#fff', // Adjust color as desired
    borderRadius: 50,    // Ensure it matches videoWrapper radius
  },
  profilePhotoContainer: {
    position: 'absolute',
    bottom: 115,
    left: '44.7%',
    transform: [{ translateX: -25 }],
    alignItems: 'center',
    zIndex: 2,
  },
  artistContainer: {
    alignItems: 'center',
  },
  avatar: {
    width: 85,
    height: 85,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#fff',
  },
});