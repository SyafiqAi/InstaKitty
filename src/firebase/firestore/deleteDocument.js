import { db } from '@/firebase'
import { doc, deleteDoc } from 'firebase/firestore'
import { deleteImage } from '../storageCreateRef'
import router from '@/router'

export default async function deletePost(post, postId) {
  const filename = post.filename

  const postRef = doc(db, 'posts', postId)
  deleteDoc(postRef)
    .then(() => {
      return deleteImage(filename)
    })
    .then(() => {
      alert('Successfully deleted')
      router.push('/').then(() => {
        router.go(0)
      })
    })
    .catch((error) => {
      alert('Error: ', error)
    })
}
