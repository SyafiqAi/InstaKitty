import router from '@/router'
import { db } from '..'
import { doc, getDoc } from 'firebase/firestore'

export async function getPost(postId) {
  const docRef = doc(db, 'posts', postId)
  const docSnap = await getDoc(docRef)

  if (docSnap.exists()) {
    return docSnap.data()
  } else {
    // docSnap.data() will be undefined in this case
    alert("This post has been deleted or doesn't exist.")
    router.push('/')
  }
}
