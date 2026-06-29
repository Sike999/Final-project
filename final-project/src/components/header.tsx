import SearchBar from "../ui/bars/Search"
import ActionButton from "../ui/buttons/Action"
import { Link } from 'react-router-dom';
import ProfileButton from "../ui/buttons/ProfileButton"
import { TfiControlShuffle } from "react-icons/tfi";
import { IoIosHeartEmpty } from "react-icons/io";
export default function Header() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 mt-[16px] px-[40px] grid grid-cols-3 items-center">
            <Link to={'/'}>
                <p className="heading-primary text-left">WAVY</p>
            </Link>
                <div className="flex justify-center">
                    <SearchBar />
                </div>
                
                <div className="flex justify-end gap-[20px] items-center">
                    <ActionButton onClick={() => {}} tailwindStyles="buttonMenu px-[20px] rounded-[50px] w-[192px] h-[45px] hover:cursor-pointer hover:bg-white/10">
                        <p>
                            Join listening
                        </p>
                        <TfiControlShuffle size={22}/>
                    </ActionButton>
                    <ActionButton onClick={()=>{}} tailwindStyles="buttonMenu rounded-[44px] hover:cursor-pointer hover:bg-white/10 h-[45px] w-[45px]">
                        <IoIosHeartEmpty size={22} color="white"/>
                    </ActionButton>
                    <ProfileButton />
                </div>
                
        </header>
    )
}