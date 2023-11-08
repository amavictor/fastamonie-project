import AsyncStorage from "@react-native-async-storage/async-storage";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { persistStore,persistReducer, FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE } from "redux-persist";
import { userReducer } from "./Reducers";
import { api } from "./Services/api";

const persistConfig = {
    key: "root",
    version: 1,
    storage: AsyncStorage
}

const rootReducer = combineReducers({
    user: userReducer,
    [api.reducerPath]: api.reducer
})

const persistedRducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedRducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoreActions: [
                    FLUSH,
                    REHYDRATE,
                    PAUSE,
                    PERSIST,
                    PURGE,
                    REGISTER
                ]
            }
        }).concat(api.middleware)
})

export let persistor = persistStore(store)

export default store