<template>
    <img :src="xray" alt="xray">
</template>

<script setup>
// import getXray from "@/firebase/storageCreateRef";
import getXray from "@/firebase/storageCreateRef"
import { onMounted, ref, watch } from "vue";
import defaultImage from '@/assets/logo.svg'

const xray = ref('')
await getXray()
    .then((url) => {
        xray.value = url
    })
    .catch((error) => {
        xray.value = defaultImage;
        handleError(error)
    })

function handleError(error) {
    console.log(error)
}

</script>