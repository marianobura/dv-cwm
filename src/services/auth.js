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

if(localStorage.getItem('user')) {
    loggedUser = JSON.parse(localStorage.getItem('user'));
}

let observers = [];

onAuthStateChanged(auth, async user => {
    if(user) {
        updateLoggedUser({
            id: user.uid,
            email: user.email,
            displayName: user.displayName,
        })

        getUserProfileById(user.uid)
            .then(userProfile => {
                updateLoggedUser({
                    bio: userProfile.bio,
                    username: userProfile.username,
                    fullyLoaded: true,
                })
            })
    } else {
        updateLoggedUser({
            id: null,
            email: null,
            displayName: null,
            bio: null,
            username: null,
            fullyLoaded: false,
        });
        localStorage.removeItem('user');
    }
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
        const promiseAuth = updateProfile(auth.currentUser, { displayName });

        const promiseProfile = updateUserProfile(loggedUser.id, {displayName, bio, username});

        await Promise.all([promiseAuth, promiseProfile]);

        updateLoggedUser({
            displayName,
            bio,
            username,
        });
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
 * @return {Function} Función para cancelar la suscripción.
 */
export function subscribeToAuthChanges(callback) {
    observers.push(callback);

    notifyAll();

    return () => observers = observers.filter(obs => obs !== callback)
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

function updateLoggedUser(newData) {
    loggedUser = {
        ...loggedUser,
        ...newData,
    }

    localStorage.setItem('user', JSON.stringify(loggedUser));
    notifyAll();
}