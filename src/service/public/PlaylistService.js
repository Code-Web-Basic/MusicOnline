import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '~/connectFirebase/config';

export const getListPlaylistType = async (type = '') => {
    try {
        const q = query(collection(db, 'playlist'), where('type', '==', type), limit(6));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        return Promise.reject(error);
    }
};
export const getPlaylist = async (id) => {
    try {
        const docRef = doc(db, 'playlist', id);
        const docSnap = await getDoc(docRef);
        // console.log(docSnap.data());
        return docSnap.data();
    } catch (error) {
        return Promise.reject(error);
    }
};
export const getDetailPlaylistMusic = async (type) => {
    try {
        const q = query(collection(db, 'music'), where('type', 'array-contains', type));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        return Promise.reject(error);
    }
};
