<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    post?: any;
  }>(),
  {
    post: null,
  }
);
</script>

<template>
  <NuxtLink
    :to="`/blog/${props.post.slug}`"
    href="#"
    class="flex py-6 hover:bg-white transition-all group md:pr-6 group"
  >
    <div
      class="overflow-hidden max-h-[115px] md:max-h-[215px] md:w-[215px] w-[115px] mx-4 md:mx-10 flex items-center justify-center"
    >
      <img
        :src="props.post.featured_image"
        class="w-full group-hover:scale-110 transition-all duration-500"
        alt="article image"
      />
    </div>

    <div class="flex flex-col flex-1">
      <span
        class="group-hover:text-black transition-all text-lg md:text-xl font-semibold"
      >
        {{ props.post.title }}
      </span>
      <span class="group-hover:text-black transition-all">
        {{ props.post.client }}
      </span>
      <span class="md:mt-7 mt-3 group-hover:text-black transition-all">
        {{ props.post.date.toDate().toDateString() }} | {{ props.post.slug_text }}
      </span>

      <div class="md:flex flex-col hidden mt-9 flex-0">
        <div class="flex items-center gap-4">
          <span class="group-hover:text-black transition-all">Read more</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            class="w-6 h-6 group-hover:stroke-black stroke-white transition-all"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
            />
          </svg>
        </div>
        <div class="h-[1px] group-hover:w-full w-0 transition-[width] duration-[2s] mt-3 max-w-[110px] bg-white group-hover:bg-black"></div>
      </div>
    </div>
  </NuxtLink>
</template>
