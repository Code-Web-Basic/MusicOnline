import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "~/connectFirebase/config";

const createRandom = () => {
    var randomstring = '';
    var characters = 'QWERTYUIOPASDFGHJKLZXCVBNM123456789qwertyuiopasdfghjklzxcvbnm';
    for (var i, i = 0; i < 28; i++) {
        randomstring += characters.charAt(Math.floor(Math.random() * 28));
    }
    return randomstring;
};

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

export const setNewComment = async (params) => {
    try {
        const id = createRandom()
        await setDoc(doc(db, "comment", id), params);
        return { data: params, id: id }
    } catch (error) {
        return Promise.reject(error);
    }
};