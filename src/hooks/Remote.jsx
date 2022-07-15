import { useState } from "react"
import { useNavigate } from "react-router-dom"
import Request, { SEARCH, STREAM } from "../api"

/** @type { Unknown } descript: { none } */
export default function Remote({ showRemote, remote, socket, children, setCurrentPlaying }) {

    let nav = useNavigate()

    const [text, setText] = useState('')
    const [remoteDeviceID, $remoteDeviceID] = useState('')
    const [remoteID, setRemoteID] = useState('')
    const [_payload_, $payload] = useState('')
    const [searchData, $searchData] = useState([])

    const generateRemote = () => {
        socket.emit(`generate-remote`)
    }; socket.on(`reflex:generate-remote`, id => {
        setRemoteID(id)
    })

    const ping = () => {
        socket.emit(`ping`, remoteDeviceID)
    }; socket.on(`reflex:ping`, data => console.log(data))

    socket.on(`reflex:send-command`, data => {
        let { action, payload } = data
        switch (action) {
            case "go":
                nav(`/${payload}`)
                break
            case "search":
                nav(`/search=${payload}`)
                break
            case "play":
                setCurrentPlaying(payload)
                break
        }
    })

    const remotePlay = async () => {
        // 1. tim kiem
        try {
            let { data } = await Request.Post(SEARCH, { keyword: String(_payload_) })
            $searchData(data.videos)
        } catch (err) { $searchData([]) }

    }

    const play = async (source) => {
        // `send-command`, ({ action, payload, id })
        try {
            let { data } = await Request.Get(STREAM + `?id=${source.videoId}`)
            socket.emit(`send-command`, {
                action: `play`, 
                payload: { 
                    id: source.videoId,
                    image: source.image,
                    author: source.author.name,
                    src: data,
                    title: source.title
                },
                id: remoteDeviceID
        })

        } catch (err) {

        }
    }

    const shorter = (str) => {
        let result = null
        if (str?.length > 30) {
            result = str?.slice(0, 27) + "..."
        } else result = str
        return result
    }


    return <div>
        {showRemote && <div className="fixed z-[99] top-0 left-0 w-full h-[100vh] lg:h-full bg-black bg-opacity-50 flex items-center justify-center">
            <div className="remoteContainer w-[555px] bg-gray-700 h-[100vh] lg:h-auto rounded-lg p-8">
                <div className="flex justify-between items-center">
                    <h1 className="heading text-white text-2xl font-bold">Remote Configs</h1>
                    <h1 className="cursor-pointer text-red-500 font-bold" onClick={() => remote(false)}>/close</h1>
                </div>
                <div className="flex flex-col gap-4">
                    <h2 className="text-white text-xl font-bold">Tạo hoặc kết nối tới 1 thiết bị</h2>
                    <button onClick={generateRemote} className="button bg-sky-500 text-white">Tạo mã kết nối</button>
                    {remoteID && <h1 className="text-white font-bold">Mã kết nối của bạn là:
                        <span className="ml-2 px-2 border-solid border-2 border-gray-300">{remoteID}</span>
                    </h1>}

                    {!remoteID && <div className="relative">
                        <input onChange={({ target }) => setText(target.value)} className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập mã để kết nối tới thiết bị" />
                        <button onClick={() => $remoteDeviceID(text)} type="submit" className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[110px]">Kết nối</button>
                    </div>}
                    {remoteDeviceID && <>
                        <div className="relative">
                            <input onChange={({ target }) => $payload(target.value)} className="block p-4 pl-10 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Nhập từ khóa để tìm kiếm" />
                            <button onClick={remotePlay} className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-[110px]">Tìm kiếm</button>
                        </div>
                        {searchData?.length > 1 && <div className="h-[55vh] lg:h-[40vh] overflow-y-scroll rounded-xl p-8 bg-gray-800 scrollbar scrollbar-thumb-gray-700 scrollbar-thin">
                            {searchData?.map((item, index) => <div key={index} onClick={() => play(item)} className="cursor-pointer hover:bg-gray-600 rounded-xl px-2">
                                <h1 className="text-white">{shorter(item.title)}</h1>
                            </div>)}
                        </div>}
                    </>}
                </div>
            </div>
        </div>}
        {children}
    </div>
}

Remote.AudioItem = function RAI () {
    return <div >
        
    </div>
}