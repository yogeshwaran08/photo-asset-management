import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Card } from '@/components/ui/card';
import { toast } from 'sonner';
import useUserStore from '@/store/userStore';
import {
    pageVariants,
    listItemVariants,
    staggerContainer,
    buttonVariants
} from '@/lib/motion-config';

export default function Login() {
    const navigate = useNavigate();
    const { login, loading } = useUserStore();
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        try {
            const res = await login({ email, password });
            if (res.type === 'success') {
                toast.success('Welcome back!');
                navigate('/studio/dashboard');
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <motion.div
            initial="initial"
            animate="animate"
            variants={pageVariants}
            className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-white"
        >
            {/* Background Decorative Elements */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-[10%] left-[5%] w-[40rem] h-[40rem] bg-primary-500/5 rounded-full blur-[120px]" />
                <div className="absolute bottom-[10%] right-[5%] w-[30rem] h-[30rem] bg-primary-500/10 rounded-full blur-[100px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-[0.03] bg-[radial-gradient(#93ea7d_1.5px,transparent_1px)] [background-size:40px_40px]" />
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
                                <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest mt-1.5 opacity-70">Asset Management</p>
                            </div>
                        </div>

                        <h2 className="text-6xl font-black text-foreground leading-[1.1] uppercase tracking-tight">
                            Elevate Your
                            <br />
                            <span className="text-primary-500">Visual DNA.</span>
                        </h2>

                        <p className="text-lg font-bold text-muted-foreground max-w-md uppercase tracking-tight opacity-80 leading-relaxed">
                            A high-fidelity platform for studios to organize, distribute, and monetize photography at scale.
                        </p>
                    </motion.div>
                </motion.div>

                <motion.div
                    variants={listItemVariants}
                    className="w-full max-w-[480px]"
                >
                    <Card className="rounded-[3rem] p-10 shadow-2xl border-border/50 glass relative overflow-hidden">
                        <div className="lg:hidden flex items-center justify-center gap-3 mb-10">
                            <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center text-foreground font-black overflow-hidden p-2">
                                <img src="/logo.png" alt="SnapVault Logo" className="w-full h-full object-contain" />
                            </div>
                            <h1 className="text-2xl font-black uppercase tracking-tighter">SnapVault</h1>
                        </div>

                        <div className="mb-10 text-center lg:text-left">
                            <h3 className="text-2xl font-black text-foreground uppercase tracking-tight mb-2">Sign in</h3>
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest opacity-60">Welcome back, enter your credentials.</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-8">
                            <div className="space-y-3">
                                <Label className="text-[10px] font-black uppercase tracking-widest ml-1 opacity-70">Email</Label>
                                <div className="relative group">
                                    <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary-500 transition-colors" />
                                    <Input
                                        type="email"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="h-14 pl-14 bg-muted/30 border-border/50 rounded-2xl font-bold transition-all focus-visible:ring-primary-500/20 focus-visible:border-primary-500 text-xs placeholder:text-muted-foreground/30 uppercase tracking-widest"
                                        placeholder="SYNC@LUMINARY.COM"
                                    />
                                </div>
                            </div>

                            <div className="space-y-3">
                                <div className="flex items-center justify-between px-1">
                                    <Label className="text-[10px] font-black uppercase tracking-widest opacity-70">Password</Label>
                                    <Link to="#" className="text-[10px] font-black uppercase text-primary-600 tracking-widest hover:text-primary-500 transition-colors">Forgot password?</Link>
                                </div>
                                <div className="relative group">
                                    <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground group-focus-within:text-primary-500 transition-colors" />
                                    <Input
                                        type={showPassword ? 'text' : 'password'}
                                        required
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="h-14 pl-14 pr-14 bg-muted/30 border-border/50 rounded-2xl font-bold transition-all focus-visible:ring-primary-500/20 focus-visible:border-primary-500 text-xs"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 px-1">
                                <Checkbox id="remember" className="rounded-lg border-neutral-400 data-[state=checked]:bg-primary-500 data-[state=checked]:border-none" />
                                <label htmlFor="remember" className="text-[10px] font-black uppercase text-muted-foreground tracking-widest cursor-pointer select-none">
                                    Remeber me
                                </label>
                            </div>

                            <motion.div variants={buttonVariants} whileHover="hover" whileTap="tap">
                                <Button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full h-14 rounded-2xl bg-foreground text-background hover:bg-foreground/90 font-black uppercase text-[10px] tracking-[0.2em] shadow-xl shadow-foreground/10 flex items-center justify-center gap-3"
                                >
                                    {loading ? (
                                        <div className="w-5 h-5 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                                    ) : (
                                        <>
                                            Sign in
                                            <ArrowRight size={18} strokeWidth={3} />
                                        </>
                                    )}
                                </Button>
                            </motion.div>
                        </form>

                        <div className="mt-10 pt-10 border-t border-border/50 text-center">
                            <p className="text-[10px] font-black uppercase text-muted-foreground tracking-widest">
                                NO ACCOUNT?{' '}
                                <Link
                                    to="/auth/signup"
                                    className="text-primary-600 hover:text-primary-500 transition-colors"
                                >
                                    Sign up
                                </Link>
                            </p>
                        </div>
                    </Card>

                    <div className="mt-8 text-center opacity-40">
                        <p className="text-[10px] font-black uppercase tracking-widest text-muted-foreground">
                            By signing you are accepting our{' '}
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
