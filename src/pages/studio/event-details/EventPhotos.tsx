import { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    Filter,
    Upload,
    Download,
    Image as ImageIcon,
    Loader2,
    Pen,
    Plus,
    Folder,
    FileText,
    Sparkles,
    ChevronDown,
    ListOrdered,
    Check,
    ArrowLeft
} from 'lucide-react';
import { formatBytes } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    DropdownMenuGroup
} from "@/components/ui/dropdown-menu";
import { eventService, type Photo } from '@/services/eventService';
import { collectionService, type Collection } from '@/services/collectionService';
import { toast } from 'sonner';
import { EventHeader } from './EventHeader';

const EventPhotos = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [isCreateCollectionOpen, setIsCreateCollectionOpen] = useState(false);
    const [newCollectionName, setNewCollectionName] = useState("");
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [images, setImages] = useState<Photo[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [viewMode] = useState<'cards' | 'gallery' | 'list'>('gallery');
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState<string>('upload_desc');
    const [collections, setCollections] = useState<Collection[]>([]);
    const [activeCollectionId, setActiveCollectionId] = useState<number | 'all'>('all');

    useEffect(() => {
        if (eventId) {
            fetchPhotos();
            fetchCollections();
        }
    }, [eventId]);

    const fetchCollections = async () => {
        try {
            const data = await collectionService.getAll(Number(eventId));
            setCollections(data);
        } catch (error) {
            console.error("Failed to fetch collections", error);
        }
    };

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
                            event_id: Number(eventId),
                            file_size: file.size
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
            toast.success("Images uploaded successfully");
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
        (activeCollectionId === 'all' || img.collection_id === activeCollectionId) &&
        img.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedImages = [...filteredImages].sort((a, b) => {
        switch (sortBy) {
            case 'upload_desc': return b.id - a.id;
            case 'upload_asc': return a.id - b.id;
            case 'capture_desc': return b.id - a.id; // Mock capture time
            case 'capture_asc': return a.id - b.id;
            case 'size_desc': return (b.file_size || 0) - (a.file_size || 0);
            case 'size_asc': return (a.file_size || 0) - (b.file_size || 0);
            case 'name_asc': return a.title.localeCompare(b.title);
            case 'name_desc': return b.title.localeCompare(a.title);
            default: return 0;
        }
    });

    const getSortLabel = (sort: string) => {
        switch (sort) {
            case 'upload_desc': return 'Newest first';
            case 'upload_asc': return 'Oldest first';
            case 'capture_desc': return 'Capture Newest';
            case 'capture_asc': return 'Capture Oldest';
            case 'size_desc': return 'Largest size';
            case 'size_asc': return 'Smallest size';
            case 'name_asc': return 'A to Z';
            case 'name_desc': return 'Z to A';
            default: return 'Sort';
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            <input type="file" ref={fileInputRef} onChange={handleFileSelect} multiple accept="image/*" className="hidden" />

            <EventHeader
                actions={
                    <>
                        <Button variant="outline" className="h-10 px-5 rounded-lg gap-2 font-bold text-xs uppercase tracking-wide border-[#F27963]/30 text-[#F27963] hover:bg-[#F27963]/10 hover:text-[#F27963] hover:border-[#F27963] transition-all bg-white/50 backdrop-blur-sm">
                            <Download size={16} strokeWidth={2.5} /> Download
                        </Button>
                        <Button className="h-10 px-5 rounded-lg gap-2 font-bold text-xs uppercase tracking-wide bg-[#F27963] hover:bg-[#E06854] text-white shadow-lg shadow-[#F27963]/20 transition-all hover:scale-[1.02] active:scale-95" onClick={triggerUpload}>
                            {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} strokeWidth={2.5} />}
                            Upload Media
                        </Button>
                    </>
                }
            >

                <div className="flex items-center gap-3 flex-1 max-w-2xl">
                    <button
                        onClick={() => navigate('/studio/events')}
                        className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-zinc-100 transition-all text-muted-foreground hover:text-[#F27963]"
                        title="Back to Events"
                    >
                        <ArrowLeft size={20} strokeWidth={2.5} />
                    </button>
                    <div className="flex items-center bg-white/90 backdrop-blur-xl border border-[#F27963]/30 rounded-lg h-10 w-full max-w-md transition-all duration-300 hover:border-[#F27963]">
                        <div className="relative flex items-center flex-1 min-w-[200px]">
                            <Search size={18} className="absolute left-4 text-[#F27963]" />
                            <Input
                                placeholder="Search events..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="border-0 focus-visible:ring-0 shadow-none h-full pl-11 bg-transparent w-full text-sm placeholder:text-gray-400 font-medium text-gray-700"
                            />
                        </div>
                        <div className="h-5 w-px bg-[#F27963]/20 mx-2" />
                        <Button variant="ghost" size="sm" className="h-full rounded-r-lg px-4 hover:bg-[#F27963]/10 text-[#F27963] font-bold text-xs uppercase tracking-wide transition-all duration-300 hover:text-[#d65f4d]">
                            <Filter size={16} className="mr-2 stroke-[2.5]" />
                            Filter
                        </Button>
                    </div>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-10 rounded-lg border border-[#F27963]/30 bg-white/90 backdrop-blur-xl hover:bg-[#F27963]/10 transition-all text-gray-700 hover:text-[#F27963] hover:border-[#F27963] shrink-0 gap-2 px-3">
                                <ListOrdered size={16} className="text-[#F27963]" />
                                <span className="text-[10px] font-bold uppercase tracking-wide text-[#F27963]">{getSortLabel(sortBy)}</span>
                                <ChevronDown size={14} className="opacity-50 ml-1 text-[#F27963]" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56 p-2 rounded-2xl shadow-xl border-border/50 bg-white/95 backdrop-blur-xl" align="end">
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1.5">Upload Time</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSortBy('upload_desc')} className="justify-between rounded-lg cursor-pointer focus:bg-zinc-50 font-medium text-xs">
                                Newest first {sortBy === 'upload_desc' && <Check size={14} className="text-primary-500" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy('upload_asc')} className="justify-between rounded-lg cursor-pointer focus:bg-zinc-50 font-medium text-xs">
                                Oldest first {sortBy === 'upload_asc' && <Check size={14} className="text-primary-500" />}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="my-1 bg-border/40" />
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1.5">Capture Time</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSortBy('capture_desc')} className="justify-between rounded-lg cursor-pointer focus:bg-zinc-50 font-medium text-xs">
                                Newest first {sortBy === 'capture_desc' && <Check size={14} className="text-primary-500" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy('capture_asc')} className="justify-between rounded-lg cursor-pointer focus:bg-zinc-50 font-medium text-xs">
                                Oldest first {sortBy === 'capture_asc' && <Check size={14} className="text-primary-500" />}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="my-1 bg-border/40" />
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1.5">File Size</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSortBy('size_desc')} className="justify-between rounded-lg cursor-pointer focus:bg-zinc-50 font-medium text-xs">
                                Largest first {sortBy === 'size_desc' && <Check size={14} className="text-primary-500" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy('size_asc')} className="justify-between rounded-lg cursor-pointer focus:bg-zinc-50 font-medium text-xs">
                                Smallest first {sortBy === 'size_asc' && <Check size={14} className="text-primary-500" />}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="my-1 bg-border/40" />
                        <DropdownMenuGroup>
                            <DropdownMenuLabel className="text-xs font-bold text-muted-foreground uppercase tracking-wider px-2 py-1.5">File Name</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => setSortBy('name_asc')} className="justify-between rounded-lg cursor-pointer focus:bg-zinc-50 font-medium text-xs">
                                A to Z {sortBy === 'name_asc' && <Check size={14} className="text-primary-500" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setSortBy('name_desc')} className="justify-between rounded-lg cursor-pointer focus:bg-zinc-50 font-medium text-xs">
                                Z to A {sortBy === 'name_desc' && <Check size={14} className="text-primary-500" />}
                            </DropdownMenuItem>
                        </DropdownMenuGroup>
                        <DropdownMenuSeparator className="my-1 bg-border/40" />
                        <div className="p-2 text-[10px] text-muted-foreground leading-relaxed">
                            To change the sort option in client gallery, change from design settings.
                        </div>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
            </EventHeader>

            <div className="flex flex-1 h-full overflow-hidden">
                <div className="w-[260px] bg-white border-r border-zinc-300 flex flex-col z-30 shrink-0 h-full">
                    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide pt-5 relative">


                        {/* Cover Image */}
                        <div className="space-y-3 pt-2 relative mx-auto w-full max-w-[220px]">
                            <div className="aspect-[4/3] rounded-[1.5rem] bg-zinc-200/50 overflow-hidden flex flex-col items-center justify-center text-center ring-1 ring-black/5">
                                <ImageIcon size={32} className="text-zinc-300 mb-2" />
                            </div>
                            
                            <button className="absolute -bottom-3 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] font-bold py-1.5 px-4 rounded-full flex items-center gap-2 shadow-lg hover:scale-105 transition-all whitespace-nowrap z-20">
                                Change Cover Image <Pen size={10} />
                            </button>
                        </div>

                        <div className="flex items-center justify-between w-full pt-1 px-1">
                            <div className="flex-1 text-center">
                                <div className="text-xl font-black text-slate-800 tracking-tight">{images.length.toString().padStart(2, '0')}</div>
                                <div className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest mt-0.5">Photos</div>
                            </div>
                            
                            <div className="h-8 w-px bg-zinc-200" />
                            
                            <div className="flex-1 text-center">
                                <div className="text-xl font-black text-slate-800 tracking-tight">00</div>
                                <div className="text-[9px] font-bold uppercase text-muted-foreground tracking-widest mt-0.5">Videos</div>
                            </div>
                        </div>

                        <div className="w-full h-px bg-border/40" />

                        <div className="space-y-4">
                            <Dialog open={isCreateCollectionOpen} onOpenChange={setIsCreateCollectionOpen}>
                                <DialogTrigger asChild>
                                    <Button className="bg-[#F27963] w-full rounded-2xl h-11 border border-[#F27963] hover:bg-[#d65f4d] hover:border-[#d65f4d] text-white transition-all group font-black uppercase text-[10px] tracking-widest gap-2 shadow-lg shadow-[#F27963]/20" >
                                        <Plus size={14} className="group-hover:rotate-90 transition-transform duration-300" />
                                        Add Collection
                                    </Button>
                                </DialogTrigger>
                                <DialogContent className="sm:max-w-[425px]">
                                    <DialogHeader>
                                        <DialogTitle>Create New Collection</DialogTitle>
                                        <DialogDescription>
                                            Enter the name for your new collection. Click create when you're done.
                                        </DialogDescription>
                                    </DialogHeader>
                                    <div className="grid gap-4 py-4">
                                        <div className="flex flex-col gap-2">
                                            <Label htmlFor="name" className="text-left font-semibold">
                                                Collection Name
                                            </Label>
                                            <Input
                                                id="name"
                                                value={newCollectionName}
                                                onChange={(e) => setNewCollectionName(e.target.value)}
                                                className="col-span-3"
                                                placeholder="e.g. Highlights"
                                            />
                                        </div>
                                    </div>
                                    <DialogFooter>
                                        <Button variant="outline" onClick={() => setIsCreateCollectionOpen(false)}>Cancel</Button>
                                        <Button 
                                            onClick={async () => {
                                                if (!newCollectionName.trim()) return;
                                                try {
                                                    await collectionService.create({ 
                                                        name: newCollectionName, 
                                                        event_id: Number(eventId) 
                                                    });
                                                    await fetchCollections();
                                                    setNewCollectionName("");
                                                    setIsCreateCollectionOpen(false);
                                                    toast.success("Collection created");
                                                } catch (error) {
                                                    toast.error("Failed to create collection");
                                                }
                                            }}
                                            className="bg-[#F27963] hover:bg-[#d65f4d] text-white"
                                        >
                                            Create Collection
                                        </Button>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>

                            <div className="space-y-1">
                                <button 
                                    onClick={() => setActiveCollectionId('all')}
                                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeCollectionId === 'all' ? 'bg-orange-50/50 text-[#F27963] border-l-2 border-[#F27963]' : 'text-muted-foreground hover:bg-zinc-50'}`}
                                >
                                    <FileText size={14} />
                                    <span className="text-[10px] font-black uppercase tracking-wider">All Assets</span>
                                    <span className="ml-auto text-[9px] font-bold text-muted-foreground bg-zinc-100 px-1.5 py-0.5 rounded-md">{images.length}</span>
                                </button>
                                
                                {collections.map(collection => (
                                    <button 
                                        key={collection.id}
                                        onClick={() => setActiveCollectionId(collection.id)}
                                        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all ${activeCollectionId === collection.id ? 'bg-orange-50/50 text-[#F27963] border-l-2 border-[#F27963]' : 'text-muted-foreground hover:bg-zinc-50'}`}
                                    >
                                        <Folder size={14} />
                                        <span className="text-[10px] font-black uppercase tracking-wider truncate">{collection.name}</span>
                                        <span className="ml-auto text-[9px] font-bold text-muted-foreground bg-zinc-100 px-1.5 py-0.5 rounded-md">
                                            {images.filter(img => img.collection_id === collection.id).length}
                                        </span>
                                    </button>
                                ))}
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


                <div className="flex-1 p-12 overflow-y-auto w-full scrollbar-hide">
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
                                        {sortedImages.map((image) => (
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
                                        {sortedImages.map((image) => (
                                            <motion.div key={image.id} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="aspect-square rounded-[2.5rem] bg-white border border-border/10 overflow-hidden relative group shadow-sm hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] transition-all duration-700">
                                                <img src={image.url} alt={image.title} className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000" />
                                                <div className="absolute inset-x-2 bottom-2 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-400">
                                                    <div className="bg-white/80 backdrop-blur-xl p-3 border border-white/50 rounded-[1.75rem] flex items-center justify-between shadow-2xl">
                                                        <div className="truncate pr-4 flex flex-col">
                                                            <span className="text-[9px] font-black uppercase truncate leading-tight">{image.title}</span>
                                                            <span className="text-[7px] font-black text-muted-foreground opacity-50 uppercase mt-0.5 tracking-tighter">Media Asset • {formatBytes(image.file_size || 0)}</span>
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
                                        {sortedImages.map((image) => (
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
                                                    <div className="text-[9px] font-bold uppercase py-1 px-3 bg-zinc-100 rounded-lg text-muted-foreground">{formatBytes(image.file_size || 0)}</div>
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
                            <div className="w-32 h-32 bg-orange-50 rounded-full flex items-center justify-center mb-6 ring-8 ring-orange-50/50">
                                <ImageIcon size={48} className="text-orange-500 opacity-80" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-2">No items found</h3>
                            <p className="text-sm text-muted-foreground max-w-xs mx-auto mb-8">
                                Start by uploading your first batch of photos to this event or collection.
                            </p>
                            <Button 
                                onClick={triggerUpload} 
                                className="h-11 px-8 rounded-xl bg-[#F27963] hover:bg-[#d65f4d] text-white font-bold text-xs uppercase tracking-wide shadow-lg shadow-orange-500/20 transition-all hover:scale-105 active:scale-95"
                            >
                                <Upload size={16} className="mr-2" />
                                Upload Media
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventPhotos;
