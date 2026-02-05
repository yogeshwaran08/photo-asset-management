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
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    pageVariants,
    listItemVariants,
    staggerContainer,
    buttonVariants,
    springTransition
} from '@/lib/motion-config';

const MotionCard = motion(Card);
const MotionButton = motion(Button);

const StudioDetails = () => {
    const { studioId } = useParams();
    const navigate = useNavigate();

    const studio = MOCK_STUDIOS.find(s => s.id === studioId) || MOCK_STUDIOS[0];

    const stats = [
        { label: 'Total Events', value: studio.eventCount, icon: Calendar, color: 'text-primary-400', bg: 'bg-primary-400/10' },
        { label: 'Storage Used', value: studio.storageUsed, icon: Database, color: 'text-success', bg: 'bg-success/10' },
        { label: 'Active Plan', value: studio.plan, icon: CreditCard, color: 'text-primary-500', bg: 'bg-primary-500/10' },
        { label: 'Total Visits', value: '12.4K', icon: Users, color: 'text-info', bg: 'bg-info/10' },
    ];

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8 max-w-7xl mx-auto pb-12"
        >
            {/* Header / Back Navigation */}
            <div className="flex items-center gap-4">
                <MotionButton
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    variant="outline"
                    size="icon"
                    onClick={() => navigate('/super-admin/studios')}
                    className="h-11 w-11 rounded-xl border-border/50"
                >
                    <ChevronLeft size={20} />
                </MotionButton>
                <div></div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Left Column - Profile Info */}
                <div className="lg:col-span-1 space-y-6">
                    <MotionCard
                        variants={listItemVariants}
                        className="rounded-3xl border-border/50 p-8 text-center overflow-hidden relative"
                    >


                        <div className="w-24 h-24 rounded-3xl bg-primary-500/10 flex items-center justify-center font-black text-primary-500 text-4xl border-2 border-primary-500/20 shadow-inner mx-auto mb-6 relative z-10">
                            {studio.name.charAt(0)}
                        </div>
                        <h2 className="text-2xl font-black uppercase tracking-tight mb-2 relative z-10">{studio.name}</h2>
                        <Badge
                            variant={studio.status === 'active' ? 'default' : 'destructive'}
                            className="gap-1.5 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest mb-6 relative z-10"
                        >
                            <div className="w-1.5 h-1.5 rounded-full animate-pulse bg-current" />
                            {studio.status}
                        </Badge>

                        <div className="space-y-4 text-left relative z-10">
                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-2xl border border-border/50 hover:border-primary-500/30 transition-colors group">
                                <Mail size={18} className="text-primary-500 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase opacity-70">Email Address</p>
                                    <p className="text-sm font-bold truncate tracking-tight">{studio.email}</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-2xl border border-border/50 hover:border-emerald-500/30 transition-colors group">
                                <Phone size={18} className="text-emerald-500 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase opacity-70">Phone Number</p>
                                    <p className="text-sm font-bold tracking-tight">+1 (555) 123-4567</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 p-3 bg-muted/30 rounded-2xl border border-border/50 hover:border-rose-500/30 transition-colors group">
                                <MapPin size={18} className="text-rose-500 shrink-0" />
                                <div className="min-w-0">
                                    <p className="text-[9px] font-black text-muted-foreground uppercase opacity-70">Location</p>
                                    <p className="text-sm font-bold tracking-tight">New York, USA</p>
                                </div>
                            </div>
                        </div>

                        <MotionButton
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            className="w-full mt-8 py-6 bg-primary-500 hover:bg-primary-600 text-white font-black text-sm tracking-widest shadow-xl shadow-primary-500/20"
                        >
                            MANAGE ACCOUNT
                        </MotionButton>
                    </MotionCard>

                    <MotionCard
                        variants={listItemVariants}
                        className="rounded-3xl border-border/50 p-6"
                    >
                        <h3 className="font-black uppercase text-[10px] tracking-[0.2em] text-muted-foreground mb-4 px-2">Quick Actions</h3>
                        <div className="grid grid-cols-2 gap-3">
                            <MotionButton
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                variant="ghost"
                                className="flex flex-col h-auto p-4 bg-muted/30 hover:bg-primary-500/10 rounded-2xl border border-border/50 transition-all text-center group gap-2"
                            >
                                <Activity size={20} className="text-primary-500 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-tight">Analytics</span>
                            </MotionButton>
                            <MotionButton
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                variant="ghost"
                                className="flex flex-col h-auto p-4 bg-muted/30 hover:bg-emerald-500/10 rounded-2xl border border-border/50 transition-all text-center group gap-2"
                            >
                                <ExternalLink size={20} className="text-emerald-500 group-hover:scale-110 transition-transform" />
                                <span className="text-[10px] font-black uppercase tracking-tight">Live Site</span>
                            </MotionButton>
                        </div>
                    </MotionCard>
                </div>

                {/* Right Column - Stats & Activity */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Stats Grid */}
                    <motion.div variants={staggerContainer} className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {stats.map((stat, i) => (
                            <MotionCard
                                key={i}
                                variants={listItemVariants}
                                whileHover={{ scale: 1.05, transition: springTransition }}
                                className="p-4 rounded-3xl border-border/50 shadow-sm"
                            >
                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center mb-3 shadow-inner", stat.bg)}>
                                    <stat.icon size={18} className={stat.color} />
                                </div>
                                <p className="text-[9px] font-black text-muted-foreground uppercase opacity-70 mb-1">{stat.label}</p>
                                <h4 className="text-xl font-black tracking-tight">{stat.value}</h4>
                            </MotionCard>
                        ))}
                    </motion.div>

                    {/* Recent Content */}
                    <MotionCard variants={listItemVariants} className="rounded-3xl border-border/50 overflow-hidden shadow-sm">
                        <CardHeader className="p-6 border-b border-border/50 flex flex-row items-center justify-between bg-muted/20">
                            <div>
                                <CardTitle className="text-lg font-black uppercase tracking-[0.05em]">Recent Events</CardTitle>
                                <CardDescription className="text-xs font-medium">Latest photographer activities</CardDescription>
                            </div>
                            <Button variant="link" className="text-xs font-black text-primary-500 hover:no-underline hover:text-primary-400">View All Events</Button>
                        </CardHeader>
                        <div className="divide-y divide-border/50">
                            {[
                                { name: 'Summer Wedding Tour', date: 'Oct 24, 2023', photos: 450, status: 'Published' },
                                { name: 'Corporate Gala \'23', date: 'Oct 20, 2023', photos: 820, status: 'Published' },
                                { name: 'Fashion Week Shoot', date: 'Oct 15, 2023', photos: 1200, status: 'Processing' },
                            ].map((event, i) => (
                                <motion.div
                                    key={i}
                                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                                    className="p-4 flex items-center justify-between transition-colors group cursor-pointer"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-muted/50 flex items-center justify-center font-bold text-muted-foreground group-hover:bg-primary-500/10 group-hover:text-primary-500 transition-colors border border-border/50">
                                            {event.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-sm uppercase tracking-tight group-hover:text-primary-500 transition-colors">{event.name}</p>
                                            <p className="text-[10px] text-muted-foreground font-bold opacity-70 uppercase tracking-tighter">{event.date} • {event.photos} Photos</p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <Badge
                                            variant={event.status === 'Published' ? 'secondary' : 'outline'}
                                            className="px-2 py-0.5 text-[8px] font-black uppercase tracking-wider"
                                        >
                                            {event.status}
                                        </Badge>
                                        <ArrowUpRight size={16} className="text-muted-foreground group-hover:text-primary-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </MotionCard>

                    {/* Billing Info */}
                    <MotionCard variants={listItemVariants} className="rounded-3xl border-border/50 p-6 flex items-center justify-between shadow-sm relative overflow-hidden">

                        <div className="flex items-center gap-4 relative z-10">
                            <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 border border-primary-500/20 shadow-sm">
                                <CreditCard size={24} />
                            </div>
                            <div>
                                <h4 className="font-black uppercase text-sm tracking-tight">{studio.plan} Subscription</h4>
                                <p className="text-[10px] text-muted-foreground font-bold uppercase opacity-70">Next cycle: Nov 12, 2023</p>
                            </div>
                        </div>
                        <MotionButton
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                            variant="outline"
                            className="px-6 h-11 border-border/50 text-[10px] font-black uppercase tracking-widest relative z-10 transition-all hover:bg-primary-500 hover:text-white hover:border-primary-500"
                        >
                            Modify Plan
                        </MotionButton>
                    </MotionCard>
                </div>
            </div>
        </motion.div>
    );
};

export default StudioDetails;
