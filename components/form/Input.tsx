import React from 'react';
import input from './form.module.scss';

interface InputProps {
    id: string;
    onChange: any;
    value: string;
    label: string;
    type?: string;
}

const Input: React.FC<InputProps> = ({
    id,
    onChange,
    value,
    label,
    type
}) => {
    return (
        <div className={ input.inputWrapper }>
            <input
                onChange={ onChange }
                type={ type }
                value={ value }
                id={ id }
                className={ input.authInput }
                placeholder=''
            />

            <label htmlFor={ id } className={ input.authLabel }>
                { label }
            </label>
        </div>
    )
}

export default Input;