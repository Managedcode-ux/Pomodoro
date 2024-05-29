import { configureStore } from "@reduxjs/toolkit";
import UserReducers from "../Features/Users/UserSlice.ts"
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
// import storageSession from 'redux-persist/lib/storage/session'


const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, UserReducers)

// export default configureStore({
// 	reducer: {
// 		users: UserReducers
// 	}
// })
export const store = configureStore({
	reducer: {
		users: persistedReducer
	},
	middleware: [thunk]
})

export const persistor = persistStore(store)