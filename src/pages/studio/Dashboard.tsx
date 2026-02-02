import {
    Camera,
    Eye,
    HardDrive,
    Plus,
    MoreVertical,
    ExternalLink,
    Calendar,
    MapPin
} from 'lucide-react';
import { MOCK_EVENTS } from '../../utils/mockData';
import { cn } from '../../utils/cn';

const StudioDashboard = () => {
    return (
        <div className="space-y-10 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Welcome back, Luminary Studios!</h1>
                    <p className="text-slate-500 mt-1">Here's what's happening with your events today.</p>
                </div>
                <button className="flex items-center gap-2 bg-gradient-to-r from-primary-600 to-accent-600 hover:opacity-90 text-white px-6 py-3 rounded-2xl font-semibold transition-all shadow-xl shadow-primary-600/20 active:scale-95">
                    <Plus size={20} strokeWidth={3} />
                    Create New Event
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {[
                    { title: 'Total Events', value: '24', icon: Camera, color: 'text-primary-600', bg: 'bg-primary-50' },
                    { title: 'Total Photos', value: '8,420', icon: Camera, color: 'text-accent-600', bg: 'bg-accent-50' },
                    { title: 'Guest Visits', value: '12,540', icon: Eye, color: 'text-emerald-600', bg: 'bg-emerald-50' },
                    { title: 'Storage Used', value: '156 GB', icon: HardDrive, color: 'text-amber-600', bg: 'bg-amber-50' },
                ].map((stat, i) => (
                    <div key={i} className="bg-white dark:bg-slate-900 p-6 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-sm">
                        <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-transform hover:scale-110", stat.bg)}>
                            <stat.icon size={24} className={stat.color} />
                        </div>
                        <p className="text-slate-500 text-sm font-medium">{stat.title}</p>
                        <p className="text-2xl font-bold mt-1">{stat.value}</p>
                    </div>
                ))}
            </div>

            <div>
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl font-bold">Recent Events</h2>
                    <button className="text-primary-600 font-medium text-sm hover:underline">View All</button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {MOCK_EVENTS.map((event) => (
                        <div key={event.id} className="group bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={event.thumbnail}
                                    alt={event.name}
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute top-4 right-4">
                                    <span className={cn(
                                        "px-3 py-1 rounded-full text-xs font-bold backdrop-blur-md shadow-sm",
                                        event.status === 'published' ? "bg-emerald-500/90 text-white" : "bg-slate-700/90 text-white"
                                    )}>
                                        {event.status.toUpperCase()}
                                    </span>
                                </div>
                            </div>
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-2 text-xs font-bold text-primary-600 uppercase tracking-wider">
                                    <span>{event.type}</span>
                                </div>
                                <h3 className="text-lg font-bold mb-4 line-clamp-1">{event.name}</h3>

                                <div className="space-y-2 text-sm text-slate-500 dark:text-slate-400 mb-6">
                                    <div className="flex items-center gap-2">
                                        <Calendar size={14} />
                                        <span>{event.startDate}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <MapPin size={14} />
                                        <span>{event.location}</span>
                                    </div>
                                </div>

                                <div className="pt-6 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400">Visits</span>
                                            <span className="font-bold">{event.visits}</span>
                                        </div>
                                        <div className="flex flex-col">
                                            <span className="text-xs text-slate-400">Photos</span>
                                            <span className="font-bold">{event.photoCount}</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-colors">
                                            <ExternalLink size={18} />
                                        </button>
                                        <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-xl hover:bg-primary-100 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-colors">
                                            <MoreVertical size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default StudioDashboard;
