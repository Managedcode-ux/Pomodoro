// import {useState} from "react";
//
// const TestingComponent = () => {
//   const [Inputs,setInputs] = useState({});
//
//   const handleChange = (e:any) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setInputs((values) => (
//         {...values,[name]:value}
//       )
//     )
//   }
//
//   const handleSubmit = (e:any) => {
//     e.preventDefault();
//     console.log(Inputs)
//   }
//
//
//   return(
//     <form onSubmit={handleSubmit}>
//       <label>
//         Email:
//         <input typeof='Email'
//           name="Email"
//           value={Inputs.Email || ""}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Password:
//         <input typeof='text'
//           name="Password"
//           value={Inputs.Password || ""}
//           onChange={handleChange}
//         />
//       </label>
//       <label>
//         Username:
//         <input typeof='text'
//           name="Username"
//           value={Inputs.Username || ""}
//           onChange={handleChange}
//         />
//       </label>
//       <button type='submit'>SignUp</button>
//     </form>
//   )
// }
//
// export  default TestingComponent
//
//
