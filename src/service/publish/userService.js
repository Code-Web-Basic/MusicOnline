import { updateProfile } from "firebase/auth";
import { auth } from "~/connectFirebase/config";
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