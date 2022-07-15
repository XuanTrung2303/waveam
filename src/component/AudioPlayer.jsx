import { useState, useRef } from "react"
import { AiOutlineHeart } from "react-icons/ai"
import { BsFillVolumeUpFill, BsThreeDots, BsFillPlayCircleFill, BsPauseCircleFill, BsCardList } from "react-icons/bs"
import { BiShuffle, BiSkipPrevious, BiSkipNext } from "react-icons/bi"
import { MdLoop } from "react-icons/md"

import Player from 'react-h5-audio-player';
import 'react-h5-audio-player/lib/styles.css'; //https://www.npmjs.com/package/react-h5-audio-player

/** @type { comp } descript: { react } */
export default function AudioPlayer({ currentPlaying, queue, setQueue, setCurrentPlaying }) {

    // const [isPlaying, setIsPlaying] = useState(true)
    let audioRef = useRef({})


    const shorter = (str) => {
        let result = null
        if (str?.length > 50) {
            result = str?.slice(0, 47) + "..."
        } else result = str
        return result
    }

    const handleEnded = () => {
        // let currentAudioIndex =  queue.findIndex(element => element.src === currentPlaying.src)
        // console.log(`Current: ${currentAudioIndex}`)
        // currentAudioIndex && setCurrentPlaying(queue[currentAudioIndex+1])
    }

    return <div className={`${currentPlaying.src?"flex":"hidden"} bg-slate-700 border-t-2 border-slate-500  fixed items-center gap-4 justify-between bottom-0 h-[95px] w-full`}>
            <div className="left hidden lg:flex items-center justify-evenly w-[40%] bg-slate-700 h-[80px] gap-4">
            <img src={currentPlaying.image} alt="" className="cover  h-[70px] rounded-xl" />
            <div className="info flex flex-col justify-center">
                <h2 className="text-base font-bold text-white">{shorter(currentPlaying.title)}</h2>
                <span className="text-sm text-gray-400">{currentPlaying.author}</span>
            </div>
        </div>
        <Player
            src={currentPlaying?.src}
            onEnded={handleEnded}
            customIcons={{
                play: <BsFillPlayCircleFill />,
                pause: <BsPauseCircleFill />,
                previous: <BiSkipPrevious />,
                next: <BiSkipNext />,
            }}
            autoPlay
            controls
        />
        <div className="hidden lg:flex right bg-slate-700 border-l-2 border-slate-500 flex items-center justify-center p-4">
            <BsCardList className="cursor-pointer text-[2.5rem] rounded-lg bg-slate-500 p-1 text-white"/>
        </div>
    </div>
    /*
    return <div className="fixed flex items-center justify-between bottom-0 w-full h-[80px] bg-gray-700">
        <Player
            src={currentPlaying?.src}
            className=""
            autoPlay
            controls
        />
    <div className="left px-3 flex justify-evenly gap-4">
            <img src="https://picsum.photos/60/60" alt="" className="cover rounded-xl" />
            <div className="info flex flex-col justify-center">
                <h2 className="text-xl font-bold text-white">Audio Title</h2>
                <span className="text-base text-gray-400">Author</span>
            </div>
        </div>
        <div className="middle py-4">
            <div className="flex items-center justify-center gap-8 pt-2">
                <BiShuffle className="text-white text-2xl" />
                <BiSkipPrevious className="text-white text-2xl" />

                {
                    isPlaying ? 
                        <BsPauseCircleFill onClick={pause} className="text-white text-[2rem]" /> 
                        : <BsFillPlayCircleFill onClick={pause} className="text-white text-[2rem]" />
                }

                <BiSkipNext className="text-white text-2xl" />
                <MdLoop className="text-white text-2xl" />
            </div>
            <div className="mt-2">
                <input type="range" className="w-[450px] h-[5px]" name="" id="" />
            </div>
        </div>
        <div className="right flex gap-4 p-4">
            <div className="info flex items-center justify-center gap-2">
                <AiOutlineHeart className="text-white text-2xl" />
                <BsThreeDots className="text-white text-2xl" />
                <BsFillVolumeUpFill className="text-white text-2xl" />
                <input type="range" className="w-[80px] h-[2px]" name="" id="" />
            </div>
            <div>
                <BsCardList className="text-white text-2xl"/>
            </div>
        </div>
    </div>
    */
}