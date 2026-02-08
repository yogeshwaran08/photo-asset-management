import api from '@/lib/axios';

export interface StudioSettingsBase {
    full_name?: string;
    mobile_number?: string;
    email_id?: string;
    country?: string;
    state?: string;
    city?: string;
    company_name?: string;
    industry?: string;
    area?: string;
    avg_events_per_year?: string;
    billing_company_name?: string;
    gst_vat_number?: string;
}

export interface StudioSettings extends StudioSettingsBase {
    id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
}

export const studioSettingsService = {
    create: async (data: StudioSettingsBase) => {
        const response = await api.post<StudioSettings>('/studio-settings/', data);
        return response.data;
    },

    getAll: async () => {
        const response = await api.get<StudioSettings[]>('/studio-settings/');
        return response.data;
    },

    getCurrent: async () => {
        const response = await api.get<StudioSettings>('/studio-settings/current/me');
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get<StudioSettings>(`/studio-settings/${id}`);
        return response.data;
    },

    update: async (id: number, data: StudioSettingsBase) => {
        const response = await api.put<StudioSettings>(`/studio-settings/${id}`, data);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/studio-settings/${id}`);
        return response.data;
    }
};
