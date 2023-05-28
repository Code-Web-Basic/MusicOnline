import { updateProfile } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "~/connectFirebase/config";
export const handleUpdateProfile = async (data) => {
    try {
        await updateProfile(auth.currentUser, {
            displayName: data?.displayName,
            photoURL: data?.photoURL
        });
        console.log(auth.currentUser);
        console.log('Profile updated successfully');
    } catch (error) {
        console.error('Error updating profile:', error);
    }
};

export const getAllMusicMyLikes = async (ownerId) => {
    try {
        let data = []
        const q = query(collection(db, 'likes'), where('ownerId', '==', ownerId));
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