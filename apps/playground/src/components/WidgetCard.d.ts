import type { ReactNode } from 'react';
interface WidgetCardProps {
    eyebrow: string;
    title: string;
    description?: string;
    action?: ReactNode;
    className?: string;
    children: ReactNode;
}
export declare function WidgetCard({ eyebrow, title, description, action, className, children, }: WidgetCardProps): React.ReactElement;
export {};
//# sourceMappingURL=WidgetCard.d.ts.map