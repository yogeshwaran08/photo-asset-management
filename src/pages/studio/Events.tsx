import React, { useState } from 'react';
import {
    Plus,
    Search,
    ChevronDown,
    Image as ImageIcon,
    CheckCircle2,
    Clock,
    DollarSign,
    AlertCircle,
    Filter,
    ArrowUpRight,
    Calendar,
    LayoutGrid,
    List
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import {
    pageVariants,
    listItemVariants,
    staggerContainer,
    buttonVariants
} from '@/lib/motion-config';

type EventStatus = 'all' | 'published' | 'unpublished' | 'expired' | 'photo-selling';

const Events = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<EventStatus>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs: { label: string; value: EventStatus; icon: React.ElementType }[] = [
        { label: 'All Events', value: 'all', icon: LayoutGrid },
        { label: 'Published', value: 'published', icon: CheckCircle2 },
        { label: 'Waitlist', value: 'unpublished', icon: Clock },
        { label: 'Monetized', value: 'photo-selling', icon: DollarSign },
        { label: 'Archived', value: 'expired', icon: AlertCircle },
    ];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="space-y-8 max-w-7xl mx-auto pb-12"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase">Photography Events</h1>
                    <p className="text-muted-foreground font-bold text-sm uppercase opacity-70 mt-1">
                        Organize and monitor your asset distribution
                    </p>
                </div>
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
                <div className="flex p-1.5 bg-muted/40 rounded-2xl border border-border/50 w-fit glass">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={cn(
                                "flex items-center gap-2 px-5 py-2.5 rounded-xl font-black uppercase text-[10px] tracking-widest transition-all duration-300",
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

            {/* Empty State */}
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
                        Your event gallery is currently empty. Ready to showcase your latest photography work?
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
        </motion.div>
    );
};

export default Events;
