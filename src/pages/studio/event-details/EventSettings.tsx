import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    Download,
    MessageCircle,
    Info,
    Smartphone,
    Folder,
    Shield,
    UserCheck,
    Eye,
    Lock,
    Settings,
    ServerCrash,
    Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { eventService, type Event as EventType } from '@/services/eventService';
import { EventHeader } from './EventHeader';

const EventSettings = () => {
    const { eventId } = useParams();
    const [eventSettings, setEventSettings] = useState<EventType | null>(null);
    const [settingsTab, setSettingsTab] = useState('general');

    useEffect(() => {
        if (eventId) {
            fetchEventDetails();
        }
    }, [eventId]);

    const fetchEventDetails = async () => {
        if (!eventId) return;
        try {
            const data = await eventService.getById(Number(eventId));
            setEventSettings(data);
        } catch (error) {
            console.error('Failed to fetch event details:', error);
        }
    };

    return (
        <div className="flex flex-col h-full w-full">
            <EventHeader
                actions={
                    <div className="flex bg-white/50 p-1 rounded-xl border border-border/40 shadow-sm backdrop-blur-sm">
                        {[
                            { id: 'general', label: 'General', icon: Settings },
                            { id: 'privacy', label: 'Privacy', icon: Shield },
                            { id: 'downloads', label: 'Downloads', icon: Download }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setSettingsTab(tab.id)}
                                className={cn(
                                    "px-4 py-1.5 rounded-lg text-[10px] font-black uppercase tracking-wider transition-all flex items-center gap-2",
                                    settingsTab === tab.id ? "bg-zinc-800 text-white shadow-md" : "text-muted-foreground hover:bg-zinc-50/50 hover:text-zinc-900"
                                )}
                            >
                                <tab.icon size={12} />
                                {tab.label}
                            </button>
                        ))}
                    </div>
                }
            >
                <div className="space-y-1">
                    <h2 className="text-xl font-black text-zinc-800 tracking-tight">Event Settings</h2>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Manage event settings</p>
                </div>
            </EventHeader>

            <div className="flex-1 w-full overflow-y-auto">
                <div className="w-full max-w-7xl mx-auto space-y-8 p-12 pb-24">
                    {/* Settings Content */}
                    <div className="w-full">
                        <div className="w-full max-w-none space-y-8">
                            {settingsTab === 'general' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                    {/* General Info Form */}
                                    <div className="grid grid-cols-2 gap-8">
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Event Name</Label>
                                            <Input
                                                defaultValue={eventSettings?.name}
                                                className="h-12 rounded-xl bg-white border-border/40 font-bold text-xs shadow-sm focus:ring-0 focus:border-zinc-800 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Event Type</Label>
                                            <Input
                                                defaultValue={eventSettings?.event_type}
                                                className="h-12 rounded-xl bg-white border-border/40 font-bold text-xs shadow-sm focus:ring-0 focus:border-zinc-800 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Event Date</Label>
                                            <Input
                                                type="date"
                                                defaultValue={eventSettings?.start_date?.split('T')[0]} // Assuming ISO string
                                                className="h-12 rounded-xl bg-white border-border/40 font-bold text-xs shadow-sm focus:ring-0 focus:border-zinc-800 transition-all"
                                            />
                                        </div>
                                        <div className="space-y-3">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Event Expiry Date</Label>
                                            <Input
                                                type="date"
                                                defaultValue={eventSettings?.end_date?.split('T')[0]}
                                                className="h-12 rounded-xl bg-white border-border/40 font-bold text-xs shadow-sm focus:ring-0 focus:border-zinc-800 transition-all"
                                            />
                                        </div>

                                        <div className="space-y-3 col-span-2">
                                            <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Event Description</Label>
                                            <Textarea
                                                defaultValue={eventSettings?.description}
                                                className="min-h-[120px] rounded-2xl bg-white border-border/40 font-medium text-xs shadow-sm resize-none focus:ring-0 focus:border-zinc-800 transition-all p-4"
                                            />
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-border/40" />

                                    {/* Feature Toggles */}
                                    <div className="space-y-12">
                                        {/* Download Options */}
                                        <div className="space-y-6">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                <Download size={16} /> Download Options
                                            </h3>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <Label className="text-[10px] font-bold text-zinc-700">Bulk Download</Label>
                                                        <Switch />
                                                    </div>
                                                    <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                        Turn On to allow clients to download all the photos
                                                    </p>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <Label className="text-[10px] font-bold text-zinc-700">Single Download</Label>
                                                        <Switch />
                                                    </div>
                                                    <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                        Turn On to allow clients to download individual photos
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="h-px w-full bg-border/40" />

                                        {/* Client Notification */}
                                        <div className="space-y-6">
                                            <h3 className="text-xs font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                <MessageCircle size={16} /> Client Notification
                                            </h3>
                                            <div className="grid grid-cols-2 gap-8">
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <Label className="text-[10px] font-bold text-zinc-700">WhatsApp</Label>
                                                            <Info size={12} className="text-muted-foreground" />
                                                        </div>
                                                        <Switch />
                                                    </div>
                                                    <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                        Turn On to send WhatsApp Notifications when photos are ready
                                                        <br />
                                                        <span className="opacity-70">Make sure you have enough credits to send WhatsApp notifications</span>
                                                    </p>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="flex items-center justify-between">
                                                        <div className="flex items-center gap-2">
                                                            <Label className="text-[10px] font-bold text-zinc-700">Email</Label>
                                                            <Info size={12} className="text-muted-foreground" />
                                                        </div>
                                                        <Switch />
                                                    </div>
                                                    <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                        Turn On to send Email Notifications when photos are ready
                                                    </p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="h-px w-full bg-border/40" />

                                        {/* Gallery App */}
                                        <div className="space-y-6">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                <Smartphone size={16} /> Gallery App
                                            </h3>
                                            <div className="space-y-4">
                                                <div className="flex items-center justify-between">
                                                    <div className="flex items-center gap-2">
                                                        <Label className="text-[10px] font-bold text-zinc-700">Progressive Web App (PWA)</Label>
                                                        <Info size={12} className="text-muted-foreground" />
                                                    </div>
                                                    <Switch />
                                                </div>
                                                <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                    Turn On to enable Progressive Web App features for this event
                                                </p>
                                            </div>
                                        </div>

                                        <div className="h-px w-full bg-border/40" />

                                        {/* Branding & Language */}
                                        <div className="grid grid-cols-2 gap-12">
                                            <div className="space-y-6">
                                                <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                    Branding
                                                </h3>
                                                <div className="space-y-3">
                                                    <Button variant="outline" className="h-12 w-full justify-start gap-3 rounded-xl border-dashed border-border hover:bg-zinc-50 hover:border-zinc-300 transition-all text-[10px] font-bold text-muted-foreground hover:text-foreground">
                                                        <div className="w-6 h-6 rounded-md bg-zinc-100 flex items-center justify-center">
                                                            <Folder size={12} />
                                                        </div>
                                                        Add branding
                                                    </Button>
                                                    <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                        Branding will increase your reach to potential clients
                                                    </p>
                                                </div>
                                            </div>

                                            <div className="space-y-6">
                                                <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                    Gallery Language
                                                </h3>
                                                <div className="space-y-3">
                                                    <Select defaultValue="auto">
                                                        <SelectTrigger className="h-12 rounded-xl border-border/40 bg-white font-bold text-[10px] shadow-sm">
                                                            <SelectValue placeholder="Select Language" />
                                                        </SelectTrigger>
                                                        <SelectContent className="rounded-xl border-border/40">
                                                            <SelectItem value="auto" className="font-bold text-[10px]">Auto Detect</SelectItem>
                                                            <SelectItem value="en" className="font-bold text-[10px]">English</SelectItem>
                                                            <SelectItem value="es" className="font-bold text-[10px]">Spanish</SelectItem>
                                                            <SelectItem value="fr" className="font-bold text-[10px]">French</SelectItem>
                                                        </SelectContent>
                                                    </Select>
                                                    <p className="text-[10px] text-transparent select-none">Spacer</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Delete Event */}
                                    <div className="flex flex-col items-center pt-16 pb-8">
                                        <Button variant="destructive" className="bg-red-50 text-red-500 hover:bg-red-100/80 hover:text-red-600 border border-transparent hover:border-red-200 shadow-none font-black uppercase tracking-widest h-14 px-10 rounded-2xl transition-all active:scale-95">
                                            Delete Event
                                        </Button>
                                        <span className="text-[9px] font-bold text-red-400/60 uppercase tracking-wider mt-4">This action cannot be undone</span>
                                    </div>
                                </motion.div>
                            )}
                            {settingsTab === 'privacy' && (
                                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-12">
                                    {/* Guest Selfie Validation */}
                                    <div className="space-y-6">
                                        <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                            <UserCheck size={16} /> Guest Selfie Validation
                                        </h3>
                                        <RadioGroup defaultValue="no-validation" className="grid grid-cols-1 gap-4">
                                            <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-border/40 hover:border-zinc-300 transition-all cursor-pointer">
                                                <RadioGroupItem value="no-validation" id="r1" />
                                                <Label htmlFor="r1" className="flex-1 cursor-pointer">
                                                    <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">No Validation</div>
                                                    <div className="text-[9px] text-muted-foreground mt-0.5 font-medium">Guest just need to click a selfie</div>
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-border/40 hover:border-zinc-300 transition-all cursor-pointer">
                                                <RadioGroupItem value="liveliness" id="r2" />
                                                <Label htmlFor="r2" className="flex-1 cursor-pointer">
                                                    <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">Liveliness Validation</div>
                                                    <div className="text-[9px] text-muted-foreground mt-0.5 font-medium">Guest will need to rotate head to verify the liveliness</div>
                                                </Label>
                                            </div>
                                            <div className="flex items-center space-x-3 bg-white p-4 rounded-xl border border-border/40 hover:border-zinc-300 transition-all cursor-pointer">
                                                <RadioGroupItem value="face-only" id="r3" />
                                                <Label htmlFor="r3" className="flex-1 cursor-pointer">
                                                    <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">Face Only</div>
                                                    <div className="text-[9px] text-muted-foreground mt-0.5 font-medium">Guests will get their images by uploading selfie</div>
                                                </Label>
                                            </div>
                                        </RadioGroup>
                                    </div>

                                    <div className="h-px w-full bg-border/40" />

                                    {/* Face Search Form */}
                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                <Users size={16} /> Face Search Form
                                            </h3>
                                            <p className="text-[9px] text-muted-foreground font-medium leading-relaxed ml-6">
                                                Details to take when using guests use Face Search Feature
                                            </p>
                                        </div>

                                        <div className="space-y-3 bg-white/50 rounded-2xl p-6 border border-border/40">
                                            {['Name', 'Email Id', 'Mobile Number'].map((item, i) => (
                                                <div key={item} className="flex items-center justify-between py-2">
                                                    <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-700 w-32">{i + 1}. {item}</span>
                                                    <div className="flex items-center gap-8">
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox id={`show-${i}`} className="w-4 h-4 rounded-md" />
                                                            <Label htmlFor={`show-${i}`} className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground cursor-pointer">Show</Label>
                                                        </div>
                                                        <div className="flex items-center gap-2">
                                                            <Checkbox id={`req-${i}`} className="w-4 h-4 rounded-md" />
                                                            <Label htmlFor={`req-${i}`} className="text-[9px] font-bold uppercase tracking-wider text-muted-foreground cursor-pointer">Required</Label>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-border/40" />

                                    {/* Event Visibility */}
                                    <div className="space-y-6">
                                        <div className="space-y-1">
                                            <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                <Eye size={16} /> Event Visibility
                                            </h3>
                                            <p className="text-[9px] text-muted-foreground font-medium leading-relaxed ml-6">
                                                Public Events will be visible under your public page
                                            </p>
                                        </div>

                                        <div className="space-y-4 bg-white/50 rounded-2xl p-6 border border-border/40">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <Label className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">Public</Label>
                                                    <p className="text-[9px] text-muted-foreground font-medium">Turn ON to make event public</p>
                                                </div>
                                                <switch />
                                                <Switch />
                                            </div>

                                            <div className="flex items-center gap-2 text-orange-500/80 bg-orange-50/50 p-3 rounded-xl">
                                                <Lock size={12} />
                                                <span className="text-[9px] font-bold uppercase tracking-wider">You can secure it by enabling PIN</span>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="h-px w-full bg-border/40" />

                                    {/* Enable PIN & Access Level */}
                                    <div className="space-y-8">
                                        <div className="space-y-6">
                                            <div className="flex items-center justify-between">
                                                <div className="space-y-0.5">
                                                    <div className="flex items-center gap-2">
                                                        <Label className="text-[10px] font-black uppercase tracking-widest text-zinc-800">Enable PIN</Label>
                                                    </div>
                                                    <p className="text-[9px] text-muted-foreground font-medium">Secure the access using PIN</p>
                                                    <p className="text-[9px] text-muted-foreground font-medium opacity-70">Access Level will be decided by PIN</p>
                                                </div>
                                                <Switch />
                                            </div>

                                            <div className="space-y-4 pt-2">
                                                <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">Default Access Level</Label>
                                                <RadioGroup defaultValue="guest" className="grid grid-cols-2 gap-4">
                                                    <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-border/40 hover:border-zinc-300 transition-all cursor-pointer">
                                                        <RadioGroupItem value="guest" id="al-guest" className="mt-0.5" />
                                                        <Label htmlFor="al-guest" className="flex-1 cursor-pointer">
                                                            <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">Guest Access</div>
                                                            <div className="text-[9px] text-muted-foreground mt-1 font-medium leading-relaxed">Own images can be accessed using selfie</div>
                                                        </Label>
                                                    </div>
                                                    <div className="flex items-start space-x-3 bg-white p-4 rounded-xl border border-border/40 hover:border-zinc-300 transition-all cursor-pointer">
                                                        <RadioGroupItem value="full" id="al-full" className="mt-0.5" />
                                                        <Label htmlFor="al-full" className="flex-1 cursor-pointer">
                                                            <div className="text-[10px] font-bold text-zinc-800 uppercase tracking-wide">Full Access</div>
                                                            <div className="text-[9px] text-muted-foreground mt-1 font-medium leading-relaxed">All the images can be accessed.</div>
                                                        </Label>
                                                    </div>
                                                </RadioGroup>
                                            </div>
                                        </div>

                                        {/* Privacy PINS */}
                                        <div className="bg-white/50 rounded-[1.5rem] p-8 border border-border/40 space-y-8">
                                            <div className="space-y-1">
                                                <h3 className="text-[10px] font-black uppercase tracking-widest flex items-center gap-2 text-zinc-800">
                                                    <Shield size={16} /> Privacy
                                                </h3>
                                                <p className="text-[9px] text-muted-foreground font-medium leading-relaxed">
                                                    How your clients should get notified about their photos
                                                </p>
                                            </div>

                                            <div className="grid grid-cols-2 gap-12">
                                                <div className="space-y-3">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Guest access PIN</Label>
                                                    <div className="relative">
                                                        <Input
                                                            defaultValue="1514"
                                                            className="h-12 rounded-xl bg-white border-border/40 font-bold text-xs shadow-sm focus:ring-0 focus:border-zinc-800 transition-all tracking-widest"
                                                            maxLength={4}
                                                        />
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-muted-foreground/30">PIN</div>
                                                    </div>
                                                    <p className="text-[9px] text-muted-foreground font-medium pl-1">* Please provide 4 digit PIN</p>
                                                </div>

                                                <div className="space-y-3">
                                                    <Label className="text-[10px] font-black uppercase tracking-widest text-muted-foreground pl-1">Full access PIN</Label>
                                                    <div className="relative">
                                                        <Input
                                                            defaultValue="1206"
                                                            className="h-12 rounded-xl bg-white border-border/40 font-bold text-xs shadow-sm focus:ring-0 focus:border-zinc-800 transition-all tracking-widest"
                                                            maxLength={4}
                                                        />
                                                        <div className="absolute right-4 top-1/2 -translate-y-1/2 text-[9px] font-black text-muted-foreground/30">PIN</div>
                                                    </div>
                                                    <div className="space-y-0.5 pl-1">
                                                        <p className="text-[9px] text-muted-foreground font-medium">* Please provide 4 digit PIN</p>
                                                        <p className="text-[9px] text-emerald-600/80 font-bold uppercase tracking-wide">* All images can be accessed.</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            )}
                            {settingsTab === 'downloads' && (
                                <DownloadsTab />
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DownloadsTab = () => {
    const [downloadTab, setDownloadTab] = useState('All');

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Download Tabs */}
            <div className="flex items-center gap-8 border-b border-border/40 w-full">
                {['All', 'Pending', 'Started', 'Complete', 'Failed'].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setDownloadTab(tab)}
                        className={cn(
                            "pb-3 text-[10px] font-black uppercase tracking-widest relative transition-colors",
                            downloadTab === tab ? "text-zinc-800" : "text-muted-foreground hover:text-zinc-600"
                        )}
                    >
                        {tab}
                        {downloadTab === tab && (
                            <motion.div layoutId="download-tab-indicator" className="absolute bottom-0 left-0 right-0 h-0.5 bg-zinc-800 rounded-full" />
                        )}
                    </button>
                ))}
            </div>

            {/* Empty State */}
            <div className="min-h-[200px] flex flex-col items-start pt-8">
                <div className="flex items-center gap-3 mb-2 text-zinc-800">
                    <ServerCrash size={18} className="text-zinc-400" />
                    <h3 className="text-[11px] font-bold text-zinc-700">No download requests found</h3>
                </div>
                <p className="text-[10px] text-muted-foreground font-medium pl-8 opacity-80">You don't have any download requests yet.</p>
            </div>
        </motion.div>
    );
};

export default EventSettings;
