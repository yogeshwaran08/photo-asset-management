import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, User, Building2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import useUserStore from '@/store/userStore';
import {
    pageVariants,
    listItemVariants,
    staggerContainer
} from '@/lib/motion-config';

export default function Signup() {
    const navigate = useNavigate();
    const { register, loading } = useUserStore();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    
    // Form State
    const [fullName, setFullName] = useState('');
    const [studioName, setStudioName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (password !== confirmPassword) {
            toast.error("Passwords don't match");
            return;
        }

        try {
            const res = await register({ 
                email, 
                password, 
                full_name: fullName, 
                studio_name: studioName 
            });
            
            if (res.type === 'success') {
                toast.success('Account created successfully!');
                navigate('/studio/dashboard');
            }
        } catch (error) {
            console.error(error);
        }
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
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[5%] right-[5%] w-[45rem] h-[45rem] bg-primary-500/5 rounded-full blur-[130px]" />
                <div className="absolute bottom-[5%] left-[5%] w-[35rem] h-[35rem] bg-primary-500/10 rounded-full blur-[110px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.02] bg-[radial-gradient(#93ea7d_1.5px,transparent_1px)] [background-size:40px_40px]" />
            </div>

            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-6 lg:px-6 lg:py-12 flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-24">
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
                </motion.div>

                <motion.div
                    variants={listItemVariants}
                    className="w-full max-w-[500px]"
                >
                    <Card className="rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-10 shadow-2xl border-border/50 glass relative overflow-hidden">
                        <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-foreground font-black overflow-hidden p-2">
                                <img src="/logo.png" alt="SnapVault Logo" className="w-full h-full object-contain" />
                            </div>
                            <h1 className="text-2xl font-black uppercase tracking-tighter">SnapVault</h1>
                        </div>
``
                        <div className="mb-10 text-center lg:text-left">
                            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-2">Create Account</h3>
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest opacity-60">Welcome, Create an account to get started</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Full Name</Label>
                                    <div className="relative group">
                                        <User className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                                        <Input 
                                            required
                                            value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl font-bold transition-all focus-visible:ring-primary-500/20 focus-visible:border-primary-500 text-xs" 
                                            placeholder="John Doe" 
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Studio</Label>
                                    <div className="relative group">
                                        <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                                        <Input 
                                            value={studioName}
                                            onChange={(e) => setStudioName(e.target.value)}
                                            className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl font-bold transition-all focus-visible:ring-primary-500/20 focus-visible:border-primary-500 text-xs" 
                                            placeholder="Studio Name" 
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                                    <Input 
                                        type="email" 
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl font-bold transition-all focus-visible:ring-primary-500/20 focus-visible:border-primary-500 text-xs" 
                                        placeholder="email@domain.com" 
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl font-bold transition-all focus-visible:ring-primary-500/20 focus-visible:border-primary-500 text-xs"
                                        placeholder="••••••••"
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" tabIndex={-1}>
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
                                        <p className="text-[9px] font-black uppercase tracking-widest text-muted-foreground mt-2">PASSWORD STRENGTH: <span className="text-foreground">{strengthLabels[strength - 1]}</span></p>
                                    </div>
                                )}
                            </div>

                            <div className="space-y-2">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Confirm Password</Label>
                                <div className="relative group">
                                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground opacity-50" />
                                    <Input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        required
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="h-12 pl-12 bg-muted/30 border-border/50 rounded-xl font-bold transition-all focus-visible:ring-primary-500/20 focus-visible:border-primary-500 text-xs"
                                        placeholder="••••••••"
                                    />
                                    <button type="button" onClick={() => setShowConfirmPassword(!showConfirmPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground" tabIndex={-1}>
                                        {showConfirmPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                    </button>
                                </div>
                            </div>

                            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-foreground/10 mt-4"
                                >
                                    {loading ? "INITIALIZING..." : "Sign up"}
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

                    <div className="mt-8 text-center opacity-40">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            By signing up you are accepting our{' '}
                            <Link to="#" className="underline hover:text-foreground transition-colors">Terms and Conditions</Link>
                            ,{' '}
                            <Link to="#" className="underline hover:text-foreground transition-colors">Privacy Policy</Link>
                        </p>
                    </div>
                </motion.div>
            </div>
        </motion.div>
    );
}
