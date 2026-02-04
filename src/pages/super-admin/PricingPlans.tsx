import {
    Tag,
    Users,
    CreditCard,
    CheckCircle2,
    Plus,
    MoreVertical,
    TrendingUp,
    ChevronRight,
    ArrowUpRight,
    Settings,
    DollarSign,
    Package,
    X,
    ChevronDown
} from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    PieChart,
    Pie
} from 'recharts';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
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
    cardVariants,
    buttonVariants,
    dialogVariants,
    springTransition
} from '@/lib/motion-config';

const MotionCard = motion(Card);
const MotionButton = motion(Button);

const planMetrics = [
    { name: 'Basic', users: 124, revenue: 15400, color: '#94a394' },
    { name: 'Pro', users: 56, revenue: 28000, color: '#93ea7d' },
    { name: 'Enterprise', users: 12, revenue: 18000, color: '#439f2f' },
];

interface Plan {
    name: string;
    price: string;
    period: string;
    studios: string;
    features: string[];
    color: string;
    badge: string | null;
}

const PricingPlans = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [plans, setPlans] = useState<Plan[]>([
        {
            name: 'Basic',
            price: '$49',
            period: '/mo',
            studios: '124 Studios',
            features: ['Up to 10 events', '100 GB Storage', 'Standard Support', 'Guest Gallery'],
            color: 'border-slate-200 dark:border-slate-800',
            badge: null
        },
        {
            name: 'Pro',
            price: '$149',
            period: '/mo',
            studios: '56 Studios',
            features: ['Unlimited events', '500 GB Storage', 'Priority Support', 'Custom Domain', 'Sales Features'],
            color: 'border-primary-500 ring-4 ring-primary-500/10',
            badge: 'Most Popular'
        },
        {
            name: 'Enterprise',
            price: 'Custom',
            period: '',
            studios: '12 Studios',
            features: ['Unlimited everything', 'Dedicated Account Manager', 'SLA Guarantee', 'Custom Integrations', 'White-labeling'],
            color: 'border-slate-200 dark:border-slate-800',
            badge: 'High Scale'
        }
    ]);

    const [newPlan, setNewPlan] = useState<Plan>({
        name: '',
        price: '',
        period: '/mo',
        studios: '0 Studios',
        features: [''],
        color: 'border-slate-200 dark:border-slate-800',
        badge: null
    });

    const handleCreatePlan = () => {
        setPlans([...plans, { ...newPlan, studios: '0 Studios' }]);
        setIsModalOpen(false);
        setNewPlan({
            name: '',
            price: '',
            period: '/mo',
            studios: '0 Studios',
            features: [''],
            color: 'border-slate-200 dark:border-slate-800',
            badge: null
        });
    };

    const addFeature = () => {
        setNewPlan({ ...newPlan, features: [...newPlan.features, ''] });
    };

    const updateFeature = (index: number, value: string) => {
        const updatedFeatures = [...newPlan.features];
        updatedFeatures[index] = value;
        setNewPlan({ ...newPlan, features: updatedFeatures });
    };

    const removeFeature = (index: number) => {
        const updatedFeatures = newPlan.features.filter((_, i) => i !== index);
        setNewPlan({ ...newPlan, features: updatedFeatures });
    };

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8 max-w-7xl mx-auto pb-12"
        >
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Plans & Pricing</h1>
                    <p className="text-muted-foreground mt-1">Manage subscription tiers and platform monetization.</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="outline" className="gap-2 h-11 px-6 rounded-xl font-bold">
                        <Settings size={18} />
                        Gateway Config
                    </Button>
                    <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                        <DialogTrigger asChild>
                            <MotionButton
                                variants={buttonVariants}
                                whileHover="hover"
                                whileTap="tap"
                                className="gap-2 bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20 h-11 px-6 rounded-xl font-bold"
                            >
                                <Plus size={18} />
                                Create New Plan
                            </MotionButton>
                        </DialogTrigger>
                        <DialogContent className="max-w-lg p-0 overflow-hidden border-none bg-transparent shadow-none">
                            <motion.div
                                variants={dialogVariants}
                                initial="initial"
                                animate="animate"
                                exit="exit"
                                className="bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
                            >
                                <div className="p-6 border-b border-border flex items-center justify-between">
                                    <div>
                                        <DialogTitle className="text-xl font-bold">Create New Plan</DialogTitle>
                                        <DialogDescription className="text-sm text-muted-foreground">Define a new subscription tier for studios.</DialogDescription>
                                    </div>
                                </div>

                                <div className="p-6 space-y-6 max-h-[60vh] overflow-y-auto custom-scrollbar">
                                    <div className="space-y-4">
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">Plan Name</label>
                                                <Input
                                                    placeholder="e.g. Starter"
                                                    value={newPlan.name}
                                                    onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                                                    className="rounded-xl h-11"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">Badge (Optional)</label>
                                                <Input
                                                    placeholder="e.g. Best Value"
                                                    value={newPlan.badge || ''}
                                                    onChange={(e) => setNewPlan({ ...newPlan, badge: e.target.value || null })}
                                                    className="rounded-xl h-11"
                                                />
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">Price</label>
                                                <Input
                                                    placeholder="e.g. $29"
                                                    value={newPlan.price}
                                                    onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                                                    className="rounded-xl h-11"
                                                />
                                            </div>
                                            <div className="space-y-2">
                                                <label className="text-sm font-bold">Period</label>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger asChild>
                                                        <Button variant="outline" className="w-full justify-between bg-muted/50 border-border rounded-xl px-4 py-2 text-sm font-bold h-11">
                                                            {newPlan.period === '/mo' ? 'Per Month' : newPlan.period === '/yr' ? 'Per Year' : 'One-time / Custom'}
                                                            <ChevronDown size={14} className="text-muted-foreground" />
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] rounded-xl border-border">
                                                        <DropdownMenuItem className="font-bold" onClick={() => setNewPlan({ ...newPlan, period: '/mo' })}>Per Month</DropdownMenuItem>
                                                        <DropdownMenuItem className="font-bold" onClick={() => setNewPlan({ ...newPlan, period: '/yr' })}>Per Year</DropdownMenuItem>
                                                        <DropdownMenuItem className="font-bold" onClick={() => setNewPlan({ ...newPlan, period: '' })}>One-time / Custom</DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center justify-between">
                                                <label className="text-sm font-bold">Features</label>
                                                <button
                                                    onClick={addFeature}
                                                    className="text-xs font-bold text-primary-500 hover:underline flex items-center gap-1"
                                                >
                                                    <Plus size={14} /> Add Feature
                                                </button>
                                            </div>
                                            <div className="space-y-2">
                                                {newPlan.features.map((feature, idx) => (
                                                    <div key={idx} className="flex gap-2">
                                                        <Input
                                                            placeholder="e.g. 50 GB Storage"
                                                            value={feature}
                                                            onChange={(e) => updateFeature(idx, e.target.value)}
                                                            className="rounded-xl h-11"
                                                        />
                                                        {newPlan.features.length > 1 && (
                                                            <Button
                                                                variant="ghost"
                                                                size="icon"
                                                                onClick={() => removeFeature(idx)}
                                                                className="text-rose-500 shrink-0 h-11 w-11 rounded-xl hover:bg-rose-500/10"
                                                            >
                                                                <X size={18} />
                                                            </Button>
                                                        )}
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-6 bg-muted/30 border-t border-border flex items-center gap-3">
                                    <Button
                                        variant="ghost"
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 rounded-xl font-bold h-11"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        onClick={handleCreatePlan}
                                        disabled={!newPlan.name || !newPlan.price}
                                        className="flex-2 bg-primary-500 hover:bg-primary-600 shadow-lg shadow-primary-500/20 rounded-xl font-bold h-11"
                                    >
                                        Create Plan
                                    </Button>
                                </div>
                            </motion.div>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {/* Quick Stats */}
            <motion.div variants={staggerContainer} className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Total Annual Revenue', value: '$642,500', icon: DollarSign, trend: '+12.4%', color: 'text-primary-500', bg: 'bg-primary-500/10' },
                    { title: 'Avg. Revenue Per User', value: '$285.50', icon: TrendingUp, trend: '+5.2%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { title: 'Active Subscriptions', value: '192', icon: Users, trend: '+8.1%', color: 'text-slate-500', bg: 'bg-slate-500/10' },
                ].map((stat, i) => (
                    <MotionCard
                        variants={listItemVariants}
                        whileHover={{ y: -5, transition: springTransition }}
                        key={i}
                        className="p-6 border-border/50 flex items-center gap-5 overflow-hidden rounded-3xl"
                    >
                        <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0", stat.bg)}>
                            <stat.icon size={28} className={stat.color} />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                            <div className="flex items-baseline gap-2">
                                <h3 className="text-2xl font-bold">{stat.value}</h3>
                                <span className="text-xs font-bold text-emerald-500 flex items-center gap-0.5">
                                    <ArrowUpRight size={12} />
                                    {stat.trend}
                                </span>
                            </div>
                        </div>
                    </MotionCard>
                ))}
            </motion.div>

            {/* Plan Cards */}
            <motion.div variants={staggerContainer} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {plans.map((plan, i) => (
                    <MotionCard
                        key={i}
                        variants={cardVariants}
                        whileHover="hover"
                        className={cn(
                            "relative rounded-[2rem] p-8 border-2 transition-all overflow-hidden group bg-card",
                            plan.badge ? "border-primary-500/50 shadow-2xl shadow-primary-500/10" : "border-border/50"
                        )}
                    >
                        {plan.badge && (
                            <Badge className="absolute top-4 right-[-32px] rotate-45 bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest py-1 w-32 justify-center shadow-lg rounded-none">
                                {plan.badge}
                            </Badge>
                        )}
                        <div className="mb-8">
                            <Package className="text-muted-foreground mb-4" size={32} />
                            <h3 className="text-xl font-bold mb-2 uppercase tracking-tight">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black">{plan.price}</span>
                                <span className="text-muted-foreground font-medium">{plan.period}</span>
                            </div>
                            <p className="text-sm font-bold text-primary-400 mt-2">{plan.studios}</p>
                        </div>
                        <div className="space-y-4 mb-8">
                            {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/10 flex items-center justify-center shrink-0">
                                        <CheckCircle2 size={12} className="text-emerald-500" />
                                    </div>
                                    <span className="text-sm text-foreground/80 font-medium">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <Button className={cn(
                            "w-full py-6 rounded-2xl font-black text-sm transition-all uppercase tracking-widest",
                            plan.badge ? "bg-primary-500 text-white hover:bg-primary-600 shadow-lg shadow-primary-500/20" : "bg-muted/50 hover:bg-muted text-foreground"
                        )}>
                            Modify Plan
                        </Button>
                    </MotionCard>
                ))}
            </motion.div>

            {/* Distribution Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <MotionCard
                    variants={listItemVariants}
                    className="p-8 border-border/50 rounded-3xl"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">User Distribution</h3>
                            <p className="text-sm text-muted-foreground">Studio count by subscription tier</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                            <Tag size={20} />
                        </div>
                    </div>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={planMetrics}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(148, 163, 184, 0.1)' }}
                                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e2e5e2', borderRadius: '12px' }}
                                />
                                <Bar dataKey="users" radius={[6, 6, 0, 0]}>
                                    {planMetrics.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </MotionCard>

                <MotionCard
                    variants={listItemVariants}
                    className="p-8 border-border/50 rounded-3xl"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Revenue Breakdown</h3>
                            <p className="text-sm text-muted-foreground">Financial contribution per tier</p>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-primary-400/10 flex items-center justify-center text-primary-400">
                            <CreditCard size={20} />
                        </div>
                    </div>
                    <div className="flex items-center h-[250px]">
                        <div className="flex-1 h-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={planMetrics}
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="revenue"
                                    >
                                        {planMetrics.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div className="space-y-4 px-4">
                            {planMetrics.map((plan, i) => (
                                <div key={i} className="flex items-center gap-3">
                                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: plan.color }}></div>
                                    <div>
                                        <p className="text-xs font-bold text-muted-foreground">{plan.name}</p>
                                        <p className="text-sm font-black">${plan.revenue.toLocaleString()}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </MotionCard>
            </div>

            {/* Recent Billing Activity */}
            <MotionCard
                variants={listItemVariants}
                className="border-border/50 overflow-hidden rounded-3xl shadow-sm"
            >
                <div className="p-6 border-b border-border flex items-center justify-between bg-muted/20">
                    <h3 className="text-lg font-bold">Recent Transactions</h3>
                    <Button variant="link" className="text-primary-500 font-bold gap-1 p-0 h-auto hover:no-underline">
                        View All <ChevronRight size={16} />
                    </Button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-muted/50 border-b border-border">
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Studio</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Plan</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Amount</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Status</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest">Date</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase text-muted-foreground tracking-widest"></th>
                            </tr>
                        </thead>
                        <motion.tbody
                            variants={staggerContainer}
                            initial="initial"
                            animate="animate"
                            className="divide-y divide-border"
                        >
                            {[
                                { studio: 'Lumina Studios', plan: 'Pro', amount: '$149.00', status: 'Success', date: 'Oct 24, 2023' },
                                { studio: 'Horizon Photo', plan: 'Basic', amount: '$49.00', status: 'Success', date: 'Oct 23, 2023' },
                                { studio: 'Vogue Motion', plan: 'Enterprise', amount: '$1,200.00', status: 'Pending', date: 'Oct 23, 2023' },
                                { studio: 'Stellar Captures', plan: 'Pro', amount: '$149.00', status: 'Success', date: 'Oct 22, 2023' },
                            ].map((tx, i) => (
                                <motion.tr
                                    key={i}
                                    variants={listItemVariants}
                                    whileHover={{ backgroundColor: "rgba(59, 130, 246, 0.05)" }}
                                    className="transition-colors group"
                                >
                                    <td className="px-6 py-4 font-bold text-sm tracking-tight">{tx.studio}</td>
                                    <td className="px-6 py-4">
                                        <Badge variant="outline" className="text-[10px] font-black uppercase tracking-wider bg-primary-500/5 text-primary-500 border-primary-500/20">
                                            {tx.plan}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 font-black">{tx.amount}</td>
                                    <td className="px-6 py-4">
                                        <Badge
                                            variant="outline"
                                            className={cn(
                                                "text-[9px] font-black uppercase tracking-widest px-2 py-0.5",
                                                tx.status === 'Success' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-amber-500/10 text-amber-500 border-amber-500/20"
                                            )}
                                        >
                                            <div className={cn(
                                                "w-1 h-1 rounded-full mr-1.5 animate-pulse",
                                                tx.status === 'Success' ? "bg-emerald-500" : "bg-amber-500"
                                            )}></div>
                                            {tx.status}
                                        </Badge>
                                    </td>
                                    <td className="px-6 py-4 text-xs text-muted-foreground font-bold">{tx.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-muted-foreground group-hover:text-primary-500 group-hover:bg-primary-500/10 rounded-lg transition-all">
                                            <MoreVertical size={16} />
                                        </Button>
                                    </td>
                                </motion.tr>
                            ))}
                        </motion.tbody>
                    </table>
                </div>
            </MotionCard>
        </motion.div>
    );
};

export default PricingPlans;
