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
      posts: {
        Row: {
          author_uid: string
          content: string
          created_at: string
          uid: string
        }
        Insert: {
          author_uid: string
          content: string
          created_at?: string
          uid?: string
        }
        Update: {
          author_uid?: string
          content?: string
          created_at?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_author_uid_fkey"
            columns: ["author_uid"]
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          created_at: string
          name: string
          restricted: boolean
          uid: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          name: string
          restricted?: boolean
          uid: string
          updated_at?: string
          verified?: boolean
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          name?: string
          restricted?: boolean
          uid?: string
          updated_at?: string
          verified?: boolean
        }
        Relationships: [
          {
            foreignKeyName: "profiles_uid_fkey"
            columns: ["uid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
