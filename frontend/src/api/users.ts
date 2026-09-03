import apiClient from './client';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  role: string;
  stdid?: string | null;
  branch?: string | null;
  year?: number | null;
  phone?: string | null;
  created_at?: string;
}

export interface UserProfileUpdate {
  stdid: string;
  phone?: string;
  branch?: string;
  year?: number;
}

export const usersApi = {
  getProfile: async (): Promise<UserProfile> => {
    const res = await apiClient.get<UserProfile>('/users/me');
    return res.data;
  },

  updateProfile: async (payload: UserProfileUpdate): Promise<UserProfile> => {
    const res = await apiClient.patch<UserProfile>('/users/me', payload);
    return res.data;
  },
};
