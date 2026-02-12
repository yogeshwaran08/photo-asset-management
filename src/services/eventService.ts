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
    photo_count?: number;
    video_count?: number;
}

export interface Photo {
    id: number;
    title: string;
    url: string;
    event_id: number;
    file_size?: number;
    collection_id?: number | null;
}

export interface PhotoCreate {
    title: string;
    url: string;
    event_id: number;
    file_size?: number;
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
    },

    getPhotos: async (eventId: number) => {
        const response = await api.get<Photo[]>(`/events/${eventId}/photos`);
        return response.data;
    },

    uploadPhoto: async (eventId: number, data: PhotoCreate) => {
        const response = await api.post<Photo>(`/events/${eventId}/photos`, data);
        return response.data;
    }
};
