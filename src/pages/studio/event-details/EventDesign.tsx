import { Palette } from 'lucide-react';
import { EventHeader } from './EventHeader';

const EventDesign = () => {
    return (
        <div className="flex flex-col h-full w-full">
            <EventHeader>
                <div className="space-y-1">
                    <h2 className="text-xl font-black text-zinc-800 tracking-tight">Design Studio</h2>
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-wider">Customize gallery appearance</p>
                </div>
            </EventHeader>

            <div className="flex-1 w-full flex flex-col items-center justify-center opacity-40 pb-20">
                <div className="w-24 h-24 rounded-3xl bg-white border border-border/10 flex items-center justify-center mb-6 shadow-sm">
                    <Palette size={32} className="text-primary-500" />
                </div>
                <p className="text-[10px] font-black uppercase tracking-[0.4em]">Active Module: Design</p>
                <p className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest mt-2">Coming Soon</p>
            </div>
        </div>
    );
};

export default EventDesign;
