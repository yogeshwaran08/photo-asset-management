import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, ArrowRight, User, Briefcase, Calendar, Phone, Check, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

// Step 1: Name
const NameStep = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
    <div className="flex flex-col items-center w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
            <User className="w-10 h-10 text-amber-500" />
        </div>
        <h2 className="text-3xl font-black text-center mb-2">What's your name?</h2>
        <p className="text-muted-foreground text-center mb-8">Let us know how we should address you</p>

        <div className="w-full space-y-2">
            <label className="text-sm font-bold ml-1">Full Name <span className="text-red-500">*</span></label>
            <div className="relative">
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="h-12 rounded-xl border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 text-lg px-4"
                    placeholder="e.g. John Doe"
                    autoFocus
                />
                {value.length > 2 && (
                    <div className="absolute right-3 top-3 bg-emerald-500 rounded-full p-1">
                        <Check size={12} className="text-white" />
                    </div>
                )}
            </div>
            <p className="text-xs text-muted-foreground ml-1">This is how we'll address you</p>
        </div>
    </div>
);

// Step 2: Niche
const NicheStep = ({ value, onChange }: { value: string[], onChange: (val: string[]) => void }) => {
    const niches = [
        "Wedding", "Corporate", "Baby Shoot", "Maternity",
        "Fashion", "Freelancer", "Others"
    ];

    const toggleNiche = (niche: string) => {
        if (value.includes(niche)) {
            onChange(value.filter(n => n !== niche));
        } else {
            onChange([...value, niche]);
        }
    };

    return (
        <div className="flex flex-col items-center w-full max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                <Briefcase className="w-10 h-10 text-amber-500" />
            </div>
            <h2 className="text-3xl font-black text-center mb-2">What's your niche?</h2>
            <p className="text-muted-foreground text-center mb-8">Select all that apply to help us understand your areas of expertise</p>

            <div className="flex flex-wrapjustify-center gap-4 w-full">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 w-full">
                    {niches.map((niche) => (
                        <button
                            key={niche}
                            onClick={() => toggleNiche(niche)}
                            className={cn(
                                "h-16 rounded-2xl border-2 font-bold transition-all duration-200 flex items-center justify-center",
                                value.includes(niche)
                                    ? "border-amber-500 bg-amber-50 text-amber-900 shadow-lg shadow-amber-500/10 scale-105"
                                    : "border-border hover:border-amber-200 hover:bg-slate-50 text-muted-foreground"
                            )}
                        >
                            {niche}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Step 3: Event Volume
const VolumeStep = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
    const options = [
        { label: "Less than 10", icon: Calendar },
        { label: "10-25", icon: Calendar },
        { label: "25-50", icon: Calendar },
        { label: "50-100", icon: Calendar },
        { label: "More than 100", icon: Calendar }
    ];

    return (
        <div className="flex flex-col items-center w-full max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
                <Calendar className="w-10 h-10 text-amber-500" />
            </div>
            <h2 className="text-3xl font-black text-center mb-2">Average number of events per year?</h2>
            <p className="text-muted-foreground text-center mb-8">Help us understand your event volume</p>

            <div className="flex flex-wrap justify-center gap-6 w-full">
                {options.map((option) => (
                    <button
                        key={option.label}
                        onClick={() => onChange(option.label)}
                        className={cn(
                            "w-40 h-40 rounded-3xl border-2 flex flex-col items-center justify-center gap-4 transition-all duration-200",
                            value === option.label
                                ? "border-amber-500 bg-amber-50 text-amber-900 shadow-xl shadow-amber-500/20 scale-105 ring-2 ring-amber-500 ring-offset-2"
                                : "border-border hover:border-amber-200 hover:bg-slate-50 text-muted-foreground"
                        )}
                    >
                        <option.icon size={32} className={cn(
                            value === option.label ? "text-amber-500" : "text-muted-foreground/50"
                        )} />
                        <span className="font-bold text-sm">{option.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// Step 4: Contact
const ContactStep = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => (
    <div className="flex flex-col items-center w-full max-w-md mx-auto animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="w-20 h-20 bg-amber-50 rounded-full flex items-center justify-center mb-6">
            <Phone className="w-10 h-10 text-amber-500" />
        </div>
        <h2 className="text-3xl font-black text-center mb-2">Enter your mobile number</h2>

        <div className="w-full space-y-2 mt-6">
            <label className="text-sm font-bold ml-1">Mobile Number</label>
            <div className="flex gap-2">
                <div className="h-12 w-24 rounded-xl border border-border flex items-center justify-center bg-white gap-2">
                    <img src="https://flagcdn.com/w40/in.png" alt="India" className="w-6 h-4 object-cover rounded-sm" />
                    <ChevronDown size={14} className="opacity-50" />
                </div>
                <Input
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className="flex-1 h-12 rounded-xl border-amber-200 focus:border-amber-500 focus:ring-amber-500/20 text-lg px-4"
                    placeholder="+91 89219 70311"
                    autoFocus
                />
            </div>
            <div className="flex items-center gap-2 mt-2 ml-1 text-muted-foreground">
                <span className="text-xs">Your number will be kept private and secure</span>
            </div>
        </div>
    </div>
);

const ProfileSetup = () => {
    const navigate = useNavigate();
    const [step, setStep] = useState(1);
    const totalSteps = 4;

    // Form State
    const [formData, setFormData] = useState({
        name: '',
        niches: [] as string[],
        volume: '',
        phone: ''
    });

    const updateData = (key: string, value: any) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        if (step < totalSteps) setStep(step + 1);
        else handleSubmit();
    };

    const prevStep = () => {
        if (step > 1) setStep(step - 1);
        else navigate(-1);
    };

    const handleSubmit = () => {
        console.log("Submitting:", formData);
        navigate('/studio/dashboard'); // Or wherever appropriate
    };

    const getProgress = () => ((step / totalSteps) * 100);

    return (
        <div className="min-h-screen bg-white flex flex-col items-center p-6 md:p-12 font-sans text-slate-900">
            {/* Progress Bar */}
            <div className="w-full max-w-4xl mb-12 flex items-center gap-4">
                <div className="h-2 flex-1 bg-slate-100 rounded-full overflow-hidden">
                    <motion.div
                        className="h-full bg-amber-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${getProgress()}%` }}
                        transition={{ duration: 0.5, ease: "easeInOut" }}
                    />
                </div>
                <span className="text-sm font-bold text-muted-foreground whitespace-nowrap">
                    Step {step} of {totalSteps}
                </span>
            </div>

            <main className="flex-1 w-full max-w-5xl flex items-center justify-center min-h-[400px]">
                <AnimatePresence mode="wait">
                    {step === 1 && (
                        <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                            <NameStep value={formData.name} onChange={(v) => updateData('name', v)} />
                        </motion.div>
                    )}
                    {step === 2 && (
                        <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                            <NicheStep value={formData.niches} onChange={(v) => updateData('niches', v)} />
                        </motion.div>
                    )}
                    {step === 3 && (
                        <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                            <VolumeStep value={formData.volume} onChange={(v) => updateData('volume', v)} />
                        </motion.div>
                    )}
                    {step === 4 && (
                        <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="w-full">
                            <ContactStep value={formData.phone} onChange={(v) => updateData('phone', v)} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Navigation Footer */}
            <div className="w-full max-w-2xl flex items-center justify-between gap-4 mt-12">
                <Button
                    variant="outline"
                    size="lg"
                    onClick={prevStep}
                    className="h-14 rounded-full px-8 text-base border-2 hover:bg-slate-50"
                >
                    <ArrowLeft size={18} className="mr-2" />
                    Back
                </Button>

                <Button
                    size="lg"
                    onClick={nextStep}
                    className="h-14 flex-1 rounded-full text-base bg-amber-400 hover:bg-amber-500 text-amber-950 font-black shadow-lg shadow-amber-500/20"
                >
                    Continue
                    <ArrowRight size={18} className="ml-2" />
                </Button>
            </div>

            <div className="mt-12 flex flex-col items-center gap-2 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full border border-current flex items-center justify-center text-[10px] font-bold">?</span>
                    <span>Need help?</span>
                </div>
                <div className="flex gap-6 mt-1">
                    <a href="mailto:support@fotoowl.ai" className="hover:text-amber-600 transition-colors">support@fotoowl.ai</a>
                    <a href="https://wa.me/918329867577" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
                        +91 832 986 7577
                    </a>
                </div>
            </div>
        </div>
    );
};

export default ProfileSetup;
