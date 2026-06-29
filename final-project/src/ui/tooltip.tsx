import { createPortal } from "react-dom";
import { useEffect, useRef, type ReactElement } from 'react';
export default function Tooltip({ show, setShow, parentRef, tailwindStyles, children } : { children:ReactElement, tailwindStyles:string, show:boolean, setShow:React.Dispatch<React.SetStateAction<boolean>>, parentRef:React.RefObject<HTMLElement>}) {

    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
    useEffect(() => {
        if (show === false) return
        if(timerRef.current) clearTimeout(timerRef.current)

        timerRef.current = setTimeout( async () => {
            setShow(false)
        }, 2000)

    return () => {
        if (timerRef.current) clearTimeout(timerRef.current)
    }
    },[show])
    if (!show) {
        return null;
    }
    return createPortal(
        <div className={tailwindStyles}>
            {children}
        </div>,
        parentRef.current
    );
}