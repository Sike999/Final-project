import GenreStationCover from "./GenreStationCover"
import { useEffect, useState } from "react"
import { getGenreImages } from "../api"
import type { genreImages } from "../types"
export default function GenreStationSection() {
    const [imgs, setImgs] = useState<Array<genreImages>>([])
    useEffect(() => {
        getGenreImages().then(res => {
            setImgs(res)
            console.log(res)
        })
    },[])
    return (
            <div className="m-[34px]">
                {imgs.length === 0 ? (<div>Loading...</div>) : (
                <>
                <div className="flex justify-between">
                <GenreStationCover key={imgs[0].genre} genre={imgs[0].genre} url={imgs[0].url}/>
                    <div>
                        <p className="text-white font-black text-6xl">
                            GENRE STATION
                        </p>
                        <p className="text-white text-[18px]">
                            EXPLORE YOUR GENRE
                        </p>
                    </div>
                <GenreStationCover key={imgs[1].genre} genre={imgs[1].genre} url={imgs[1].url}/>
                </div>
                <div className="flex justify-between">
                {imgs.slice(2).map((img) => (
                        <GenreStationCover key={img.genre} genre={img.genre} url={img.url}/>
                ))}
                </div>
                </>)}
            </div>
    )
}