import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "~/connectFirebase/config";
export const getListComment = async (musicId) => {
    try {
        let data = []
        const q = query(collection(db, 'comment'), where('musicId', '==', musicId));
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            data.push({
                data: doc.data(),
                id: doc.id
            });
        });
        return data;
    } catch (error) {
        return Promise.reject(error);
    }
};