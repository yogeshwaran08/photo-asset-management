import { motion } from 'framer-motion';
import { CreditCard } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const Invoices = () => {
    return (
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <Card className="border-border/50 glass shadow-sm">
                <CardHeader>
                    <CardTitle className="text-sm uppercase tracking-widest text-primary-500">Invoices</CardTitle>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="all" className="w-full">
                        <TabsList className="mb-8">
                            <TabsTrigger value="all" className="uppercase text-[10px] tracking-widest">All</TabsTrigger>
                            <TabsTrigger value="subscription" className="uppercase text-[10px] tracking-widest">Subscription</TabsTrigger>
                        </TabsList>
                        <TabsContent value="all" className="flex flex-col items-center justify-center py-20 border border-dashed border-border/50 rounded-2xl bg-muted/5">
                            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4 shadow-inner">
                                <CreditCard size={24} className="text-muted-foreground opacity-50" />
                            </div>
                            <h3 className="text-lg uppercase tracking-tight text-foreground">No invoices found</h3>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-70 mt-1">You don't have any invoices yet.</p>
                        </TabsContent>
                        <TabsContent value="subscription" className="flex flex-col items-center justify-center py-20 border border-dashed border-border/50 rounded-2xl bg-muted/5">
                            <div className="w-16 h-16 rounded-2xl bg-muted/50 flex items-center justify-center mb-4 shadow-inner">
                                <CreditCard size={24} className="text-muted-foreground opacity-50" />
                            </div>
                            <h3 className="text-lg uppercase tracking-tight text-foreground">No invoices found</h3>
                            <p className="text-[10px] text-muted-foreground uppercase tracking-widest opacity-70 mt-1">You don't have any invoices yet.</p>
                        </TabsContent>
                    </Tabs>
                </CardContent>
            </Card>
        </motion.div>
    );
};

export default Invoices;
