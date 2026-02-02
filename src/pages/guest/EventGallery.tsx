import { useState, type MouseEvent } from 'react';
import {
    Download,
    Share2,
    Heart,
    Camera,
    ChevronLeft,
    X
} from 'lucide-react';
import { MOCK_PHOTOS } from '../../utils/mockData';
import { cn } from '../../utils/cn';

const GuestEventGallery = () => {
    const [activePhoto, setActivePhoto] = useState<any>(null);
    const [likes, setLikes] = useState<string[]>([]);

    const toggleLike = (id: string, e: MouseEvent) => {
        e.stopPropagation();
        setLikes(prev =>
            prev.includes(id) ? prev.filter(p => p !== id) : [...prev, id]
        );
    };

    return (
        <div className="min-h-screen bg-background text-foreground selection:bg-primary-500/30">
            {/* Hero Section */}
            <div className="relative h-[60vh] overflow-hidden">
                <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000"
                    alt="Hero"
                    className="w-full h-full object-cover opacity-60 scale-105 animate-slow-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                    <div className="w-16 h-16 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center mb-6 border border-white/20 animate-bounce-subtle">
                        <Camera size={32} />
                    </div>
                    <h1 className="text-4xl md:text-6xl font-serif font-bold mb-4 tracking-tight drop-shadow-2xl">
                        Sarah & James
                    </h1>
                    <p className="text-lg md:text-xl text-muted-foreground font-medium tracking-widest uppercase">
                        June 15, 2024 • Central Park, NY
                    </p>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="max-w-[1400px] mx-auto px-6 py-20">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16">
                    <div>
                        <h2 className="text-3xl font-bold mb-2">Our Moments</h2>
                        <p className="text-muted-foreground">Capturing the beauty of our special day</p>
                    </div>
                    <div className="flex gap-4">
                        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 transition-all">
                            <Download size={18} />
                            Download All
                        </button>
                        <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-accent-500 hover:bg-accent-600 transition-all font-bold text-white">
                            <Share2 size={18} />
                            Share
                        </button>
                    </div>
                </div>

                <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6">
                    {MOCK_PHOTOS.map((photo) => (
                        <div
                            key={photo.id}
                            className="relative group rounded-2xl overflow-hidden break-inside-avoid shadow-2xl transition-all hover:scale-[1.02] cursor-zoom-in"
                            onClick={() => setActivePhoto(photo)}
                        >
                            <img
                                src={photo.url}
                                alt={photo.name}
                                className="w-full h-auto object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={(e) => toggleLike(photo.id, e)}
                                        className={cn(
                                            "p-2 rounded-full backdrop-blur-md transition-all",
                                            likes.includes(photo.id) ? "bg-rose-500 text-white" : "bg-white/10 text-white hover:bg-white/20"
                                        )}
                                    >
                                        <Heart size={20} fill={likes.includes(photo.id) ? "currentColor" : "none"} />
                                    </button>
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-white/10 backdrop-blur-md rounded-full text-white hover:bg-white/20">
                                            <Download size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Lightbox */}
            {activePhoto && (
                <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex flex-col animate-in fade-in duration-300">
                    <div className="flex items-center justify-between p-6">
                        <span className="text-muted-foreground font-medium">{activePhoto.name}</span>
                        <div className="flex gap-4">
                            <button className="p-2 text-white/70 hover:text-white transition-colors">
                                <Download size={24} />
                            </button>
                            <button
                                onClick={() => setActivePhoto(null)}
                                className="p-2 text-white/70 hover:text-white transition-colors bg-white/10 rounded-full"
                            >
                                <X size={24} />
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex items-center justify-center p-4 relative">
                        <img
                            src={activePhoto.url}
                            alt={activePhoto.name}
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl animate-in zoom-in-95 duration-300"
                        />
                        <button className="absolute left-4 p-4 text-white/50 hover:text-white transition-colors">
                            <ChevronLeft size={48} strokeWidth={1} />
                        </button>
                        <button className="absolute right-4 p-4 text-white/50 hover:text-white transition-colors rotate-180">
                            <ChevronLeft size={48} strokeWidth={1} />
                        </button>
                    </div>
                </div>
            )}

            <footer className="py-20 text-center border-t border-white/5 mt-20">
                <div className="flex items-center justify-center gap-2 mb-4 text-muted-foreground">
                    <Camera size={20} />
                    <span className="font-bold tracking-tighter">SnapVault</span>
                </div>
                <p className="text-muted-foreground/60 text-sm italic">Captured with love by Luminary Studios</p>
            </footer>

            <style>{`
        @keyframes slow-zoom {
          from { transform: scale(1.05); }
          to { transform: scale(1.15); }
        }
        .animate-slow-zoom {
          animation: slow-zoom 20s infinite alternate ease-in-out;
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .animate-bounce-subtle {
          animation: bounce-subtle 3s infinite ease-in-out;
        }
      `}</style>
        </div>
    );
};

export default GuestEventGallery;
