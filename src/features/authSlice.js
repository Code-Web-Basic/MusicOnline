import {
    createUserWithEmailAndPassword,
    FacebookAuthProvider,
    GoogleAuthProvider,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from 'firebase/auth';
import { addDoc, collection, doc, getDocs, query, serverTimestamp, where } from 'firebase/firestore';
import { auth, googleAuthProvider, facebookAuthProvider, db } from '~/connectFirebase/config';
import { handleUpdateProfile } from '~/service/publish/userService';

const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

export const signUpPassWord = createAsyncThunk('auth/signUpPassWord', async (params, thunkAPI) => {
    const { email, password } = params;
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const data = {
        userId: doc(db, user.uid),
        role: params.role,
        createAt: serverTimestamp(),
        updateAt: serverTimestamp(),
    };
    const docRef = await addDoc(collection(db, 'role'), data);
    return { user, role: { id: docRef.id, ...data } };
});
export const signInPassWord = createAsyncThunk('auth/signInPassWord', async (params, thunkAPI) => {
    const { email, password } = params;
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const userPassword = userCredential.user;
    let user = null;
    const q = query(collection(db, 'role'), where('userId', '==', userPassword.uid));
    const querySnapshot = await getDocs(q);

    // get data user
    const q1 = query(collection(db, 'user'), where('uid', '==', userPassword.uid));
    const querySnapshot1 = await getDocs(q1);
    // check data user exits
    if (querySnapshot1.empty) {
        await addDoc(collection(db, 'user'), {
            providerData: { ...userPassword.providerData },
            uid: userPassword.uid,
            userId: userPassword.uid,
            photoURL: userPassword.photoURL,
            email: userPassword.email,
            displayName: userPassword.displayName,
            phoneNumber: userPassword.phoneNumber,
            createAt: Date.now(),
        });
        user = {
            providerData: { ...userPassword.providerData },
            uid: userPassword.uid,
            userId: userPassword.uid,
            photoURL: userPassword.photoURL,
            email: userPassword.email,
            displayName: userPassword.displayName,
            phoneNumber: userPassword.phoneNumber,
            createAt: Date.now(),
            stsTokenManager: {
                // accessToken: userCredential,
                refreshToken: userPassword.refreshToken,
            },
        };
    } else {
        user = {
            ...querySnapshot1.docs.map((doc) => doc.exists && { id: doc.id, ...doc.data() })[0],
            stsTokenManager: {
                // accessToken: userCredential.accessToken,
                refreshToken: userPassword.refreshToken,
            },
        };
    }
    // check data role exits
    // if (querySnapshot.empty) {
    //     const data = {
    //         userId: userPassword.uid,
    //         role: 'user',
    //         createAt: serverTimestamp(),
    //         updateAt: serverTimestamp(),
    //     };
    //     const roleRef = await addDoc(collection(db, 'role'), data);
    //     return { user, role: { id: roleRef.id, ...data } };
    // }
    // read data
    const role = querySnapshot.docs.map((doc) => doc.exists && { id: doc.id, ...doc.data() })[0];
    return { user: user, role: role };
});

export const signInGoogle = createAsyncThunk('auth/signInGoogle', async (params, thunkAPI) => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
    const credential = GoogleAuthProvider.credentialFromResult(userCredential);
    // const token = credential.accessToken;
    const userGoogle = userCredential.user;
    let user = null;
    // get role
    const q = query(collection(db, 'role'), where('userId', '==', userGoogle.uid));
    const querySnapshot = await getDocs(q);
    // get data user
    const q1 = query(collection(db, 'user'), where('uid', '==', userGoogle.uid));
    const querySnapshot1 = await getDocs(q1);
    // check data user exits
    if (querySnapshot1.empty) {
        await addDoc(collection(db, 'user'), {
            providerData: { ...userGoogle.providerData },
            uid: userGoogle.uid,
            userId: userGoogle.uid,
            photoURL: userGoogle.photoURL,
            email: userGoogle.email,
            displayName: userGoogle.displayName,
            phoneNumber: userGoogle.phoneNumber,
            createAt: Date.now(),
        });
        user = {
            providerData: { ...userGoogle.providerData },
            uid: userGoogle.uid,
            userId: userGoogle.uid,
            photoURL: userGoogle.photoURL,
            email: userGoogle.email,
            displayName: userGoogle.displayName,
            phoneNumber: userGoogle.phoneNumber,
            createAt: Date.now(),
            stsTokenManager: {
                accessToken: credential.accessToken,
                refreshToken: userGoogle.refreshToken,
            },
        };
    } else {
        user = {
            ...querySnapshot1.docs.map((doc) => doc.exists && { id: doc.id, ...doc.data() })[0],
            stsTokenManager: {
                accessToken: credential.accessToken,
                refreshToken: userGoogle.refreshToken,
            },
        };
    }
    // check data role exits
    if (querySnapshot.empty) {
        const data = {
            userId: userGoogle.uid,
            role: 'user',
            createAt: serverTimestamp(),
            updateAt: serverTimestamp(),
        };
        const roleRef = await addDoc(collection(db, 'role'), data);
        return { user, role: { id: roleRef.id, ...data } };
    }
    // read data
    const role = querySnapshot.docs.map((doc) => doc.exists && { id: doc.id, ...doc.data() })[0];
    return { user: user, role: role };
});
export const signInFacebook = createAsyncThunk('auth/signInFacebook', async (params, thunkAPI) => {
    const userCredential = await signInWithPopup(auth, facebookAuthProvider);
    const credential = FacebookAuthProvider.credentialFromResult(userCredential);
    // const token = credential.accessToken;
    const user = userCredential.user;
    const q = query(collection(db, 'role'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        const data = {
            userId: user.uid,
            role: 'user',
            createAt: serverTimestamp(),
            updateAt: serverTimestamp(),
        };
        const roleRef = await addDoc(collection(db, 'role'), data);
        return { user, role: { id: roleRef.id, ...data } };
    }
    const role = querySnapshot.docs.map((doc) => doc.exists && { id: doc.id, ...doc.data() })[0];
    return { user, role: role };
});
export const logout = createAsyncThunk('auth/logout', async (params, thunkAPI) => {
    await signOut(auth);
});

export const updateProfile = createAsyncThunk('auth/updateProfile', async (params, thunkAPI) => {
    // const data = {
    //     displayName: params?.displayName,
    //     photoURL: params?.photoURL
    // }
    handleUpdateProfile(params)
    return auth.currentUser
});

export const authSlice = createSlice({
    name: 'auth',
    initialState: {
        currentUser: null,
        loading: false,
        error: '',
        typeLogin: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(signInPassWord.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInPassWord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(signInPassWord.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = '';
            state.typeLogin = 'password';
        });
        builder.addCase(signUpPassWord.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signUpPassWord.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(signUpPassWord.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = '';
            state.typeLogin = 'password';
        });
        builder.addCase(signInGoogle.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInGoogle.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(signInGoogle.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = '';
            state.typeLogin = 'google';
        });
        builder.addCase(signInFacebook.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInFacebook.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(signInFacebook.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
            state.error = '';
            state.typeLogin = 'facebook';
        });
        builder.addCase(logout.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(logout.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(logout.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = null;
            state.typeLogin = null;
            state.error = '';
        });
        builder.addCase(updateProfile.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateProfile.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(updateProfile.fulfilled, (state, action) => {
            state.loading = false;
            state.typeLogin = null;
            state.error = '';
            state.currentUser.user = action.payload;
        });
    },
});

export default authSlice.reducer;
