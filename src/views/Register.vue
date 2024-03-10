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
      <button @click="signInWithGoogle">Sign In With Google</button>
    </p>
  </div>
</template>

<script setup>
import { ref } from 'vue'
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
      console.log('Successfully registered!')

      console.log(auth.currentUser)

      router.push('/')
    })
    .catch((error) => {
      console.log('Error: ', error.message)
    })
}
function signInWithGoogle() {
  const provider = new GoogleAuthProvider()
  signInWithPopup(getAuth(), provider)
    .then((result) => {
      console.log(result.user.displayName)
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
