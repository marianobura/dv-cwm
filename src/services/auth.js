import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from "firebase/auth";
import { auth, db } from "./firebase";
import { getUserProfileById, updateUserProfile } from "./user-profile";
import { doc, setDoc } from "firebase/firestore";

let loggedUser = {
    id: null,
    email: null,
    displayName: null,
    bio: null,
    username: null,
    fullyLoaded: false,
}

let observers = [];

onAuthStateChanged(auth, async user => {
    if(user) {
        loggedUser = {
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
        }

        getUserProfileById(user.uid)
            .then(userProfile => {
                loggedUser = {
                    ...loggedUser,
                    bio: userProfile.bio,
                    username: userProfile.username,
                    fullyLoaded: true,
                }

                notifyAll();
            })
    } else {
        loggedUser = {
            id: null,
            email: null,
            displayName: null,
            bio: null,
            username: null,
            fullyLoaded: false,
        }
    }

    notifyAll();
});

export async function register(userData) {
    const auth = getAuth();
    
    try {
        const userCredential = await createUserWithEmailAndPassword(auth, userData.email, userData.password);
        const authUser = userCredential.user;

        await updateProfile(authUser, {
            displayName: userData.displayName,
        });

        await setDoc(doc(db, 'users', authUser.uid), {
            email: userData.email,
            username: userData.username,
            displayName: userData.displayName,
        });
        
    } catch (error) {
        console.error("[Register] Error en el registro: ", error);
        throw error;
    }
}

export async function login({email, password}) {
    try {
        const user = await signInWithEmailAndPassword(auth, email, password);
        console.log("Sesión iniciada con éxito: ", user);
    } catch (error) {
        console.error("[auth.js login] Error al tratar de iniciar sesión: ", error);
        throw error;
    }
}

/**
 * 
 * @param {{displayName: string, bio: string, username: string}} data
 * @returns 
 */
export async function editProfile({displayName, bio, username}) {
    try {
        await updateProfile(auth.currentUser, { displayName });

        updateUserProfile(loggedUser.id, {displayName, bio, username});

        loggedUser = {
            ...loggedUser,
            displayName,
            bio,
            username,
        }
        notifyAll();
    } catch (error) {
        console.error('[auth.js editMyProfile] Error al editar el perfil');
        throw error;
    }
}

export async function logout() {
    await signOut(auth);
}

/**
 * 
 * @param {Function} callback 
 */
export function subscribeToAuthChanges(callback) {
    observers.push(callback);
    notifyAll();
}

/**
 * 
 * @param {Function} callback 
 */
function notify(callback) {
    callback({...loggedUser});
}

function notifyAll() {
    observers.forEach(callback => notify(callback));
}