import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { View, StyleSheet, Image } from 'react-native';

export default function TabLayout() {
  console.log('Image path:', require('../../assets/images/LOGO_1.png')); // Log the image path

  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/LOGO_1.png')} // Replace with the actual path to your app logo
        style={styles.logo}
      />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: 'transparent', // Make the tab bar background transparent
            borderTopWidth: 0,
            position: 'absolute', // Position the tab bar absolutely
          },
          tabBarActiveTintColor: '#fff',
          tabBarInactiveTintColor: '#666',
        }}>

        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
          
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="home" size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="search"
          options={{
            title: 'Search',
            tabBarIcon: ({ size, color }) => (
              <Ionicons name="search" size={size} color={color} />
            ),
          }}
        />
        
      </Tabs>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'transparent', // Ensure the container has a transparent background
  },
  logo: {
    position: 'absolute',
    top: 40, // Adjust this value to position the logo vertically
    left: 175, // Adjust this value to position the logo horizontally
    width: 70, // Adjust this value to set the width of the logo
    height: 70, // Adjust this value to set the height of the logo
    zIndex: 1, // Ensure the logo is above the tab bar
  },
});