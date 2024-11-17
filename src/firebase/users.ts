import { doc, getDoc } from "firebase/firestore"
import { db } from "./config"

export const userExistsWithUid = async (uid: string): Promise<boolean> => {
    const docRef = doc(db, "users", uid)
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) return true;
    return false;
}