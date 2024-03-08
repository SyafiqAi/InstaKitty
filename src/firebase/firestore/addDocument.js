import { db } from "@/firebase"
import { collection, addDoc } from "firebase/firestore";

// Initialize Cloud Firestore and get a reference to the service

export default async function uploadPost(post) {
    return new Promise((resolve, reject) => {
        addDoc(collection(db, "posts"), post)
        .then((docRef) => {
            resolve(docRef)
        })
        .catch((error) => {
            reject(error)
        })
    })
}