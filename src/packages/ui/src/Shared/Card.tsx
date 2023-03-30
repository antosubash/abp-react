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
                'bg-white rounded-lg p-5 shadow-lg',
                className
            )}
        >
            {children}
        </section>
    );
};
