"use client";

import { fetchTask, addTask, deleteTask, updateTask } from "@/store/features/taskSlice";
import { logOut } from "@/store/features/userSlice";
import { setCookie } from "cookies-next";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

export default function Task() {
  const dispatch = useDispatch();
  const router = useRouter();
  const { tasks, error } = useSelector((state) => state.tasks || {});
  const [newTask, setNewTask] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [ID, setID] = useState(null);

  useEffect(() => {
    dispatch(fetchTask());
  }, [dispatch]);

  const handleDeleteTask = async (id) => {
    try {
      await dispatch(deleteTask(id)).unwrap(); // Use .unwrap() to handle createAsyncThunk promise
      toast.success(`Task deleted successfully!`);
    } catch (error) {
      toast.error(`Failed to delete task: ${error}`);
    }
  };
  const handleAddTask = () => {
    if (!newTask.trim()) {
      toast("Task cannot be empty");
      return;
    }

    setIsLoading(true);

    const taskData = { task: newTask };

    dispatch(addTask(taskData))
      .unwrap()
      .then(() => {
        setNewTask("");
        toast.success("Task added successfully!");
      })
      .catch((error) => {
        console.error("Error adding task:", error);
        toast("Failed to add task. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleEditTask = (id) => {
    toast(`Edit task with ID: ${id}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 ">


      <div className="navbar bg-neutral text-neutral-content px-8">
        <div className="navbar-start">
          <div className="dropdown">
          </div>
          <a className="btn btn-ghost text-xl">Task Manager</a>
        </div>
        <div className="navbar-center hidden lg:flex">
        </div>
        <div className="navbar-end">
          <a className="btn" onClick={() => {
            dispatch(logOut());
            setCookie("token", null);
            router.push("/");
          }}>logout</a>
        </div>
      </div>


      <main className="container mx-auto p-6">
   

        <div className="bg-white shadow-lg rounded-lg p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Add a New Task</h2>
          <div className="flex items-center gap-4">
            <input
              type="text"
              placeholder="Enter your task"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
              className="flex-grow border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <button
              onClick={handleAddTask}
              className="bg-neutral hover:bg-gray-500 text-white px-6 py-2 rounded-lg font-semibold"
              disabled={isLoading}
            >
              {isLoading ? "Adding..." : "Add Task"}
            </button>
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold mb-4">Your Tasks</h2>
          {tasks?.length ? (
            <div className="flex flex-col">
              {tasks.map((task) => (
                <div
                  key={task._id}
                  className="w-96 my-4 bg-neutral text-white rounded-lg shadow-md p-4 hover:shadow-lg transform hover:scale-105 transition duration-300"
                >
                  <div className="flex justify-between items-center">
                    <p className="text-lg">{task.task}</p>
                    <div className="flex gap-2">
                      
                      {
                        ID !== task._id ? (
                          <button
                            className="px-4 btn hover:bg-gray-400 rounded transition"
                            onClick={() => {
                              setID(task._id); 
                              setNewTask(task.task); 
                            }}
                          >
                            Edit
                          </button>
                        ) : (
                          <button
                            onClick={() => {
                              if (newTask.trim()) {
                                dispatch(updateTask({ id: task._id, task: { task: newTask } })); 
                                setID(""); 
                                setNewTask("");
                              } else {
                                alert("Task cannot be empty!"); 
                              }
                            }}
                            className="px-4 btn hover:bg-gray-400 rounded transition"
                          >
                            Save
                          </button>
                        )
                      }


                     
                      <button
                        onClick={() => handleDeleteTask(task._id)
                        }
                        className="px-4 bg-red-600 hover:bg-red-700 rounded transition"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No tasks available. Start by adding a new task!</p>
          )}
        </div>
      </main >
    </div >
  );
}
