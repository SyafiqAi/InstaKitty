<template>
  <h1>Upload image</h1>
  <div>
    <button @click="handleDelete">Delete</button>
    <button @click="handleGetmeta">gethandleGetmeta</button>
    <button @click="showuser">show user</button>
    <button @click="uploadText">upload text only</button>
  </div>
  
  <input @change="imageInputChange" ref="imgInput" accept="image/*" type="file" />
  <input @input="textInputChange" type="text" placeholder="title" v-model="postTitle"/>
  <img :src="imgUrl" alt="user's image" />
  <button @click="handleUpload">Upload</button>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { getMeta, uploadImage, deleteImage } from '@/firebase/storageCreateRef'
import getCurrentUser from '@/firebase/getCurrentUser'
import uploadPost from '@/firebase/firestore/addDocument.js'

const postTitle = ref('')

const imgInput = ref(null)
const imgUrl = ref('')

function imageInputChange(event) {
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
    .then(async (snapshot) => {
      const filename = snapshot.metadata.name
      const author = await getCurrentUser();
      const authorName = getAuthorName(author)
      const post = {
        filename: filename,
        author_uid: author.uid,
        author_name: authorName,
        title: postTitle.value,
        date_posted: Date.now()
      }

      return uploadPost(post);
    })
    .then((result)=> {
      alert('success')
      console.log(result)
    })
    .catch((error) => {
      alert("failed")
      console.log(error)
    })
  // getMeta();
}

function getAuthorName(author) {
  if (author.displayName)
    return author.displayName.split(' ')[0]
  else
    return author.email.split('@')[0]
}

function handleDelete() {
  deleteImage('868649d5-7f2c-45ab-b2e6-d3880a476193.png');
}

function handleGetmeta() {
  getMeta();
}

async function showuser() {
  const cu = await getCurrentUser()
  console.log(cu);
}

function uploadText() {
  uploadPost();
}

</script>

<style lang="scss" scoped>
img {
    max-height: 300px;
    max-width: 300px;
}
</style>