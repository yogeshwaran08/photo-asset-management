import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import type { FormikProps } from 'formik';

interface Template {
    id: string;
    name: string;
    description: string;
    image: string;
    category: 'Wedding' | 'Events' | 'Sports' | 'Custom';
}

const TEMPLATES: Template[] = [
    {
        id: 'tpl_1',
        name: 'Classic Elegance',
        description: 'Perfect for weddings and formal celebrations.',
        category: 'Wedding',
        image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'tpl_2',
        name: 'Nexus Corporate',
        description: 'Modern, clean grid for professional events.',
        category: 'Events',
        image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'tpl_3',
        name: 'Adrenaline Grid',
        description: 'High-energy layout for sports and action.',
        category: 'Sports',
        image: 'https://images.unsplash.com/photo-1517649763962-0c623066013b?auto=format&fit=crop&q=80&w=400'
    },
    {
        id: 'tpl_4',
        name: 'Blank Canvas',
        description: 'Build your own unique design from scratch.',
        category: 'Custom',
        image: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?auto=format&fit=crop&q=80&w=400'
    }
];

interface GalleryThemeSelectionProps {
    formik: FormikProps<any>;
}

export const GalleryThemeSelection = ({ formik }: GalleryThemeSelectionProps) => {
    const { values, setFieldValue } = formik;

    return (
        <div className="space-y-10">
            <div className="text-center space-y-2 mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Choose Gallery Theme</h3>
                <p className="text-muted-foreground">Select how your event photos will be presented.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                {TEMPLATES.map((tpl) => (
                    <div
                        key={tpl.id}
                        onClick={() => setFieldValue("template_id", tpl.id)}
                        className={cn(
                            "group relative cursor-pointer rounded-2xl overflow-hidden border transition-all duration-300",
                            values.template_id === tpl.id
                                ? "border-primary-500 ring-4 ring-primary-500/10 scale-[1.02] shadow-xl shadow-primary-500/10 bg-white"
                                : "border-gray-200 bg-white shadow-sm hover:shadow-md hover:border-gray-300"
                        )}
                    >
                        <div className="aspect-[16/10] relative overflow-hidden">
                            <img
                                src={tpl.image}
                                alt={tpl.name}
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className={cn(
                                "absolute inset-0 bg-black/40 transition-opacity duration-300",
                                values.template_id === tpl.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                            )} />
                            
                            <div className={cn(
                                "absolute inset-0 flex items-center justify-center transition-all duration-300 transform",
                                values.template_id === tpl.id ? "scale-100 opacity-100" : "scale-50 opacity-0"
                            )}>
                                <div className="bg-white text-primary-600 rounded-full p-3 shadow-lg">
                                    <Check className="w-6 h-6 stroke-[3px]" />
                                </div>
                            </div>

                            <div className="absolute top-4 left-4">
                                <Badge className="bg-white/90 backdrop-blur-md text-gray-900 border-0 font-bold text-[10px] tracking-wider uppercase px-2.5 py-1 shadow-sm">
                                    {tpl.category}
                                </Badge>
                            </div>
                        </div>
                        <div className="p-5">
                            <h4 className="font-bold text-gray-900 mb-1">{tpl.name}</h4>
                            <p className="text-xs text-muted-foreground font-medium leading-relaxed">{tpl.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};
