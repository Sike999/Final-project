import { IoIosSearch } from "react-icons/io";
import { useState } from "react"
export default function SearchBar(){
    const [isSearching, setIsSearching] = useState<Boolean>(false)
    return (
        <div className="relative flex items-center w-[603px]">
            <input type="text" placeholder="Search" 
            className=" bg-[#00000043] font-roboto w-full h-[45px] pl-[50px] px-[20px] py-[10px] rounded-[44px] border-1 outline-none border-white text-white text-[18px] focus:ring-1"
            onFocus={() => {setIsSearching(true)}}/>
            <IoIosSearch className="absolute left-[18px] top-[8px]" color="white" size={28} />
        </div>
    )
}