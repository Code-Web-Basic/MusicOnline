import { collection, doc, getDoc, getDocs, limit, orderBy, query, where } from 'firebase/firestore';
import { db } from '~/connectFirebase/config';

export const getAllListPlaylistType = async (type = []) => {
    try {
        const typeList = type.map(async (i) => {
            const q = query(collection(db, 'playlist'), where('type', '==', i), limit(6));
            const querySnapshot = await getDocs(q);
            const result = { type: i, data: querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })) };
            return result;
        });
        return Promise.all(typeList).then((values) => {
            return values;
        });
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
