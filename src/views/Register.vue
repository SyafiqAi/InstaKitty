<template>
    <div>
        <h1>Create an Account</h1>
        <p>
            <input type="text" placeholder="Email" v-model="email"> 
        </p>
        <p>
            <input type="password" placeholder="Password" v-model="password"> 
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
import { ref } from "vue";
import { 
    getAuth,
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    signInWithPopup 
} from "firebase/auth"
import { useRouter } from "vue-router"

const email = ref("")
const password = ref("")
const router = useRouter();

function register() {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((data) => {
        console.log('Successfully registered!')

        console.log(auth.currentUser)
        
        router.push('/feed')
    })
    .catch((error) => {
        console.log('Error: ', error.message)
    })
}
function signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user.displayName)
            router.push("/feed")
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