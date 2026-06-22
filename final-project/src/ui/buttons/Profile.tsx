import { FaRegUser } from "react-icons/fa";
export default function ProfileButton({ imgUrl, onClick }:{ imgUrl:string, onClick:() => void }) {
    return (
        <div onClick={onClick}>
            {!imgUrl ? (
                <div className="hover:cursor-pointer rounded-[200px] border-1  border-white p-[13px] flex items-center bg-[#00000066]" >
                    <FaRegUser color="white" size={22} />
                </div>
            ) : (
                <img src={imgUrl} className="hover:cursor-pointer w-[66px] h-[66px] rounded-[90px] border-1 border-white"/>
            )}
        </div>
    )
}