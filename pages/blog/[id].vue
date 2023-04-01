<script setup lang="ts">
import { setDoc, doc, getDoc } from "firebase/firestore";
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
const loadind_image = ref(false);
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
});

function saveContent(content: any) {
  article.value.content = content;
}

function save() {
  let docRef = doc($firestore, "articles", article.value.slug);
  if (!route.query.new) {
    docRef = doc($firestore, "articles", route.params.id);
  }
  else {
    article.value.slug = article.value.slug_text
      .toLowerCase()
      .slice(0, 20)
      .replace(" ", "_")
      .replace(/\W/g, "");
    article.value.slug =
      article.value.slug +
      `_${Date.now().toString().slice(5, Date.now().toString().length)}`;

  }

  let data = {};

  Object.assign(data, article.value);

  return setDoc(docRef, data, { merge: true })
    .then(() => {
      router.push({
        path: `/blog/${article.value.slug}`,
      });
    })
    .catch(console.error);
}

function imageInputChange(event) {
  const image = event.target.files[0];
  return _uploadFileToStorage(image);
}

function _uploadFileToStorage(f: File) {
  const storageRef = StorageRef($storage, `images/${f.name}-${Date.now()}`);

  const uploadTask = uploadBytesResumable(storageRef, f);

  uploadTask.on(
    "state_changed",
    (snapshot) => {},
    (error) => {
      _uploadFileToStorage(f);
    },
    () => {
      return getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        article.value.featured_image = downloadURL;
        loadind_image.value = false;
      });
    }
  );
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
      <div class="flex flex-col gap-y-3 max-w-[34.7%] w-full">
        <div class="flex items-center">
          <button class="btn btn-ghost mr-1">
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
          <span class="font-bold tracking-wide">Portfolio Overview</span>

          <button v-if="loggedIn" @click="save" class="btn btn-ghost ml-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              xmlns:xlink="http://www.w3.org/1999/xlink"
              fill="#fff"
              version="1.1"
              id="Capa_1"
              width="24px"
              height="24px"
              viewBox="0 0 407.096 407.096"
              xml:space="preserve"
            >
              <g>
                <g>
                  <path
                    d="M402.115,84.008L323.088,4.981C319.899,1.792,315.574,0,311.063,0H17.005C7.613,0,0,7.614,0,17.005v373.086    c0,9.392,7.613,17.005,17.005,17.005h373.086c9.392,0,17.005-7.613,17.005-17.005V96.032    C407.096,91.523,405.305,87.197,402.115,84.008z M300.664,163.567H67.129V38.862h233.535V163.567z"
                  />
                  <path
                    d="M214.051,148.16h43.08c3.131,0,5.668-2.538,5.668-5.669V59.584c0-3.13-2.537-5.668-5.668-5.668h-43.08    c-3.131,0-5.668,2.538-5.668,5.668v82.907C208.383,145.622,210.92,148.16,214.051,148.16z"
                  />
                </g>
              </g>
            </svg>
          </button>

          <button
            :disabled="isNew"
            :class="loggedIn ? '' : 'ml-auto'"
            class="btn btn-ghost"
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
        <hr class="border-gray-100 mb-3" />
        <InlineEditor label="Title" v-model="article.title">
          <h4>{{ article.title }}</h4>
          <!-- <h4>MARKETING & PUBLICITY</h4> -->
        </InlineEditor>
        <InlineEditor label="Client" v-model="article.client">
          <span>{{ article.client }}</span>
          <!-- <span>MERVKI Art Collective</span> -->
        </InlineEditor>
        <span>{{ formatDate(new Date()) }}</span>
        <!-- <span>22 feb 2023</span> -->
        <InlineEditor label="slug" v-model="article.slug_text">
          <span class="mb-6">{{ article.slug_text }}</span>
          <!-- <span class="mb-6"
            >Creating conversation through african fashion, visual art, music &
            lifestyle.</span
          > -->
        </InlineEditor>
        <InlineEditor input-type="textarea" label="snippet" v-model="article.snippet">
          <p>
            {{ article.snippet }}
          </p>
          <!-- <p>
            During my time in Dar es Salaam, Tanzania, I got introduced to the newest
            generation of visionaries in the creative art scene. Amongst the designers,
            visual artists, and musicians I met, a particular group of Tanzanian
            practitioners stood out: a collective known as "Meraki". Their name means; to
            do something with soul, creativity, and love; To put pieces of yourself in
            your work. <br /><br />
            At their archival exhibition at the Nafasi artspace, I came to talk to the
            creative director and founder of the collective; Emmanuel Tchawi. Since then,
            we have had a mutually-beneficial partnership and I have been able to learn
            and grow professionally alongside Meraki
          </p> -->
        </InlineEditor>

        <InlineEditor
          input-type="tag"
          :options="['Hello', 'World']"
          :allowCustom="true"
          v-model="article.functions"
          label="function"
        >
          <!-- <span>FUNCTION: MARKETING, ROMOTION, WEB DESIGN</span> -->
          <!-- <span>FUNCTION: <span v-for="func in article.functions" :key="func"> {{ func }}</span></span> -->
          <span class="uppercase"
            >FUNCTION: <span class="ml-1">{{ article.functions.join(", ") }}</span></span
          >
        </InlineEditor>

        <InlineEditor v-model="article.website" label="website">
          <span>SITE: {{ article.website }}</span>
        </InlineEditor>

        <div class="flex"></div>
      </div>
    </section>

    <section class="flex flex-col items-center max-w-[65.3%]"></section>
  </div>
</template>
