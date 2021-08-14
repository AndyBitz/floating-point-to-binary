import { HTMLAttributes } from 'react';
import cn from 'classnames';
import style from './container.module.css';

export function Container({ children, className, ...props }: HTMLAttributes<HTMLDivElement>) {
	return (
		<div {...props} className={cn(style.container, className)}>
			{children}
		</div>
	);
}
