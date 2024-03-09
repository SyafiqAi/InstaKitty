<template>
  <h1>Posts</h1>
  <div class="cont">
    <div v-for="post in posts" class="box" @click="viewPost(post.post_id)">
      <Suspense>
        <template #fallback>
          <!-- <div style="background-color: red">loading</div>
           -->
          <img :src="loadingSpinner" alt="loading" style="height: 50px; width: 50px" />
        </template>
        <FirebaseImage :filename="post.filename" />
      </Suspense>
    </div>
  </div>
  <div class="center">
    <button @click="getNext()">Load more</button>
  </div>
</template>

<script setup>
import '@/firebase/firestore/readDocument.js'
import FirebaseImage from '@/components/FirebaseImage.vue'
import DeleteButton from '@/components/DeleteButton.vue'
import { posts, getNext } from '@/firebase/firestore/readDocument.js'
import { getImageUrlByFilename } from '@/firebase/storageCreateRef.js'
import getCurrentUser from '@/firebase/getCurrentUser.js'
import router from '@/router'
import loadingSpinner from '@/assets/loading.gif'

function viewPost(post_id) {
  router.push(`/view-post/${post_id}`)
}
</script>

<style lang="scss" scoped>
h1 {
  text-align: center;
}

.center {
  display: flex;
  justify-content: center;
  margin-top: 8rem;
  margin-bottom: 8rem;
}

.cont {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.box {
  // max-width: 50vw;
  height: 125px;
  // width: 100%;
  // max-width: 100%;
  display: block;
  overflow: hidden;
  display: flex;

  :hover {
    transform: scale(1.1);
    cursor: pointer;
    transition: 100ms;
  }
}

@media only screen and (min-width: 600px) {
  .box {
    // max-width: 300px;
    height: 300px;
  }
}
</style>
