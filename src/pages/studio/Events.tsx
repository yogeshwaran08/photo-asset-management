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
            {/* Header Section */}
            <div className="flex flex-col space-y-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                    <h1 className="text-3xl font-bold text-gray-900 tracking-tight">My events</h1>

                    <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                        {/* Search & Filter Combo */}
                        <div className="flex items-center bg-white border border-gray-200 rounded-lg shadow-sm h-10 w-full md:w-auto flex-1 md:flex-none">
                            <div className="relative flex items-center flex-1 min-w-[200px]">
                                <Search size={16} className="absolute left-3 text-gray-400" />
                                <Input
                                    placeholder="Search events..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="border-0 focus-visible:ring-0 shadow-none h-full pl-9 bg-transparent w-full text-sm placeholder:text-gray-400"
                                />
                            </div>
                            <div className="h-6 w-px bg-gray-200 mx-1" />
                            <Button variant="ghost" size="sm" className="h-full rounded-r-lg px-3 hover:bg-gray-50 text-gray-600 font-medium text-xs uppercase tracking-wide">
                                <Filter size={14} className="mr-2" />
                                Filter
                            </Button>
                        </div>

                        {/* View Toggle */}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" className="h-10 px-3 bg-white border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 gap-2 min-w-[100px] justify-between">
                                    <div className="flex items-center gap-2">
                                        {viewMode === 'grid' ? <LayoutGrid size={16} /> : <List size={16} />}
                                        <span className="text-xs font-semibold uppercase tracking-wide">{viewMode === 'grid' ? 'Box' : 'Cards'}</span>
                                    </div>
                                    <ChevronDown size={14} className="opacity-50" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[120px]">
                                <DropdownMenuItem onClick={() => setViewMode('grid')} className="gap-2 text-xs font-medium">
                                    <LayoutGrid size={14} /> Box View
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => setViewMode('list')} className="gap-2 text-xs font-medium">
                                    <List size={14} /> Card View
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <Button 
                            onClick={() => navigate('/studio/create-event')}
                            className="h-10 bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20 px-6 rounded-lg font-semibold text-xs uppercase tracking-widest transition-all hover:scale-[1.01] active:scale-[0.99]"
                        >
                            <Plus size={16} className="mr-2" strokeWidth={3} />
                            New Event
                        </Button>
                    </div>
                </div>

                <div className="h-px w-full bg-gray-200" />

                <div className="flex items-center gap-8 overflow-x-auto no-scrollbar pb-1">
                    {['All Events', 'Published', 'Unpublished', 'Expired'].map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab.toLowerCase().split(' ')[0] as EventStatus)}
                            className={cn(
                                "text-sm font-semibold tracking-wide capitalize whitespace-nowrap pb-2 border-b-2 transition-all duration-200 px-1",
                                activeTab === tab.toLowerCase().split(' ')[0]
                                    ? "border-primary-500 text-primary-600"
                                    : "border-transparent text-gray-500 hover:text-gray-900 hover:border-gray-300"
                            )}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32">
                    <Loader2 size={40} className="animate-spin text-primary-500 mb-4" />
                    <p className="text-sm font-medium text-gray-400">Loading your events...</p>
                </div>
            ) : filteredEvents.length > 0 ? (
                <div className={cn(
                    "grid gap-6",
                    viewMode === 'grid' ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                )}>
                    {filteredEvents.map((event) => (
                        <motion.div
                            key={event.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            whileHover={{ y: -1, transition: { type: "tween", ease: "easeOut", duration: 0.3 } }}
                            className={cn(
                                "group bg-white rounded-[24px] p-3 border border-gray-100 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.08)] hover:border-primary-500 transition-colors duration-200 cursor-pointer relative",
                                viewMode === 'list' && "flex flex-col md:flex-row p-0 overflow-hidden rounded-2xl md:h-48"
                            )}
                            onClick={() => navigate(`/studio/events/${event.id}`)}
                        >
                            <div className={cn(
                                "relative overflow-hidden rounded-[18px] bg-neutral-50",
                                viewMode === 'grid' ? "aspect-[4/3]" : "w-full md:w-72 shrink-0 h-48 md:h-full rounded-none"
                            )}>
                                <div className="absolute inset-0 flex items-center justify-center text-gray-200">
                                    <ImageIcon size={48} strokeWidth={1.5} />
                                </div>
                                
                                <div className="absolute top-3 left-3 flex gap-2">
                                    <Badge className={cn(
                                        "bg-white/90 backdrop-blur-md shadow-sm border-0 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1",
                                        getStatusColor(event.status || 'unpublished').replace('bg-', 'text-') // Keep text color, override bg
                                    )}>
                                        <span className={cn("w-1.5 h-1.5 rounded-full mr-1.5 inline-block", getStatusColor(event.status || 'unpublished').replace('text-', 'bg-').split(' ')[0])}></span>
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
                                        <h3 className="font-bold text-lg text-gray-900 line-clamp-1 tracking-tight">
                                            {event.name}
                                        </h3>
                                        {viewMode === 'list' && (
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900">
                                                <MoreVertical size={16} />
                                            </Button>
                                        )}
                                    </div>
                                    
                                    <div className="flex flex-col gap-1.5 mt-2">
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                            <Calendar size={14} className="text-gray-400 stroke-[2.5]" />
                                            <span>
                                                {event.start_date ? format(new Date(event.start_date), 'MMMM d, yyyy') : 'Date TBD'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-2 text-xs font-medium text-gray-500">
                                            <MapPin size={14} className="text-gray-400 stroke-[2.5]" />
                                            <span className="truncate max-w-[200px]">{event.location || 'No location added'}</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-5 flex items-center justify-between pt-4 border-t border-gray-50">
                                    <div className="flex items-center -space-x-2">
                                        {[1, 2, 3].map(i => (
                                            <div key={i} className="w-6 h-6 rounded-full border-[1.5px] border-white bg-gray-100 flex items-center justify-center text-[9px] font-bold text-gray-400">
                                                U{i}
                                            </div>
                                        ))}
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <div className="text-[10px] font-bold text-primary-600 uppercase tracking-widest bg-primary-50 px-2 py-1 rounded-md">
                                            {event.event_type || 'Event'}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="flex flex-col items-center justify-center py-20 text-center">
                    <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-6">
                        <Calendar size={32} className="text-gray-300" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">No events found</h3>
                    <p className="text-gray-500 max-w-sm mx-auto mb-8">
                        {searchQuery || activeTab !== 'all' 
                            ? "Try adjusting your filters or search query to find what you're looking for." 
                            : "Get started by creating your first event to showcase your photography."}
                    </p>
                    <Button 
                        onClick={() => navigate('/studio/create-event')}
                        className="bg-primary-500 hover:bg-primary-600 text-white font-semibold shadow-lg shadow-primary-500/20"
                    >
                        <Plus size={16} className="mr-2" />
                        Create New Event
                    </Button>
                </div>
            )}
        </div>
    );
};

export default Events;
