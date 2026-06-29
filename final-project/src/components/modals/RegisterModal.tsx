import { IoCloseOutline } from "react-icons/io5";
import { useCallback, useRef, useState } from "react";
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { useAuth } from "../../hooks/useAuth";
import { type RegisterFormData,registerSchema } from "../../schemas/authSchemas";
import Tooltip from "../../ui/tooltip";
export default function RegisterModal({ onClose } : { onClose:() => void }) { 
    const { register:regUser, error:servError, loading, } = useAuth()
    const [ show, setShow ] = useState<boolean>(false)
    const errorsParentRef = useRef<HTMLDivElement | null>(null)
    const {
        register,
        handleSubmit,
        formState:{errors},
        setError,
        reset,
        watch
    } = useForm<RegisterFormData>({
        resolver:zodResolver(registerSchema),
        mode:'onSubmit',
        defaultValues: {
            role: false,
            agreement: false,
        },
    })

    const artistChecked = watch('role');

    const submit = useCallback(async (data: RegisterFormData) => {
        const role = data.role ? 'artist' : 'listener';
        try {
            await regUser(data.email,data.name,data.password,role,data.nickname)
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

            <p className="heading-primary text-[70px]">REGISTER</p>

            {artistChecked && (
                <>
                    <input type="text" placeholder="Nickname" className="buttonMenu formInput"  
                    {...register('nickname')} aria-invalid={!!errors.nickname} aria-describedby="nickname-error"/>
                    {errors.nickname && <p className="text-red-500 text-sm">{errors.nickname.message}</p>}
                </>
            )}

            <input type="text" placeholder="Name" className="buttonMenu formInput" 
                {...register('name')} aria-invalid={!!errors.name} aria-describedby="name-error"/>
                {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}

            <input type="text" placeholder="Email" className="buttonMenu formInput" 
                {...register('email')} aria-invalid={!!errors.email} aria-describedby="email-error"/>
                {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

            <input type="password" placeholder="Password" className="buttonMenu formInput" 
                {...register('password')} aria-invalid={!!errors.password} aria-describedby="password-error"/>
                {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

            <input type="password" placeholder="Confirm password" className="buttonMenu formInput" 
                {...register('confirmPassword')} aria-invalid={!!errors.confirmPassword} aria-describedby="confirmPassword-error"/>
                {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword.message}</p>}

            <button type="submit" className="buttonMenu px-[20px] rounded-[44px] w-[342px] h-[50px] mt-[10px] hover:cursor-pointer hover:bg-white/10" disabled={loading}>
                {loading ? (
                    <p>Loading...</p>
                ) : (
                    <p>Register</p>
                )}
                
            </button>

            <div className="flex items-center">
                <input type="checkbox" className="checkbox" 
                    {...register('agreement')} aria-invalid={!!errors.agreement} aria-describedby="agreement-error"/> 
                <p className="text-white font-roboto">I have read and accept the Privacy Policy</p>    
            </div>
            {errors.agreement && <p className="text-red-500 text-sm">{errors.agreement.message}</p>}

            <div className="flex items-center mr-[194px]">
                <input type="checkbox" className="checkbox"
                    {...register('role')} aria-invalid={!!errors.role} aria-describedby="role-error"/> 
                    {errors.role && <p className="text-red-500 text-sm">{errors.role.message}</p>}
                <p className="text-white font-roboto ">I am an artist</p>
            </div>
            <a><p className="text-white font-roboto underline hover:cursor-pointer">
                Sign in {/* В СТЕЙТ МЕНЕДЖЕР НАЗНАЧИТЬ МОДАЛКУ ДРУГУЮ */}
            </p></a>
        </div>
        </form>
    )
}