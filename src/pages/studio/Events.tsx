import React, { useState, useEffect } from 'react';
import {
    Plus,
    Search,
    Filter,
    LayoutGrid,
    List,
    ChevronDown,
    MoreVertical,
    Calendar,
    MapPin,
    Image as ImageIcon,
    Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { eventService, type Event } from '@/services/eventService';
import { toast } from 'sonner';
import { format } from 'date-fns';

type EventStatus = 'all' | 'published' | 'unpublished' | 'expired';
type ViewMode = 'grid' | 'list';

const Events = () => {
    const navigate = useNavigate();
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<EventStatus>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [viewMode, setViewMode] = useState<ViewMode>(() => {
        const saved = localStorage.getItem('viewMode');
        return (saved === 'grid' || saved === 'list') ? saved : 'grid';
    });

    useEffect(() => {
        localStorage.setItem('viewMode', viewMode);
    }, [viewMode]);

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

    const filteredEvents = React.useMemo(() => events.filter(event => {
        const status = (event.status || 'unpublished').toLowerCase(); // Assuming API returns string status
        
        let matchesTab = false;
        if (activeTab === 'all') matchesTab = true;
        else if (activeTab === 'published') matchesTab = status === 'published';
        else if (activeTab === 'unpublished') matchesTab = status === 'unpublished' || status === 'draft';
        else if (activeTab === 'expired') matchesTab = status === 'expired'; // Assuming 'expired' status exists or logic needed

        const matchesSearch = event.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            (event.location?.toLowerCase().includes(searchQuery.toLowerCase()) ?? false);

        return matchesTab && matchesSearch;
    }), [events, activeTab, searchQuery]);

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case 'published': return 'bg-emerald-100 text-emerald-700';
            case 'unpublished': return 'bg-amber-100 text-amber-700';
            case 'draft': return 'bg-gray-100 text-gray-700';
            default: return 'bg-blue-50 text-blue-700';
        }
    };

    return (
        <div className="max-w-[1600px] mx-auto space-y-8 min-h-[80vh]">
            {/* Enhanced Header Section with Gradient */}
            <div className="flex flex-col space-y-6">
                <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-8 rounded-3xl bg-gradient-to-br from-primary-500/10 via-primary-400/10 to-orange-500/10 border border-primary-200/50 shadow-lg shadow-primary-500/5 overflow-hidden">
                    {/* Animated gradient orbs */}
                    <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary-400 to-orange-400 rounded-full blur-3xl opacity-20 animate-pulse" />
                    <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
                    
                    <div className="relative z-10">
                        <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-orange-600 bg-clip-text text-transparent">
                            My Events
                        </h1>
                        <p className="text-gray-600 mt-2 font-medium">
                            Manage and organize your photography events
                        </p>
                    </div>

                    <div className="relative z-10 flex flex-wrap items-center gap-3 w-full md:w-auto">
                        {/* Enhanced Search & Filter Combo */}
                        <div className="flex items-center bg-white/90 backdrop-blur-xl border border-primary-200/30 rounded-xl shadow-lg shadow-primary-500/5 h-12 w-full md:w-auto flex-1 md:flex-none transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-300/50">
                            <div className="relative flex items-center flex-1 min-w-[200px]">
                                <Search size={18} className="absolute left-4 text-primary-400" />
                                <Input
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-0 focus-visible:ring-0 shadow-none h-full pl-11 bg-transparent w-full text-sm placeholder:text-gray-400 font-medium"
                                />
                            </div>
                            <div className="h-6 w-px bg-gradient-to-b from-primary-200 to-orange-200 mx-2" />
                            <Button variant="ghost" size="sm" className="h-full rounded-r-xl px-4 hover:bg-primary-50 text-primary-600 font-bold text-xs uppercase tracking-wide transition-all duration-300 hover:text-primary-700">
                                <Filter size={16} className="mr-2" />
                                Filter
                            </Button>
                        </div>

                        {/* Enhanced View Toggle */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-12 px-4 bg-white/90 backdrop-blur-xl border-primary-200/30 text-gray-700 hover:bg-primary-50 hover:text-primary-700 hover:border-primary-300/50 gap-2 min-w-[110px] justify-between shadow-lg shadow-primary-500/5 rounded-xl transition-all duration-300">
                                    <div className="flex items-center gap-2">
                                        {viewMode === 'grid' ? <LayoutGrid size={18} className="text-primary-500" /> : <List size={18} className="text-primary-500" />}
                                        <span className="text-xs font-bold uppercase tracking-wide">{viewMode === 'grid' ? 'Box' : 'Cards'}</span>
                                    </div>
                                    <ChevronDown size={16} className="opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[130px] border-primary-200/30 shadow-xl">
                                <DropdownMenuItem onClick={() => setViewMode('grid')} className="gap-2 text-xs font-semibold hover:bg-primary-50 hover:text-primary-700">
                                    <LayoutGrid size={16} /> Box View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setViewMode('list')} className="gap-2 text-xs font-semibold hover:bg-primary-50 hover:text-primary-700">
                                    <List size={16} /> Card View
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        {/* Enhanced Create Button with Gradient */}
                        <Button 
                            onClick={() => navigate('/studio/create-event')}
                            className="group relative h-12 bg-gradient-to-r from-primary-500 via-primary-400 to-orange-500 hover:from-primary-600 hover:via-primary-500 hover:to-orange-600 text-white shadow-2xl shadow-primary-500/30 px-6 rounded-xl font-bold text-xs uppercase tracking-widest transition-all duration-300 hover:scale-105 hover:shadow-primary-500/50 active:scale-95 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative flex items-center gap-2">
                                <Plus size={18} strokeWidth={3} />
                                New Event
                            </span>
                        </Button>
                    </div>
                </div>

                {/* Gradient Divider */}
                <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-primary-300 to-transparent rounded-full" />

                {/* Enhanced Tabs with Gradient Indicators */}
                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-1">
                    {['All Events', 'Published', 'Unpublished', 'Expired'].map((tab) => (
                        <motion.button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0] as EventStatus)}
                            className={cn(
                                "relative text-sm font-bold tracking-wide capitalize whitespace-nowrap pb-3 px-2 transition-all duration-300",
                                activeTab === tab.toLowerCase().split(' ')[0]
                                    ? "text-primary-600"
                                    : "text-gray-500 hover:text-gray-900"
                            )}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            {tab}
                            {activeTab === tab.toLowerCase().split(' ')[0] && (
                                <motion.div
                                    layoutId="activeTab"
                                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-primary-500 via-primary-400 to-orange-500 rounded-full"
                                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                                />
                            )}
                        </motion.button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32">
                    <div className="relative">
                        <Loader2 size={48} className="animate-spin text-primary-500 mb-4" />
                        <div className="absolute inset-0 blur-xl bg-primary-500/20 animate-pulse" />
                    </div>
                    <p className="text-sm font-semibold text-gray-500 mt-4">Loading your events...</p>
                </div>
            ) : filteredEvents.length > 0 ? (
                <div className={cn(
                    "grid gap-6",
                    viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                )}>
                    {filteredEvents.map((event, index) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                            className={cn(
                                "group relative bg-white rounded-3xl p-3 border-2 border-gray-100 shadow-lg hover:shadow-2xl hover:-translate-y-1 transition-all duration-200 cursor-pointer overflow-hidden",
                                viewMode === 'list' && "flex flex-col md:flex-row p-0 overflow-hidden rounded-2xl md:h-48"
                            )}
                            onClick={() => navigate(`/studio/events/${event.id}`)}
                        >

                            
                            <div className={cn(
                                "relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100",
                                viewMode === 'grid' ? "aspect-[4/3]" : "w-full md:w-72 shrink-0 h-48 md:h-full rounded-none"
                            )}>
                                <div className="absolute inset-0 flex items-center justify-center text-gray-300">
                                    <ImageIcon size={56} strokeWidth={1.5} />
                                </div>
                                
                                {/* Enhanced Status Badge with Gradient */}
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <Badge className={cn(
                                        "bg-white/95 backdrop-blur-xl shadow-lg border-0 text-[10px] font-bold uppercase tracking-wider px-3 py-1.5 rounded-full",
                                        getStatusColor(event.status || 'unpublished').replace('bg-', 'text-')
                                    )}>
                                        <span className={cn("w-2 h-2 rounded-full mr-2 inline-block animate-pulse", getStatusColor(event.status || 'unpublished').replace('text-', 'bg-').split(' ')[0])}></span>
                                        {event.status || 'Draft'}
                                    </Badge>
                                </div>


                            </div>

                            {/* Details Area */}
                            <div className={cn(
                                "flex flex-col justify-between flex-1",
                                viewMode === 'grid' ? "pt-4 px-2 pb-2" : "p-6"
                            )}>
                                <div>
                                    <div className="flex justify-between items-start mb-1">
                                        <h3 className="font-bold text-lg text-gray-900 line-clamp-1 tracking-tight group-hover:text-primary-600 transition-colors duration-300">
                                            {event.name}
                                        </h3>
                                        {viewMode === 'list' && (
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-primary-600 hover:bg-primary-50">
                                                <MoreVertical size={16} />
                                            </Button>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-col gap-2 mt-3">
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 group-hover:text-primary-600 transition-colors duration-300">
                                            <Calendar size={16} className="text-primary-400 stroke-[2.5]" />
                                            <span>
                                                {event.start_date ? format(new Date(event.start_date), 'MMMM d, yyyy') : 'Date TBD'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-600 group-hover:text-primary-600 transition-colors duration-300">
                                            <MapPin size={16} className="text-primary-400 stroke-[2.5]" />
                                            <span className="truncate max-w-[200px]">{event.location || 'No location added'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-100 group-hover:border-primary-200 transition-colors duration-300">
                                    <div className="flex items-center -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <motion.div 
                                                key={i} 
                                                className="w-7 h-7 rounded-full border-2 border-white bg-gradient-to-br from-primary-100 to-orange-100 flex items-center justify-center text-[9px] font-bold text-primary-600 shadow-sm"
                                                whileHover={{ scale: 1.2, zIndex: 10 }}
                                            >
                                                U{i}
                                            </motion.div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="text-[10px] font-bold text-white uppercase tracking-widest bg-gradient-to-r from-primary-500 to-orange-500 px-3 py-1.5 rounded-full shadow-lg shadow-primary-500/30">
                                            {event.event_type || 'Event'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="flex flex-col items-center justify-center py-20 text-center"
                >
                    <div className="relative w-24 h-24 bg-gradient-to-br from-primary-100 to-orange-100 rounded-full flex items-center justify-center mb-6 shadow-xl shadow-primary-500/10">
                        <Calendar size={40} className="text-primary-400" />
                        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-orange-500/20 animate-pulse" />
                    </div>
                    <h3 className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-2">No events found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8 font-medium">
                        {searchQuery || activeTab !== 'all' 
                            ? "Try adjusting your filters or search query to find what you're looking for." 
                            : "Get started by creating your first event to showcase your photography."}
                    </p>
                    <Button 
                        onClick={() => navigate('/studio/create-event')}
                        className="group relative bg-gradient-to-r from-primary-600 via-primary-500 to-orange-600 hover:from-primary-700 hover:via-primary-600 hover:to-orange-700 text-white font-bold shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 px-8 py-6 rounded-2xl transition-all duration-300 hover:scale-105 overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <span className="relative flex items-center gap-2">
                            <Plus size={20} strokeWidth={3} />
                            Create New Event
                        </span>
                    </Button>
                </motion.div>
            )}
        </div>
    );
};

export default Events;
