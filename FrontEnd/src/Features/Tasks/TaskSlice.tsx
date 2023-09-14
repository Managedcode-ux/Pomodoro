// import {createSlice,createAsyncThunk,nanoid} from "@reduxjs/toolkit";
// import {createApi,fetchBaseQuery} from "@reduxjs/toolkit/query";
// import {EndpointBuilder} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
// // import meta.env.VITE_MAIN_API
// import {gql,useQuery} from "@apollo/client";
// import {loadConfigFromFile} from "vite";
//
//
// const GET_TASKS = gql`
//     query GetTask {
//         Task{
//             CompletionStatus
//             CreatedOn
//             Description
//             DueDate
//             Priority
//             Title
//             Tomatoes
//         }
//     }
// `;
//
// export function Tasks({onDogSelected}){
//     const {loading, error, data} = useQuery(GET_TASKS)
//
//     if (loading) return 'Loading...';
//
//     if (error) return `Error! ${error.message}`;
//
//     console.log("LOADING ==>",loading)
//     console.log("ERROR ==>",error)
//     console.log("DATA==>",data)
//
//
//     return (
//
//       <select name='dog' onChange={onDogSelected}>
//
//           {data.dogs.map((dog) => (
//
//             <option key={dog.id} value={dog.breed}>
//
//                 {dog.breed}
//
//             </option>
//
//           ))}
//
//       </select>
//
//     );
// }
//
