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
          Check out my Portfolio to see my most recent projects. During my time in Dar es
          Salaam, Tanzania, I got introduced to the newest generation of visionaries in
          the creative art scene. Amongst them, the Meraki Collective. I have been able to
          assist them in the realization of their goal to promote African arts and culture
          to international audiences through branding & web design.
        </p>

        <a href="#past-expiriences" class="hidden"></a>
        <h3 class="font-bold tracking-wide mt-[10vh]">Past experiences.</h3>
        <hr class="border-gray-100 mb-3" />

        <div class="flex flex-col">
          <Experience v-for="index in 6" :key="index" />
        </div>

        <a id="education" class="hidden"></a>
        <h3 class="font-bold tracking-wide mt-[10vh]">Education.</h3>
        <hr class="border-gray-100 mb-3" />

        <div class="flex flex-col">
          <Education v-for="index in 7" :key="index" />
        </div>

        <h3 class="font-bold tracking-wide mt-[10vh]">Portfolio.</h3>
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
          v-for="index in 7"
          :key="index"
        />
      </div>

      <div></div>
    </section>

    <section class="flex flex-col items-center max-w-[65.3%]">
      <a id="#contact" class="hidden"></a>
      <span class="text-[180px] font-myriad-bold">Contact.</span>
      <div class="flex flex-col">
      <span class="my-[7vh] text-2xl font-bold tracking-wider">EvaHijstek@gmail.com</span>
        <span class="font-myriad-bold text-xl">Social</span>
        <a class="">LinkedIn</a>
        <a class="">Instagram</a>
        <a class="">Facebook</a>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  layout: "default",
});
</script>
