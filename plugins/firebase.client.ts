import { initializeApp } from 'firebase/app'
import { getAuth, onAuthStateChanged } from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyC4VKxGKOezcLKh0Gi8U8z_E9y19rdOR1E",
  authDomain: "evahijstek.firebaseapp.com",
  projectId: "evahijstek",
  storageBucket: "evahijstek.appspot.com",
  messagingSenderId: "482187874450",
  appId: "1:482187874450:web:c4d921c7b7b4afe69d564b"
};

export default defineNuxtPlugin(nuxtApp => {
  const email = useState<string>("email");
  const loggedIn = useState("loggedIn");
  const password = useState<string>("password");
  const global_user = useState<any>("user");
  const app = initializeApp(firebaseConfig)
  const auth = getAuth(app)
  const firestore = getFirestore(app)
  const storage = getStorage(app)

  function updateUserPassword() {
    return updatePassword(auth.currentUser!, password.value)
  }

  onAuthStateChanged(auth, (user) => {
    if (user) {
      global_user.value = user
      loggedIn.value = true
    } else loggedIn.value = false
  })

  nuxtApp.vueApp.provide('auth', auth)
  nuxtApp.provide('auth', auth)
  nuxtApp.vueApp.provide('storage', storage)
  nuxtApp.provide('storage', storage)
  nuxtApp.vueApp.provide('firestore', firestore)
  nuxtApp.provide('firestore', firestore)
  nuxtApp.provide('updateUserPassword', updateUserPassword)
  nuxtApp.vueApp.provide('updateUserPassword', updateUserPassword)
})
