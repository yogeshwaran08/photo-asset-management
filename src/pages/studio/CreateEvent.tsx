import { useState } from 'react';
import {
    Calendar,
    MapPin,
    ChevronDown,
    ArrowRight,
    ArrowLeft,
    Check,
    CheckCircle2,
    Loader2
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
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
            className="w-full max-w-5xl mx-auto pb-20 space-y-8"
        >
            {/* Header Section */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-foreground">Create New Event</h1>
                    <p className="text-muted-foreground mt-1">Set up your event details and choose a gallery style.</p>
                </div>
                <div className="flex items-center gap-2 bg-muted/50 p-1.5 rounded-lg border border-border/50">
                    <button
                        onClick={() => currentStep > 1 && setCurrentStep(1)}
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium",
                            currentStep === 1 ? "bg-white shadow-sm text-foreground" : "text-muted-foreground hover:text-foreground"
                        )}
                    >
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-primary-100/50 text-xs font-bold ring-1 ring-inset ring-primary-500/20">1</span>
                        Details
                    </button>
                    <button
                        className={cn(
                            "flex items-center gap-2 px-4 py-2 rounded-md transition-all text-sm font-medium cursor-default",
                            currentStep === 2 ? "bg-white shadow-sm text-foreground" : "text-muted-foreground"
                        )}
                    >
                        <span className="flex items-center justify-center w-5 h-5 rounded-full bg-muted text-xs font-bold">2</span>
                        Theme
                    </button>
                </div>
            </div>

            <Card className="border-border/40 shadow-xl shadow-black/5 bg-card/50 backdrop-blur-sm">
                <CardContent className="p-8">
                    <AnimatePresence mode="wait">
                        {currentStep === 1 ? (
                            <motion.form
                                key="step1"
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 20 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="space-y-8"
                                onSubmit={(e) => { e.preventDefault(); setCurrentStep(2); }}
                            >
                                <div className="space-y-6">
                                    <div className="space-y-2">
                                        <Label className="text-sm font-semibold text-foreground/80 ml-1">Event Name</Label>
                                        <Input
                                            name="name"
                                            value={formData.name}
                                            onChange={handleInputChange}
                                            placeholder="e.g. Summer Music Festival 2024"
                                            required
                                            className="h-12 text-lg bg-background/50 border-border/50 focus-visible:ring-primary-500/30"
                                        />
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-muted-foreground ml-1">Event Type</Label>
                                            <div className="relative">
                                                <select
                                                    name="event_type"
                                                    value={formData.event_type}
                                                    onChange={handleInputChange}
                                                    className="w-full h-11 bg-background/50 border border-border/50 rounded-md px-4 text-sm appearance-none focus:ring-2 focus:ring-primary-500/20 outline-none transition-all"
                                                >
                                                    <option value="">Select a category...</option>
                                                    <option value="Wedding">Wedding</option>
                                                    <option value="Corporate">Corporate Event</option>
                                                    <option value="Birthday">Birthday Party</option>
                                                    <option value="Portrait">Portrait Session</option>
                                                    <option value="Sports">Sports Event</option>
                                                </select>
                                                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-muted-foreground ml-1">Location</Label>
                                            <div className="relative">
                                                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={18} />
                                                <Input
                                                    name="location"
                                                    value={formData.location}
                                                    onChange={handleInputChange}
                                                    placeholder="City or Venue"
                                                    className="pl-10 h-11 bg-background/50 border-border/50"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-muted-foreground ml-1">Start Date</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={18} />
                                                <Input
                                                    type="date"
                                                    name="start_date"
                                                    value={formData.start_date}
                                                    onChange={handleInputChange}
                                                    className="pl-10 h-11 bg-background/50 border-border/50"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <Label className="text-sm font-medium text-muted-foreground ml-1">End Date</Label>
                                            <div className="relative">
                                                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50" size={18} />
                                                <Input
                                                    type="date"
                                                    name="end_date"
                                                    value={formData.end_date}
                                                    onChange={handleInputChange}
                                                    className="pl-10 h-11 bg-background/50 border-border/50"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <Label className="text-sm font-medium text-muted-foreground ml-1">Description (Optional)</Label>
                                        <textarea
                                            rows={4}
                                            name="description"
                                            value={formData.description}
                                            onChange={handleInputChange}
                                            placeholder="Add any internal notes about this event..."
                                            className="w-full bg-background/50 border border-border/50 rounded-md p-3 text-sm resize-y focus:ring-2 focus:ring-primary-500/20 outline-none transition-all min-h-[100px]"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end pt-4 border-t border-border/40">
                                    <Button
                                        type="button"
                                        variant="ghost"
                                        onClick={() => navigate('/studio/events')}
                                        className="mr-auto text-muted-foreground hover:text-foreground"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        disabled={!formData.name}
                                        className="px-8 h-11 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.02]"
                                    >
                                        Next Step
                                        <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                </div>
                            </motion.form>
                        ) : (
                            <motion.div
                                key="step2"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                                className="space-y-8"
                            >
                                <div className="space-y-1">
                                    <h3 className="text-lg font-semibold">Choose Gallery Theme</h3>
                                    <p className="text-sm text-muted-foreground">Select how your event photos will be presented to guests.</p>
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                    {TEMPLATES.map((tpl) => (
                                        <div
                                            key={tpl.id}
                                            onClick={() => setFormData(prev => ({ ...prev, template_id: tpl.id }))}
                                            className={cn(
                                                "group relative cursor-pointer rounded-xl overflow-hidden border-2 transition-all duration-300 hover:shadow-xl",
                                                formData.template_id === tpl.id
                                                    ? "border-primary-500 ring-4 ring-primary-500/10 scale-[1.02]"
                                                    : "border-border/50 hover:border-primary-500/30 hover:scale-[1.01]"
                                            )}
                                        >
                                            <div className="aspect-[4/3] relative overflow-hidden bg-muted">
                                                <img
                                                    src={tpl.image}
                                                    alt={tpl.name}
                                                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                                                />
                                                <div className={cn(
                                                    "absolute inset-0 bg-black/60 flex items-center justify-center transition-opacity duration-200",
                                                    formData.template_id === tpl.id ? "opacity-100" : "opacity-0"
                                                )}>
                                                    <div className="bg-white text-primary-600 rounded-full p-2.5 shadow-lg transform scale-100 transition-transform">
                                                        <Check className="w-6 h-6 stroke-[3px]" />
                                                    </div>
                                                </div>
                                                <Badge className="absolute top-3 left-3 bg-black/50 backdrop-blur-md text-white border-0 font-medium text-[10px] tracking-wider uppercase px-2 py-0.5">
                                                    {tpl.category}
                                                </Badge>
                                            </div>
                                            <div className="p-4 bg-card">
                                                <h4 className="font-bold text-foreground mb-1">{tpl.name}</h4>
                                                <p className="text-xs text-muted-foreground leading-relaxed">{tpl.description}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                <div className="flex items-center justify-between pt-6 border-t border-border/40">
                                    <Button
                                        variant="outline"
                                        onClick={() => setCurrentStep(1)}
                                        className="h-11 px-6 border-border/50 text-muted-foreground hover:text-foreground"
                                    >
                                        <ArrowLeft className="mr-2 h-4 w-4" />
                                        Back to Details
                                    </Button>

                                    <Button
                                        onClick={handleFinalize}
                                        disabled={!formData.template_id || loading}
                                        className={cn(
                                            "h-11 px-8 font-medium rounded-lg shadow-lg transition-all",
                                            formData.template_id
                                                ? "bg-primary-600 hover:bg-primary-700 text-white hover:scale-[1.02] shadow-primary-500/25"
                                                : "bg-muted text-muted-foreground cursor-not-allowed"
                                        )}
                                    >
                                        {loading ? (
                                            <>
                                                Creating Event...
                                                <Loader2 className="ml-2 h-4 w-4 animate-spin" />
                                            </>
                                        ) : (
                                            <>
                                                Create Event
                                                <CheckCircle2 className="ml-2 h-4 w-4" />
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default CreateEvent;

