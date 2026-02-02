import { useState } from 'react';
import {
    Calendar,
    MapPin,
    ChevronDown,
    AlertCircle,
    ArrowRight,
    ArrowLeft,
    Check
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../utils/cn';

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
        image: 'https://images.unsplash.com/photo-1497005367839-6e846ea3c7 entry?auto=format&fit=crop&q=80&w=400'
    }
];

const CreateEvent = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const handleBack = () => {
        if (currentStep === 1) {
            navigate('/studio/events');
        } else {
            setCurrentStep(1);
        }
    };

    const handleFinalize = () => {
        // Here you would normally save the event
        navigate('/studio/events');
    };

    return (
        <div className="max-w-5xl mx-auto space-y-6 animate-in slide-in-from-bottom-4 duration-500 pb-20">
            {/* Header / Breadcrumb Style */}
            <div className="flex items-center justify-between mb-8">
                <button
                    onClick={handleBack}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors font-bold group"
                >
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
                    {currentStep === 1 ? "Back to Events" : "Back to Information"}
                </button>
                <div className="flex items-center gap-3">
                    <div className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all shadow-lg",
                        currentStep === 1 ? "bg-primary-600 text-white scale-110" : "bg-emerald-500 text-white"
                    )}>
                        {currentStep === 2 ? <Check size={20} strokeWidth={4} /> : "1"}
                    </div>
                    <div className="w-8 h-1 bg-muted rounded-full" />
                    <div className={cn(
                        "w-10 h-10 rounded-2xl flex items-center justify-center font-black transition-all shadow-lg",
                        currentStep === 2 ? "bg-primary-600 text-white scale-110" : "bg-muted text-muted-foreground"
                    )}>
                        2
                    </div>
                </div>
            </div>

            <div className="bg-card rounded-[3rem] border border-border shadow-2xl overflow-hidden flex flex-col">
                {/* Workflow Header */}
                <div className="p-8 border-b border-border bg-muted/10 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-primary-500/5 blur-[80px] rounded-full -mr-32 -mt-32" />
                    <div className="relative">
                        <h2 className="text-2xl font-bold tracking-tight mb-1">
                            {currentStep === 1 ? "Event Information" : "Select Event Design"}
                        </h2>
                        <p className="text-muted-foreground text-sm font-medium">
                            {currentStep === 1
                                ? "Start by providing the essential details of your event."
                                : "Choose a design template that matches your event's vibe."}
                        </p>
                    </div>
                </div>

                {/* Workflow Body */}
                <div className="p-10 min-h-[400px]">
                    {currentStep === 1 ? (
                        <form className="space-y-6 animate-in fade-in duration-500">
                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Event Name</label>
                                <input
                                    type="text"
                                    placeholder="Enter event name"
                                    required
                                    className="w-full bg-muted/30 border border-border/50 rounded-xl py-3 px-5 focus:border-primary-500 focus:bg-card transition-all outline-none font-medium text-base shadow-sm"
                                />
                                <p className="text-xs text-red-500 font-bold ml-1 flex items-center gap-1.5">
                                    <AlertCircle size={12} />
                                    Event name is required
                                </p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Start Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input
                                            type="date"
                                            className="w-full bg-muted/30 border border-border/50 rounded-xl py-3 pl-12 pr-4 focus:border-primary-500 focus:bg-card transition-all outline-none font-medium text-base shadow-sm"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">End Date</label>
                                    <div className="relative group">
                                        <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input
                                            type="date"
                                            className="w-full bg-muted/30 border border-border/50 rounded-xl py-3 pl-12 pr-4 focus:border-primary-500 focus:bg-card transition-all outline-none font-medium text-base shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Event Type</label>
                                    <div className="relative group">
                                        <select className="w-full bg-muted/30 border border-border/50 rounded-xl py-3 px-5 focus:border-primary-500 focus:bg-card transition-all outline-none font-medium text-base appearance-none shadow-sm">
                                            <option value="">Select Event Type</option>
                                            <option value="wedding">Wedding</option>
                                            <option value="corporate">Corporate</option>
                                            <option value="birthday">Birthday</option>
                                            <option value="portrait">Portrait</option>
                                            <option value="other">Other</option>
                                        </select>
                                        <ChevronDown className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={18} />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Event Location</label>
                                    <div className="relative group">
                                        <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary-500 transition-colors" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Enter event location"
                                            className="w-full bg-muted/30 border border-border/50 rounded-xl py-3 pl-12 pr-4 focus:border-primary-500 focus:bg-card transition-all outline-none font-medium text-base shadow-sm"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-bold uppercase tracking-wider text-muted-foreground ml-1">Description</label>
                                <textarea
                                    rows={4}
                                    placeholder="Tell us more about the event..."
                                    className="w-full bg-muted/30 border border-border/50 rounded-xl py-4 px-5 focus:border-primary-500 focus:bg-card transition-all outline-none font-medium text-base resize-none shadow-sm"
                                />
                            </div>
                        </form>
                    ) : (
                        <div className="space-y-8 animate-in fade-in duration-500">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                                {TEMPLATES.map((tpl) => (
                                    <div
                                        key={tpl.id}
                                        onClick={() => setSelectedTemplate(tpl.id)}
                                        className={cn(
                                            "group relative cursor-pointer rounded-[2.5rem] border-4 overflow-hidden transition-all duration-300 hover:shadow-2xl",
                                            selectedTemplate === tpl.id
                                                ? "border-primary-500 scale-[1.02] shadow-2xl shadow-primary-500/20"
                                                : "border-transparent hover:border-primary-500/30"
                                        )}
                                    >
                                        <div className="aspect-16/10 relative overflow-hidden">
                                            <img
                                                src={tpl.image}
                                                alt={tpl.name}
                                                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                                            />
                                            <div className={cn(
                                                "absolute inset-0 bg-primary-600/60 backdrop-blur-[2px] flex items-center justify-center transition-opacity duration-300",
                                                selectedTemplate === tpl.id ? "opacity-100" : "opacity-0 group-hover:opacity-40"
                                            )}>
                                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-primary-600 shadow-2xl scale-110">
                                                    <Check size={32} strokeWidth={5} />
                                                </div>
                                            </div>
                                            <div className="absolute top-6 left-6">
                                                <span className="bg-black/80 backdrop-blur-xl text-white text-[11px] font-black uppercase tracking-[0.2em] px-4 py-2 rounded-full border border-white/20 shadow-lg">
                                                    {tpl.category}
                                                </span>
                                            </div>
                                        </div>
                                        <div className="p-6 bg-muted/10 backdrop-blur-xl border-t border-border/50">
                                            <h4 className="text-lg font-bold mb-1">{tpl.name}</h4>
                                            <p className="text-xs text-muted-foreground font-medium">{tpl.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Workflow Footer */}
                <div className="p-8 border-t border-border bg-muted/5 flex gap-6">
                    {currentStep === 1 ? (
                        <>
                            <button
                                onClick={() => navigate('/studio/events')}
                                className="flex-1 px-8 py-3 rounded-xl font-bold bg-muted hover:bg-muted/80 transition-all active:scale-95 text-base"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => setCurrentStep(2)}
                                className="flex-2 x-12 py-3 px-12 rounded-xl font-bold bg-linear-to-r from-primary-600 to-accent-600 text-white shadow-xl shadow-primary-600/30 hover:opacity-90 transition-all active:scale-95 text-base flex items-center justify-center gap-3"
                            >
                                <span>Next: Select Design</span>
                                <ArrowRight size={18} strokeWidth={3} />
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => setCurrentStep(1)}
                                className="px-8 py-3 rounded-xl font-bold bg-muted/50 hover:bg-muted transition-all active:scale-95 text-base flex items-center gap-2"
                            >
                                <ArrowLeft size={18} strokeWidth={3} />
                                <span>Back</span>
                            </button>
                            <button
                                onClick={handleFinalize}
                                disabled={!selectedTemplate}
                                className={cn(
                                    "flex-1 py-3 px-12 rounded-xl font-bold transition-all active:scale-95 text-lg flex items-center justify-center gap-3 shadow-xl",
                                    selectedTemplate
                                        ? "bg-linear-to-r from-emerald-600 to-primary-600 text-white shadow-emerald-600/30 hover:opacity-90"
                                        : "bg-muted text-muted-foreground cursor-not-allowed"
                                )}
                            >
                                <span>Create Event</span>
                                <Check size={20} strokeWidth={4} />
                            </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
