import {
    Camera,
    Eye,
    HardDrive,
    Plus,
    Calendar,
    MapPin,
    ArrowUpRight,
    TrendingUp,
    Clock,
    ChevronDown,
    Download
} from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_EVENTS } from '../../utils/mockData';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    pageVariants,
    listItemVariants,
    staggerContainer,
    buttonVariants,
    springTransition
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
                        "flex items-center gap-1 px-2 py-1 rounded-full text-[10px] font-black uppercase tracking-wider",
                        trend === 'up' ? "bg-success/10 text-success" : "bg-error/10 text-error"
                    )}>
                        <TrendingUp size={12} className={trend === 'down' ? 'rotate-180' : ''} />
                        {trendValue}
                    </div>
                </div>
                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1.5">{title}</p>
                    <p className="text-3xl font-black tracking-tight">{value}</p>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

const StudioDashboard = () => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="space-y-10 max-w-7xl mx-auto pb-12"
        >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase">Dashboard</h1>
                    <p className="text-muted-foreground font-bold text-sm uppercase opacity-70 mt-1">
                        Welcome back, <span className="text-foreground">Luminary Studios</span>
                    </p>
                </div>
            </div>

            <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <StatCard
                    title="Total Events"
                    value="24"
                    icon={Camera}
                    trend="up"
                    trendValue="+12%"
                    colorClass="bg-primary-500/10 text-primary-500"
                />
                <StatCard
                    title="Total Photos"
                    value="8,420"
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
                    value="156 GB"
                    icon={HardDrive}
                    trend="up"
                    trendValue="+5%"
                    colorClass="bg-warning/10 text-warning"
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <MotionCard
                    variants={listItemVariants}
                    className="lg:col-span-2 border-border/50"
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tight">Recent Events</CardTitle>
                            <CardDescription className="font-bold text-xs uppercase opacity-70">Manage your latest activity</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="font-black uppercase text-[10px] tracking-widest text-primary-500 hover:text-primary-600">
                            View All Events
                        </Button>
                    </CardHeader>
                    <CardContent className="px-0">
                        <div className="space-y-1">
                            {MOCK_EVENTS.slice(0, 4).map((event) => (
                                <motion.div
                                    key={event.id}
                                    whileHover={{ x: 4 }}
                                    className="flex items-center justify-between p-4 hover:bg-muted/30 transition-colors group cursor-pointer border-b border-border last:border-0"
                                >
                                    <div className="flex items-center gap-4 min-w-0">
                                        <div className="w-16 h-12 rounded-xl bg-muted overflow-hidden relative shrink-0">
                                            <img
                                                src={event.thumbnail}
                                                alt={event.name}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                            />
                                        </div>
                                        <div className="min-w-0">
                                            <p className="text-sm font-black uppercase truncate tracking-tight">{event.name}</p>
                                            <div className="flex items-center gap-2 mt-0.5">
                                                <Badge variant="outline" className="text-[8px] font-black uppercase py-0 px-2 rounded-full border-primary-500/20 text-primary-500 h-4">
                                                    {event.type}
                                                </Badge>
                                                <span className="text-[10px] font-bold text-muted-foreground uppercase opacity-70 flex items-center gap-1">
                                                    <Calendar size={10} />
                                                    {event.startDate}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-6 shrink-0">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-xs font-black tracking-tight">{event.photoCount}</p>
                                            <p className="text-[9px] font-bold text-muted-foreground uppercase opacity-70">Photos</p>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Badge className={cn(
                                                "rounded-full px-3 py-0 h-5 text-[9px] font-black uppercase tracking-widest",
                                                event.status === 'published' ? "bg-success/10 text-success hover:bg-success/20" : "bg-muted text-muted-foreground shadow-none"
                                            )}>
                                                {event.status}
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
                    <MotionCard
                        variants={listItemVariants}
                        className="border-border/50 p-6 flex flex-col justify-between"
                    >
                        <div className="flex items-center justify-between mb-6">
                            <div className="w-12 h-12 rounded-2xl bg-info/10 flex items-center justify-center text-info border border-info/20 shadow-sm">
                                <Clock size={24} />
                            </div>
                            <Button variant="outline" size="icon" className="h-8 w-8 rounded-xl border-border/50">
                                <Plus size={16} />
                            </Button>
                        </div>
                        <div>
                            <h4 className="text-lg font-black uppercase tracking-tight mb-1">Quick Action</h4>
                            <p className="text-[10px] font-bold text-muted-foreground uppercase leading-relaxed opacity-70 mb-4">
                                You have 3 events pending for publication. Publish now to enable guest access.
                            </p>
                            <Button className="w-full bg-foreground text-background hover:bg-foreground/90 rounded-xl h-11 font-black uppercase text-[10px] tracking-widest">
                                Manage Activity
                            </Button>
                        </div>
                    </MotionCard>

                    <MotionCard
                        variants={listItemVariants}
                        className="border-border/50 p-6"
                    >
                        <h4 className="text-sm font-black uppercase tracking-widest mb-6">System Status</h4>
                        <div className="space-y-5">
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-tight">API Core</span>
                                </div>
                                <span className="text-[9px] font-black uppercase text-success tracking-widest">Normal</span>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-success animate-pulse" />
                                    <span className="text-[10px] font-black uppercase tracking-tight">CDN Global</span>
                                </div>
                                <span className="text-[9px] font-black uppercase text-success tracking-widest">99.9%</span>
                            </div>
                            <div className="flex items-center justify-between opacity-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-2 h-2 rounded-full bg-warning" />
                                    <span className="text-[10px] font-black uppercase tracking-tight">Maintenance</span>
                                </div>
                                <span className="text-[9px] font-black uppercase text-muted-foreground tracking-widest">Disabled</span>
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
