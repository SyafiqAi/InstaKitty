<template>
  <header>
    <h1>InstaKitty</h1>
    <div>
      <nav>
        <RouterLink to="/">Posts</RouterLink>
        <RouterLink to="/upload-image">Upload</RouterLink>
        <div style="cursor: pointer;" @click="handleSignOut" v-if="isLoggedIn">Sign out</div>
        <div v-else>
        <RouterLink to="/register">Register</RouterLink>
        <RouterLink to="/sign-in">Sign In</RouterLink>
        </div>
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
h1 {
  text-align: center;
  padding: 2rem;
}

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
}
</style>
