import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Building2, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
    pageVariants,
    listItemVariants,
    staggerContainer
} from '@/lib/motion-config';

export default function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setTimeout(() => {
            setIsLoading(false);
            navigate('/studio/dashboard');
        }, 1200);
    };

    const passwordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        return strength;
    };

    const strength = passwordStrength(password);
    const strengthColors = ['bg-error/30', 'bg-warning/50', 'bg-info/50', 'bg-success'];
    const strengthLabels = ['Minimal', 'Fair', 'Standard', 'Secure'];

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white"
        >
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] right-[5%] w-[45rem] h-[45rem] bg-primary-500/5 rounded-full blur-[130px]" />
                <div className="absolute bottom-[5%] left-[5%] w-[35rem] h-[35rem] bg-primary-500/10 rounded-full blur-[110px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] bg-[radial-gradient(#93ea7d_1.5px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-12 flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-24">
                {/* Left Side - Branding Content */}
                <motion.div
                    variants={staggerContainer}
                    className="hidden lg:flex flex-col items-start justify-center flex-1 space-y-10"
                >
                    <motion.div variants={listItemVariants} className="space-y-6">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="w-16 h-16 rounded-[1.5rem] bg-white flex items-center justify-center text-foreground shadow-xl shadow-primary-500/20 overflow-hidden p-2.5">
                                <img src="/logo.png" alt="SnapVault Logo" className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-black uppercase tracking-tighter text-foreground leading-none">
                                    SnapVault
                                </h1>
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-1.5 opacity-70">Creative Cloud</p>
                            </div>
                        </div>

                        <h2 className="text-6xl font-black text-foreground leading-[1.1] uppercase tracking-tight">
                            Start Your
                            <br />
                            <span className="text-primary-500 text-transparent bg-clip-text bg-linear-to-r from-primary-500 to-info">New Era.</span>
                        </h2>

                        <p className="text-lg font-bold text-muted-foreground max-w-md uppercase tracking-tight opacity-80 leading-relaxed">
                            Join the world's most advanced photography management ecosystem. Secure, intelligent, and designed for scale.
                        </p>
                    </motion.div>

                    <motion.div variants={staggerContainer} className="space-y-4">
                        {[
                            'O-SYNC REAL-TIME DISTRIBUTION',
                            'AI-DRIVEN THERMAL CLASSIFICATION',
                            'UNLIMITED CROSS-NETWORK STORAGE',
                            'MULTI-NODE COLLABORATION CORE'
                        ].map((benefit, idx) => (
                            <motion.div
                                key={idx}
                                variants={listItemVariants}
                                className="flex items-center gap-4 text-foreground/80"
                            >
                                <div className="w-6 h-6 rounded-lg bg-primary-500/10 flex items-center justify-center border border-primary-500/20">
                                    <Check className="w-3.5 h-3.5 text-primary-500" strokeWidth={4} />
                                </div>
                                <span className="text-[10px] font-black uppercase tracking-widest">{benefit}</span>
                            </motion.div>
                        ))}
                    </motion.div>
                </motion.div>

                {/* Right Side - Signup Form */}
                <motion.div
                    variants={listItemVariants}
                    className="w-full max-w-[500px]"
                >
                    <Card className="rounded-[3rem] p-10 shadow-2xl border-border/50 glass relative overflow-hidden">
                        {/* Mobile Brand */}
                        <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-foreground font-black overflow-hidden p-2">
                                <img src="/logo.png" alt="SnapVault Logo" className="w-full h-full object-contain" />
                            </div>
                            <h1 className="text-2xl font-black uppercase tracking-tighter">SnapVault</h1>
                        </div>

                        <div className="mb-10 text-center lg:text-left">
                            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-2">Create Node</h3>
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest opacity-60">Initialize your studio on the network</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Identity</Label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                                        <Input className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl font-bold transition-all focus-visible:ring-primary-500/20 focus-visible:border-primary-500 text-xs uppercase" placeholder="FULL NAME" />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Studio</Label>
                                    <div className="relative group">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                                        <Input className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl font-bold transition-all focus-visible:ring-primary-500/20 focus-visible:border-primary-500 text-xs uppercase" placeholder="STUDIO NAME" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Communication / Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                                    <Input type="email" className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl font-bold transition-all focus-visible:ring-primary-500/20 focus-visible:border-primary-500 text-xs uppercase" placeholder="EMAIL@DOMAIN.COM" />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Security Sequence</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl font-bold transition-all focus-visible:ring-primary-500/20 focus-visible:border-primary-500 text-xs"
                                        placeholder="••••••••"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground">
                                        {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                                {password && (
                                    <div className="px-1 pt-2">
                                        <div className="flex gap-1.5 h-1">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div key={i} className={cn("flex-1 rounded-full transition-all duration-500", i <= strength ? strengthColors[strength - 1] : "bg-muted")} />
                                            ))}
                                        </div>
                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-2">ENTROPY RATING: <span className="text-foreground">{strengthLabels[strength - 1]}</span></p>
                                    </div>
                                )}
                            </div>

                            <div className="flex items-start gap-3 px-1">
                                <Checkbox id="terms" className="mt-0.5 rounded-lg border-border/50 data-[state=checked]:bg-primary-500 data-[state=checked]:border-none" />
                                <Label htmlFor="terms" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest leading-relaxed cursor-pointer">
                                    I ACCEPT THE <Link to="#" className="text-primary-600">DISTRIBUTION PROTOCOLS</Link> AND <Link to="#" className="text-primary-600">PRIVACY FRAMEWORK</Link>
                                </Label>
                            </div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    type="submit"
                                    disabled={isLoading}
                                    className="w-full h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-foreground/10 mt-4"
                                >
                                    {isLoading ? "INITIALIZING..." : "GENERATE ACCOUNT"}
                                </Button>
                            </motion.div>
                        </form>

                        <div className="mt-10 pt-10 border-t border-border/50 text-center">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                                ALREADY SYNCHRONIZED?{' '}
                                <Link to="/auth/login" className="text-primary-600 hover:text-primary-500 transition-colors">ESTABLISH CONNECTION</Link>
                            </p>
                        </div>
                    </Card>
                </motion.div>
            </div>
        </motion.div>
    );
}
