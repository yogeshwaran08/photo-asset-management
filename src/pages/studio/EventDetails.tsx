import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    ArrowLeft,
    Search,
    Filter,
    Upload,
    Download,
    Palette,
    BarChart2,
    Settings,
    Image as ImageIcon,
    Loader2,
    LayoutGrid,
    Grid3x3,
    List as ListIcon,
    LayoutTemplate,
    Monitor,
    Smartphone,
    Pen,
    Plus,
    Folder,
    FileText,
    Star,
    Sparkles,
    ChevronDown
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { eventService, type Photo } from '@/services/eventService';
import { toast } from 'sonner';

const EventDetails = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('photos');
    const [viewMode, setViewMode] = useState<'cards' | 'gallery' | 'list'>('gallery');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (eventId) {
            fetchPhotos();
        }
    }, [eventId]);

    const fetchPhotos = async () => {
        try {
            setLoading(true);
            const data = await eventService.getPhotos(Number(eventId));
            setImages(data);
        } catch (error) {
            console.error('Failed to fetch photos:', error);
            toast.error("Failed to load gallery images");
        } finally {
            setLoading(false);
        }
    };

    const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = Array.from(e.target.files || []);
        if (files.length === 0) return;

        setUploading(true);
        const uploadPromises = files.map(async (file) => {
            return new Promise<void>((resolve, reject) => {
                const reader = new FileReader();
                reader.onload = async () => {
                    try {
                        const base64String = reader.result as string;
                        await eventService.uploadPhoto(Number(eventId), {
                            title: file.name,
                            url: base64String,
                            event_id: Number(eventId)
                        });
                        resolve();
                    } catch (err) {
                        reject(err);
                    }
                };
                reader.onerror = () => reject(new Error("File reading failed"));
                reader.readAsDataURL(file);
            });
        });

        try {
            await Promise.all(uploadPromises);
            toast.success("Batch uploaded successfully");
            fetchPhotos();
        } catch (error) {
            console.error('Upload failed:', error);
            toast.error("One or more uploads failed");
        } finally {
            setUploading(false);
            if (fileInputRef.current) fileInputRef.current.value = '';
        }
    };

    const triggerUpload = () => fileInputRef.current?.click();

    const filteredImages = images.filter(img =>
        img.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-full w-full bg-[#fcfcfc] dark:bg-zinc-950 overflow-hidden font-sans">
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple accept="image/*" className="hidden" />

            {/* SECOND SIDEBAR joining the main sidebar */}
            <aside className="w-[68px] bg-white border-r border-border/10 flex flex-col items-center py-6 gap-4 z-40 shrink-0 shadow-sm">

                {/* 1. Gallery Icon "Photos" */}
                <button
                    onClick={() => setActiveTab('photos')}
                    className={cn("w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative", activeTab === 'photos' ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" : "text-muted-foreground hover:bg-zinc-100")}
                    title="Photos"
                >
                    <ImageIcon size={20} strokeWidth={2.5} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Photos</span>
                    {activeTab === 'photos' && <motion.div layoutId="active-indicator" className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full" />}
                </button>

                {/* 2. Design Icon "Design" */}
                <button
                    onClick={() => setActiveTab('design')}
                    className={cn("w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative", activeTab === 'design' ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" : "text-muted-foreground hover:bg-zinc-100")}
                    title="Design"
                >
                    <Palette size={20} strokeWidth={2.5} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Design</span>
                    {activeTab === 'design' && <motion.div layoutId="active-indicator" className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full" />}
                </button>

                {/* 3. Analytics Icon "Analytics" */}
                <button
                    onClick={() => setActiveTab('analytics')}
                    className={cn("w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative", activeTab === 'analytics' ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" : "text-muted-foreground hover:bg-zinc-100")}
                    title="Analytics"
                >
                    <BarChart2 size={20} strokeWidth={2.5} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Stats</span>
                    {activeTab === 'analytics' && <motion.div layoutId="active-indicator" className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full" />}
                </button>

                {/* 4. Settings Icon "Settings" */}
                <button
                    onClick={() => setActiveTab('settings')}
                    className={cn("w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative", activeTab === 'settings' ? "bg-zinc-800 text-white shadow-lg shadow-zinc-800/30" : "text-muted-foreground hover:bg-zinc-100")}
                    title="Settings"
                >
                    <Settings size={20} strokeWidth={2.5} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Config</span>
                    {activeTab === 'settings' && <motion.div layoutId="active-indicator" className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-1 h-6 bg-zinc-800 rounded-r-full" />}
                </button>
            </aside>

            {/* PHOTOS CONTEXT SIDEBAR */}
            {activeTab === 'photos' && (
                <div className="w-[260px] bg-white border-r border-border/10 flex flex-col z-30 shrink-0 h-full">

                    <div className="flex-1 overflow-y-auto p-5 space-y-6 scrollbar-hide pt-8 relative">
                        {/* Device Toggles (Absolute Top Center) */}
                        <div className="absolute top-2 left-0 right-0 flex items-center justify-center gap-2 z-10">
                            <button className="w-8 h-8 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-md transition-transform active:scale-95">
                                <Monitor size={14} />
                            </button>
                            <button className="w-8 h-8 rounded-full bg-white border border-border flex items-center justify-center text-muted-foreground hover:bg-zinc-50 transition-colors shadow-sm">
                                <Smartphone size={14} />
                            </button>
                        </div>

                        {/* Cover Image */}
                        <div className="space-y-3 pt-2">
                            <div className="aspect-[4/3] rounded-[1.5rem] bg-zinc-200/50 relative group overflow-hidden flex flex-col items-center justify-center text-center">
                                <ImageIcon size={32} className="text-zinc-300 mb-2" />

                                {/* Change Cover Button (Dark Pill Overlay) */}
                                <button className="absolute bottom-4 bg-slate-800 text-white text-[9px] font-bold py-1.5 px-4 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-all">
                                    Change Cover Image <Pen size={8} />
                                </button>
                            </div>
                        </div>

                        {/* Stats Row */}
                        <div className="flex items-center divide-x divide-border/40">
                            <div className="flex-1 text-center px-2">
                                <div className="text-2xl font-black text-slate-800 tracking-tight">{images.length.toString().padStart(2, '0')}</div>
                                <div className="text-[8px] font-black uppercase text-muted-foreground tracking-widest mt-0.5">Photos</div>
                            </div>
                            <div className="flex-1 text-center px-2">
                                <div className="text-2xl font-black text-slate-800 tracking-tight">00</div>
                                <div className="text-[8px] font-black uppercase text-muted-foreground tracking-widest mt-0.5">Videos</div>
                            </div>
                        </div>

                        <div className="w-full h-px bg-border/40" />

                        {/* Collections Actions */}
                        <div className="space-y-4">
                            <Button variant="outline" className="w-full rounded-2xl h-11 border-slate-200 hover:border-slate-800 hover:bg-slate-800 hover:text-white transition-all group font-black uppercase text-[10px] tracking-widest gap-2" >
                                <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                                Add Collection
                            </Button>

                            <div className="space-y-1">
                                <div className="flex items-center justify-between px-1 py-2 cursor-pointer hover:bg-zinc-50 rounded-lg group">
                                    <div className="flex items-center gap-2">
                                        <Folder size={14} className="text-muted-foreground group-hover:text-slate-800" />
                                        <span className="text-xs font-bold text-slate-700 group-hover:text-slate-900">Collections</span>
                                    </div>
                                    <ChevronDown size={14} className="text-muted-foreground" />
                                </div>

                                <div className="pl-2 space-y-1">
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl bg-orange-50/50 text-orange-600 border-l-2 border-orange-500">
                                        <FileText size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-wider">All Assets</span>
                                    </button>
                                    <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-zinc-50 transition-colors">
                                        <Star size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-wider">Highlights</span>
                                    </button>
                                    <button className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-muted-foreground hover:bg-zinc-50 transition-colors group">
                                        <div className="flex items-center gap-3">
                                            <Sparkles size={14} />
                                            <span className="text-[10px] font-black uppercase tracking-wider">Stories</span>
                                        </div>
                                        <span className="bg-emerald-500 text-white text-[7px] font-black px-1.5 py-0.5 rounded-md uppercase tracking-wider">New</span>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col min-w-0 bg-white/20 relative">
                <header className="h-24 border-b border-border/40 flex items-center justify-between px-12 bg-white/40 backdrop-blur-md sticky top-0 z-30 gap-6">
                    <div className="flex items-center gap-6 flex-1">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/studio/events')} className="h-10 w-10 rounded-xl -ml-2 text-muted-foreground hover:text-foreground shrink-0">
                            <ArrowLeft size={20} />
                        </Button>
                        <div className="h-8 w-px bg-border/40 mx-2 shrink-0" />
                        <div className="relative group flex-1">
                            <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                            <Input placeholder="SEARCH WORKSPACE..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-14 h-14 w-full rounded-[1.75rem] bg-white/60 border-transparent focus:border-border/30 transition-all text-[10px] font-black uppercase tracking-[0.2em] shadow-sm hover:shadow-lg focus:bg-white border border-border/10 shadow-inner" />
                        </div>
                    </div>
                    <div className="flex items-center gap-4 shrink-0">
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="icon" className="h-14 w-14 rounded-2xl border-border/50 hover:bg-white transition-all shadow-sm border border-border/10 bg-white/50">
                                    {viewMode === 'cards' && <LayoutTemplate size={20} />}
                                    {viewMode === 'gallery' && <Grid3x3 size={20} />}
                                    {viewMode === 'list' && <ListIcon size={20} />}
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-40 rounded-2xl glass p-1.5">
                                <DropdownMenuItem onClick={() => setViewMode('cards')} className={cn("rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 p-2.5 cursor-pointer focus:bg-primary-500/10", viewMode === 'cards' && "bg-secondary")}>
                                    <LayoutTemplate size={14} /> Cards
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setViewMode('gallery')} className={cn("rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 p-2.5 cursor-pointer focus:bg-primary-500/10", viewMode === 'gallery' && "bg-secondary")}>
                                    <Grid3x3 size={14} /> Gallery
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setViewMode('list')} className={cn("rounded-xl text-[10px] font-black uppercase tracking-widest gap-2 p-2.5 cursor-pointer focus:bg-primary-500/10", viewMode === 'list' && "bg-secondary")}>
                                    <ListIcon size={14} /> List
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                        <Button variant="outline" className="h-14 px-8 rounded-2xl gap-3 text-[10px] font-black uppercase tracking-widest border-border/50 hover:bg-white transition-all shadow-sm border border-border/10 bg-white/50"><Filter size={16} /> Filter</Button>
                        <Button variant="outline" className="h-14 px-8 rounded-2xl gap-3 text-[10px] font-black uppercase tracking-widest border-border/50 hover:bg-white transition-all shadow-sm border border-border/10 bg-white/50"><Download size={16} /> Download</Button>
                        <Button className="h-14 px-10 rounded-2xl gap-3 text-[10px] font-black uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 shadow-2xl shadow-foreground/20 active:scale-95 transition-all" onClick={triggerUpload}>
                            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} strokeWidth={3} />}
                            Upload Media
                        </Button>
                    </div>
                </header>

                <div className="flex-1 p-12 overflow-y-auto w-full scrollbar-hide">
                    {activeTab === 'photos' ? (
                        <>
                            {loading ? (
                                <div className="h-full flex flex-col items-center justify-center opacity-10">
                                    <Loader2 size={48} className="animate-spin text-primary-500 mb-6" />
                                    <p className="font-black uppercase text-[10px] tracking-[0.8em]">Synchronizing Assets...</p>
                                </div>
                            ) : filteredImages.length > 0 ? (
                                <>
                                    {viewMode === 'gallery' && (
                                        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-0.5">
                                            <AnimatePresence>
                                                {filteredImages.map((image) => (
                                                    <motion.div
                                                        key={image.id}
                                                        initial={{ opacity: 0 }}
                                                        animate={{ opacity: 1 }}
                                                        className="aspect-square relative group overflow-hidden bg-zinc-100"
                                                    >
                                                        <img
                                                            src={image.url}
                                                            alt={image.title}
                                                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                                                        />
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    )}

                                    {viewMode === 'cards' && (
                                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
                                            <AnimatePresence>
                                                {filteredImages.map((image) => (
                                                    <motion.div key={image.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="aspect-square rounded-[2.5rem] bg-white border border-border/10 overflow-hidden relative group shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-700">
                                                        <img src={image.url} alt={image.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                                                        <div className="absolute inset-x-2 bottom-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                                                            <div className="bg-white/80 backdrop-blur-xl p-3 border border-white/50 rounded-[1.75rem] flex items-center justify-between shadow-2xl">
                                                                <div className="truncate pr-4 flex flex-col">
                                                                    <span className="text-[9px] font-black uppercase truncate leading-tight">{image.title}</span>
                                                                    <span className="text-[7px] font-black text-muted-foreground opacity-50 uppercase mt-0.5 tracking-tighter">Media Asset • 2.4MB</span>
                                                                </div>
                                                                <Button size="icon" variant="ghost" className="h-8 w-8 rounded-xl bg-black text-white hover:bg-black/80"><Download size={14} /></Button>
                                                            </div>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    )}

                                    {viewMode === 'list' && (
                                        <div className="flex flex-col gap-2">
                                            <AnimatePresence>
                                                {filteredImages.map((image) => (
                                                    <motion.div key={image.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-6 p-2 pr-6 rounded-[1.5rem] bg-white border border-border/10 group hover:shadow-lg transition-all">
                                                        <div className="h-16 w-16 rounded-2xl overflow-hidden bg-zinc-100 shrink-0">
                                                            <img src={image.url} alt={image.title} className="w-full h-full object-cover" />
                                                        </div>
                                                        <div className="flex flex-col flex-1 min-w-0">
                                                            <span className="text-xs font-black uppercase tracking-wide truncate">{image.title}</span>
                                                            <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider opacity-60">ID: {image.id} • Added just now</span>
                                                        </div>
                                                        <div className="flex items-center gap-4">
                                                            <div className="text-[9px] font-bold uppercase py-1 px-3 bg-zinc-100 rounded-lg text-muted-foreground">JPG</div>
                                                            <div className="text-[9px] font-bold uppercase py-1 px-3 bg-zinc-100 rounded-lg text-muted-foreground">2.4 MB</div>
                                                            <Button size="icon" variant="ghost" className="h-9 w-9 rounded-xl hover:bg-zinc-100 ml-2"><Download size={16} /></Button>
                                                        </div>
                                                    </motion.div>
                                                ))}
                                            </AnimatePresence>
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-center pb-20">
                                    <div className="w-44 h-44 bg-white rounded-[4rem] shadow-[0_40px_100px_rgba(0,0,0,0.05)] border border-border/10 flex items-center justify-center mb-12 relative group overflow-hidden">
                                        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                                        <ImageIcon size={64} className="text-zinc-100 relative z-10 scale-110 group-hover:text-primary-500/10 transition-all duration-500" />
                                    </div>
                                    <h3 className="text-4xl font-black uppercase tracking-tight mb-4 text-foreground">Workspace Vacuum</h3>
                                    <p className="text-muted-foreground font-black mb-12 max-w-sm text-[11px] uppercase tracking-[0.4em] opacity-30 leading-relaxed italic">The gallery is awaiting ingestion.</p>
                                    <Button onClick={triggerUpload} className="h-16 px-14 rounded-[1.75rem] gap-4 text-[11px] font-black uppercase tracking-[0.3em] bg-foreground text-background hover:bg-foreground/90 shadow-2xl shadow-foreground/20 hover:scale-105 active:scale-95 transition-all uppercase">Ingest Media</Button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className="h-full flex flex-col items-center justify-center opacity-40">
                            <div className="w-24 h-24 rounded-3xl bg-white border border-border/10 flex items-center justify-center mb-6 shadow-sm">
                                {activeTab === 'design' && <Palette size={32} className="text-primary-500" />}
                                {activeTab === 'analytics' && <BarChart2 size={32} className="text-primary-500" />}
                                {activeTab === 'settings' && <Settings size={32} className="text-zinc-800" />}
                            </div>
                            <p className="text-[10px] font-black uppercase tracking-[0.4em]">Active Module: {activeTab}</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
};

export default EventDetails;
