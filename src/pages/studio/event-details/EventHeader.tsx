import { ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import type { ReactNode } from 'react';

interface EventHeaderProps {
    children?: ReactNode;
    actions?: ReactNode;
    backUrl?: string;
}

export const EventHeader = ({ children, actions, backUrl = '/studio/events' }: EventHeaderProps) => {
    const navigate = useNavigate();
    return (
        <header className="h-24 border-b border-border/40 flex items-center justify-between px-12 bg-white/40 backdrop-blur-md sticky top-0 z-30 gap-6">
            <div className="flex items-center gap-6 flex-1">
                <Button variant="ghost" size="icon" onClick={() => navigate(backUrl)} className="h-10 w-10 rounded-xl -ml-2 text-muted-foreground hover:text-foreground shrink-0">
                    <ArrowLeft size={20} />
                </Button>
                <div className="h-8 w-px bg-border/40 mx-2 shrink-0" />
                {children}
            </div>
            {actions && (
                <div className="flex items-center gap-4 shrink-0">
                    {actions}
                </div>
            )}
        </header>
    );
};
