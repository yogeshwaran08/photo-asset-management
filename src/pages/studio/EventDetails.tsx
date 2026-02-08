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
    ChevronDown,
    Info,
    MessageCircle,
    Shield,
    Lock,
    Eye,
    Users,
    UserCheck,
    ServerCrash,
    TrendingUp,
    MousePointerClick,
    Share2
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
import { eventService, type Photo, type Event as EventType } from '@/services/eventService';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { toast } from 'sonner';

const MOCK_ACTIVITY_DATA = [
    { name: 'Mon', views: 4000, downloads: 2400 },
    { name: 'Tue', views: 3000, downloads: 1398 },
    { name: 'Wed', views: 2000, downloads: 9800 },
    { name: 'Thu', views: 2780, downloads: 3908 },
    { name: 'Fri', views: 1890, downloads: 4800 },
    { name: 'Sat', views: 2390, downloads: 3800 },
    { name: 'Sun', views: 3490, downloads: 4300 },
];

const MOCK_DEVICE_DATA = [
    { name: 'Mobile', value: 400, color: '#f97316' }, // Orange 500
    { name: 'Desktop', value: 300, color: '#3b82f6' }, // Blue 500
    { name: 'Tablet', value: 300, color: '#10b981' }, // Emerald 500
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl border border-border/50 shadow-xl">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                        <p className="text-[10px] font-bold text-zinc-700">
                            {entry.name}: <span className="font-black">{entry.value.toLocaleString()}</span>
                        </p>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const EventDetails = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<Photo[]>([]);
    const [eventSettings, setEventSettings] = useState<EventType | null>(null);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [activeTab, setActiveTab] = useState('photos');
    const [settingsTab, setSettingsTab] = useState('general');
    const [downloadTab, setDownloadTab] = useState('All');
    const [analyticsPeriod, setAnalyticsPeriod] = useState('7d');
    const [viewMode, setViewMode] = useState<'cards' | 'gallery' | 'list'>('gallery');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        if (eventId) {
            fetchPhotos();
            fetchEventDetails();
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

    const fetchEventDetails = async () => {
        if (!eventId) return;
        try {
            const data = await eventService.getById(Number(eventId));
            setEventSettings(data);
        } catch (error) {
            console.error('Failed to fetch event details:', error);
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
                    <span className="text-[8px] font-black uppercase tracking-wider">Analytics</span>
                    {activeTab === 'analytics' && <motion.div layoutId="active-indicator" className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full" />}
                </button>

                {/* 4. Settings Icon "Settings" */}
                <button
                    onClick={() => setActiveTab('settings')}
                    className={cn("w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative", activeTab === 'settings' ? "bg-zinc-800 text-white shadow-lg shadow-zinc-800/30" : "text-muted-foreground hover:bg-zinc-100")}
                    title="Settings"
                >
                    <Settings size={20} strokeWidth={2.5} />
                    <span className="text-[8px] font-black uppercase tracking-wider">settings</span>
                    {activeTab === 'settings' && <motion.div layoutId="active-indicator" className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-1 h-6 bg-zinc-800 rounded-r-full" />}
                </button>
            </aside>



            {/* SETTINGS CONTEXT SIDEBAR */}


            {/* MAIN CONTENT AREA */}
            <main className="flex-1 flex flex-col min-w-0 bg-white/20 relative">
                <header className="h-24 border-b border-border/40 flex items-center justify-between px-12 bg-white/40 backdrop-blur-md sticky top-0 z-30 gap-6">
                    <div className="flex items-center gap-6 flex-1">
                        <Button variant="ghost" size="icon" onClick={() => navigate('/studio/events')} className="h-10 w-10 rounded-xl -ml-2 text-muted-foreground hover:text-foreground shrink-0">
                            <ArrowLeft size={20} />
                        </Button>
                        <div className="h-8 w-px bg-border/40 mx-2 shrink-0" />
                        {!['analytics', 'settings', 'design'].includes(activeTab) && (
                            <div className="relative group flex-1">
                                <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground" size={16} />
                                <Input placeholder="SEARCH WORKSPACE..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-14 h-14 w-full rounded-[1.75rem] bg-white/60 border-transparent focus:border-border/30 transition-all text-[9px] font-black uppercase tracking-[0.2em] shadow-sm hover:shadow-lg focus:bg-white border border-border/10 shadow-inner" />
                            </div>
                        )}
                        {activeTab === 'photos' && (
                            <div className="hidden" />
                        )}
                        {activeTab === 'analytics' && (
                            <div className="space-y-1">
                                <h2 className="text-xl font-black text-zinc-800 tracking-tight">Analytics Overview</h2>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Event Performance & Engagement</p>
                            </div>
                        )}
                        {activeTab === 'settings' && (
                            <div className="space-y-1">
                                <h2 className="text-xl font-black text-zinc-800 tracking-tight">Event Settings</h2>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Manage event settings</p>
                            </div>
                        )}
                        {activeTab === 'design' && (
                            <div className="space-y-1">
                                <h2 className="text-xl font-black text-zinc-800 tracking-tight">Design Studio</h2>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Customize gallery appearance</p>
                            </div>
                        )}
                    </div>

                    {!['analytics', 'settings', 'design'].includes(activeTab) && (
                        <div className="flex items-center gap-4 shrink-0">
                            <Button variant="outline" className="h-14 px-8 rounded-2xl gap-3 text-[9px] font-black uppercase tracking-widest border-border/50 hover:bg-white transition-all shadow-sm border border-border/10 bg-white/50"><Filter size={16} /> Filter</Button>
                            <Button variant="outline" className="h-14 px-8 rounded-2xl gap-3 text-[9px] font-black uppercase tracking-widest border-border/50 hover:bg-white transition-all shadow-sm border border-border/10 bg-white/50"><Download size={16} /> Download</Button>
                            <Button className="h-14 px-10 rounded-2xl gap-3 text-[9px] font-black uppercase tracking-widest bg-foreground text-background hover:bg-foreground/90 shadow-2xl shadow-foreground/20 active:scale-95 transition-all" onClick={triggerUpload}>
                                {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} strokeWidth={3} />}
                                Upload Media
                            </Button>
                        </div>
                    )}
                    {activeTab === 'analytics' && (
                        <div className="flex bg-white/50 p-1 rounded-xl border border-border/40 shadow-sm backdrop-blur-sm">
                            {['7d', '30d', '90d'].map((period) => (
                                <button
                                    key={period}
                                    onClick={() => setAnalyticsPeriod(period)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                                        analyticsPeriod === period ? "bg-zinc-800 text-white shadow-md" : "text-muted-foreground hover:bg-zinc-50/50 hover:text-zinc-900"
                                    )}
                                >
                                    {period}
                                </button>
                            ))}
                        </div>
                    )}
                    {activeTab === 'settings' && (
                        <div className="flex bg-white/50 p-1 rounded-xl border border-border/40 shadow-sm backdrop-blur-sm">
                            {[
                                { id: 'general', label: 'General', icon: Settings },
                                { id: 'privacy', label: 'Privacy', icon: Shield },
                                { id: 'downloads', label: 'Downloads', icon: Download }
                            ].map((tab) => (
                                <button
                                    key={tab.id}
                                    onClick={() => setSettingsTab(tab.id)}
                                    className={cn(
                                        "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2",
                                        settingsTab === tab.id ? "bg-zinc-800 text-white shadow-md" : "text-muted-foreground hover:bg-zinc-50/50 hover:text-zinc-900"
                                    )}
                                >
                                    <tab.icon size={12} />
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    )}
                </header>

                <div className="flex flex-1 h-full overflow-hidden">
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
                        ) : activeTab === 'settings' ? (
                            <div className="w-full max-w-7xl mx-auto space-y-8 pb-24 -mt-6">

                                {/* Settings Content */}
                                <div className="w-full">
                                    <div className="w-full max-w-none space-y-8">
                                        {settingsTab === 'general' && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                                {/* General Info Form */}
                                                <div className="grid grid-cols-2 gap-8">
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Event Name</Label>
                                                        <Input
                                                            defaultValue={eventSettings?.name}
                                                            className="h-12 rounded-xl bg-white border-border/40 font-bold text-xs shadow-sm focus:ring-0 focus:border-zinc-800 transition-all"
                                                        />
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Event Type</Label>
                                                        <Input
                                                            defaultValue={eventSettings?.event_type}
                                                            className="h-12 rounded-xl bg-white border-border/40 font-bold text-xs shadow-sm focus:ring-0 focus:border-zinc-800 transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Event Date</Label>
                                                        <Input
                                                            type="date"
                                                            defaultValue={eventSettings?.start_date?.split('T')[0]} // Assuming ISO string
                                                            className="h-12 rounded-xl bg-white border-border/40 font-bold text-xs shadow-sm focus:ring-0 focus:border-zinc-800 transition-all"
                                                        />
                                                    </div>
                                                    <div className="space-y-3">
                                                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Event Expiry Date</Label>
                                                        <Input
                                                            type="date"
                                                            defaultValue={eventSettings?.end_date?.split('T')[0]}
                                                            className="h-12 rounded-xl bg-white border-border/40 font-bold text-xs shadow-sm focus:ring-0 focus:border-zinc-800 transition-all"
                                                        />
                                                    </div>

                                                    <div className="space-y-3 col-span-2">
                                                        <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Event Description</Label>
                                                        <Textarea
                                                            defaultValue={eventSettings?.description}
                                                            className="min-h-[120px] rounded-2xl bg-white border-border/40 font-medium text-xs shadow-sm resize-none focus:ring-0 focus:border-zinc-800 transition-all p-4"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="h-px w-full bg-border/40" />

                                                {/* Feature Toggles */}
                                                <div className="space-y-12">
                                                    {/* Download Options */}
                                                    <div className="space-y-6">
                                                        <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                            <Download size={16} /> Download Options
                                                        </h3>
                                                        <div className="grid grid-cols-2 gap-8">
                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <Label className="text-[10px] font-bold text-zinc-700">Bulk Download</Label>
                                                                    <Switch />
                                                                </div>
                                                                <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                                    Turn On to allow clients to download all the photos
                                                                </p>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <Label className="text-[10px] font-bold text-zinc-700">Single Download</Label>
                                                                    <Switch />
                                                                </div>
                                                                <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                                    Turn On to allow clients to download individual photos
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="h-px w-full bg-border/40" />

                                                    {/* Client Notification */}
                                                    <div className="space-y-6">
                                                        <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                            <MessageCircle size={16} /> Client Notification
                                                        </h3>
                                                        <div className="grid grid-cols-2 gap-8">
                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-2">
                                                                        <Label className="text-[10px] font-bold text-zinc-700">WhatsApp</Label>
                                                                        <Info size={12} className="text-muted-foreground" />
                                                                    </div>
                                                                    <Switch />
                                                                </div>
                                                                <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                                    Turn On to send WhatsApp Notifications when photos are ready
                                                                    <br />
                                                                    <span className="opacity-70">Make sure you have enough credits to send WhatsApp notifications</span>
                                                                </p>
                                                            </div>
                                                            <div className="space-y-4">
                                                                <div className="flex items-center justify-between">
                                                                    <div className="flex items-center gap-2">
                                                                        <Label className="text-[10px] font-bold text-zinc-700">Email</Label>
                                                                        <Info size={12} className="text-muted-foreground" />
                                                                    </div>
                                                                    <Switch />
                                                                </div>
                                                                <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                                    Turn On to send Email Notifications when photos are ready
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="h-px w-full bg-border/40" />

                                                    {/* Gallery App */}
                                                    <div className="space-y-6">
                                                        <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                            <Smartphone size={16} /> Gallery App
                                                        </h3>
                                                        <div className="space-y-4">
                                                            <div className="flex items-center justify-between">
                                                                <div className="flex items-center gap-2">
                                                                    <Label className="text-[10px] font-bold text-zinc-700">Progressive Web App (PWA)</Label>
                                                                    <Info size={12} className="text-muted-foreground" />
                                                                </div>
                                                                <Switch />
                                                            </div>
                                                            <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                                Turn On to enable Progressive Web App features for this event
                                                            </p>
                                                        </div>
                                                    </div>

                                                    <div className="h-px w-full bg-border/40" />

                                                    {/* Branding & Language */}
                                                    <div className="grid grid-cols-2 gap-12">
                                                        <div className="space-y-6">
                                                            <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                                Branding
                                                            </h3>
                                                            <div className="space-y-3">
                                                                <Button variant="outline" className="h-12 w-full justify-start gap-3 rounded-xl border-dashed border-border hover:bg-zinc-50 hover:border-zinc-300 transition-all text-[10px] font-bold text-muted-foreground hover:text-foreground">
                                                                    <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center">
                                                                        <Folder size={12} />
                                                                    </div>
                                                                    Add branding
                                                                </Button>
                                                                <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                                    Branding will increase your reach to potential clients
                                                                </p>
                                                            </div>
                                                        </div>

                                                        <div className="space-y-6">
                                                            <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                                Gallery Language
                                                            </h3>
                                                            <div className="space-y-3">
                                                                <Select defaultValue="auto">
                                                                    <SelectTrigger className="h-12 rounded-xl border-border/40 bg-white font-bold text-[10px] shadow-sm">
                                                                        <SelectValue placeholder="Select Language" />
                                                                    </SelectTrigger>
                                                                    <SelectContent className="rounded-xl border-border/40">
                                                                        <SelectItem value="auto" className="font-bold text-[10px]">Auto Detect</SelectItem>
                                                                        <SelectItem value="en" className="font-bold text-[10px]">English</SelectItem>
                                                                        <SelectItem value="es" className="font-bold text-[10px]">Spanish</SelectItem>
                                                                        <SelectItem value="fr" className="font-bold text-[10px]">French</SelectItem>
                                                                    </SelectContent>
                                                                </Select>
                                                                <p className="text-[10px] text-transparent select-none">Spacer</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>

                                                {/* Delete Event */}
                                                <div className="flex flex-col items-center pt-16 pb-8">
                                                    <Button variant="destructive" className="bg-red-50 text-red-500 hover:bg-red-100/80 hover:text-red-600 border border-transparent hover:border-red-200 shadow-none font-black uppercase tracking-widest h-14 px-10 rounded-2xl transition-all active:scale-95">
                                                        Delete Event
                                                    </Button>
                                                    <span className="text-[9px] font-bold text-red-400/60 uppercase tracking-wider mt-4">This action cannot be undone</span>
                                                </div>
                                            </motion.div>
                                        )}
                                        {settingsTab === 'privacy' && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                                {/* Guest Selfie Validation */}
                                                <div className="space-y-6">
                                                    <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                        <UserCheck size={16} /> Guest Selfie Validation
                                                    </h3>
                                                    <RadioGroup defaultValue="no-validation" className="grid grid-cols-1 gap-4">
                                                        <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-border/40 hover:border-zinc-300 transition-all cursor-pointer">
                                                            <RadioGroupItem value="no-validation" id="r1" />
                                                            <Label htmlFor="r1" className="flex-1 cursor-pointer">
                                                                <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">No Validation</div>
                                                                <div className="text-[9px] text-muted-foreground mt-0.5 font-medium">Guest just need to click a selfie</div>
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-border/40 hover:border-zinc-300 transition-all cursor-pointer">
                                                            <RadioGroupItem value="liveliness" id="r2" />
                                                            <Label htmlFor="r2" className="flex-1 cursor-pointer">
                                                                <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">Liveliness Validation</div>
                                                                <div className="text-[9px] text-muted-foreground mt-0.5 font-medium">Guest will need to rotate head to verify the liveliness</div>
                                                            </Label>
                                                        </div>
                                                        <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-border/40 hover:border-zinc-300 transition-all cursor-pointer">
                                                            <RadioGroupItem value="face-only" id="r3" />
                                                            <Label htmlFor="r3" className="flex-1 cursor-pointer">
                                                                <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">Face Only</div>
                                                                <div className="text-[9px] text-muted-foreground mt-0.5 font-medium">Guests will get their images by uploading selfie</div>
                                                            </Label>
                                                        </div>
                                                    </RadioGroup>
                                                </div>

                                                <div className="h-px w-full bg-border/40" />

                                                {/* Face Search Form */}
                                                <div className="space-y-6">
                                                    <div className="space-y-1">
                                                        <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                            <Users size={16} /> Face Search Form
                                                        </h3>
                                                        <p className="text-[9px] text-muted-foreground font-medium leading-relaxed ml-6">
                                                            Details to take when using guests use Face Search Feature
                                                        </p>
                                                    </div>

                                                    <div className="space-y-3 bg-white/50 rounded-2xl p-6 border border-border/40">
                                                        {['Name', 'Email Id', 'Mobile Number'].map((item, i) => (
                                                            <div key={item} className="flex items-center justify-between py-2">
                                                                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 w-32">{i + 1}. {item}</span>
                                                                <div className="flex items-center gap-8">
                                                                    <div className="flex items-center gap-2">
                                                                        <Checkbox id={`show-${i}`} className="w-4 h-4 rounded-md" />
                                                                        <Label htmlFor={`show-${i}`} className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground cursor-pointer">Show</Label>
                                                                    </div>
                                                                    <div className="flex items-center gap-2">
                                                                        <Checkbox id={`req-${i}`} className="w-4 h-4 rounded-md" />
                                                                        <Label htmlFor={`req-${i}`} className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground cursor-pointer">Required</Label>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        ))}
                                                    </div>
                                                </div>

                                                <div className="h-px w-full bg-border/40" />

                                                {/* Event Visibility */}
                                                <div className="space-y-6">
                                                    <div className="space-y-1">
                                                        <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                            <Eye size={16} /> Event Visibility
                                                        </h3>
                                                        <p className="text-[9px] text-muted-foreground font-medium leading-relaxed ml-6">
                                                            Public Events will be visible under your public page
                                                        </p>
                                                    </div>

                                                    <div className="space-y-4 bg-white/50 rounded-2xl p-6 border border-border/40">
                                                        <div className="flex items-center justify-between">
                                                            <div className="space-y-0.5">
                                                                <Label className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">Public</Label>
                                                                <p className="text-[9px] text-muted-foreground font-medium">Turn ON to make event public</p>
                                                            </div>
                                                            <Switch />
                                                        </div>

                                                        <div className="flex items-center gap-2 text-orange-500/80 bg-orange-50/50 p-3 rounded-xl">
                                                            <Lock size={12} />
                                                            <span className="text-[9px] font-bold uppercase tracking-wider">You can secure it by enabling PIN</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="h-px w-full bg-border/40" />

                                                {/* Enable PIN & Access Level */}
                                                <div className="space-y-8">
                                                    <div className="space-y-6">
                                                        <div className="flex items-center justify-between">
                                                            <div className="space-y-0.5">
                                                                <div className="flex items-center gap-2">
                                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-800">Enable PIN</Label>
                                                                </div>
                                                                <p className="text-[9px] text-muted-foreground font-medium">Secure the access using PIN</p>
                                                                <p className="text-[9px] text-muted-foreground font-medium opacity-70">Access Level will be decided by PIN</p>
                                                            </div>
                                                            <Switch />
                                                        </div>

                                                        <div className="space-y-4 pt-2">
                                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Default Access Level</Label>
                                                            <RadioGroup defaultValue="guest" className="grid grid-cols-2 gap-4">
                                                                <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-border/40 hover:border-zinc-300 transition-all cursor-pointer">
                                                                    <RadioGroupItem value="guest" id="al-guest" className="mt-0.5" />
                                                                    <Label htmlFor="al-guest" className="flex-1 cursor-pointer">
                                                                        <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">Guest Access</div>
                                                                        <div className="text-[9px] text-muted-foreground mt-1 font-medium leading-relaxed">Own images can be accessed using selfie</div>
                                                                    </Label>
                                                                </div>
                                                                <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-border/40 hover:border-zinc-300 transition-all cursor-pointer">
                                                                    <RadioGroupItem value="full" id="al-full" className="mt-0.5" />
                                                                    <Label htmlFor="al-full" className="flex-1 cursor-pointer">
                                                                        <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">Full Access</div>
                                                                        <div className="text-[9px] text-muted-foreground mt-1 font-medium leading-relaxed">All the images can be accessed.</div>
                                                                    </Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </div>
                                                    </div>

                                                    {/* Privacy PINS */}
                                                    <div className="bg-white/50 rounded-[1.5rem] p-8 border border-border/40 space-y-8">
                                                        <div className="space-y-1">
                                                            <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                                <Shield size={16} /> Privacy
                                                            </h3>
                                                            <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                                How your clients should get notified about their photos
                                                            </p>
                                                        </div>

                                                        <div className="grid grid-cols-2 gap-12">
                                                            <div className="space-y-3">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Guest access PIN</Label>
                                                                <div className="relative">
                                                                    <Input
                                                                        defaultValue="1514"
                                                                        className="h-12 rounded-xl bg-white border-border/40 font-bold text-xs shadow-sm focus:ring-0 focus:border-zinc-800 transition-all tracking-widest"
                                                                        maxLength={4}
                                                                    />
                                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-muted-foreground/30">PIN</div>
                                                                </div>
                                                                <p className="text-[9px] text-muted-foreground font-medium pl-1">* Please provide 4 digit PIN</p>
                                                            </div>

                                                            <div className="space-y-3">
                                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Full access PIN</Label>
                                                                <div className="relative">
                                                                    <Input
                                                                        defaultValue="1206"
                                                                        className="h-12 rounded-xl bg-white border-border/40 font-bold text-xs shadow-sm focus:ring-0 focus:border-zinc-800 transition-all tracking-widest"
                                                                        maxLength={4}
                                                                    />
                                                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-muted-foreground/30">PIN</div>
                                                                </div>
                                                                <div className="space-y-0.5 pl-1">
                                                                    <p className="text-[9px] text-muted-foreground font-medium">* Please provide 4 digit PIN</p>
                                                                    <p className="text-[9px] text-emerald-600/80 font-bold uppercase tracking-wide">* All images can be accessed.</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </motion.div>
                                        )}
                                        {settingsTab === 'downloads' && (
                                            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                                                {/* Download Tabs */}
                                                <div className="flex items-center gap-8 border-b border-border/40 w-full">
                                                    {['All', 'Pending', 'Started', 'Complete', 'Failed'].map((tab) => (
                                                        <button
                                                            key={tab}
                                                            onClick={() => setDownloadTab(tab)}
                                                            className={cn(
                                                                "pb-3 text-[10px] font-black uppercase tracking-widest relative transition-colors",
                                                                downloadTab === tab ? "text-zinc-800" : "text-muted-foreground hover:text-zinc-600"
                                                            )}
                                                        >
                                                            {tab}
                                                            {downloadTab === tab && (
                                                                <motion.div layoutId="download-tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-800 rounded-full" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>

                                                {/* Empty State */}
                                                <div className="min-h-[200px] flex flex-col items-start pt-8">
                                                    <div className="flex items-center gap-3 mb-2 text-zinc-800">
                                                        <ServerCrash size={18} className="text-zinc-400" /> {/* Using ServerCrash as a placeholder for the icon */}
                                                        <h3 className="text-[11px] font-bold text-zinc-700">No download requests found</h3>
                                                    </div>
                                                    <p className="text-[10px] text-muted-foreground font-medium pl-8 opacity-80">You don't have any download requests yet.</p>
                                                </div>
                                            </motion.div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        ) : activeTab === 'analytics' ? (
                            <div className="w-full max-w-7xl mx-auto space-y-8 pb-24 -mt-6">

                                {/* Summary Cards */}
                                <div className="grid grid-cols-4 gap-6">
                                    {[
                                        { title: 'Total Views', value: '24.5k', change: '+12%', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                                        { title: 'Total Downloads', value: '12.1k', change: '+8%', icon: Download, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                                        { title: 'Face Searches', value: '854', change: '+24%', icon: UserCheck, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                                        { title: 'Shares', value: '2.3k', change: '-2%', icon: Share2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                                    ].map((stat, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: i * 0.1 }}
                                            className="bg-white p-5 rounded-[1.5rem] border border-border/40 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-all"
                                        >
                                            <div className="flex justify-between items-start z-10">
                                                <div className={cn("p-2 rounded-xl", stat.bg, stat.color)}>
                                                    <stat.icon size={16} />
                                                </div>
                                                <span className={cn("text-[9px] font-black py-1 px-2 rounded-lg bg-zinc-50", stat.change.startsWith('+') ? "text-emerald-600" : "text-red-500")}>
                                                    {stat.change}
                                                </span>
                                            </div>
                                            <div className="z-10">
                                                <div className="text-2xl font-black text-zinc-900 tracking-tight">{stat.value}</div>
                                                <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-1">{stat.title}</div>
                                            </div>
                                            <div className={cn("absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500", stat.color)}>
                                                <stat.icon size={80} />
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>

                                {/* Charts Row 1 */}
                                <div className="grid grid-cols-3 gap-6">
                                    {/* Activity Chart */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="col-span-2 bg-white p-6 rounded-[2rem] border border-border/40 shadow-sm"
                                    >
                                        <div className="flex items-center justify-between mb-8">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 bg-zinc-100 rounded-xl">
                                                    <TrendingUp size={16} className="text-zinc-700" />
                                                </div>
                                                <div>
                                                    <h3 className="text-sm font-bold text-zinc-900">Engagement Overview</h3>
                                                    <p className="text-[10px] font-medium text-muted-foreground">Views vs Downloads over time</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="h-[280px] w-full">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <AreaChart data={MOCK_ACTIVITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                                    <defs>
                                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                            <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                                        </linearGradient>
                                                        <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                                        </linearGradient>
                                                    </defs>
                                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa', fontWeight: 700 }} dy={10} />
                                                    <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa', fontWeight: 700 }} />
                                                    <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                                    <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                                                    <Area type="monotone" dataKey="downloads" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorDownloads)" />
                                                </AreaChart>
                                            </ResponsiveContainer>
                                        </div>
                                    </motion.div>

                                    {/* Device Breakdown */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.5 }}
                                        className="bg-white p-6 rounded-[2rem] border border-border/40 shadow-sm flex flex-col"
                                    >
                                        <div className="flex items-center gap-3 mb-6">
                                            <div className="p-2 bg-zinc-100 rounded-xl">
                                                <Smartphone size={16} className="text-zinc-700" />
                                            </div>
                                            <div>
                                                <h3 className="text-sm font-bold text-zinc-900">Device Usage</h3>
                                                <p className="text-[10px] font-medium text-muted-foreground">By platform</p>
                                            </div>
                                        </div>
                                        <div className="flex-1 relative min-h-[200px]">
                                            <ResponsiveContainer width="100%" height="100%">
                                                <PieChart>
                                                    <Pie
                                                        data={MOCK_DEVICE_DATA}
                                                        cx="50%"
                                                        cy="50%"
                                                        innerRadius={60}
                                                        outerRadius={80}
                                                        paddingAngle={5}
                                                        dataKey="value"
                                                        stroke="none"
                                                    >
                                                        {MOCK_DEVICE_DATA.map((entry, index) => (
                                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                                        ))}
                                                    </Pie>
                                                    <Tooltip content={<CustomTooltip />} />
                                                </PieChart>
                                            </ResponsiveContainer>
                                            {/* Center Label */}
                                            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                                <span className="text-2xl font-black text-zinc-800">100%</span>
                                                <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Traffic</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col gap-3 mt-4">
                                            {MOCK_DEVICE_DATA.map((device, i) => (
                                                <div key={i} className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: device.color }} />
                                                        <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">{device.name}</span>
                                                    </div>
                                                    <span className="text-[10px] font-black text-zinc-800">{((device.value / 1000) * 100).toFixed(0)}%</span>
                                                </div>
                                            ))}
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        ) : (
                            <div className="h-full flex flex-col items-center justify-center opacity-40">
                                <div className="w-24 h-24 rounded-3xl bg-white border border-border/10 flex items-center justify-center mb-6 shadow-sm">
                                    {activeTab === 'design' && <Palette size={32} className="text-primary-500" />}
                                    {activeTab === 'analytics' && <BarChart2 size={32} className="text-primary-500" />}
                                </div>
                                <p className="text-[10px] font-black uppercase tracking-[0.4em]">Active Module: {activeTab}</p>
                            </div>
                        )}
                    </div>
                </div>
            </main>
        </div >
    );
};

export default EventDetails;
