<template>
  <img :src="url" alt="img" />
</template>

<script setup>
// import getXray from "@/firebase/storageCreateRef";
import { onMounted, ref, watch } from 'vue'
import defaultImage from '@/assets/logo.svg'
import { getImageUrlByFilename } from '@/firebase/storageCreateRef'
const props = defineProps(['post'])

const url = ref(await getImageUrlByFilename(props.post.filename))
</script>

<style lang="scss" scoped>
img {
  max-height: 75%;
  max-width: 75%;
}
</style>
