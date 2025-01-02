import { apiRoutes } from '@/constant/constant';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import axios from 'axios'
import { getCookie } from 'cookies-next';

export const fetchTask = createAsyncThunk('tasks/fetchTask', async () => {
    const token = getCookie('token');
    const response = await axios.get(apiRoutes.getTask, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
    console.log("TASK API CALLED=>", response.data)
    return response.data.data 
})

export const addTask = createAsyncThunk('tasks/addTask', async (task) => {
    const token = getCookie('token');
    const response = await axios.post(apiRoutes.postTask, task, {
        headers: {
            Authorization: `Bearer ${token}`
        },
    })
    console.log("TASK ADDED=>", response.data)
    return response.data.data 
})


export const deleteTask = createAsyncThunk('tasks/deleteTask', async (id) => {
    const token = getCookie("token");
    const response = await axios.delete(`${apiRoutes.delete}/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    });
    console.log('Task deleted:', response.data);
    return id;
});

export const updateTask = createAsyncThunk("tasks/updatedTask", async ({ id, task }) => {
    const token = getCookie("token");
    const response = await axios.put(`${apiRoutes.update}/${id}`, task, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    console.log("task updated: ", response.data);
    return response.data.data; 
})
const initialState = {
    tasks: [],
    isLoading: true,
    status: "pending",
    error: null
}

export const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(fetchTask.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.tasks = action.payload; 
            })
            .addCase(fetchTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message ?? 'Unknown Error';
            })
            .addCase(addTask.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(addTask.fulfilled, (state, action) => {
                console.log("Add Task Fulfilled, new task:", action.payload);
                state.status = 'succeeded';
                if (action.payload) {
                    state.tasks.push(action.payload); 
                } else {
                    console.error('Invalid payload structure:', action.payload);
                }
            })
            .addCase(deleteTask.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(deleteTask.fulfilled, (state, action) => {
                console.log("Task deleted, ID:", action.payload);
                state.status = 'succeeded';
                state.tasks = state.tasks.filter(task => task._id !== action.payload); 
            })
            .addCase(deleteTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Unknown Error';
            })
            .addCase(updateTask.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(updateTask.fulfilled, (state, action) => {
                state.status = 'succeeded';
                console.log("Task updated:", action.payload);
            
                state.tasks = state.tasks.map(task => 
                    task._id === action.payload._id ? action.payload : task
                ); 
            })
            .addCase(updateTask.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || 'Unknown Error';
            })

    }
})

export default taskSlice.reducer
