import { useState } from 'react';
import {
    Calendar,
    MapPin,
    ChevronDown,
    ArrowRight,
    ArrowLeft,
    Check,
    LayoutTemplate,
    Info,
    CheckCircle2,
    Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
    pageVariants
} from '@/lib/motion-config';
import { eventService } from '@/services/eventService';

interface Template {
    id: string;
    name: string;
    description: string;
    image: string;
    category: 'Wedding' | 'Events' | 'Sports' | 'Custom';
}

const TEMPLATES: Template[] = [
    {
        id: 'tpl_1',
        name: 'Classic Elegance',
        description: 'Perfect for weddings and formal celebrations.',
        category: 'Wedding',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'tpl_2',
        name: 'Nexus Corporate',
        description: 'Modern, clean grid for professional events.',
        category: 'Events',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'tpl_3',
        name: 'Adrenaline Grid',
        description: 'High-energy layout for sports and action.',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'tpl_4',
        name: 'Blank Canvas',
        description: 'Build your own unique design from scratch.',
        category: 'Custom',
        image: 'https://images.unsplash.com/photo-1497005367839-6e846ea3c7b'
    }
];

const CreateEvent = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [loading, setLoading] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        start_date: '',
        end_date: '',
        event_type: '',
        location: '',
        description: '',
        template_id: ''
    });

    const handleBack = () => {
        if (currentStep === 1) {
            navigate('/studio/events');
        } else {
            setCurrentStep(1);
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleFinalize = async () => {
        if (!formData.name) {
            toast.error("Event name is required");
            setCurrentStep(1);
            return;
        }

        setLoading(true);
        try {
            await eventService.create(formData);
            toast.success("Event created successfully!");
            navigate('/studio/events');
        } catch (error) {
            console.error("Failed to create event:", error);
            toast.error("Failed to create event. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="w-full space-y-6 pb-20"
        >
            {/* Header / Breadcrumb Style */}
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
                <Button
                    variant="ghost"
                    onClick={handleBack}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground font-black uppercase text-[10px] tracking-widest group px-0"
                >
                    <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                    {currentStep === 1 ? "Back to Events" : "Back to Information"}
                </Button>

                <div className="flex items-center gap-4 bg-muted/30 p-2 rounded-2xl glass border border-border/50">
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-500",
                        currentStep === 1 ? "bg-white text-foreground shadow-sm ring-1 ring-border/50 scale-105" : "text-muted-foreground opacity-50"
                    )}>
                        <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs", currentStep === 1 ? "bg-primary-500 text-foreground" : "bg-muted")}>
                            {currentStep > 1 ? <CheckCircle2 size={16} /> : "1"}
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">General</span>
                    </div>
                    <div className="w-6 h-px bg-border/50" />
                    <div className={cn(
                        "flex items-center gap-2 px-4 py-2 rounded-xl transition-all duration-500",
                        currentStep === 2 ? "bg-white text-foreground shadow-sm ring-1 ring-border/50 scale-105" : "text-muted-foreground opacity-50"
                    )}>
                        <div className={cn("w-6 h-6 rounded-lg flex items-center justify-center font-black text-xs", currentStep === 2 ? "bg-primary-500 text-foreground" : "bg-muted")}>
                            2
                        </div>
                        <span className="text-[10px] font-black uppercase tracking-widest">Interface</span>
                    </div>
                </div>
            </div>

            <Card className="rounded-[2.5rem] border-border/50 shadow-2xl glass overflow-hidden flex flex-col">
                <CardHeader className="p-8 border-b border-border/50 bg-primary-500/5 items-start">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                            {currentStep === 1 ? <Info size={20} /> : <LayoutTemplate size={20} />}
                        </div>
                        <CardTitle className="text-2xl font-black uppercase tracking-tight">
                            {currentStep === 1 ? "Event DNA" : "Interface Select"}
                        </CardTitle>
                    </div>
                    <CardDescription className="font-bold text-xs uppercase opacity-70 ml-1">
                        {currentStep === 1
                            ? "Configure the core parameters and identity of your new event."
                            : "Choose a visual environment for your guests and participants."}
                    </CardDescription>
                </CardHeader>

                <CardContent className="p-10">
                    <AnimatePresence mode="wait">
                        {currentStep === 1 ? (
                            <motion.form
                                key="step1"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                                onSubmit={(e) => { e.preventDefault(); setCurrentStep(2); }}
                            >
                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Event Name  (Required)</Label>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="E.G. WEDDING OF SARAH & JAMES"
                                        required
                                        className="bg-muted/30 border-border/50 rounded-2xl h-14 font-black uppercase text-xs tracking-widest px-6 focus-visible:ring-primary-500/20 focus-visible:border-primary-500"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3 relative">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Start Date</Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" size={18} />
                                            <Input
                                                type="date"
                                                name="start_date"
                                                value={formData.start_date}
                                                onChange={handleInputChange}
                                                className="bg-muted/30 border-border/50 rounded-2xl h-14 font-bold pl-14 pr-6"
                                            />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">End Date</Label>
                                        <div className="relative">
                                            <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" size={18} />
                                            <Input
                                                type="date"
                                                name="end_date"
                                                value={formData.end_date}
                                                onChange={handleInputChange}
                                                className="bg-muted/30 border-border/50 rounded-2xl h-14 font-bold pl-14 pr-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Event Type</Label>
                                        <div className="relative">
                                            <select
                                                name="event_type"
                                                value={formData.event_type}
                                                onChange={handleInputChange}
                                                className="w-full bg-muted/30 border border-border/50 rounded-2xl h-14 font-black uppercase text-[10px] tracking-widest px-6 appearance-none focus:border-primary-500 focus:bg-white/40 transition-all outline-none"
                                            >
                                                <option value="">SELECT TYPE...</option>
                                                <option value="Wedding">WEDDING</option>
                                                <option value="Corporate">CORPORATE</option>
                                                <option value="Birthday">BIRTHDAY</option>
                                                <option value="Portrait">PORTRAIT</option>
                                            </select>
                                            <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
                                        </div>
                                    </div>
                                    <div className="space-y-3">
                                        <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Location</Label>
                                        <div className="relative">
                                            <MapPin className="absolute left-5 top-1/2 -translate-y-1/2 text-muted-foreground opacity-50" size={18} />
                                            <Input
                                                name="location"
                                                value={formData.location}
                                                onChange={handleInputChange}
                                                placeholder="VENUE OR CITY"
                                                className="bg-muted/30 border-border/50 rounded-2xl h-14 font-black uppercase text-[10px] tracking-widest pl-14 pr-6"
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Description</Label>
                                    <textarea
                                        rows={4}
                                        name="description"
                                        value={formData.description}
                                        onChange={handleInputChange}
                                        placeholder="ADDITIONAL DETAILS FOR THE PRIVATE LOG..."
                                        className="w-full bg-muted/30 border border-border/50 rounded-2xl p-6 font-bold text-sm resize-none focus:border-primary-500 focus:bg-white/40 transition-all outline-none"
                                    />
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="space-y-8"
                            >
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                                    {TEMPLATES.map((tpl) => (
                                        <motion.div
                                            key={tpl.id}
                                            whileHover={{ y: -4 }}
                                            onClick={() => setFormData(prev => ({ ...prev, template_id: tpl.id }))}
                                            className={cn(
                                                "group relative cursor-pointer rounded-[2rem] border-4 overflow-hidden transition-all duration-300",
                                                formData.template_id === tpl.id
                                                    ? "border-primary-500 shadow-2xl shadow-primary-500/10"
                                                    : "border-transparent hover:border-primary-500/20"
                                            )}
                                        >
                                            <div className="aspect-16/10 relative overflow-hidden bg-muted">
                                                <img
                                                    src={tpl.image}
                                                    alt={tpl.name}
                                                    className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                                />
                                                <div className={cn(
                                                    "absolute inset-0 bg-primary-500/80 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300",
                                                    formData.template_id === tpl.id ? "opacity-100" : "opacity-0"
                                                )}>
                                                    <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-primary-500 shadow-2xl scale-110">
                                                        <Check size={28} strokeWidth={4} />
                                                    </div>
                                                </div>
                                                <div className="absolute top-5 left-5">
                                                    <Badge className="bg-black/40 backdrop-blur-xl text-white text-[9px] font-black uppercase tracking-[0.1em] px-4 py-1.5 rounded-full border border-white/10 border-none">
                                                        {tpl.category}
                                                    </Badge>
                                                </div>
                                            </div>
                                            <div className="p-6 bg-white border-t border-border/50">
                                                <h4 className="text-sm font-black uppercase tracking-tight mb-1">{tpl.name}</h4>
                                                <p className="text-[10px] font-bold text-muted-foreground uppercase opacity-70 tracking-tight">{tpl.description}</p>
                                            </div>
                                        </motion.div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>

                <div className="p-8 border-t border-border/50 bg-muted/5 flex gap-6">
                    {currentStep === 1 ? (
                        <>
                            <Button
                                variant="ghost"
                                onClick={() => navigate('/studio/events')}
                                className="flex-1 h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest"
                            >
                                DISCARD
                            </Button>
                            <Button
                                onClick={() => setCurrentStep(2)}
                                disabled={!formData.name}
                                className="flex-[2] h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest bg-primary-500 hover:bg-primary-600 text-foreground shadow-lg shadow-primary-500/20 gap-3"
                            >
                                PROCEED TO INTERFACE
                                <ArrowRight size={16} strokeWidth={3} />
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => setCurrentStep(1)}
                                className="h-14 rounded-2xl px-10 font-black uppercase text-[10px] tracking-widest border-border/50 glass shadow-none"
                            >
                                <ArrowLeft size={16} className="mr-2" strokeWidth={3} />
                                INFO
                            </Button>
                            <Button
                                onClick={handleFinalize}
                                disabled={!formData.template_id || loading}
                                className={cn(
                                    "flex-1 h-14 rounded-2xl font-black uppercase text-[10px] tracking-widest gap-3 shadow-xl transition-all",
                                    formData.template_id
                                        ? "bg-foreground text-background hover:bg-foreground/90"
                                        : "bg-muted text-muted-foreground cursor-not-allowed shadow-none"
                                )}
                            >
                                {loading ? (
                                    <>
                                        CREATING...
                                        <Loader2 size={18} className="animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        FINALIZE COLLECTION
                                        <CheckCircle2 size={18} strokeWidth={3} />
                                    </>
                                )}
                            </Button>
                        </>
                    )}
                </div>
            </Card>
        </motion.div>
    );
};

export default CreateEvent;

