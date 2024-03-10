<template>
  <div class="view-post">
    <Suspense>
      <template #fallback>
        <img :src="loadingSpinner" alt="loading" style="height: 50px; width: 50px" />
      </template>
      <FirebaseImage :filename="post.filename" />
    </Suspense>
    <h1>{{ post.title }}</h1>
    <p>
      Posted by: {{ post.author_name }}
      <span v-if="userIsAuthor">(you)</span>
    </p>
    <Suspense>
      <DeleteButton :post="post" :post-id="postId" />
    </Suspense>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { getPost } from '@/firebase/firestore/getDocument.js'
import FirebaseImage from '@/components/FirebaseImage.vue'
import DeleteButton from '@/components/DeleteButton.vue'
import getCurrentUser from '@/firebase/getCurrentUser'
import { ref } from 'vue'
import isLoggedIn from '@/firebase/isLoggedIn'
import loadingSpinner from '@/assets/loading.gif'

const postId = useRoute().params.postId
const post = await getPost(postId)

const currentUser = await getCurrentUser()
const userIsAuthor = (await isLoggedIn()) ? ref(currentUser.uid == post.author_uid) : false
</script>

<style lang="scss" scoped>
.view-post {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 8rem;
}
</style>
