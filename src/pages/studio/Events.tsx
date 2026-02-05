import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Image as ImageIcon,
    CheckCircle2,
    Clock,
    DollarSign,
    AlertCircle,
    Filter,
    ArrowUpRight,
    Calendar,
    LayoutGrid,
    MoreVertical,
    Trash2,
    Edit,
    Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    pageVariants,
    listItemVariants,
    staggerContainer,
    buttonVariants
} from '@/lib/motion-config';
import { eventService, type Event } from '@/services/eventService';
import { toast } from 'sonner';
import { format } from 'date-fns';

type EventStatus = 'all' | 'published' | 'unpublished' | 'expired' | 'photo-selling';

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
        { label: 'Monetized', value: 'photo-selling', icon: DollarSign },
        { label: 'Archived', value: 'expired', icon: AlertCircle },
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
            case 'expired':
                return <Badge className="bg-rose-500/10 text-rose-500 border-rose-500/20 uppercase text-[9px] font-black">Archived</Badge>;
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
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div></div>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button
                        onClick={() => navigate('/studio/create-event')}
                        className="bg-primary-500 hover:bg-primary-600 text-foreground h-12 px-6 rounded-2xl font-black uppercase tracking-widest gap-2 shadow-lg shadow-primary-500/20"
                    >
                        <Plus size={18} strokeWidth={3} />
                        New Event
                    </Button>
                </motion.div>
            </div>

            {/* Tab & Search Bar */}
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
                            className="bg-white/50 border-border/50 rounded-2xl py-6 pl-12 focus-visible:ring-primary-500/20 focus-visible:border-primary-500 font-black uppercase text-[10px] tracking-widest shadow-sm glass"
                        />
                    </div>
                    <Button variant="outline" className="h-[52px] rounded-2xl px-6 font-black uppercase text-[10px] tracking-widest border-border/50 glass hover:bg-white/60">
                        <Filter size={16} className="mr-2" />
                        Refine
                    </Button>
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
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                    {filteredEvents.map((event) => (
                        <motion.div key={event.id} variants={listItemVariants}>
                            <Card className="rounded-[2.5rem] border-border/50 shadow-xl overflow-hidden glass group hover:border-primary-500/50 transition-all duration-500">
                                <div className="aspect-video relative overflow-hidden bg-muted">
                                    <div className="absolute inset-0 bg-linear-to-t from-black/60 to-transparent z-10" />
                                    <ImageIcon className="absolute inset-0 m-auto text-muted-foreground/20 w-12 h-12" />
                                    <div className="absolute top-4 left-4 z-20">
                                        {getStatusBadge(event.status || 'unpublished')}
                                    </div>
                                    <div className="absolute top-4 right-4 z-20">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" size="icon" className="w-8 h-8 rounded-full bg-black/20 backdrop-blur-md text-white hover:bg-black/40 border-none">
                                                    <MoreVertical size={14} />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end" className="rounded-2xl border-border/50 glass">
                                                <DropdownMenuItem className="gap-2 font-bold text-xs uppercase cursor-pointer">
                                                    <Edit size={14} /> Edit Details
                                                </DropdownMenuItem>
                                                <DropdownMenuItem
                                                    onClick={() => handleDelete(event.id)}
                                                    className="gap-2 font-bold text-xs uppercase cursor-pointer text-rose-500 focus:text-rose-500"
                                                >
                                                    <Trash2 size={14} /> Delete Event
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </div>
                                    <div className="absolute bottom-4 left-6 right-6 z-20">
                                        <h3 className="text-white font-black uppercase text-lg leading-tight line-clamp-1">{event.name}</h3>
                                        <div className="flex items-center gap-2 text-white/70 text-[10px] font-bold uppercase tracking-widest mt-1">
                                            <Calendar size={12} />
                                            {event.start_date ? format(new Date(event.start_date), 'MMM dd, yyyy') : 'No date'}
                                        </div>
                                    </div>
                                </div>
                                <CardContent className="p-6">
                                    <div className="flex flex-col gap-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Type</p>
                                                <p className="text-xs font-bold uppercase">{event.event_type || 'Custom'}</p>
                                            </div>
                                            <div className="space-y-1">
                                                <p className="text-[9px] font-black text-muted-foreground uppercase tracking-widest">Location</p>
                                                <p className="text-xs font-bold uppercase line-clamp-1">{event.location || 'N/A'}</p>
                                            </div>
                                        </div>
                                        <Button
                                            onClick={() => navigate(`/studio/photos?event=${event.id}`)}
                                            className="w-full bg-foreground text-background hover:bg-foreground/90 h-10 rounded-xl font-black uppercase text-[10px] tracking-widest group"
                                        >
                                            Manage Assets
                                            <ArrowUpRight size={14} className="ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
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

