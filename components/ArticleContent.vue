<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    content?: string;
  }>(),
  {
    content: "",
  }
);

const content = ref(props.content)

watch(() => props.content, () => {
    console.log(props.content)
    content.value = props.content
})

</script>

<template>
    <div class="">
        <InputTextEditor v-model="content" />
    </div>
</template>