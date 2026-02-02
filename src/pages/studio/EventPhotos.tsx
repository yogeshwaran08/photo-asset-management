import { useState } from 'react';
import {
    Upload,
    Trash2,
    Download,
    Share2,
    CheckCircle2,
    Maximize2,
    Settings2,
    Camera,
    Calendar
} from 'lucide-react';
import { MOCK_PHOTOS } from '../../utils/mockData';
import { cn } from '../../utils/cn';

const EventPhotos = () => {

    const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

    const toggleSelect = (id: string) => {
        setSelectedPhotos(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 bg-white dark:bg-slate-900 p-8 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600">
                        <Camera size={32} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold">Wedding of Sarah & James</h1>
                        <div className="flex items-center gap-3 mt-1 text-slate-500 text-sm">
                            <span className="flex items-center gap-1"><Calendar size={14} /> June 15, 2024</span>
                            <span>•</span>
                            <span className="flex items-center gap-1 text-emerald-600 font-bold"><CheckCircle2 size={14} /> Published</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-3">
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium">
                        <Share2 size={18} />
                        Share Link
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors font-medium">
                        <Settings2 size={18} />
                        Event Settings
                    </button>
                    <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-6 py-2.5 rounded-xl font-bold transition-all shadow-lg shadow-primary-600/20 active:scale-95">
                        <Upload size={18} strokeWidth={3} />
                        Upload Photos
                    </button>
                </div>
            </div>

            <div className="flex items-center justify-between">
                <div className="flex gap-4 text-sm font-medium">
                    <button className="text-primary-600 border-b-2 border-primary-600 pb-1">All Photos ({MOCK_PHOTOS.length})</button>
                    <button className="text-slate-500 hover:text-slate-700 pb-1">Selected ({selectedPhotos.length})</button>
                </div>
                {selectedPhotos.length > 0 && (
                    <div className="flex items-center gap-2 px-4 py-2 bg-rose-50 dark:bg-rose-900/20 text-rose-600 rounded-lg animate-in fade-in slide-in-from-right-4">
                        <Trash2 size={16} />
                        <span className="text-sm font-bold">Delete {selectedPhotos.length} photos</span>
                        <button onClick={() => setSelectedPhotos([])} className="ml-2 hover:bg-rose-100 p-0.5 rounded italic">cancel</button>
                    </div>
                )}
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-4">
                {MOCK_PHOTOS.map((photo) => (
                    <div
                        key={photo.id}
                        className={cn(
                            "group relative aspect-[3/4] rounded-2xl overflow-hidden cursor-pointer ring-offset-2 transition-all",
                            selectedPhotos.includes(photo.id) ? "ring-4 ring-primary-500" : "hover:ring-2 hover:ring-slate-300"
                        )}
                        onClick={() => toggleSelect(photo.id)}
                    >
                        <img
                            src={photo.thumbnail}
                            alt={photo.name}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity p-4 flex flex-col justify-end">
                            <div className="flex justify-between items-center text-white">
                                <span className="text-xs truncate max-w-[100px]">{photo.name}</span>
                                <div className="flex gap-2">
                                    <button className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/40"><Maximize2 size={14} /></button>
                                    <button className="p-1.5 bg-white/20 backdrop-blur-md rounded-lg hover:bg-white/40"><Download size={14} /></button>
                                </div>
                            </div>
                        </div>
                        {selectedPhotos.includes(photo.id) && (
                            <div className="absolute top-3 right-3 w-6 h-6 bg-primary-600 text-white rounded-full flex items-center justify-center animate-in zoom-in">
                                <CheckCircle2 size={16} strokeWidth={3} />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};


export default EventPhotos;
