import { db } from '@/firebase'
import { doc, deleteDoc } from "firebase/firestore";

export async function deletePost(post) {

}

const imageRef = doc(db, "images", "DC")
await deleteDoc(imageRef);
