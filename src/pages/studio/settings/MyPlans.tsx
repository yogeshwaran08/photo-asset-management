import { motion } from 'framer-motion';

const MyPlans = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="flex flex-col items-center justify-center min-h-[400px] border border-dashed border-border/50 rounded-3xl bg-muted/5 space-y-4">
                <h3 className="text-lg uppercase tracking-tight text-foreground">My Plans</h3>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-70 max-w-xs text-center">Your subscription plans will appear here.</p>
            </div>
        </motion.div>
    );
};

export default MyPlans;
