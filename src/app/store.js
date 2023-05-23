import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import authReducer from '~/features/authSlice';
import MyPlayListReducer from '~/service/publish/publish';
const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: [],
};

export default configureStore({
    reducer: {
        auth: authReducer,
        myplaylist: MyPlayListReducer,
    },
});

const rootReducer = combineReducers({ auth: authReducer, myplaylist: MyPlayListReducer });
const persistedReducer = persistReducer(persistConfig, rootReducer);
export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export let persistor = persistStore(store);
