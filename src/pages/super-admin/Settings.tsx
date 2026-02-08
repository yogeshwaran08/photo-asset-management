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
    Lock,
    Cloud,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ChevronDown,
    Building2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Switch } from '@/components/ui/switch';
import {
    pageVariants,
    buttonVariants,
} from '@/lib/motion-config';

const MotionButton = motion(Button);

const SettingsCard = ({ title, description, children, icon: Icon }: any) => (
    <Card className="rounded-3xl border-border/50 overflow-hidden shadow-sm bg-card">
        <CardHeader className="flex flex-row items-center gap-4 border-b border-border/50 bg-muted/10 py-5">
            <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500 border border-primary-500/20 shrink-0">
                <Icon size={20} />
            </div>
            <div>
                <CardTitle className="text-lg font-bold tracking-tight">{title}</CardTitle>
                <CardDescription className="text-xs font-medium">{description}</CardDescription>
            </div>
        </CardHeader>
        <CardContent className="p-6 space-y-6">
            {children}
        </CardContent>
    </Card>
);



interface SuperAdminSettings {
    id: number;
    platform_name: string;
    system_domain: string;
    support_email: string;
    maintenance_mode: boolean;
    total_storage_tb: number;
    active_regions: number;
    total_assets: number;
    image_compression_enabled: boolean;
    cdn_enabled: boolean;
    default_currency: string;
    tax_rate: number;
    stripe_live_key?: string | null;
    google_workspace_connected: boolean;
    aws_rekognition_active: boolean;
    whatsapp_api_connected: boolean;
    forced_2fa: boolean;
    session_timeout_minutes: number;
    auto_approval_enabled: boolean;
    email_notifications_enabled: boolean;
}

const API_BASE_URL = 'http://localhost:8000/api/v1/super-admin-settings';

