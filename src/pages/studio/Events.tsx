import React, { useState } from 'react';
import {
    Plus,
    Search,
    ChevronDown,
    Image as ImageIcon,
    CheckCircle2,
    Clock,
    DollarSign,
    AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

type EventStatus = 'all' | 'published' | 'unpublished' | 'expired' | 'photo-selling';

const Events = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<EventStatus>('all');
    const [searchQuery, setSearchQuery] = useState('');

    const tabs: { label: string; value: EventStatus; icon: React.ElementType }[] = [
        { label: 'All', value: 'all', icon: ImageIcon },
        { label: 'Published', value: 'published', icon: CheckCircle2 },
        { label: 'Unpublished', value: 'unpublished', icon: Clock },
        { label: 'Expired', value: 'expired', icon: AlertCircle },
        { label: 'Photo Selling', value: 'photo-selling', icon: DollarSign },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 bg-card p-8 rounded-[2.5rem] border border-border/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
                <div className="relative">
                    <h1 className="text-2xl font-bold tracking-tight">Events Management</h1>
                    <p className="text-muted-foreground mt-1">Manage, track and organize your photography events</p>
                </div>
                <button
                    onClick={() => navigate('/studio/create-event')}
                    className="flex items-center gap-2 bg-linear-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-xl shadow-primary-600/20 active:scale-95 group relative overflow-hidden"
                >
                    <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>Create New Event</span>
                </button>
            </div>

            {/* Tab & Search Bar */}
            <div className="flex flex-col lg:flex-row gap-4 lg:items-center justify-between">
                <div className="flex items-center gap-1 bg-muted/30 p-1 rounded-xl border border-border/50 w-fit">
                    {tabs.map((tab) => (
                        <button
                            key={tab.value}
                            onClick={() => setActiveTab(tab.value)}
                            className={cn(
                                "flex items-center gap-2 px-4 py-2 rounded-lg font-semibold transition-all duration-200 text-sm whitespace-nowrap",
                                activeTab === tab.value
                                    ? "bg-card text-foreground shadow-sm ring-1 ring-border"
                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                            )}
                        >
                            <tab.icon size={14} />
                            {tab.label}
                        </button>
                    ))}
                </div>

                <div className="flex items-center gap-3">
                    <div className="relative group flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors group-focus-within:text-primary-500" size={16} />
                        <input
                            type="text"
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-card border border-border/60 rounded-xl py-2 pl-10 pr-4 focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all outline-none text-sm shadow-sm"
                        />
                    </div>
                    <button className="flex items-center gap-2 px-4 py-2 bg-card rounded-xl hover:bg-muted/50 transition-colors text-sm font-semibold border border-border/60 shadow-sm">
                        <span>Sort by</span>
                        <ChevronDown size={14} className="text-muted-foreground" />
                    </button>
                </div>
            </div>

            {/* Empty State */}
            <div className="flex flex-col items-center justify-center py-40 bg-card/30 rounded-[3.5rem] border-2 border-dashed border-border/40 relative overflow-hidden group">
                <div className="absolute inset-0 bg-primary-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-[80px]" />
                <div className="relative flex flex-col items-center">
                    <div className="w-20 h-20 bg-muted/50 rounded-full flex items-center justify-center mb-8 border border-border/40 animate-pulse shadow-2xl shadow-primary-500/10">
                        <ImageIcon size={32} className="text-muted-foreground/30" />
                    </div>
                    <h3 className="text-xl font-bold mb-3 tracking-tight">You don't have any events</h3>
                    <p className="text-muted-foreground mb-10 text-center max-w-sm text-sm leading-relaxed">
                        Start your journey by creating your first photography event. Captured moments are meant to be shared.
                    </p>
                    <button
                        onClick={() => navigate('/studio/create-event')}
                        className="flex items-center gap-2 bg-linear-to-r from-primary-600 to-accent-600 hover:from-primary-500 hover:to-accent-500 text-white px-6 py-3 rounded-xl font-bold transition-all shadow-2xl shadow-primary-600/30 active:scale-95 group/btn"
                    >
                        <Plus size={18} strokeWidth={3} className="group-hover/btn:rotate-90 transition-transform duration-300" />
                        <span>Create new event</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Events;
