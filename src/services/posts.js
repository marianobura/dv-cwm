import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * @param {{sentBy: string, text: string}} newMessage
 * @return {Promise}
 */
export async function savePost( { sentBy, text } ) {
    const postRef = collection(db, 'posts');

    await addDoc(postRef, {
        sentBy,
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
                text: doc.data().text,
            }
        });
        callback(posts);
    });
}