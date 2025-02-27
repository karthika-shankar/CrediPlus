import React, { createContext, useState, useEffect, useContext } from 'react';
import { supabase } from '../lib/supabase';
import { getCurrentUser, getUserProfile } from '../lib/auth';
import { Tables } from '../lib/supabase';
import { getArtistByUserId }  from '../lib/artist';

type Artist = Tables['Artist']['Row'];

interface AuthContextType {
  user: any | null;
  artist: Artist | null;
  isLoading: boolean;
  signOut: () => Promise<void>;
  refreshArtistProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  artist: null,
  isLoading: true,
  signOut: async () => {},
  refreshArtistProfile: async () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<any | null>(null);
  const [profile, setProfile] = useState<Profile | null>(null);  const [artist, setArtist] = useState<Artist | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const fetchArtistProfile = async (userId: string) => {
    try {
      const { artist } = await getArtistByUserId(userId);
      setArtist(artist);
    } catch (error) {
      console.error('Error fetching artist profile:', error);
    }
  };

  const refreshArtistProfile = async () => {
    if (user) {
      await fetchArtistProfile(user.id);
    }
  };

  useEffect(() => {
    // Check for existing session
    const checkUser = async () => {
      try {
        setIsLoading(true);
        const { user: currentUser } = await getCurrentUser();
        
        if (currentUser) {
          setUser(currentUser);
          
          // Fetch user profile
          const { profile: userProfile } = await getUserProfile(currentUser.id);
          setProfile(userProfile);
          
          // Fetch artist profile
          await fetchArtistProfile(currentUser.id);
        }
      } catch (error) {
        console.error('Error checking user session:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkUser();

    // Set up auth state change listener
    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN' && session?.user) {
          setUser(session.user);
          const { profile: userProfile } = await getUserProfile(session.user.id);
          setProfile(userProfile);
          await fetchArtistProfile(session.user.id);
        } else if (event === 'SIGNED_OUT') {
          setUser(null);
          setProfile(null);
          setArtist(null);
        }
      }
    );

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProfile(null);
    setArtist(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        artist,
        isLoading,
        signOut: handleSignOut,
        refreshArtistProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};