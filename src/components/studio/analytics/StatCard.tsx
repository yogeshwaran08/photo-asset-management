import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { listItemVariants } from '@/lib/motion-config';

interface StatCardProps {
    title: string;
    value: string;
    icon: any;
    trend: 'up' | 'down';
    trendValue: string | number;
    colorClass: string;
    delay?: number;
}

const StatCard = ({ title, value, icon: Icon, trend, trendValue, colorClass, delay }: StatCardProps) => (
    <motion.div
        variants={listItemVariants}
        className="group"
    >
        <Card className="border-zinc-200 shadow-[0_2px_8px_-2px_rgba(0,0,0,0.04)] bg-white/80 backdrop-blur-sm overflow-hidden relative rounded-xl hover:border-zinc-300 transition-all">
            <CardContent className="p-5">
                <div className="flex items-center justify-between mb-4">
                    <div className={cn("w-10 h-10 rounded-lg flex items-center justify-center transition-transform group-hover:scale-105", colorClass)}>
                        <Icon size={20} />
                    </div>
                </div>
                <div>
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-widest leading-none mb-2 opacity-70">{title}</p>
                    <div className="flex items-end gap-3">
                        <p className="text-2xl font-black tracking-tight text-slate-800">{value}</p>
                        <div className={cn(
                            "flex items-center text-[9px] font-black px-1.5 py-0.5 rounded-md mb-1 uppercase tracking-wider",
                            trend === 'up' ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-600"
                        )}>
                            {trend === 'up' ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            {trendValue}%
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    </motion.div>
);

export default StatCard;
