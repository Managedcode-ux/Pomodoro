import {gql, useMutation} from "@apollo/client";
import {useState} from "react";

// const signup_query = gql`
//     {
//         CreateUser(Email:"dev1",Password:"dev1",Username:"dev1"){
//             Email
//             Password
//             Username
//         }
//     }
// `

const test = gql`
    mutation CreateUser($userInput: UserInputType!) {
        CreateUser(UserInput: $userInput) {
            Email
            UserId
            Username
        }
    }
`

let Comp = () => {
  const [todoInput, setTodoInput] = useState('')
  const [addTodo,{data}] = useMutation(test)

  console.log("DATA ==>", data)


  return(
  <div>
   <form
     className='formInput'
     onSubmit={(e) => {
       e.preventDefault();
       addTodo({variables:{
          userInput: {
            Email: "testing000",
            Password: "testing000",
            Username: "testing000",
          }
         }})
     }
   }>
     <input
        className='input'
        placeholder="Somthing"
        value={todoInput}
        onChange={e => (setTodoInput(e.target.value))}
     />
     <i className="inputMarker fa fa-angle-right"/>
   </form>
    <p>{JSON.stringify(data)}</p>
  </div>
  )
}


// let Comp = () =>{
//   let input: HTMLInputElement | null;
//   const [addTodo,{data}] = useMutation(test)
//   addTodo({
//     Email: "testing1",
//     "Password": null,
//     "Username": null
//   })
//   console.log("ANYTHING ==>",addTodo)
//   console.log("DATA ==>", data)
//
//   return(
//     <form
//       onSubmit={e => {
//         e.preventDefault();
//         addTodo({ variables: { type: input.value } });
//         input.value = '';
//       }}
//     >
//       <input
//         ref={node => {
//           input = node;
//         }}
//       />
//       <button type="submit">Add Todo</button>
//     </form>
//   )
// }

export default Comp