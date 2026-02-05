import {
    Search,
    Filter,
    MoreVertical,
    Mail,
    Calendar,
    ExternalLink,
    ChevronDown,
    Building2,
    Eye,
    Trash2,
    ShieldCheck
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
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
    buttonVariants
} from '@/lib/motion-config';

const MotionButton = motion(Button);

// Mock data for studio list
const STUDIOS = [
    { id: 'STU-001', name: 'Lumina Studios', email: 'contact@lumina.com', plan: 'Premium', events: 145, storageUsed: '1.2 TB', status: 'active', joinedDate: 'Oct 12, 2023' },
    { id: 'STU-002', name: 'Horizon Photo', email: 'hello@horizon.io', plan: 'Pro', events: 89, storageUsed: '0.8 TB', status: 'active', joinedDate: 'Oct 15, 2023' },
    { id: 'STU-003', name: 'Stellar Captures', email: 'info@stellar.com', plan: 'Premium', events: 210, storageUsed: '2.1 TB', status: 'active', joinedDate: 'Sep 28, 2023' },
    { id: 'STU-004', name: 'Dreamy Weddings', email: 'weddings@dreamy.com', plan: 'Basic', events: 45, storageUsed: '0.4 TB', status: 'expired', joinedDate: 'Nov 02, 2023' },
    { id: 'STU-005', name: 'Vogue Motion', email: 'studio@vogue.com', plan: 'Pro', events: 124, storageUsed: '1.5 TB', status: 'active', joinedDate: 'Oct 20, 2023' },
    { id: 'STU-006', name: 'Peak Moments', email: 'peak@moments.com', plan: 'Basic', events: 67, storageUsed: '0.6 TB', status: 'active', joinedDate: 'Nov 10, 2023' },
    { id: 'STU-007', name: 'Eternal Bonds', email: 'hello@eternal.com', plan: 'Premium', events: 156, storageUsed: '1.8 TB', status: 'active', joinedDate: 'Oct 05, 2023' },
];

