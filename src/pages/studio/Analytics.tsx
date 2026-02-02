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
    Zap
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
import { cn } from '../../utils/cn';

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

const COLORS = ['#6366f1', '#8b5cf6', '#ec4899', '#f43f5e', '#f59e0b'];

const StatCard = ({ title, value, icon: Icon, trend, trendValue, color, delay }: any) => (
    <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay }}
        className="bg-card p-6 rounded-3xl border border-border shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group"
    >
        <div className="relative z-10">
            <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform group-hover:scale-110", color)}>
                <Icon size={24} />
            </div>
            <p className="text-muted-foreground text-sm font-medium">{title}</p>
            <div className="flex items-end gap-3 mt-1">
                <p className="text-3xl font-bold">{value}</p>
                <div className={cn(
                    "flex items-center text-xs font-bold px-2 py-0.5 rounded-full mb-1",
                    trend === 'up' ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"
                )}>
                    {trend === 'up' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                    {trendValue}%
                </div>
            </div>
        </div>
        <div className="absolute right-[-10%] bottom-[-10%] opacity-[0.03] group-hover:opacity-[0.06] transition-opacity">
            <Icon size={120} />
        </div>
    </motion.div>
);

const Analytics = () => {
    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Analytics Overview</h1>
                    <p className="text-muted-foreground mt-1">Track your studio performance across all events.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-secondary-bg hover:bg-card text-foreground px-4 py-2.5 rounded-xl text-sm font-medium border border-border transition-all">
                        <Calendar size={18} />
                        Last 30 Days
                    </button>
                    <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-primary-500/20">
                        <Filter size={18} />
                        Filters
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Registrations"
                    value="1,284"
                    icon={Users}
                    trend="up"
                    trendValue="12.5"
                    color="bg-primary-500/10 text-primary-500"
                    delay={0}
                />
                <StatCard
                    title="Gallery Visits"
                    value="42,590"
                    icon={Eye}
                    trend="up"
                    trendValue="8.2"
                    color="bg-accent-500/10 text-accent-500"
                    delay={0.1}
                />
                <StatCard
                    title="Image Views"
                    value="128,402"
                    icon={ImageIcon}
                    trend="up"
                    trendValue="15.8"
                    color="bg-emerald-500/10 text-emerald-500"
                    delay={0.2}
                />
                <StatCard
                    title="Downloads"
                    value="8,924"
                    icon={Download}
                    trend="up"
                    trendValue="4.3"
                    color="bg-amber-500/10 text-amber-500"
                    delay={0.3}
                />
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Engagement Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2 bg-card p-8 rounded-3xl border border-border shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Engagement Trends</h3>
                            <p className="text-sm text-muted-foreground">Daily activity across all platforms</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary-500"></span>
                                <span className="text-xs font-medium">Visits</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-accent-500"></span>
                                <span className="text-xs font-medium">Views</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorVisits" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                />
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: 'none',
                                        borderRadius: '16px',
                                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)',
                                        color: '#fff'
                                    }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area
                                    type="monotone"
                                    dataKey="visits"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorVisits)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="views"
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorViews)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Event Distribution */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-card p-8 rounded-3xl border border-border shadow-sm flex flex-col"
                >
                    <h3 className="text-lg font-bold mb-2">Event Performance</h3>
                    <p className="text-sm text-muted-foreground mb-8">Contribution by event type</p>

                    <div className="flex-1 flex items-center justify-center min-h-[250px]">
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
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {[0, 1, 2, 3].map((_, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>

                    <div className="space-y-3 mt-4">
                        {[
                            { label: 'Wedding', value: '45%', color: 'bg-[#6366f1]' },
                            { label: 'Corporate', value: '25%', color: 'bg-[#8b5cf6]' },
                            { label: 'Birthday', value: '15%', color: 'bg-[#ec4899]' },
                            { label: 'Portrait', value: '15%', color: 'bg-[#f43f5e]' },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between text-sm">
                                <div className="flex items-center gap-2">
                                    <div className={cn("w-2 h-2 rounded-full", item.color)}></div>
                                    <span className="text-muted-foreground">{item.label}</span>
                                </div>
                                <span className="font-bold">{item.value}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Registrations Chart */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-card p-8 rounded-3xl border border-border shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">New Registrations</h3>
                            <p className="text-sm text-muted-foreground">Monthly growth overview</p>
                        </div>
                        <TrendingUp size={20} className="text-primary-500" />
                    </div>
                    <div className="h-[250px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={data}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fontSize: 12, fill: '#64748b' }}
                                />
                                <Tooltip
                                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                                    contentStyle={{
                                        backgroundColor: '#1e293b',
                                        border: 'none',
                                        borderRadius: '16px',
                                        color: '#fff'
                                    }}
                                />
                                <Bar dataKey="registrations" fill="#6366f1" radius={[6, 6, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                {/* Top Events */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="bg-card p-8 rounded-3xl border border-border shadow-sm"
                >
                    <h3 className="text-lg font-bold mb-2">Top Performing Events</h3>
                    <p className="text-sm text-muted-foreground mb-8">Ranked by total engagement</p>

                    <div className="space-y-6">
                        {eventData.map((event, i) => (
                            <div key={i} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium text-foreground">{event.name}</span>
                                    <span className="font-bold text-primary-400">{event.total.toLocaleString()} units</span>
                                </div>
                                <div className="h-2 w-full bg-secondary-bg rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(event.total / 4500) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                                        className="h-full bg-linear-to-r from-primary-500 to-accent-500 rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>
            {/* Brand Visibility Row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-card p-8 rounded-3xl border border-border shadow-sm"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-bold">Brand Visibility</h3>
                        <p className="text-sm text-muted-foreground">Social media referrals and social shares</p>
                    </div>
                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                        <Share2 size={20} />
                    </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
                    {[
                        { name: 'Instagram', icon: Instagram, color: 'text-pink-500', bg: 'bg-pink-500/10', count: '12.4K', trend: '+14%' },
                        { name: 'YouTube', icon: Youtube, color: 'text-red-500', bg: 'bg-red-500/10', count: '8.2K', trend: '+8%' },
                        { name: 'Facebook', icon: Facebook, color: 'text-blue-600', bg: 'bg-blue-600/10', count: '15.1K', trend: '+5%' },
                        { name: 'LinkedIn', icon: Linkedin, color: 'text-blue-700', bg: 'bg-blue-700/10', count: '4.8K', trend: '+22%' },
                        { name: 'Twitter', icon: Twitter, color: 'text-slate-400', bg: 'bg-slate-400/10', count: '6.2K', trend: '+11%' },
                    ].map((platform, i) => (
                        <div key={i} className="flex flex-col items-center p-4 rounded-2xl bg-secondary-bg/50 border border-border/50 hover:border-primary-500/30 transition-all hover:translate-y-[-4px]">
                            <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center mb-3", platform.bg)}>
                                <platform.icon size={24} className={platform.color} />
                            </div>
                            <span className="text-sm font-medium text-muted-foreground">{platform.name}</span>
                            <span className="text-xl font-bold mt-1">{platform.count}</span>
                            <span className="text-xs font-bold text-emerald-500 mt-1">{platform.trend}</span>
                        </div>
                    ))}
                </div>
            </motion.div>
            {/* Organic Share Analytics Row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 pb-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.9 }}
                    className="lg:col-span-2 bg-card p-8 rounded-3xl border border-border shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Organic Growth Channels</h3>
                            <p className="text-sm text-muted-foreground">Where your content is being shared most</p>
                        </div>
                        <Zap size={20} className="text-amber-500 animate-pulse" />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        <div className="space-y-6">
                            {[
                                { name: 'WhatsApp', count: 4250, icon: MessageCircle, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                                { name: 'Direct Link', count: 2180, icon: Link, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                                { name: 'Email', count: 850, icon: Mail, color: 'text-rose-500', bg: 'bg-rose-500/10' },
                                { name: 'Other Social', count: 1240, icon: Share2, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                            ].map((channel, i) => (
                                <div key={i} className="flex items-center justify-between group">
                                    <div className="flex items-center gap-4">
                                        <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center transition-colors group-hover:scale-110", channel.bg)}>
                                            <channel.icon size={20} className={channel.color} />
                                        </div>
                                        <div>
                                            <p className="font-semibold">{channel.name}</p>
                                            <p className="text-xs text-muted-foreground">{((channel.count / 8520) * 100).toFixed(1)}% of total shares</p>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">{channel.count.toLocaleString()}</p>
                                        <p className="text-xs text-emerald-500 font-medium">+12%</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="flex items-center justify-center">
                            <div className="relative w-48 h-48">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={[
                                                { name: 'WhatsApp', value: 4250 },
                                                { name: 'Direct Link', value: 2180 },
                                                { name: 'Email', value: 850 },
                                                { name: 'Other', value: 1240 },
                                            ]}
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            <Cell fill="#10b981" />
                                            <Cell fill="#3b82f6" />
                                            <Cell fill="#f43f5e" />
                                            <Cell fill="#8b5cf6" />
                                        </Pie>
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center">
                                    <span className="text-2xl font-bold">8.5K</span>
                                    <span className="text-xs text-muted-foreground uppercase tracking-wider font-bold">Shares</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 1.0 }}
                    className="bg-card p-8 rounded-3xl border border-border shadow-sm flex flex-col"
                >
                    <h3 className="text-lg font-bold mb-2">Top Viral Photos</h3>
                    <p className="text-sm text-muted-foreground mb-6">Most shared individual assets</p>

                    <div className="flex-1 space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-secondary-bg transition-colors cursor-pointer group">
                                <div className="w-16 h-12 rounded-lg bg-secondary-bg overflow-hidden relative">
                                    <img
                                        src={`https://picsum.photos/seed/${i + 20}/100/100`}
                                        alt="Asset"
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                                    />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-bold truncate">IMG_024{i}.jpg</p>
                                    <div className="flex items-center gap-2 mt-0.5">
                                        <Share2 size={12} className="text-muted-foreground" />
                                        <span className="text-xs text-muted-foreground">{340 - (i * 45)} shares</span>
                                    </div>
                                </div>
                                <div className="text-emerald-500">
                                    <TrendingUp size={16} />
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-2.5 rounded-xl bg-secondary-bg hover:bg-primary-900/20 text-primary-400 text-sm font-bold transition-all">
                        View Detailed Share Report
                    </button>
                </motion.div>
            </div>
        </div>
    );
};

export default Analytics;
