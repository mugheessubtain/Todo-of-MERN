
import { createSlice } from "@reduxjs/toolkit";

const  initialState={
    isLogin:false,
    user:null
}


export const userSlice=createSlice({
    name:"user",
    initialState,
    reducers:{
        logOut:(state)=>{
            state.isLogin=false,
            state.user=null
        },
        logIn:(state,action)=>{
            state.user+=action.payload,
            state.isLogin=true
        },
        Signup:(state,action)=>{
            state.user+=action.payload,
            state.isLogin=true
        },

    },
})

export const {logIn,logOut,Signup}=userSlice.actions


export default userSlice.reducer