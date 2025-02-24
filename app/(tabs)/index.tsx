import { useState } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import Animated from 'react-native-reanimated';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import VideoPost from '../../components/VideoPost';

const { height } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const gesture = Gesture.Pan()
    .onStart(() => {
      // Handle gesture start
    })
    .onUpdate((event) => {
      // Handle gesture update
    })
    .onEnd((event) => {
      if (Math.abs(event.velocityY) > 500) {
        if (event.velocityY > 0) {
          // Swipe down
          setCurrentIndex((prev) => Math.max(0, prev - 1));
        } else {
          // Swipe up
          setCurrentIndex((prev) => prev + 1);
        }
      }
    });

  // Mock data - replace with real API data
  const videos = [
    {
      id: '1',
      url: 'https://example.com/video1.mp4',
      artist: {
        id: '1',
        name: 'John Doe',
        avatar: 'https://example.com/avatar1.jpg',
      },
    },
    // Add more videos
  ];

  return (
    <View style={styles.container}>
      <GestureDetector gesture={gesture}>
        <Animated.View style={styles.videoContainer}>
          <VideoPost
            video={videos[currentIndex]}
            onDoubleTap={() => {
              // Navigate to artist profile
            }}
          />
        </Animated.View>
      </GestureDetector>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure the container has a transparent background
  },
  videoContainer: {
    height: height*1.057,
    width: '100%',
  },
});