import api from '@/lib/axios';

export interface EventBase {
    name: string;
    start_date?: string;
    end_date?: string;
    event_type?: string;
    location?: string;
    description?: string;
    template_id?: string;
    status?: string;
}

export interface Event extends EventBase {
    id: number;
    created_at: string;
    updated_at: string;
}

export const eventService = {
    getAll: async () => {
        const response = await api.get<Event[]>('/events/');
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get<Event>(`/events/${id}`);
        return response.data;
    },

    create: async (data: EventBase) => {
        const response = await api.post<Event>('/events/', data);
        return response.data;
    },

    update: async (id: number, data: Partial<EventBase>) => {
        const response = await api.put<Event>(`/events/${id}`, data);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/events/${id}`);
        return response.data;
    }
};
