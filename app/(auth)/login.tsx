import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function Login() {
  const [phoneNumber, setPhoneNumber] = useState('');

  const handleGoogleSignIn = () => {
    // Will implement Google Sign In later
    console.log('Google Sign In pressed');
  };

  const handlePhoneSignIn = () => {
    // Will implement Phone Sign In later
    console.log('Phone Sign In pressed with:', phoneNumber);
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=800&auto=format&fit=crop&q=60' }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.title}>ArtistHub</Text>
        <Text style={styles.subtitle}>Where talent meets opportunity</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="call" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your phone number"
            placeholderTextColor="#666"
            value={phoneNumber}
            onChangeText={setPhoneNumber}
            keyboardType="phone-pad"
          />
        </View>

        <TouchableOpacity style={styles.phoneButton} onPress={handlePhoneSignIn}>
          <Ionicons name="phone-portrait" size={24} color="white" />
          <Text style={styles.buttonText}>Continue with Phone</Text>
        </TouchableOpacity>

        <View style={styles.divider}>
          <View style={styles.dividerLine} />
          <Text style={styles.dividerText}>OR</Text>
          <View style={styles.dividerLine} />
        </View>

        <TouchableOpacity style={styles.googleButton} onPress={handleGoogleSignIn}>
          <Ionicons name="logo-google" size={24} color="white" />
          <Text style={styles.buttonText}>Continue with Google</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <Link href="/signup" style={styles.signupLink}>
            Sign Up
          </Link>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  header: {
    height: '40%',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  backgroundImage: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    opacity: 0.7,
  },
  overlay: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 10,
    zIndex: 1,
  },
  subtitle: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    opacity: 0.9,
    zIndex: 1,
  },
  form: {
    flex: 1,
    backgroundColor: '#000',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    padding: 20,
    gap: 20,
    marginTop: -30,
  },
  inputContainer: {
    backgroundColor: '#1a1a1a',
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    color: '#fff',
    fontSize: 16,
  },
  phoneButton: {
    backgroundColor: '#0066ff',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  googleButton: {
    backgroundColor: '#db4437',
    padding: 15,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#333',
  },
  dividerText: {
    color: '#666',
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 20,
  },
  signupText: {
    color: '#888',
  },
  signupLink: {
    color: '#0066ff',
    fontWeight: '600',
  },
});