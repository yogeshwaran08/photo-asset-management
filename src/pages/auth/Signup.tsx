import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Camera, Mail, Lock, Eye, EyeOff, User, Building2, ArrowRight, Check } from 'lucide-react';

export default function Signup() {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        studioName: '',
        password: '',
        confirmPassword: '',
        agreeToTerms: false,
    });
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        if (!formData.agreeToTerms) {
            alert('Please agree to the terms and conditions');
            return;
        }

        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            setIsLoading(false);
            navigate('/dashboard');
        }, 1500);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const passwordStrength = (password: string) => {
        let strength = 0;
        if (password.length >= 8) strength++;
        if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
        if (/\d/.test(password)) strength++;
        if (/[^a-zA-Z\d]/.test(password)) strength++;
        return strength;
    };

    const strength = passwordStrength(formData.password);
    const strengthColors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-green-500'];
    const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];

    return (
        <div className="min-h-screen w-full flex items-center justify-center relative overflow-hidden bg-slate-950">
            {/* Animated Background Gradients */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" style={{ animationDelay: '2s' }}></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-primary-500 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-float" style={{ animationDelay: '4s' }}></div>
            </div>

            {/* Grid Pattern Overlay */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.02)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.02)_1px,transparent_1px)] bg-size-[50px_50px]"></div>

            {/* Main Content */}
            <div className="relative z-10 w-full max-w-6xl mx-auto px-4 py-8 flex items-center justify-center gap-12">
                {/* Left Side - Branding */}
                <div className="hidden lg:flex flex-col items-start justify-center flex-1 space-y-8">
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="p-3 rounded-2xl premium-gradient shadow-lg shadow-primary-500/30">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold bg-linear-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                                    PhotoAsset
                                </h1>
                                <p className="text-sm text-slate-400">Management Platform</p>
                            </div>
                        </div>

                        <h2 className="text-5xl font-bold text-white leading-tight">
                            Start Your
                            <br />
                            <span className="bg-linear-to-r from-primary-400 via-accent-400 to-primary-500 bg-clip-text text-transparent">
                                Creative Journey
                            </span>
                        </h2>

                        <p className="text-lg text-slate-300 max-w-md">
                            Join thousands of photographers and studios managing their assets with our powerful platform.
                        </p>
                    </div>

                    {/* Benefits List */}
                    <div className="space-y-4">
                        {[
                            'Unlimited photo storage',
                            'AI-powered face recognition',
                            'Advanced search & filters',
                            'Team collaboration tools',
                            'Secure cloud backup',
                            'Mobile & desktop apps'
                        ].map((benefit, idx) => (
                            <div
                                key={idx}
                                className="flex items-center gap-3 text-slate-200"
                            >
                                <div className="p-1 rounded-full bg-primary-500/20">
                                    <Check className="w-4 h-4 text-primary-400" />
                                </div>
                                <span>{benefit}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Right Side - Signup Form */}
                <div className="w-full max-w-md">
                    <div className="glass rounded-3xl p-8 shadow-2xl border border-white/10 backdrop-blur-xl">
                        {/* Mobile Logo */}
                        <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
                            <div className="p-2 rounded-xl premium-gradient">
                                <Camera className="w-6 h-6 text-white" />
                            </div>
                            <h1 className="text-2xl font-bold bg-linear-to-r from-primary-400 to-accent-400 bg-clip-text text-transparent">
                                PhotoAsset
                            </h1>
                        </div>

                        <div className="mb-8">
                            <h3 className="text-2xl font-bold text-white mb-2">Create Account</h3>
                            <p className="text-slate-400">Get started with your free account</p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-5">
                            {/* Full Name Input */}
                            <div className="space-y-2">
                                <label htmlFor="fullName" className="block text-sm font-medium text-slate-300">
                                    Full Name
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        id="fullName"
                                        name="fullName"
                                        value={formData.fullName}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                        placeholder="John Doe"
                                    />
                                </div>
                            </div>

                            {/* Email Input */}
                            <div className="space-y-2">
                                <label htmlFor="email" className="block text-sm font-medium text-slate-300">
                                    Email Address
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                                    </div>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                        placeholder="you@example.com"
                                    />
                                </div>
                            </div>

                            {/* Studio Name Input */}
                            <div className="space-y-2">
                                <label htmlFor="studioName" className="block text-sm font-medium text-slate-300">
                                    Studio Name <span className="text-slate-500">(Optional)</span>
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Building2 className="w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                                    </div>
                                    <input
                                        type="text"
                                        id="studioName"
                                        name="studioName"
                                        value={formData.studioName}
                                        onChange={handleChange}
                                        className="w-full pl-12 pr-4 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                        placeholder="Your Studio Name"
                                    />
                                </div>
                            </div>

                            {/* Password Input */}
                            <div className="space-y-2">
                                <label htmlFor="password" className="block text-sm font-medium text-slate-300">
                                    Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                                    </div>
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {/* Password Strength Indicator */}
                                {formData.password && (
                                    <div className="space-y-1">
                                        <div className="flex gap-1">
                                            {[0, 1, 2, 3].map((idx) => (
                                                <div
                                                    key={idx}
                                                    className={`h-1 flex-1 rounded-full transition-all duration-300 ${idx < strength ? strengthColors[strength - 1] : 'bg-slate-700'
                                                        }`}
                                                ></div>
                                            ))}
                                        </div>
                                        {strength > 0 && (
                                            <p className="text-xs text-slate-400">
                                                Password strength: <span className={`font-medium ${strength >= 3 ? 'text-green-400' : strength >= 2 ? 'text-yellow-400' : 'text-orange-400'}`}>
                                                    {strengthLabels[strength - 1]}
                                                </span>
                                            </p>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* Confirm Password Input */}
                            <div className="space-y-2">
                                <label htmlFor="confirmPassword" className="block text-sm font-medium text-slate-300">
                                    Confirm Password
                                </label>
                                <div className="relative group">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Lock className="w-5 h-5 text-slate-500 group-focus-within:text-primary-400 transition-colors" />
                                    </div>
                                    <input
                                        type={showConfirmPassword ? 'text' : 'password'}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full pl-12 pr-12 py-3 bg-slate-900/50 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all duration-300"
                                        placeholder="••••••••"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-500 hover:text-slate-300 transition-colors"
                                    >
                                        {showConfirmPassword ? (
                                            <EyeOff className="w-5 h-5" />
                                        ) : (
                                            <Eye className="w-5 h-5" />
                                        )}
                                    </button>
                                </div>
                                {formData.confirmPassword && formData.password !== formData.confirmPassword && (
                                    <p className="text-xs text-red-400">Passwords do not match</p>
                                )}
                            </div>

                            {/* Terms & Conditions */}
                            <div className="flex items-start gap-2">
                                <input
                                    type="checkbox"
                                    id="agreeToTerms"
                                    name="agreeToTerms"
                                    checked={formData.agreeToTerms}
                                    onChange={handleChange}
                                    className="mt-1 w-4 h-4 rounded border-slate-700 bg-slate-900/50 text-primary-600 focus:ring-2 focus:ring-primary-500 focus:ring-offset-0 cursor-pointer"
                                />
                                <label htmlFor="agreeToTerms" className="text-sm text-slate-400 cursor-pointer">
                                    I agree to the{' '}
                                    <Link to="/terms" className="text-primary-400 hover:text-primary-300 transition-colors">
                                        Terms of Service
                                    </Link>{' '}
                                    and{' '}
                                    <Link to="/privacy" className="text-primary-400 hover:text-primary-300 transition-colors">
                                        Privacy Policy
                                    </Link>
                                </label>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full py-3 px-4 premium-gradient rounded-xl text-white font-semibold shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
                            >
                                {isLoading ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Creating account...
                                    </>
                                ) : (
                                    <>
                                        Create Account
                                        <ArrowRight className="w-5 h-5" />
                                    </>
                                )}
                            </button>

                            {/* Divider */}
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-4 bg-slate-900/50 text-slate-400">Or sign up with</span>
                                </div>
                            </div>

                            {/* Social Signup Buttons */}
                            <div className="grid grid-cols-2 gap-3">
                                <button
                                    type="button"
                                    className="py-3 px-4 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-300 font-medium hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                                        <path
                                            fill="currentColor"
                                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                                        />
                                        <path
                                            fill="currentColor"
                                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                                        />
                                    </svg>
                                    Google
                                </button>
                                <button
                                    type="button"
                                    className="py-3 px-4 bg-slate-900/50 border border-slate-700 rounded-xl text-slate-300 font-medium hover:bg-slate-800/50 hover:border-slate-600 transition-all duration-300 flex items-center justify-center gap-2"
                                >
                                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                                    </svg>
                                    GitHub
                                </button>
                            </div>
                        </form>

                        {/* Sign In Link */}
                        <div className="mt-8 text-center">
                            <p className="text-slate-400">
                                Already have an account?{' '}
                                <Link
                                    to="/auth/login"
                                    className="text-primary-400 hover:text-primary-300 font-semibold transition-colors"
                                >
                                    Sign in
                                </Link>
                            </p>
                        </div>
                    </div>

                    {/* Trust Indicators */}
                    <div className="mt-6 text-center text-sm text-slate-500">
                        <p>🔒 Your data is protected with enterprise-grade security</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
