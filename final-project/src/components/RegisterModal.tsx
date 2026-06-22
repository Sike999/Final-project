import { IoCloseOutline } from "react-icons/io5";
import ActionButton from "../ui/buttons/Action";
export default function FormModal({ onClose } : { onClose:() => void }) {
    return (
        <form onSubmit={() => {}}>
        <div className="max-w-[506px] bg-[#92CC0D]/45 flex flex-col items-center justify-center gap-[14px] border-1 border-white px-[70px] py-[20px]">
            <IoCloseOutline size={36} onClick={onClose} color="white" className="hover:cursor-pointer"/>
            <p className="heading-primary text-[70px]">REGISTER</p>
            <input type="text" placeholder="Name" className="buttonMenu formInput"/>
            <input type="text" placeholder="Email" className="buttonMenu formInput"/>
            <input type="text" placeholder="Password" className="buttonMenu formInput"/>
            <input type="text" placeholder="Confirm password" className="buttonMenu formInput"/>
            <ActionButton onClick={() => {}} tailwindStyles="buttonMenu px-[20px] rounded-[44px] w-[342px] h-[50px] hover:cursor-pointer hover:bg-white/10">
                <p>Submit</p>
            </ActionButton>
            <div className="flex items-center">
                <input type="checkbox" className="checkbox"/> <p className="text-white font-roboto">I have read and accept the Privacy Policy</p>
            </div>
            <div className="flex items-center">
                <input type="checkbox" className="checkbox"/> <p className="text-white font-roboto ">I am an artist</p>
            </div>
            <a><p className="text-white font-roboto underline hover:cursor-pointer">
                Sign in
            </p></a>
        </div>
        </form>
    )
}