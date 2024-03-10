<template>
  <button v-if="userIsAuthor" @click="handleDelete">Delete</button>
</template>

<script setup>
import getCurrentUser from '@/firebase/getCurrentUser'
import deleteDocument from '@/firebase/firestore/deleteDocument.js'
import { ref } from 'vue'
import isLoggedIn from '@/firebase/isLoggedIn'
import { useRoute } from 'vue-router'

const props = defineProps(['post', 'postId'])

const currentUser = await getCurrentUser()
const userIsAuthor = (await isLoggedIn()) ? ref(currentUser.uid == props.post.author_uid) : false

function handleDelete() {
  deleteDocument(props.post, props.postId)
}
</script>
