import { db } from "..";
import { doc, getDoc } from "firebase/firestore";


export async function getPost(postId) {
    const docRef = doc(db, "posts", postId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      return docSnap.data()
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
}
