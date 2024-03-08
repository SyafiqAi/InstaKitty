import { db } from '@/firebase'
import { collection, query, where, getDocs, orderBy, limit, startAfter } from "firebase/firestore";
import { ref } from 'vue';

const queryLimit = 25;

const first = query(collection(db, "posts"), orderBy('date_posted', 'desc'), limit(queryLimit));
export const posts = ref([])



let documentSnapshots;

documentSnapshots = await getDocs(first);
documentSnapshots.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    const dat = doc.data()
    dat['post_id'] = doc.id
    posts.value.push(dat)
});

let lastVisible;
let loadedAll = false

export async function getNext() {

    if (loadedAll) return;

    lastVisible = documentSnapshots.docs[documentSnapshots.docs.length - 1];
    console.log("last", lastVisible);
    console.log(documentSnapshots.docs)

    // Construct a new query starting at this document,
    // get the next 25 cities.
    let next = query(collection(db, "posts"),
        orderBy("date_posted", "desc"),
        startAfter(lastVisible),
        limit(queryLimit));

    documentSnapshots = await getDocs(next);
    if (documentSnapshots.empty) {
        loadedAll = true;
        alert('done')
        return;
    }
    documentSnapshots.forEach((doc) => {
        posts.value.push(doc.data())
    })

}

