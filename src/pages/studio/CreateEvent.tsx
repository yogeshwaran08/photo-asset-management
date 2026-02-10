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
        // Validate Step 1 fields
        const step1Fields = ['name', 'event_type', 'location', 'start_date', 'end_date'];
        const errors = await formik.validateForm();
        
        // Check if any error exists for Step 1 fields
        const hasStep1Errors = step1Fields.some(field => errors[field as keyof typeof errors]);

        if (hasStep1Errors) {
            // Mark fields as touched to show errors
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
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-8">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight text-gray-900">Create Event</h1>
                    <p className="text-muted-foreground mt-1">
                        {currentStep === 1 ? "Fill in the basic event details." : "Choose a gallery theme."}
                    </p>
                </div>

                <div className="flex items-center gap-4 bg-white/80 backdrop-blur-md p-1.5 rounded-2xl shadow-sm border border-border/40">
                    <button
                        onClick={() => currentStep > 1 && setCurrentStep(1)}
                        className={cn(
                            "group flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all duration-300",
                            currentStep === 1 
                                ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20" 
                                : "text-muted-foreground hover:bg-muted/50"
                        )}
                    >
                        <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                            currentStep === 1 ? "bg-white/20 text-white" : "bg-muted text-muted-foreground group-hover:bg-muted-foreground/20"
                        )}>
                            1
                        </div>
                        <span className="font-semibold text-sm tracking-wide">Details</span>
                    </button>
                    
                    <div className="w-px h-6 bg-border/40" />
                    
                    <button
                        className={cn(
                            "group flex items-center gap-3 px-5 py-2.5 rounded-xl transition-all duration-300 cursor-default",
                            currentStep === 2
                                ? "bg-primary-600 text-white shadow-lg shadow-primary-500/20" 
                                : "text-muted-foreground"
                        )}
                    >
                         <div className={cn(
                            "w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-colors",
                            currentStep === 2 ? "bg-white/20 text-white" : "bg-muted text-muted-foreground"
                        )}>
                            2
                        </div>
                        <span className="font-semibold text-sm tracking-wide">Theme</span>
                    </button>
                </div>
            </div>

            {/* We render both steps but hide one with AnimatePresence logic or simpler conditional rendering 
                While reusing formik instance passed as prop
            */}
            <AnimatePresence mode="wait">
                {currentStep === 1 ? (
                    <motion.div
                        key="step1"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                    >
                        <EventDetailsForm formik={formik} />
                    </motion.div>
                ) : (
                    <motion.div
                        key="step2"
                        initial={{ opacity: 0, scale: 0.98 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.98 }}
                        transition={{ duration: 0.3 }}
                    >
                        <GalleryThemeSelection formik={formik} />
                    </motion.div>
                )}
            </AnimatePresence>

            </motion.div>

            <div className="fixed bottom-0 right-0 left-0 md:left-[220px] bg-white border-t border-gray-200 p-4 px-8 flex items-center justify-between z-50 shadow-[0_-5px_20px_rgba(0,0,0,0.02)]">
                {currentStep === 1 ? (
                    <>
                        <div />
                        <Button
                            onClick={handleNext}
                            className="px-8 h-12 bg-primary-600 hover:bg-primary-700 text-white font-semibold rounded-xl shadow-lg shadow-primary-500/20 transition-all hover:scale-[1.02] active:scale-[0.98]"
                        >
                            Next
                            <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                    </>
                ) : (
                    <>
                        <Button
                            variant="ghost"
                            onClick={() => setCurrentStep(1)}
                            className="text-muted-foreground hover:text-foreground font-medium"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Back to Details
                        </Button>

                        <Button
                            onClick={() => formik.submitForm()}
                            disabled={!formik.isValid || !formik.values.template_id || loading}
                            className={cn(
                                "h-12 px-8 font-semibold rounded-xl shadow-lg transition-all",
                                formik.values.template_id
                                    ? "bg-primary-600 hover:bg-primary-700 text-white hover:scale-[1.02] shadow-primary-500/20 shadow-xl"
                                    : "bg-muted text-muted-foreground cursor-not-allowed shadow-none opacity-50"
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
                    </>
                )}
            </div>
        </>
    );
};

export default CreateEvent;
