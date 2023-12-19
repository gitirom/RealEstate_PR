import { combineReducers, configureStore } from '@reduxjs/toolkit';
import userReducer from './user/userSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({user: userReducer})

const persistConfig = {    //Redux Persist is to seamlessly save the application's Redux state object to persistent storage, such as AsyncStorage or local storage, and retrieve it on app launch, thus preserving the state across app sessions
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