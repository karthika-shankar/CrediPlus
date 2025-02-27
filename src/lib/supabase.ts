import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';
import { Database }  from '../types/supabase';
import Constants from "expo-constants";

const supabaseUrl = Constants.expoConfig.extra.SUPABASE_URL;
const supabaseAnonKey = Constants.expoConfig.extra.SUPABASE_ANON_KEY;

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

export type Tables = Database['public']['Tables'];
export type Enums = Database['public']['Enums'];