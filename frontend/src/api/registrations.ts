import apiClient from './client';

export interface StudentLookup {
  id: string;
  stdid: string;
  name: string;
  email: string;
}

export interface TeamRegistrationPayload {
  event_id: string;
  team_name?: string;
  member_stdids: string[];
}

export interface RegistrationSimpleResponse {
  id: string;
  event_id: string;
  team_name?: string | null;
  status: string;
  amount_paid: number;
  message?: string;
}

export interface RegistrationMemberDetail {
  id: string;
  student_id: string;
  student_name: string;
  student_email: string;
  student_stdid?: string | null;
  is_leader: boolean;
  ticket_qr_token?: string | null;
  ticket_used: boolean;
  scanned_at?: string | null;
}

export interface RegistrationDetailResponse {
  id: string;
  event_id: string;
  event_title?: string | null;
  leader_id: string;
  leader_name?: string | null;
  leader_email?: string | null;
  leader_stdid?: string | null;
  team_name?: string | null;
  status: 'pending_payment' | 'pending_approval' | 'approved' | 'rejected';
  transaction_id?: string | null;
  payment_screenshot_url?: string | null;
  amount_paid: number;
  retry_count: number;
  created_at: string;
  verified_at?: string | null;
  members: RegistrationMemberDetail[];
}

export interface MemberTicketResponse {
  ticket_qr_token: string;
  event_title: string;
  event_date?: string | null;
  team_name?: string | null;
  ticket_used: boolean;
  scanned_at?: string | null;
  qr_code_base64: string;
}

export const registrationsApi = {
  lookupStudent: async (stdid: string): Promise<StudentLookup> => {
    const res = await apiClient.get<StudentLookup>(`/registrations/student-lookup/${encodeURIComponent(stdid.trim())}`);
    return res.data;
  },

  registerTeam: async (payload: TeamRegistrationPayload): Promise<RegistrationSimpleResponse> => {
    const res = await apiClient.post<RegistrationSimpleResponse>('/registrations/', payload);
    return res.data;
  },

  getRegistration: async (registrationId: string): Promise<RegistrationDetailResponse> => {
    const res = await apiClient.get<RegistrationDetailResponse>(`/registrations/${registrationId}`);
    return res.data;
  },

  submitPayment: async (
    registrationId: string,
    transactionId: string,
    screenshotFile: File
  ): Promise<RegistrationSimpleResponse> => {
    const formData = new FormData();
    formData.append('transaction_id', transactionId);
    formData.append('file', screenshotFile);

    const res = await apiClient.post<RegistrationSimpleResponse>(
      `/registrations/${registrationId}/payment`,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return res.data;
  },

  getMyTickets: async (): Promise<MemberTicketResponse[]> => {
    const res = await apiClient.get<MemberTicketResponse[]>('/registrations/my-tickets');
    return res.data;
  },

  getMyRegistrations: async (): Promise<RegistrationDetailResponse[]> => {
    const res = await apiClient.get<RegistrationDetailResponse[]>('/registrations/my-registrations');
    return res.data;
  },
};
