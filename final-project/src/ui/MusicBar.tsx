import { IoPlayOutline } from "react-icons/io5";
import { PiPause } from "react-icons/pi";
import { TbPlayerSkipForward } from "react-icons/tb";
import { TbPlayerSkipBack } from "react-icons/tb";
import { IoIosHeartEmpty } from "react-icons/io";
import { IoIosHeart } from "react-icons/io";
import { VscDebugRestart } from "react-icons/vsc";
import { TfiControlShuffle } from "react-icons/tfi";
import { GoShareAndroid } from "react-icons/go";
import { useTracksStore } from "../hooks/tracksContext";
export default function MusicBar ({ isPlaying, isLiked, coverUrl, title, artist, } : { isPlaying:boolean, isLiked:boolean, artist:string, coverUrl:string, title:string }) {

    return (
        <div className="items-center h-[75px] rounded-[70px] bg-[#00000063] fixed bottom-0 left-8 right-8 z-50 mb-[16px] px-[40px] flex justify-between">
            <div className="flex gap-[10px]">
                <TbPlayerSkipBack size={26} color="white" className="clickableSize30"/>
                {isPlaying ? <PiPause size={26} color="white" className="clickableSize30"/> : <IoPlayOutline size={26} color="white" className="clickableSize30"/>}
                <TbPlayerSkipForward size={26} color="white" className="clickableSize30"/>
            </div>
            <div className="flex gap-[10px]">
            <img src={import.meta.env.VITE_API_URL+coverUrl} className="w-[48px] h-[48px] border-1 border-[#92CC0D] rounded-[40px]"/>
            <div className="flex flex-col">
                <p className="font-medium text-white font-[League Spartan]">{title}</p>
                <p className="text-[#FFFFFF59] font-Roboto">{artist}</p>
            </div>
            </div>
            <div className="w-[1000px] h-1 bg-[#2A2A2A] cursor-pointer"> {/* ///////////// INPUT TYPE RANGE //////////////////// */}
                <div className="h-full w-1/3 bg-[#92CC0D] rounded-full"></div>
            </div>
            <div className="flex gap-[14px]">
                {isLiked ? < IoIosHeart size={26} color="#92CC0D" className="clickableSize30"/> : <IoIosHeartEmpty size={26} color="white" className="clickableSize30"/>}
                <VscDebugRestart size={26} color="white" className="clickableSize30"/>
                <TfiControlShuffle size={26} color="white" className="clickableSize30"/>
                <GoShareAndroid size={26} color="white" className="clickableSize30"/>
            </div>
        </div>
    )
}