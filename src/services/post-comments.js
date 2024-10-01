import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * @param {{sentBy: string, postId: string, text: string}} newMessage
 * @return {Promise}
 */
export async function savePostComment( { sentBy, postId, text } ) {
    const commentRef = collection(db, 'comments');

    await addDoc(commentRef, {
        sentBy,
        postId,
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
                text: doc.data().text,
            }
        });
        callback(comments);
    });
}