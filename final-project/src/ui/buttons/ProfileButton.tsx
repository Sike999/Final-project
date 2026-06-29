import ContextMenu from "../ContextMenu";
import { useState, useRef, } from "react";
import { CiLogout } from "react-icons/ci";
import { useUserStore } from "../../hooks/userContext";
import { useNavigate } from 'react-router-dom';
import { useCallback } from "react";
import { useAuth } from "../../hooks/useAuth";
import { BiUser } from "react-icons/bi";
export default function ProfileButton({  }:{  }) {
    const [showContext, setShowContext] = useState(false)
    const parentRef = useRef(null)
    const user = useUserStore((state) => state.user)
    const navigate = useNavigate()
    const { logout } = useAuth()
    const handleAuth = useCallback((action : 'login' | 'register') => {
        setShowContext(false)
        navigate(`${action}`)
    },[])
    const handleLogout = useCallback(() => {
        setShowContext(false)
        logout()
        navigate('/')
    },[])
    const handleProfile = useCallback(() => {
        setShowContext(false)
        navigate('/profile')
    },[])
    return (
        <>
        <div ref={parentRef} onClick={() => {
            setShowContext(prev => !prev)
        }}>
            {(!user?.avatarUrl || user?.avatarUrl === '') ? (
                <div className="hover:bg-white/10 hover:cursor-pointer rounded-[200px] border-1 w-[45px] h-[45px] border-white p-[13px] flex items-center bg-[#00000066]">
                    <BiUser color="white" size={22}/>
                </div>
            ) : (
                <img src={user?.avatarUrl} className="hover:bg-white/10 hover:cursor-pointer w-[45px] h-[45px] rounded-[90px] border-1 border-white"/>
            )}
        </div>
        {showContext &&  (
            !user ? (
            <ContextMenu show={showContext} setShow={setShowContext} tailwindStyles="bg-[#171717] w-[225px] h-[89px] border-1 px-[10px] py-[8px] border-[#FFFFFF] rounded-[5px] text-white flex flex-col items-center justify-center absolute top-[62px] right-10" parentRef={parentRef}>
                <button onClick={() => {handleAuth('login')}} className="contextMenu border-b p-[10px] border-[#FFFFFF]/12 w-[211px] h-[35px] hover:bg-white/10 hover:cursor-pointer">
                    <p>Sign in</p>
                </button>
                <button onClick={() => {handleAuth('register')}} className="contextMenu w-[211px] h-[35px] hover:bg-white/10 hover:cursor-pointer">
                    <p>Register</p>
                </button>
            </ContextMenu>
            ) : (
            <ContextMenu show={showContext} setShow={setShowContext} tailwindStyles="bg-[#171717] w-[225px] h-[129px] border-1 px-[10px] py-[10px] border-[#FFFFFF] rounded-[5px] text-white flex flex-col items-center justify-center absolute top-[62px] right-10" parentRef={parentRef}>
                <div className="contextMenu w-[211px] h-[40px] border-b border-[#FFFFFF]/12 px-[10px] py-[12px]">
                    <p className="font-[League Spartan] font-bold text-[#91CB0D]">{user.name}</p>
                </div>
                <button onClick={() => {handleProfile()}} className="contextMenu border-b px-[10px] py-[12px] border-[#FFFFFF]/12 w-[211px] h-[40px] hover:bg-white/10 hover:cursor-pointer">
                    <p>Profile</p>
                </button>
                <button onClick={() => {handleLogout()}} className="contextMenu w-[211px] h-[40px] p-[10px] hover:bg-white/10 hover:cursor-pointer">
                    <div className="flex justift-center items-center">
                        <p className="mr-[6px]">Log out</p>
                        <CiLogout color="white" size={20}/>
                    </div>
                </button>
            </ContextMenu>
            )
            )}
        </>
    )
}