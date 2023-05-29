import { addDoc, collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';
import { db, storage } from '~/connectFirebase/config';

export const getMusic = async () => {
    try {
        const q = query(collection(db, 'music'), where('view', '==', 0));

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            console.log(doc.id, ' => ', doc.data());
        });
    } catch (error) {
        return Promise.reject(error);
    }
};

export const getMusicByOwerId = async (ownerId) => {
    try {
        let data = []
        const q = query(collection(db, 'music'), where('ownerId', '==', ownerId));
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

export const getMusicByMusicId = async (musicId) => {
    try {
        const docRef = doc(db, 'music', musicId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            return {
                data: data,
                id: docSnap.id
            }
        } else {
            // Document not found
            console.log('Document not found');
        }
    } catch (error) {
        return Promise.reject(error);
    }
};

export const createMusic = async (data) => {
    try {
        const dataTmp = data;
        const metadataImages = {
            contentType: data.thumbnail.type,
        };
        const metadataAudios = {
            contentType: data.source.type,
        };
        // const imagesRef = ref(storage, 'images');
        // const audiosRef = ref(storage, 'audios');
        // Upload file and metadata to the object 'images/mountains.jpg'
        const storageImageRef = ref(storage, 'images/' + data.thumbnail.name);
        const storageAudioRef = ref(storage, 'audios/' + data.source.name);

        const uploadTaskImage = await uploadBytesResumable(storageImageRef, data.thumbnail, metadataImages);
        //
        const url = await getDownloadURL(uploadTaskImage.ref);
        dataTmp.thumbnail = url;
        //
        const uploadTaskAudio = await uploadBytesResumable(storageAudioRef, data.source, metadataAudios);
        //
        const url1 = await getDownloadURL(uploadTaskAudio.ref);
        dataTmp.source = url1;

        //
        // Listen for state changes, errors, and completion of the upload.
        // uploadTaskImage.on(
        //     'state_changed',
        //     (snapshot) => {
        //         // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        //         const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        //         console.log('Upload is ' + progress + '% done');
        //         // eslint-disable-next-line default-case
        //         switch (snapshot.state) {
        //             case 'paused':
        //                 console.log('Upload is paused');
        //                 break;
        //             case 'running':
        //                 console.log('Upload is running');
        //                 break;
        //         }
        //     },
        //     // error
        //     (error) => {
        //         // A full list of error codes is available at
        //         // https://firebase.google.com/docs/storage/web/handle-errors
        //         // eslint-disable-next-line default-case
        //         switch (error.code) {
        //             case 'storage/unauthorized':
        //                 // User doesn't have permission to access the object
        //                 console.log('storage/unauthorized');
        //                 break;
        //             case 'storage/canceled':
        //                 // User canceled the upload
        //                 console.log('storage/canceled');
        //                 break;

        //             // ...

        //             case 'storage/unknown':
        //                 // Unknown error occurred, inspect error.serverResponse
        //                 console.log('storage/unknown');
        //                 break;
        //         }
        //     },
        //     () => {
        //         // Upload completed successfully, now we can get the download URL
        //         getDownloadURL(uploadTaskImage.snapshot.ref).then((downloadURL) => {
        //             console.log('File available at', downloadURL);
        //         });
        //     },
        // );
        const docRef = await addDoc(collection(db, 'music'), dataTmp);
        console.log('Document written with ID: ', docRef.id);

        return docRef;
    } catch (error) {
        return Promise.reject(error);
    }
};
