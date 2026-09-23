import apiClient from './client';

export interface EventItem {
  id: string;
  title: string;
  description: string;
  fee_amount: number | string;
  is_team_event: boolean;
  min_team_size: number;
  max_team_size: number;
  max_capacity?: number | null;
  event_date?: string | null;
  registration_deadline?: string | null;
  poster_url?: string | null;
  payment_qr_url?: string | null;
  status: 'draft' | 'upcoming' | 'ongoing' | 'completed' | 'cancelled';
  early_bird_enabled: boolean;
  early_bird_capacity?: number | null;
  early_bird_fee?: string | number | null;
  early_bird_taken?: number | null;
  created_at?: string;
  created_by?: string;
}

export interface EventCreatePayload {
  title: string;
  description: string;
  fee_amount: number | string;
  is_team_event: boolean;
  min_team_size: number;
  max_team_size: number;
  max_capacity?: number | null;
  event_date?: string | null;
  registration_deadline?: string | null;
  poster_url?: string | null;
  payment_qr_url?: string | null;
  status: string;
  early_bird_enabled?: boolean;
  early_bird_capacity?: number | null;
  early_bird_fee?: number | null;
}

export const eventsApi = {
  getEvents: async (): Promise<EventItem[]> => {
    const res = await apiClient.get<EventItem[]>('/events/');
    return res.data;
  },

  getEvent: async (eventId: string): Promise<EventItem> => {
    const res = await apiClient.get<EventItem>(`/events/${eventId}`);
    return res.data;
  },

  createEvent: async (payload: EventCreatePayload): Promise<EventItem> => {
    const res = await apiClient.post<EventItem>('/events/', payload);
    return res.data;
  },

  updateEvent: async (eventId: string, payload: Partial<EventCreatePayload>): Promise<EventItem> => {
    const res = await apiClient.put<EventItem>(`/events/${eventId}`, payload);
    return res.data;
  },

  deleteEvent: async (eventId: string): Promise<{ message: string }> => {
    const res = await apiClient.delete<{ message: string }>(`/events/${eventId}`);
    return res.data;
  },
};
