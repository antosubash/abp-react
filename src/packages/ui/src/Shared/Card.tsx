import classNames from 'classnames';
import { ReactNode } from 'react';

type CardProps = {
    children: ReactNode;
    className?: string;
};
export const Card = ({ children, className }: CardProps) => {
    return (
        <section
            className={classNames(
                'bg-neutral rounded-lg p-5 shadow-lg text-neutral-100',
                className
            )}
        >
            {children}
        </section>
    );
};
