import { createPortal } from "react-dom";
import { useCallback, useEffect, type ReactElement } from 'react';



export default function ContextMenu({ show, setShow, parentRef, tailwindStyles, children } : { children:ReactElement[], tailwindStyles:string, show:boolean, setShow:React.Dispatch<React.SetStateAction<boolean>>, parentRef:React.RefObject<HTMLElement>}) {

    if (!show) {
        return null
    }

    const handleClickOutside = useCallback((e:MouseEvent) => {
        if (parentRef.current && !parentRef.current.contains(e.target as Node)) {
            setShow(false)
        }
    },[])

    useEffect(() => {
        document.addEventListener('mousedown',handleClickOutside)

        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    },[show])

    return createPortal(
        <div className={tailwindStyles}>
            {children}
        </div>,
        parentRef.current
    );
}