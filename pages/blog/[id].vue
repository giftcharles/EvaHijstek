<script setup lang="ts">
import { setDoc, doc, getDoc, deleteDoc } from "firebase/firestore";
import {
  uploadBytesResumable,
  ref as StorageRef,
  getDownloadURL,
} from "firebase/storage";

const route = useRoute();
const router = useRouter();
const { $firestore, $storage } = useNuxtApp();
const isNew = ref(false);
const imageInput = ref();
const loading_image = ref(false);
const loading = ref(false);
const loggedIn = useState("loggedIn");
const article = ref<any>({
  title: "<TITLE HERE>",
  client: "<CLIENT NAME HERE>",
  date: new Date(),
  slug_text: "<POST SLUG HERE>",
  website: "<WEBSITE>",
  content: "",
  snippet: "<Article snippet goes here>",
  functions: [],
  featured_image: null,
});

function _getPostArticle() {
  console.log(route.params.id);
  getDoc(doc($firestore, "articles", route.params.id))
    .then((doc) => {
      console.log(doc.data());
      article.value = doc.data();
    })
    .catch(console.error);
}

onMounted(() => {
  console.log("new", route.query);
  isNew.value = !!route.query.new;
  if (!isNew.value) _getPostArticle();
  article.value.date = new Date()
});

function saveContent(content: any) {
  article.value.content = content;
}

function save() {
  loading.value = true;
  let docRef: any = null;
  if (!route.query.new) {
    docRef = doc($firestore, "articles", route.params.id);
  } else {
    article.value.slug = article.value.slug_text
      .toLowerCase()
      .slice(0, 20)
      .replace(" ", "_")
      .replace(/\W/g, "");
    article.value.slug =
      article.value.slug +
      `_${Date.now().toString().slice(5, Date.now().toString().length)}`;
    docRef = doc($firestore, "articles", article.value.slug);
  }

  let data = {};

  Object.assign(data, article.value);

  console.log(data);

  return setDoc(docRef, data, { merge: true })
    .then(() => {
      loading.value = false;
      router.push({
        path: `/blog/${article.value.slug}`,
      });
    })
    .catch((error) => {
      alert("Something went wrong! Try again.");
      console.error(error);
      loading.value = false;
    });
}

async function imageInputChange(event) {
  const image = event.target.files[0];
  return _uploadFileToStorage(image);
}

function _uploadFileToStorage(f: File, depth = 0) {
  const storageRef = StorageRef($storage, `images/${f.name}-${Date.now()}`);

  const uploadTask = uploadBytesResumable(storageRef, f);

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      console.error(error);
      if (depth < 5)
        setTimeout(() => {
          _uploadFileToStorage(f, depth++);
        }, depth * 500);
    },
    () => {
      return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        article.value.featured_image = downloadURL;
        loading_image.value = false;
      });
    }
  );
}

function deletePost() {
  if (confirm("Are you sure you want to delete this?")) {
    loading.value = true
    deleteDoc(doc($firestore, 'articles', route.params.id))
    .then(() => {
      loading.value = false
      router.go(-1);
    })
    .catch((error) => {
      loading.value = false
      console.error(error)
    })
  }
}

function formatDate(date) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const day = date.getDate();
  const monthIndex = date.getMonth();
  const year = date.getFullYear();

  return `${day} ${months[monthIndex]} ${year}`;
}

provide("save", saveContent);
provide("article", article);
</script>

<template>
  <div class="flex flex-col gap-[20vh] mt-[27vh] w-full">
    <section class="flex gap-x-9 relative" v-if="article">
      <div class="flex-1">
        <div class="relative">
          <input type="file" ref="imageInput" @change="imageInputChange" class="hidden" />
          <img
            v-if="!isNew || article.featured_image"
            :src="article.featured_image"
            alt="Eva portfolio image"
            class="w-full"
          />
          <button
            v-else
            class="flex w-full items-center justify-center py-[10vh] bg-purple-500"
            @click="$refs.imageInput.click()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-12 h-12"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
              />
            </svg>
          </button>

          <button
            class="btn btn-ghost bg-transparent absolute top-3 right-3 rounded-full w-16 h-16"
            v-if="loggedIn && (!isNew || article.featured_image)"
            @click="$refs.imageInput.click()"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="white"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L6.832 19.82a4.5 4.5 0 01-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 011.13-1.897L16.863 4.487zm0 0L19.5 7.125"
              />
            </svg>
          </button>
        </div>

        <ArticleContent class="mt-8" :content="article.content" />
      </div>
      <div class="max-w-[34.7%] w-full" :key="article.title">
        <div class="flex flex-col sticky top-[104px]">
          <div class="flex items-center mb-2">
          <button 
          class="btn btn-ghost mr-1" @click="$router.go(-1)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
              />
            </svg>
          </button>
          <span class="font-bold tracking-wide text-[12px] font-myriad-light"
            >Portfolio Overview</span
          >

          <button
            v-if="!isNew && loggedIn"
            :disabled="loading || loading_image"
            @click="deletePost"
            class="btn btn-ghost rounded-none btn-error ml-auto"
          >
            <!-- delete button -->
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="red"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
              />
            </svg>
          </button>

          <button
            :disabled="loading || loading_image"
            v-if="loggedIn"
            @click="save"
          :class="[isNew ? 'ml-auto' : '']"
            class="btn btn-ghost rounded-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              v-if="!loading"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
              />
            </svg>

            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              v-else
              class="w-6 h-6 animate-spin"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
              />
            </svg>
          </button>

          <button
            :disabled="isNew"
            :class="[loggedIn ? '' : 'ml-auto']"
            class="btn btn-ghost rounded-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="w-6 h-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z"
              />
            </svg>
          </button>
        </div>
        <hr class="border-gray-300 mb-6" />
        <InlineEditor label="Title" v-model="article.title">
          <h4 :key="article.title" class="text-xl font-semibold tracking-wider">
            {{ article.title }}
          </h4>
        </InlineEditor>
        <InlineEditor label="Client" v-model="article.client">
          <span class="text-sm mb-8 font-myriad-light">{{ article.client }}</span>
        </InlineEditor>

        <InlineEditor label="slug" v-model="article.slug_text">
          <div class="mb-[7vh]">
            <span class="font-myriad-light">{{
              formatDate(article.date.toDate ? article.date.toDate() : new Date())
            }}</span>
            | <span class="mb-4">{{ article.slug_text }}</span>
          </div>
        </InlineEditor>
        <InlineEditor input-type="textarea" label="snippet" v-model="article.snippet">
          <p class="mb-6 font-myriad-light text-[14px]">
            {{ article.snippet }}
          </p>
        </InlineEditor>

        <InlineEditor
          input-type="tag"
          :options="['Hello', 'World']"
          :allowCustom="true"
          v-model="article.functions"
          label="function"
        >
          <span class="uppercase mb-2 font-myriad-light"
            >FUNCTION: <span class="ml-1">{{ article.functions.join(", ") }}</span></span
          >
        </InlineEditor>

        <InlineEditor v-model="article.website" label="website" class="">
          <span class="font-myriad-light">SITE: {{ article.website }}</span>
        </InlineEditor>
        </div>

      </div>
    </section>

    <section class="flex flex-col items-center max-w-[65.3%]"></section>
  </div>
</template>
