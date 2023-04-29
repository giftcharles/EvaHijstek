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
    class="flex py-6 hover:bg-white group md:pr-6"
  >
    <div
      class="overflow-hidden max-h-[115px] md:max-h-[215px] md:max-w-[215px] max-w-[115px] mx-4 md:mx-10 flex items-center justify-center"
    >
      <img :src="props.post.featured_image" class="w-full" alt="article image" />
    </div>

    <div class="flex flex-col flex-1">
      <span class="group-hover:text-black text-lg md:text-xl font-semibold">
        {{ props.post.title }}
      </span>
      <span class="group-hover:text-black">
        {{ props.post.client }}
      </span>
      <span class="md:mt-7 mt-3 group-hover:text-black">
        {{ props.post.date.toDate().toDateString() }} | {{ props.post.slug_text }}
      </span>
    </div>
  </NuxtLink>
</template>
