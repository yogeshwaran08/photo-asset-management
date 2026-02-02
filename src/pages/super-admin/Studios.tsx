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
                    <p className="text-slate-500">Manage and monitor all photo studio accounts</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-600 hover:bg-primary-700 text-white px-5 py-2.5 rounded-xl font-medium transition-all shadow-lg shadow-primary-600/20 active:scale-95">
                    <Plus size={20} />
                    Add New Studio
                </button>
            </div>

            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    <input
                        type="text"
                        placeholder="Search by studio name or email..."
                        className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl focus:ring-2 focus:ring-primary-500 transition-all outline-none"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <select className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl px-4 py-2.5 focus:ring-2 focus:ring-primary-500 outline-none">
                    <option>All Status</option>
                    <option>Active</option>
                    <option>Suspended</option>
                </select>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-200 dark:border-slate-800">
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Studio Name</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Contact</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500 text-center">Events</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500 text-center">Storage</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Status</th>
                                <th className="px-6 py-4 text-sm font-semibold text-slate-500">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800/50">
                            {MOCK_STUDIOS.map((studio) => (
                                <tr key={studio.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-600 dark:text-slate-400">
                                                {studio.name.charAt(0)}
                                            </div>
                                            <span className="font-semibold">{studio.name}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-sm flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                                                <Mail size={14} className="text-slate-400" />
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
                                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary-600 transition-colors">
                                                <Calendar size={18} />
                                            </button>
                                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary-600 transition-colors">
                                                {studio.status === 'active' ? <ShieldOff size={18} /> : <Shield size={18} />}
                                            </button>
                                            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg text-slate-400 hover:text-primary-600 transition-colors">
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
