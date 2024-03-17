import { ReactNode, HTMLAttributes } from "react";
import style from './styles.module.scss';

interface tituloProps extends HTMLAttributes<HTMLElement> {
    children: ReactNode
}

export function Titulo({ children}: tituloProps) {
    return(
        <h2 className={style.titulo}>
            <span>{children}</span>
        </h2>
    )
}