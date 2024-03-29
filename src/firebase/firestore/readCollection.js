import { db } from '@/firebase'
import { collection, query, getDocs, orderBy, limit, startAfter } from 'firebase/firestore'
import { ref } from 'vue'

const queryLimit = 25

const first = query(collection(db, 'posts'), orderBy('date_posted', 'desc'), limit(queryLimit))
export const posts = ref({})

let documentSnapshots = await getDocs(first)
documentSnapshots.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  // console.log(doc.id, " => ", doc.data());

  posts.value[doc.id] = doc.data()
})

let lastVisible
let loadedAll = false

export async function getNext() {
  if (loadedAll) return

  lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1]

  // Construct a new query starting at this document,
  // get the next 25 cities.
  let next = query(
    collection(db, 'posts'),
    orderBy('date_posted', 'desc'),
    startAfter(lastVisible),
    limit(queryLimit)
  )

  documentSnapshots = await getDocs(next)
  if (documentSnapshots.empty) {
    loadedAll = true
    alert("You've reached the end!")
    return
  }
  documentSnapshots.forEach((doc) => {
    posts.value[doc.id] = doc.data()
  })
}
