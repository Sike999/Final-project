import { IoCloseOutline } from "react-icons/io5";
import { useCallback, useRef, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuth } from "../../hooks/useAuth";
import { type LoginFormData, loginSchema } from "../../schemas/authSchemas";
import Tooltip from "../../ui/tooltip";
export default function LoginModal({ onClose } : { onClose:() => void }) { 
    const { login, error:servError, loading, } = useAuth()
    const [ show, setShow ] = useState<boolean>(false)
    const errorsParentRef = useRef<HTMLDivElement | null>(null)
    const {
        register,
        handleSubmit,
        formState:{errors},
        setError,
        reset,
    } = useForm<LoginFormData>({
        resolver:zodResolver(loginSchema),
        mode:'onSubmit',
    })

    const submit = useCallback(async (data: LoginFormData) => {

        try {
            await login(data.email,data.password)
            reset()
            onClose()
        } 
        catch(err) {
            servError?.forEach((err) => {
                setError('root.serverError',{message:err})
            })
            
        }   
    },[reset,setError])
    return (
        <form onSubmit={handleSubmit(submit)}>
        <div className="max-w-[506px] bg-[#92CC0D]/45 flex flex-col items-center justify-center gap-[14px] border-1 border-white px-[70px] py-[20px]" ref={errorsParentRef}>
            {show && (
                servError?.map((err) => (
                    <Tooltip show={show} text={err} tailwindStyles="bg-[#de3c47] w-[120px] h-[30px] border-1 border-[#a60813] rounded-[20px] text-white flex items-center justify-center absolute bottom-12" setShow={setShow} parentRef={errorsParentRef} />
                ))
            )}
            
            <IoCloseOutline size={36} onClick={onClose} color="white" className="ml-[410px] hover:cursor-pointer"/>

            <p className="heading-primary text-[70px]">LOG IN</p>

            <input type="text" placeholder="Email" className="buttonMenu formInput" 
                {...register('email')} aria-invalid={!!errors.email} aria-describedby="email-error"/>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <input type="password" placeholder="Password" className="buttonMenu formInput" 
                {...register('password')} aria-invalid={!!errors.password} aria-describedby="password-error"/>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <button type="submit" className="buttonMenu px-[20px] rounded-[44px] w-[342px] h-[50px] mt-[10px] hover:cursor-pointer hover:bg-white/10" disabled={loading}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <p>Sign in</p>
                )}
                
            </button>

            <a><p className="text-white font-roboto underline hover:cursor-pointer">
                Register {/* В СТЕЙТ МЕНЕДЖЕР НАЗНАЧИТЬ МОДАЛКУ ДРУГУЮ */}
            </p></a>
        </div>
        </form>
    )
}