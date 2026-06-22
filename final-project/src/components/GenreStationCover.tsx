import { IoPlayOutline } from "react-icons/io5";
export default function GenreStationCover({genre, url} : {genre: string, url: string}) {
    return (
        <div className="w-[356px] h-[396px] mb-[8px]">
            <img src={import.meta.env.VITE_API_URL+url} />
            <div className="flex justify-between mt-[8px] ">
                <p className="heading-primary">{genre.toUpperCase()}</p>
                <IoPlayOutline className="hover:cursor-pointer" color="white" size={28}/>
            </div>
        </div>
    )
}