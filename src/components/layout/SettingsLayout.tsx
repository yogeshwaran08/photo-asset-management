import type { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    User,
    CreditCard,
    Bell,
    Shield,
    Globe,
    HelpCircle,
    Settings as SettingsIcon
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';

type SettingsTab = {
    id: string;
    label: string;
    icon: any;
    href: string;
};

const tabs: SettingsTab[] = [
    { id: 'profile', label: 'Profile', icon: User, href: '/studio/settings/profile' },
    { id: 'branding', label: 'Branding', icon: SettingsIcon, href: '/studio/settings/branding' },
    { id: 'domains', label: 'Domains', icon: Globe, href: '/studio/settings/domains' },
    { id: 'integrations', label: 'Integrations', icon: Bell, href: '/studio/settings/integrations' },
    { id: 'plans', label: 'My Plans', icon: Shield, href: '/studio/settings/plans' },
    { id: 'invoices', label: 'Invoices', icon: CreditCard, href: '/studio/settings/invoices' },
];

interface SettingsLayoutProps {
    children: ReactNode;
}

const SettingsLayout = ({ children }: SettingsLayoutProps) => {
    const location = useLocation();

    return (
        <div className="flex h-full bg-[#fcfcfc] dark:bg-zinc-950 font-sans" style={{ fontFamily: 'Poppins, sans-serif' }}>
            <aside className="w-52 border-r border-border/50 bg-white/50 backdrop-blur-xl flex flex-col h-full sticky top-0 overflow-hidden">
                <div className="h-6" />

                <nav className="flex-1 px-2 space-y-2 mt-4 overflow-y-auto">
                    {tabs.map((tab) => {
                        const isActive = location.pathname === tab.href || (tab.id === 'profile' && location.pathname === '/studio/settings');
                        return (
                            <Link
                                key={tab.id}
                                to={tab.href}
                                className={cn(
                                    "w-full flex items-center gap-3 px-3 py-3 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                    isActive
                                        ? "bg-gradient-to-r from-primary-500 to-orange-500 text-white shadow-xl shadow-primary-500/30"
                                        : "hover:bg-muted/40 text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {isActive && (
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-orange-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                )}
                                <div className={cn(
                                    "w-8 h-8 rounded-xl flex items-center justify-center transition-colors shrink-0 relative z-10",
                                    isActive ? "bg-white text-primary-500 shadow-lg" : "bg-muted/50 text-muted-foreground group-hover:text-foreground"
                                )}>
                                    <tab.icon size={16} strokeWidth={2.5} />
                                </div>
                                <span className="text-[11px] tracking-widest text-left flex-1 font-medium relative z-10">{tab.label}</span>
                                {isActive && (
                                    <motion.div layoutId="active-indicator-settings" className="w-1.5 h-1.5 rounded-full bg-white relative z-10" />
                                )}
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-auto px-2 pb-6">
                    <div className="w-full p-3 rounded-2xl bg-muted/20 border border-border/50 space-y-3">
                        <div className="flex flex-col items-center gap-2 text-center">
                            <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500">
                                <HelpCircle size={16} />
                            </div>
                            <div>
                                <h5 className="uppercase text-[10px] tracking-widest font-bold">Need Help?</h5>
                                <p className="text-[9px] text-muted-foreground font-medium">Contact support</p>
                            </div>
                        </div>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="outline" size="sm" className="w-full text-[10px] uppercase tracking-widest h-8 bg-white hover:bg-white/80 transition-colors">Get Support</Button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[425px] rounded-2xl glass border-border/50 bg-white/80 backdrop-blur-xl">
                                <DialogHeader>
                                    <DialogTitle className="text-2xl uppercase tracking-tight">Help</DialogTitle>
                                    <DialogDescription className="uppercase text-xs tracking-widest text-primary-500">
                                        Talk To Experts
                                    </DialogDescription>
                                </DialogHeader>
                                <div className="grid gap-4 py-4">
                                    <p className="text-sm text-muted-foreground leading-relaxed">
                                        Book a session and Get a demo on how to use the application with full potential.
                                    </p>
                                </div>
                                <div className="flex justify-end">
                                    <Button className="w-full h-12 rounded-xl uppercase tracking-widest bg-primary-500 hover:bg-primary-600 text-white shadow-lg shadow-primary-500/20">
                                        Book a demo
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </div>
                </div>
            </aside>

            <main className="flex-1 h-full overflow-y-auto bg-muted/20 relative">
                <div className="w-full py-10 pb-24 px-10">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default SettingsLayout;
