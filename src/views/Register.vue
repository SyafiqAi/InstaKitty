<template>
  <div>
    <h1>Create an Account</h1>
    <p>
      <input v-model="email" type="text" placeholder="Email" />
    </p>
    <p>
      <input v-model="password" type="password" placeholder="Password" />
    </p>
    <p>
      <button @click="register">Submit</button>
    </p>
    <p>
      <button @click="signInWithGoogle"> <img :src="googleLogo" alt="Google G Logo"> Sign In With Google</button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import googleLogo  from '@/assets/Google__G__logo.svg'
import {
  getAuth,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'


const email = ref('')
const password = ref('')
const router = useRouter()

function register() {
  const auth = getAuth()
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      router.push('/')
    })
    .catch((error) => {
      alert('Error: ', error)
    })
}
function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      router.push('/')
    })
    .catch((error) => {
      alert(error.message)
    })
}
</script>

<style lang="scss" scoped>
div {
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
