import { motion } from 'framer-motion';
import {
    HelpCircle,
    HardDrive,
    Box as BoxIcon,
    BarChart3,
    Lock,
    Link as LinkIcon,
    Globe
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Integrations = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Tabs defaultValue="storage" className="w-full">
                <TabsList className="w-full justify-start border-b border-border/50 bg-transparent p-0 mb-8 rounded-none h-auto">
                    <TabsTrigger value="storage" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 uppercase text-[10px] tracking-widest text-muted-foreground data-[state=active]:text-foreground transition-all">
                        Storage Integrations
                    </TabsTrigger>
                    <TabsTrigger value="analytics" className="rounded-none border-b-2 border-transparent data-[state=active]:border-primary-500 data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-3 uppercase text-[10px] tracking-widest text-muted-foreground data-[state=active]:text-foreground transition-all">
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
                                    <CardTitle className="text-xs uppercase tracking-wide">Google Drive</CardTitle>
                                </div>
                                <HelpCircle size={14} className="text-muted-foreground/50" />
                            </CardHeader>
                            <CardContent className="pt-6 flex flex-col flex-1 gap-4">
                                <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                                    Connect your Google Drive to automatically copy your photos to Foto Owl Event.
                                </p>
                                <div className="bg-amber-500/10 text-amber-600 p-3 rounded-lg text-[10px] leading-relaxed mt-auto">
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
                                    <CardTitle className="text-xs uppercase tracking-wide">Dropbox</CardTitle>
                                </div>
                                <HelpCircle size={14} className="text-muted-foreground/50" />
                            </CardHeader>
                            <CardContent className="pt-6 flex flex-col flex-1 gap-6">
                                <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                                    Connect your Dropbox to automatically copy your photos to Foto Owl Event.
                                </p>
                                <div className="mt-auto space-y-3">
                                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white uppercase text-[10px] tracking-widest h-10 rounded-xl shadow-lg shadow-emerald-500/20 gap-2">
                                        <LinkIcon size={14} />
                                        Connect
                                    </Button>
                                    <div className="flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-widest text-muted-foreground/70">
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
                                    <CardTitle className="text-xs uppercase tracking-wide">Box</CardTitle>
                                </div>
                                <HelpCircle size={14} className="text-muted-foreground/50" />
                            </CardHeader>
                            <CardContent className="pt-6 flex flex-col flex-1 gap-6">
                                <p className="text-[11px] font-medium text-muted-foreground leading-relaxed">
                                    Connect your Box account to automatically copy your photos to Foto Owl Event.
                                </p>
                                <div className="mt-auto space-y-3">
                                    <Button className="w-full bg-emerald-500 hover:bg-emerald-600 text-white uppercase text-[10px] tracking-widest h-10 rounded-xl shadow-lg shadow-emerald-500/20 gap-2">
                                        <LinkIcon size={14} />
                                        Connect
                                    </Button>
                                    <div className="flex items-center justify-center gap-1.5 text-[9px] uppercase tracking-widest text-muted-foreground/70">
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
                                        <CardTitle className="text-xs uppercase tracking-wide">{item.name}</CardTitle>
                                    </div>
                                    <HelpCircle size={14} className="text-muted-foreground/50" />
                                </CardHeader>
                                <CardContent className="pt-6 space-y-4">
                                    <div className="space-y-2">
                                        <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">{item.label}</Label>
                                        <div className="flex gap-2">
                                            <Input className="bg-muted/30 border-border/50 rounded-xl h-10 text-xs" />
                                            <Button className="bg-emerald-500 hover:bg-emerald-600 text-white uppercase text-[10px] tracking-widest h-10 px-4 rounded-xl shadow-lg shadow-emerald-500/20 gap-2 shrink-0">
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
    );
};

export default Integrations;
