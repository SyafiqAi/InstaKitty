import { deleteObject, getDownloadURL, getMetadata, getStorage, ref, uploadBytes } from "firebase/storage";
// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = getStorage();

// Create a storage reference from our storage service
const imagesRef = ref(storage, 'images');

const xrayRef = ref(storage, 'images/c39e0f0c-0e98-45a4-8574-538e13c93fa2.png')

export default async function getXray() {
    return new Promise((resolve, reject) => {
        getDownloadURL(xrayRef)
            .then((url) => {
                resolve(url)
            }).catch((error) => {
                reject(error)
            })
    })
}

export async function uploadImage(file) {
    const newImageRef = ref(storage, `images/${uuidv4()}.${getFileExtension(file)}`)
    const metadata = {
        customMetadata: {
            'author_uid': 'yGWOgTX261OrkrYIX3VEU8dUy3Q2'
        }
      };
    uploadBytes(newImageRef, file, metadata).then((snapshot) => {
        console.log('Uploaded a blob or file!');
        console.log(snapshot)
      });
}

function uuidv4() { //generate unique id for naming files.
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function getFileExtension(file) {
    const name = file.name
    const arr = name.split('.')
    return arr[arr.length-1];
}

// Get metadata properties
export function getMeta() {
    getMetadata(xrayRef)
      .then((metadata) => {
        // Metadata now contains the metadata for 'images/forest.jpg'
        console.log('meta:', metadata)
      })
      .catch((error) => {
        alert('error')
      });
}

export function del() {
    deleteObject(xrayRef).then(() => {
        // File deleted successfully
        alert('success')
      }).catch((error) => {
        // Uh-oh, an error occurred!
        alert('fail', error)
        console.log('error: ', error)
      });
      
}