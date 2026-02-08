import React, { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import {
    ChevronLeft,
    Menu,
    X,
    User,
    LogOut,
    Bell,
    CreditCard,
    BookOpen
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
    DropdownMenuLabel,
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
}

interface DashboardLayoutProps {
    children: React.ReactNode;
    items: SidebarItem[];
    title: string;
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, items, title }) => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
    const { logout, user} = useUserStore();

    const handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setIsLogoutDialogOpen(true);
    };

    const handleConfirmLogout = async () => {
        await logout();
    };
    const location = useLocation();

    // Auto-collapse sidebar on Event Details page
    const isEventDetails = location.pathname.startsWith('/studio/events/');

    React.useEffect(() => {
        if (isEventDetails) {
            setIsSidebarOpen(false);
        } else {
            setIsSidebarOpen(true);
        }
    }, [isEventDetails]);

    return (
        <>
            <div className="flex h-screen bg-white text-foreground overflow-hidden font-sans">
                {/* Sidebar for Desktop */}
                <motion.aside
                    initial={false}
                    animate={{ width: isSidebarOpen ? 280 : 80 }}
                    transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                    className="hidden md:flex flex-col border-r border-border/50 h-screen sticky top-0 overflow-hidden glass z-40"
                >
                    <div className={cn(
                        "h-20 flex items-center shrink-0 transition-all duration-400",
                        isSidebarOpen ? "px-8" : "justify-center"
                    )}>
                        <div className="w-11 h-11 rounded-2xl bg-white shrink-0 flex items-center justify-center text-foreground shadow-lg shadow-primary-500/20 overflow-hidden p-1">
                            <img src="/logo.png" alt="SnapVault Logo" className="w-full h-full object-contain" />
                        </div>
                        <AnimatePresence mode="wait">
                            {isSidebarOpen && (
                                <motion.div
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -10 }}
                                    transition={{ duration: 0.2, delay: 0.1 }}
                                    className="ml-4"
                                >
                                    <span className="font-black text-xl tracking-tighter uppercase whitespace-nowrap">
                                        SnapVault
                                    </span>
                                    <p className="text-[8px] font-black uppercase text-muted-foreground tracking-widest leading-none mt-0.5">Studio Core</p>
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </div>

                    <nav className="flex-1 px-3 py-6 space-y-2 overflow-y-auto custom-scrollbar">
                        {items.map((item) => (
                            <NavLink
                                key={item.href}
                                to={item.href}
                                className={({ isActive }) => cn(
                                    "flex items-center h-12 rounded-2xl transition-all duration-300 group relative overflow-hidden",
                                    isActive
                                        ? "bg-primary-500/10 text-foreground ring-1 ring-primary-500/20"
                                        : "hover:bg-muted/50 text-muted-foreground hover:text-foreground"
                                )}
                            >
                                {({ isActive }) => (
                                    <>
                                        <div className="w-14 h-12 shrink-0 flex items-center justify-center">
                                            <item.icon size={20} strokeWidth={isActive ? 3 : 2} className={cn("transition-colors", isActive ? "text-primary-600" : "group-hover:text-foreground")} />
                                        </div>
                                        <AnimatePresence mode="popLayout">
                                            {isSidebarOpen && (
                                                <motion.span
                                                    initial={{ opacity: 0, x: -10 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    exit={{ opacity: 0, x: -10 }}
                                                    transition={{ duration: 0.2 }}
                                                    className="font-black text-[10px] uppercase tracking-widest whitespace-nowrap"
                                                >
                                                    {item.name}
                                                </motion.span>
                                            )}
                                        </AnimatePresence>
                                        {!isSidebarOpen && (
                                            <div className="absolute left-16 px-3 py-1.5 bg-foreground text-background text-[10px] font-black uppercase tracking-widest rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-50 shadow-xl">
                                                {item.name}
                                            </div>
                                        )}
                                    </>
                                )}
                            </NavLink>
                        ))}
                    </nav>

                    <div className="p-3 border-t border-border/50">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="w-full flex items-center h-12 rounded-2xl hover:bg-muted/50 transition-all overflow-hidden group"
                        >
                            <div className="w-14 h-12 shrink-0 flex items-center justify-center">
                                <motion.div
                                    animate={{ rotate: isSidebarOpen ? 0 : 180 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <ChevronLeft size={20} className="text-muted-foreground group-hover:text-foreground transition-colors" />
                                </motion.div>
                            </div>
                            <AnimatePresence>
                                {isSidebarOpen && (
                                    <motion.span
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-[10px] font-black uppercase tracking-widest text-muted-foreground group-hover:text-foreground transition-colors whitespace-nowrap"
                                    >
                                        Collapse Interface
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </motion.aside>

                {/* Mobile Header */}
                <div className="md:hidden fixed top-0 left-0 right-0 h-16 border-b border-border/50 flex items-center justify-between px-6 z-50 glass">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-foreground overflow-hidden p-1">
                            <img src="/logo.png" alt="SnapVault Logo" className="w-full h-full object-contain" />
                        </div>
                        <span className="font-black uppercase tracking-tighter">SnapVault</span>
                    </div>
                    <Button variant="ghost" size="icon" className="rounded-xl" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                        {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                    </Button>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="md:hidden fixed inset-0 bg-white/80 backdrop-blur-xl z-50"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <motion.div
                                initial={{ x: -280 }}
                                animate={{ x: 0 }}
                                exit={{ x: -280 }}
                                className="absolute left-0 top-0 bottom-0 w-[280px] bg-white p-8 shadow-2xl border-r border-border/50"
                                onClick={e => e.stopPropagation()}
                            >
                                <div className="flex items-center gap-3 mb-12">
                                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center text-foreground overflow-hidden p-1">
                                        <img src="/logo.png" alt="SnapVault Logo" className="w-full h-full object-contain" />
                                    </div>
                                    <span className="font-black text-xl uppercase tracking-tighter">SnapVault</span>
                                </div>
                                <nav className="space-y-3">
                                    {items.map((item) => (
                                        <NavLink
                                            key={item.href}
                                            to={item.href}
                                            onClick={() => setIsMobileMenuOpen(false)}
                                            className={({ isActive }) => cn(
                                                "flex items-center gap-4 px-4 py-4 rounded-2xl transition-all",
                                                isActive ? "bg-primary-500/10 text-foreground ring-1 ring-primary-500/20" : "text-muted-foreground hover:text-foreground"
                                            )}
                                        >
                                            {({ isActive }) => (
                                                <>
                                                    <item.icon size={20} strokeWidth={isActive ? 3 : 2} />
                                                    <span className="font-black text-[10px] uppercase tracking-widest">{item.name}</span>
                                                </>
                                            )}
                                        </NavLink>
                                    ))}
                                </nav>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden md:pt-0 pt-16">
                <header className="h-20 hidden md:flex items-center justify-between px-10 border-b border-border/50 sticky top-0 glass z-30">
                    <h1 className="text-sm font-black uppercase tracking-[0.1em] text-muted-foreground">{title}</h1>
                    <div className="flex items-center gap-6">
                        <Button variant="ghost" size="icon" className="w-10 h-10 rounded-xl text-muted-foreground hover:text-foreground relative">
                            <Bell size={20} />
                            <span className="absolute top-2 right-2 w-2 h-2 bg-primary-500 rounded-full border-2 border-white"></span>
                        </Button>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <button className="outline-none rounded-2xl ring-offset-2 focus:ring-2 focus:ring-primary-500 transition-all">
                                    <Avatar className="w-10 h-10 rounded-2xl border border-border/50 transition-all hover:ring-4 hover:ring-primary-500/10 hover:border-primary-500 shadow-sm">
                                        <AvatarImage src="https://ui-avatars.com/api/?name=Luminary+Studios&background=93ea7d&color=111411&size=128" />
                                        <AvatarFallback className="rounded-2xl font-black text-xs">LS</AvatarFallback>
                                    </Avatar>
                                </button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end" className="w-64 rounded-[1.5rem] p-2 glass border-border/50 shadow-2xl">
                                <div className="p-4 bg-muted/30 rounded-xl mb-2 flex flex-col gap-1">
                                    <p className="font-black text-sm text-foreground uppercase tracking-tight">{user?.full_name}</p>
                                    <p className="text-[10px] font-bold text-muted-foreground break-all uppercase tracking-wider">{user?.email}</p>
                                </div>

                                <DropdownMenuItem asChild>
                                    <NavLink to="/studio/profile-setup" className="rounded-xl font-bold p-3 gap-3 focus:bg-primary-500/10 cursor-pointer flex items-center w-full outline-none">
                                        <CreditCard size={16} className="text-primary-500" />
                                        <span className="text-xs uppercase tracking-tight">My Plan</span>
                                    </NavLink>
                                </DropdownMenuItem>

                                <DropdownMenuItem className="rounded-xl font-bold p-3 gap-3 focus:bg-primary-500/10 cursor-pointer">
                                    <BookOpen size={16} className="text-primary-500" />
                                    <span className="text-xs uppercase tracking-tight">Tutorial</span>
                                </DropdownMenuItem>

                                <DropdownMenuSeparator className="bg-border/50 my-2" />

                                <DropdownMenuItem className="rounded-xl font-bold p-3 gap-3 text-error focus:bg-error/10 focus:text-error cursor-pointer" onClick={handleLogoutClick}>
                                    <LogOut size={16} />
                                    <span className="text-xs uppercase tracking-tight">Logout</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <div className={cn(
                    "flex-1 overflow-y-auto bg-white/50",
                    isEventDetails || location.pathname.includes('/settings') ? "p-0 overflow-hidden" : "p-6 md:p-10"
                )}>
                    {children}
                </div>
            </main>
        </div>

        <AlertDialog open={isLogoutDialogOpen} onOpenChange={setIsLogoutDialogOpen}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Confirm Logout</AlertDialogTitle>
                    <AlertDialogDescription>
                        Are you sure you want to log out? You will be redirected to the login page.
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleConfirmLogout} className="bg-destructive hover:bg-destructive/90">
                        Logout
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    </>
    );
};

export default DashboardLayout;
