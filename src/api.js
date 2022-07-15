import axios from "axios"

const DEVELOPMENT = "http://localhost:8888"
const SERVER1 = "https://rsoftmedia.herokuapp.com"
const SERVER2 = "https://rsoftmedia.vercel.app"

class HTTP {
    constructor(url) {
        this.url = url
    }
    async Get(routes="", headers={}) {
        return (await axios.get(this.url+routes, {headers}))
    }
    async Post(routes="", data, headers={}) {
        return (await axios.post(this.url+routes, data, {headers}))
    }
}

const TOPRATE = '/audio/toprate'
const SEARCH = '/audio/search' // { keyword: "lac troi", quantity: 12 }
const STREAM = '/audio/stream' // { id }
const SIGN_IN = '/user/signin'
const SIGN_UP = '/user/signup'
const ADD_TO_LIBRARY = '/user/add-to-library' // { source }
const GET_LIBRARY = '/user/get-library'

export { SEARCH, STREAM, SIGN_IN, SIGN_UP, ADD_TO_LIBRARY, GET_LIBRARY, TOPRATE }
export default Request = new HTTP("https://rsoftmedia.vercel.app")