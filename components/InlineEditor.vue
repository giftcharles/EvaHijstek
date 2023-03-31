<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    inputType?: string;
    label?: string;
    value?: string;
    modelValue?: string;
    items?: string[];
    options?: any[] | boolean;
    allowCustom?: boolean;
    showCount?: boolean;
  }>(),
  {
    inputType: "text",
    value: "text",
    label: "text",
    modelValue: "",
    items: () => [],
    options: false,
    allowCustom: true,
    showCount: false,
  }
);

const emit = defineEmits(["update:modelValue"]);
const tags = ref<any[]>(props.inputType == "tags" ? props.items : []);
const loggedIn = useState('loggedIn')
function selectChange(event) {
  emit("update:modelValue", event.target.value);
}

watch(tags, () => {
  emit("update:modelValue", tags.value);
});

function save($event) {
  try {
    emit('update:modelValue', input.value.target.value)
  } catch (error) {
    emit('update:modelValue', tags.value)
  }
} 
</script>

<template>
  <div class="flex">
    <slot />
    <div class="w-3" v-if="loggedIn"></div>
    <div class="dropdown dropdown-left" v-if="loggedIn">
      <button tabindex="0" class="bg-transparent rounded-full" @click="">
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
      <div tabindex="0" class="dropdown-content w-64 shadow bg-primary text-black">
        <div class="p-3">
          <span class="text-sm text-gray-500 capitalize leading-loose">{{
            props.label
          }}</span>
          <div v-if="!props.inputType || props.inputType == 'text'">
            <input
              ref="input"
              :value="props.modelValue"
              @change="$emit('update:modelValue', $event.target.value)"
              type="text"
              class="bg-gray-200 w-full outline-none text-black"
              autofocus
            />
          </div>
          <div v-if="props.inputType == 'textarea'">
            <textarea
              ref="input"
              :value="props.modelValue"
              @change="$emit('update:modelValue', $event.target.value)"
              class="bg-gray-200 w-full outline-none text-black"
              autofocus
            ></textarea>
          </div>

          <div v-if="props.inputType == 'select'">
            <select
              ref="input"
              autofocus
              @change="$emit('update:modelValue', $event.target.value)"
              value=""
              multiple
            >
              <option v-for="option in props.items" :key="option"></option>
            </select>
          </div>

          <div v-if="props.inputType == 'tag'">
            <InputTagInput
              ref="input"
              v-model="tags"
              :options="props.options"
              :allowCustom="props.allowCustom"
              :showCount="props.showCount"
            ></InputTagInput>

            <!-- <vue3-tags-input :tags="props.options"
                   placeholder="enter some tags"
                   @on-tags-changed="$event => tags = $event"/> -->
          </div>

          <button
            class="btn btn-primary capitalize mt-2"
            @click="save"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
