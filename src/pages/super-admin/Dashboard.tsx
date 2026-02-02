import {
    Users,
    Camera,
    HardDrive,
    ArrowUpRight,
    ArrowDownRight,
    Clock
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
import { cn } from '../../utils/cn';

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
    <div className="bg-card p-6 rounded-2xl border border-border shadow-sm transition-all hover:shadow-md">
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
    </div>
);

const SuperAdminDashboard = () => {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                    color="bg-accent-500"
                />
                <StatCard
                    title="Total Storage"
                    value="4.2 TB"
                    icon={HardDrive}
                    trend="up"
                    trendValue="+5%"
                    color="bg-emerald-500"
                />
                <StatCard
                    title="Active Events"
                    value="842"
                    icon={Clock}
                    trend="down"
                    trendValue="-2%"
                    color="bg-amber-500"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 bg-card p-8 rounded-3xl border border-border shadow-sm">
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h2 className="text-xl font-bold">Platform Growth</h2>
                            <p className="text-muted-foreground text-sm">Event creation and storage trends</p>
                        </div>
                        <select className="bg-muted border-none rounded-lg px-3 py-1 text-sm text-foreground">
                            <option>Last 7 days</option>
                            <option>Last 30 days</option>
                        </select>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={data}>
                                <defs>
                                    <linearGradient id="colorEvents" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#334155" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 12 }} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: '#fff', borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                                />
                                <Area type="monotone" dataKey="events" stroke="#3B82F6" strokeWidth={3} fillOpacity={1} fill="url(#colorEvents)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                    <h2 className="text-xl font-bold mb-6">Market Distribution</h2>
                    <div className="space-y-6">
                        {[
                            { name: 'Weddings', value: 45, color: 'bg-primary-500' },
                            { name: 'Birthdays', value: 25, color: 'bg-accent-500' },
                            { name: 'Corporate', value: 20, color: 'bg-emerald-500' },
                            { name: 'Others', value: 10, color: 'bg-muted' },
                        ].map((item) => (
                            <div key={item.name} className="space-y-2">
                                <div className="flex justify-between text-sm">
                                    <span className="font-medium">{item.name}</span>
                                    <span className="text-muted-foreground">{item.value}%</span>
                                </div>
                                <div className="w-full bg-muted h-2 rounded-full overflow-hidden">
                                    <div className={cn("h-full rounded-full", item.color)} style={{ width: `${item.value}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminDashboard;
