import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * @param {{sentBy: string, displayName: string, username: string, text: string}} newMessage
 * @return {Promise}
 */
export async function savePostComment( { postId, sentBy, displayName, username, text } ) {
    const commentRef = collection(db, 'comments');

    await addDoc(commentRef, {
        postId,
        sentBy,
        displayName,
        username,
        text,
        created_at: serverTimestamp(),
    });
}

export function subscribeToPostComment(callback) {
    const commentRef = collection(db, 'comments');
    const commentQuery = query(commentRef, orderBy('created_at', 'desc'));
    onSnapshot(commentQuery, snapshot => {
        const comments = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                postId: doc.data().postId,
                sentBy: doc.data().sentBy,
                displayName: doc.data().displayName,
                username: doc.data().username,
                text: doc.data().text,
            }
        });
        callback(comments);
    });
}