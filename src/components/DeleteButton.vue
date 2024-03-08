<template>
    <button @click="handleDelete" v-if="userIsAuthor">Delete</button>
</template>

<script setup>
import getCurrentUser from "@/firebase/getCurrentUser"
import deleteDocument from "@/firebase/firestore/deleteDocument.js"
import { ref } from "vue"

const props = defineProps(['post'])

const currentUser = await getCurrentUser();
const userIsAuthor = ref(currentUser.uid == props.post.author_uid)

function handleDelete() {
    deleteDocument(props.post)
}

</script>
