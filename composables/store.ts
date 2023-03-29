import { useState } from '#app'
import { onSnapshot } from "firebase/firestore" 

const bindRef = ({ key, ref }) => {
    const subscribers = useState("subscribers")
    const keyState = useState(key)
    const subscriber = onSnapshot(ref, (doc) => {
        keyState.value = {
            ...doc.data(),
            id: doc.id
        } 
    })
    subscribers.value[key] = subscriber
}

const bindCollectionRef = ({ key, ref }) => {
    const subscribers = useState("subscribers")
    const keyState = useState(key)
    const subscriber = onSnapshot(ref, (snap) => {
        const docs = snap.docs.map(doc => ({
            ...doc.data(),
            id: doc.id
        }))
        keyState.value = docs
    })
    subscribers.value[key] = subscriber
}

export const useBindRef = () => {
    return useState('bindRef', () => bindRef)
}

export const useBindCollectionRef = () => {
    return useState('bindCollectionRef', () => bindCollectionRef)
}