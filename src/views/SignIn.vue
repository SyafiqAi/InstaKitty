<template>
  <div>
    <h1>Sign in</h1>
    <p>
      <input v-model="email" type="text" placeholder="Email" />
    </p>
    <p>
      <input v-model="password" type="password" placeholder="Password" />
    </p>
    <p v-if="errMsg">
      {{ errMsg }}
    </p>
    <p>
      <button @click="signIn">Submit</button>
    </p>
    <p>
      <button @click="signInWithGoogle">
        <img :src="googleLogo" alt="Google G Logo" /> Sign In With Google
      </button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import googleLogo from '@/assets/Google__G__logo.svg'
import {
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup
} from 'firebase/auth'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const router = useRouter()
const errMsg = ref('')

function signIn() {
  const auth = getAuth()
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
      router.push('/')
    })
    .catch((error) => {
      switch (error.code) {
        case 'auth/invalid-email':
          errMsg.value = 'Invalid email'
          break
        case 'auth/user-not-found':
          errMsg.value = 'No account with that email was found'
          break
        case 'auth/wrong-password':
          errMsg.value = 'Incorrect password'
          break

        default:
          errMsg.value = 'Email or password was incorrect'
          break
      }
    })
}
function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  const auth = getAuth()
  signInWithPopup(auth, provider)
    .then((result) => {
      router.push('/')
    })
    .catch((error) => {
      alert('error: ', error)
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
