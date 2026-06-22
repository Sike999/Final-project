import { createPortal } from 'react-dom'
import { type ReactNode, useEffect, useRef, useState } from 'react';

export default function Portal({ children, onClose } : {children:ReactNode, onClose:() => void}) {
    const portalRootRef = useRef<HTMLDivElement  | null>(null);
    const [isMounted, setIsMounted] = useState<boolean>(false);
    useEffect(() => {

        const portalRoot = document.createElement('div')
        portalRoot.className = "portalRoot"
        document.body.appendChild(portalRoot);
        portalRootRef.current = portalRoot;

        setIsMounted(true);

        const handleKey = (e: KeyboardEvent) => {
            if(e.key == 'Escape') {
                onClose()
            }
        }
    document.addEventListener('keydown', handleKey);

    return () => {
        document.removeEventListener('keydown',handleKey)
        if (portalRootRef.current && portalRootRef.current.parentNode) {
            portalRootRef.current.parentNode.removeChild(portalRootRef.current);
        }
        portalRootRef.current = null;
    }
    },[onClose])
    if (!portalRootRef.current && !isMounted) {
        return null;
    }
    if (!portalRootRef.current) return null
    return createPortal(
        <>
            {children}
        </>,
        portalRootRef.current
    );
}