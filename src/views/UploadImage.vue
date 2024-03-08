<template>
  <h1>Upload image</h1>
  
  <input @change="imageInputChange" ref="imgInput" accept="image/*" type="file" />
  <input type="text" placeholder="title" v-model="postTitle"/>
  <img v-if="imgUrl" :src="imgUrl" alt="user's image" />
  <button @click="handleUpload">Upload</button>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { uploadImage } from '@/firebase/storageCreateRef'
import getCurrentUser from '@/firebase/getCurrentUser'
import uploadPost from '@/firebase/firestore/addDocument.js'
import router from '@/router'

const postTitle = ref('')

const imgInput = ref(null)
const imgUrl = ref('')

function imageInputChange(event) {
  const [file] = imgInput.value.files
  if (file) {
    imgUrl.value = URL.createObjectURL(file)
  } else {
    imgUrl.value = null
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
      alert('Uploaded an image!')
      router.push('/').then(() => {router.go(0)})
    })
    .catch((error) => {
      alert("failed")
      console.log(error)
    })
}

function getAuthorName(author) {
  return author.displayName.split(' ')[0]
}

</script>

<style lang="scss" scoped>
img {
    max-height: 300px;
    max-width: 300px;
}
</style>