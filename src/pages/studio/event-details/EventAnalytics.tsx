import { useState } from 'react';
import { motion } from 'framer-motion';
import { Area, AreaChart, CartesianGrid, Cell, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import {
    Eye,
    Download,
    UserCheck,
    Share2,
    TrendingUp,
    Smartphone
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { EventHeader } from './EventHeader';

const MOCK_ACTIVITY_DATA = [
    { name: 'Mon', views: 4000, downloads: 2400 },
    { name: 'Tue', views: 3000, downloads: 1398 },
    { name: 'Wed', views: 2000, downloads: 9800 },
    { name: 'Thu', views: 2780, downloads: 3908 },
    { name: 'Fri', views: 1890, downloads: 4800 },
    { name: 'Sat', views: 2390, downloads: 3800 },
    { name: 'Sun', views: 3490, downloads: 4300 },
];

const MOCK_DEVICE_DATA = [
    { name: 'Mobile', value: 400, color: '#f97316' },
    { name: 'Desktop', value: 300, color: '#3b82f6' },
    { name: 'Tablet', value: 300, color: '#10b981' },
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white/90 backdrop-blur-md p-3 rounded-xl border border-border/50 shadow-xl">
                <p className="text-[10px] font-black uppercase tracking-wider text-muted-foreground mb-1">{label}</p>
                {payload.map((entry: any, index: number) => (
                    <div key={index} className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: entry.color }} />
                        <p className="text-[10px] font-bold text-zinc-700">
                            {entry.name}: <span className="font-black">{entry.value.toLocaleString()}</span>
                        </p>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

const EventAnalytics = () => {
    const [analyticsPeriod, setAnalyticsPeriod] = useState('7d');

    return (
        <div className="flex flex-col h-full w-full">
            <EventHeader
                actions={
                    <div className="flex bg-white/50 p-1 rounded-xl border border-border/40 shadow-sm backdrop-blur-sm">
                        {['7d', '30d', '90d'].map((period) => (
                            <button
                                key={period}
                                onClick={() => setAnalyticsPeriod(period)}
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all",
                                    analyticsPeriod === period ? "bg-zinc-800 text-white shadow-md" : "text-muted-foreground hover:bg-zinc-50/50 hover:text-zinc-900"
                                )}
                            >
                                {period}
                            </button>
                        ))}
                    </div>
                }
            >
                <div className="space-y-1">
                    <h2 className="text-xl font-black text-zinc-800 tracking-tight">Analytics Overview</h2>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Event Performance & Engagement</p>
                </div>
            </EventHeader>

            <div className="flex-1 w-full overflow-y-auto">
                <div className="w-full max-w-7xl mx-auto space-y-8 p-12 pb-24">
                    {/* Summary Cards */}
                    <div className="grid grid-cols-4 gap-6">
                        {[
                            { title: 'Total Views', value: '24.5k', change: '+12%', icon: Eye, color: 'text-blue-500', bg: 'bg-blue-500/10' },
                            { title: 'Total Downloads', value: '12.1k', change: '+8%', icon: Download, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                            { title: 'Face Searches', value: '854', change: '+24%', icon: UserCheck, color: 'text-orange-500', bg: 'bg-orange-500/10' },
                            { title: 'Shares', value: '2.3k', change: '-2%', icon: Share2, color: 'text-purple-500', bg: 'bg-purple-500/10' },
                        ].map((stat, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-5 rounded-[1.5rem] border border-border/40 shadow-sm flex flex-col justify-between h-32 relative overflow-hidden group hover:shadow-md transition-all"
                            >
                                <div className="flex justify-between items-start z-10">
                                    <div className={cn("p-2 rounded-xl", stat.bg, stat.color)}>
                                        <stat.icon size={16} />
                                    </div>
                                    <span className={cn("text-[9px] font-black py-1 px-2 rounded-lg bg-zinc-50", stat.change.startsWith('+') ? "text-emerald-600" : "text-red-500")}>
                                        {stat.change}
                                    </span>
                                </div>
                                <div className="z-10">
                                    <div className="text-2xl font-black text-zinc-900 tracking-tight">{stat.value}</div>
                                    <div className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider mt-1">{stat.title}</div>
                                </div>
                                <div className={cn("absolute -right-4 -bottom-4 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-500", stat.color)}>
                                    <stat.icon size={80} />
                                </div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Charts Row 1 */}
                    <div className="grid grid-cols-3 gap-6">
                        {/* Activity Chart */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4 }}
                            className="col-span-2 bg-white p-6 rounded-[2rem] border border-border/40 shadow-sm"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="p-2 bg-zinc-100 rounded-xl">
                                        <TrendingUp size={16} className="text-zinc-700" />
                                    </div>
                                    <div>
                                        <h3 className="text-sm font-bold text-zinc-900">Engagement Overview</h3>
                                        <p className="text-[10px] font-medium text-muted-foreground">Views vs Downloads over time</p>
                                    </div>
                                </div>
                            </div>
                            <div className="h-[280px] w-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <AreaChart data={MOCK_ACTIVITY_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                                        <defs>
                                            <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                            </linearGradient>
                                            <linearGradient id="colorDownloads" x1="0" y1="0" x2="0" y2="1">
                                                <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                                <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                            </linearGradient>
                                        </defs>
                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f4f4f5" />
                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa', fontWeight: 700 }} dy={10} />
                                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#a1a1aa', fontWeight: 700 }} />
                                        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                        <Area type="monotone" dataKey="views" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorViews)" />
                                        <Area type="monotone" dataKey="downloads" stroke="#10b981" strokeWidth={3} fillOpacity={1} fill="url(#colorDownloads)" />
                                    </AreaChart>
                                </ResponsiveContainer>
                            </div>
                        </motion.div>

                        {/* Device Breakdown */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5 }}
                            className="bg-white p-6 rounded-[2rem] border border-border/40 shadow-sm flex flex-col"
                        >
                            <div className="flex items-center gap-3 mb-6">
                                <div className="p-2 bg-zinc-100 rounded-xl">
                                    <Smartphone size={16} className="text-zinc-700" />
                                </div>
                                <div>
                                    <h3 className="text-sm font-bold text-zinc-900">Device Usage</h3>
                                    <p className="text-[10px] font-medium text-muted-foreground">By platform</p>
                                </div>
                            </div>
                            <div className="flex-1 relative min-h-[200px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={MOCK_DEVICE_DATA}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                            stroke="none"
                                        >
                                            {MOCK_DEVICE_DATA.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                    </PieChart>
                                </ResponsiveContainer>
                                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                                    <span className="text-2xl font-black text-zinc-800">100%</span>
                                    <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-wider">Traffic</span>
                                </div>
                            </div>
                            <div className="flex flex-col gap-3 mt-4">
                                {MOCK_DEVICE_DATA.map((device, i) => (
                                    <div key={i} className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: device.color }} />
                                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">{device.name}</span>
                                        </div>
                                        <span className="text-[10px] font-black text-zinc-800">{((device.value / 1000) * 100).toFixed(0)}%</span>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventAnalytics;
