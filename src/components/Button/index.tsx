import { ReactNode, ButtonHTMLAttributes } from "react";
import style from './styles.module.scss';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode
}

export function Button({loading, children, ...rest}: ButtonProps) {
    return(
        <button className="btn btn-success" id={style.button}
        disabled={loading}
        {...rest}
        >
            <a>{children}</a>
        </button>
    )
}