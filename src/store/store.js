
import { configureStore } from "@reduxjs/toolkit";
import  userReducer from "./features/userSlice";
import taskReducer from "./features/taskSlice"
// jab export default hota haa toh kohi bhi name dy sakhty hein
// or {} lagana zaroori nahi haa 
// jabky sirf export hoo toh name exactly same hona chaie or {} use hon gy
export const store=configureStore({
    reducer:{
        user:userReducer,
        tasks: taskReducer,// 'tasks' is the name you'll use in useSelector
    }
})