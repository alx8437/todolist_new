import React, {FC} from 'react';

type ButtonPropsType = {
    title: string
    onClick?: () => void
    className?: string
}

export const Button: FC<ButtonPropsType> = ({ title, onClick, className }) => {
    return (
        <button onClick={onClick} className={className}>
            {title}
        </button>
    );
};
