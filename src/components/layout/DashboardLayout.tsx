import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    Camera,
    ChevronLeft,
    ChevronRight,
    Menu,
    X
} from 'lucide-react';
import { cn } from '../../utils/cn';

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

    return (
        <div className="flex h-screen bg-background text-foreground overflow-hidden">
            {/* Sidebar for Desktop */}
            <aside
                className={cn(
                    "hidden md:flex flex-col border-r border-border bg-secondary-bg transition-all duration-300",
                    isSidebarOpen ? "w-64" : "w-20"
                )}
            >
                <div className="p-6 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white shadow-lg shadow-primary-500/20">
                        <Camera size={20} />
                    </div>
                    {isSidebarOpen && (
                        <span className="font-bold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-500">
                            SnapVault
                        </span>
                    )}
                </div>

                <nav className="flex-1 px-4 py-4 space-y-2">
                    {items.map((item) => (
                        <NavLink
                            key={item.href}
                            to={item.href}
                            className={({ isActive }) => cn(
                                "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
                                isActive
                                    ? "bg-primary-900/20 text-primary-400"
                                    : "hover:bg-card text-muted-foreground"
                            )}
                        >
                            <item.icon size={20} className={cn("transition-colors", "group-hover:text-primary-400")} />
                            {isSidebarOpen && <span className="font-medium">{item.name}</span>}
                        </NavLink>
                    ))}
                </nav>

                <div className="p-4 border-t border-slate-200 dark:border-slate-800">
                    <button
                        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                        className="w-full flex items-center justify-center p-2 rounded-lg hover:bg-card transition-colors"
                    >
                        {isSidebarOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
                    </button>
                </div>
            </aside>

            {/* Mobile Header */}
            <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-secondary-bg border-b border-border flex items-center justify-between px-4 z-50">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white">
                        <Camera size={20} />
                    </div>
                    <span className="font-bold text-lg">SnapVault</span>
                </div>
                <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
                    {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="md:hidden fixed inset-0 bg-background/50 backdrop-blur-sm z-40" onClick={() => setIsMobileMenuOpen(false)}>
                    <div className="absolute left-0 top-0 bottom-0 w-64 bg-secondary-bg p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
                        <div className="flex items-center gap-3 mb-8">
                            <Camera size={24} className="text-primary-500" />
                            <span className="font-bold text-xl">SnapVault</span>
                        </div>
                        <nav className="space-y-2">
                            {items.map((item) => (
                                <NavLink
                                    key={item.href}
                                    to={item.href}
                                    onClick={() => setIsMobileMenuOpen(false)}
                                    className={({ isActive }) => cn(
                                        "flex items-center gap-3 px-3 py-3 rounded-xl transition-all",
                                        isActive ? "bg-primary-900/20 text-primary-400" : "text-muted-foreground"
                                    )}
                                >
                                    <item.icon size={20} />
                                    <span className="font-medium">{item.name}</span>
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </div>
            )}

            {/* Main Content */}
            <main className="flex-1 flex flex-col min-w-0 overflow-hidden md:pt-0 pt-16">
                <header className="h-16 hidden md:flex items-center justify-between px-8 bg-background/50 backdrop-blur-sm border-b border-border">
                    <h1 className="text-xl font-semibold">{title}</h1>
                    <div className="flex items-center gap-4">
                        <div className="flex flex-col items-end">
                            <span className="text-sm font-medium">Alex Studio</span>
                            <span className="text-xs text-muted-foreground">Super Admin</span>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-primary-400 to-accent-500 flex items-center justify-center text-white font-bold">
                            AS
                        </div>
                    </div>
                </header>
                <div className="flex-1 overflow-y-auto p-4 md:p-8">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default DashboardLayout;
