export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      Artist: {
        Row: {
          id: string
          created_at: string
          name: string | null
          email: string | null
          phone_num: number | null
          user_id: string
          dob: string | null
          bio: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          name?: string | null
          email?: string | null
          phone_num?: number | null
          user_id: string
          dob?: string | null
          bio?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          name?: string | null
          email?: string | null
          phone_num?: number | null
          user_id?: string
          dob?: string | null
          bio?: string | null
        }
      }
    }
  }
}