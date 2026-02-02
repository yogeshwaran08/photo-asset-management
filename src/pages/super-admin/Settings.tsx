import {
    Shield,
    Database,
    Globe,
    Save,
    Zap,
    CreditCard,
    Activity,
    Bell,
    Smartphone,
    Mail,
    Lock,
    Eye,
    Cloud,
    Server,
    Image as ImageIcon
} from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { cn } from '../../utils/cn';

const SettingsSection = ({ id, title, description, children, icon: Icon }: any) => (
    <motion.section
        id={id}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-card rounded-3xl border border-border overflow-hidden mb-8 scroll-mt-24"
    >
        <div className="p-6 border-b border-border flex items-center gap-4 bg-secondary-bg/30">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 font-bold">
                <Icon size={20} />
            </div>
            <div>
                <h3 className="text-lg font-bold">{title}</h3>
                <p className="text-sm text-muted-foreground">{description}</p>
            </div>
        </div>
        <div className="p-6 space-y-6">
            {children}
        </div>
    </motion.section>
);

const Toggle = ({ active, onChange }: { active: boolean, onChange: () => void }) => (
    <button
        onClick={onChange}
        className={cn(
            "w-12 h-6 rounded-full relative transition-colors duration-200 outline-none",
            active ? "bg-primary-500" : "bg-muted"
        )}
    >
        <motion.div
            animate={{ x: active ? 26 : 2 }}
            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
        />
    </button>
);

