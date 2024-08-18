import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'globaluser',
    initialState: {
        user: null
    },
    reducers: {
        logout: state => {

            state.user = null;
        },

        login: (state, action) => {
            state.user = action.payload
        }
    }
})

// Action creators are generated for each case reducer function
export const { login, logout } = userSlice.actions

export default userSlice.reducer