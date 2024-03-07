<template>
  <header>
    <div>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/feed">Feed</RouterLink>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/sign-in">Sign In</RouterLink>
        <RouterLink to="/upload-image">Upload</RouterLink>
        <div style="cursor: pointer;" @click="handleSignOut" v-if="isLoggedIn">Sign out</div>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import router from './router'

const isLoggedIn = ref(false)
let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    } else {
      isLoggedIn.value = false;
    }
  })
})

function handleSignOut() {
  signOut(auth).then(() => {
    router.push("/")
  })
}
</script>

<style scoped lang="scss">
nav {
  * {
    padding: 1rem;
    display: inline-block;
    color: inherit;
    text-decoration: none;
  }
  :hover {
    text-decoration: underline;
  }
  text-align: center;
  margin-top: 4rem;
}
</style>
