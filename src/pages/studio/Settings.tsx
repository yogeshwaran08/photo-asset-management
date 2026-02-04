import { useState } from 'react';
import {
    User,
    CreditCard,
    Bell,
    Shield,
    Globe,
    Save,
    Camera,
    Eye,
    Cloud,
    Database,
    HelpCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import {
    pageVariants,
    staggerContainer,
    buttonVariants
} from '@/lib/motion-config';

type SettingsTab = 'profile' | 'studio' | 'billing' | 'notifications' | 'security' | 'sharing';

const Settings = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

    const tabs: { id: SettingsTab; label: string; icon: any }[] = [
        { id: 'profile', label: 'Personal Profile', icon: User },
        { id: 'studio', label: 'Studio Identity', icon: Camera },
        { id: 'billing', label: 'Billing & Plans', icon: CreditCard },
        { id: 'notifications', label: 'Alert Preferences', icon: Bell },
        { id: 'security', label: 'Access & Security', icon: Shield },
        { id: 'sharing', label: 'Global Defaults', icon: Globe },
    ];

    const tabContent = {
        profile: (
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                <Card className="border-border/50 glass shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-black uppercase tracking-tight">Public Information</CardTitle>
                        <CardDescription className="font-bold text-[10px] uppercase opacity-60">Manage your identity as an account owner</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex flex-col sm:flex-row items-center gap-8 pb-4">
                            <div className="relative group">
                                <div className="w-24 h-24 rounded-full bg-muted border-4 border-white shadow-xl overflow-hidden glass">
                                    <img src="https://ui-avatars.com/api/?name=Alex+Studio&background=93ea7d&color=111411&size=128" alt="Avatar" className="w-full h-full object-cover" />
                                </div>
                                <button className="absolute bottom-0 right-0 p-2 bg-foreground text-background rounded-full shadow-xl hover:scale-110 transition-transform">
                                    <Camera size={14} strokeWidth={3} />
                                </button>
                            </div>
                            <div className="space-y-1 text-center sm:text-left">
                                <h4 className="font-black uppercase text-sm tracking-tight text-foreground">AVATAR SELECTION</h4>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70 mb-3">Recommend size: 256x256 PX (Max 2MB)</p>
                                <div className="flex gap-2 justify-center sm:justify-start">
                                    <Button variant="outline" size="sm" className="h-8 rounded-lg font-black uppercase text-[10px] tracking-widest px-4">Upload</Button>
                                    <Button variant="ghost" size="sm" className="h-8 rounded-lg font-black uppercase text-[10px] tracking-widest text-error px-4 hover:bg-error/5">Remove</Button>
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">First Name</Label>
                                <Input defaultValue="Alex" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Last Name</Label>
                                <Input defaultValue="Johnson" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold" />
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Email Address</Label>
                                <Input defaultValue="alex@luminarystudios.com" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        ),
        studio: (
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                <Card className="border-border/50 glass shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-black uppercase tracking-tight">Studio Identity</CardTitle>
                        <CardDescription className="font-bold text-[10px] uppercase opacity-60">Customize how your studio appears to guests</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Studio Name</Label>
                            <Input defaultValue="Luminary Studios" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold" />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Brand Bio</Label>
                            <Input defaultValue="Luxury wedding and fashion photography." className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold" />
                        </div>
                        <Separator className="my-2 border-border/50" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Support Phone</Label>
                                <Input defaultValue="+1 (555) 000-0000" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Office Address</Label>
                                <Input defaultValue="123 Creative Way, NY" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        ),
        billing: (
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                <Card className="border-border/50 glass shadow-sm overflow-hidden">
                    <div className="bg-primary-500/5 p-8 flex flex-col sm:flex-row items-center justify-between border-b border-border/50">
                        <div className="flex items-center gap-4 mb-4 sm:mb-0">
                            <div className="w-12 h-12 rounded-2xl bg-primary-500/10 flex items-center justify-center text-primary-500 shadow-sm border border-primary-500/10">
                                <Cloud size={24} />
                            </div>
                            <div>
                                <h4 className="text-xl font-black uppercase tracking-tight">Pro Plan</h4>
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary-600">Active Subscription</p>
                            </div>
                        </div>
                        <Badge className="bg-primary-500 text-foreground font-black uppercase tracking-widest text-[9px] px-3 py-1.5 rounded-full border-none">Next Bill: March 12, 2024</Badge>
                    </div>
                    <CardContent className="p-8">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-6 bg-muted/20 border border-border/50 rounded-3xl flex flex-col items-center text-center">
                                <Database size={24} className="text-muted-foreground mb-4" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Storage Used</span>
                                <span className="text-2xl font-black tracking-tight">156 GB / 1 TB</span>
                                <div className="w-full h-1.5 bg-muted rounded-full mt-4 overflow-hidden border border-border/20">
                                    <div className="h-full bg-primary-500 w-[15.6%] rounded-full" />
                                </div>
                            </div>
                            <div className="p-6 bg-muted/20 border border-border/50 rounded-3xl flex flex-col items-center text-center">
                                <Camera size={24} className="text-muted-foreground mb-4" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Monthly Events</span>
                                <span className="text-2xl font-black tracking-tight">24 / 50</span>
                                <div className="w-full h-1.5 bg-muted rounded-full mt-4 overflow-hidden border border-border/20">
                                    <div className="h-full bg-info w-[48%] rounded-full" />
                                </div>
                            </div>
                            <div className="p-6 bg-muted/20 border border-border/50 rounded-3xl flex flex-col items-center text-center">
                                <User size={24} className="text-muted-foreground mb-4" />
                                <span className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mb-1">Team Slots</span>
                                <span className="text-2xl font-black tracking-tight">3 / 5</span>
                                <div className="w-full h-1.5 bg-muted rounded-full mt-4 overflow-hidden border border-border/20">
                                    <div className="h-full bg-success w-[60%] rounded-full" />
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        ),
        notifications: (
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                <Card className="border-border/50 glass shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-black uppercase tracking-tight">Alert Preferences</CardTitle>
                        <CardDescription className="font-bold text-[10px] uppercase opacity-60">Control how and when you want to be notified</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        {[
                            { title: 'EVENT PUBLICATIONS', desc: 'Secure an alert when your gallery goes live', icon: Globe },
                            { title: 'BILLING NOTICES', desc: 'Alerts for payments and subscription updates', icon: CreditCard },
                            { title: 'SYSTEM ALERTS', desc: 'Critical infrastructure and maintenance updates', icon: Database },
                            { title: 'GUEST ACTIVITY', desc: 'Summary of new guest visits and shares', icon: Eye },
                        ].map((item, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-muted/20 transition-colors border border-transparent hover:border-border/30">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-muted/50 flex items-center justify-center text-muted-foreground">
                                        <item.icon size={18} />
                                    </div>
                                    <div>
                                        <h5 className="text-[10px] font-black uppercase tracking-widest">{item.title}</h5>
                                        <p className="text-[10px] font-bold text-muted-foreground tracking-tight opacity-70 uppercase">{item.desc}</p>
                                    </div>
                                </div>
                                <Switch defaultChecked className="data-[state=checked]:bg-primary-500" />
                            </div>
                        ))}
                    </CardContent>
                </Card>
            </motion.div>
        ),
        security: (
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                <Card className="border-border/50 glass shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-black uppercase tracking-tight">Access & Security</CardTitle>
                        <CardDescription className="font-bold text-[10px] uppercase opacity-60">Secure your account with advanced authentication</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="flex items-center justify-between p-5 rounded-2xl bg-muted/20 border border-border/50">
                            <div className="flex gap-4">
                                <div className="w-12 h-12 rounded-2xl bg-success/10 text-success flex items-center justify-center border border-success/10">
                                    <Shield size={24} />
                                </div>
                                <div>
                                    <h5 className="font-black uppercase text-sm tracking-tight mb-0.5">Two-Factor Authentication</h5>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70">Account status: ENHANCED PROTECTION ACTIVE</p>
                                </div>
                            </div>
                            <Button variant="outline" className="h-10 rounded-xl px-6 font-black uppercase text-[10px] tracking-widest border-border/50">REFIGURE</Button>
                        </div>
                        <Separator className="border-border/50" />
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">New Password</Label>
                                <Input type="password" placeholder="••••••••" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Confirm Sequence</Label>
                                <Input type="password" placeholder="••••••••" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        ),
        sharing: (
            <motion.div variants={staggerContainer} initial="initial" animate="animate" className="space-y-6">
                <Card className="border-border/50 glass shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-lg font-black uppercase tracking-tight">Global Defaults</CardTitle>
                        <CardDescription className="font-bold text-[10px] uppercase opacity-60">Set universal rules for new photography events</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                        <div className="space-y-1">
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <h6 className="text-[10px] font-black uppercase tracking-widest mb-1">Auto-Publication</h6>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight opacity-70">Publish events as soon as upload completes</p>
                                </div>
                                <Switch className="data-[state=checked]:bg-primary-500" />
                            </div>
                            <Separator className="border-border/50" />
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <h6 className="text-[10px] font-black uppercase tracking-widest mb-1">Guest Registration</h6>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight opacity-70">Require name and phone for gallery access</p>
                                </div>
                                <Switch defaultChecked className="data-[state=checked]:bg-primary-500" />
                            </div>
                            <Separator className="border-border/50" />
                            <div className="flex items-center justify-between py-4">
                                <div>
                                    <h6 className="text-[10px] font-black uppercase tracking-widest mb-1">Smart Sorting</h6>
                                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-tight opacity-70">Sort photos by AI relevance and detected faces</p>
                                </div>
                                <Switch defaultChecked className="data-[state=checked]:bg-primary-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        )
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="max-w-7xl mx-auto pb-12"
        >
            <div className="flex items-center justify-between mb-10">
                <div>
                    <h1 className="text-4xl font-black tracking-tight uppercase">Settings</h1>
                    <p className="text-muted-foreground font-bold text-sm uppercase opacity-70 mt-1">Configure your environment and workspace</p>
                </div>
                <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                    <Button className="bg-primary-500 hover:bg-primary-600 text-foreground h-11 px-8 rounded-xl font-black uppercase text-[10px] tracking-widest gap-2 shadow-lg shadow-primary-500/20">
                        <Save size={16} strokeWidth={3} />
                        Save Sync
                    </Button>
                </motion.div>
            </div>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Sidebar Navigation */}
                <Card className="w-full lg:w-80 h-fit border-border/50 glass shadow-sm p-4 rounded-[2rem]">
                    <div className="space-y-1.5">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cn(
                                    "w-full flex items-center gap-3 px-4 py-3.5 rounded-2xl transition-all duration-300 group",
                                    activeTab === tab.id
                                        ? "bg-primary-50 text-foreground ring-1 ring-border/30"
                                        : "hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                                )}
                            >
                                <div className={cn(
                                    "w-9 h-9 rounded-xl flex items-center justify-center transition-colors",
                                    activeTab === tab.id ? "bg-white text-primary-500 shadow-sm" : "bg-muted/50 text-muted-foreground group-hover:text-foreground"
                                )}>
                                    <tab.icon size={18} />
                                </div>
                                <span className="font-black uppercase text-[10px] tracking-widest text-left flex-1">{tab.label}</span>
                                {activeTab === tab.id && (
                                    <motion.div layoutId="active-indicator" className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                                )}
                            </button>
                        ))}
                    </div>
                    <Separator className="my-6 border-border/50" />
                    <div className="px-4 py-2 space-y-4">
                        <div className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors cursor-pointer group">
                            <div className="w-9 h-9 rounded-xl bg-muted/50 flex items-center justify-center group-hover:bg-muted/80">
                                <HelpCircle size={18} />
                            </div>
                            <span className="font-black uppercase text-[10px] tracking-widest">Support Core</span>
                        </div>
                    </div>
                </Card>

                {/* Content Area */}
                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {tabContent[activeTab]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </motion.div>
    );
};

export default Settings;
