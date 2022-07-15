import { BrowserRouter, Routes, Route } from "react-router-dom"
import { useState } from "react"
import { io } from "socket.io-client"
import AudioPlayer from "./component/AudioPlayer"
import Home from "./pages/Home.page"
import User from "./pages/User.page"
import Search from "./pages/Search.page"
import Category from "./pages/Category.page"
import Remote from "./hooks/Remote"
import Sign from "./component/Sign"
import { useRecoilValue } from "recoil"
import { showSign } from "./root/var"

function App() {

  const socket = io("https://rsoftmedia.herokuapp.com")
  const __showSign__ = useRecoilValue(showSign)
  const [showRemote, $showRemote] = useState(false)
  const [queue, setQueue] = useState([])
  const [currentPlaying, setCurrentPlaying] = useState({})

  return <BrowserRouter>
    <div>
      <Routes>
        <Route path="/" element={
          <Remote socket={socket} showRemote={showRemote} setCurrentPlaying={setCurrentPlaying} remote={$showRemote}>
            <Home socket={socket} remote={$showRemote} queue={queue} setQueue={setQueue} setCurrentPlaying={setCurrentPlaying} />
          </Remote>
        } />

        <Route path="/user" element={
          <Remote socket={socket} showRemote={showRemote} setCurrentPlaying={setCurrentPlaying} remote={$showRemote}>
            <User socket={socket} remote={$showRemote} queue={queue} setQueue={setQueue} setCurrentPlaying={setCurrentPlaying} />
          </Remote>
        } />

        <Route path="/search=:keyword" element={
          <Remote socket={socket} showRemote={showRemote} setCurrentPlaying={setCurrentPlaying} remote={$showRemote}>
            <Search remote={$showRemote} queue={queue} setQueue={setQueue} setCurrentPlaying={setCurrentPlaying} />
          </Remote>
        } />

        <Route path="/category=:category" element={
          <Remote socket={socket} showRemote={showRemote} setCurrentPlaying={setCurrentPlaying} remote={$showRemote}>
            <Category remote={$showRemote} queue={queue} setQueue={setQueue} setCurrentPlaying={setCurrentPlaying} />
          </Remote>
        } />

      </Routes>
      <AudioPlayer currentPlaying={currentPlaying} queue={queue} setQueue={setQueue} setCurrentPlaying={setCurrentPlaying} />
      {__showSign__ && <Sign />}
    </div>
  </BrowserRouter>
}

export default App;
