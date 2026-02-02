import { useState } from 'react';
import {
    User,
    Palette,
    Globe,
    QrCode,
    Share2,
    CreditCard,
    FileText,
    Camera,
    Mail,
    Phone,
    MapPin,
    Briefcase,
    Building,
    Globe2,
    Save
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '../../utils/cn';

const subMenus = [
    { id: 'profile', name: 'Profile', icon: User },
    { id: 'branding', name: 'Branding', icon: Palette },
    { id: 'domains', name: 'Domains', icon: Globe },
    { id: 'qr', name: 'My One QR', icon: QrCode },
    { id: 'integrations', name: 'Integrations', icon: Share2 },
    { id: 'plan', name: 'My Plan', icon: CreditCard },
    { id: 'invoices', name: 'Invoices', icon: FileText },
];

const Settings = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="max-w-7xl mx-auto pb-12">
            <div className="mb-8">
                <h1 className="text-3xl font-bold tracking-tight">Studio Settings</h1>
                <p className="text-muted-foreground mt-1">Manage your studio profile, branding, and billing preferences.</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Sidebar Navigation */}
                <aside className="lg:w-64 space-y-2">
                    {subMenus.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id)}
                            className={cn(
                                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 group text-left",
                                activeTab === item.id
                                    ? "bg-primary-500 text-white shadow-lg shadow-primary-500/25"
                                    : "hover:bg-card text-muted-foreground hover:text-foreground"
                            )}
                        >
                            <item.icon size={20} className={cn(
                                "transition-colors",
                                activeTab === item.id ? "text-white" : "group-hover:text-primary-400"
                            )} />
                            <span className="font-medium">{item.name}</span>
                        </button>
                    ))}
                </aside>

                {/* Main Content Area */}
                <div className="flex-1 min-w-0">
                    <AnimatePresence mode="wait">
                        {activeTab === 'profile' && (
                            <motion.div
                                key="profile"
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-6"
                            >
                                {/* Profile Picture Section */}
                                <div className="bg-card p-8 rounded-3xl border border-border shadow-sm">
                                    <div className="flex flex-col md:flex-row items-center gap-6">
                                        <div className="relative group">
                                            <div className="w-24 h-24 rounded-full bg-linear-to-tr from-primary-400 to-accent-500 flex items-center justify-center text-white text-3xl font-bold border-4 border-background shadow-xl">
                                                AS
                                            </div>
                                            <button className="absolute bottom-0 right-0 p-2 bg-primary-500 rounded-full text-white shadow-lg opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Camera size={16} />
                                            </button>
                                        </div>
                                        <div className="text-center md:text-left">
                                            <h3 className="text-xl font-bold">Studio Profile Photo</h3>
                                            <p className="text-sm text-muted-foreground mt-1">Update your studio logo or profile picture.</p>
                                            <div className="flex flex-wrap justify-center md:justify-start gap-3 mt-4">
                                                <button className="px-4 py-2 bg-primary-500/10 text-primary-400 text-sm font-bold rounded-xl hover:bg-primary-500/20 transition-all">
                                                    Upload New photo
                                                </button>
                                                <button className="px-4 py-2 bg-secondary-bg text-muted-foreground text-sm font-bold rounded-xl hover:bg-card transition-all border border-border">
                                                    Remove
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Personal Details */}
                                <div className="bg-card p-8 rounded-3xl border border-border shadow-sm overflow-hidden relative">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-xl bg-primary-500/10 flex items-center justify-center text-primary-500">
                                            <User size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold">Personal Details</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-muted-foreground ml-1">Full Name</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary-500 transition-colors">
                                                    <User size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    defaultValue="Alex Johnson"
                                                    className="w-full pl-11 pr-4 py-3 bg-secondary-bg border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                                    placeholder="Enter your name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-muted-foreground ml-1">Email Address</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary-500 transition-colors">
                                                    <Mail size={18} />
                                                </div>
                                                <input
                                                    type="email"
                                                    defaultValue="alex@luminarystudios.com"
                                                    className="w-full pl-11 pr-4 py-3 bg-secondary-bg border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                                    placeholder="Enter email"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-muted-foreground ml-1">Phone Number</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary-500 transition-colors">
                                                    <Phone size={18} />
                                                </div>
                                                <input
                                                    type="tel"
                                                    defaultValue="+1 (555) 123-4567"
                                                    className="w-full pl-11 pr-4 py-3 bg-secondary-bg border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                                    placeholder="Enter phone number"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-muted-foreground ml-1">Job Title</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-primary-500 transition-colors">
                                                    <Briefcase size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    defaultValue="Owner / Principal Photographer"
                                                    className="w-full pl-11 pr-4 py-3 bg-secondary-bg border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 transition-all"
                                                    placeholder="Enter your role"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Company Details */}
                                <div className="bg-card p-8 rounded-3xl border border-border shadow-sm overflow-hidden relative">
                                    <div className="flex items-center gap-3 mb-8">
                                        <div className="w-10 h-10 rounded-xl bg-accent-500/10 flex items-center justify-center text-accent-500">
                                            <Building size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold">Company Details</h3>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-muted-foreground ml-1">Company Name</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent-500 transition-colors">
                                                    <Building size={18} />
                                                </div>
                                                <input
                                                    type="text"
                                                    defaultValue="Luminary Studios NY"
                                                    className="w-full pl-11 pr-4 py-3 bg-secondary-bg border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                                                    placeholder="Studio name"
                                                />
                                            </div>
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-sm font-semibold text-muted-foreground ml-1">Website URL</label>
                                            <div className="relative group">
                                                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-muted-foreground group-focus-within:text-accent-500 transition-colors">
                                                    <Globe2 size={18} />
                                                </div>
                                                <input
                                                    type="url"
                                                    defaultValue="https://luminarystudios.com"
                                                    className="w-full pl-11 pr-4 py-3 bg-secondary-bg border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all"
                                                    placeholder="https://..."
                                                />
                                            </div>
                                        </div>
                                        <div className="md:col-span-2 space-y-2">
                                            <label className="text-sm font-semibold text-muted-foreground ml-1">Business Address</label>
                                            <div className="relative group">
                                                <div className="absolute top-3 left-0 pl-4 flex items-start pointer-events-none text-muted-foreground group-focus-within:text-accent-500 transition-colors">
                                                    <MapPin size={18} className="mt-1" />
                                                </div>
                                                <textarea
                                                    rows={3}
                                                    className="w-full pl-11 pr-4 py-3 bg-secondary-bg border border-border rounded-xl focus:outline-hidden focus:ring-2 focus:ring-accent-500/20 focus:border-accent-500 transition-all resize-none"
                                                    placeholder="Enter full business address"
                                                    defaultValue="123 Photography Lane, Creative District, New York, NY 10001"
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Save Button */}
                                <div className="flex justify-end pt-4">
                                    <button className="flex items-center gap-2 bg-linear-to-r from-primary-600 to-accent-600 hover:opacity-90 text-white px-8 py-3 rounded-2xl font-bold transition-all shadow-xl shadow-primary-600/20 active:scale-95">
                                        <Save size={20} />
                                        Save Changes
                                    </button>
                                </div>
                            </motion.div>
                        )}

                        {activeTab !== 'profile' && (
                            <motion.div
                                key="under-construction"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="flex flex-col items-center justify-center py-20 bg-card rounded-3xl border border-dashed border-border"
                            >
                                <div className="p-4 rounded-full bg-secondary-bg mb-4">
                                    <Globe size={40} className="text-muted-foreground animate-pulse" />
                                </div>
                                <h3 className="text-xl font-bold">Work in Progress</h3>
                                <p className="text-muted-foreground text-center max-w-xs mt-2">
                                    The {subMenus.find(m => m.id === activeTab)?.name} section is currently being developed.
                                </p>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default Settings;
