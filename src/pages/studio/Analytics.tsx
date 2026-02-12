import {
    Users,
    Eye,
    Image as ImageIcon,
    Download,
    TrendingUp,
    Calendar,
    Instagram,
    Facebook,
    Youtube,
    Linkedin,
    Twitter,
    Share2,
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
} from '@/lib/motion-config';
import StatCard from '@/components/studio/analytics/StatCard';

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



const Analytics = () => {
    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="space-y-8 pb-12"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div></div>
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-10 rounded-xl gap-2 font-black uppercase text-[10px] tracking-widest border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50">
                                <Calendar size={16} />
                                Last 30 Days
                                <ChevronDown size={14} />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] rounded-xl bg-white border-zinc-200 shadow-lg p-1.5">
                            <DropdownMenuItem className="font-bold text-xs uppercase tracking-wide rounded-lg cursor-pointer focus:bg-zinc-100">Today</DropdownMenuItem>
                            <DropdownMenuItem className="font-bold text-xs uppercase tracking-wide rounded-lg cursor-pointer focus:bg-zinc-100">Last 7 Days</DropdownMenuItem>
                            <DropdownMenuItem className="font-bold text-xs uppercase tracking-wide rounded-lg cursor-pointer focus:bg-zinc-100">Last 30 Days</DropdownMenuItem>
                            <DropdownMenuItem className="font-bold text-xs uppercase tracking-wide rounded-lg cursor-pointer focus:bg-zinc-100">Last 12 Months</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                    <MotionButton
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="gap-2 h-10 rounded-xl bg-[#F27963] hover:bg-[#d65f4d] text-white shadow-lg shadow-[#F27963]/20 font-black uppercase text-[10px] tracking-widest border-0"
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
                    colorClass="bg-[#F27963]/10 text-[#F27963]"
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
                    colorClass="bg-[#F27963]/10 text-[#F27963]"
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
                    className="lg:col-span-2 border-zinc-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] bg-white/80 backdrop-blur-sm rounded-xl"
                >
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-7">
                        <div>
                            <CardTitle className="text-lg font-black uppercase tracking-tight text-slate-800">Engagement Flow</CardTitle>
                            <CardDescription className="font-bold text-xs uppercase opacity-50 tracking-wide">Daily activity across all platforms</CardDescription>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-[#F27963]"></span>
                                <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">Visits</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                                <span className="text-[9px] font-black uppercase tracking-wider text-muted-foreground">Views</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[350px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={data}>
                                    <defs>
                                        <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#F27963" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#F27963" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#22d3ee" stopOpacity={0.15} />
                                            <stop offset="95%" stopColor="#22d3ee" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(0,0,0,0.03)" />
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
                                            backgroundColor: '#ffffff',
                                            borderColor: 'rgba(0,0,0,0.05)',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                                            fontSize: '12px',
                                            fontWeight: '700',
                                            textTransform: 'uppercase'
                                        }}
                                        itemStyle={{ padding: 0 }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="visits"
                                        stroke="#F27963"
                                        strokeWidth={2.5}
                                        fillOpacity={1}
                                        fill="url(#colorVisits)"
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#F27963' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="views"
                                        stroke="#22d3ee"
                                        strokeWidth={2.5}
                                        fillOpacity={1}
                                        fill="url(#colorViews)"
                                        activeDot={{ r: 6, strokeWidth: 0, fill: '#22d3ee' }}
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </MotionCard>

                {/* Event Distribution */}
                <MotionCard
                    variants={listItemVariants}
                    className="border-zinc-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] bg-white/80 backdrop-blur-sm p-6 flex flex-col rounded-xl"
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
                                <div key={i} className="flex flex-col p-3 rounded-xl bg-orange-50/30 border border-orange-100/50">
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
                    className="border-zinc-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] bg-white/80 backdrop-blur-sm rounded-xl"
                >
                    <CardHeader className="flex flex-row items-center justify-between pb-8">
                        <div>
                            <CardTitle className="text-lg font-black uppercase tracking-tight">Acquisition Velocity</CardTitle>
                            <CardDescription className="font-bold text-xs uppercase opacity-70">Lead generation growth</CardDescription>
                        </div>
                        <TrendingUp size={20} className="text-[#F27963]" />
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
                                    <Bar dataKey="registrations" fill="#F27963" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </MotionCard>

                {/* Top Events */}
                <MotionCard
                    variants={listItemVariants}
                    className="border-zinc-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] bg-white/80 backdrop-blur-sm rounded-xl"
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
                    <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center text-[#F27963]">
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
                            <div key={i} className="flex flex-col items-center p-6 rounded-xl bg-white border border-zinc-200 hover:border-orange-200 transition-all hover:translate-y-[-2px] hover:shadow-lg hover:shadow-orange-500/5 group">
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
