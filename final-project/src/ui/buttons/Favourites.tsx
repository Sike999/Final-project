import { IoIosHeartEmpty } from "react-icons/io";
export default function FavouritesButton() {
    return (
        <div className="buttonMenu border-none flex hover:cursor-pointer">
            <p className="textMini pt-[6px] pr-[5px]">Fauvorites</p>
            <IoIosHeartEmpty size={30}/>
        </div>
    )
}