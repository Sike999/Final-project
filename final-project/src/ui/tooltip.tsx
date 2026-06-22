import { createPortal } from "react-dom";
import { useEffect, useRef, type RefObject } from 'react';
export default function Tooltip({ show, setShow, text, parentRef } : { show:boolean, text:string, setShow:React.Dispatch<React.SetStateAction<boolean>>, parentRef:RefObject}) {

    const timerRef = useRef<number | null>(null)
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
        <div className="bg-[#171717] w-[120px] h-[30px] border-1 border-[#3b3a3a] rounded-[40px] text-white flex items-center justify-center absolute bottom-12">
            <p>{text}</p>
        </div>,
        parentRef.current
    );
}