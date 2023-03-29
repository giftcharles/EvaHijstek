<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
const props = withDefaults(
  defineProps<{
    variant?: string;
    label?: string;
    placeholder?: string;
    classes?: string;
    modelValue?: string;
    toolbar?: string;
    inputType?: string
  }>(),
  {
    variant: "",
    label: "",
    placeholder: "",
    classes: "",
    modelValue: "",
    toolbar: "",
  }
);
const emit = defineEmits(["update:modelValue"]);
const editor = ref<HTMLElement | null>(null);
const save = inject('save')
const toolbar = ref([
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  [{ size: ["small", false, "large", "huge"] }],
  [
    "bold",
    "italic",
    "underline",
    "strike",
    { list: "bullet" },
    { list: "ordered" },
    "code",
    "link",
    "blockquote",
    "image",
    "save",
  ],
]);

const options = ref({
  modules: {
    toolbar: {
      container: toolbar,
      handlers: {
        save: () => {
          save(editor.value.getHTML())
        }
      },
    },
  },
});

function quillReady() {
  editor.value!.setHTML(props.modelValue);
  document.getElementsByClassName("ql-save")[0].textContent = "Save";
}

function updateContent() {
  emit("update:modelValue", editor.value.getHTML());
  save(editor.value.getHTML())
}
</script>
<template>
  <div class="bg-transparent flex rounded-lg">
    <div class="flex flex-col w-full">
      <client-only
        ><QuillEditor
          ref="editor"
          :options="options"
          :placeholder="props.placeholder"
          :class="[props.classes]"
          class="w-full rounded-lg placeholder-gray-400::placeholder min-h-[250px]"
          @ready="quillReady"
          @update:content="updateContent"
      /></client-only>
    </div>
  </div>
</template>

<style>
.ql-toolbar.ql-snow,
.ql-container.ql-snow,
.ql-snow .ql-picker-options {
  border: none !important;
}

.ql-toolbar .ql-stroke {
  fill: none;
  stroke: #fff;
}

.ql-snow .ql-picker-options {
  background-color: #3d3dfc;
}

.ql-toolbar .ql-fill {
  fill: #fff;
  stroke: none;
}

.ql-snow.ql-toolbar button:hover,
.ql-snow .ql-toolbar button:hover,
.ql-snow.ql-toolbar button:focus,
.ql-snow .ql-toolbar button:focus,
.ql-snow.ql-toolbar .ql-picker-label:hover,
.ql-snow .ql-toolbar .ql-picker-label:hover,
.ql-snow.ql-toolbar .ql-picker-item:hover,
.ql-snow .ql-toolbar .ql-picker-item:hover {
  background-color: #3d3dfc;
}

.ql-toolbar .ql-picker {
  color: #fff;
}

.ql-editor,
.ql-toolbar.ql-snow {
  padding-left: 0;
  padding-right: 0;
}

button.ql-save {
  width: auto !important;
  display: flex;
}
</style>
