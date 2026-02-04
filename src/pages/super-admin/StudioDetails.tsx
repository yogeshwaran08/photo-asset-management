import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    ChevronLeft,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Database,
    Users,
    Activity,
    CreditCard,
    ArrowUpRight,
    ExternalLink
} from 'lucide-react';
import { MOCK_STUDIOS } from '../../utils/mockData';
import { cn } from '../../utils/cn';

const StudioDetails = () => {
    const { studioId } = useParams();
    const navigate = useNavigate();

    const studio = MOCK_STUDIOS.find(s => s.id === studioId) || MOCK_STUDIOS[0];

    const stats = [
        { label: 'Total Events', value: studio.eventCount, icon: Calendar, color: 'text-primary-500', bg: 'bg-primary-500/10' },
        { label: 'Storage Used', value: studio.storageUsed, icon: Database, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
        { label: 'Active Plan', value: studio.plan, icon: CreditCard, color: 'text-purple-500', bg: 'bg-purple-500/10' },
        { label: 'Total Visits', value: '12.4K', icon: Users, color: 'text-accent-500', bg: 'bg-accent-500/10' },
    ];

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            {/* Header / Back Navigation */}
            <div className="flex items-center gap-4">
                <button
                    onClick={() => navigate('/super-admin/studios')}
                    className="p-2 hover:bg-secondary-bg rounded-xl border border-border transition-all"
                >
                    <ChevronLeft size={20} />
                </button>
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Studio Profile</h1>
                    <p className="text-sm text-muted-foreground font-medium">Viewing deep insights for {studio.name}</p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Profile Info */}
                <div className="lg:col-span-1 space-y-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-card rounded-3xl border border-border p-8 text-center"
                    >
                        <div className="w-24 h-24 rounded-3xl bg-primary-500/10 flex items-center justify-center font-black text-primary-500 text-4xl border-2 border-primary-500/20 shadow-inner mx-auto mb-6">
                            {studio.name.charAt(0)}
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-2">{studio.name}</h2>
                        <span className={cn(
                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border mb-6",
                            studio.status === 'active'
                                ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                                : "bg-rose-500/10 text-rose-500 border-rose-500/20"
                        )}>
                            <div className={cn("w-1.5 h-1.5 rounded-full animate-pulse", studio.status === 'active' ? "bg-emerald-500" : "bg-rose-500")} />
                            {studio.status}
                        </span>

                        <div className="space-y-4 text-left">
                            <div className="flex items-center gap-3 p-3 bg-secondary-bg/50 rounded-2xl border border-border/50">
                                <Mail size={18} className="text-primary-400 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase">Email Address</p>
                                    <p className="text-sm font-bold truncate">{studio.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-secondary-bg/50 rounded-2xl border border-border/50">
                                <Phone size={18} className="text-emerald-400 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase">Phone Number</p>
                                    <p className="text-sm font-bold">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-secondary-bg/50 rounded-2xl border border-border/50">
                                <MapPin size={18} className="text-rose-400 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[10px] font-black text-muted-foreground uppercase">Location</p>
                                    <p className="text-sm font-bold">New York, USA</p>
                                </div>
                            </div>
                        </div>

                        <button className="w-full mt-8 py-3 bg-primary-500 hover:bg-primary-600 text-white rounded-xl font-black text-sm transition-all shadow-xl shadow-primary-500/20">
                            MANAGE ACCOUNT
                        </button>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-card rounded-3xl border border-border p-6"
                    >
                        <h3 className="font-black uppercase text-xs tracking-widest text-muted-foreground mb-4">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <button className="p-3 bg-secondary-bg hover:bg-primary-500/10 rounded-2xl border border-border transition-all text-center group">
                                <Activity size={20} className="mx-auto mb-2 text-primary-400 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black uppercase">Analytics</span>
                            </button>
                            <button className="p-3 bg-secondary-bg hover:bg-emerald-500/10 rounded-2xl border border-border transition-all text-center group">
                                <ExternalLink size={20} className="mx-auto mb-2 text-emerald-400 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black uppercase">Live Site</span>
                            </button>
                        </div>
                    </motion.div>
                </div>

                {/* Right Column - Stats & Activity */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Grid */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-card p-4 rounded-3xl border border-border"
                            >
                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3", stat.bg)}>
                                    <stat.icon size={20} className={stat.color} />
                                </div>
                                <p className="text-[10px] font-black text-muted-foreground uppercase mb-1">{stat.label}</p>
                                <h4 className="text-xl font-black">{stat.value}</h4>
                            </motion.div>
                        ))}
                    </div>

                    {/* Recent Content */}
                    <div className="bg-card rounded-3xl border border-border overflow-hidden">
                        <div className="p-6 border-b border-border flex items-center justify-between bg-secondary-bg/30">
                            <h3 className="text-lg font-black uppercase tracking-tight">Recent Events</h3>
                            <button className="text-xs font-black text-primary-500 hover:underline">View All Events</button>
                        </div>
                        <div className="divide-y divide-border">
                            {[
                                { name: 'Summer Wedding Tour', date: 'Oct 24, 2023', photos: 450, status: 'Published' },
                                { name: 'Corporate Gala \'23', date: 'Oct 20, 2023', photos: 820, status: 'Published' },
                                { name: 'Fashion Week Shoot', date: 'Oct 15, 2023', photos: 1200, status: 'Processing' },
                            ].map((event, i) => (
                                <div key={i} className="p-4 flex items-center justify-between hover:bg-primary-500/5 transition-colors group cursor-pointer">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-secondary-bg flex items-center justify-center font-bold text-muted-foreground group-hover:bg-primary-500/10 group-hover:text-primary-500 transition-colors">
                                            {event.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold text-sm uppercase tracking-tight group-hover:text-primary-400 transition-colors">{event.name}</p>
                                            <p className="text-[10px] text-muted-foreground font-medium">{event.date} • {event.photos} Photos</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span className={cn(
                                            "px-2 py-0.5 rounded-md text-[8px] font-black uppercase tracking-wider border",
                                            event.status === 'Published' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                        )}>
                                            {event.status}
                                        </span>
                                        <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Billing Info */}
                    <div className="bg-card rounded-3xl border border-border p-6 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 flex items-center justify-center text-purple-500">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <h4 className="font-black uppercase text-sm tracking-tight">{studio.plan} Subscription</h4>
                                <p className="text-xs text-muted-foreground font-medium">Next billing date: Nov 12, 2023</p>
                            </div>
                        </div>
                        <button className="px-5 py-2 rounded-xl bg-secondary-bg hover:bg-muted border border-border text-xs font-black uppercase transition-all">
                            Upgrade Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudioDetails;
