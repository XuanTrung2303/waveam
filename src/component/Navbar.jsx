import { useState } from "react"
import { useNavigate } from "react-router-dom"
import useSpeechToText from 'react-hook-speech-to-text'
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai"
import { FaUserAlt, FaMicrophone, FaSearch } from "react-icons/fa"
import { auth } from "../root/var"
import { useRecoilValue } from "recoil"

/** @type { comp } descript: { None } */
export default function Navbar() {

    const nav = useNavigate()
    const __auth__ = useRecoilValue(auth)
    const [searchValue, setSearchValue] = useState("")

    const {
        error,
        interimResult,
        isRecording,
        results,
        startSpeechToText,
        stopSpeechToText,
    } = useSpeechToText({
        continuous: true,
        useLegacyResults: false
    })

    const handleStopSTT = async () => {
        //setSearchValue(results[results.length-1]?.transcript)
        stopSpeechToText()
        if (results[results.length-1]?.transcript) nav(`/search=${results[results.length-1]?.transcript}`)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        if (searchValue.length >= 1) nav((`/search=${searchValue}`))
    }

    return <div className="navbar w-full h-[55px] flex flex-col lg:flex-row items-center justify-evenly">
        <div className="arrows hidden lg:flex items-center text-white gap-4">

        </div>
        <form onSubmit={handleSubmit} className="relative flex items-center justify-center search">
            <div className="absolute right-0 flex p-4 gap-1">
                <FaSearch onClick={handleSubmit} className="cursor-pointer text-white" />
            </div>
            <input onChange={({ target }) => setSearchValue(target.value)} type="text" placeholder={error ? "" : "Tìm kiếm"} className="text-white bg-gray-700 w-[350px] h-[35px] px-4 pr-14 rounded-lg" />
        </form>
        <div className="hidden relative lg:flex items-center p-2 gap-2 h-full">
            <div className="flex justify-center items-center rounded-full w-[160px] h-full bg-gray-700">
                <h1 className="pb-1 font-bold text-white">{__auth__?.username || "Tài khoản"}</h1>
            </div>
            <div className="avatar absolute left-0">
                <img src="https://picsum.photos/40/40" className="w-full border-solid border-2 rounded-full h-full" alt="" />
            </div>
        </div>
    </div>
}

