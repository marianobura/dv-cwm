import { addDoc, collection, onSnapshot, orderBy, query, serverTimestamp } from "firebase/firestore";
import { db } from "./firebase";

/**
 * @param {{name: string, displayName: string, text: string}} newMessage
 * @return {Promise}
 */
export async function savePublicChatMessage( { name, displayName, text } ) {
    const chatRef = collection(db, 'public-chat');

    await addDoc(chatRef, {
        name,
        displayName,
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
                name: doc.data().name,
                displayName: doc.data().displayName,
                text: doc.data().text,
            }
        });
        callback(messages);
    });
}