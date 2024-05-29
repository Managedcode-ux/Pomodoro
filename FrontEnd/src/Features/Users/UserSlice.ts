import { createSlice } from "@reduxjs/toolkit";



const UserInitialState = {
	Username: null,
	Email: null,
	token: null
}


const UserSilce = createSlice({
	name: "User",
	initialState: UserInitialState,
	reducers: {
		login_user(state, action) {
			const { token, email } = action.payload
			console.log("Login User action dispatched")
			console.log("STATE ==>" + JSON.stringify(state) + " " + "ACTION ==>" + JSON.stringify(action))
			state.token = token
			state.Email = email
			//decrypt jwt to populate other fields
		},
		reset_state() {
			return UserInitialState
		}
	}
})

export const getToken = (state: any) => state.baseReducer.user.token

export const { login_user, reset_state } = UserSilce.actions

export default UserSilce.reducer