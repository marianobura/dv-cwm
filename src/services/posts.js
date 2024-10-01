import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * @param {{sentBy: string, displayName: string, username: string, text: string}} newMessage
 * @return {Promise}
 */
export async function savePost( { sentBy, displayName, username, text } ) {
    const postRef = collection(db, 'posts');

    await addDoc(postRef, {
        sentBy,
        displayName,
        username,
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
                sentBy: doc.data().sentBy,
                displayName: doc.data().displayName,
                username: doc.data().username,
                text: doc.data().text,
            }
        });
        callback(posts);
    });
}