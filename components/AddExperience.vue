<script setup lang="ts">
import { doc, setDoc, collection, addDoc } from "firebase/firestore";

const { $firestore } = useNuxtApp();
const loggedIn = useState("loggedIn");
const form = ref({
  year: new Date().getFullYear(),
});
const cancel = ref();
const editingExperience = useState("exp_edit", () => null);
const errorMessage = ref(null);

watch(editingExperience, () => {
  if (!editingExperience.value) return;

  form.value = editingExperience.value;
});

function submit($event) {
  console.log(form.value);
  let docRef: any = collection($firestore, "experiences");
  errorMessage.value = null;
  const isNew = !!!form.value.id;
  console.log("isNew", isNew);
  if (!isNew) {
    docRef = doc($firestore, `experiences/${form.value.id}`);
    console.log("docRef", form.value.id);
  } else {
    form.value.id = docRef.id;
    form.value.time = new Date();
  }

  let data = {};
  let promise: any = null;
  Object.assign(data, form.value);

  Object.keys(data).forEach((k) => {
    if (typeof data[k] === "string" && data[k].charAt(0) == "<") {
      data[k] = "";
    }
  });

  console.log(data);

  if (!isNew) promise = setDoc(docRef, data, { merge: true });
  else
    promise = addDoc(docRef, data).then((FireDocRef) => {
      return setDoc(FireDocRef, { id: FireDocRef.id }, { merge: true });
    });

  return promise
    .then(() => {
      console.log("Experience: Success!");
      cancel.value.click();
    })
    .catch((error) => {
      errorMessage.value = "Something went wrong!";
      console.error(error);
    });
}

function close() {
  form.value = {
    year: new Date().getFullYear(),
  };
  editingExperience.value = null;
}
</script>

<template>
  <div class="ml-auto">
    <label
      tabindex="0"
      v-if="loggedIn"
      class="btn btn-ghost rounded-none"
      for="experienced-modal"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </label>

    <!-- Put this part before </body> tag -->
    <input type="checkbox" id="experienced-modal" class="modal-toggle" />
    <div class="modal">
      <form
        @submit.prevent="submit"
        class="modal-box rounded-none max-h-screen max-w-screen w-full h-screen"
      >
        <h3 class="font-bold mb-3 text-2xl tracki ng-widest">
          {{ editingExperience ? "Edit" : "New" }} Experience
          <span class="animate-pulse">🌱</span>
        </h3>
        <div class="flex flex-col gap-y-5">
          <span class="text-error text-center" v-if="errorMessage">{{
            errorMessage
          }}</span>
          <div class="flex flex-col">
            <label for="year">Year</label>
            <select class="text-black p-3 outline-none" id="year" v-model="form.year">
              <option
                v-for="i in new Date().getFullYear() - 1999"
                :value="new Date().getFullYear() - i + 1"
                class="text-black"
                :key="i"
              >
                {{ new Date().getFullYear() - i + 1 }}
              </option>
            </select>
          </div>

          <div class="flex flex-col">
            <label for="title">Title</label>
            <input
              type="text"
              id="title"
              class="text-black p-3 outline-none"
              v-model="form.title"
            />
          </div>

          <div class="flex flex-col">
            <label for="location">Location</label>
            <input
              type="text"
              id="location"
              class="text-black p-3 outline-none"
              v-model="form.location"
            />
          </div>

          <div class="flex flex-col">
            <label for="activities">Activities</label>
            <InputTagInput
              :key="form"
              type="text"
              id="activities"
              class="text-black outline-none"
              v-model="form.activities"
              :options="form.activities"
            />
          </div>

          <div class="flex flex-col">
            <label for="website">Website</label>
            <input
              type="text"
              id="website"
              placeholder="http://"
              class="text-black p-3 outline-none"
              v-model="form.website"
            />
          </div>
        </div>
        <div class="modal-action">
          <label
            ref="cancel"
            for="experienced-modal"
            @click="close"
            class="btn btn-error mr-1"
            >Cancel</label
          >
          <button class="btn" type="submit">Save</button>
        </div>
      </form>
    </div>
  </div>
</template>
