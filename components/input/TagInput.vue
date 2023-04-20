<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    variant?: string;
    label?: string;
    icon?: string;
    placeholder?: string;
    classes?: string;
    modelValue?: string[];
  }>(),
  {
    variant: "",
    label: "",
    icon: "",
    placeholder: "",
    classes: "",
    modelValue: () => [],
  }
);
const emit = defineEmits(["update:modelValue"]);
const input = ref<HTMLInputElement | null>(null);
const tags = ref<string[]>(props.modelValue);
watch(tags, (v) => {
  emit("update:modelValue", tags.value);
});
function inputKeyDown(e: any) {
  if (["Enter", "Tab"].includes(e.key)) {
    if (!e.target.value || e.target.value.length === 0) return;
    tags.value = [...tags.value, e.target.value];
    e.target.value = "";
    e.preventDefault();
  }
}

function removeTag(tag: string) {
  tags.value = tags.value.filter((t) => t !== tag);
}
</script>

<template>
  <div class="relative cursor-pointer" @click="$refs.input.focus()">
    <div v-if="props.variant == 'outline' || !props.variant" class="w-full">
      <div
        :class="props.icon ? 'pl-13' : ''"
        class="flex flex-col w-full border border-[#CFD3D5] shadow-sm hover:bg-gray-50 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100 bg-white px-4.6 py-3.2"
      >
        <span class="text-sm">{{ props.label }}</span>
        <div class="flex flex-wrap gap-1 mt-2">
          <transition-group
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
            class=""
          >
            <a
              v-for="(tag, index) in tags"
              :key="index"
              class="bg-indigo-700 hover:bg-base-300 text-white py-1 px-3 text-sm flex"
              @click.stop="removeTag(tag)"
            >
              <span class="mr-2">{{ tag }}</span>
              <!-- TODO: <Icon icon="CloseSvg" icon-position="left" class="w-5 h-5" /> -->
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </a>
          </transition-group>
          <input
            ref="input"
            :placeholder="props.placeholder"
            :label="props.label"
            class="text-sm text-gray-400 focus:outline-none bg-transparent pl-2"
            type="text"
            :class="classes"
            @keydown="inputKeyDown"
          />
        </div>
      </div>
    </div>
    <div
      v-if="props.variant == 'solo'"
      class="bg-gray-100 p-[8px] px-[22px] flex gap-x-4.6"
    >
      <Icon v-if="props.icon" icon-position="left" :icon="props.icon" class="mt-3" />
      <div class="flex flex-col w-full">
        <span class="text-sm">{{ props.label }}</span>
        <div class="flex flex-wrap gap-1 mt-2">
          <button
            v-for="(tag, index) in tags"
            :key="index"
            class="bg-black hover:bg-gray-800 text-white py-1 px-3 text-sm flex"
            @click.stop="removeTag(tag)"
          >
            <span class="mr-2">{{ tag }}</span>
            <!-- TODO: <Icon icon="CloseSvg" icon-position="left" class="w-5 h-5" /> -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-5 h-5"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          <input
            ref="input"
            :placeholder="props.placeholder"
            :label="props.label"
            class="gap-3 items-center justify-center placeholder-gray-300::placeholder text-sm text-gray-400 outline-none bg-transparent pt-1"
            type="text"
            :class="classes"
            @keydown="inputKeyDown"
          />
        </div>
      </div>
    </div>
  </div>
</template>
