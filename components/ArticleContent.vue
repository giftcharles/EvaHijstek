<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    content?: string;
  }>(),
  {
    content: "",
  }
);
const route = useRoute()

onMounted(() => {
  if(route.query.new) {
    showEditor.value = true
  }
})
const article = inject("article");
const showEditor = useState("show_editor", () => false);
const loggedIn = useState("loggedIn");
const content = ref(article.value.content);
function toggleEditor() {
  showEditor.value = !showEditor.value 
}

watch(
  () => article.value.content,
  () => {
    content.value = article.value.content;
  }
);
</script>

<template>
  <div class="relative">
    <InputTextEditor v-if="loggedIn && showEditor" :content="content" />
    <div v-html="content" v-else class="prose max-w-none"></div>
    <button
      v-if="loggedIn && !showEditor"
      tabindex="0"
      class="bg-transparent rounded-full absolute -right-3 top-3"
      @click="showEditor = true"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="white"
        class="w-4 h-4"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
        />
      </svg>
    </button>
  </div>
</template>
