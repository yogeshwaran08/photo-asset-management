import { useState } from 'react';
import {
    User,
    CreditCard,
    Bell,
    Shield,
    Globe,
    Camera,
    HelpCircle,
    HardDrive,
    Box as BoxIcon,
    BarChart3,
    Lock,
    Link as LinkIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

type SettingsTab = 'profile' | 'branding' | 'domains' | 'integrations' | 'plans' | 'invoices';

const Settings = () => {
    const [activeTab, setActiveTab] = useState<SettingsTab>('profile');

    const tabs: { id: SettingsTab; label: string; icon: any }[] = [
        { id: 'profile', label: 'Profile', icon: User },
        { id: 'branding', label: 'Branding', icon: Camera },
        { id: 'domains', label: 'Domains', icon: Globe },
        { id: 'integrations', label: 'Integrations', icon: Bell },
        { id: 'plans', label: 'My Plans', icon: Shield },
        { id: 'invoices', label: 'Invoices', icon: CreditCard },
    ];

    const tabContent = {
        profile: (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Personal Details */}
                    <Card className="border-border/50 glass shadow-sm h-full">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-primary-500">Personal Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Full Name</Label>
                                <Input defaultValue="Dhanish Raza" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold text-xs" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Mobile Number</Label>
                                <div className="flex gap-2">
                                    <Input defaultValue="+91" className="w-20 bg-muted/30 border-border/50 rounded-xl h-11 font-bold text-xs text-center" />
                                    <Input defaultValue="89219 70311" className="flex-1 bg-muted/30 border-border/50 rounded-xl h-11 font-bold text-xs" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Email Id</Label>
                                <Input defaultValue="adhanishraza7@gmail.com" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold text-xs" />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Country</Label>
                                    <Input defaultValue="India" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold text-xs" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">State</Label>
                                    <Input defaultValue="Tamil Nadu" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold text-xs" />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">City</Label>
                                <Input defaultValue="Chennai" className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold text-xs" />
                            </div>
                        </CardContent>
                    </Card>

                    {/* Company Details */}
                    <Card className="border-border/50 glass shadow-sm h-full">
                        <CardHeader className="pb-4">
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-primary-500">Company Details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-8">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Company Name</Label>
                                <Input defaultValue="dhanish" className="bg-muted/30 border-border/50 rounded-xl h-14 font-bold text-xs" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Industry</Label>
                                <Select defaultValue="photographer">
                                    <SelectTrigger className="h-14 rounded-xl bg-muted/30 border-border/50 font-bold text-xs">
                                        <SelectValue placeholder="Select Industry" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="photographer">Photographer</SelectItem>
                                        <SelectItem value="event_organiser">Event Organiser</SelectItem>
                                        <SelectItem value="enterprise">Enterprise</SelectItem>
                                        <SelectItem value="event_tech_provider">Event Tech Provider</SelectItem>
                                        <SelectItem value="sports_organisation">Sports Organisation</SelectItem>
                                        <SelectItem value="educational_institutions">Educational Institutions</SelectItem>
                                        <SelectItem value="individual">Individual</SelectItem>
                                        <SelectItem value="others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Area</Label>
                                <Select defaultValue="wedding">
                                    <SelectTrigger className="h-14 rounded-xl bg-muted/30 border-border/50 font-bold text-xs">
                                        <SelectValue placeholder="Select Industry Areas" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="wedding">Wedding</SelectItem>
                                        <SelectItem value="corporate">Corporate</SelectItem>
                                        <SelectItem value="baby_shoot">Baby Shoot</SelectItem>
                                        <SelectItem value="maternity">Maternity</SelectItem>
                                        <SelectItem value="fashion">Fashion</SelectItem>
                                        <SelectItem value="freelancer">Freelancer</SelectItem>
                                        <SelectItem value="others">Others</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Average Number of Events per Year</Label>
                                <Input placeholder="e.g. 50" className="bg-muted/30 border-border/50 rounded-xl h-14 font-bold text-xs" />
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Billing Details */}
                <Card className="border-border/50 glass shadow-sm">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-primary-500">Billing Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Company Name (As Per Official GST/VAT Document)</Label>
                                <Input className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold text-xs" />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">GST/VAT Number</Label>
                                <Input className="bg-muted/30 border-border/50 rounded-xl h-11 font-bold text-xs" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex justify-end pt-4">
                    <Button className="h-12 px-10 rounded-xl bg-primary-500 hover:bg-primary-600 text-foreground font-black uppercase text-xs tracking-widest shadow-lg shadow-primary-500/20">
                        Save Changes
                    </Button>
                </div>
            </motion.div>
        ),
        branding: (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[400px] border border-dashed border-border/50 rounded-3xl bg-muted/5 space-y-4">
                <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-2 shadow-inner">
                    <Camera size={32} className="text-muted-foreground opacity-50" />
                </div>
                <h3 className="text-lg font-black uppercase tracking-tight text-foreground">You don't have any brandings</h3>
                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-70 max-w-xs text-center">Create a new brand identity for your studio to share with clients.</p>
                <Button className="mt-4 bg-primary-500 hover:bg-primary-600 text-foreground px-8 rounded-xl font-black uppercase text-[10px] tracking-widest h-10 shadow-lg shadow-primary-500/20">
                    Add Brand
                </Button>
            </motion.div>
        ),
        domains: (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card className="border-border/50 glass shadow-sm flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-primary-500">Connect Domain</CardTitle>
                            <CardDescription className="font-bold text-[10px] uppercase opacity-60 mt-1">
                                Connect your own domain and display galleries under your branding. eg your.company.com
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full font-black uppercase text-[10px] tracking-widest">Connect</Button>
                        </CardContent>
                    </Card>
                    <Card className="border-border/50 glass shadow-sm flex flex-col justify-between">
                        <CardHeader>
                            <CardTitle className="text-sm font-black uppercase tracking-widest text-primary-500">Connect Sub-Domain</CardTitle>
                            <CardDescription className="font-bold text-[10px] uppercase opacity-60 mt-1">
                                Connect subdomain to show your brand name first. eg company.fotoowl.ai
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button variant="outline" className="w-full font-black uppercase text-[10px] tracking-widest">Connect</Button>
                        </CardContent>
                    </Card>
                </div>

                <Card className="border-border/50 glass shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-primary-500">Foto Owl Domains</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="rounded-xl border border-border/50 bg-muted/20 overflow-hidden">
                            <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/50 bg-muted/30">
                                <div className="col-span-8 text-[10px] font-black uppercase tracking-widest opacity-70">Domain Name</div>
                                <div className="col-span-4 text-[10px] font-black uppercase tracking-widest opacity-70">Status</div>
                            </div>
                            <div className="grid grid-cols-12 gap-4 p-4 items-center">
                                <div className="col-span-8 font-bold text-xs truncate">site.fotoowl.ai/dhanishprimary</div>
                                <div className="col-span-4">
                                    <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 uppercase text-[9px] font-black tracking-widest">
                                        Active
                                    </Badge>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>
        ),
        integrations: (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <Tabs defaultValue="storage" className="w-full">
                    <TabsList className="w-full justify-start border-b border-border/50 bg-transparent p-0 mb-8 rounded-none h-auto">
                        <TabsTrigger value="storage" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 font-black uppercase text-[10px] tracking-widest text-muted-foreground data-[state=active]:text-foreground transition-all">
                            Storage Integrations
                        </TabsTrigger>
                        <TabsTrigger value="analytics" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 font-black uppercase text-[10px] tracking-widest text-muted-foreground data-[state=active]:text-foreground transition-all">
                            Analytics Integrations
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="storage" className="mt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {/* Google Drive */}
                            <Card className="border-border/50 glass shadow-sm flex flex-col">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500">
                                            <HardDrive size={16} />
                                        </div>
                                        <CardTitle className="text-xs font-black uppercase tracking-wide">Google Drive</CardTitle>
                                    </div>
                                    <HelpCircle size={14} className="text-muted-foreground/50" />
                                </CardHeader>
                                <CardContent className="pt-6 flex flex-col flex-1 gap-4">
                                    <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                                        Connect your Google Drive to automatically copy your photos to Foto Owl Event.
                                    </p>
                                    <div className="bg-amber-500/10 text-amber-600 p-3 rounded-lg text-[10px] font-bold leading-relaxed mt-auto">
                                        Use Public Link to import photos to Foto Owl Event, under upload section in the event
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Dropbox */}
                            <Card className="border-border/50 glass shadow-sm flex flex-col">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                                            <BoxIcon size={16} />
                                        </div>
                                        <CardTitle className="text-xs font-black uppercase tracking-wide">Dropbox</CardTitle>
                                    </div>
                                    <HelpCircle size={14} className="text-muted-foreground/50" />
                                </CardHeader>
                                <CardContent className="pt-6 flex flex-col flex-1 gap-6">
                                    <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                                        Connect your Dropbox to automatically copy your photos to Foto Owl Event.
                                    </p>
                                    <div className="mt-auto space-y-3">
                                        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest h-10 rounded-xl shadow-lg shadow-emerald-500/20 gap-2">
                                            <LinkIcon size={14} />
                                            Connect
                                        </Button>
                                        <div className="flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
                                            <Lock size={10} />
                                            <span>Upgrade to connect</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Box */}
                            <Card className="border-border/50 glass shadow-sm flex flex-col">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/50">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-sky-500/10 flex items-center justify-center text-sky-500">
                                            <BoxIcon size={16} />
                                        </div>
                                        <CardTitle className="text-xs font-black uppercase tracking-wide">Box</CardTitle>
                                    </div>
                                    <HelpCircle size={14} className="text-muted-foreground/50" />
                                </CardHeader>
                                <CardContent className="pt-6 flex flex-col flex-1 gap-6">
                                    <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                                        Connect your Box account to automatically copy your photos to Foto Owl Event.
                                    </p>
                                    <div className="mt-auto space-y-3">
                                        <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest h-10 rounded-xl shadow-lg shadow-emerald-500/20 gap-2">
                                            <LinkIcon size={14} />
                                            Connect
                                        </Button>
                                        <div className="flex items-center justify-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-muted-foreground/70">
                                            <Lock size={10} />
                                            <span>Upgrade to connect</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="analytics" className="mt-0">
                        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {[
                                { name: 'Google Analytics 4', icon: BarChart3, color: 'text-orange-500', bg: 'bg-orange-500/10', label: 'GA4 Measurement ID' },
                                { name: 'Meta Pixel', icon: Globe, color: 'text-blue-600', bg: 'bg-blue-600/10', label: 'Pixel ID' },
                                { name: 'Google Tag Manager', icon: LinkIcon, color: 'text-blue-500', bg: 'bg-blue-500/10', label: 'GTM ID' },
                                { name: 'Microsoft Clarity', icon: BarChart3, color: 'text-indigo-500', bg: 'bg-indigo-500/10', label: 'Clarity Project ID' },
                            ].map((item, i) => (
                                <Card key={i} className="border-border/50 glass shadow-sm">
                                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4 border-b border-border/50">
                                        <div className="flex items-center gap-3">
                                            <div className={`w-8 h-8 rounded-lg ${item.bg} flex items-center justify-center ${item.color}`}>
                                                <item.icon size={16} />
                                            </div>
                                            <CardTitle className="text-xs font-black uppercase tracking-wide">{item.name}</CardTitle>
                                        </div>
                                        <HelpCircle size={14} className="text-muted-foreground/50" />
                                    </CardHeader>
                                    <CardContent className="pt-6 space-y-4">
                                        <div className="space-y-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">{item.label}</Label>
                                            <div className="flex gap-2">
                                                <Input className="bg-muted/30 border-border/50 rounded-xl h-10 font-bold text-xs" />
                                                <Button className="bg-emerald-500 hover:bg-emerald-600 text-white font-black uppercase text-[10px] tracking-widest h-10 px-4 rounded-xl shadow-lg shadow-emerald-500/20 gap-2 shrink-0">
                                                    <LinkIcon size={12} />
                                                    Connect
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </TabsContent>
                </Tabs>
            </motion.div>
        ),
        plans: <></>,
        invoices: (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                <Card className="border-border/50 glass shadow-sm">
                    <CardHeader>
                        <CardTitle className="text-sm font-black uppercase tracking-widest text-primary-500">Invoices</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Tabs defaultValue="all" className="w-full">
                            <TabsList className="mb-8">
                                <TabsTrigger value="all" className="font-black uppercase text-[10px] tracking-widest">All</TabsTrigger>
                                <TabsTrigger value="subscription" className="font-black uppercase text-[10px] tracking-widest">Subscription</TabsTrigger>
                            </TabsList>
                            <TabsContent value="all" className="flex flex-col items-center justify-center py-20 border border-dashed border-border/50 rounded-2xl bg-muted/5">
                                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4 shadow-inner">
                                    <CreditCard size={24} className="text-muted-foreground opacity-50" />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-foreground">No invoices found</h3>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-70 mt-1">You don't have any invoices yet.</p>
                            </TabsContent>
                            <TabsContent value="subscription" className="flex flex-col items-center justify-center py-20 border border-dashed border-border/50 rounded-2xl bg-muted/5">
                                <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4 shadow-inner">
                                    <CreditCard size={24} className="text-muted-foreground opacity-50" />
                                </div>
                                <h3 className="text-lg font-black uppercase tracking-tight text-foreground">No invoices found</h3>
                                <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-70 mt-1">You don't have any invoices yet.</p>
                            </TabsContent>
                        </Tabs>
                    </CardContent>
                </Card>
            </motion.div>
        ),
    };

    return (
        <div className="flex h-full bg-[#fcfcfc] dark:bg-zinc-950">
            {/* Sub-Sidebar Navigation */}
            <aside className="w-72 border-r border-border/50 bg-white/50 backdrop-blur-xl flex flex-col h-full sticky top-0 overflow-hidden">
                <div className="h-6" />

                <nav className="flex-1 px-4 space-y-2 mt-4">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                "w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all duration-300 group",
                                activeTab === tab.id
                                    ? "bg-white text-foreground shadow-md ring-1 ring-black/5"
                                    : "hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <div className={cn(
                                "w-9 h-9 rounded-xl flex items-center justify-center transition-colors shrink-0",
                                activeTab === tab.id ? "bg-primary-500 text-white shadow-lg shadow-primary-500/20" : "bg-muted/50 text-muted-foreground group-hover:text-foreground"
                            )}>
                                <tab.icon size={16} strokeWidth={2.5} />
                            </div>
                            <span className="font-black uppercase text-[10px] tracking-widest text-left flex-1">{tab.label}</span>
                            {activeTab === tab.id && (
                                <motion.div layoutId="active-indicator-settings" className="w-1.5 h-1.5 rounded-full bg-primary-500" />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="p-6 mt-auto">
                    <div className="p-4 rounded-2xl bg-muted/20 border border-border/50 space-y-3">
                        <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500">
                                <HelpCircle size={16} />
                            </div>
                            <div>
                                <h5 className="font-black uppercase text-[10px] tracking-widest">Need Help?</h5>
                                <p className="text-[9px] text-muted-foreground">Contact support</p>
                            </div>
                        </div>
                        <Button variant="outline" size="sm" className="w-full text-[10px] font-black uppercase tracking-widest h-8 bg-white">Get Support</Button>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 h-full overflow-y-auto bg-muted/20 relative">
                {/* Top Actions Bar (Sticky) */}
                <div className="sticky top-0 z-30 flex items-center justify-between px-10 py-6 bg-white/40 backdrop-blur-md border-b border-border/10">
                    <div>
                        <h3 className="text-lg font-black uppercase tracking-tight">{tabs.find(t => t.id === activeTab)?.label}</h3>
                    </div>
                    <div className="flex-1"></div>
                </div>

                <div className="max-w-5xl mx-auto p-10 pb-24">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.98 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                        >
                            {tabContent[activeTab]}
                        </motion.div>
                    </AnimatePresence>
                </div>
            </main>
        </div>
    );
};

export default Settings;
