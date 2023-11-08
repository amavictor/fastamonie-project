import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		details: {
			onboard:true
		},
		
	},
	reducers: {
		configUser: (state, action) => {
			state.details = action;
		},
	},
});

const { actions, reducer: userReducer } = userSlice;

const { configUser } = actions;

export { userReducer, configUser };