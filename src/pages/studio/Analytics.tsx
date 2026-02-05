import {
    Users,
    Eye,
    Image as ImageIcon,
    Download,
    TrendingUp,
    ArrowUpRight,
    ArrowDownRight,
    Calendar,
    Filter,
    Instagram,
    Facebook,
    Youtube,
    Linkedin,
    Twitter,
    Share2,
    MessageCircle,
    Link,
    Mail,
    Zap,
    DownloadCloud,
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
    BarChart,
    Bar,
    Cell,
    PieChart,
    Pie
} from 'recharts';
import { motion } from 'framer-motion';
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

const data = [
    { name: 'Jan', registrations: 400, visits: 2400, views: 2400, downloads: 1200 },
    { name: 'Feb', registrations: 300, visits: 1398, views: 2210, downloads: 800 },
    { name: 'Mar', registrations: 200, visits: 9800, views: 2290, downloads: 2100 },
    { name: 'Apr', registrations: 278, visits: 3908, views: 2000, downloads: 1500 },
    { name: 'May', registrations: 189, visits: 4800, views: 2181, downloads: 1100 },
    { name: 'Jun', registrations: 239, visits: 3800, views: 2500, downloads: 1700 },
    { name: 'Jul', registrations: 349, visits: 4300, views: 2100, downloads: 1900 },
];

const eventData = [
    { name: 'Wedding: Sarah & James', total: 4500 },
    { name: 'TechConf 2024', total: 3200 },
    { name: 'Olivia\'s Birthday', total: 1200 },
    { name: 'Fashion Shoot', total: 2100 },
    { name: 'Graduation Day', total: 3800 },
];

const COLORS = ['#93ea7d', '#7deae3', '#d8ea7d', '#ea7d7d', '#7d9eea'];

