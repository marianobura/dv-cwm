import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * @param {{sentBy: string, text: string}} newMessage
 * @return {Promise}
 */
export async function savePublicChatMessage( { sentBy, text } ) {
    const chatRef = collection(db, 'public-chat');

    await addDoc(chatRef, {
        sentBy,
        text,
        created_at: serverTimestamp(),
    });
}

export function subscribeToPublicChatMessages(callback) {
    const chatRef = collection(db, 'public-chat');
    const chatQuery = query(chatRef, orderBy('created_at'));
    onSnapshot(chatQuery, snapshot => {
        const messages = snapshot.docs.map(doc => {
            return {
                id: doc.id,
                sentBy: doc.data().sentBy,
                text: doc.data().text,
            }
        });
        callback(messages);
    });
}