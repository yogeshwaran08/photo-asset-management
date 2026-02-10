import React, { useState } from 'react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';
import {
    Menu,
    X,
    LogOut,
    Bell,
    CreditCard,
    BookOpen,
    Sparkles,
    ChevronDown,
    LayoutDashboard
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
} from '@/components/ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import useUserStore from '@/store/userStore';

interface SidebarItem {
    name: string;
    href: string;
    icon: React.ElementType;
    subItems?: SidebarItem[];
}

interface DashboardLayoutProps {
    children: React.ReactNode;
    items: SidebarItem[];
    title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, items, title }) => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const { logout, user } = useUserStore();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLogoutDialogOpen(true);
    };

    const handleConfirmLogout = async () => {
        await logout();
    };

    return (
        <div className="min-h-screen bg-neutral-50/50 flex font-sans">
            {/* Desktop Sidebar */}
            <aside className="hidden md:flex flex-col w-[220px] h-screen sticky top-0 border-r border-border/50 bg-white/80 backdrop-blur-xl z-40">
                <div className="h-16 flex items-center px-6 border-b border-border/50 shrink-0 gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500 shadow-sm shadow-primary-500/10">
                        <LayoutDashboard size={18} className="fill-current" />
                    </div>
                    <div>
                        <span className="font-bold text-lg uppercase tracking-tight block leading-none">SnapVault</span>
                        <span className="text-[9px] font-medium text-muted-foreground uppercase tracking-widest block leading-normal">Studio</span>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto py-6 px-4 space-y-1">
                    {items.map((item) => {
                        const hasSubItems = item.subItems && item.subItems.length > 0;
                        const isMainActive = location.pathname.startsWith(item.href) || 
                            (item.subItems?.some(sub => location.pathname.startsWith(sub.href)) ?? false); 
                        
                        const [isOpen, setIsOpen] = useState(isMainActive || item.name === 'My Events');

                        if (hasSubItems) {
                            return (
                                <div key={item.href} className="space-y-1"> 
                                    <div
                                        className={cn(
                                            "w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[0.85rem] font-medium tracking-wide transition-all select-none",
                                            isMainActive
                                                ? "bg-primary-500/10 text-primary-600 ring-1 ring-primary-500/20"
                                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                        )}
                                    >
                                        <div 
                                            className="flex items-center gap-3 flex-1 cursor-pointer"
                                            onClick={() => {
                                                setIsOpen(true);
                                                navigate(item.href);
                                            }}
                                        >
                                            <item.icon size={18} strokeWidth={2.5} />
                                            {item.name}
                                        </div>
                                        <div 
                                            className="cursor-pointer p-1 hover:bg-black/5 rounded-full transition-colors"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setIsOpen(!isOpen);
                                            }}
                                        >
                                            <ChevronDown size={14} className={cn("transition-transform duration-200", isOpen ? "rotate-180" : "")} />
                                        </div>
                                    </div>
                                    
                                    <AnimatePresence>
                                        {isOpen && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: "auto", opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="overflow-hidden"
                                            >
                                                <div className="pl-4 space-y-1 pt-1 pb-2">
                                                    {item.subItems!.map((subItem) => (
                                                        <NavLink
                                                            key={subItem.href}
                                                            to={subItem.href}
                                                            className={({ isActive }) => cn(
                                                                "flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium tracking-wide transition-all select-none block",
                                                                isActive
                                                                    ? "bg-primary-500/10 text-primary-600 ring-1 ring-primary-500/20"
                                                                    : "text-muted-foreground hover:text-foreground hover:bg-muted/30"
                                                            )}
                                                        >
                                                            {/* <subItem.icon size={14} strokeWidth={2.5} /> */}
                                                            <span className="w-1.5 h-1.5 rounded-full bg-current opacity-40" />
                                                            {subItem.name}
                                                        </NavLink>
                                                    ))}
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        }

                        return (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                className={({ isActive }) => cn(
                                    "flex items-center gap-3 px-3 py-2.5 rounded-xl text-[0.85rem] font-medium tracking-wide transition-all select-none",
                                    isActive
                                        ? "bg-primary-500/10 text-primary-600 ring-1 ring-primary-500/20"
                                        : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                )}
                            >
                                <item.icon size={18} strokeWidth={2.5} />
                                {item.name}
                            </NavLink>
                        );
                    })}
                </div>

                <div className="p-4 border-t border-border/50">
                    <div className="bg-gradient-to-br from-neutral-100 to-white border border-border/50 rounded-2xl p-4 shadow-sm">
                        <div className="flex items-center gap-3 mb-3">
                            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center shrink-0">
                                <Sparkles size={14} className="fill-current" />
                            </div>
                            <div>
                                <p className="font-semibold text-xs uppercase tracking-tight">Pro Plan</p>
                                <p className="text-[10px] text-muted-foreground font-medium">Unlock all features</p>
                            </div>
                        </div>
                        <Button
                            size="sm"
                            className="w-full bg-primary-500 hover:bg-primary-600 text-white border-0 font-semibold uppercase text-[10px] tracking-widest h-8 rounded-lg shadow-lg shadow-primary-500/20"
                        >
                            Upgrade
                        </Button>
                    </div>
                </div>
            </aside>

            {/* Main Content Wrapper */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Navigation Bar */}
                <header className="sticky top-0 z-30 w-full border-b border-border/50 bg-white/80 backdrop-blur-xl h-16 px-6 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3 md:hidden">
                        <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(true)}>
                            <Menu size={20} />
                        </Button>
                        <span className="font-bold text-lg uppercase tracking-tight md:hidden">SnapVault</span>
                    </div>

                    <div className="flex items-center gap-3 md:gap-4 shrink-0 max-w-full ml-auto">
                        <Button variant="ghost" size="icon" className="w-9 h-9 rounded-full text-muted-foreground hover:bg-muted/50 hover:text-foreground relative transition-colors">
                            <Bell size={18} />
                            <span className="absolute top-2.5 right-2.5 w-1.5 h-1.5 bg-error rounded-full ring-2 ring-white"></span>
                        </Button>

                        <div className="w-px h-6 bg-border/50 hidden md:block"></div>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="flex items-center gap-2 outline-none rounded-full pl-1 pr-1 md:pr-3 py-1 hover:bg-muted/50 transition-all border border-transparent hover:border-border/50 group max-w-[200px]">
                                    <Avatar className="w-8 h-8 rounded-full border border-border/50 group-hover:border-primary-500/30 transition-colors shrink-0">
                                        <AvatarImage src={`https://ui-avatars.com/api/?name=${user?.full_name || 'User'}&background=F27963&color=fff&size=128`} />
                                        <AvatarFallback className="bg-primary-100 text-primary-600 font-bold text-xs">SV</AvatarFallback>
                                    </Avatar>
                                    <div className="text-left hidden lg:block overflow-hidden">
                                        <p className="text-[11px] font-bold uppercase leading-none text-foreground group-hover:text-primary-600 transition-colors truncate">{user?.full_name || 'Studio User'}</p>
                                    </div>
                                    <ChevronDown size={14} className="text-muted-foreground hidden lg:block group-hover:text-foreground transition-colors shrink-0" />
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-56 rounded-2xl p-2 glass border-border/50 shadow-2xl mt-2">
                                <div className="p-3 bg-muted/30 rounded-xl mb-2 flex flex-col gap-1">
                                    <p className="font-bold text-xs text-foreground uppercase tracking-tight truncate">{user?.full_name}</p>
                                    <p className="text-[10px] font-medium text-muted-foreground break-all uppercase tracking-wider truncate">{user?.email}</p>
                                </div>

                                <DropdownMenuItem asChild>
                                    <NavLink to="/studio/profile-setup" className="rounded-lg font-medium p-2.5 gap-3 focus:bg-primary-500/10 cursor-pointer flex items-center w-full outline-none transition-colors">
                                        <CreditCard size={16} className="text-primary-500" />
                                        <span className="text-[11px] uppercase tracking-wide font-bold">My Plan</span>
                                    </NavLink>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="rounded-lg font-medium p-2.5 gap-3 focus:bg-primary-500/10 cursor-pointer transition-colors">
                                    <BookOpen size={16} className="text-primary-500" />
                                    <span className="text-[11px] uppercase tracking-wide font-bold">Tutorial</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="bg-border/50 my-1" />

                                <DropdownMenuItem className="rounded-lg font-medium p-2.5 gap-3 text-error focus:bg-error/10 focus:text-error cursor-pointer transition-colors" onClick={handleLogoutClick}>
                                    <LogOut size={16} />
                                    <span className="text-[11px] uppercase tracking-wide font-bold">Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>

                {/* Main Content */}
                <main className="flex-1 w-full max-w-[1920px] mx-auto p-4 md:p-8 animate-in fade-in duration-500 slide-in-from-bottom-2">
                    {children}
                </main>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-background/80 backdrop-blur-md z-[60] md:hidden"
                        onClick={() => setIsMobileMenuOpen(false)}
                    >
                        <motion.div
                            initial={{ x: '-100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '-100%' }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="absolute left-0 top-0 bottom-0 w-[280px] bg-white border-r border-border/50 shadow-2xl p-6 flex flex-col"
                            onClick={e => e.stopPropagation()}
                        >
                            <div className="flex items-center justify-between mb-8">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary-500/10 flex items-center justify-center text-primary-500 shadow-sm shadow-primary-500/10">
                                        <LayoutDashboard size={18} className="fill-current" />
                                    </div>
                                    <span className="font-bold text-lg uppercase tracking-tight">SnapVault</span>
                                </div>
                                <Button variant="ghost" size="icon" onClick={() => setIsMobileMenuOpen(false)}>
                                    <X size={20} />
                                </Button>
                            </div>

                            <nav className="space-y-2 flex-1 overflow-y-auto">
                                {items.map((item) => (
                                    <NavLink
                                        key={item.href}
                                        to={item.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className={({ isActive }) => cn(
                                            "flex items-center gap-4 px-4 py-3.5 rounded-xl transition-all",
                                            isActive
                                                ? "bg-primary-500/10 text-primary-600 ring-1 ring-primary-500/20"
                                                : "text-muted-foreground hover:bg-muted/50 hover:text-foreground"
                                        )}
                                    >
                                        <item.icon size={20} strokeWidth={2.5} />
                                        <span className="font-medium text-xs uppercase tracking-wide">{item.name}</span>
                                    </NavLink>
                                ))}
                            </nav>

                            <div className="mt-8 pt-8 border-t border-border/50 space-y-4">
                                <div className="bg-neutral-50 rounded-xl p-4 border border-border/50">
                                    <p className="font-semibold text-xs uppercase tracking-tight mb-1">Pro Plan</p>
                                    <p className="text-[10px] text-muted-foreground mb-3">Upgrade for more features</p>
                                    <Button className="w-full bg-primary-500 text-white font-semibold uppercase text-xs tracking-widest h-9 rounded-lg shadow-sm">
                                        Upgrade
                                    </Button>
                                </div>
                                <Button variant="outline" className="w-full font-semibold uppercase text-xs tracking-widest h-10 rounded-xl" onClick={handleLogoutClick}>
                                    <LogOut size={16} className="mr-2" />
                                    Sign Out
                                </Button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
                <AlertDialogContent className="rounded-2xl">
                    <AlertDialogHeader>
                        <AlertDialogTitle className="font-bold text-xl">Confirm Logout</AlertDialogTitle>
                        <AlertDialogDescription>
                            Are you sure you want to log out? You will be redirected to the login page.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel className="rounded-xl font-bold">Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleConfirmLogout} className="bg-destructive hover:bg-destructive/90 rounded-xl font-bold">
                            Logout
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
};

export default DashboardLayout;
