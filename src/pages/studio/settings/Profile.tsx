import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { studioSettingsService } from '@/services/studioSettingsService';
import { toast } from 'sonner';

const Profile = () => {
    const [profileData, setProfileData] = useState<any>({
        full_name: '',
        mobile_number: '',
        country_code: '+91',
        email_id: '',
        country: '',
        state: '',
        city: '',
        company_name: '',
        industry: 'photographer',
        area: 'wedding',
        avg_events_per_year: '',
        billing_company_name: '',
        gst_vat_number: ''
    });
    const [settingsId, setSettingsId] = useState<number | null>(null);

    useEffect(() => {
        const fetchSettings = async () => {
            try {
                const data = await studioSettingsService.getCurrent();
                if (data) {
                    setSettingsId(data.id);
                    setProfileData({
                        full_name: data.full_name || '',
                        mobile_number: data.mobile_number || '',
                        country_code: '+91',
                        email_id: data.email_id || '',
                        country: data.country || '',
                        state: data.state || '',
                        city: data.city || '',
                        company_name: data.company_name || '',
                        industry: data.industry || 'photographer',
                        area: data.area || 'wedding',
                        avg_events_per_year: data.avg_events_per_year || '',
                        billing_company_name: data.billing_company_name || '',
                        gst_vat_number: data.gst_vat_number || ''
                    });
                }
            } catch (error) {
                console.log("No existing settings found or failed to fetch", error);
            }
        };
        fetchSettings();
    }, []);

    const handleProfileChange = (field: string, value: string) => {
        setProfileData((prev: any) => ({ ...prev, [field]: value }));
    };

    const saveProfile = async () => {
        try {
            if (settingsId) {
                await studioSettingsService.update(settingsId, profileData);
                toast.success("Profile updated successfully");
            } else {
                const newSettings = await studioSettingsService.create(profileData);
                setSettingsId(newSettings.id);
                toast.success("Profile created successfully");
            }
        } catch (error) {
            console.error("Failed to save profile", error);
            toast.error("Failed to save changes");
        }
    };

    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-8">
            {/* Page Header with Gradient */}
            <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary-500/10 via-primary-400/10 to-orange-500/10 border border-primary-200/50 shadow-lg shadow-primary-500/5 overflow-hidden">
                <div className="absolute -top-20 -right-20 w-64 h-64 bg-gradient-to-br from-primary-400 to-orange-400 rounded-full blur-3xl opacity-20 animate-pulse" />
                <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-gradient-to-br from-orange-400 to-red-400 rounded-full blur-3xl opacity-20 animate-pulse delay-1000" />
                
                <div className="relative z-10">
                    <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-primary-600 via-primary-500 to-orange-600 bg-clip-text text-transparent">
                        Profile Settings
                    </h1>
                    <p className="text-gray-600 mt-2 font-medium">
                        Manage your personal and company information
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Details */}
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                >
                    <Card className="border-2 border-gray-100 hover:border-primary-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full rounded-2xl overflow-hidden">
                        <CardHeader className="pb-4 bg-gradient-to-r from-primary-50 to-orange-50 border-b border-primary-100">
                            <CardTitle className="text-sm uppercase tracking-widest font-bold bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
                                Personal Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <div className="space-y-2">
                                <Label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-gray-600">Full Name</Label>
                                <Input
                                    value={profileData.full_name}
                                    onChange={(e) => handleProfileChange('full_name', e.target.value)}
                                    className="bg-gray-50 border-gray-200 hover:border-primary-300 focus:border-primary-400 rounded-xl h-12 text-sm font-medium transition-all duration-200"
                                    placeholder="Enter your full name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-gray-600">Mobile Number</Label>
                                <div className="flex gap-3">
                                    <Input
                                        value={profileData.country_code}
                                        onChange={(e) => handleProfileChange('country_code', e.target.value)}
                                        className="w-24 bg-gray-50 border-gray-200 hover:border-primary-300 focus:border-primary-400 rounded-xl h-12 text-sm text-center font-semibold transition-all duration-200"
                                    />
                                    <Input
                                        value={profileData.mobile_number}
                                        onChange={(e) => handleProfileChange('mobile_number', e.target.value)}
                                        className="flex-1 bg-gray-50 border-gray-200 hover:border-primary-300 focus:border-primary-400 rounded-xl h-12 text-sm font-medium transition-all duration-200"
                                        placeholder="Enter mobile number"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-gray-600">Email Id</Label>
                                <Input
                                    value={profileData.email_id}
                                    onChange={(e) => handleProfileChange('email_id', e.target.value)}
                                    className="bg-gray-50 border-gray-200 hover:border-primary-300 focus:border-primary-400 rounded-xl h-12 text-sm font-medium transition-all duration-200"
                                    placeholder="Enter your email"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-gray-600">Country</Label>
                                    <Input
                                        value={profileData.country}
                                        onChange={(e) => handleProfileChange('country', e.target.value)}
                                        className="bg-gray-50 border-gray-200 hover:border-primary-300 focus:border-primary-400 rounded-xl h-12 text-sm font-medium transition-all duration-200"
                                        placeholder="Country"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-gray-600">State</Label>
                                    <Input
                                        value={profileData.state}
                                        onChange={(e) => handleProfileChange('state', e.target.value)}
                                        className="bg-gray-50 border-gray-200 hover:border-primary-300 focus:border-primary-400 rounded-xl h-12 text-sm font-medium transition-all duration-200"
                                        placeholder="State"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-gray-600">City</Label>
                                <Input
                                    value={profileData.city}
                                    onChange={(e) => handleProfileChange('city', e.target.value)}
                                    className="bg-gray-50 border-gray-200 hover:border-primary-300 focus:border-primary-400 rounded-xl h-12 text-sm font-medium transition-all duration-200"
                                    placeholder="Enter your city"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>

                {/* Company Details */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Card className="border-2 border-gray-100 hover:border-primary-200 shadow-lg hover:shadow-xl transition-all duration-300 h-full rounded-2xl overflow-hidden">
                        <CardHeader className="pb-4 bg-gradient-to-r from-primary-50 to-orange-50 border-b border-primary-100">
                            <CardTitle className="text-sm uppercase tracking-widest font-bold bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
                                Company Details
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-5 pt-6">
                            <div className="space-y-2">
                                <Label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-gray-600">Company Name</Label>
                                <Input
                                    value={profileData.company_name}
                                    onChange={(e) => handleProfileChange('company_name', e.target.value)}
                                    className="bg-gray-50 border-gray-200 hover:border-primary-300 focus:border-primary-400 rounded-xl h-12 text-sm font-medium transition-all duration-200"
                                    placeholder="Enter company name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-gray-600">Industry</Label>
                                <Select
                                    value={profileData.industry}
                                    onValueChange={(val) => handleProfileChange('industry', val)}
                                >
                                    <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 hover:border-primary-300 text-sm font-medium transition-all duration-200">
                                        <SelectValue placeholder="Select Industry" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-primary-200">
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
                                <Label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-gray-600">Area</Label>
                                <Select
                                    value={profileData.area}
                                    onValueChange={(val) => handleProfileChange('area', val)}
                                >
                                    <SelectTrigger className="h-12 rounded-xl bg-gray-50 border-gray-200 hover:border-primary-300 text-sm font-medium transition-all duration-200">
                                        <SelectValue placeholder="Select Industry Areas" />
                                    </SelectTrigger>
                                    <SelectContent className="rounded-xl border-primary-200">
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
                                <Label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-gray-600">Average Number of Events per Year</Label>
                                <Input
                                    value={profileData.avg_events_per_year}
                                    onChange={(e) => handleProfileChange('avg_events_per_year', e.target.value)}
                                    placeholder="e.g. 50"
                                    className="bg-gray-50 border-gray-200 hover:border-primary-300 focus:border-primary-400 rounded-xl h-12 text-sm font-medium transition-all duration-200"
                                />
                            </div>
                        </CardContent>
                    </Card>
                </motion.div>
            </div>

            {/* Billing Details */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="border-2 border-gray-100 hover:border-primary-200 shadow-lg hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
                    <CardHeader className="pb-4 bg-gradient-to-r from-primary-50 to-orange-50 border-b border-primary-100">
                        <CardTitle className="text-sm uppercase tracking-widest font-bold bg-gradient-to-r from-primary-600 to-orange-600 bg-clip-text text-transparent">
                            Billing Details
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-5 pt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <Label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-gray-600">Company Name (As Per Official GST/VAT Document)</Label>
                                <Input
                                    value={profileData.billing_company_name}
                                    onChange={(e) => handleProfileChange('billing_company_name', e.target.value)}
                                    className="bg-gray-50 border-gray-200 hover:border-primary-300 focus:border-primary-400 rounded-xl h-12 text-sm font-medium transition-all duration-200"
                                    placeholder="Official company name"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[11px] uppercase tracking-widest ml-1 font-bold text-gray-600">GST/VAT Number</Label>
                                <Input
                                    value={profileData.gst_vat_number}
                                    onChange={(e) => handleProfileChange('gst_vat_number', e.target.value)}
                                    className="bg-gray-50 border-gray-200 hover:border-primary-300 focus:border-primary-400 rounded-xl h-12 text-sm font-medium transition-all duration-200"
                                    placeholder="Enter GST/VAT number"
                                />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Save Button */}
            <div className="flex justify-end pt-4">
                <Button
                    onClick={saveProfile}
                    className="group relative h-14 px-12 rounded-2xl bg-gradient-to-r from-primary-600 via-primary-500 to-orange-600 hover:from-primary-700 hover:via-primary-600 hover:to-orange-700 text-white font-bold uppercase text-xs tracking-widest shadow-2xl shadow-primary-500/30 hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-primary-500 via-orange-500 to-red-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <span className="relative">Save Changes</span>
                </Button>
            </div>
        </motion.div>
    );
};

export default Profile;
