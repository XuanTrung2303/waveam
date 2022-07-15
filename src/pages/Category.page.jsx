import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Request, { SEARCH, STREAM } from "../api"
import Sidebar from "../component/Sidebar"
import Navbar from "../component/Navbar"
import Item from "../component/__Item__"


/** @type { page } descript: { None } */
export default function Category({ queue, setQueue, remote, setCurrentPlaying }) {

    const { category } = useParams()
    const [source, setSource] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getCategoryData = async () => {
            setLoading(true)
            try {
                let { data } = await Request.Post(SEARCH, { keyword: category, quantity: 50 })
                setSource(data)
                setLoading(false)
            } catch(err) {
                setSource([])
            }
        }; getCategoryData()
    }, [category])

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

    return <div className="page">
        <Sidebar remote={remote}/>
        <main className="w-full bg-gray-900 h-[100vh] px-8">
            <Navbar />
            <div className="search-heading px-8 py-4 text-white text-2xl font-bold uppercase">{category}</div>
            <div className="audio-list scrollbar scrollbar-thumb-gray-700 scrollbar-thin">

                {loading && <div className="loading">
                    <img src="/images/loading2.svg " className="" alt="" />
                </div>}

                <div className="flex flex-col gap-4">
                    {source && source?.videos?.map((item, index) => <Item key={index} data={item} play={play} />)}
                </div>

            </div>
        </main>
    </div>
}