import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import Request, { TOPRATE, STREAM } from "../api"
import Sidebar from "../component/Sidebar"
import { ImNewspaper } from "react-icons/im"
import { BsFileMusic } from "react-icons/bs"
import { IoBookOutline } from "react-icons/io5"
import { GiBlackBook } from "react-icons/gi"
import Navbar from "../component/Navbar"
import __Item__ from "../component/__Item__"
import Scroll from "../component/Scroll"

/** @type { page } descript: { None } */
export default function Home({ remote, socket, setCurrentPlaying, setQueue }) {

    const nav = useNavigate()
    const [topRate, setTopRate] = useState([])

    useEffect(() => {
        const getTopRate = async () => {
            let { data } = await Request.Get(TOPRATE)
            setTopRate(data.videos)
        }; getTopRate()
    }, [])

    const play = async (source) => {

        try {
            let { data } = await Request.Get(STREAM + `?id=${source.videoId}`)
            //$currentPlaying(data.)
            // nếu chưa có phần tử trong hàng đợi thì phát và thêm
            setCurrentPlaying({
                id: source.videoId,
                image: source.thumbnail,
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

    return <div className="page">
        <Sidebar remote={remote} />
        <main className="w-full bg-gray-900 h-[100vh]">

            <Navbar />

            <div className="h-[85vh] pb-20 overflow-y-scroll scrollbar scrollbar-thumb-gray-900">

                <div className="flex items-center justify-center">
                    <Scroll>
                        {topRate?.map(
                            (item, index) => <Scroll.Item key={index} data={item} play={play}/>
                        )}
                    </Scroll>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center justify-center p-12 lg:p-20">
                   
                    <div onClick={() => nav(`/category=âm nhạc`)} className="home-card bg-gradient-to-b from-amber-500 to-green-500">
                        <BsFileMusic className="text-white text-[32px]" />
                        <h1 className="text-[32px] font-bold text-white">Âm nhạc</h1>
                    </div>
                    <div onClick={() => nav(`/category=sách nói`)} className="home-card bg-gradient-to-b from-green-500 to-sky-500">
                        <IoBookOutline className="text-white text-[32px]" />
                        <h1 className="text-[32px] font-bold text-white">Sách nói</h1>
                    </div>
                </div>

                <div className="p-8 lg:p-20">
                    <h1 className="mt-8 text-3xl text-center font-bold text-white">TOP TRENDING</h1>
                    <div className="mt-8 bg-gray-800 toprate h-[55vh] py-4 px-2 lg:px-16 overflow-y-scroll scrollbar scrollbar-thumb-gray-700 scrollbar-thin">
                        {topRate?.map((item, index) => <__Item__ key={index} data={item} play={play} />)}
                    </div>
                </div>
            </div>
        </main>
    </div>
}
