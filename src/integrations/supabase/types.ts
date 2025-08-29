export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

<<<<<<< Updated upstream
export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.4"
  }
  public: {
    Tables: {
      anexos_projeto_tec: {
        Row: {
          descricao: string | null
          id: string
          projeto_id: string
          tipo: string
          uploaded_at: string
          url: string
        }
        Insert: {
          descricao?: string | null
          id?: string
          projeto_id: string
          tipo: string
          uploaded_at?: string
          url: string
        }
        Update: {
          descricao?: string | null
          id?: string
          projeto_id?: string
          tipo?: string
          uploaded_at?: string
          url?: string
        }
        Relationships: [
          {
            foreignKeyName: "anexos_projeto_tec_projeto_id_fkey"
            columns: ["projeto_id"]
            isOneToOne: false
            referencedRelation: "projetos_tecnologia"
            referencedColumns: ["id"]
          },
        ]
      }
      permissions: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          description: string | null
          id: string
          name: string | null
          role_id: string | null
          updated_at: string
        }
        Insert: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          role_id?: string | null
          updated_at?: string
        }
        Update: {
          created_at?: string
          description?: string | null
          id?: string
          name?: string | null
          role_id?: string | null
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "profiles_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      projetos_tecnologia: {
        Row: {
          created_at: string
          descricao: string | null
          fim: string | null
          id: string
          inicio: string
          prioridade: string
          responsavel_id: string | null
          status: string
          titulo: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          descricao?: string | null
          fim?: string | null
          id?: string
          inicio: string
          prioridade?: string
          responsavel_id?: string | null
          status?: string
          titulo: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          descricao?: string | null
          fim?: string | null
          id?: string
          inicio?: string
          prioridade?: string
          responsavel_id?: string | null
          status?: string
          titulo?: string
=======
export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          email: string
          role: 'admin' | 'manager' | 'member' | 'guest'
          permissions: string[] // Array de permissões específicas
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          role?: 'admin' | 'manager' | 'member' | 'guest'
          permissions?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          role?: 'admin' | 'manager' | 'member' | 'guest'
          permissions?: string[]
          created_at?: string
>>>>>>> Stashed changes
          updated_at?: string
        }
      }
      role_permissions: {
        Row: {
<<<<<<< Updated upstream
          created_at: string | null
          permission_id: string
          role_id: string
        }
        Insert: {
          created_at?: string | null
          permission_id: string
          role_id: string
        }
        Update: {
          created_at?: string | null
          permission_id?: string
          role_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "role_permissions_permission_id_fkey"
            columns: ["permission_id"]
            isOneToOne: false
            referencedRelation: "permissions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "role_permissions_role_id_fkey"
            columns: ["role_id"]
            isOneToOne: false
            referencedRelation: "roles"
            referencedColumns: ["id"]
          },
        ]
      }
      roles: {
        Row: {
          created_at: string
          id: string
          name: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
        }
        Relationships: []
      }
      sugestoes_tecnologia: {
        Row: {
          created_at: string
          criado_por_id: string
          descricao: string
          id: string
          projeto_id: string | null
          status: string
          titulo: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          criado_por_id: string
          descricao: string
          id?: string
          projeto_id?: string | null
          status?: string
          titulo: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          criado_por_id?: string
          descricao?: string
          id?: string
          projeto_id?: string | null
          status?: string
          titulo?: string
          updated_at?: string
        }
        Relationships: [
          {
            foreignKeyName: "fk_projeto"
            columns: ["projeto_id"]
            isOneToOne: false
            referencedRelation: "projetos_tecnologia"
            referencedColumns: ["id"]
          },
        ]
      }
      team_members: {
        Row: {
          created_at: string | null
          profile_id: string
          role_in_team: string | null
          team_id: string
        }
        Insert: {
          created_at?: string | null
          profile_id: string
          role_in_team?: string | null
          team_id: string
        }
        Update: {
          created_at?: string | null
          profile_id?: string
          role_in_team?: string | null
          team_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "team_members_profile_id_fkey"
            columns: ["profile_id"]
            isOneToOne: false
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "team_members_team_id_fkey"
            columns: ["team_id"]
            isOneToOne: false
            referencedRelation: "teams"
            referencedColumns: ["id"]
          },
        ]
      }
      teams: {
        Row: {
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          created_at?: string | null
          id?: string
          name?: string
=======
          id: string
          title: string
          subtitle: string | null
          description: string | null
          status: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'On Hold'
          progress: number | null
          start_date: string | null
          end_date: string | null
          budget: number | null
          assigned_to: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          subtitle?: string | null
          description?: string | null
          status?: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'On Hold'
          progress?: number | null
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          assigned_to?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          subtitle?: string | null
          description?: string | null
          status?: 'Planning' | 'In Progress' | 'Review' | 'Completed' | 'On Hold'
          progress?: number | null
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          assigned_to?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      collaborators: {
        Row: {
          id: string
          name: string
          email: string | null
          phone: string | null
          role: 'admin' | 'manager' | 'member' | 'guest'
          department: string | null
          location: string | null
          avatar_url: string | null
          permissions: string[] // Array de permissões específicas
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email?: string | null
          phone?: string | null
          role?: 'admin' | 'manager' | 'member' | 'guest'
          department?: string | null
          location?: string | null
          avatar_url?: string | null
          permissions?: string[]
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string | null
          phone?: string | null
          role?: 'admin' | 'manager' | 'member' | 'guest'
          department?: string | null
          location?: string | null
          avatar_url?: string | null
          permissions?: string[]
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      events: {
        Row: {
          id: string
          title: string
          description: string | null
          start_date: string | null
          end_date: string | null
          location: string | null
          status: 'planned' | 'in_progress' | 'completed' | 'cancelled'
          organizer_id: string
          project_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          location?: string | null
          status?: 'planned' | 'in_progress' | 'completed' | 'cancelled'
          organizer_id: string
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          start_date?: string | null
          end_date?: string | null
          location?: string | null
          status?: 'planned' | 'in_progress' | 'completed' | 'cancelled'
          organizer_id?: string
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'todo' | 'in_progress' | 'review' | 'completed'
          priority: 'low' | 'medium' | 'high' | 'urgent'
          due_date: string | null
          assigned_to: string | null
          project_id: string | null
          created_by: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: 'todo' | 'in_progress' | 'review' | 'completed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          due_date?: string | null
          assigned_to?: string | null
          project_id?: string | null
          created_by: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: 'todo' | 'in_progress' | 'review' | 'completed'
          priority?: 'low' | 'medium' | 'high' | 'urgent'
          due_date?: string | null
          assigned_to?: string | null
          project_id?: string | null
          created_by?: string
          created_at?: string
          updated_at?: string
        }
      }
      expenses: {
        Row: {
          id: string
          description: string
          amount: number
          category: string | null
          date: string | null
          project_id: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          description: string
          amount: number
          category?: string | null
          date?: string | null
          project_id?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          description?: string
          amount?: number
          category?: string | null
          date?: string | null
          project_id?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      revenues: {
        Row: {
          id: string
          description: string
          amount: number
          category: string | null
          date: string | null
          project_id: string | null
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          description: string
          amount: number
          category?: string | null
          date?: string | null
          project_id?: string | null
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          description?: string
          amount?: number
          category?: string | null
          date?: string | null
          project_id?: string | null
          user_id?: string
          created_at?: string
          updated_at?: string
        }
      }
      music_tracks: {
        Row: {
          id: string
          title: string
          artist: string | null
          duration: number | null
          genre: string | null
          album_id: string | null
          project_id: string | null
          file_url: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          artist?: string | null
          duration?: number | null
          genre?: string | null
          album_id?: string | null
          project_id?: string | null
          file_url?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          artist?: string | null
          duration?: number | null
          genre?: string | null
          album_id?: string | null
          project_id?: string | null
          file_url?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      choreographies: {
        Row: {
          id: string
          title: string
          description: string | null
          duration: number | null
          difficulty: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          music_track_id: string | null
          project_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          duration?: number | null
          difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          music_track_id?: string | null
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          duration?: number | null
          difficulty?: 'beginner' | 'intermediate' | 'advanced' | 'expert'
          music_track_id?: string | null
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      marketing_campaigns: {
        Row: {
          id: string
          title: string
          description: string | null
          status: 'draft' | 'active' | 'paused' | 'completed'
          start_date: string | null
          end_date: string | null
          budget: number | null
          project_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          status?: 'draft' | 'active' | 'paused' | 'completed'
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          status?: 'draft' | 'active' | 'paused' | 'completed'
          start_date?: string | null
          end_date?: string | null
          budget?: number | null
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      visual_maps: {
        Row: {
          id: string
          title: string
          description: string | null
          type: 'mind_map' | 'flowchart' | 'timeline' | 'organizational'
          data: Json | null
          project_id: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description?: string | null
          type?: 'mind_map' | 'flowchart' | 'timeline' | 'organizational'
          data?: Json | null
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string | null
          type?: 'mind_map' | 'flowchart' | 'timeline' | 'organizational'
          data?: Json | null
          project_id?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      notifications: {
        Row: {
          id: string
          title: string
          message: string
          type: 'info' | 'success' | 'warning' | 'error'
          read: boolean
          user_id: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          message: string
          type?: 'info' | 'success' | 'warning' | 'error'
          read?: boolean
          user_id: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          message?: string
          type?: 'info' | 'success' | 'warning' | 'error'
          read?: boolean
          user_id?: string
          created_at?: string
          updated_at?: string
>>>>>>> Stashed changes
        }
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

<<<<<<< Updated upstream
type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]
=======
// Tipos auxiliares para permissões
export type Permission = 
  | 'dashboard:read'
  | 'dashboard:write'
  | 'projects:read'
  | 'projects:write'
  | 'collaborators:read'
  | 'collaborators:write'
  | 'events:read'
  | 'events:write'
  | 'tasks:read'
  | 'tasks:write'
  | 'finance:read'
  | 'finance:write'
  | 'marketing:read'
  | 'marketing:write'
  | 'music:read'
  | 'music:write'
  | 'dance:read'
  | 'dance:write'
  | 'visual:read'
  | 'visual:write';

export type UserRole = 'admin' | 'manager' | 'member' | 'guest';

// Interface para usuário com permissões
export interface UserWithPermissions {
  id: string;
  email: string;
  role: UserRole;
  permissions: Permission[];
}

// Interface para colaborador com permissões
export interface CollaboratorWithPermissions {
  id: string;
  name: string;
  email: string | null;
  role: UserRole;
  permissions: Permission[];
  department: string | null;
  location: string | null;
  avatar_url: string | null;
  user_id: string;
  created_at: string;
  updated_at: string;
}

type DefaultSchema = Database[Extract<keyof Database, "public">]
>>>>>>> Stashed changes

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
