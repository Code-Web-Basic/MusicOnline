import { collection, deleteDoc, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { db } from "~/connectFirebase/config";

const createRandom = () => {
    var randomstring = '';
    var characters = 'QWERTYUIOPASDFGHJKLZXCVBNM123456789qwertyuiopasdfghjklzxcvbnm';
    for (var i, i = 0; i < 28; i++) {
        randomstring += characters.charAt(Math.floor(Math.random() * 28));
    }
    return randomstring;
};

export const getAllMyPlayList = async (params) => {
    let data = []
    const q = query(collection(db, 'playlist'), where('ownerId', '==', params));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        data.push({
            data: doc.data(),
            id: doc.id
        });
    });
    return data;
};

export const setNewMyPlayList = async (params) => {
    const id = createRandom()
    const data = {
        createdAt: new Date(),
        name: params.name,
        status: params.type,
        ownerId: params.userId,
        description: '',
        thumbnail: '',
        type: '',
        updatedAt: new Date()
    }
    await setDoc(doc(db, "playlist", id), data);

    return { data: data, id: id }
};

export const deleteMyPlayList = async (params) => {
    await deleteDoc(doc(db, 'playlist', params));

    return params
};