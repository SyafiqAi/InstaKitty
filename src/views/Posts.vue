<template>
    
    <h1>Posts</h1>
    <button @click="getNext()">load more</button>
    <ol>
        <li v-for="post in posts"> {{ post }} </li>
    </ol>

    
</template>

<script setup>
import "@/firebase/firestore/readDocument.js"
import { posts, getNext }from '@/firebase/firestore/readDocument.js'



</script>