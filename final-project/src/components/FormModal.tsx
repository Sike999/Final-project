import type { ReactNode } from "react";
import { IoCloseOutline } from "react-icons/io5";
import ActionButton from "../ui/buttons/Action";
export default function FormModal({ children } : { children:ReactNode, onClick:React.MouseEventHandler<HTMLButtonElement> }) {
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="max-w-[456px] flex flex-col items-center justify-center">
            <IoCloseOutline size={30} />
            {children}
            <ActionButton tailwindStyles="buttonMenu px-[20px] rounded-[44px] w-[302px] h-[45px] hover:cursor-pointer hover:bg-white/10">
                <p>Submit</p>
            </ActionButton>
        </div>
        </form>
    )
}