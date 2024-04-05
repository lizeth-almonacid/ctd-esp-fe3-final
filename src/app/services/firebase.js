// Importa las funciones necesarias de Firebase
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { signInWithEmailAndPassword } from "firebase/auth/cordova";
import {
  getFirestore,
  doc,
  setDoc,
  addDoc,
  collection,
  query,
  getDocs,
  deleteDoc,
  getDoc,
} from "firebase/firestore";
import { message } from "antd";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { getDownloadURL, getStorage, getURL } from "firebase/storage";
import { ref, uploadBytes } from "firebase/storage";

// const firebaseConfig = {
//   apiKey: "AIzaSyB4G-wTDBmEoVObZMEUYKR8x1_KO8hyhMo",
//   authDomain: "pixel-palace-d6bff.firebaseapp.com",
//   projectId: "pixel-palace-d6bff",
//   storageBucket: "pixel-palace-d6bff.appspot.com",
//   messagingSenderId: "273766258888",
//   appId: "1:273766258888:web:81ca0568c914fbceacedfd",
//   measurementId: "G-2P1CY9ZRG0",
// };
const firebaseConfig = {
  apiKey: "AIzaSyB-fA9kv0DVDRqragYCgii_C6Qgj-pBG1s",
  authDomain: "pixel-palacebaclup.firebaseapp.com",
  projectId: "pixel-palacebaclup",
  storageBucket: "pixel-palacebaclup.appspot.com",
  messagingSenderId: "372391412137",
  appId: "1:372391412137:web:ef0490cc6f1a104b6ac4b8"
};
// Inicializa Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestore = getFirestore(app); // Agrega Firestore a tu instancia de Firebase
export const storage = getStorage(app);
export const registerUser = async (
  email,
  password,
  name,
  lastName,
  userName,
  birthdate
) => {
  try {
    // Crea un usuario en Firebase Authentication
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    // Obtén el ID de usuario generado por Firebase Authentication
    const userId = userCredential.user.uid;

    // Crea un nuevo documento de usuario en la colección 'users' en Firebase Firestore
    const userDocRef = doc(firestore, "users", userId);
    const userData = {
      nombre: name,
      apellido: lastName,
      fechaNacimiento: birthdate,
      email: email,
      userName: userName,
    };
    await setDoc(userDocRef, userData);

    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export async function uploadImageToFirebaseStorage(file) {
  const storageRef = ref(storage, file.name);

  try {
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
  } catch (error) {
    console.error("Error al subir la imagen", error);
    return null; 
  }
}

// Función para el inicio de sesión y registro

export const signIn = async (data, pass, createUser) => {
  try {
    const method = createUser
      ? createUserWithEmailAndPassword
      : signInWithEmailAndPassword;
    const result = await method(auth, data.email, pass);
    // Si estás creando un usuario, se configura su información aquí
    if (createUser) {
      // Agregar información del usuario a Firestore después de un inicio de sesión exitoso
      const userId = result.user.uid; // Obtener el ID del usuario
      const userDocRef = doc(firestore, "users", userId); // Referencia al documento del usuario
      const userData = {
        // Configura los datos del usuario que deseas almacenar
        nombre: data.name,
        apellido: data.lastName,
        email: data.email,
        fechaNacimiento: data.birthdate,
        userName: data.username,
      };

      // Agrega los datos del usuario a Firestore
      await setDoc(userDocRef, userData);
    }

    return result;
  } catch (error) {
    console.error("Hubo un problema, revisa tus datos");
  }
};

export const handleResetPassword = async () => {
  try {
    const auth = getAuth(); // Obtiene la instancia de autenticación de Firebase
    await sendPasswordResetEmail(auth, email);

    // La solicitud de restablecimiento de contraseña se envió con éxito
    setSuccessMessage(
      "Se ha enviado un correo electrónico para restablecer tu contraseña. Por favor, verifica tu bandeja de entrada."
    );
    setErrorMessage("");
  } catch (error) {
    // Hubo un error al enviar la solicitud de restablecimiento de contraseña
    setSuccessMessage("");
    setErrorMessage(
      "Hubo un error al enviar la solicitud de restablecimiento de contraseña. Verifica que el correo electrónico sea válido."
    );
  }
};

export const useAuth = () => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    // Escucha cambios en el estado de autenticación
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser);
    });

    // Limpia la suscripción cuando el componente se desmonta
    return () => unsubscribe();
  }, []);

  const cerrarSesion = () => {
    // Cierra la sesión del usuario
    signOut(auth);
  };

  return { user, cerrarSesion };
};

export const createGame = async (gameData) => {
  try {
    let collectionName = "juegos"; 

    if (gameData.type === "Card") {
      collectionName = "tarjeta";
    }
    const gameDocRef = await addDoc(collection(firestore, collectionName), gameData);
    // console.log(gameDocRef.id);
    return { success: true, gameId: gameDocRef.id };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

export const updateGame = async (gameId, updatedGameData) => {
  try {
    await updateDoc(doc(firestore, "juegos", gameId), updatedGameData);
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
export const getGames = async () => {
  try {
    const gamesCollection = collection(firestore, "juegos");
    const gamesQuery = query(gamesCollection);

    const snapshot = await getDocs(gamesQuery);
    const games = [];

    snapshot.forEach((doc) => {
      const gameData = doc.data();
      games.push({ id: doc.id, ...gameData });
    });

    return { success: true, games };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
export const getCards = async () => {
  try {
    const gamesCollection = collection(firestore, "tarjeta");
    const gamesQuery = query(gamesCollection);

    const snapshot = await getDocs(gamesQuery);
    const card = [];

    snapshot.forEach((doc) => {
      const gameData = doc.data();
      card.push({ id: doc.id, ...gameData });
    });

    return { success: true, card };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
export const getGameDetails = async (gameId) => {
  try {
    const gameDocRef = doc(firestore, "juegos", gameId)
    const gameDocSnapshot = await getDoc(gameDocRef);

    if (gameDocSnapshot.exists()) {
      // El documento del juego existe
      return gameDocSnapshot.data()
    } else {
      // El documento del juego no existe
      return null;
    }
  } catch (error) {
    console.error("Error al obtener detalles del juego", error);
    return null;
  }
};

export const getCardDetails = async (cardId) => {
  try {
    const gameDocRef = doc(firestore, "tarjeta", cardId)
    const gameDocSnapshot = await getDoc(gameDocRef);

    if (gameDocSnapshot.exists()) {
      return gameDocSnapshot.data()
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al obtener detalles de la tarjeta", error);
    return null;
  }
};
export const searchGamesByName = async (searchQuery) => {
  try {
    const gamesCollection = collection(firestore, "juegos");
    const gamesQuery = query(gamesCollection, where("nombre", ">=", searchQuery).where("nombre", "<=", searchQuery + '\uf8ff'));
    const snapshot = await getDocs(gamesQuery);
 console.log(gamesQuery);
    const results = [];

    snapshot.forEach((doc) => {
      const gameData = doc.data();
      results.push({ id: doc.id, ...gameData });
    });

    return results;
  } catch (error) {
    console.error('Error al buscar juegos:', error);
    return [];
  }
};

export const deleteGame = async (gameId) => {
  try {
    await deleteDoc(doc(firestore, "juegos", gameId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};
export const deleteCard = async (gameId) => {
  try {
    await deleteDoc(doc(firestore, "tarjeta", gameId));
    return { success: true };
  } catch (error) {
    return { success: false, error: error.message };
  }
};

