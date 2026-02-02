import { useState } from 'react';
import { Search, Plus, MoreVertical, Shield, ShieldOff, Mail, Calendar } from 'lucide-react';
import { MOCK_STUDIOS } from '../../utils/mockData';
import { cn } from '../../utils/cn';

const StudiosManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');

    return (
        <div className="space-y-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Studio Partners</h1>
                    <p className="text-muted-foreground">Manage and monitor all photo studio accounts</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary-500/20 active:scale-95">
                    <Plus size={20} />
                    Add New Studio
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={20} />
                    <input
                        type="text"
                        placeholder="Search by studio name or email..."
                        className="w-full pl-10 pr-4 py-2.5 bg-card border border-border rounded-xl focus:ring-2 focus:ring-primary-500 transition-all outline-none text-foreground"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select className="bg-card border border-border rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none text-foreground">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Suspended</option>
                </select>
            </div>

            <div className="bg-card rounded-2xl border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border">
                                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Studio Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Contact</th>
                                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground text-center">Events</th>
                                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground text-center">Storage</th>
                                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-muted-foreground">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {MOCK_STUDIOS.map((studio) => (
                                <tr key={studio.id} className="hover:bg-muted/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-bold text-muted-foreground">
                                                {studio.name.charAt(0)}
                                            </div>
                                            <span className="font-semibold">{studio.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm flex items-center gap-1.5 text-muted-foreground">
                                                <Mail size={14} className="text-muted-foreground" />
                                                {studio.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm font-medium">{studio.eventCount}</span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="text-sm font-medium">{studio.storageUsed}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={cn(
                                            "inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium",
                                            studio.status === 'active'
                                                ? "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-700 dark:text-emerald-400"
                                                : "bg-rose-100 dark:bg-rose-900/30 text-rose-700 dark:text-rose-400"
                                        )}>
                                            {studio.status.charAt(0).toUpperCase() + studio.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary-400 transition-colors">
                                                <Calendar size={18} />
                                            </button>
                                            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary-400 transition-colors">
                                                {studio.status === 'active' ? <ShieldOff size={18} /> : <Shield size={18} />}
                                            </button>
                                            <button className="p-2 hover:bg-muted rounded-lg text-muted-foreground hover:text-primary-400 transition-colors">
                                                <MoreVertical size={18} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default StudiosManagement;
