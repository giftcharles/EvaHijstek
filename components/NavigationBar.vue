<script setup lang="ts">
import { signOut } from "firebase/auth";

const selected = ref("");
let timer: any = null
const links = [
  {
    text: "Past experiences.",
    to: "#past-experiences",
  },
  {
    text: "Education.",
    to: "#education",
  },
  {
    text: "Portfolio.",
    to: "#portfolio",
  },
  {
    text: "Contact.",
    to: "#contact",
  },
];

const showMobileNav = ref(null);
const loggedIn = useState("loggedIn");
const { $auth } = useNuxtApp();
function logout() {
  signOut($auth).then(() => {
    console.log("we are logged out!");
  });
}

function scrollToView(id) {
  try {
    timer()
  } catch (error) {}
  selected.value = id;
  const yOffset = -103;
  const element: any = document.getElementById(id.replace("#", ""));
  const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
  window.scrollTo({ top: y, behavior: "smooth" });
  timer = setTimeout(() => {
    selected.value = null;
  }, 2000);
}
</script>

<template>
  <div class="top-0 bg-base-100 left-0 fixed flex flex-col w-full flex-wrap z-50">
    <div class="navbar font-myriad min-w-full">
      <div class="flex-1 ml-3">
        <NuxtLink to="/" class="normal-case text-xl font-myriad-bold tracking-widest"
          >EVA HIJSTEK</NuxtLink
        >
      </div>
      <NuxtLink to="/blog/1?new=1" class="capitalize text-purple-400 mr-2" v-if="loggedIn"
        >New Article</NuxtLink>
      <button @click="logout" class="capitalize text-red-400" v-if="loggedIn">
        LogOut
      </button>
      <div class="flex-none mr-3 md:block hidden">
        <ul class="rounded-none tracking-wider">
          <li class="inline" v-for="(link, index) in links" :key="index">
            <a
              :class="[
                link.to === selected ? 'opacity-100' : 'opacity-60 hover:opacity-100',
              ]"
              @click.prevent="scrollToView(link.to)"
              :href="link.to"
              class="btn btn-ghost font-[700] text-[18.7px] rounded-none hover:bg-transparent capitalize outline-none"
              >{{ link.text }}</a
            >
          </li>
        </ul>
      </div>

      <button
        class="btn btn-ghost mr-3 md:hidden"
        @click="showMobileNav = !showMobileNav"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-6 h-6"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>
    </div>

    <div class="flex flex-col items-end ml-auto mr-10">
      <a href="mailto:Evahijstek@gmail.com" class="text-sm">Evahijstek@gmail.com</a>
      <a href="https://www.linkedin.com/in/EvaHijstek" class="text-sm"
        >www.linkedin.com/in/EvaHijstek</a
      >
    </div>

    <div
      :class="showMobileNav ? 'h-screen overflow-auto' : 'h-0 overflow-hidden'"
      class="bg-white transition-all duration-300 ease-in-out absolute top-0 left-0 w-full md:hidden flex flex-col"
    >
      <div class="flex items-center justify-between mt-[8px] mx-[20px]">
        <a class="normal-case text-xl font-myriad-bold tracking-widest text-base-100"
          >EVA HIJSTEK</a
        >
        <button class="btn btn-ghost" @click="showMobileNav = !showMobileNav">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="#1010FF"
            class="w-8 h-8"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
