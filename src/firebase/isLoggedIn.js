import { getAuth, onAuthStateChanged } from "firebase/auth";

export default async function isLoggedIn() {
    return new Promise((resolve, reject) => {
      const removeListener = onAuthStateChanged(
        getAuth(),
        (user) => {
          removeListener();
          if(user) {
            resolve(true)
          } else {
            resolve(false)
          }
        },
        reject
      )
    })
  }
  