import { atom } from "recoil"

var initAuth = localStorage.getItem('auth')

export var auth = atom({
    key: 'auth',
    default: JSON.parse(initAuth) || null
})

export var currentPlaying = atom({
    key: 'currentPlaying',
    default: {}
})

export var queue = atom({
    key: 'queue',
    default: []
})

export var showSign = atom({
    key: 'showSign',
    default: false
})