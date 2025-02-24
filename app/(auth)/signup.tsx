import { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput, Image, KeyboardAvoidingView, Platform } from 'react-native';
import { Link } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function SignUp() {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [name, setName] = useState('');

  const handleSignUp = () => {
    // Will implement sign up logic later
    console.log('Sign up pressed with:', { name, phoneNumber });
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Image 
          source={{ uri: 'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=800&auto=format&fit=crop&q=60' }}
          style={styles.backgroundImage}
        />
        <View style={styles.overlay} />
        <Text style={styles.title}>Join ArtistHub</Text>
        <Text style={styles.subtitle}>Share your talent with the world</Text>
      </View>

      <View style={styles.form}>
        <View style={styles.inputContainer}>
          <Ionicons name="person" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Enter your full name"
            placeholderTextColor="#666"
            value={name}
            onChangeText={setName}
          />
        </View>

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

        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.buttonText}>Create Account</Text>
        </TouchableOpacity>

        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <Link href="/login" style={styles.loginLink}>
            Log In
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
  signupButton: {
    backgroundColor: '#0066ff',
    padding: 15,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 5,
    marginTop: 20,
  },
  loginText: {
    color: '#888',
  },
  loginLink: {
    color: '#0066ff',
    fontWeight: '600',
  },
});