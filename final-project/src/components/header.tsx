import SearchBar from "../ui/bars/Search"
import ActionButton from "../ui/buttons/Action"
import FavouritesButton from "../ui/buttons/Favourites"
import ProfileButton from "../ui/buttons/Profile"
import { TfiControlShuffle } from "react-icons/tfi";
import { useState } from "react";
import Portal from "./Portal";
import RegisterModal from "./RegisterModal"
export default function Header() {
    const [showModal, setShowModal] = useState<boolean>(false)
    return (
        <header className="fixed top-0 left-0 right-0 z-50 mt-[16px] px-[40px] grid grid-cols-3 items-center">
                <p className="heading-primary text-left">WAVY</p>

                <div className="flex justify-center">
                    <SearchBar />
                </div>
                
                <div className="flex justify-end gap-[20px]">
                    <ActionButton onClick={() => {}} tailwindStyles="buttonMenu px-[20px] rounded-[44px] w-[192px] h-[45px] hover:cursor-pointer hover:bg-white/10">
                        <p>
                            Join listening
                        </p>
                        <TfiControlShuffle size={26}/>
                    </ActionButton>
                    <FavouritesButton />
                    <ProfileButton onClick={() => {setShowModal(true)}}/>
                </div>
                {showModal &&
                    (<Portal onClose={() => {setShowModal(false)}}>
                        <RegisterModal onClose={() => {setShowModal(false)}}/>
                    </Portal>)
                }
        </header>
    )
}