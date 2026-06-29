import type { ReactNode } from "react";

export default function ActionButton({ tailwindStyles, children, onClick } : { tailwindStyles:string, children:ReactNode, onClick:React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <button className={tailwindStyles} onClick={onClick}>
            {children}
        </button>
    )
}