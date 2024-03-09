<template>
  <header>
    <RouterLink to="/" style="color: inherit; text-decoration: none">
      <div class="logo">
        <img :src="instaKittyLogo" alt="" />
        <h1>InstaKitty</h1>
      </div>
    </RouterLink>
    <div>
      <nav>
        <RouterLink to="/">Posts</RouterLink>
        <RouterLink to="/upload-image">Upload</RouterLink>
        <div style="cursor: pointer" @click="handleSignOut" v-if="isLoggedIn">Sign out</div>
        <div v-else>
          <RouterLink to="/register">Register</RouterLink>
          <RouterLink to="/sign-in">Sign In</RouterLink>
        </div>
      </nav>
    </div>
  </header>

  <Suspense>
    <RouterView />
  </Suspense>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { getAuth, onAuthStateChanged, signOut } from 'firebase/auth'
import { onMounted, ref } from 'vue'
import router from './router'
import instaKittyLogo from './assets/instaKittyLogo.svg'

const isLoggedIn = ref(false)
let auth
onMounted(() => {
  auth = getAuth()
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true
    } else {
      isLoggedIn.value = false
    }
  })
})

function handleSignOut() {
  signOut(auth).then(() => {
    router.go(0)
  })
}
</script>

<style scoped lang="scss">
.logo {
  display: flex;
  justify-content: center;
  align-items: center;
  img {
    max-height: 3rem;
  }
  h1 {
    text-align: center;
    padding-top: 2rem;
    padding-bottom: 2rem;
  }
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