const SuperAdminStudios = () => {
    const navigate = useNavigate();
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredStudios = STUDIOS.filter(studio => {
        const matchesSearch = studio.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            studio.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
            studio.id.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || studio.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const getStatusVariant = (status: string) => {
        switch (status) {
            case 'active': return 'default';
            case 'expired': return 'destructive';
            case 'pending': return 'secondary';
            default: return 'outline';
        }
    };

    const getStatusColorClass = (status: string) => {
        switch (status) {
            case 'active': return 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20';
            case 'expired': return 'bg-rose-500/10 text-rose-500 border-rose-500/20';
            case 'pending': return 'bg-amber-500/10 text-amber-500 border-amber-500/20';
            default: return 'bg-slate-500/10 text-slate-500 border-slate-500/20';
        }
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8 max-w-7xl mx-auto pb-20"
        >
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div></div>
                <div className="flex items-center gap-3">
                    <MotionButton
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                        className="bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/20 h-11 px-6 rounded-xl font-bold gap-2 text-white"
                        onClick={() => { }}
                    >
                        <Building2 size={18} />
                        Add New Studio
                    </MotionButton>
                </div>
            </div>

            {/* Filters Area */}
            <motion.div
                variants={staggerContainer}
                initial="initial"
                animate="animate"
                className="flex flex-col md:flex-row gap-4"
            >
                <div className="relative flex-1 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary-500 transition-colors" size={20} />
                    <Input
                        placeholder="Search studios by name, email or ID..."
                        className="pl-12 h-12 bg-card border-border rounded-xl focus-visible:ring-4 focus-visible:ring-primary-500/10 focus-visible:border-primary-500 transition-all outline-none text-foreground font-medium shadow-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex items-center gap-3">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="h-12 bg-card border-border rounded-xl px-5 flex items-center gap-2 font-bold shadow-sm">
                                <Filter size={18} className="text-muted-foreground" />
                                <span className="capitalize">{statusFilter === 'all' ? 'All Status' : statusFilter}</span>
                                <ChevronDown size={16} className="text-muted-foreground ml-2" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-[180px] rounded-xl border-border shadow-xl">
                            <DropdownMenuItem className="font-bold flex items-center justify-between" onClick={() => setStatusFilter('all')}>
                                All Status {statusFilter === 'all' && <ShieldCheck size={14} className="text-primary-500" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-bold flex items-center justify-between" onClick={() => setStatusFilter('active')}>
                                Active {statusFilter === 'active' && <ShieldCheck size={14} className="text-primary-500" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem className="font-bold flex items-center justify-between" onClick={() => setStatusFilter('expired')}>
                                Expired {statusFilter === 'expired' && <ShieldCheck size={14} className="text-primary-500" />}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </motion.div>

            {/* Table Area */}
            <motion.div
                variants={listItemVariants}
            >
                <Card className="rounded-3xl border border-border overflow-hidden shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="border-b border-border bg-muted/50">
                                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Studio</th>
                                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Contact</th>
                                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Plan</th>
                                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Events</th>
                                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Storage</th>
                                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-center">Status</th>
                                    <th className="px-5 py-4 text-[10px] font-black uppercase tracking-widest text-muted-foreground text-right">Actions</th>
                                </tr>
                            </thead>
                            <motion.tbody
                                variants={staggerContainer}
                                initial="initial"
                                animate="animate"
                                className="divide-y divide-border"
                            >
                                <AnimatePresence mode="popLayout">
                                    {filteredStudios.map((studio) => (
                                        <motion.tr
                                            layout
                                            key={studio.id}
                                            variants={listItemVariants}
                                            whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                                            className="transition-colors group"
                                        >
                                            <td className="px-5 py-4">
                                                <div
                                                    className="flex items-center gap-3 cursor-pointer group/name"
                                                    onClick={() => navigate(`/super-admin/studio/${studio.id}`)}
                                                >
                                                    <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center font-black text-primary-500 text-lg border border-primary-500/20 shadow-inner group-hover/name:scale-105 transition-transform">
                                                        {studio.name.charAt(0)}
                                                    </div>
                                                    <div className="flex flex-col">
                                                        <span className="font-bold text-base text-foreground group-hover/name:text-primary-400 transition-colors uppercase tracking-tight line-clamp-1 border-b border-transparent group-hover/name:border-primary-400/30">{studio.name}</span>
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
                                                    <span className="text-[10px] text-muted-foreground font-medium flex items-center gap-1.5 mt-0.5">
                                                        <Calendar size={10} /> Joined {studio.joinedDate}
                                                    </span>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                <Badge variant="outline" className="text-[10px] font-black uppercase tracking-widest bg-primary-500/5 text-primary-500 border-primary-500/20">
                                                    {studio.plan}
                                                </Badge>
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                <span className="text-sm font-black">{studio.events}</span>
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                <div className="flex flex-col items-center">
                                                    <span className="text-sm font-black text-foreground/90">{studio.storageUsed}</span>
                                                    <div className="w-12 h-1 bg-muted rounded-full mt-1 overflow-hidden">
                                                        <div className="h-full bg-primary-500 rounded-full" style={{ width: '65%' }}></div>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-4 text-center">
                                                <Badge
                                                    variant={getStatusVariant(studio.status)}
                                                    className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", getStatusColorClass(studio.status))}
                                                >
                                                    <div className={cn("w-1.5 h-1.5 rounded-full mr-1.5 animate-pulse", studio.status === 'active' ? "bg-emerald-500" : "bg-rose-500")} />
                                                    {studio.status}
                                                </Badge>
                                            </td>
                                            <td className="px-5 py-4">
                                                <div className="flex items-center justify-end gap-1">
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-primary-500 hover:bg-primary-500/10 rounded-xl transition-all">
                                                                <MoreVertical size={18} />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end" className="w-[180px] rounded-xl border-border shadow-xl">
                                                            <DropdownMenuItem className="font-bold gap-3" onClick={() => navigate(`/super-admin/studio/${studio.id}`)}>
                                                                <Eye size={16} className="text-primary-500" /> View Profile
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="font-bold gap-3" onClick={() => { }}>
                                                                <ExternalLink size={16} className="text-emerald-500" /> Open Website
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem className="font-bold gap-3 text-rose-500 focus:text-rose-500 focus:bg-rose-500/10" onClick={() => { }}>
                                                                <Trash2 size={16} /> Suspend Account
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </motion.tr>
                                    ))}
                                </AnimatePresence>
                            </motion.tbody>
                        </table>
                    </div>
                    {/* Pagination - Placeholder */}
                    <div className="px-5 py-4 border-t border-border bg-muted/20 flex items-center justify-between">
                        <p className="text-xs text-muted-foreground font-medium">Showing <span className="text-foreground font-bold">{filteredStudios.length}</span> of <span className="text-foreground font-bold">{STUDIOS.length}</span> studios</p>
                        <div className="flex items-center gap-2">
                            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-bold rounded-lg border-border/50 disabled:opacity-50" disabled>Previous</Button>
                            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-bold rounded-lg border-border/20 bg-primary-500 text-white hover:bg-primary-600">1</Button>
                            <Button variant="outline" size="sm" className="h-8 px-3 text-xs font-bold rounded-lg border-border/50">Next</Button>
                        </div>
                    </div>
                </Card>
            </motion.div>
        </motion.div>
    );
};

export default SuperAdminStudios;
