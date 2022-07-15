import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Request, { STREAM, GET_LIBRARY } from "../api"
import Sidebar from "../component/Sidebar"
import { useRecoilState } from "recoil"
import { auth } from "../root/var"
import Navbar from "../component/Navbar"
import Item from "../component/__Item__"

/** @type { User } descript: { None } */
export default function User({ queue, remote, setQueue, setCurrentPlaying }) {

    const [__auth__, $auth] = useRecoilState(auth)

    const nav = useNavigate()
    const [library, setLibrary] = useState([])

    const play = async (source) => {

        try {
            let { data } = await Request.Get(STREAM + `?id=${source.videoId}`)
            //$currentPlaying(data.)
            // nếu chưa có phần tử trong hàng đợi thì phát và thêm
            setCurrentPlaying({
                id: source.videoId,
                image: source.image,
                author: source.author.name,
                src: data,
                title: source.title
            })

            setQueue(prev => [...prev, {
                id: source.videoId,
                image: source.image,
                author: source.author.name,
                src: data,
                title: source.title
            }])

        } catch (err) {

        }
    }

    useEffect(() => {
        const getLibrary = async () => {
            const { data } = await Request.Get(GET_LIBRARY, { token: __auth__?.token })
            setLibrary(data.library)
        }; getLibrary()
    }, [__auth__])

    const exit = (cb) => {
        $auth(null)
        localStorage.removeItem("auth")
        cb()
    }

    return <div className="page">
        <Sidebar remote={remote} />
        <main className="w-full bg-gray-900 h-[100vh]">

            <Navbar />

            <div className="h-[90vh] pb-20 px-8 lg:px-20 overflow-y-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-thin">

                <div className="flex w-full justify-center items-center py-8">
                    <img src="https://picsum.photos/1200/300" className="rounded-lg" alt="" />
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 items-center mb-8">
                    <button onClick={() => exit(() => nav("/"))} className="button w-full text-white bg-red-500 hover:bg-red-400">Thoát</button>
                </div>

                <div className="bg-gray-500 h-[55vh] py-8 px-8 lg:px-16 scrollbar scrollbar-thumb-gray-700 scrollbar-thin">

                    <div className="flex flex-col gap-4">
                        {library && library?.map((item, index) => <Item key={index} data={item} play={play} />)}
                    </div>

                </div>
            </div>

        </main>
    </div>
}