<template>
  <h1>Posts</h1>
  <button @click="getNext()">load more</button>
  <div class="cont">
    <div v-for="post in posts" class="box">
        {{ post.title }} by: {{ post.author_name}} <br>
        <!-- {{ post }} -->
        <br>

        <Suspense>
            <template #fallback>
                <div style="background-color: red;"> loading</div>
            </template>
            <FirebaseImage :post="post" />
        </Suspense>
        <Suspense> 
          <DeleteButton :post="post"/>
        </Suspense>
    </div>
  </div>
  <ol></ol>
</template>

<script setup>
import '@/firebase/firestore/readDocument.js'
import FirebaseImage from '@/components/FirebaseImage.vue'
import DeleteButton from '@/components/DeleteButton.vue'
import { posts, getNext } from '@/firebase/firestore/readDocument.js'
import { getImageUrlByFilename } from '@/firebase/storageCreateRef.js'
import getCurrentUser from '@/firebase/getCurrentUser.js'

</script>


<style lang="scss" scoped>
.cont {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.box {
  width: 300px;
  height: 300px;
  display: block;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>