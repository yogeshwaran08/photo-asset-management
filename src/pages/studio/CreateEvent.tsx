import { useState } from 'react';
import {
    ArrowRight,
    ArrowLeft,
    CheckCircle2,
    Loader2,
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import {
    pageVariants
} from '@/lib/motion-config';
import { eventService } from '@/services/eventService';
import { EventDetailsForm } from '@/components/studio/create-event/EventDetailsForm';
import { GalleryThemeSelection } from '@/components/studio/create-event/GalleryThemeSelection';
import { useFormik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
    name: Yup.string().required('Event name is required'),
    event_type: Yup.string().required('Category is required'),
    location: Yup.string().required('Location is required'),
    start_date: Yup.string().required('Start date is required'),
    end_date: Yup.string().required('End date is required'),
    template_id: Yup.string().required('Gallery theme is required'),
    // Advanced settings validations can be added here if needed
    full_access_pin: Yup.string(),
    guest_pin: Yup.string(),
});

const CreateEvent = () => {
    const navigate = useNavigate();
    const [currentStep, setCurrentStep] = useState<number>(1);
    const [loading, setLoading] = useState(false);

    const formik = useFormik({
        initialValues: {
            name: '',
            start_date: '',
            end_date: '',
            event_type: '',
            location: '',
            description: '',
            template_id: '',
            // Advanced Settings
            expiry_date: '',
            full_access_pin: '',
            guest_pin: '',
            allow_single_download: true,
            allow_bulk_download: false,
            one_qr_enabled: true,
            require_pin: false,
            access_level: 'guest',
            enable_gallery_app: true,
            enable_liveliness_detection: false
        },
        validationSchema,
        onSubmit: async (values) => {
            setLoading(true);
            try {
                await eventService.create(values);
                toast.success("Event created successfully!");
                navigate('/studio/events');
            } catch (error) {
                console.error("Failed to create event:", error);
                toast.error("Failed to create event. Please try again.");
            } finally {
                setLoading(false);
            }
        },
    });

    const handleNext = async () => {
        const step1Fields = ['name', 'event_type', 'location', 'start_date', 'end_date'];
        const errors = await formik.validateForm();
        
        const hasStep1Errors = step1Fields.some(field => errors[field as keyof typeof errors]);

        if (hasStep1Errors) {
            const touchedFields = step1Fields.reduce((acc, field) => ({ ...acc, [field]: true }), {});
            formik.setTouched(touchedFields);
            toast.error("Please fill in all required fields.");
            return;
        }
        
        setCurrentStep(2);
    };

    return (
        <>
            <motion.div
                initial="initial"
                animate="animate"
                variants={pageVariants}
                className="w-full mx-auto pb-32 space-y-8"
            >
            <div className="relative flex flex-col md:flex-row items-center justify-between gap-6 mb-8 p-8 rounded-3xl bg-gradient-to-br from-primary-500/10 via-primary-400/10 to-orange-500/10 border border-primary-200/50 shadow-lg shadow-primary-500/5 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary-400 to-orange-400 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
                
                <div className="relative z-10">
                    <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-orange-600 bg-clip-text text-transparent">
                        Create Event
                    </h1>
                    <p className="text-gray-600 mt-2 font-medium">
                        {currentStep === 1 ? "Fill in the basic event details." : "🎨 Choose a gallery theme."}
                    </p>
                </div>

                <div className="relative z-10 flex items-center gap-4 bg-white/90 backdrop-blur-xl p-2 rounded-2xl shadow-xl border border-white/60">
                    <button
                        onClick={() => currentStep > 1 && setCurrentStep(1)}
                        className={cn(
                            "group flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-500 relative overflow-hidden",
                            currentStep === 1 
                                ? "bg-gradient-to-r from-primary-500 via-primary-400 to-orange-500 text-white shadow-2xl shadow-primary-500/40 scale-105" 
                                : "text-gray-600 hover:bg-gradient-to-r hover:from-primary-50 hover:to-orange-50"
                        )}
                    >
                        {currentStep === 1 && (
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}
                        <div className={cn(
                            "relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                            currentStep === 1 
                                ? "bg-white/30 text-white ring-2 ring-white/50 shadow-lg" 
                                : "bg-gradient-to-br from-primary-100 to-orange-100 text-primary-600 group-hover:scale-110"
                        )}>
                            1
                        </div>
                        <span className="relative font-bold text-sm tracking-wide">Details</span>
                    </button>
                    
                    <div className="h-0.5 w-10 bg-gradient-to-r from-primary-300 via-primary-400 to-orange-300 rounded-full" />
                    
                    <button
                        className={cn(
                            "group flex items-center gap-3 px-6 py-3 rounded-xl transition-all duration-500 cursor-default relative overflow-hidden",
                            currentStep === 2
                                ? "bg-gradient-to-r from-primary-500 via-primary-400 to-orange-500 text-white shadow-2xl shadow-primary-500/40 scale-105" 
                                : "text-gray-600"
                        )}
                    >
                        {currentStep === 2 && (
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        )}
                         <div className={cn(
                            "relative w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                            currentStep === 2 
                                ? "bg-white/30 text-white ring-2 ring-white/50 shadow-lg" 
                                : "bg-gradient-to-br from-primary-100 to-orange-100 text-primary-600"
                        )}>
                            2
                        </div>
                        <span className="relative font-bold text-sm tracking-wide">Theme</span>
                    </button>
                </div>
            </div>

            {/* Form Content with Subtle Gradient Background */}
            <div className="relative">
                <AnimatePresence mode="wait">
                    {currentStep === 1 ? (
                        <motion.div
                            key="step1"
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <EventDetailsForm formik={formik} />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="step2"
                            initial={{ opacity: 0, scale: 0.98, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.98, y: -20 }}
                            transition={{ duration: 0.4, ease: "easeInOut" }}
                        >
                            <GalleryThemeSelection formik={formik} />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>

            </motion.div>

            {/* Enhanced Footer with Gradient Buttons */}
            <div className="fixed bottom-0 right-0 left-0 md:left-[220px] bg-white/95 backdrop-blur-xl border-t border-gray-200 p-4 px-8 flex items-center justify-between z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.03)]">
                {currentStep === 1 ? (
                    <>
                        <div />
                        <Button
                            onClick={handleNext}
                            className="group relative px-10 h-14 bg-gradient-to-r from-primary-500 via-primary-400 to-orange-500 hover:from-primary-600 hover:via-primary-500 hover:to-orange-600 text-white font-bold rounded-2xl shadow-2xl shadow-primary-500/30 transition-all duration-300 hover:scale-105 hover:shadow-primary-500/50 active:scale-95 overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-primary-400 via-orange-400 to-red-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative flex items-center gap-2">
                                Next Step
                                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                            </span>
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="ghost"
                            onClick={() => setCurrentStep(1)}
                            className="group text-gray-600 hover:text-primary-600 font-semibold hover:bg-primary-50 rounded-xl px-6 h-12 transition-all duration-300"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4 group-hover:-translate-x-1 transition-transform duration-300" />
                            Back to Details
                        </Button>

                        <Button
                            onClick={() => formik.submitForm()}
                            disabled={!formik.isValid || !formik.values.template_id || loading}
                            className={cn(
                                "group relative h-14 px-10 font-bold rounded-2xl shadow-2xl transition-all duration-300 overflow-hidden",
                                formik.values.template_id
                                    ? "bg-gradient-to-r from-primary-600 via-primary-500 to-orange-600 hover:from-primary-700 hover:via-primary-600 hover:to-orange-700 text-white hover:scale-105 shadow-primary-500/30 hover:shadow-primary-500/50"
                                    : "bg-gray-200 text-gray-400 cursor-not-allowed shadow-none opacity-60"
                            )}
                        >
                            {formik.values.template_id && (
                                <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            )}
                            <span className="relative flex items-center gap-2">
                                {loading ? (
                                    <>
                                        Creating Event...
                                        <Loader2 className="h-5 w-5 animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Create Event
                                        <CheckCircle2 className="h-5 w-5 group-hover:scale-110 transition-transform duration-300" />
                                    </>
                                )}
                            </span>
                        </Button>
                    </>
                )}
            </div>
        </>
    );
};

export default CreateEvent;
