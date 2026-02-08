import api from '@/lib/axios';

export interface Photo {
    id: number;
    title: string;
    url: string;
    event_id: number;
    file_size?: number;
    size?: number; // fallback
}

export const photoService = {
    getAll: async () => {
        const response = await api.get<Photo[]>('/photos/');
        return response.data;
    }
};
