import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function getCurrentUser() {
    return new Promise((resolve, reject) => {
        const removeListener = onAuthStateChanged(
            getAuth(),
            (user) => {
                removeListener();
                resolve(user);
            },
            reject
        )
    })
}
