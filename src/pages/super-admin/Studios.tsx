import { useState } from 'react';
import { Search, Plus, MoreVertical, Mail, ExternalLink, Phone } from 'lucide-react';
import { motion } from 'framer-motion';
import { MOCK_STUDIOS } from '../../utils/mockData';
import { cn } from '../../utils/cn';

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
};

const StudiosManagement = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('All Status');

    const filteredStudios = MOCK_STUDIOS.filter((studio) => {
        const matchesSearch = studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            studio.email.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesStatus = statusFilter === 'All Status' ||
            studio.status.toLowerCase() === statusFilter.toLowerCase();

        return matchesSearch && matchesStatus;
    });

    const getStatusStyles = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return "bg-emerald-500/10 text-emerald-500 border-emerald-500/20";
            case 'suspended':
                return "bg-rose-500/10 text-rose-500 border-rose-500/20";
            case 'pending':
                return "bg-amber-500/10 text-amber-500 border-amber-500/20";
            case 'expired':
                return "bg-slate-500/10 text-slate-500 border-slate-500/20";
            default:
                return "bg-slate-500/10 text-slate-500 border-slate-500/20";
        }
    };

    const getStatusPulse = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return "bg-emerald-500";
            case 'suspended': return "bg-rose-500";
            case 'pending': return "bg-amber-500";
            case 'expired': return "bg-slate-500";
            default: return "bg-slate-500";
        }
    };

    return (
        <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8 max-w-7xl mx-auto pb-12"
        >
            <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-card p-6 rounded-2xl border border-border/50 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[100px] -mr-32 -mt-32 rounded-full" />
                <div className="relative">
                    <h1 className="text-2xl font-bold tracking-tight">Studio Partners</h1>
                    <p className="text-sm text-muted-foreground mt-1 font-medium">Manage and monitor all photo studio accounts</p>
                </div>
                <button className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-5 py-3 rounded-xl font-black text-sm transition-all shadow-xl shadow-primary-500/20 active:scale-95 group">
                    <Plus size={18} strokeWidth={3} className="group-hover:rotate-90 transition-transform duration-300" />
                    <span>ADD STUDIO</span>
                </button>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary-500 transition-colors" size={20} />
                    <input
                        type="text"
                        placeholder="Search studios..."
                        className="w-full pl-12 pr-4 py-3 bg-card border border-border rounded-xl focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 transition-all outline-none text-foreground font-medium shadow-sm text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="relative">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="bg-card border border-border rounded-xl px-4 py-3 pr-10 focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500 outline-none text-foreground font-bold shadow-sm appearance-none cursor-pointer text-sm"
                    >
                        <option>All Status</option>
                        <option>Active</option>
                        <option>Suspended</option>
                        <option>Pending</option>
                        <option>Expired</option>
                    </select>
                    <MoreVertical className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none rotate-90" size={16} />
                </div>
            </motion.div>

            <motion.div variants={itemVariants} className="bg-card rounded-3xl border border-border overflow-hidden shadow-sm">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-border bg-secondary-bg/50">
                                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Studio</th>
                                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground">Contact</th>
                                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Plan</th>
                                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Events</th>
                                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Storage</th>
                                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-center">Status</th>
                                <th className="px-5 py-4 text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {filteredStudios.map((studio) => (
                                <tr key={studio.id} className="hover:bg-primary-500/5 transition-colors group">
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center font-black text-primary-500 text-lg border border-primary-500/20 shadow-inner group-hover:scale-105 transition-transform">
                                                {studio.name.charAt(0)}
                                            </div>
                                            <div className="flex flex-col">
                                                <span className="font-bold text-base text-foreground group-hover:text-primary-400 transition-colors uppercase tracking-tight line-clamp-1">{studio.name}</span>
                                                <span className="text-[10px] text-muted-foreground font-medium">ID: {studio.id}</span>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex flex-col">
                                            <span className="text-xs font-bold flex items-center gap-1.5 text-foreground/80">
                                                <Mail size={12} className="text-primary-400" />
                                                {studio.email}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <div className="inline-flex items-center">
                                            <span className={cn(
                                                "px-2.5 py-0.5 rounded-lg text-[9px] font-black uppercase tracking-wider border",
                                                studio.plan === 'Enterprise'
                                                    ? "bg-primary-500/10 text-primary-500 border-primary-500/20"
                                                    : studio.plan === 'Pro'
                                                        ? "bg-purple-500/10 text-purple-500 border-purple-500/20"
                                                        : "bg-slate-500/10 text-slate-500 border-slate-500/20"
                                            )}>
                                                {studio.plan}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <div className="inline-flex flex-col">
                                            <span className="text-lg font-black text-foreground tracking-tight">{studio.eventCount}</span>
                                            <span className="text-[8px] font-black text-muted-foreground uppercase opacity-50">Events</span>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <div className="inline-flex flex-col">
                                            <span className="text-xs font-black text-foreground">{studio.storageUsed}</span>
                                            <div className="w-12 h-1 bg-border rounded-full mt-1.5 overflow-hidden mx-auto">
                                                <div className="h-full bg-primary-500 rounded-full" style={{ width: '45%' }} />
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4 text-center">
                                        <span className={cn(
                                            "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-widest border shadow-sm",
                                            getStatusStyles(studio.status)
                                        )}>
                                            <div className={cn("w-1 h-1 rounded-full animate-pulse", getStatusPulse(studio.status))} />
                                            {studio.status}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center justify-end gap-2">
                                            {studio.status === 'expired' && (
                                                <button className="w-8 h-8 flex items-center justify-center bg-amber-500/10 text-amber-500 hover:bg-amber-500 hover:text-white rounded-lg transition-all border border-amber-500/20 shadow-sm" title="Call Studio">
                                                    <Phone size={14} />
                                                </button>
                                            )}
                                            <button className="w-8 h-8 flex items-center justify-center bg-secondary-bg hover:bg-primary-500/10 hover:text-primary-400 rounded-lg transition-all border border-border/50 shadow-sm" title="View Details">
                                                <ExternalLink size={14} />
                                            </button>
                                            <button className="w-8 h-8 flex items-center justify-center bg-secondary-bg hover:bg-primary-500/10 hover:text-primary-400 rounded-lg transition-all border border-border/50 shadow-sm">
                                                <MoreVertical size={14} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="p-5 border-t border-border bg-secondary-bg/30 flex items-center justify-between">
                    <p className="text-sm text-muted-foreground font-medium">Showing <span className="text-foreground font-black">10</span> of <span className="text-foreground font-black">124</span> studios</p>
                    <div className="flex gap-2">
                        <button className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-bold opacity-50 cursor-not-allowed">Previous</button>
                        <button className="px-3 py-1.5 bg-card border border-border rounded-lg text-xs font-bold hover:bg-primary-500 hover:text-white transition-all shadow-sm">Next Page</button>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
};

export default StudiosManagement;
