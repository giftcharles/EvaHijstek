<template>
    <div class="flex flex-col items-center min-h-screen">
        <NavigationBar />
        <NuxtPage class="mt-[120px] max-w-[97%] mx-auto"/>
        <Footer />
    </div>
</template>

<style>
* {
    font-family: 'Myriad pro regular';
    color: white;
}
</style>

<script lang="ts" setup>
import { onAuthStateChanged, signInWithEmailAndPassword } from 'firebase/auth'

const email = ref('')
const password = ref('')
const { $auth } = useNuxtApp()
const loggedIn = useState('loggedIn', () => false)

onMounted(() => {
    onAuthStateChanged($auth, (authUser) => {
        if(authUser) {
            loggedIn.value = true
        } else loggedIn.value = false
    })
  document.addEventListener("keyup", (e) => {
    console.log(e.code)
    if (e.code === "KeyB") {
      if (e.ctrlKey) {
        email.value = prompt('Email:')
        password.value = prompt('Password:')
      }
      signInWithEmailAndPassword($auth, email.value, password.value).then(() => {
        loggedIn.value = true
        console.log('We are logged in')
      }).catch(console.error)
    }
  });
});
</script>