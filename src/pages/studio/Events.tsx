import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Image as ImageIcon,
    CheckCircle2,
    Clock,
    Filter,
    Calendar,
    LayoutGrid,
    Trash2,
    Loader2,
    UserPlus,
    Upload,
    Share2,
    Settings,
    Film,
    Users
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    pageVariants,
    listItemVariants,
    staggerContainer,
    buttonVariants
} from '@/lib/motion-config';
import { eventService, type Event } from '@/services/eventService';
import { toast } from 'sonner';
import { format } from 'date-fns';

type EventStatus = 'all' | 'published' | 'unpublished';

const Events = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<EventStatus>('all');
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = async () => {
        setLoading(true);
        try {
            const data = await eventService.getAll();
            setEvents(data);
        } catch (error) {
            console.error("Failed to fetch events:", error);
            toast.error("Failed to load events");
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm("Are you sure you want to delete this event?")) return;

        try {
            await eventService.delete(id);
            toast.success("Event deleted");
            setEvents(prev => prev.filter(e => e.id !== id));
        } catch (error) {
            toast.error("Failed to delete event");
        }
    };

    const tabs: { label: string; value: EventStatus; icon: React.ElementType }[] = [
        { label: 'All Events', value: 'all', icon: LayoutGrid },
        { label: 'Published', value: 'published', icon: CheckCircle2 },
        { label: 'Waitlist', value: 'unpublished', icon: Clock },
    ];

    const filteredEvents = events.filter(event => {
        const matchesTab = activeTab === 'all' || event.status === activeTab;
        const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.location?.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesTab && matchesSearch;
    });

    const getStatusBadge = (status: string) => {
        switch (status) {
            case 'published':
                return <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 uppercase text-[9px] font-black">Published</Badge>;
            case 'unpublished':
                return <Badge className="bg-amber-500/10 text-amber-500 border-amber-500/20 uppercase text-[9px] font-black">Draft</Badge>;
            default:
                return <Badge className="bg-slate-500/10 text-slate-500 border-slate-500/20 uppercase text-[9px] font-black">{status}</Badge>;
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="space-y-8 max-w-7xl mx-auto pb-12"
        >
            {/* Header & Controls Section */}
            <div className="flex flex-col xl:flex-row gap-6 xl:items-center justify-between">
                <div className="flex p-1.5 bg-muted/40 rounded-2xl border border-border/50 w-fit glass overflow-x-auto no-scrollbar">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={cn(
                                "flex items-center gap-2 px-5 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all duration-300 whitespace-nowrap",
                                activeTab === tab.value
                                    ? "bg-white text-foreground shadow-sm ring-1 ring-border/50"
                                    : "text-muted-foreground hover:text-foreground hover:bg-white/40"
                            )}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative group w-full sm:w-80">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary-500" size={16} />
                        <Input
                            type="text"
                            placeholder="FIND AN EVENT..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="bg-white/50 border-border/50 rounded-2xl h-[52px] pl-12 focus-visible:ring-primary-500/20 focus-visible:border-primary-500 font-black uppercase text-[10px] tracking-widest shadow-sm glass"
                        />
                    </div>
                    <Button variant="outline" className="h-[52px] rounded-2xl px-6 font-black uppercase text-[10px] tracking-widest border-border/50 glass hover:bg-white/60">
                        <Filter size={16} className="mr-2" />
                        Refine
                    </Button>
                    <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                        <Button
                            onClick={() => navigate('/studio/create-event')}
                            className="bg-primary-500 hover:bg-primary-600 text-foreground h-[52px] px-6 rounded-2xl font-black uppercase tracking-widest gap-2 shadow-lg shadow-primary-500/20"
                        >
                            <Plus size={18} strokeWidth={3} />
                            New Event
                        </Button>
                    </motion.div>
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-border/40 rounded-[3rem] bg-muted/10">
                    <Loader2 size={40} className="animate-spin text-primary-500 mb-4" />
                    <p className="font-black uppercase text-xs tracking-widest opacity-50">Syncing with server...</p>
                </div>
            ) : filteredEvents.length > 0 ? (
                <motion.div
                    variants={staggerContainer}
                    initial="initial"
                    animate="animate"
                    className="flex flex-col gap-8"
                >
                    {filteredEvents.map((event) => (
                        <motion.div key={event.id} variants={listItemVariants} className="group relative flex flex-col md:flex-row items-center">
                            {/* Image Section (Left) */}
                            <div
                                onClick={() => navigate(`/studio/events/${event.id}`)}
                                className="cursor-pointer w-full md:w-[320px] lg:w-[360px] h-[240px] shrink-0 rounded-[2.5rem] overflow-hidden relative z-0 md:z-10 shadow-2xl border-4 border-white/50 bg-muted/20 transition-transform active:scale-95"
                            >
                                <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                                {event.status && (
                                    <div className="absolute top-6 left-6 z-20">
                                        {getStatusBadge(event.status)}
                                    </div>
                                )}
                                <div className="w-full h-full flex items-center justify-center bg-muted text-muted-foreground/30">
                                    <ImageIcon size={48} />
                                </div>
                                <div className="absolute bottom-6 left-6 z-20 text-white md:hidden">
                                    <h3 className="font-black uppercase text-xl leading-tight line-clamp-1">{event.name}</h3>
                                    <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{event.event_type || 'Event'}</p>
                                </div>
                            </div>

                            {/* Content Section (Right - Overlapping) */}
                            <div className="flex-1 w-full md:w-auto mt-[-40px] md:mt-0 md:-ml-12 relative z-10 md:z-20">
                                <Card
                                    onClick={() => navigate(`/studio/events/${event.id}`)}
                                    className="cursor-pointer rounded-[2rem] border-border/50 shadow-xl backdrop-blur-3xl bg-white/80 dark:bg-zinc-900/80 overflow-hidden h-auto md:h-[200px] flex flex-col justify-between p-6 md:pl-16 transition-colors hover:bg-white/90"
                                >
                                    <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                                        <div className="hidden md:block">
                                            <h3 className="text-2xl font-black uppercase tracking-tight text-foreground">{event.name}</h3>
                                            <div className="flex items-center gap-2 text-muted-foreground text-[10px] font-bold uppercase tracking-widest mt-1">
                                                <Calendar size={12} />
                                                <span>{event.start_date ? format(new Date(event.start_date), 'EEEE, MMMM d, yyyy') : 'Date TBD'}</span>
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2 self-end md:self-auto">
                                            <Badge variant="secondary" className="h-7 px-3 rounded-lg bg-foreground/5 gap-1.5 hover:bg-foreground/10 transition-colors">
                                                <ImageIcon size={12} />
                                                <span className="font-bold text-[10px]">0</span>
                                            </Badge>
                                            <Badge variant="secondary" className="h-7 px-3 rounded-lg bg-foreground/5 gap-1.5 hover:bg-foreground/10 transition-colors">
                                                <Film size={12} />
                                                <span className="font-bold text-[10px]">0</span>
                                            </Badge>
                                            <Badge variant="secondary" className="h-7 px-3 rounded-lg bg-foreground/5 gap-1.5 hover:bg-foreground/10 transition-colors">
                                                <Users size={12} />
                                                <span className="font-bold text-[10px]">0</span>
                                            </Badge>
                                        </div>
                                    </div>

                                    <div className="flex flex-col md:flex-row justify-between items-end md:items-center gap-4 mt-6 md:mt-0">
                                        <div className="hidden md:flex -space-x-3">
                                            {[1, 2, 3].map(i => (
                                                <div key={i} className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-muted flex items-center justify-center text-[10px] font-bold text-muted-foreground shadow-sm">
                                                    U{i}
                                                </div>
                                            ))}
                                            <div className="w-8 h-8 rounded-full border-2 border-white dark:border-zinc-900 bg-foreground text-background flex items-center justify-center text-[10px] font-bold shadow-sm">
                                                +2
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-1.5" onClick={(e) => e.stopPropagation()}>
                                            <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl hover:bg-primary-500/10 hover:text-primary-500 text-muted-foreground transition-colors" title="Add Collaborators">
                                                <UserPlus size={16} strokeWidth={2.5} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="w-9 h-9 rounded-xl hover:bg-blue-500/10 hover:text-blue-500 text-muted-foreground transition-colors"
                                                title="Upload Media"
                                                onClick={() => navigate(`/studio/events/${event.id}`)}
                                            >
                                                <Upload size={16} strokeWidth={2.5} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl hover:bg-indigo-500/10 hover:text-indigo-500 text-muted-foreground transition-colors" title="Share Event">
                                                <Share2 size={16} strokeWidth={2.5} />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="w-9 h-9 rounded-xl hover:bg-orange-500/10 hover:text-orange-500 text-muted-foreground transition-colors" title="Settings">
                                                <Settings size={16} strokeWidth={2.5} />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="w-9 h-9 rounded-xl hover:bg-rose-500/10 hover:text-rose-500 text-muted-foreground transition-colors"
                                                title="Delete Event"
                                                onClick={() => handleDelete(event.id)}
                                            >
                                                <Trash2 size={16} strokeWidth={2.5} />
                                            </Button>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            ) : (
                <motion.div
                    variants={listItemVariants}
                    className="flex flex-col items-center justify-center py-40 border-2 border-dashed border-border/40 rounded-[3rem] bg-muted/10 relative overflow-hidden group"
                >
                    <div className="relative flex flex-col items-center">
                        <div className="w-24 h-24 bg-white rounded-full flex items-center justify-center mb-8 border border-border/40 shadow-xl shadow-primary-500/5 group-hover:scale-110 transition-transform duration-500 glass">
                            <ImageIcon size={32} className="text-primary-500/40" />
                        </div>
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">No active events found</h3>
                        <p className="text-muted-foreground font-medium mb-10 text-center max-w-sm text-xs uppercase tracking-wider opacity-70 leading-relaxed">
                            {searchQuery ? "No events match your search criteria." : "Your event gallery is currently empty. Ready to showcase your latest photography work?"}
                        </p>
                        <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                            <Button
                                onClick={() => navigate('/studio/create-event')}
                                className="bg-foreground text-background hover:bg-foreground/90 h-12 px-8 rounded-2xl font-black uppercase tracking-widest gap-2 shadow-xl shadow-foreground/10"
                            >
                                <Plus size={18} strokeWidth={3} />
                                Start Publishing
                            </Button>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </motion.div>
    );
};

export default Events;