const MotionCard = motion(Card);
const MotionButton = motion(Button);

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass, delay }: any) => (
    <motion.div
        variants={listItemVariants}
        className="group"
    >
        <Card className="border-border/50 shadow-sm glass overflow-hidden relative">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110", colorClass)}>
                        <Icon size={24} />
                    </div>
                </div>
                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-1.5">{title}</p>
                    <div className="flex items-end gap-3">
                        <p className="text-3xl font-black tracking-tight tracking-tighter">{value}</p>
                        <div className={cn(
                            "flex items-center text-[10px] font-black px-2 py-0.5 rounded-full mb-1 uppercase tracking-wider",
                            trend === 'up' ? "bg-success/10 text-success" : "bg-error/10 text-error"
                        )}>
                            {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                            {trendValue}%
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

const Analytics = () => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="space-y-8 max-w-7xl mx-auto pb-12"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div></div>
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-11 rounded-xl gap-2 font-black uppercase text-[10px] tracking-widest border-border/50">
                                <Calendar size={16} />
                                Last 30 Days
                                <ChevronDown size={14} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] rounded-xl glass border-border/50">
                            <DropdownMenuItem className="font-bold">Today</DropdownMenuItem>
                            <DropdownMenuItem className="font-bold">Last 7 Days</DropdownMenuItem>
                            <DropdownMenuItem className="font-bold">Last 30 Days</DropdownMenuItem>
                            <DropdownMenuItem className="font-bold">Last 12 Months</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <MotionButton
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="gap-2 h-11 rounded-xl bg-primary-500 hover:bg-primary-600 text-foreground shadow-lg shadow-primary-500/20 font-black uppercase text-[10px] tracking-widest"
                    >
                        <DownloadCloud size={16} />
                        Export Data
                    </MotionButton>
                </div>
            </div>

            {/* Stats Grid */}
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Registrations"
                    value="1,284"
                    icon={Users}
                    trend="up"
                    trendValue="12.5"
                    colorClass="bg-primary-500/10 text-primary-500"
                />
                <StatCard
                    title="Gallery Visits"
                    value="42,590"
                    icon={Eye}
                    trend="up"
                    trendValue="8.2"
                    colorClass="bg-info/10 text-info"
                />
                <StatCard
                    title="Image Views"
                    value="128,402"
                    icon={ImageIcon}
                    trend="up"
                    trendValue="15.8"
                    colorClass="bg-success/10 text-success"
                />
                <StatCard
                    title="Downloads"
                    value="8,924"
                    icon={Download}
                    trend="up"
                    trendValue="4.3"
                    colorClass="bg-warning/10 text-warning"
                />
            </motion.div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <MotionCard
                    variants={listItemVariants}
                    className="lg:col-span-2 border-border/50 glass"
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                        <div>
                            <CardTitle className="text-xl font-black uppercase tracking-tight">Engagement Flow</CardTitle>
                            <CardDescription className="font-bold text-xs uppercase opacity-70">Daily activity across all platforms</CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary-500"></span>
                                <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Visits</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-info"></span>
                                <span className="text-[10px] font-black uppercase tracking-wider text-muted-foreground">Views</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#93ea7d" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#93ea7d" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#8af5f1" stopOpacity={0.2} />
                                            <stop offset="95%" stopColor="#8af5f1" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: '#94a394', fontWeight: 900 }}
                                        dy={10}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: '#94a394', fontWeight: 900 }}
                                    />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #e2e5e2',
                                            borderRadius: '12px',
                                            boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
                                        }}
                                        labelStyle={{ fontWeight: 900, textTransform: 'uppercase', fontSize: '12px' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="visits"
                                        stroke="#93ea7d"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorVisits)"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="views"
                                        stroke="#8af5f1"
                                        strokeWidth={3}
                                        fillOpacity={1}
                                        fill="url(#colorViews)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </MotionCard>

                {/* Event Distribution */}
                <MotionCard
                    variants={listItemVariants}
                    className="border-border/50 glass p-6 flex flex-col"
                >
                    <CardHeader className="p-0 mb-6">
                        <CardTitle className="text-xl font-black uppercase tracking-tight text-center">Event Pulse</CardTitle>
                        <CardDescription className="font-bold text-xs uppercase opacity-70 text-center text-center">Capture types performance</CardDescription>
                    </CardHeader>
                    <CardContent className="p-0 flex flex-col flex-1">
                        <div className="flex-1 min-h-[220px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={[
                                            { name: 'Wedding', value: 45 },
                                            { name: 'Corporate', value: 25 },
                                            { name: 'Birthday', value: 15 },
                                            { name: 'Portrait', value: 15 },
                                        ]}
                                        innerRadius={60}
                                        outerRadius={85}
                                        paddingAngle={5}
                                        dataKey="value"
                                        stroke="none"
                                    >
                                        {[0, 1, 2, 3].map((_, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>

                        <div className="grid grid-cols-2 gap-3 mt-8">
                            {[
                                { label: 'Wedding', value: '45%', color: 'bg-[#93ea7d]' },
                                { label: 'Corporate', value: '25%', color: 'bg-[#7deae3]' },
                                { label: 'Birthday', value: '15%', color: 'bg-[#d8ea7d]' },
                                { label: 'Portrait', value: '15%', color: 'bg-[#ea7d7d]' },
                            ].map((item, i) => (
                                <div key={i} className="flex flex-col p-3 rounded-2xl bg-muted/30 border border-border/50">
                                    <div className="flex items-center gap-2 mb-1">
                                        <div className={cn("w-2 h-2 rounded-full", item.color)}></div>
                                        <span className="text-[10px] font-black uppercase text-muted-foreground tracking-wider">{item.label}</span>
                                    </div>
                                    <span className="text-lg font-black tracking-tighter">{item.value}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </MotionCard>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Registrations Chart */}
                <MotionCard
                    variants={listItemVariants}
                    className="border-border/50 shadow-sm glass"
                >
                    <CardHeader className="flex flex-row items-center justify-between pb-8">
                        <div>
                            <CardTitle className="text-lg font-black uppercase tracking-tight">Acquisition Velocity</CardTitle>
                            <CardDescription className="font-bold text-xs uppercase opacity-70">Lead generation growth</CardDescription>
                        </div>
                        <TrendingUp size={20} className="text-primary-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="h-[280px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={data}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                                    <XAxis
                                        dataKey="name"
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: '#94a394', fontWeight: 900 }}
                                    />
                                    <YAxis
                                        axisLine={false}
                                        tickLine={false}
                                        tick={{ fontSize: 10, fill: '#94a394', fontWeight: 900 }}
                                    />
                                    <Tooltip
                                        cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                                        contentStyle={{
                                            backgroundColor: '#ffffff',
                                            border: '1px solid #e2e5e2',
                                            borderRadius: '12px',
                                        }}
                                    />
                                    <Bar dataKey="registrations" fill="#93ea7d" radius={[6, 6, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </MotionCard>

                {/* Top Events */}
                <MotionCard
                    variants={listItemVariants}
                    className="border-border/50 shadow-sm glass"
                >
                    <CardHeader className="pb-8">
                        <CardTitle className="text-lg font-black uppercase tracking-tight text-center lg:text-left">Event Power Ranking</CardTitle>
                        <CardDescription className="font-bold text-xs uppercase opacity-70 text-center lg:text-left">Most engaging photography projects</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {eventData.map((event, i) => (
                            <div key={i} className="space-y-2 group">
                                <div className="flex justify-between text-sm">
                                    <span className="font-black uppercase text-[10px] tracking-widest text-foreground group-hover:text-primary-500 transition-colors">{event.name}</span>
                                    <span className="font-black text-xs tracking-tighter text-muted-foreground">{event.total.toLocaleString()} units</span>
                                </div>
                                <div className="h-2 w-full bg-muted/50 rounded-full overflow-hidden border border-border/30">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(event.total / 4500) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                                        className="h-full bg-primary-500 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </MotionCard>
            </div>
            {/* Brand Visibility Row */}
            <MotionCard
                variants={listItemVariants}
                className="border-border/50 shadow-sm glass"
            >
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-10">
                    <div>
                        <CardTitle className="text-xl font-black uppercase tracking-tight">Social Intelligence</CardTitle>
                        <CardDescription className="font-bold text-xs uppercase opacity-70">Brand reach and organic referral metrics</CardDescription>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                        <Share2 size={20} />
                    </div>
                </CardHeader>

                <CardContent>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                        {[
                            { name: 'Instagram', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/10', count: '12.4K', trend: '+14%' },
                            { name: 'YouTube', icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/10', count: '8.2K', trend: '+8%' },
                            { name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600/10', count: '15.1K', trend: '+5%' },
                            { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-700/10', count: '4.8K', trend: '+22%' },
                            { name: 'Twitter', icon: Twitter, color: 'text-foreground/80', bg: 'bg-foreground/5', count: '6.2K', trend: '+11%' },
                        ].map((platform, i) => (
                            <div key={i} className="flex flex-col items-center p-6 rounded-3xl bg-muted/20 border border-border/50 hover:border-primary-500/30 transition-all hover:translate-y-[-4px] group">
                                <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", platform.bg)}>
                                    <platform.icon size={28} className={platform.color} />
                                </div>
                                <span className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">{platform.name}</span>
                                <span className="text-2xl font-black tracking-tighter mt-1">{platform.count}</span>
                                <span className="text-[10px] font-black text-success mt-1.5 uppercase tracking-widest">{platform.trend}</span>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </MotionCard>
        </motion.div>
    );
};

export default Analytics;
