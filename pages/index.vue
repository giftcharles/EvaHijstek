<script setup lang="ts">
import { useIntersectionObserver } from "@vueuse/core";
import { collection, getDocs, onSnapshot, orderBy, query } from "firebase/firestore";
import gsap from "gsap";

definePageMeta({
  layout: "default",
});

const loggedIn = useState("loggedIn");
const { $firestore } = useNuxtApp();
const posts = ref<any[]>([]);
const articles_html = ref();
const experiences_html = ref();
const education_html = ref();

function onEnter(el, done) {
  gsap.to(el, {
    delay: el.dataset.index * 0.15,
    onComplete: done,
  });
}

function _getPosts() {
  let q = query(collection($firestore, "articles"), orderBy("date", "desc"));
  getDocs(q).then((snapshot) => {
    posts.value = snapshot.docs.map((doc) => doc.data());
  });
}

function _getExpriences() {
  let q = query(collection($firestore, "experiences"), orderBy("year", "desc"));
  return getDocs(q).then(snapshot => {
     return snapshot.docs.map((doc) => doc.data());
  });
}

function _getEducation() {
  let q = query(collection($firestore, "education"), orderBy("year", "desc"));
  return getDocs(q).then(snapshot => {
     return snapshot.docs.map((doc) => doc.data());
  });
}

onMounted(async () => {
  createObserver(articles_html.value, _getPosts);
  const { data: experiences } = await useAsyncData("experiences", _getExpriences());
  const { data: education } = await useAsyncData("education", _getEducation());
});

function createObserver(target: any, callback) {
  useIntersectionObserver(target, ([{ isIntersecting }], observerElement) => {
    if (isIntersecting) {
      callback();
    }
  });
}
</script>

<template>
  <div class="flex flex-col md:gap-[20vh] gap-[10vh]">
    <span
      class="md:text-[54px] text-[34px] md:leading-[60px] leading-[40px] font-myriad-bold"
    >
      I am a reliable, hardworking,<br />
      and creative problem solver. I enjoy the process of researching target audiences and
      finding suitable promotional tools to reach them.
    </span>

    <section class="flex flex-col md:flex-row gap-9 relative">
      <div class="flex-1">
        <img
          src="~/assets/images/eva-guinness.jpeg"
          alt="Eva portfolio image"
          class="w-full sticky top-[65px]"
        />
      </div>
      <div class="flex flex-col gap-y-3 md:max-w-[34.7%]">
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
          the
          <a
            href="https://evahijstek.web.app/blog/creating_conversatio_75095232"
            class="underline"
            >Meraki Collective</a
          >. I have been able to assist them in the realization of their goal to promote
          African arts and culture to international audiences through branding & web
          design.
        </p>

        <div id="past-experiences" class="flex items-center mt-[10vh]">
          <h3 class="font-bold tracking-wide">Past experiences.</h3>
          <AddExperience />
        </div>
        <hr class="border-gray-100 mb-3" />

        <TransitionGroup
          ref="experiences_html"
          name="articles"
          class="flex flex-col"
          tag="div"
          @enter="onEnter"
        >
          <Experience
            v-for="(experience, index) in experiences"
            :experience="experience"
            :key="experience.id"
            :data-index="index"
          />
        </TransitionGroup>

        <div id="education" class="flex items-center mt-[10vh]">
          <h3 class="font-bold tracking-wide">Education.</h3>
          <AddEducation />
        </div>
        <hr class="border-gray-100 mb-3" />

        <TransitionGroup
          ref="education_html"
          class="flex flex-col"
          name="articles"
          tag="div"
          @enter="onEnter"
        >
          <Education
            v-for="(edu, index) in education"
            :education="edu"
            :key="edu.id"
            :data-index="index"
          />
        </TransitionGroup>

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

    <section ref="articles_html" class="flex gap-x-9 relative">
      <TransitionGroup
        name="articles"
        class="w-full md:max-w-[65.3%]"
        tag="div"
        @enter="onEnter"
      >
        <ArticlePost
          class="border-t-[1px] border-[#e3e3e370]"
          v-for="(post, index) in posts"
          :post="post"
          :data-index="index"
          :key="index"
        />
      </TransitionGroup>

      <div></div>
    </section>

    <section id="contact" class="flex flex-col items-center md:max-w-[65.3%]">
      <span class="md:text-[180px] text-[84px] font-myriad-bold">Contact.</span>
      <div class="flex flex-col">
        <a
          href="mailto:evahijstek@gmail.com"
          class="my-[7vh] text-2xl font-bold tracking-wider"
          >EvaHijstek@gmail.com</a
        >
        <span class="font-myriad-bold text-xl">Social</span>
        <a
          target="_blank"
          href="https://nl.linkedin.com/in/eva-hijstek-ab0378194"
          class=""
          >LinkedIn</a
        >
        <a target="_blank" href="https://www.instagram.com/evahstk/" class=""
          >Instagram</a
        >
        <a target="_blank" href="https://facebook.com/eva.hijstek.1/" class=""
          >Facebook</a
        >
      </div>
    </section>
  </div>
</template>
