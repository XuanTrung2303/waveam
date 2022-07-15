import { IoPlayCircleOutline } from "react-icons/io5"
import { BsHeadphones, BsFillSuitHeartFill } from "react-icons/bs"
import { useRecoilValue } from "recoil"
import { auth } from "../root/var"
import Request, { ADD_TO_LIBRARY } from "./../api"

export default function __Item__({ data, play }) {

    const __auth__ = useRecoilValue(auth)
    const shorter = (str) => {
        let result = null
        if (str?.length > 45) {
            result = str?.slice(0, 42) + "..."
        } else result = str
        return result
    }

    const addToQueue = () => {
        
    }

    const addToLibrary = async () => {
        try {
            let res = await Request.Post(ADD_TO_LIBRARY, {
                source: data
            }, { token:__auth__.token })
        } catch(error) {
            console.log(error)
        }
    }

    return <div className={`hover:bg-gray-700 flex items-center justify-between my-[3px] gap-2 lg:gap-4 px-2 py-1 rounded-lg`}>
        <div onClick={() => play(data)} className="cursor-pointer flex items-center gap-3 lg:gap-4">
            <img src={data.image || data.thumbnail} className="flex bg-center rounded-full lg:rounded-lg lg:w-[70px] w-[50px] h-[50px]" alt=""/>
            <div className="flex flex-col lg:w-[80%]"> {/* width 80% so với phần tử cha */}
                <h1 className="text-xs lg:text-sm text-white font-bold">{shorter(data.title)}</h1>
                <h2 className="text-xs lg:text-sm text-[0.8rem] text-gray-200">{data.author.name}</h2>
            </div>
        </div>

        <div className="hidden lg:flex gap-2">
            <div className="flex items-center gap-2">
                <h2 className="text-sm text-gray-300">{data.views}</h2>
                <BsHeadphones className="text-white text-xl" />
            </div>
            <div className="flex items-center gap-2 rounded-xl border-solid border-[1px] w-full border-gray-500 p-2 pl-3">
                <BsFillSuitHeartFill onClick={addToLibrary} className="cursor-pointer hover:text-red-500 text-white text-[1.1rem]" />
                <IoPlayCircleOutline onClick={()=>play(data)} className="cursor-pointer hover:text-gray-200 text-white text-2xl" />
            </div>
        </div>

    </div>
}