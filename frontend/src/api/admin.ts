import apiClient, { API_BASE_URL } from './client';
import { RegistrationDetailResponse } from './registrations';
import { UserProfile } from './users';

export interface TicketScanResult {
  message: string;
  member_name: string;
  student_id: string;
  team_name: string;
  scanned_at: string;
}

export const adminApi = {
  getPendingRegistrations: async (): Promise<RegistrationDetailResponse[]> => {
    const res = await apiClient.get<RegistrationDetailResponse[]>('/admin/registrations/pending');
    return res.data;
  },

  approveRegistration: async (registrationId: string): Promise<RegistrationDetailResponse> => {
    const res = await apiClient.post<RegistrationDetailResponse>(`/admin/registrations/${registrationId}/approve`);
    return res.data;
  },

  rejectRegistration: async (registrationId: string): Promise<RegistrationDetailResponse> => {
    const res = await apiClient.post<RegistrationDetailResponse>(`/admin/registrations/${registrationId}/reject`);
    return res.data;
  },

  scanTicket: async (ticketQrToken: string): Promise<TicketScanResult> => {
    const res = await apiClient.post<TicketScanResult>('/admin/tickets/scan', {
      ticket_qr_token: ticketQrToken.trim(),
    });
    return res.data;
  },

  getStudentsForPromotion: async (search?: string): Promise<UserProfile[]> => {
    const params = search ? { search } : {};
    const res = await apiClient.get<UserProfile[]>('/admin/users', { params });
    return res.data;
  },

  promoteUser: async (userId: string): Promise<UserProfile> => {
    const res = await apiClient.post<UserProfile>(`/admin/users/${userId}/promote`);
    return res.data;
  },

  getExportUrl: (eventId: string): string => {
    return `${API_BASE_URL}/admin/export/${eventId}`;
  },

  uploadPoster: async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await apiClient.post<{ url: string }>('/admin/upload/poster', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.url;
  },

  uploadPaymentQr: async (file: File): Promise<string> => {
    const fd = new FormData();
    fd.append('file', file);
    const res = await apiClient.post<{ url: string }>('/admin/upload/payment-qr', fd, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data.url;
  },

  downloadExportExcel: async (eventId: string, eventTitle = 'event'): Promise<void> => {
    const res = await apiClient.get(`/admin/export/${eventId}`, {
      responseType: 'blob',
    });
    const url = window.URL.createObjectURL(new Blob([res.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${eventTitle.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_registrations.xlsx`);
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  },
};
