<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    education?: any;
  }>(),
  {
    education: null,
  }
);
const loggedIn = useState("loggedIn");
const editingEducation = useState("edu_edit", () => null);
function openEducationModal() {
  editingEducation.value = JSON.parse(JSON.stringify(props.education));
  document.getElementById("education-modal").click();
}
</script>

<template>
  <div v-if="props.education" class="flex p-3 bg-transparent items-start">
    <div class="w-24">
      <span class="italic text-white font-myriad-light">{{
        props.education.year === new Date().getFullYear()
          ? "Current"
          : props.education.year
      }}</span>
    </div>
    <div class="flex flex-col flex-1">
      <span class="text-xl font-semibolsd" v-if="!!props.education.title">{{
        props.education.title
      }}</span>
      <span class="font-myriad-light" v-if="!!props.education.level">{{
        props.education.level
      }}</span>
      <span class="font-myriad-light" v-if="!!props.education.credential">{{
        props.education.credential
      }}</span>
      <span class="font-myriad-light" v-if="!!props.education.institution"
        >Educational Institution : {{ props.education.institution }}</span
      >
      <span class="font-myriad-light" v-if="!!props.education.country"
        >Country {{ props.education.country }}</span
      >
      <span class="mt-3 font-myriad-light" v-if="props.education.extra"
        >Extra: {{ props.education.extra }}</span
      >
    </div>

    <button @click="openEducationModal" v-if="loggedIn" class="ml-auto">
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
