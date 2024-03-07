<template>
    <div>
        <h1>Sign in</h1>
        <p>
            <input type="text" placeholder="Email" v-model="email"> 
        </p>
        <p>
            <input type="password" placeholder="Password" v-model="password"> 
        </p>
        <p v-if="errMsg">
            {{ errMsg }}
        </p>
        <p>
            <button @click="signIn">Submit</button>
        </p>
        <p>
            <button @click="signInWithGoogle">Sign In With Google</button>
        </p>
    </div>
</template>

<script setup>
import { ref } from "vue";
import { getAuth, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter();
const errMsg = ref("")

function signIn() {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log('Successfully signed in!')

        console.log(auth.currentUser)
        
        router.push('/feed')
    })
    .catch((error) => {
        console.log('Error: ', error.message)

        switch (error.code) {
            case "auth/invalid-email":
                errMsg.value = "Invalid email";
                break;
            case "auth/user-not-found":
                errMsg.value = "No account with that email was found";
                break;
            case "auth/wrong-password":
                errMsg.value = "Incorrect password";
                break;
        
            default:
                errMsg.value = "Email or password was incorrect"
                break;
        }
    })
}
function signInWithGoogle() {
const provider = new GoogleAuthProvider();
const auth = getAuth();
signInWithPopup(auth, provider)
  .then((result) => {
    router.push('/upload-image')
  }).catch((error) => {
    alert('error: ', error)
  });

}
</script>

<style lang="scss" scoped>
div {
    display: flex;
    flex-direction: column;
    align-items: center;
}
</style>