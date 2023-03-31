<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    content?: string;
  }>(),
  {
    content: "",
  }
);
const article = inject('article')
const loggedIn = useState('loggedIn')
const content = ref(article.value.content) 
watch(() => article.value.content, () => {
    content.value = article.value.content
})
</script>

<template>
    <div class="">
        <InputTextEditor v-if="loggedIn" :content="content" />
        <div v-html="content" v-else class="prose max-w-none"></div>
    </div>
</template>