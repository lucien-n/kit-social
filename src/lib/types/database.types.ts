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
      follows: {
        Row: {
          created_at: string
          followed_uid: string
          follower_uid: string
          uid: string
        }
        Insert: {
          created_at?: string
          followed_uid: string
          follower_uid: string
          uid?: string
        }
        Update: {
          created_at?: string
          followed_uid?: string
          follower_uid?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "follows_followed_uid_fkey"
            columns: ["followed_uid"]
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          },
          {
            foreignKeyName: "follows_follower_uid_fkey"
            columns: ["follower_uid"]
            referencedRelation: "profiles"
            referencedColumns: ["uid"]
          }
        ]
      }
      pending_follows: {
        Row: {
          created_at: string
          followed_uid: string
          follower_uid: string
          uid: string
        }
        Insert: {
          created_at?: string
          followed_uid: string
          follower_uid: string
          uid?: string
        }
        Update: {
          created_at?: string
          followed_uid?: string
          follower_uid?: string
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "pending_follows_followed_uid_fkey"
            columns: ["followed_uid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "pending_follows_follower_uid_fkey"
            columns: ["follower_uid"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
      }
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
          last_seen: string
          name: string
          restricted: boolean
          uid: string
          updated_at: string
          verified: boolean
        }
        Insert: {
          avatar_url?: string | null
          created_at?: string
          last_seen?: string
          name: string
          restricted?: boolean
          uid: string
          updated_at?: string
          verified?: boolean
        }
        Update: {
          avatar_url?: string | null
          created_at?: string
          last_seen?: string
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
      profiles_settings: {
        Row: {
          hide_followed: boolean
          hide_likes: boolean
          is_private: boolean
          uid: string
        }
        Insert: {
          hide_followed?: boolean
          hide_likes?: boolean
          is_private?: boolean
          uid: string
        }
        Update: {
          hide_followed?: boolean
          hide_likes?: boolean
          is_private?: boolean
          uid?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_settings_uid_fkey"
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
      delete_avatar: {
        Args: {
          avatar_url: string
        }
        Returns: Record<string, unknown>
      }
      delete_storage_object: {
        Args: {
          bucket: string
          object: string
        }
        Returns: Record<string, unknown>
      }
      is_following: {
        Args: {
          followed: string
          follower: string
        }
        Returns: boolean
      }
      is_online: {
        Args: {
          user_uid: string
        }
        Returns: boolean
      }
      is_private: {
        Args: {
          user_uid: string
        }
        Returns: boolean
      }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
