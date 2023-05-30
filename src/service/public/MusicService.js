import { lime } from '@mui/material/colors';
import { collection, getDocs, limit, query, where } from 'firebase/firestore';
import { db } from '~/connectFirebase/config';

export const getHomeMusic = async () => {
    try {
        const q = query(collection(db, 'music'), limit(12), where('source', '!=', ''));
        const querySnapshot = await getDocs(q);
        // console.log(querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        return Promise.reject(error);
    }
};
