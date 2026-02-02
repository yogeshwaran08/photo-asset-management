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
    Globe
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
import { cn } from '../../utils/cn';

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
    { name: 'Desktop', value: 30, icon: Monitor, color: '#8b5cf6' },
    { name: 'Tablet', value: 5, icon: Tablet, color: '#ec4899' },
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

const SuperAdminAnalytics = () => {
    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Platform Analytics</h1>
                    <p className="text-muted-foreground mt-1">Comprehensive overview of platform performance and growth.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative hidden lg:block">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                        <input
                            type="text"
                            placeholder="Search studios..."
                            className="bg-card border border-border rounded-xl pl-10 pr-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/20 w-64"
                        />
                    </div>
                    <button className="flex items-center gap-2 bg-secondary-bg hover:bg-card text-foreground px-4 py-2.5 rounded-xl text-sm font-medium border border-border transition-all">
                        <Calendar size={18} />
                        Year to Date
                    </button>
                    <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-primary-500/20">
                        <Download size={18} />
                        Export Report
                    </button>
                </div>
            </div>

            {/* Platform Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard
                    title="Total Studios"
                    value="190"
                    icon={Building2}
                    trend="up"
                    trendValue="18.4"
                    color="bg-primary-500/10 text-primary-500"
                    delay={0}
                />
                <StatCard
                    title="Active Users"
                    value="8,942"
                    icon={Users}
                    trend="up"
                    trendValue="24.2"
                    color="bg-accent-500/10 text-accent-500"
                    delay={0.1}
                />
                <StatCard
                    title="Storage Used"
                    value="12.4 TB"
                    icon={HardDrive}
                    trend="up"
                    trendValue="12.8"
                    color="bg-emerald-500/10 text-emerald-500"
                    delay={0.2}
                />
                <StatCard
                    title="Monthly Revenue"
                    value="$19,000"
                    icon={CreditCard}
                    trend="up"
                    trendValue="15.3"
                    color="bg-amber-500/10 text-amber-500"
                    delay={0.3}
                />
            </div>

            {/* Growth Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="lg:col-span-2 bg-card p-8 rounded-3xl border border-border shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Growth Velocity</h3>
                            <p className="text-sm text-muted-foreground">Studios and Users onboarding trends</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-primary-500"></span>
                                <span className="text-xs font-medium">Studios</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="w-2.5 h-2.5 rounded-full bg-accent-500"></span>
                                <span className="text-xs font-medium">Users</span>
                            </div>
                        </div>
                    </div>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={growthData}>
                                <defs>
                                    <linearGradient id="colorStudios" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
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
                                    dataKey="studios"
                                    stroke="#6366f1"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorStudios)"
                                />
                                <Area
                                    type="monotone"
                                    dataKey="users"
                                    stroke="#8b5cf6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorUsers)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.5 }}
                    className="bg-card p-8 rounded-3xl border border-border shadow-sm flex flex-col"
                >
                    <h3 className="text-lg font-bold mb-2">Device Distribution</h3>
                    <p className="text-sm text-muted-foreground mb-8">Access patterns and device types</p>

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
                                <Globe className="text-muted-foreground mb-1" size={24} />
                                <span className="text-xl font-bold">Global</span>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4 mt-6">
                        {deviceData.map((item, i) => (
                            <div key={i} className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center bg-secondary-bg")}>
                                        <item.icon size={18} style={{ color: item.color }} />
                                    </div>
                                    <span className="text-sm font-medium text-muted-foreground">{item.name}</span>
                                </div>
                                <div className="text-right">
                                    <span className="font-bold">{item.value}%</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </div>

            {/* Bottom Row - Studio Performance & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-card p-8 rounded-3xl border border-border shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Top Performing Studios</h3>
                            <p className="text-sm text-muted-foreground">Based on events and engagement</p>
                        </div>
                        <TrendingUp size={20} className="text-primary-500" />
                    </div>

                    <div className="space-y-6">
                        {studioPerformance.map((studio, i) => (
                            <div key={i} className="group cursor-pointer">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-3">
                                        <div className="w-10 h-10 rounded-xl bg-secondary-bg flex items-center justify-center text-primary-500 font-bold">
                                            {studio.name.charAt(0)}
                                        </div>
                                        <div>
                                            <p className="font-bold group-hover:text-primary-500 transition-colors">{studio.name}</p>
                                            <p className="text-xs text-muted-foreground">{studio.status} Plan</p>
                                        </div>
                                    </div>
                                    <div className="text-right text-sm">
                                        <p className="font-bold">{studio.events} Events</p>
                                        <p className="text-xs text-muted-foreground">{studio.storage} TB Used</p>
                                    </div>
                                </div>
                                <div className="h-2 w-full bg-secondary-bg rounded-full overflow-hidden">
                                    <motion.div
                                        initial={{ width: 0 }}
                                        animate={{ width: `${(studio.events / 210) * 100}%` }}
                                        transition={{ duration: 1, delay: 0.8 + (i * 0.1) }}
                                        style={{ backgroundColor: COLORS[i % COLORS.length] }}
                                        className="h-full rounded-full"
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.7 }}
                    className="bg-card p-8 rounded-3xl border border-border shadow-sm"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Recent System Activity</h3>
                            <p className="text-sm text-muted-foreground">Real-time platform logs</p>
                        </div>
                        <Activity size={20} className="text-accent-500 animate-pulse" />
                    </div>

                    <div className="space-y-6">
                        {[
                            { user: 'Sarah Klein', action: 'New Studio Signup', studio: 'Klein Photography', time: '2 mins ago', icon: Building2, color: 'text-primary-500', bg: 'bg-primary-500/10' },
                            { user: 'System', action: 'Storage Limit Reached', studio: 'Pixel Perfect', time: '15 mins ago', icon: HardDrive, color: 'text-rose-500', bg: 'bg-rose-500/10' },
                            { user: 'James Wilson', action: 'Plan Upgrade', studio: 'Wilson Media', time: '45 mins ago', icon: CreditCard, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                            { user: 'Emma Stone', action: 'New Event Created', studio: 'Lumina Studios', time: '1 hour ago', icon: Activity, color: 'text-amber-500', bg: 'bg-amber-500/10' },
                            { user: 'System', action: 'Monthly Invoice Generated', studio: '142 Studios', time: '3 hours ago', icon: CreditCard, color: 'text-violet-500', bg: 'bg-violet-500/10' },
                        ].map((activity, i) => (
                            <div key={i} className="flex items-start gap-4">
                                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center shrink-0", activity.bg)}>
                                    <activity.icon size={20} className={activity.color} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center justify-between">
                                        <p className="text-sm font-bold">{activity.action}</p>
                                        <span className="text-[10px] text-muted-foreground uppercase font-bold">{activity.time}</span>
                                    </div>
                                    <p className="text-xs text-muted-foreground">
                                        <span className="font-medium text-foreground">{activity.user}</span> from {activity.studio}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>

                    <button className="w-full mt-6 py-2.5 rounded-xl bg-secondary-bg hover:bg-primary-900/20 text-primary-400 text-sm font-bold transition-all">
                        View Audit Logs
                    </button>
                </motion.div>
            </div>

            {/* Global Reach Row */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
                className="bg-card p-8 rounded-3xl border border-border shadow-sm"
            >
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-bold">Revenue Forecasting</h3>
                        <p className="text-sm text-muted-foreground">Projected growth vs actual performance</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                            <span className="w-2.5 h-2.5 rounded-full bg-primary-500"></span>
                            <span className="text-xs font-medium">Actual</span>
                        </div>
                        <div className="border-t-2 border-dashed border-primary-500/50 w-8 mx-1"></div>
                        <span className="text-xs font-medium">Forecast</span>
                    </div>
                </div>

                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={growthData}>
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
                                contentStyle={{
                                    backgroundColor: '#1e293b',
                                    border: 'none',
                                    borderRadius: '16px',
                                    color: '#fff'
                                }}
                            />
                            <Line
                                type="monotone"
                                dataKey="revenue"
                                stroke="#6366f1"
                                strokeWidth={3}
                                dot={{ fill: '#6366f1', strokeWidth: 2, r: 4 }}
                                activeDot={{ r: 6, strokeWidth: 0 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>
        </div>
    );
};

export default SuperAdminAnalytics;
