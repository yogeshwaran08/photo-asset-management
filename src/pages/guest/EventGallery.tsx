import { useState, type MouseEvent } from 'react';
import {
    Download,
    Share2,
    Heart,
    Camera,
    ChevronLeft,
    X,
    Maximize2,
    DownloadCloud
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOCK_PHOTOS } from '../../utils/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
    pageVariants,
    listItemVariants,
    staggerContainer,
    buttonVariants
} from '@/lib/motion-config';

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
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="min-h-screen bg-white text-foreground selection:bg-primary-500/30 pb-20"
        >
            {/* Nav Header */}
            <header className="fixed top-0 inset-x-0 h-16 glass z-50 border-b border-border/50 flex items-center justify-between px-8">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-foreground">
                        <Camera size={18} strokeWidth={3} />
                    </div>
                    <span className="font-black uppercase tracking-tighter text-sm">SnapVault</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="hidden sm:block text-[10px] font-black uppercase text-muted-foreground tracking-widest bg-muted/50 px-3 py-1 rounded-full">PRIVATE COLLECTION</span>
                    <Button variant="outline" size="sm" className="rounded-xl font-black uppercase text-[10px] tracking-widest border-border/50 h-9">
                        SHARE CALL
                    </Button>
                </div>
            </header>

            {/* Hero Section */}
            <div className="relative h-[55vh] overflow-hidden pt-16">
                <img
                    src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=2000"
                    alt="Hero"
                    className="w-full h-full object-cover opacity-80 scale-105"
                />
                <div className="absolute inset-0 bg-white/40 backdrop-blur-[2px]" />
                <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent" />

                <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center pt-24">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        className="space-y-4"
                    >
                        <Badge className="bg-primary-500 text-foreground font-black uppercase tracking-widest text-[10px] px-6 py-2 rounded-full border-none shadow-xl shadow-primary-500/20">
                            SPECIAL OCCASION
                        </Badge>
                        <h1 className="text-5xl md:text-7xl font-black tracking-tight uppercase text-foreground">
                            Sarah & James
                        </h1>
                        <div className="flex items-center justify-center gap-3">
                            <div className="h-px w-8 bg-foreground/20" />
                            <p className="text-sm font-black uppercase text-muted-foreground tracking-[0.3em]">
                                JUNE 15, 2024 • CENTRAL PARK
                            </p>
                            <div className="h-px w-8 bg-foreground/20" />
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Gallery Section */}
            <div className="max-w-[1400px] mx-auto px-6 mt-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 mb-16 border-b border-border/50 pb-12">
                    <div>
                        <h2 className="text-3xl font-black uppercase tracking-tight mb-2">Moments Captured</h2>
                        <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest opacity-70">A luxury visual collection by <span className="text-foreground">LUMINARY STUDIOS</span></p>
                    </div>
                    <div className="flex gap-4">
                        <Button variant="outline" className="rounded-2xl font-black uppercase text-[10px] tracking-widest border-border/50 h-12 px-8 glass flex gap-2">
                            <DownloadCloud size={16} />
                            COLLECTION .ZIP
                        </Button>
                        <Button className="rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-black uppercase text-[10px] tracking-widest h-12 px-8 flex gap-2">
                            <Share2 size={16} />
                            DISTRIBUTE
                        </Button>
                    </div>
                </div>

                <motion.div
                    variants={staggerContainer}
                    className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-6"
                >
                    {MOCK_PHOTOS.map((photo) => (
                        <motion.div
                            key={photo.id}
                            variants={listItemVariants}
                            whileHover={{ y: -4 }}
                            className="relative group rounded-[2rem] overflow-hidden break-inside-avoid border border-border/50 shadow-sm hover:shadow-2xl transition-all cursor-zoom-in"
                            onClick={() => setActivePhoto(photo)}
                        >
                            <img
                                src={photo.url}
                                alt={photo.name}
                                className="w-full h-auto object-cover"
                                loading="lazy"
                            />
                            <div className="absolute inset-0 bg-white/30 backdrop-blur-[4px] opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-6">
                                <div className="flex justify-between items-center">
                                    <button
                                        onClick={(e) => toggleLike(photo.id, e)}
                                        className={cn(
                                            "w-12 h-12 rounded-2xl backdrop-blur-md flex items-center justify-center transition-all",
                                            likes.includes(photo.id) ? "bg-error text-white" : "bg-white/80 text-foreground hover:bg-white"
                                        )}
                                    >
                                        <Heart size={20} fill={likes.includes(photo.id) ? "currentColor" : "none"} strokeWidth={likes.includes(photo.id) ? 0 : 2} />
                                    </button>
                                    <div className="flex gap-2">
                                        <button className="w-12 h-12 bg-white/80 backdrop-blur-md rounded-2xl text-foreground flex items-center justify-center hover:bg-white">
                                            <Download size={20} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>

            {/* Lightbox */}
            <AnimatePresence>
                {activePhoto && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-white/95 backdrop-blur-2xl flex flex-col"
                    >
                        <div className="flex items-center justify-between p-8 border-b border-border/50">
                            <div className="flex flex-col">
                                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{activePhoto.name}</span>
                                <span className="text-xs font-black uppercase text-foreground tracking-tight">SHOT ON LEICA M11</span>
                            </div>
                            <div className="flex gap-4">
                                <Button variant="outline" className="rounded-xl h-10 px-4 font-black uppercase text-[10px] tracking-widest border-border/50 glass">
                                    <Download size={18} className="mr-2" />
                                    ORIGINAL
                                </Button>
                                <Button
                                    variant="ghost"
                                    onClick={() => setActivePhoto(null)}
                                    className="w-10 h-10 rounded-xl p-0"
                                >
                                    <X size={24} />
                                </Button>
                            </div>
                        </div>

                        <div className="flex-1 flex items-center justify-center p-8 relative">
                            <motion.img
                                layoutId={`photo-${activePhoto.id}`}
                                src={activePhoto.url}
                                alt={activePhoto.name}
                                className="max-w-full max-h-full object-contain rounded-3xl shadow-2xl border border-border/50"
                            />
                            <button className="absolute left-8 w-14 h-14 bg-white/50 hover:bg-white rounded-full flex items-center justify-center border border-border/50 shadow-sm transition-all hidden md:flex">
                                <ChevronLeft size={32} strokeWidth={1} />
                            </button>
                            <button className="absolute right-8 w-14 h-14 bg-white/50 hover:bg-white rounded-full flex items-center justify-center border border-border/50 shadow-sm transition-all rotate-180 hidden md:flex">
                                <ChevronLeft size={32} strokeWidth={1} />
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <footer className="py-24 text-center border-t border-border/50 mt-24">
                <div className="flex items-center justify-center gap-2 mb-4">
                    <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-foreground">
                        <Camera size={18} strokeWidth={3} />
                    </div>
                    <span className="font-black uppercase tracking-tighter text-sm">SnapVault</span>
                </div>
                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest opacity-60">
                    A SYNCED DIGITAL EXPERIENCE BY <span className="text-foreground">LUMINARY STUDIOS</span>
                </p>
            </footer>
        </motion.div>
    );
};

export default GuestEventGallery;
