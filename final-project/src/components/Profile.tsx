import { useUserStore } from "../hooks/userContext"
export default function Profile({  }) {
    const user = useUserStore((state) => state.user)
    return (
        <div className="text-white">
            {
                user?.name
            }
        </div>
    )
}