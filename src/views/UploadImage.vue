<template>
  <h1>Upload image</h1>
  <input @change="inputChange" ref="imgInput" accept="image/*" type="file"/>
  <img :src="imgUrl" alt="user's image" />
</template>

<script setup>
import { ref } from "vue";

const imgInput = ref(null)
const imgUrl = ref('')

function inputChange(event) {
  console.log(event)
  const [file] = imgInput.value.files
  console.log(file)
  if (file) {
        imgUrl.value = URL.createObjectURL(file)
  } else {
    imgUrl.value = ''
  }
}

</script>
