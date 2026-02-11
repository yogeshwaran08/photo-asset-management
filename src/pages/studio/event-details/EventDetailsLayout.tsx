import { Outlet, useLocation, useNavigate, useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import {
    Palette,
    BarChart2,
    Settings,
    Image as ImageIcon,

} from 'lucide-react';

const EventDetailsLayout = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    const pathname = location.pathname;
    const activeTab = pathname.endsWith('/design') ? 'design' 
        : pathname.endsWith('/analytics') ? 'analytics' 
        : pathname.endsWith('/settings') ? 'settings' 
        : 'photos';

    const handleNavigation = (tab: string) => {
        if (tab === 'photos') {
            navigate(`/studio/events/${eventId}/photos`);
        } else {
            navigate(`/studio/events/${eventId}/${tab}`);
        }
    };

    return (
        <div className="flex h-full w-full bg-[#fcfcfc] dark:bg-zinc-950 overflow-hidden font-sans">
            <aside className="w-[68px] bg-white border-r border-border/10 flex flex-col items-center py-6 gap-4 z-40 shrink-0 shadow-sm">

                <button
                    onClick={() => handleNavigation('photos')}
                    className={cn("w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative", activeTab === 'photos' ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" : "text-muted-foreground hover:bg-zinc-100")}
                    title="Photos"
                >
                    <ImageIcon size={20} strokeWidth={2.5} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Photos</span>
                    {activeTab === 'photos' && <motion.div layoutId="active-indicator" className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full" />}
                </button>

                <button
                    onClick={() => handleNavigation('design')}
                    className={cn("w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative", activeTab === 'design' ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" : "text-muted-foreground hover:bg-zinc-100")}
                    title="Design"
                >
                    <Palette size={20} strokeWidth={2.5} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Design</span>
                    {activeTab === 'design' && <motion.div layoutId="active-indicator" className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full" />}
                </button>

                {/* 3. Analytics Icon "Analytics" */}
                <button
                    onClick={() => handleNavigation('analytics')}
                    className={cn("w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative", activeTab === 'analytics' ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30" : "text-muted-foreground hover:bg-zinc-100")}
                    title="Analytics"
                >
                    <BarChart2 size={20} strokeWidth={2.5} />
                    <span className="text-[8px] font-black uppercase tracking-wider">Analytics</span>
                    {activeTab === 'analytics' && <motion.div layoutId="active-indicator" className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-1 h-6 bg-primary-500 rounded-r-full" />}
                </button>

                {/* 4. Settings Icon "Settings" */}
                <button
                    onClick={() => handleNavigation('settings')}
                    className={cn("w-14 h-14 rounded-xl flex flex-col items-center justify-center gap-1 transition-all duration-300 group relative", activeTab === 'settings' ? "bg-zinc-800 text-white shadow-lg shadow-zinc-800/30" : "text-muted-foreground hover:bg-zinc-100")}
                    title="Settings"
                >
                    <Settings size={20} strokeWidth={2.5} />
                    <span className="text-[8px] font-black uppercase tracking-wider">settings</span>
                    {activeTab === 'settings' && <motion.div layoutId="active-indicator" className="absolute -left-[7px] top-1/2 -translate-y-1/2 w-1 h-6 bg-zinc-800 rounded-r-full" />}
                </button>
            </aside>

            <main className="flex-1 flex flex-col min-w-0 bg-white/20 relative">
                <Outlet />
            </main>
        </div>
    );
};

export default EventDetailsLayout;
