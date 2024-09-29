import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * @param {{name: string, displayName: string, text: string}} newMessage
 * @return {Promise}
 */
export async function savePost( { username, displayName, text } ) {
    const postRef = collection(db, 'posts');

    await addDoc(postRef, {
        username,
        displayName,
        text,
        created_at: serverTimestamp(),
    });
}

export function subscribeToPost(callback) {
    const postRef = collection(db, 'posts');
    const postQuery = query(postRef, orderBy('created_at', 'desc'));
    onSnapshot(postQuery, snapshot => {
        const posts = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                username: doc.data().username,
                displayName: doc.data().displayName,
                text: doc.data().text,
            }
        });
        callback(posts);
    });
}