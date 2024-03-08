import { db } from '@/firebase'
import { doc, deleteDoc } from "firebase/firestore";
import { deleteImage } from '../storageCreateRef';

export default async function deletePost(post) {
    const filename = post.filename
    const postId = post.post_id

    const postRef = doc(db, "posts", postId)
    deleteDoc(postRef)
    .then(() => {
        return deleteImage(filename)
    })
    .then(() => {
        alert("successfully deleted")
    })
    .catch((error) => {
        alert("error")
        console.log(error)
    })
}

