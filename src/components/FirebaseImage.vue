<template>
  <img :src="url" alt="img" />
</template>

<script setup>
// import getXray from "@/firebase/storageCreateRef";
import { ref } from 'vue'
import { getImageUrlByFilename } from '@/firebase/storageCreateRef'
const props = defineProps(['filename'])

const url = ref(await getImageUrlByFilename(props.filename))
</script>

<style lang="scss" scoped>
img {
  max-height: 100%;
  max-width: 100%;
}
</style>