const SuperAdminSettings = () => {
    const [activeTab, setActiveTab] = useState('general');
    const [toggles, setToggles] = useState({
        twoFactor: true,
        maintenance: false,
        autoApproval: true,
        emailNotifications: true,
        compression: true,
        cdn: true
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const navItems = [
        { id: 'general', label: 'General', icon: Globe },
        { id: 'storage', label: 'Storage', icon: Database },
        { id: 'billing', label: 'Billing', icon: CreditCard },
        { id: 'integrations', label: 'Integrations', icon: Zap },
        { id: 'security', label: 'Security', icon: Shield },
        { id: 'notifications', label: 'Notifications', icon: Bell },
    ];

    const scrollToSection = (id: string) => {
        setActiveTab(id);
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <div className="max-w-7xl pb-20">
            <div className="flex flex-col md:flex-row gap-6">
                {/* Sidebar Navigation */}
                <aside className="md:w-56 shrink-0">
                    <div className="sticky top-24 space-y-1">
                        <div className="mb-4 hidden md:block">
                            <h2 className="text-sm font-bold text-muted-foreground uppercase tracking-wider px-4">Settings</h2>
                        </div>
                        {navItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => scrollToSection(item.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
                                    activeTab === item.id
                                        ? "bg-primary-500/10 text-primary-500 shadow-sm"
                                        : "text-muted-foreground hover:bg-secondary-bg hover:text-foreground"
                                )}
                            >
                                <item.icon size={18} />
                                {item.label}
                            </button>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <div className="flex-1">
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
                            <p className="text-muted-foreground mt-1">Global platform configuration and management.</p>
                        </div>
                        <div className="flex items-center gap-2 px-3 py-1.5 bg-rose-500/10 text-rose-500 rounded-full text-xs font-bold animate-pulse">
                            <Activity size={14} />
                            Live System
                        </div>
                    </div>

                    <div className="space-y-2">
                        {/* General Section */}
                        <SettingsSection
                            id="general"
                            title="Platform Configuration"
                            description="Core branding and platform identity settings."
                            icon={Globe}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Platform Name</label>
                                    <input type="text" defaultValue="SnapVault" className="w-full bg-secondary-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" />
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">System Domain</label>
                                    <input type="text" defaultValue="app.snapvault.com" className="w-full bg-secondary-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" />
                                </div>
                                <div className="space-y-2 md:col-span-2">
                                    <label className="text-sm font-medium">Support Email Address</label>
                                    <input type="email" defaultValue="admin-support@snapvault.com" className="w-full bg-secondary-bg border border-border rounded-xl px-4 py-2.5 text-sm focus:ring-2 focus:ring-primary-500/20 outline-none transition-all" />
                                </div>
                            </div>
                            <div className="pt-4 border-t border-border flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-bold">Maintenance Mode</p>
                                    <p className="text-xs text-muted-foreground">Disables public access for all studios and guests.</p>
                                </div>
                                <Toggle active={toggles.maintenance} onChange={() => handleToggle('maintenance')} />
                            </div>
                        </SettingsSection>

                        {/* Storage Section */}
                        <SettingsSection
                            id="storage"
                            title="Storage & Assets"
                            description="Infrastructure and asset management rules."
                            icon={Database}
                        >
                            <div className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <div className="p-4 bg-secondary-bg rounded-2xl border border-border/50">
                                        <div className="flex items-center gap-2 text-primary-500 mb-2">
                                            <Cloud size={16} />
                                            <span className="text-xs font-bold uppercase">AWS S3</span>
                                        </div>
                                        <p className="text-xl font-bold">12.4 TB</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Total Consumption</p>
                                    </div>
                                    <div className="p-4 bg-secondary-bg rounded-2xl border border-border/50">
                                        <div className="flex items-center gap-2 text-emerald-500 mb-2">
                                            <Server size={16} />
                                            <span className="text-xs font-bold uppercase">Regions</span>
                                        </div>
                                        <p className="text-xl font-bold">4 Active</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Global Coverage</p>
                                    </div>
                                    <div className="p-4 bg-secondary-bg rounded-2xl border border-border/50">
                                        <div className="flex items-center gap-2 text-accent-500 mb-2">
                                            <ImageIcon size={16} />
                                            <span className="text-xs font-bold uppercase">Assets</span>
                                        </div>
                                        <p className="text-xl font-bold">8.2M</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold">Processed Files</p>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex items-center justify-between p-4 border border-border rounded-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                                                <Zap size={20} className="text-amber-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold">Image Compression</p>
                                                <p className="text-xs text-muted-foreground">Automatically optimize images on upload.</p>
                                            </div>
                                        </div>
                                        <Toggle active={toggles.compression} onChange={() => handleToggle('compression')} />
                                    </div>
                                    <div className="flex items-center justify-between p-4 border border-border rounded-2xl">
                                        <div className="flex items-center gap-4">
                                            <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center">
                                                <Smartphone size={20} className="text-blue-500" />
                                            </div>
                                            <div>
                                                <p className="font-bold">Global CDN</p>
                                                <p className="text-xs text-muted-foreground">Deliver assets via edge nodes (Cloudflare).</p>
                                            </div>
                                        </div>
                                        <Toggle active={toggles.cdn} onChange={() => handleToggle('cdn')} />
                                    </div>
                                </div>
                            </div>
                        </SettingsSection>

                        {/* Billing Section */}
                        <SettingsSection
                            id="billing"
                            title="Billing & Monetization"
                            description="Handle currency, plans, and payment gateways."
                            icon={CreditCard}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Default Currency</label>
                                    <select className="w-full bg-secondary-bg border border-border rounded-xl px-4 py-2.5 text-sm outline-none">
                                        <option>USD ($)</option>
                                        <option>EUR (€)</option>
                                        <option>GBP (£)</option>
                                        <option>INR (₹)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-sm font-medium">Tax Rate (%)</label>
                                    <input type="number" defaultValue="18" className="w-full bg-secondary-bg border border-border rounded-xl px-4 py-2.5 text-sm outline-none" />
                                </div>
                            </div>
                            <div className="p-4 bg-primary-500/5 border border-primary-500/20 rounded-2xl">
                                <h4 className="text-sm font-bold text-primary-500 mb-2">Active Payment Gateway</h4>
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-8 bg-white rounded-md flex items-center justify-center shadow-sm border border-border">
                                            <span className="text-[10px] font-black italic text-blue-800">Stripe</span>
                                        </div>
                                        <div>
                                            <p className="text-sm font-bold text-foreground">Stripe Connect</p>
                                            <p className="text-xs text-muted-foreground truncate max-w-[200px]">Live Key: sk_live_••••••••••••</p>
                                        </div>
                                    </div>
                                    <button className="text-xs font-bold text-primary-500 hover:underline">Configure</button>
                                </div>
                            </div>
                        </SettingsSection>

                        {/* Integrations Section */}
                        <SettingsSection
                            id="integrations"
                            title="Third-party Integrations"
                            description="Connect SnapVault with external services."
                            icon={Zap}
                        >
                            <div className="space-y-4">
                                {[
                                    { name: 'Google Workspace', status: 'Connected', icon: Mail, color: 'text-rose-500' },
                                    { name: 'AWS Rekognition', status: 'Active', icon: Eye, color: 'text-amber-500' },
                                    { name: 'WhatsApp API', status: 'Disconnected', icon: Activity, color: 'text-emerald-500' },
                                ].map((integration) => (
                                    <div key={integration.name} className="flex items-center justify-between p-4 bg-secondary-bg/50 rounded-2xl border border-border/50">
                                        <div className="flex items-center gap-3">
                                            <integration.icon size={20} className={integration.color} />
                                            <span className="font-medium text-sm">{integration.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4">
                                            <span className={cn(
                                                "text-[10px] font-bold uppercase",
                                                integration.status === 'Disconnected' ? "text-muted-foreground" : "text-emerald-500"
                                            )}>{integration.status}</span>
                                            <button className="text-xs font-bold text-primary-500">Manage</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </SettingsSection>

                        {/* Security Section */}
                        <SettingsSection
                            id="security"
                            title="Security & Access"
                            description="Protect the platform and its data."
                            icon={Shield}
                        >
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm font-bold">Forced 2FA</p>
                                        <p className="text-[10px] text-muted-foreground uppercase font-bold leading-tight">Minimum Security Requirement</p>
                                    </div>
                                    <Toggle active={toggles.twoFactor} onChange={() => handleToggle('twoFactor')} />
                                </div>
                                <div className="pt-4 border-t border-border space-y-4">
                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-3">
                                            <Lock size={18} className="text-muted-foreground" />
                                            <span className="text-sm font-medium">Session Timeout (Minutes)</span>
                                        </div>
                                        <input type="number" defaultValue="30" className="w-16 bg-muted border-none rounded-lg px-2 py-1 text-center text-sm" />
                                    </div>
                                    <button className="w-full py-2.5 rounded-xl border border-border text-sm font-bold hover:bg-muted transition-all">
                                        View Security Audit History
                                    </button>
                                </div>
                            </div>
                        </SettingsSection>
                    </div>

                    {/* Footer Actions */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed bottom-0 right-0 left-0 md:left-64 p-6 bg-background/80 backdrop-blur-md border-t border-border flex justify-end gap-3 z-40"
                    >
                        <button className="px-6 py-2.5 rounded-xl border border-border font-bold text-sm hover:bg-card transition-all">Discard Changes</button>
                        <button className="flex items-center gap-2 px-8 py-2.5 rounded-xl bg-primary-500 text-white font-bold text-sm hover:bg-primary-600 transition-all shadow-lg shadow-primary-500/20">
                            <Save size={18} />
                            Save Configuration
                        </button>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default SuperAdminSettings;
