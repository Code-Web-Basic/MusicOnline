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
    const user = userCredential.user;
    const q = query(collection(db, 'role'), where('userId', '==', user.uid));
    console.log(user.uid);
    const querySnapshot = await getDocs(q);
    const role = querySnapshot.docs.map((doc) => doc.exists && { id: doc.id, ...doc.data() })[0];
    return { user, role: role };
});

export const signInGoogle = createAsyncThunk('auth/signInGoogle', async (params, thunkAPI) => {
    const userCredential = await signInWithPopup(auth, googleAuthProvider);
    const credential = GoogleAuthProvider.credentialFromResult(userCredential);
    // const token = credential.accessToken;
    const user = userCredential.user;
    const q = query(collection(db, 'role'), where('userId', '==', user.uid));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
        console.log(querySnapshot);
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
export const logOut = createAsyncThunk('auth/logout', async (params, thunkAPI) => {
    await signOut(auth);
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
        builder.addCase(logOut.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(logOut.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error;
        });
        builder.addCase(logOut.fulfilled, (state, action) => {
            state.loading = false;
            state.currentUser = null;
            state.typeLogin = null;
            state.error = '';
        });
    },
});

export default authSlice.reducer;
