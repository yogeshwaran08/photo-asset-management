import {
    Users,
    Camera,
    HardDrive,
    ArrowUpRight,
    ArrowDownRight,
    Clock,
    ChevronDown
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { pageVariants, cardVariants, staggerContainer, listItemVariants } from '@/lib/motion-config';

const MotionCard = motion(Card);

const data = [
    { name: 'Mon', events: 4, storage: 240 },
    { name: 'Tue', events: 7, storage: 300 },
    { name: 'Wed', events: 5, storage: 450 },
    { name: 'Thu', events: 8, storage: 500 },
    { name: 'Fri', events: 12, storage: 800 },
    { name: 'Sat', events: 15, storage: 1200 },
    { name: 'Sun', events: 10, storage: 1100 },
];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color }: any) => (
    <MotionCard
        variants={cardVariants}
        whileHover="hover"
        className="overflow-hidden border-border/50"
    >
        <CardContent className="p-6">
            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl", color)}>
                    <Icon size={24} className="text-white" />
                </div>
                {trend && (
                    <div className={cn(
                        "flex items-center gap-1 text-sm font-medium",
                        trend === 'up' ? "text-emerald-500" : "text-rose-500"
                    )}>
                        {trend === 'up' ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                        {trendValue}
                    </div>
                )}
            </div>
            <div className="space-y-1">
                <h3 className="text-muted-foreground text-sm font-medium">{title}</h3>
                <p className="text-2xl font-bold">{value}</p>
            </div>
        </CardContent>
    </MotionCard>
);

const SuperAdminDashboard = () => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8 max-w-7xl mx-auto"
        >
            <motion.div
                variants={staggerContainer}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            >
                <StatCard
                    title="Total Studios"
                    value="42"
                    icon={Users}
                    trend="up"
                    trendValue="+12%"
                    color="bg-primary-500"
                />
                <StatCard
                    title="Total Events"
                    value="1,284"
                    icon={Camera}
                    trend="up"
                    trendValue="+18%"
                    color="bg-primary-600"
                />
                <StatCard
                    title="Total Storage"
                    value="4.2 TB"
                    icon={HardDrive}
                    trend="up"
                    trendValue="+5%"
                    color="bg-success"
                />
                <StatCard
                    title="Active Sessions"
                    value="156"
                    icon={Clock}
                    trend="down"
                    trendValue="-2%"
                    color="bg-warning"
                />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <MotionCard
                    variants={listItemVariants}
                    className="lg:col-span-2 border-border/50"
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                        <div>
                            <CardTitle className="text-xl font-bold">Platform Growth</CardTitle>
                            <CardDescription>Event creation and storage trends</CardDescription>
                        </div>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="outline" size="sm" className="h-9 gap-2 font-bold rounded-xl border-border/50">
                                    Last 7 days
                                    <ChevronDown size={14} className="text-muted-foreground" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-[160px] rounded-xl border-border/50">
                                <DropdownMenuItem className="font-bold">Last 7 days</DropdownMenuItem>
                                <DropdownMenuItem className="font-bold">Last 30 days</DropdownMenuItem>
                                <DropdownMenuItem className="font-bold">Last 90 days</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#93ea7d" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#93ea7d" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#94a394' }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 12, fill: '#94a394' }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#1e293b',
                                            border: 'none',
                                            borderRadius: '16px',
                                            color: '#fff'
                                        }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="events"
                                        stroke="#6366f1"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorEvents)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </MotionCard>

                <MotionCard
                    variants={listItemVariants}
                    className="border-border/50"
                >
                    <CardHeader>
                        <CardTitle className="text-xl font-bold">Market Distribution</CardTitle>
                        <CardDescription>Studios by region</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[
                            { label: 'North America', value: 45, color: 'bg-primary-500' },
                            { label: 'Europe', value: 30, color: 'bg-emerald-400' },
                            { label: 'Asia Pacific', value: 15, color: 'bg-amber-400' },
                            { label: 'Others', value: 10, color: 'bg-slate-400' },
                        ].map((item, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">{item.label}</span>
                                    <span className="text-muted-foreground">{item.value}%</span>
                                </div>
                                <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${item.value}%` }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                        className={cn("h-full", item.color)}
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </MotionCard>
            </div>
        </motion.div>
    );
};

export default SuperAdminDashboard;
