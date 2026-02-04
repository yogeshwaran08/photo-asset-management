import {
    Users,
    Building2,
    HardDrive,
    CreditCard,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Activity,
    Search,
    Download,
    Monitor,
    Smartphone,
    Tablet,
    Globe,
    ChevronDown
} from 'lucide-react';
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie,
    LineChart,
    Line
} from 'recharts';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
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

const MotionCard = motion(Card);
const MotionButton = motion(Button);

// Mock data for Platform Growth
const growthData = [
    { name: 'Jan', studios: 45, users: 1200, revenue: 4500 },
    { name: 'Feb', studios: 52, users: 1560, revenue: 5200 },
    { name: 'Mar', studios: 68, users: 2100, revenue: 6800 },
    { name: 'Apr', studios: 85, users: 3400, revenue: 8500 },
    { name: 'May', studios: 110, users: 4800, revenue: 11000 },
    { name: 'Jun', studios: 145, users: 6200, revenue: 14500 },
    { name: 'Jul', studios: 190, users: 8900, revenue: 19000 },
];

// Mock data for Studio Performance
const studioPerformance = [
    { name: 'Lumina Studios', events: 145, storage: 1.2, status: 'Premium' },
    { name: 'Horizon Photo', events: 89, storage: 0.8, status: 'Pro' },
    { name: 'Stellar Captures', events: 210, storage: 2.1, status: 'Premium' },
    { name: 'Dreamy Weddings', events: 65, storage: 0.4, status: 'Basic' },
    { name: 'Vogue Motion', events: 124, storage: 1.5, status: 'Pro' },
];

// Mock data for Device distribution
const deviceData = [
    { name: 'Mobile', value: 65, icon: Smartphone, color: '#6366f1' },
    { name: 'Desktop', value: 30, icon: Monitor, color: '#3B82F6' },
    { name: 'Tablet', value: 5, icon: Tablet, color: '#A855F7' },
];

const COLORS = ['#6366f1', '#3B82F6', '#A855F7', '#F43F5E', '#10B981'];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass }: any) => (
    <MotionCard
        variants={listItemVariants}
        whileHover={{ y: -5, transition: springTransition }}
        className="p-6 border-border/50 shadow-sm relative overflow-hidden group"
    >
        <div className="relative z-10">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", colorClass)}>
                <Icon size={24} />
            </div>
            <p className="text-muted-foreground text-[10px] font-black uppercase tracking-widest">{title}</p>
            <div className="flex items-end gap-3 mt-1">
                <p className="text-3xl font-black tracking-tight">{value}</p>
                <div className={cn(
                    "flex items-center text-[10px] font-black px-2 py-0.5 rounded-full mb-1 uppercase tracking-tight",
                    trend === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                )}>
                    {trend === 'up' ? <ArrowUpRight size={12} className="mr-0.5" /> : <ArrowDownRight size={12} className="mr-0.5" />}
                    {trendValue}%
                </div>
            </div>
        </div>
        <div className="absolute right-[-10%] bottom-[-10%] opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
            <Icon size={120} />
        </div>
    </MotionCard>
);

