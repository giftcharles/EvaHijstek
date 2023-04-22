<script setup lang="ts">
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";

definePageMeta({
  layout: "default",
});

const loggedIn = useState('loggedIn')
const { $firestore } = useNuxtApp();
const posts = ref<any[]>([]);
const experienceSub = ref(null)
const educationSub = ref(null)
const education = ref([])
const experiences = ref([])
function _getPosts() {
  let q = query(collection($firestore, "articles"), orderBy('date', 'desc'))
  getDocs(q).then((snapshot) => {
    posts.value = snapshot.docs.map((doc) => doc.data());
  });
}

function _getExpriences() {
  let q = query(collection($firestore, "experiences"), orderBy('year', 'desc'));
  experienceSub.value = onSnapshot(q, (snapshot) => {
    experiences.value = snapshot.docs.map((doc) => doc.data());
  });
}

function _getEducation() {
  let q = query(collection($firestore, "education"), orderBy('year', 'desc'));
  educationSub.value = onSnapshot(q, (snapshot) => {
    education.value = snapshot.docs.map((doc) => doc.data());
  });
}

onUnmounted(() => {
  experienceSub.value()
})

onMounted(() => {
  _getPosts();
  _getExpriences();
  _getEducation();
});
</script>

<template>
  <div class="flex flex-col gap-[20vh]">
    <span class="text-[54px] leading-[60px] font-myriad-bold">
      I am a reliable, hardworking,<br />
      and creative problem solver. I enjoy the process of researching target audiences and
      finding suitable promotional tools to reach them.
    </span>

    <section class="flex gap-x-9 relative">
      <div class="flex-1">
        <img
          src="~/assets/images/eva-guinness.jpeg"
          alt="Eva portfolio image"
          class="w-full sticky top-[65px]"
        />
      </div>
      <div class="flex flex-col gap-y-3 max-w-[34.7%]">
        <h3 class="font-bold tracking-wide">Marketing, promotion & creative design</h3>

        <p class="font-myriad-light text-[14px]">
          Hi, I’m Eva, 22, and a third-year bachelor's student in International
          Communication. This is a four-year program, where I’ve been trained in
          target-market segmentation, promotion, public relations, and the general
          principles of the marketing discipline. My third year consists of a minor abroad
          and an internship. I’m currently finishing my minor in arts in mass
          communication at the University of Dar es Salaam, Tanzania. I decided to partake
          in a variety of extra courses such as African contemporary art, philosophy of
          religion, and literature. I’ve always liked to indulge myself in arts and
          culture so I’m happy to be exploring that through my education as well.
        </p>

        <p class="font-myriad-light text-[14px]">
          Check out my <a href="#portfolio" class="underline">Portfolio</a> to see my most
          recent projects. During my time in Dar es Salaam, Tanzania, I got introduced to
          the newest generation of visionaries in the creative art scene. Amongst them,
          the <a href="https://www.merakirepp.com" target="_blank" class="underline">Meraki Collective</a>. I have
          been able to assist them in the realization of their goal to promote African
          arts and culture to international audiences through branding & web design.
        </p>

        <div id="past-experiences" class="flex items-center mt-[10vh]">
          <h3 class="font-bold tracking-wide">Past experiences.</h3>
          <AddExperience />
        </div>
        <hr class="border-gray-100 mb-3" />

        <div class="flex flex-col">
          <Experience v-for="experience in experiences" :experience="experience" :key="experience.id" />
        </div>

        <div id="education" class="flex items-center mt-[10vh]">
          <h3 class="font-bold tracking-wide">Education.</h3>
          <AddEducation />
        </div>
        <hr class="border-gray-100 mb-3" />

        <div class="flex flex-col">
          <Education v-for="edu in education" :education="edu" :key="edu.id" />
          <!-- <Education v-for="index in 7" :k ey="index" /> -->
        </div>

        

        <h3 id="portfolio" class="font-bold tracking-wide mt-[10vh]">Portfolio.</h3>
        <hr class="border-gray-100 mb-3" />

        <p class="font-myriad-light text-[14px]">
          I’m always exited about new projects or experiences. Anything related to Arts
          and culture will catch my attention. I believe that exposure to new and diverse
          perspectives enriches my life and helps me better understand the complexities of
          society. Therefore, I actively seek out opportunities that allow me to engage
          with different cultures, learn new skills, and broaden my understanding of the
          world.
        </p>
      </div>
    </section>

    <section class="flex gap-x-9 relative">
      <div class="w-full max-w-[65.3%]">
        <ArticlePost
          class="border-t-[1px] border-[#e3e3e370]"
          v-for="(post, index) in posts"
          :post="post"
          :key="index"
        />
      </div>

      <div></div>
    </section>

    <section id="contact" class="flex flex-col items-center max-w-[65.3%]">
      <span class="text-[180px] font-myriad-bold">Contact.</span>
      <div class="flex flex-col">
        <a href="mailto:evahijstek@gmail.com" class="my-[7vh] text-2xl font-bold tracking-wider"
          >EvaHijstek@gmail.com</a
        >
        <span class="font-myriad-bold text-xl">Social</span>
        <a class="">LinkedIn</a>
        <a class="">Instagram</a>
        <a class="">Facebook</a>
      </div>
    </section>
  </div>
</template>
