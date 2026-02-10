import { motion } from 'framer-motion';
import { Camera } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Branding = () => {
    return (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col items-center justify-center min-h-[400px] border border-dashed border-border/50 rounded-3xl bg-muted/5 space-y-4">
            <div className="w-20 h-20 rounded-2xl bg-muted/50 flex items-center justify-center mb-2 shadow-inner">
                <Camera size={32} className="text-muted-foreground opacity-50" />
            </div>
            <h3 className="text-lg uppercase tracking-tight text-foreground">You don't have any brandings</h3>
            <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-70 max-w-xs text-center">Create a new brand identity for your studio to share with clients.</p>
            <Button className="mt-4 bg-primary-500 hover:bg-primary-600 text-foreground px-8 rounded-xl uppercase text-[10px] tracking-widest h-10 shadow-lg shadow-primary-500/20">
                Add Brand
            </Button>
        </motion.div>
    );
};

export default Branding;
