// HomeScreen.tsx
import React, { useState } from 'react';
import { View, StyleSheet, Dimensions, StatusBar } from 'react-native';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native-gesture-handler';
import VideoPost from '../../components/VideoPost';

const { height, width } = Dimensions.get('window');

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const videos = [
    {
      id: '1',
      url: require('../../assets/videos/sample_1.mp4'),
      artist: {
        id: '1',
        name: 'John Doe',
        avatar: require('../../assets/images/image.png'),
      },
    },
    {
      id: '2',
      url: require('../../assets/videos/sample_2.mp4'),
      artist: {
        id: '2',
        name: 'Jane Doe',
        avatar: require('../../assets/images/icon.png'),
      },
    },
    // Add more videos if needed
  ];

  const onViewableItemsChanged = React.useRef(({ viewableItems }) => {
    if (viewableItems.length > 0) {
      // Assume only one video is visible at a time.
      setCurrentIndex(viewableItems[0].index);
    }
  });

  const viewabilityConfig = React.useRef({
    itemVisiblePercentThreshold: 50,
  });

  return (
    <GestureHandlerRootView style={styles.container}>
      <FlatList
        data={videos}
        renderItem={({ item, index }) => (
          <View style={styles.videoContainer}>
            <VideoPost
              video={item}
              onDoubleTap={() => {
                console.log('Double tap detected');
              }}
              isActive={index === currentIndex}
            />
          </View>
        )}
        keyExtractor={(item) => item.id}
        pagingEnabled={true}
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        onViewableItemsChanged={onViewableItemsChanged.current}
        viewabilityConfig={viewabilityConfig.current}
        initialScrollIndex={currentIndex}
        getItemLayout={(data, index) => ({
          length: height,
          offset: height * index,
          index,
        })}
        vertical
      />
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  videoContainer: {
    height: height * 1.057,
    width: width,
    backgroundColor: '#000',
  },
});