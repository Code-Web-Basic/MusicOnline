import { collection, endAt, getDocs, limit, orderBy, query, startAt, where } from 'firebase/firestore';
import { db } from '~/connectFirebase/config';

export const searchMusic = async ({ keyword = '' }) => {
    try {
        const q = query(collection(db, 'music'), orderBy('name'), where('name', '>=', keyword), limit(6));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        return Promise.reject(error);
    }
};

export const searchPlaylist = async ({ keyword = '' }) => {
    try {
        const q = query(collection(db, 'playlist'), orderBy('name'), where('name', '>=', keyword), limit(6));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        return Promise.reject(error);
    }
};

export const searchMusicFull = async ({ keyword = '' }) => {
    try {
        const q = query(collection(db, 'music'), orderBy('name'), where('name', '>=', keyword));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        return Promise.reject(error);
    }
};

export const searchPlaylistFull = async ({ keyword = '' }) => {
    try {
        const q = query(collection(db, 'playlist'), orderBy('name'), where('name', '>=', keyword));
        const querySnapshot = await getDocs(q);
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        return Promise.reject(error);
    }
};
