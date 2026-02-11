import type { ReactNode } from 'react';

interface EventHeaderProps {
    children?: ReactNode;
    actions?: ReactNode;
}

export const EventHeader = ({ children, actions }: EventHeaderProps) => {
    return (
        <header className="h-16 border-b border-border/40 flex items-center justify-between px-2 bg-white/40 backdrop-blur-md sticky top-0 z-30 gap-6">
            <div className="flex items-center gap-6 flex-1">
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
