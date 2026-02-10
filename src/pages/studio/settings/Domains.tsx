import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Domains = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border-border/50 glass shadow-sm flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="text-sm uppercase tracking-widest text-primary-500">Connect Domain</CardTitle>
                        <CardDescription className="text-[10px] uppercase opacity-60 mt-1">
                            Connect your own domain and display galleries under your branding. eg your.company.com
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full uppercase text-[10px] tracking-widest">Connect</Button>
                    </CardContent>
                </Card>
                <Card className="border-border/50 glass shadow-sm flex flex-col justify-between">
                    <CardHeader>
                        <CardTitle className="text-sm uppercase tracking-widest text-primary-500">Connect Sub-Domain</CardTitle>
                        <CardDescription className="text-[10px] uppercase opacity-60 mt-1">
                            Connect subdomain to show your brand name first. eg company.fotoowl.ai
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button variant="outline" className="w-full uppercase text-[10px] tracking-widest">Connect</Button>
                    </CardContent>
                </Card>
            </div>

            <Card className="border-border/50 glass shadow-sm">
                <CardHeader>
                    <CardTitle className="text-sm uppercase tracking-widest text-primary-500">Foto Owl Domains</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="rounded-xl border border-border/50 bg-muted/20 overflow-hidden">
                        <div className="grid grid-cols-12 gap-4 p-4 border-b border-border/50 bg-muted/30">
                            <div className="col-span-8 text-[10px] uppercase tracking-widest opacity-70">Domain Name</div>
                            <div className="col-span-4 text-[10px] uppercase tracking-widest opacity-70">Status</div>
                        </div>
                        <div className="grid grid-cols-12 gap-4 p-4 items-center">
                            <div className="col-span-8 text-xs truncate">site.fotoowl.ai/dhanishprimary</div>
                            <div className="col-span-4">
                                <Badge className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20 hover:bg-emerald-500/20 uppercase text-[9px] tracking-widest">
                                    Active
                                </Badge>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default Domains;
