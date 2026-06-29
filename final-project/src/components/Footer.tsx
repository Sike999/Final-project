import { LiaTelegram } from "react-icons/lia";
import { FaGithub } from "react-icons/fa";
import { useState } from "react";
import Tooltip from "../ui/tooltip";
import { useRef, useCallback } from "react";
import ActionButton from "../ui/buttons/Action";
export default function Footer() {
    const [show,setShow] = useState(false)
    const parentRef = useRef(null)
    const onClick = useCallback(
        async () => {
            await navigator.clipboard.writeText('mpasicnik625@gmail.com');
            await setShow(true)
        },[])
    return(
        <footer className="w-full h-[800px] bg-black relative" >

            <img src="/arts/vynyl.png" className="absolute left-[30%] z-10" draggable="false"/>
            <img src="/arts/logoMirrored.png" className="absolute left-[15.1%] top-[33.5%] z-11" draggable="false"/>

            <div className="relative z-20 flex flex-col text-white h-full">

                <p className="pt-[210px] pl-[20px]">CONTACTS</p>

                <div className="flex items-center mt-[360px] justify-between">

                    <div className="flex-col flex ml-[20px]">
                        <p className="text-left">© 2026</p>
                        <p className="text-left">MAXIM</p>
                        <p className="text-left">ALL RIGHTS RESERVED</p>
                    </div>

                    <div className="flex flex-col items-center gap-[20px]">
                        <p className=" mb-[25px] mr-[68px]">[ MPASICNIK625@GMAIL.COM ]</p>
                        <ActionButton tailwindStyles="buttonMenu mr-[70px] rounded-[44px] w-[192px] h-[45px] hover:bg-white/10 hover:cursor-pointer"
                         onClick={onClick}>
                            <p className="relative" ref={parentRef}>[ COPY EMAIL ]</p>
                        </ActionButton>
                    </div>

                    <div className="flex mr-[20px]  gap-[12px]">
                        <LiaTelegram size={34}/>
                        <a href="https://github.com/Sike999/Final-project" className="hover:cursor-pointer"><FaGithub size={34}/></a>
                    </div>

                </div>
            </div>
            {show && (
                <Tooltip tailwindStyles="bg-[#171717] w-[120px] h-[30px] border-1 border-[#3b3a3a] rounded-[40px] text-white flex items-center justify-center absolute bottom-12" parentRef={parentRef} show={show} setShow={setShow}>
                    <p>Copied!</p>
                </Tooltip>
            )}
        </footer>
    )
}