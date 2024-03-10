import {
  deleteObject,
  getDownloadURL,
  getMetadata,
  getStorage,
  ref,
  uploadBytes
} from 'firebase/storage'
import getCurrentUser from './getCurrentUser'
// Get a reference to the storage service, which is used to create references in our storage bucket
const storage = getStorage()

// Create a storage reference from our storage service
const imagesRef = ref(storage, 'images')

export async function getImageUrlByFilename(filename) {
  const imageRef = ref(storage, `images/${filename}`)

  return new Promise((resolve, reject) => {
    getDownloadURL(imageRef)
      .then((url) => {
        resolve(url)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export async function uploadImage(file) {
  const newImageRef = ref(storage, `images/${uuidv4()}.${getFileExtension(file)}`)

  const author = await getCurrentUser()
  const metadata = {
    customMetadata: {
      author_uid: author.uid
      // the delete function checks author_uid before deleting
      // in the firebase security rules, only allow users to delete their own posts.
    }
  }
  return new Promise((resolve, reject) => {
    uploadBytes(newImageRef, file, metadata)
      .then((snapshot) => {
        resolve(snapshot)
      })
      .catch((error) => {
        reject(error)
      })
  })
}

export function deleteImage(filename) {
  return new Promise((resolve, reject) => {
    const imageRef = ref(storage, `images/${filename}`)
    deleteObject(imageRef)
      .then(() => {
        resolve()
      })
      .catch((error) => {
        reject(error)
      })
  })
}

function uuidv4() {
  //generate unique id for naming files.
  return '10000000-1000-4000-8000-100000000000'.replace(/[018]/g, (c) =>
    (c ^ (crypto.getRandomValues(new Uint8Array(1))[0] & (15 >> (c / 4)))).toString(16)
  )
}

function getFileExtension(file) {
  const name = file.name
  const arr = name.split('.')
  return arr[arr.length - 1]
}
