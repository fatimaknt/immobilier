export interface Database {
  public: {
    Tables: {
      apartments: {
        Row: {
          id: string
          title: string
          description: string
          zone: 'Cité Mixta' | 'Ouest-foire' | 'Cité Kalia'
          address: string
          rooms: number
          bathrooms: number
          surface: number
          price_per_day: number
          price_per_week: number
          available: boolean
          equipment: string[]
          coordinates: { lat: number; lng: number }
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          zone: 'Cité Mixta' | 'Ouest-foire' | 'Cité Kalia'
          address: string
          rooms: number
          bathrooms: number
          surface: number
          price_per_day: number
          price_per_week: number
          available?: boolean
          equipment?: string[]
          coordinates: { lat: number; lng: number }
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          zone?: 'Cité Mixta' | 'Ouest-foire' | 'Cité Kalia'
          address?: string
          rooms?: number
          bathrooms?: number
          surface?: number
          price_per_day?: number
          price_per_week?: number
          available?: boolean
          equipment?: string[]
          coordinates?: { lat: number; lng: number }
          created_at?: string
          updated_at?: string
        }
      }
      cars: {
        Row: {
          id: string
          brand: string
          model: string
          year: number
          type: string
          transmission: string
          seats: number
          price_per_day: number
          available: boolean
          features: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          brand: string
          model: string
          year: number
          type: string
          transmission: string
          seats: number
          price_per_day: number
          available?: boolean
          features?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          brand?: string
          model?: string
          year?: number
          type?: string
          transmission?: string
          seats?: number
          price_per_day?: number
          available?: boolean
          features?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      images: {
        Row: {
          id: string
          entity_type: 'apartment' | 'car'
          entity_id: string
          url: string
          alt_text: string
          order_index: number
          is_primary: boolean
          created_at: string
        }
        Insert: {
          id?: string
          entity_type: 'apartment' | 'car'
          entity_id: string
          url: string
          alt_text: string
          order_index?: number
          is_primary?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          entity_type?: 'apartment' | 'car'
          entity_id?: string
          url?: string
          alt_text?: string
          order_index?: number
          is_primary?: boolean
          created_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          type: 'apartment' | 'car'
          entity_id: string
          user_name: string
          user_email: string
          user_phone: string
          start_date: string
          end_date: string
          total_amount: number
          status: 'pending' | 'confirmed' | 'cancelled'
          payment_method: string
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          type: 'apartment' | 'car'
          entity_id: string
          user_name: string
          user_email: string
          user_phone: string
          start_date: string
          end_date: string
          total_amount: number
          status?: 'pending' | 'confirmed' | 'cancelled'
          payment_method: string
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          type?: 'apartment' | 'car'
          entity_id?: string
          user_name?: string
          user_email?: string
          user_phone?: string
          start_date?: string
          end_date?: string
          total_amount?: number
          status?: 'pending' | 'confirmed' | 'cancelled'
          payment_method?: string
          notes?: string | null
          created_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          subject: string
          message: string
          attachment_url: string | null
          status: 'new' | 'read' | 'replied'
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          subject: string
          message: string
          attachment_url?: string | null
          status?: 'new' | 'read' | 'replied'
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          subject?: string
          message?: string
          attachment_url?: string | null
          status?: 'new' | 'read' | 'replied'
          created_at?: string
        }
      }
      testimonials: {
        Row: {
          id: string
          name: string
          comment: string
          rating: number
          type: 'apartment' | 'car'
          date: string
          approved: boolean
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          comment: string
          rating: number
          type: 'apartment' | 'car'
          date: string
          approved?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          comment?: string
          rating?: number
          type?: 'apartment' | 'car'
          date?: string
          approved?: boolean
          created_at?: string
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
  }
}
