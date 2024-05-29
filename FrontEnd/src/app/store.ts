import { combineReducers, configureStore } from "@reduxjs/toolkit";
import UserReducers from "../Features/Users/UserSlice.ts"
import TaskReducer from "../Features/Tasks/TaskSlice.ts"
import storage from 'redux-persist/lib/storage';
import thunk from 'redux-thunk';
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import persistStore from "redux-persist/es/persistStore";
// import storageSession from 'redux-persist/lib/storage/session'


const rootReducer = combineReducers({
	user: UserReducers,
	task: TaskReducer
})



const persistConfig = {
	key: 'root',
	storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

// export default configureStore({
// 	reducer: {
// 		users: UserReducers
// 	}
// })

export const store = configureStore({
	reducer: {
		baseReducer: persistedReducer,
	},
	middleware: [thunk]
})

// export const store = configureStore({
// 	reducer: {
// 		baseReducer: persistedReducer,
// 	},
// 	middleware: (getDefaultMiddleware) => (
// 		getDefaultMiddleware({
// 			serializableCheck: {
// 				ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
// 			}
// 		}).concat(thunk)
// 	)
// })



export const persistor = persistStore(store)