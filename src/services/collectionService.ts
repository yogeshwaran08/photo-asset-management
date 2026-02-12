import api from '@/lib/axios';

export interface CollectionBase {
    name: string;
    event_id: number;
}

export interface Collection extends CollectionBase {
    id: number;
    created_at: string;
    updated_at: string;
}

export interface CollectionCreate {
    name: string;
    event_id: number;
}

export const collectionService = {
    getAll: async (eventId?: number) => {
        const url = eventId ? `/collections/?event_id=${eventId}` : '/collections/';
        const response = await api.get<Collection[]>(url);
        return response.data;
    },

    getById: async (id: number) => {
        const response = await api.get<Collection>(`/collections/${id}`);
        return response.data;
    },

    create: async (data: CollectionCreate) => {
        const response = await api.post<Collection>('/collections/', data);
        return response.data;
    },

    update: async (id: number, data: Partial<CollectionBase>) => {
        const response = await api.put<Collection>(`/collections/${id}`, data);
        return response.data;
    },

    delete: async (id: number) => {
        const response = await api.delete(`/collections/${id}`);
        return response.data;
    }
};
