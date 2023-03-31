<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    post?: any;
  }>(),
  {
    post: null
  }
);
</script>

<template>
  <a href="#" class="flex py-6 hover:bg-white group pr-6">
    <div
      class="overflow-hidden max-h-[215px] max-w-[215px] mx-10 flex items-center justify-center"
    >
      <img :src="props.post.featured_image" class="w-full" alt="aricle image" />
    </div>

    <div class="flex flex-col">
      <span class="group-hover:text-black text-xl font-semibold ">
        {{ props.post.title }}
        <!-- MARKETING AND PUBLICITY -->
        </span>
      <span class="group-hover:text-black">
        {{ props.post.client }}
        <!-- MERVKI Art Collective -->
        </span>
      <span
      class="mt-7 group-hover:text-black"
        >
        {{ props.post.date.toDate().toDateString() }} | {{ props.post.slug_text }}
        
        <!-- Wo 22 feb 2023 | Creating conversation through african fashion, visual art, music & lifestyle. -->
        </span
      >
    </div>
  </a>
</template>
