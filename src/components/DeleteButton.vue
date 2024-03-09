<template>
  <button @click="handleDelete" v-if="userIsAuthor">Delete</button>
</template>

<script setup>
import getCurrentUser from '@/firebase/getCurrentUser'
import deleteDocument from '@/firebase/firestore/deleteDocument.js'
import { ref } from 'vue'
import isLoggedIn from '@/firebase/isLoggedIn'
import { useRoute } from 'vue-router'

const props = defineProps(['post'])

const currentUser = await getCurrentUser()
const userIsAuthor = (await isLoggedIn()) ? ref(currentUser.uid == props.post.author_uid) : false

const postId = useRoute().params.postId
function handleDelete() {
  deleteDocument(props.post, postId)
}
</script>
