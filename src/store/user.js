import {createSlice} from '@reduxjs/toolkit'

export const slice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        data: {},
    },
    reducers: {
        fetchUser: () => ({
            isLoading: true,
        }),
        updateUser: (state, action) => ({
            isLoading: false,
            data: action.payload,
        }),
        removeUser: () => ({
            isLoading: false,
            data: {},
        })
    }

})

export const {fetchUser, updateUser, removeUser} = slice.actions

export const selectUserLoading = state => state.user.isLoading
export const selectUser = state => state.user.data

export const getUserAsync = () => async (dispatch) => {
    const idToken = localStorage.getItem('idToken')
    if (idToken) {
        dispatch(fetchUser())
        const requestOption = {
            method: 'POST',
            body: JSON.stringify({
                idToken,
            })
        }

        const response = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyAdIUyKVVt5NGUHpfVuO_hfayQRuZpvkXw ', requestOption).then(res => res.json())

        if (response.hasOwnProperty('error')) {
            localStorage.removeItem('idToken')
            dispatch(removeUser())
        } else {
            dispatch(updateUser(response.users[0]))
            console.log(response.users[0])
        }
    } else {
        dispatch(removeUser())
    }
}

export default slice.reducer