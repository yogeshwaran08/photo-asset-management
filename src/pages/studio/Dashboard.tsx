import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Camera,
    Eye,
    HardDrive,
    Calendar,
    ArrowUpRight,
    TrendingUp,
} from 'lucide-react';
import { motion } from 'framer-motion';
import { eventService, type Event } from '@/services/eventService';

import { photoService } from '@/services/photoService';
import { cn, formatBytes } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    pageVariants,
    listItemVariants,
    staggerContainer,
} from '@/lib/motion-config';

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass }: any) => (
    <motion.div variants={listItemVariants}>
        <Card className="border-border/50 shadow-sm hover:shadow-md transition-all group overflow-hidden relative">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", colorClass)}>
                        <Icon size={24} />
                    </div>
                    <div className={cn(
                        "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider",
                        trend === 'up' ? "bg-success/10 text-success" : "bg-error/10 text-error"
                    )}>
                        <TrendingUp size={12} className={trend === 'down' ? 'rotate-180' : ''} />
                        {trendValue}
                    </div>
                </div>
                <div>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest leading-none mb-1.5">{title}</p>
                    <p className="text-3xl font-bold tracking-tight">{value}</p>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

const StudioDashboard = () => {
    const navigate = useNavigate();
    const [totalEvents, setTotalEvents] = useState<number | string>("-");
    const [totalPhotos, setTotalPhotos] = useState<number | string>("-");
    const [storageUsed, setStorageUsed] = useState<string>("-");
    const [recentEvents, setRecentEvents] = useState<Event[]>([]);
    const [systemHealth, setSystemHealth] = useState<'normal' | 'abnormal'>('normal');

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const events = await eventService.getAll();
                // Check if events is an array, knowing response structure is crucial
                if (Array.isArray(events)) {
                    setTotalEvents(events.length);
                    // Sort by created_at descending and take top 4
                    const sortedEvents = [...events].sort((a, b) =>
                        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
                    ).slice(0, 4);
                    setRecentEvents(sortedEvents);
                } else {
                    // Fallback if response structure is different (e.g. paginated)
                    // Assuming basic array for now based on service definition
                    console.warn("Unexpected events response format", events);
                    setTotalEvents(0);
                }
            } catch (error) {
                console.error("Failed to fetch events count", error);
                setTotalEvents(0);
            }
        };

        const fetchPhotos = async () => {
            try {
                const photos = await photoService.getAll();
                if (Array.isArray(photos)) {
                    setTotalPhotos(photos.length);
                    const totalBytes = photos.reduce((acc, photo) => acc + (photo.file_size || photo.size || 0), 0);
                    setStorageUsed(formatBytes(totalBytes));
                } else {
                    console.warn("Unexpected photos response format", photos);
                    setTotalPhotos(0);
                    setStorageUsed("0 B");
                }
            } catch (error) {
                console.error("Failed to fetch photos count", error);
                setTotalPhotos(0);
                setStorageUsed("0 B");
            }
        };

        const checkSystemHealth = async () => {
            try {
                const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/health`);
                if (response.status === 200) {
                    setSystemHealth('normal');
                } else {
                    setSystemHealth('abnormal');
                }
            } catch (error) {
                console.error("Failed to check system health", error);
                setSystemHealth('abnormal');
            }
        };

        fetchEvents();
        fetchPhotos();
        checkSystemHealth();

        // Poll health check every 30 seconds
        const healthInterval = setInterval(checkSystemHealth, 30000);

        return () => clearInterval(healthInterval);
    }, []);

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="space-y-0 pb-0"
        >
            <div></div>

            <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
            >
                <StatCard
                    title="Total Events"
                    value={totalEvents}
                    icon={Camera}
                    trend="up"
                    trendValue="+12%"
                    colorClass="bg-primary-500/10 text-primary-500"
                />
                <StatCard
                    title="Total Photos"
                    value={totalPhotos}
                    icon={Camera}
                    trend="up"
                    trendValue="+18%"
                    colorClass="bg-info/10 text-info"
                />
                <StatCard
                    title="Guest Visits"
                    value="12.5K"
                    icon={Eye}
                    trend="up"
                    trendValue="+24%"
                    colorClass="bg-success/10 text-success"
                />
                <StatCard
                    title="Storage Used"
                    value={storageUsed}
                    icon={HardDrive}
                    trend="up"
                    trendValue="+5%"
                    colorClass="bg-warning/10 text-warning"
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
                <MotionCard
                    variants={listItemVariants}
                    className="lg:col-span-2 border-border/50"
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                        <div>
                            <CardTitle className="text-xl font-bold uppercase tracking-tight">Recent Events</CardTitle>
                            <CardDescription className="font-medium text-xs uppercase opacity-70">Manage your latest activity</CardDescription>
                        </div>
                        <Button
                            variant="ghost"
                            size="sm"
                            className="font-bold uppercase text-[10px] tracking-widest text-primary-500 hover:text-primary-600"
                            onClick={() => navigate('/studio/events')}
                        >
                            View All Events
                        </Button>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="space-y-1">
                            {recentEvents.map((event) => (
                                <motion.div
                                    key={event.id}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group cursor-pointer border-b border-border last:border-0"
                                    onClick={() => navigate(`/studio/events/${event.id}`)}
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-16 h-12 rounded-xl bg-muted overflow-hidden relative shrink-0">
                                            <div className="w-full h-full flex items-center justify-center bg-secondary/20 text-secondary-foreground">
                                                <Camera size={20} className="opacity-50" />
                                            </div>
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-bold uppercase truncate tracking-tight">{event.name}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <Badge variant="outline" className="text-[8px] font-bold uppercase py-0 px-2 rounded-full border-primary-500/20 text-primary-500 h-4">
                                                    {event.event_type || 'Event'}
                                                </Badge>
                                                <span className="text-[10px] font-medium text-muted-foreground uppercase opacity-70 flex items-center gap-1">
                                                    <Calendar size={10} />
                                                    {event.start_date ? new Date(event.start_date).toLocaleDateString() : 'TBD'}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 shrink-0">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-xs font-bold tracking-tight">-</p>
                                            <p className="text-[9px] font-medium text-muted-foreground uppercase opacity-70">Photos</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge className={cn(
                                                "rounded-full px-3 py-0 h-5 text-[9px] font-bold uppercase tracking-widest",
                                                event.status === 'published' ? "bg-success/10 text-success hover:bg-success/20" : "bg-muted text-muted-foreground shadow-none"
                                            )}>
                                                {event.status || 'Draft'}
                                            </Badge>
                                            <div className="w-8 h-8 rounded-full flex items-center justify-center text-muted-foreground group-hover:text-primary-500 transition-colors">
                                                <ArrowUpRight size={18} />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </CardContent>
                </MotionCard>

                <div className="space-y-6">
                    {/* <MotionCard
                        variants={listItemVariants}
                        className="border-border/50 p-6 flex flex-col justify-between"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-info/10 flex items-center justify-center text-info border border-info/20 shadow-sm">
                                <Clock size={24} />
                            </div>
                            <Button
                                variant="outline"
                                size="icon"
                                className="h-8 w-8 rounded-xl border-border/50"
                                onClick={() => navigate('/studio/create-event')}
                            >
                                <Plus size={16} />
                            </Button>
                        </div>
                        <div>
                            <h4 className="text-lg font-black uppercase tracking-tight mb-1">Quick Action</h4>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed opacity-70 mb-4">
                                You have 3 events pending for publication. Publish now to enable guest access.
                            </p>
                            <Button
                                className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl h-11 font-black uppercase text-[10px] tracking-widest"
                                onClick={() => navigate('/studio/events')}
                            >
                                Manage Activity
                            </Button>
                        </div>
                    </MotionCard> */}

                    <MotionCard
                        variants={listItemVariants}
                        className="border-border/50 p-6"
                    >
                        <h4 className="text-sm font-bold uppercase tracking-widest mb-6">System Status</h4>
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={cn(
                                        "w-2 h-2 rounded-full",
                                        systemHealth === 'normal' ? "bg-success animate-pulse" : "bg-error animate-pulse"
                                    )} />
                                    <span className="text-[10px] font-bold uppercase tracking-tight">API Core</span>
                                </div>
                                <span className={cn(
                                    "text-[9px] font-bold uppercase tracking-widest",
                                    systemHealth === 'normal' ? "text-success" : "text-error"
                                )}>
                                    {systemHealth === 'normal' ? 'Normal' : 'Abnormal'}
                                </span>
                            </div>
                        </div>
                    </MotionCard>
                </div>
            </div>
        </motion.div>
    );
};

const MotionCard = motion(Card);

export default StudioDashboard;
