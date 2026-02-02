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
    Package
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';
import { useState } from 'react';
import { X } from 'lucide-react';
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

const planMetrics = [
    { name: 'Basic', users: 124, revenue: 15400, color: '#94a3b8' },
    { name: 'Pro', users: 56, revenue: 28000, color: '#6366f1' },
    { name: 'Premium', users: 12, revenue: 18000, color: '#8b5cf6' },
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
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Plans & Pricing</h1>
                    <p className="text-muted-foreground mt-1">Manage subscription tiers and platform monetization.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 bg-secondary-bg hover:bg-card text-foreground px-4 py-2.5 rounded-xl text-sm font-medium border border-border transition-all">
                        <Settings size={18} />
                        Gateway Config
                    </button>
                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white px-4 py-2.5 rounded-xl text-sm font-medium transition-all shadow-lg shadow-primary-500/20"
                    >
                        <Plus size={18} />
                        Create New Plan
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                    { title: 'Total Annual Revenue', value: '$642,500', icon: DollarSign, trend: '+12.4%', color: 'text-primary-500', bg: 'bg-primary-500/10' },
                    { title: 'Avg. Revenue Per User', value: '$285.50', icon: TrendingUp, trend: '+5.2%', color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
                    { title: 'Active Subscriptions', value: '192', icon: Users, trend: '+8.1%', color: 'text-accent-500', bg: 'bg-accent-500/10' },
                ].map((stat, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="bg-card p-6 rounded-3xl border border-border flex items-center gap-5"
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
                    </motion.div>
                ))}
            </div>

            {/* Plan Cards */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {plans.map((plan, i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.3 + (i * 0.1) }}
                        className={cn(
                            "relative bg-card rounded-3xl p-8 border-2 transition-transform hover:scale-[1.02] overflow-hidden group",
                            plan.color
                        )}
                    >
                        {plan.badge && (
                            <div className="absolute top-4 right-[-32px] rotate-45 bg-primary-500 text-white text-[10px] font-black uppercase tracking-widest py-1 w-32 text-center shadow-lg">
                                {plan.badge}
                            </div>
                        )}
                        <div className="mb-8">
                            <Package className="text-muted-foreground mb-4" size={32} />
                            <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                            <div className="flex items-baseline gap-1">
                                <span className="text-4xl font-black">{plan.price}</span>
                                <span className="text-muted-foreground font-medium">{plan.period}</span>
                            </div>
                            <p className="text-sm font-bold text-primary-400 mt-2">{plan.studios}</p>
                        </div>
                        <div className="space-y-4 mb-8">
                            {plan.features.map((feature, idx) => (
                                <div key={idx} className="flex items-center gap-3">
                                    <CheckCircle2 size={18} className="text-emerald-500 shrink-0" />
                                    <span className="text-sm text-foreground/80">{feature}</span>
                                </div>
                            ))}
                        </div>
                        <button className={cn(
                            "w-full py-3 rounded-xl font-bold text-sm transition-all",
                            plan.badge ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" : "bg-secondary-bg hover:bg-muted"
                        )}>
                            Modify Plan
                        </button>
                    </motion.div>
                ))}
            </div>

            {/* Distribution Charts */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-card p-8 rounded-3xl border border-border"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">User Distribution</h3>
                            <p className="text-sm text-muted-foreground">Studio count by subscription tier</p>
                        </div>
                        <Tag size={20} className="text-primary-500" />
                    </div>
                    <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={planMetrics}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(148, 163, 184, 0.1)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#64748b' }} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(99, 102, 241, 0.05)' }}
                                    contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '16px', color: '#fff' }}
                                />
                                <Bar dataKey="users" radius={[6, 6, 0, 0]}>
                                    {planMetrics.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Bar>
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 }}
                    className="bg-card p-8 rounded-3xl border border-border"
                >
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-bold">Revenue Breakdown</h3>
                            <p className="text-sm text-muted-foreground">Financial contribution per tier</p>
                        </div>
                        <CreditCard size={20} className="text-accent-500" />
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
                </motion.div>
            </div>

            {/* Recent Billing Activity */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="bg-card rounded-3xl border border-border overflow-hidden"
            >
                <div className="p-6 border-b border-border flex items-center justify-between">
                    <h3 className="text-lg font-bold">Recent Transactions</h3>
                    <button className="text-sm font-bold text-primary-500 flex items-center gap-1 hover:underline">
                        View All <ChevronRight size={16} />
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-secondary-bg/50">
                                <th className="px-6 py-4 text-xs font-black uppercase text-muted-foreground">Studio</th>
                                <th className="px-6 py-4 text-xs font-black uppercase text-muted-foreground">Plan</th>
                                <th className="px-6 py-4 text-xs font-black uppercase text-muted-foreground">Amount</th>
                                <th className="px-6 py-4 text-xs font-black uppercase text-muted-foreground">Status</th>
                                <th className="px-6 py-4 text-xs font-black uppercase text-muted-foreground">Date</th>
                                <th className="px-6 py-4 text-xs font-black uppercase text-muted-foreground"></th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border">
                            {[
                                { studio: 'Lumina Studios', plan: 'Pro', amount: '$149.00', status: 'Success', date: 'Oct 24, 2023' },
                                { studio: 'Horizon Photo', plan: 'Basic', amount: '$49.00', status: 'Success', date: 'Oct 23, 2023' },
                                { studio: 'Vogue Motion', plan: 'Enterprise', amount: '$1,200.00', status: 'Pending', date: 'Oct 23, 2023' },
                                { studio: 'Stellar Captures', plan: 'Pro', amount: '$149.00', status: 'Success', date: 'Oct 22, 2023' },
                            ].map((tx, i) => (
                                <tr key={i} className="hover:bg-muted/30 transition-colors group">
                                    <td className="px-6 py-4 font-bold text-sm">{tx.studio}</td>
                                    <td className="px-6 py-4">
                                        <span className="px-2 py-1 rounded-md bg-secondary-bg text-[10px] font-black uppercase">
                                            {tx.plan}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 font-black">{tx.amount}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-1.5">
                                            <div className={cn(
                                                "w-1.5 h-1.5 rounded-full",
                                                tx.status === 'Success' ? "bg-emerald-500" : "bg-amber-500"
                                            )}></div>
                                            <span className="text-xs font-medium">{tx.status}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-muted-foreground">{tx.date}</td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="p-2 rounded-lg hover:bg-secondary-bg text-muted-foreground group-hover:text-foreground">
                                            <MoreVertical size={16} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
            {/* Create Plan Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="relative w-full max-w-lg bg-card border border-border rounded-3xl shadow-2xl overflow-hidden"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-border flex items-center justify-between bg-secondary-bg/30">
                                <div>
                                    <h2 className="text-xl font-bold">Create New Plan</h2>
                                    <p className="text-sm text-muted-foreground">Define a new subscription tier for studios.</p>
                                </div>
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="p-2 hover:bg-muted rounded-full transition-colors"
                                >
                                    <X size={20} />
                                </button>
                            </div>

                            <div className="p-6 space-y-6 max-h-[70vh] overflow-y-auto custom-scrollbar">
                                <div className="space-y-4">
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold">Plan Name</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Starter"
                                                className="w-full bg-secondary-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                                value={newPlan.name}
                                                onChange={(e) => setNewPlan({ ...newPlan, name: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold">Badge (Optional)</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. Best Value"
                                                className="w-full bg-secondary-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                                value={newPlan.badge || ''}
                                                onChange={(e) => setNewPlan({ ...newPlan, badge: e.target.value || null })}
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold">Price</label>
                                            <input
                                                type="text"
                                                placeholder="e.g. $29"
                                                className="w-full bg-secondary-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                                value={newPlan.price}
                                                onChange={(e) => setNewPlan({ ...newPlan, price: e.target.value })}
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-bold">Period</label>
                                            <select
                                                className="w-full bg-secondary-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all appearance-none"
                                                value={newPlan.period}
                                                onChange={(e) => setNewPlan({ ...newPlan, period: e.target.value })}
                                            >
                                                <option value="/mo">Per Month</option>
                                                <option value="/yr">Per Year</option>
                                                <option value="">One-time / Custom</option>
                                            </select>
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
                                                    <input
                                                        type="text"
                                                        placeholder="e.g. 50 GB Storage"
                                                        className="flex-1 bg-secondary-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500/50 transition-all"
                                                        value={feature}
                                                        onChange={(e) => updateFeature(idx, e.target.value)}
                                                    />
                                                    {newPlan.features.length > 1 && (
                                                        <button
                                                            onClick={() => removeFeature(idx)}
                                                            className="p-2.5 hover:bg-rose-500/10 text-rose-500 rounded-xl transition-colors"
                                                        >
                                                            <X size={18} />
                                                        </button>
                                                    )}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="p-6 bg-secondary-bg/30 border-t border-border flex items-center gap-3">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-3 rounded-xl text-sm font-bold hover:bg-muted transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCreatePlan}
                                    disabled={!newPlan.name || !newPlan.price}
                                    className="flex-2 bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed text-white px-4 py-3 rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary-500/20"
                                >
                                    Create Plan
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default PricingPlans;
