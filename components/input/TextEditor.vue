<script setup lang="ts">
import { QuillEditor } from "@vueup/vue-quill";
import "@vueup/vue-quill/dist/vue-quill.snow.css";
import { getDownloadURL, uploadBytesResumable, ref as StorageRef } from 'firebase/storage'

const props = withDefaults(
  defineProps<{
    variant?: string;
    label?: string;
    placeholder?: string;
    classes?: string;
    modelValue?: string;
    toolbar?: string;
    content?: string;
    inputType?: string;
  }>(),
  {
    variant: "",
    label: "",
    placeholder: "",
    classes: "",
    modelValue: "",
    toolbar: "",
    content: "",
  }
);
const emit = defineEmits(["update:modelValue", "save"]);
const editor = ref<HTMLElement | null>(null);
const saver = inject("save");
const showEditor = useState("show_editor", () => false);
const {$storage} = useNuxtApp()
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

watch(
  () => props.content,
  () => {
    if (props.content.length > 0 && !showEditor) editor.value!.setHTML(props.content);
  }
);

const options = ref({
  modules: {
    toolbar: {
      container: toolbar,
      handlers: {
        image: () => {
          document.getElementById("file").click();
        },
        save: () => {
          saver(editor.value.getHTML());
          showEditor.value = false;
        },
      },
    },
  },
});

function quillReady() {
  editor.value!.setHTML(props.modelValue);
  if (props.content.length > 0) editor.value!.setHTML(props.content);
  document.getElementsByClassName("ql-save")[0].textContent = "Save";
}

function updateContent() {
  emit("update:modelValue", editor.value.getHTML());
  saver(editor.value.getHTML());
}

function uploadFunction(e) {
  _uploadFileToStorage(e.target.files[0]);
}

function _uploadFileToStorage(f: File) {
  console.log(editor.value.getEditor())
  const storageRef = StorageRef(
    $storage,
    `images/blog/${f.name.replace(".", "")}-${Date.now()}.${f.name.split(".").pop()}`
  );

  const uploadTask = uploadBytesResumable(storageRef, f);

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      _uploadFileToStorage(f);
    },
    () => {
      return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        const range = editor.value.getQuill() .selection.savedRange;
        editor.value.getQuill().insertEmbed(
          range.index,
          "image",
          downloadURL
        );
      });
    }
  );
}
</script>

<template>
  <div class="bg-transparent flex rounded-lg">
    <div class="flex flex-col w-full">
      <input type="file" @change="uploadFunction" id="file" hidden />
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