const SuperAdminSettings = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);
    const [settings, setSettings] = useState<SuperAdminSettings | null>(null);

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        try {
            setIsLoading(true);
            setError(null);
            const response = await fetch(`${API_BASE_URL}/`);
            if (!response.ok) {
                if (response.status === 404) {
                    await initializeSettings();
                    return;
                }
                throw new Error('Failed to fetch settings');
            }
            const data = await response.json();
            setSettings(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load settings');
        } finally {
            setIsLoading(false);
        }
    };

    const initializeSettings = async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/initialize`, { method: 'POST' });
            if (!response.ok) throw new Error('Failed to initialize settings');
            const data = await response.json();
            setSettings(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to initialize settings');
        }
    };

    const updateSettings = async (updates: Partial<SuperAdminSettings>) => {
        try {
            setError(null);
            const response = await fetch(`${API_BASE_URL}/`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(updates),
            });
            if (!response.ok) throw new Error('Failed to update settings');
            const data = await response.json();
            setSettings(data);
            return data;
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to update settings');
            throw err;
        }
    };

    const handleToggle = async (field: keyof SuperAdminSettings) => {
        if (!settings) return;
        const currentValue = settings[field];
        if (typeof currentValue !== 'boolean') return;
        try {
            await updateSettings({ [field]: !currentValue });
            showSuccess('Setting updated successfully');
        } catch (err) { }
    };

    const handleInputChange = (field: keyof SuperAdminSettings, value: any) => {
        if (!settings) return;
        setSettings({ ...settings, [field]: value });
    };

    const handleSaveChanges = async () => {
        if (!settings) return;
        try {
            setIsSaving(true);
            await updateSettings({
                platform_name: settings.platform_name,
                system_domain: settings.system_domain,
                support_email: settings.support_email,
                default_currency: settings.default_currency,
                tax_rate: settings.tax_rate,
                session_timeout_minutes: settings.session_timeout_minutes,
            });
            showSuccess('Settings saved successfully!');
        } catch (err) {
        } finally {
            setIsSaving(false);
        }
    };

    const showSuccess = (message: string) => {
        setSuccessMessage(message);
        setTimeout(() => setSuccessMessage(null), 3000);
    };

    if (isLoading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <Loader2 className="animate-spin text-primary-500 mx-auto mb-4" size={40} />
                    <p className="text-muted-foreground font-bold text-sm tracking-tight">Accessing system configuration...</p>
                </div>
            </div>
        );
    }

    if (!settings) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="text-center">
                    <AlertCircle className="text-destructive mx-auto mb-4" size={40} />
                    <p className="text-destructive font-bold">Failed to load system settings.</p>
                    <Button onClick={fetchSettings} className="mt-4 rounded-xl">Retry</Button>
                </div>
            </div>
        );
    }

    return (
        <motion.div
            variants={pageVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="space-y-8 max-w-7xl mx-auto pb-20"
        >
            <AnimatePresence>
                {successMessage && (
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="fixed top-24 left-1/2 -translate-x-1/2 z-50 p-4 bg-emerald-500 text-white rounded-2xl flex items-center gap-3 shadow-xl px-8"
                    >
                        <CheckCircle2 size={18} />
                        <p className="font-bold text-sm">{successMessage}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div></div>
                <div className="flex items-center gap-3">
                    <Badge variant="outline" className="gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-500 border-emerald-500/20 font-bold rounded-full">
                        <Activity size={14} className="animate-pulse" />
                        System Online
                    </Badge>
                </div>
            </div>

            <Tabs defaultValue="general" className="space-y-8">
                <TabsList className="bg-muted/50 p-1 rounded-2xl border border-border/50 overflow-x-auto h-auto flex flex-nowrap md:inline-flex">
                    <TabsTrigger value="general" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <Globe size={16} className="mr-2" /> General
                    </TabsTrigger>
                    <TabsTrigger value="storage" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <Database size={16} className="mr-2" /> Storage
                    </TabsTrigger>
                    <TabsTrigger value="billing" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <CreditCard size={16} className="mr-2" /> Billing
                    </TabsTrigger>
                    <TabsTrigger value="security" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <Shield size={16} className="mr-2" /> Security
                    </TabsTrigger>
                    <TabsTrigger value="notifications" className="rounded-xl px-6 py-2.5 font-bold data-[state=active]:bg-background data-[state=active]:shadow-sm">
                        <Bell size={16} className="mr-2" /> Notifications
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="general" className="space-y-6 focus-visible:outline-none">
                    <SettingsCard
                        title="Platform Identity"
                        description="Configure how the platform appears to studios and guests."
                        icon={Building2}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground ml-1">Platform Name</label>
                                <Input
                                    value={settings.platform_name}
                                    onChange={(e) => handleInputChange('platform_name', e.target.value)}
                                    className="h-11 rounded-xl bg-muted/20 border-border/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground ml-1">System Domain</label>
                                <Input
                                    value={settings.system_domain}
                                    onChange={(e) => handleInputChange('system_domain', e.target.value)}
                                    className="h-11 rounded-xl bg-muted/20 border-border/50"
                                />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-xs font-bold text-muted-foreground ml-1">Support Email</label>
                                <Input
                                    value={settings.support_email}
                                    onChange={(e) => handleInputChange('support_email', e.target.value)}
                                    className="h-11 rounded-xl bg-muted/20 border-border/50"
                                />
                            </div>
                        </div>
                        <div className="pt-6 border-t border-border/50 flex items-center justify-between">
                            <div>
                                <p className="text-sm font-bold">Maintenance Mode</p>
                                <p className="text-xs text-muted-foreground">Temporarily disable platform access for everyone except admins.</p>
                            </div>
                            <Switch checked={settings.maintenance_mode} onCheckedChange={() => handleToggle('maintenance_mode')} />
                        </div>
                    </SettingsCard>
                </TabsContent>

                <TabsContent value="storage" className="space-y-6 focus-visible:outline-none">
                    <SettingsCard
                        title="Storage & Asset Logic"
                        description="Monitor your infrastructure and configure optimization rules."
                        icon={Cloud}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="p-4 rounded-2xl border border-border/50 bg-muted/20">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Total Storage</p>
                                <p className="text-2xl font-bold">{settings.total_storage_tb} TB</p>
                            </div>
                            <div className="p-4 rounded-2xl border border-border/50 bg-muted/20">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Active Regions</p>
                                <p className="text-2xl font-bold">{settings.active_regions}</p>
                            </div>
                            <div className="p-4 rounded-2xl border border-border/50 bg-muted/20">
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mb-1">Assets Managed</p>
                                <p className="text-2xl font-bold">{settings.total_assets}M</p>
                            </div>
                        </div>
                        <div className="space-y-4 pt-4">
                            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/20 transition-colors border border-transparent hover:border-border/50">
                                <div className="flex items-center gap-3">
                                    <Zap size={18} className="text-amber-500" />
                                    <div>
                                        <p className="text-sm font-bold">Image Compression</p>
                                        <p className="text-xs text-muted-foreground">Optimize uploads automatically before storage.</p>
                                    </div>
                                </div>
                                <Switch checked={settings.image_compression_enabled} onCheckedChange={() => handleToggle('image_compression_enabled')} />
                            </div>
                            <div className="flex items-center justify-between p-4 rounded-xl hover:bg-muted/20 transition-colors border border-transparent hover:border-border/50">
                                <div className="flex items-center gap-3">
                                    <Smartphone size={18} className="text-blue-500" />
                                    <div>
                                        <p className="text-sm font-bold">Global CDN</p>
                                        <p className="text-xs text-muted-foreground">Speed up asset delivery via edge nodes.</p>
                                    </div>
                                </div>
                                <Switch checked={settings.cdn_enabled} onCheckedChange={() => handleToggle('cdn_enabled')} />
                            </div>
                        </div>
                    </SettingsCard>
                </TabsContent>

                <TabsContent value="billing" className="space-y-6 focus-visible:outline-none">
                    <SettingsCard
                        title="Revenue Configuration"
                        description="Manage local currency and global tax parameters."
                        icon={DollarSign}
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground ml-1">Default Currency</label>
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline" className="w-full justify-between h-11 rounded-xl bg-muted/20 border-border/50">
                                            {settings.default_currency}
                                            <ChevronDown size={16} />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className="w-[--radix-dropdown-menu-trigger-width] rounded-xl">
                                        <DropdownMenuItem onClick={() => handleInputChange('default_currency', 'USD')}>USD ($)</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleInputChange('default_currency', 'EUR')}>EUR (€)</DropdownMenuItem>
                                        <DropdownMenuItem onClick={() => handleInputChange('default_currency', 'INR')}>INR (₹)</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                            <div className="space-y-2">
                                <label className="text-xs font-bold text-muted-foreground ml-1">Tax Rate (%)</label>
                                <Input
                                    type="number"
                                    value={settings.tax_rate}
                                    onChange={(e) => handleInputChange('tax_rate', parseFloat(e.target.value))}
                                    className="h-11 rounded-xl bg-muted/20 border-border/50"
                                />
                            </div>
                        </div>
                    </SettingsCard>
                </TabsContent>

                <TabsContent value="security" className="space-y-6 focus-visible:outline-none">
                    <SettingsCard
                        title="Security Guardrails"
                        description="Protect admin and studio workspace integrity."
                        icon={Lock}
                    >
                        <div className="flex items-center justify-between p-4 rounded-xl bg-rose-500/5 border border-rose-500/10 mb-4">
                            <div className="flex items-center gap-3">
                                <Shield size={18} className="text-rose-500" />
                                <div>
                                    <p className="text-sm font-bold">Forced 2FA</p>
                                    <p className="text-xs text-muted-foreground">Require two-factor authentication for all staff.</p>
                                </div>
                            </div>
                            <Switch checked={settings.forced_2fa} onCheckedChange={() => handleToggle('forced_2fa')} />
                        </div>
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-muted-foreground ml-1">Session Inactivity Timeout (Minutes)</label>
                            <Input
                                type="number"
                                value={settings.session_timeout_minutes}
                                onChange={(e) => handleInputChange('session_timeout_minutes', parseInt(e.target.value))}
                                className="h-11 rounded-xl bg-muted/20 border-border/50 w-full md:w-48"
                            />
                        </div>
                    </SettingsCard>
                </TabsContent>
            </Tabs>

            {/* Save Button Sidebar-like sticky but centered for the layout */}
            <div className="fixed bottom-8 right-8 z-50">
                <MotionButton
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={handleSaveChanges}
                    disabled={isSaving}
                    className="h-14 px-8 rounded-2xl bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20 font-bold gap-2"
                >
                    {isSaving ? <Loader2 size={18} className="animate-spin" /> : <Save size={18} />}
                    {isSaving ? "Saving..." : "Save Changes"}
                </MotionButton>
            </div>
        </motion.div>
    );
};

const DollarSign = (props: any) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}><line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" /></svg>
);

export default SuperAdminSettings;
