<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    experience?: any;
  }>(),
  {
    experience: null,
  }
);
const editingExperience = useState('exp_edit', () => null)
const loggedIn = useState('loggedIn')
function openExperienceModal() {
    editingExperience.value = JSON.parse(JSON.stringify(props.experience))
    document.getElementById("experienced-modal").click();
}
</script>

<template>
  <div v-if="props.experience" class="flex wrap break-words p-3 bg-transparent items-start">
    <div class="w-24">
      <span class="italic text-white font-myriad-light">{{
        props.experience.year === new Date().getFullYear()
        ? "Current"
        : props.experience.year
    }}</span>
    </div>
    <div class="flex flex-col flex-1">
      <span class="text-xl font-semibold" v-if="!!props.experience.title">{{ props.experience.title }}</span>
      <span class="font-myriad-light" v-if="!!props.experience.location">{{ props.experience.location }}</span>
      <span class="font-myriad-light" v-if="!!props.experience.activities && props.experience.activities.length > 0"
        >Activities: {{ props.experience.activities.join(", ") }}</span
      >
      <span class="mt-3 font-myriad-light break-words text-sm" v-if="!!props.experience.website">{{ props.experience.website }}</span>
    </div>

    <button @click="openExperienceModal" v-if="loggedIn" class="ml-auto">
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
