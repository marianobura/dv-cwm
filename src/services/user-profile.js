import { doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "./firebase";

/**
 * 
 * @param {string} id 
 * @returns {{id: string, email: string, displayName: string, bio: string, username: string}}
 */
export async function getUserProfileById(id) {
    const profileRef = doc(db, `/users/${id}`);

    const profileDocument = await getDoc(profileRef);

    return {
        id: profileDocument.id,
        email: profileDocument.data().email,
        displayName: profileDocument.data().displayName,
        username: profileDocument.data().username,
        bio: profileDocument.data().bio,
    }
}

/**
 * 
 * @param {string} id 
 * @param {{displayName: string, bio: string, username: string}} data
 */
export async function updateUserProfile(id, {displayName, username, bio}) {
    const profileRef = doc(db, `/users/${id}`);

    await updateDoc(profileRef, {
        displayName,
        bio,
        username,
    })
}