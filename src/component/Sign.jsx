import { useState } from "react"
import { useRecoilState } from "recoil"
import { FiUser, FiLock } from "react-icons/fi"
import { RiCloseCircleLine } from "react-icons/ri"
import { MdOutlineMail } from "react-icons/md"
import { showSign, auth } from "../root/var"
import Request, { SIGN_IN, SIGN_UP } from "../api"

/** @type { comp } descript: {  } */
export default function Sign() {

    const [__auth__, $auth] = useRecoilState(auth)
    const [__showSign__, $showSign] = useRecoilState(showSign)
    const [showSignIn, setShowSignIn] = useState(true)
    const [err, setErr] = useState(null)
    const [texts, setTexts] = useState({ username: "", password: "" })

    const handleChange = (event) => {
        const name = event.target.name
        const value = event.target.value
        setTexts(prevValues => ({ ...prevValues, [name]: value }))
    }

    const signIn = async (event) => {
        event.preventDefault()
        try {
            let { data } = await Request
                .Post(SIGN_IN, {
                    username: texts.username,
                    password: texts.password
                })

            localStorage.setItem("auth", JSON.stringify({ username: data.username, token: data.token }))
            $auth({ username: data.username, token: data.token })
            $showSign(false)
        } catch (err) {
            setErr("Tên đăng nhập, mật khẩu không đúng hoặc tài khoản không tồn tại")
        }
    }

    const signUp = async (event) => {
        event.preventDefault()
        try {
            let { data } = await Request
                .Post(SIGN_UP, {
                    username: texts.username,
                    password: texts.password,
                    email: texts.email
                })

            localStorage.setItem("auth", JSON.stringify({ username: data.username, token: data.token }))
            $auth({ username: data.username, token: data.token })
            $showSign(false)
        } catch (err) {
            setErr("Tài khoản đã tồn tại")
        }
    }

    return <div className="fixed top-0 left-0 bg-slate-400 bg-opacity-40 w-full h-full lg:py-8 lg:px-36">
        {
            showSignIn ?
                <Sign.In err={err} handleSubmit={signIn} handleChange={handleChange} setShowSignIn={setShowSignIn} />
                : <Sign.Up err={err} handleSubmit={signUp} handleChange={handleChange} setShowSignIn={setShowSignIn} />
        }
    </div>
}

Sign.In = function SignIn({ err, handleSubmit, handleChange, setShowSignIn }) {
    const [__showSign__, $showSign] = useRecoilState(showSign)
    return <div className="sign-container w-full h-full rounded-xl flex">
        <div className="w-full h-full bg-gradient-to-r from-sky-300 to-sky-600 p-4">
            <RiCloseCircleLine onClick={() => $showSign(false)} className="text-red-500 text-2xl font-bold cursor-pointer" />
            <h1 className="text-white mt-12 text-center text-3xl font-bold">WAVE ÂM</h1>
            <h1 className="text-gray-200 mt-2 text-center text-xl font-bold">Đăng nhập</h1>

            <form className="pt-12" onSubmit={handleSubmit}>
                {err && <p className="text-red-600 pb-4 text-center text-sm font-bold">{err}</p>}
                <div className="flex flex-col gap-2 px-6">
                    <div className="relative flex items-center gap-2">
                        <FiUser className="absolute text-white text-xl ml-4" />
                        <input onChange={(event) => handleChange(event)} className="input" name="username" placeholder="Tên đăng nhập" />
                    </div>
                    <div className="relative flex items-center gap-2">
                        <FiLock className="absolute text-white text-xl ml-4" />
                        <input onChange={(event) => handleChange(event)} className="input outline-none" name="password" type="password" placeholder="Mật khẩu" />
                    </div>
                    <button className="button bg-red-600 text-white hover:bg-red-500">Đăng nhập</button>
                </div>
            </form>

            <h1 className="text-gray-200 mt-2 text-center text-base">
                Chưa có tài khoản?
                <span onClick={() => setShowSignIn(false)} className="ml-1 cursor-pointer font-bold">Đăng ký</span>
            </h1>

        </div>
        <div
            style={{ backgroundImage: "url(https://truongquochoc.com/wp-content/uploads/2020/10/tai-hinh-anh-bien-dep-nhat-tren-the-gioi-lam-hinh-nen-18.jpg)" }}
            className="hidden lg:flex w-full h-full bg-center">
        </div>
    </div>
}

Sign.Up = function SignUp({ err, handleSubmit, handleChange, setShowSignIn }) {
    const [__showSign__, $showSign] = useRecoilState(showSign)
    return <div className="sign-container w-full h-full rounded-xl flex">
        <div
            style={{ backgroundImage: "url(https://scr.vn/wp-content/uploads/2020/07/Hình-nền-dịu-mát-về-Đại-Dương.jpg)" }}
            className="hidden lg:flex w-full h-full bg-center">
        </div>
        <div className="w-full h-full bg-gradient-to-r from-sky-300 to-sky-600 p-4">
            <RiCloseCircleLine onClick={() => $showSign(false)} className="text-red-500 text-2xl font-bold cursor-pointer" />
            <h1 className="text-white mt-12 text-center text-3xl font-bold">WAVE ÂM</h1>
            <h1 className="text-gray-200 mt-2 text-center text-xl font-bold">Đăng Ký</h1>

            <form className="pt-12" onSubmit={handleSubmit}>
                {err && <p className="text-red-600 pb-4 text-center text-sm font-bold">{err}</p>}
                <div className="flex flex-col gap-2 px-6">
                    <div className="relative flex items-center gap-2">
                        <FiUser className="absolute text-white text-xl ml-4"/>
                        <input onChange={(event) => handleChange(event)} className="input" name="username" placeholder="Tên đăng nhập" />
                    </div>
                    <div className="relative flex items-center gap-2">
                        <FiLock className="absolute text-white text-xl ml-4"/>
                        <input onChange={(event) => handleChange(event)} className="input" name="password" type="password" placeholder="Mật khẩu" />
                    </div>
                    <div className="relative flex items-center gap-2">
                        <MdOutlineMail className="absolute text-white text-xl ml-4"/>
                        <input onChange={(event) => handleChange(event)} className="input" name="email" placeholder="Email" />
                    </div>
                    <button className="button bg-red-600 text-white hover:bg-red-500">Đăng ký</button>
                </div>
            </form>

            <h1 className="text-gray-200 mt-2 text-center text-base">
                Đã có tài khoản?
                <span onClick={() => setShowSignIn(true)} className="ml-1 cursor-pointer font-bold">Đăng nhập</span>
            </h1>
        </div>
    </div>
}