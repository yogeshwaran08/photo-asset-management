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
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Personal Details */}
                <Card className="border-border/50 glass shadow-sm h-full">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-sm uppercase tracking-widest text-primary-500">Personal Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">Full Name</Label>
                            <Input
                                value={profileData.full_name}
                                onChange={(e) => handleProfileChange('full_name', e.target.value)}
                                className="bg-muted/30 border-border/50 rounded-xl h-11 text-xs"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">Mobile Number</Label>
                            <div className="flex gap-2">
                                <Input
                                    value={profileData.country_code}
                                    onChange={(e) => handleProfileChange('country_code', e.target.value)}
                                    className="w-20 bg-muted/30 border-border/50 rounded-xl h-11 text-xs text-center"
                                />
                                <Input
                                    value={profileData.mobile_number}
                                    onChange={(e) => handleProfileChange('mobile_number', e.target.value)}
                                    className="flex-1 bg-muted/30 border-border/50 rounded-xl h-11 text-xs"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">Email Id</Label>
                            <Input
                                value={profileData.email_id}
                                onChange={(e) => handleProfileChange('email_id', e.target.value)}
                                className="bg-muted/30 border-border/50 rounded-xl h-11 text-xs"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">Country</Label>
                                <Input
                                    value={profileData.country}
                                    onChange={(e) => handleProfileChange('country', e.target.value)}
                                    className="bg-muted/30 border-border/50 rounded-xl h-11 text-xs"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">State</Label>
                                <Input
                                    value={profileData.state}
                                    onChange={(e) => handleProfileChange('state', e.target.value)}
                                    className="bg-muted/30 border-border/50 rounded-xl h-11 text-xs"
                                />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">City</Label>
                            <Input
                                value={profileData.city}
                                onChange={(e) => handleProfileChange('city', e.target.value)}
                                className="bg-muted/30 border-border/50 rounded-xl h-11 text-xs"
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Company Details */}
                <Card className="border-border/50 glass shadow-sm h-full">
                    <CardHeader className="pb-4">
                        <CardTitle className="text-sm uppercase tracking-widest text-primary-500">Company Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-8">
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">Company Name</Label>
                            <Input
                                value={profileData.company_name}
                                onChange={(e) => handleProfileChange('company_name', e.target.value)}
                                className="bg-muted/30 border-border/50 rounded-xl h-14 text-xs"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">Industry</Label>
                            <Select
                                value={profileData.industry}
                                onValueChange={(val) => handleProfileChange('industry', val)}
                            >
                                <SelectTrigger className="h-14 rounded-xl bg-muted/30 border-border/50 text-xs">
                                    <SelectValue placeholder="Select Industry" />
                                </SelectTrigger>
                                <SelectContent>
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
                            <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">Area</Label>
                            <Select
                                value={profileData.area}
                                onValueChange={(val) => handleProfileChange('area', val)}
                            >
                                <SelectTrigger className="h-14 rounded-xl bg-muted/30 border-border/50 text-xs">
                                    <SelectValue placeholder="Select Industry Areas" />
                                </SelectTrigger>
                                <SelectContent>
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
                            <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">Average Number of Events per Year</Label>
                            <Input
                                value={profileData.avg_events_per_year}
                                onChange={(e) => handleProfileChange('avg_events_per_year', e.target.value)}
                                placeholder="e.g. 50"
                                className="bg-muted/30 border-border/50 rounded-xl h-14 text-xs"
                            />
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Billing Details */}
            <Card className="border-border/50 glass shadow-sm">
                <CardHeader className="pb-4">
                    <CardTitle className="text-sm uppercase tracking-widest text-primary-500">Billing Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">Company Name (As Per Official GST/VAT Document)</Label>
                            <Input
                                value={profileData.billing_company_name}
                                onChange={(e) => handleProfileChange('billing_company_name', e.target.value)}
                                className="bg-muted/30 border-border/50 rounded-xl h-11 text-xs"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label className="text-[10px] uppercase tracking-widest ml-1 opacity-70">GST/VAT Number</Label>
                            <Input
                                value={profileData.gst_vat_number}
                                onChange={(e) => handleProfileChange('gst_vat_number', e.target.value)}
                                className="bg-muted/30 border-border/50 rounded-xl h-11 text-xs"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div className="flex justify-end pt-4">
                <Button
                    onClick={saveProfile}
                    className="h-12 px-10 rounded-xl bg-primary-500 hover:bg-primary-600 text-foreground uppercase text-xs tracking-widest shadow-lg shadow-primary-500/20"
                >
                    Save Changes
                </Button>
            </div>
        </motion.div>
    );
};

export default Profile;
