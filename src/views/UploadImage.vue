<template>
  <h1>Upload image</h1>
  <input @change="inputChange" ref="imgInput" accept="image/*" type="file" />
  <img :src="imgUrl" alt="user's image" />
  <button @click="handleUpload">Upload</button>
  <button @click="handleDelete">Delete</button>
  <button @click="handleGetmeta">gethandleGetmeta</button>
  <button @click="showuser">show user</button>
  <Suspense>
    <Xray />
    <template #fallback>
      <span style="background-color: red"> Loading xray </span>
    </template>
  </Suspense>
</template>

<script setup>
import Xray from '../components/Xray.vue'
import { onMounted, ref } from 'vue'
import { getMeta, uploadImage, del } from '@/firebase/storageCreateRef'
import getCurrentUser from '@/firebase/getCurrentUser'

const imgInput = ref(null)
const imgUrl = ref('')

function inputChange(event) {
  const [file] = imgInput.value.files
  console.log(file)
  if (file) {
    imgUrl.value = URL.createObjectURL(file)
  } else {
    imgUrl.value = ''
  }
}

function handleUpload() {
  const [file] = imgInput.value.files
  uploadImage(file)
  // getMeta();
}

function handleDelete() {
  del();
}

function handleGetmeta() {
  getMeta();
}

async function showuser() {
  const cu = await getCurrentUser()
  console.log(cu.displayName);
}

</script>
