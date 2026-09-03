import apiClient from './client';

export interface TokenResponse {
  access_token: string;
  token_type: string;
  user: {
    id: string;
    email: string;
    name: string;
    role: string;
    stdid?: string | null;
    branch?: string | null;
    year?: number | null;
    phone?: string | null;
    created_at?: string;
  };
}

export const authApi = {
  googleCallback: async (payload: {
    email: string;
    name: string;
    oauth_id?: string;
    oauth_provider?: string;
  }): Promise<TokenResponse> => {
    const res = await apiClient.post<TokenResponse>('/auth/google-callback', payload);
    return res.data;
  },

  devLogin: async (payload: {
    email: string;
    name?: string;
    role?: 'student' | 'admin';
    stdid?: string;
  }): Promise<TokenResponse> => {
    const res = await apiClient.post<TokenResponse>('/auth/dev-login', payload);
    return res.data;
  },

  adminLogin: async (payload: {
    email: string;
    password: string;
  }): Promise<TokenResponse> => {
    const res = await apiClient.post<TokenResponse>('/auth/admin-login', payload);
    return res.data;
  },
};
