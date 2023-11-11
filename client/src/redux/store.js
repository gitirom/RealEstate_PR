import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({user: userReducer})

const persistConfig = {    //persist it's just for getting store the user in the locale storage and not getting lose the current user
    key: 'root',
    storage,
    version: 1,
}

const persistedReducer = persistReducer(persistConfig, rootReducer);



export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
    getDefaultMiddleware({
        serializableCheck: false,             //to prevent eny error from variables
    }),
});


export const persistor = persistStore(store);