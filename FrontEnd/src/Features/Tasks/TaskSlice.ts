import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { gql, useQuery } from '@apollo/client'
import { useSelector } from "react-redux";

export const getAllTasksQuery = gql`
  query GetTasks($sortPrefrence:Sorting){
    GetTasks(SortPreference:$sortPrefrence){
      CompletionStatus
      CreatedOn
      Description
      DueDate
      Priority
      Title
      Tomatoes
    }
  }

`

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  console.log("INSIDE FETCH TASKS")
  const token = useSelector((state: any) => state.baseReducer.user.token);
  const { loading, error, data } = useQuery(getAllTasksQuery, {
    variables: { "sortPreference": "ALL" },
    context: {
      headers: {
        authorization: token,
      },
    },
  })
  if (loading) {
    console.log(loading)
  }
  if (error) {
    console.log(error)

  }
  if (data) {
    console.log(data)
    return data
  }
})

// export const fetchTasksTest = async () => {
//   console.log("INSIDE FETCH TASKS")
//   const token = useSelector((state: any) => state.baseReducer.user.token);
//   const { loading, error, data } = useQuery(getAllTasksQuery, {
//     variables: { "sortPreference": "ALL" },
//     context: {
//       headers: {
//         authorization: token,
//       },
//     },
//   })
//   if (loading) {
//     console.log(loading)
//   }
//   if (error) {
//     console.log(error)

//   }
//   if (data) {
//     console.log(data)
//     return data
//   }
// }






const TaskInitialState = {
  status: 'idle',
  error: '',
  tasks: []
}

const TaskSlice = createSlice({
  name: "tasks",
  initialState: TaskInitialState,
  reducers: {
    getTasks(state, action) {
      console.log("State , Action inside getTask ==>", state, action)
    }
  },
  extraReducers(builder) {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        console.log(state, action)
        state.status = 'Succeeded'
        state.tasks = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        console.log(state, action)
        state.status = 'failed'
        if (action.error.message !== undefined)
          state.error = action.error.message
      })
  }
})




export const selectAllTasks = (state: any) => state.baseReducer.task.taskList

export const { getTasks } = TaskSlice.actions

export default TaskSlice.reducer