const SuperAdminAnalytics = () => {
    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8 max-w-7xl mx-auto pb-12"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Platform Analytics</h1>
                    <p className="text-muted-foreground mt-1 font-medium">Comprehensive overview of platform performance and growth.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden lg:block group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary-500 transition-colors" size={18} />
                        <Input
                            placeholder="Search metrics..."
                            className="pl-10 w-64 h-11 bg-card border-border/50 rounded-xl"
                        />
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="gap-2 h-11 px-5 rounded-xl font-bold border-border/50">
                                <Calendar size={18} />
                                Year to Date
                                <ChevronDown size={14} className="text-muted-foreground ml-1" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] rounded-xl border-border shadow-xl">
                            <DropdownMenuItem className="font-bold">Last 7 Days</DropdownMenuItem>
                            <DropdownMenuItem className="font-bold">Last 30 Days</DropdownMenuItem>
                            <DropdownMenuItem className="font-bold">Year to Date</DropdownMenuItem>
                            <DropdownMenuItem className="font-bold">Last 12 Months</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <MotionButton
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="gap-2 h-11 rounded-xl bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20 font-bold"
                    >
                        <Download size={18} />
                        Export Report
                    </MotionButton>
                </div>
            </div>

            {/* Platform Stats */}
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Studios"
                    value="190"
                    icon={Building2}
                    trend="up"
                    trendValue="18.4"
                    colorClass="bg-primary-500/10 text-primary-500"
                />
                <StatCard
                    title="Active Users"
                    value="8,942"
                    icon={Users}
                    trend="up"
                    trendValue="24.2"
                    colorClass="bg-info/10 text-info"
                />
                <StatCard
                    title="Storage Used"
                    value="12.4 TB"
                    icon={HardDrive}
                    trend="up"
                    trendValue="12.8"
                    colorClass="bg-success/10 text-success"
                />
                <StatCard
                    title="Monthly Revenue"
                    value="$19,000"
                    icon={CreditCard}
                    trend="up"
                    trendValue="15.3"
                    colorClass="bg-warning/10 text-warning"
                />
            </motion.div>

            {/* Growth Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <MotionCard
                    variants={listItemVariants}
                    className="lg:col-span-2 p-8 border-border/50 shadow-sm"
                >
                    <CardHeader className="p-0 mb-8 flex flex-row items-center justify-between bg-transparent border-none">
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tight">Growth Velocity</CardTitle>
                            <CardDescription className="text-sm font-medium">Studios and Users onboarding trends</CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary-500"></span>
                                <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Studios</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-info"></span>
                                <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Users</span>
                            </div>
                        </div>
                    </CardHeader>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorStudios" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#93ea7d" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#93ea7d" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8af5f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8af5f1" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 700 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 10, fill: '#64748b', fontWeight: 700 }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#111',
                                        border: '1px solid #334155',
                                        borderRadius: '16px',
                                        color: '#fff'
                                    }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="studios"
                                    stroke="#6366f1"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorStudios)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#3B82F6"
                                    strokeWidth={4}
                                    fillOpacity={1}
                                    fill="url(#colorUsers)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </MotionCard>

                <MotionCard
                    variants={listItemVariants}
                    className="p-8 border-border/50 shadow-sm flex flex-col"
                >
                    <div className="mb-8">
                        <CardTitle className="text-xl font-black uppercase tracking-tight mb-2">Device Distribution</CardTitle>
                        <CardDescription className="text-sm font-medium">Access patterns and device types</CardDescription>
                    </div>

                    <div className="flex-1 flex items-center justify-center min-h-[250px]">
                        <div className="relative w-48 h-48">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={deviceData}
                                        innerRadius={65}
                                        outerRadius={85}
                                        paddingAngle={8}
                                        dataKey="value"
                                    >
                                        {deviceData.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                            <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <Globe className="text-primary-500/50 mb-1" size={24} />
                                <span className="text-[10px] font-black uppercase text-muted-foreground">Traffic</span>
                                <span className="text-xl font-black tracking-tighter uppercase">Global</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mt-6">
                        {deviceData.map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-2 rounded-xl border border-transparent hover:border-border/50 hover:bg-muted/30 transition-all">
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-muted/50")}>
                                        <item.icon size={18} style={{ color: item.color }} />
                                    </div>
                                    <span className="text-xs font-black uppercase tracking-tight text-muted-foreground">{item.name}</span>
                                </div>
                                <div className="text-right">
                                    <span className="font-black text-lg tracking-tighter">{item.value}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </MotionCard>
            </div>

            {/* Bottom Row - Studio Performance & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MotionCard
                    variants={listItemVariants}
                    className="p-8 border-border/50 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tight">Top Performance</CardTitle>
                            <CardDescription className="text-sm font-medium">Based on events and engagement</CardDescription>
                        </div>
                        <TrendingUp size={20} className="text-primary-500" />
                    </div>

                    <div className="space-y-6">
                        {studioPerformance.map((studio, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-primary-500 font-black text-lg border border-border">
                                            {studio.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-black text-sm uppercase tracking-tight group-hover:text-primary-500 transition-colors">{studio.name}</p>
                                            <p className="text-[9px] font-black uppercase text-muted-foreground opacity-70">{studio.status} Plan</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-black text-sm">{studio.events} <span className="text-[10px] text-muted-foreground font-medium uppercase">Events</span></p>
                                        <p className="text-[10px] font-bold text-muted-foreground">{studio.storage} TB <span className="uppercase opacity-50">Used</span></p>
                                    </div>
                                </div>
                                <div className="h-1.5 w-full bg-muted/50 rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(studio.events / 210) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.5 + (i * 0.1) }}
                                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                        className="h-full rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </MotionCard>

                <MotionCard
                    variants={listItemVariants}
                    className="p-8 border-border/50 shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tight">System Activity</CardTitle>
                            <CardDescription className="text-sm font-medium">Real-time platform logs</CardDescription>
                        </div>
                        <Activity size={20} className="text-primary-400 animate-pulse" />
                    </div>

                    <div className="space-y-6">
                        {[
                            { user: 'Sarah Klein', action: 'New Studio Signup', studio: 'Klein Photography', time: '2 mins ago', icon: Building2, color: 'text-primary-500', bg: 'bg-primary-500/10' },
                            { user: 'System', action: 'Storage Limit Reached', studio: 'Pixel Perfect', time: '15 mins ago', icon: HardDrive, color: 'text-rose-500', bg: 'bg-rose-500/10' },
                            { user: 'James Wilson', action: 'Plan Upgrade', studio: 'Wilson Media', time: '45 mins ago', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                            { user: 'Emma Stone', action: 'New Event Created', studio: 'Lumina Studios', time: '1 hour ago', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                            { user: 'System', action: 'Invoice Generated', studio: '142 Studios', time: '3 hours ago', icon: CreditCard, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-start gap-4 p-2 rounded-2xl hover:bg-muted/30 transition-all border border-transparent hover:border-border/30">
                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm", activity.bg)}>
                                    <activity.icon size={20} className={activity.color} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-black uppercase tracking-tight">{activity.action}</p>
                                        <Badge variant="outline" className="text-[8px] text-muted-foreground uppercase font-black">{activity.time}</Badge>
                                    </div>
                                    <p className="text-[11px] text-muted-foreground font-medium">
                                        <span className="font-black text-foreground">{activity.user}</span> • {activity.studio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <Button variant="ghost" className="w-full mt-6 h-11 border border-border/50 text-primary-500 font-bold hover:bg-primary-500/10 transition-all rounded-xl">
                        View Audit Logs
                    </Button>
                </MotionCard>
            </div>

            {/* Global Reach Row */}
            <MotionCard
                variants={listItemVariants}
                className="p-8 border-border/50 shadow-sm"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <CardTitle className="text-xl font-black uppercase tracking-tight">Revenue Forecasting</CardTitle>
                        <CardDescription className="text-sm font-medium">Projected growth vs actual performance</CardDescription>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-primary-500"></span>
                            <span className="text-[10px] font-black uppercase text-muted-foreground">Actual</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full border-2 border-primary-500/50 bg-transparent"></span>
                            <span className="text-[10px] font-black uppercase text-muted-foreground">Forecast</span>
                        </div>
                    </div>
                </div>

                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={growthData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 700 }}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fontSize: 10, fill: '#64748b', fontWeight: 700 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: '#111',
                                    border: '1px solid #334155',
                                    borderRadius: '16px',
                                    color: '#fff'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#6366f1"
                                strokeWidth={4}
                                dot={{ fill: '#6366f1', strokeWidth: 0, r: 6 }}
                                activeDot={{ r: 8, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </MotionCard>
        </motion.div>
    );
};

export default SuperAdminAnalytics;
