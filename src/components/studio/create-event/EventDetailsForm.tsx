import { useState } from 'react';
import {
    Calendar as CalendarIcon,
    MapPin,
    ChevronDown,
    LayoutTemplate,
    Tag,
    Settings,
    Eye,
    Copy,
    Lock,
    Download,
    QrCode,
    Smartphone,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Calendar } from '@/components/ui/calendar';
import { Switch } from '@/components/ui/switch';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { format } from 'date-fns';
import type { FormikProps } from 'formik';

interface EventDetailsFormProps {
    formik: FormikProps<any>;
}

export const EventDetailsForm = ({ formik }: EventDetailsFormProps) => {
    const [isStartDateOpen, setIsStartDateOpen] = useState(false);
    const [isEndDateOpen, setIsEndDateOpen] = useState(false);
    const [isExpiryDateOpen, setIsExpiryDateOpen] = useState(false);
    const [showAdvancedSettings, setShowAdvancedSettings] = useState(false);
    const [showFullAccessPin, setShowFullAccessPin] = useState(false);
    const [showGuestPin, setShowGuestPin] = useState(false);

    const { values, errors, touched, handleChange, handleBlur, setFieldValue } = formik;

    return (
        <Card className="border-0 shadow-2xl shadow-primary-900/5 bg-white/80 backdrop-blur-xl rounded-[2rem] overflow-hidden ring-1 ring-border/50">
            <div className="absolute inset-0 bg-gradient-to-br from-white via-white to-primary-50/30 opacity-50 pointer-events-none" />
            <CardContent className="p-8 md:p-12 relative">
                <form className="space-y-10" onSubmit={formik.handleSubmit}>
                    <div className="space-y-8">
                        <div className="space-y-3">
                            <Label className="text-sm font-bold text-gray-900 uppercase tracking-wider ml-1">Event Name</Label>
                            <div className="relative group">
                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary-500 transition-colors">
                                    <LayoutTemplate size={18} />
                                </div>
                                <Input
                                    name="name"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    placeholder="E.g. Summer Wedding 2024"
                                    className={cn(
                                        "h-14 pl-11 text-lg bg-gray-50/50 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 rounded-xl transition-all font-medium placeholder:text-gray-400",
                                        touched.name && errors.name && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                    )}
                                />
                                {touched.name && errors.name && (
                                    <p className="text-red-500 text-xs mt-1 ml-1">{errors.name as string}</p>
                                )}
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Category</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary-500 transition-colors">
                                        <Tag size={18} />
                                    </div>
                                    <select
                                        name="event_type"
                                        value={values.event_type}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={cn(
                                            "w-full h-12 pl-11 pr-10 bg-gray-50/50 border border-gray-200 rounded-xl text-sm font-medium appearance-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all text-gray-900",
                                            touched.event_type && errors.event_type && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                        )}
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Wedding">Wedding</option>
                                        <option value="Corporate">Corporate</option>
                                        <option value="Birthday">Birthday</option>
                                        <option value="Portrait">Portrait</option>
                                        <option value="Sports">Sports</option>
                                    </select>
                                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" size={16} />
                                    {touched.event_type && errors.event_type && (
                                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.event_type as string}</p>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-3">
                                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Location</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary-500 transition-colors">
                                        <MapPin size={18} />
                                    </div>
                                    <Input
                                        name="location"
                                        value={values.location}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        placeholder="City or Venue"
                                        className={cn(
                                            "h-12 pl-11 bg-gray-50/50 border-gray-200 focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 rounded-xl transition-all font-medium",
                                            touched.location && errors.location && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                        )}
                                    />
                                    {touched.location && errors.location && (
                                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.location as string}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="space-y-3">
                                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Start Date</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary-500 transition-colors z-10">
                                        <CalendarIcon size={18} />
                                    </div>
                                    <Popover open={isStartDateOpen} onOpenChange={setIsStartDateOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full h-12 pl-11 justify-start text-left font-medium bg-gray-50/50 border-gray-200 hover:bg-white hover:text-black focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 rounded-xl transition-all",
                                                    !values.start_date && "text-muted-foreground",
                                                    touched.start_date && errors.start_date && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                                )}
                                            >
                                                {values.start_date ? (
                                                    format(new Date(values.start_date), "PPP")
                                                ) : (
                                                    <span className="text-gray-400">Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={values.start_date ? new Date(values.start_date) : undefined}
                                                onSelect={(date) => {
                                                    setFieldValue("start_date", date ? format(date, "yyyy-MM-dd") : "");
                                                    setIsStartDateOpen(false);
                                                }}
                                                initialFocus
                                            />
                                            <div className="p-3 border-t border-border">
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-center text-sm font-medium h-8"
                                                    onClick={() => {
                                                        setFieldValue("start_date", format(new Date(), "yyyy-MM-dd"));
                                                        setIsStartDateOpen(false);
                                                    }}
                                                >
                                                    Today
                                                </Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    {touched.start_date && errors.start_date && (
                                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.start_date as string}</p>
                                    )}
                                </div>
                            </div>
                            <div className="space-y-3">
                                <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">End Date</Label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary-500 transition-colors z-10">
                                        <CalendarIcon size={18} />
                                    </div>
                                    <Popover open={isEndDateOpen} onOpenChange={setIsEndDateOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                className={cn(
                                                    "w-full h-12 pl-11 justify-start text-left font-medium bg-gray-50/50 border-gray-200 hover:bg-white hover:text-black focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 rounded-xl transition-all",
                                                    !values.end_date && "text-muted-foreground",
                                                    touched.end_date && errors.end_date && "border-red-500 focus:border-red-500 focus:ring-red-500/10"
                                                )}
                                            >
                                                {values.end_date ? (
                                                    format(new Date(values.end_date), "PPP")
                                                ) : (
                                                    <span className="text-gray-400">Pick a date</span>
                                                )}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={values.end_date ? new Date(values.end_date) : undefined}
                                                onSelect={(date) => {
                                                    setFieldValue("end_date", date ? format(date, "yyyy-MM-dd") : "");
                                                    setIsEndDateOpen(false);
                                                }}
                                                initialFocus
                                            />
                                            <div className="p-3 border-t border-border">
                                                <Button
                                                    variant="ghost"
                                                    className="w-full justify-center text-sm font-medium h-8"
                                                    onClick={() => {
                                                        setFieldValue("end_date", format(new Date(), "yyyy-MM-dd"));
                                                        setIsEndDateOpen(false);
                                                    }}
                                                >
                                                    Today
                                                </Button>
                                            </div>
                                        </PopoverContent>
                                    </Popover>
                                    {touched.end_date && errors.end_date && (
                                        <p className="text-red-500 text-xs mt-1 ml-1">{errors.end_date as string}</p>
                                    )}
                                </div>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Description (Optional)</Label>
                            <textarea
                                rows={3}
                                name="description"
                                value={values.description}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                placeholder="Internal notes..."
                                className="w-full bg-gray-50/50 border border-gray-200 rounded-xl p-4 text-sm font-medium resize-none focus:border-primary-500 focus:ring-4 focus:ring-primary-500/10 outline-none transition-all placeholder:text-gray-400"
                            />
                        </div>

                        {/* Advanced Settings Toggle */}
                        <div className="pt-4 border-t border-border/50">
                            <button
                                type="button"
                                onClick={() => setShowAdvancedSettings(!showAdvancedSettings)}
                                className="flex items-center justify-between w-full group py-2"
                            >
                                <div className="flex items-center gap-3">
                                    <div className="p-2 rounded-lg bg-gray-100 text-gray-600 group-hover:bg-primary-50 group-hover:text-primary-600 transition-colors">
                                        <Settings size={20} />
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-semibold text-gray-900 group-hover:text-primary-700 transition-colors">Advanced Settings</h3>
                                        <p className="text-xs text-muted-foreground">Additional configuration options</p>
                                    </div>
                                </div>
                                <div className={cn(
                                    "p-2 rounded-full transition-all duration-300",
                                    showAdvancedSettings ? "bg-primary-50 text-primary-600 rotate-180" : "bg-gray-50 text-gray-400 group-hover:bg-gray-100"
                                )}>
                                    <ChevronDown size={20} />
                                </div>
                            </button>

                            <AnimatePresence>
                                {showAdvancedSettings && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3, ease: "easeInOut" }}
                                        className="overflow-hidden"
                                    >
                                        <div className="pt-6 space-y-6">
                                            {/* Security & Access */}
                                            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 space-y-6">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-gray-200 rounded-full text-gray-600">
                                                        <Lock size={16} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-sm">Security & Access</h4>
                                                        <p className="text-xs text-muted-foreground">Control event access.</p>
                                                    </div>
                                                </div>

                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                                    <div className="space-y-3">
                                                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Expiry Date</Label>
                                                        <Popover open={isExpiryDateOpen} onOpenChange={setIsExpiryDateOpen}>
                                                            <PopoverTrigger asChild>
                                                                <Button variant="outline" className="w-full h-11 justify-start text-left font-medium bg-white border-gray-200">
                                                                    {values.expiry_date ? format(new Date(values.expiry_date), "dd/MM/yyyy") : <span className="text-gray-400">dd/mm/yyyy</span>}
                                                                </Button>
                                                            </PopoverTrigger>
                                                            <PopoverContent className="w-auto p-0" align="start">
                                                                <Calendar
                                                                    mode="single"
                                                                    selected={values.expiry_date ? new Date(values.expiry_date) : undefined}
                                                                    onSelect={(date) => {
                                                                        setFieldValue("expiry_date", date ? format(date, "yyyy-MM-dd") : "");
                                                                        setIsExpiryDateOpen(false);
                                                                    }}
                                                                    initialFocus
                                                                />
                                                            </PopoverContent>
                                                        </Popover>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Full Access PIN</Label>
                                                        <div className="relative flex items-center">
                                                            <Input
                                                                type={showFullAccessPin ? "text" : "password"}
                                                                name="full_access_pin"
                                                                value={values.full_access_pin}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="...."
                                                                className="h-11 bg-white border-gray-200 pr-20"
                                                            />
                                                            <div className="absolute right-1 flex items-center gap-1">
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-gray-400 hover:text-gray-600"
                                                                    onClick={() => setShowFullAccessPin(!showFullAccessPin)}
                                                                >
                                                                    {showFullAccessPin ? <Eye size={14} /> : <Eye size={14} />}
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-gray-400 hover:text-gray-600"
                                                                    onClick={() => navigator.clipboard.writeText(values.full_access_pin)}
                                                                >
                                                                    <Copy size={14} />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className="space-y-3">
                                                        <Label className="text-xs font-bold text-gray-500 uppercase tracking-wider ml-1">Guest PIN</Label>
                                                        <div className="relative flex items-center">
                                                            <Input
                                                                type={showGuestPin ? "text" : "password"}
                                                                name="guest_pin"
                                                                value={values.guest_pin}
                                                                onChange={handleChange}
                                                                onBlur={handleBlur}
                                                                placeholder="...."
                                                                className="h-11 bg-white border-gray-200 pr-20"
                                                            />
                                                            <div className="absolute right-1 flex items-center gap-1">
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-gray-400 hover:text-gray-600"
                                                                    onClick={() => setShowGuestPin(!showGuestPin)}
                                                                >
                                                                    {showGuestPin ? <Eye size={14} /> : <Eye size={14} />}
                                                                </Button>
                                                                <Button
                                                                    type="button"
                                                                    variant="ghost"
                                                                    size="icon"
                                                                    className="h-8 w-8 text-gray-400 hover:text-gray-600"
                                                                    onClick={() => navigator.clipboard.writeText(values.guest_pin)}
                                                                >
                                                                    <Copy size={14} />
                                                                </Button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Download Settings */}
                                            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 space-y-6">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-gray-200 rounded-full text-gray-600">
                                                        <Download size={16} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-sm">Download Settings</h4>
                                                        <p className="text-xs text-muted-foreground">Control how guests download photos.</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <Label className="text-sm font-medium text-gray-900">Allow Single Download</Label>
                                                            <p className="text-xs text-muted-foreground mt-0.5">Guests can download individual photos.</p>
                                                        </div>
                                                        <Switch
                                                            checked={values.allow_single_download}
                                                            onCheckedChange={(checked) => setFieldValue("allow_single_download", checked)}
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <Label className="text-sm font-medium text-gray-900">Allow Bulk Download</Label>
                                                            <p className="text-xs text-muted-foreground mt-0.5">Guests can download all photos at once.</p>
                                                        </div>
                                                        <Switch
                                                            checked={values.allow_bulk_download}
                                                            onCheckedChange={(checked) => setFieldValue("allow_bulk_download", checked)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                            {/* One QR */}
                                            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 space-y-6">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-gray-200 rounded-full text-gray-600">
                                                        <QrCode size={16} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-sm">One QR</h4>
                                                        <p className="text-xs text-muted-foreground">Include in your portfolio page QR code.</p>
                                                    </div>
                                                    <div className="ml-auto">
                                                        <Switch
                                                            checked={values.one_qr_enabled}
                                                            onCheckedChange={(checked) => setFieldValue("one_qr_enabled", checked)}
                                                        />
                                                    </div>
                                                </div>
                                                
                                                {values.one_qr_enabled && (
                                                    <div className="pl-14 space-y-6">
                                                        <div className="flex items-center justify-between">
                                                            <div>
                                                                <Label className="text-sm font-medium text-gray-900">Require PIN</Label>
                                                                <p className="text-xs text-muted-foreground mt-0.5">Visitors need PIN to access.</p>
                                                            </div>
                                                            <Switch
                                                                checked={values.require_pin}
                                                                onCheckedChange={(checked) => setFieldValue("require_pin", checked)}
                                                            />
                                                        </div>

                                                        <div className="space-y-3">
                                                            <Label className="text-sm font-medium text-gray-900">Access Level</Label>
                                                            <RadioGroup
                                                                value={values.access_level}
                                                                onValueChange={(val) => setFieldValue("access_level", val)}
                                                                className="flex items-center gap-6"
                                                            >
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="full" id="r1" />
                                                                    <Label htmlFor="r1" className="font-normal text-muted-foreground">Full Access</Label>
                                                                </div>
                                                                <div className="flex items-center space-x-2">
                                                                    <RadioGroupItem value="guest" id="r2" />
                                                                    <Label htmlFor="r2" className="font-normal text-muted-foreground">Guest Access</Label>
                                                                </div>
                                                            </RadioGroup>
                                                        </div>
                                                    </div>
                                                )}
                                            </div>

                                            {/* App & Experience */}
                                            <div className="bg-gray-50/50 rounded-2xl p-6 border border-gray-100 space-y-6">
                                                <div className="flex items-center gap-3 mb-2">
                                                    <div className="p-2 bg-gray-200 rounded-full text-gray-600">
                                                        <Smartphone size={16} />
                                                    </div>
                                                    <div>
                                                        <h4 className="font-bold text-gray-900 text-sm">App & Experience</h4>
                                                        <p className="text-xs text-muted-foreground">Guest app settings.</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-1 gap-6">
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <Label className="text-sm font-medium text-gray-900">Enable Gallery App</Label>
                                                            <p className="text-xs text-muted-foreground mt-0.5">Allow guests to install event as mobile app.</p>
                                                        </div>
                                                        <Switch
                                                            checked={values.enable_gallery_app}
                                                            onCheckedChange={(checked) => setFieldValue("enable_gallery_app", checked)}
                                                        />
                                                    </div>
                                                    <div className="flex items-center justify-between">
                                                        <div>
                                                            <Label className="text-sm font-medium text-gray-900">Enable Liveliness Detection</Label>
                                                            <p className="text-xs text-muted-foreground mt-0.5">Guests must blink to validate identity before capturing selfie.</p>
                                                        </div>
                                                        <Switch
                                                            checked={values.enable_liveliness_detection}
                                                            onCheckedChange={(checked) => setFieldValue("enable_liveliness_detection", checked)}
                                                        />
                                                    </div>
                                                </div>
                                            </div>

                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </form>
            </CardContent>
        </Card>
    );
};
