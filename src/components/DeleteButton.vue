<template>
    <button @click="handleDelete" v-if="userIsAuthor">Delete</button>
</template>

<script setup>
import getCurrentUser from "@/firebase/getCurrentUser"
import { ref } from "vue"

const props = defineProps(['post'])

const currentUser = await getCurrentUser();
const userIsAuthor = ref(currentUser.uid == props.post.author_uid)

function handleDelete() {
    
}

</script>
