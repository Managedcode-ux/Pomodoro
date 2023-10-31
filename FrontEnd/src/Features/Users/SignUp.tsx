import {gql, useMutation} from "@apollo/client";
import {useRef} from "react";



const SignUpUser = gql`
    mutation CreateUser($userInput: UserInputType!) {
        CreateUser(UserInput: $userInput) {
            Email
            UserId
            Username
        }
    }
`


const  SignUpComp = () => {

 // This code snippet is using the `useMutation` hook to handle the sign-up process for a user. It is likely making a network request to a server to create a new user account.
  const [signUpUser,{data,loading}] =useMutation(SignUpUser)
  const UserNameInputRef = useRef<HTMLInputElement|null>(null)
  const PasswordInputRef = useRef<HTMLInputElement|null>(null)
  const EmailInputRef = useRef<HTMLInputElement|null>(null)

  if(loading)
    return <p>Submitting</p>

  const handleSubmit = async (e:any) => {
    let input
    e.preventDefault();

     input = {
        Email: (EmailInputRef.current as HTMLInputElement | null)?.value || "" ,
        Password: (PasswordInputRef.current as HTMLInputElement| null)?.value ||"",
        Username: (UserNameInputRef.current as HTMLInputElement|null)?.value || ""
      }
    try{
      const final_data = await signUpUser({variables:{userInput:input}})
      console.log("FINAL_DATA ==>",final_data)
    }catch (e:any){
      for(let subError of e.graphQLErrors){
        console.log(subError.message)
      }
    }
  }

  return(
    <>
      <form className='SignUpInput' onSubmit={handleSubmit}>
        <label>
          Email:
          <input
            ref={EmailInputRef}
            type='email'
            className='Email'
            placeholder="Email"
          />
        </label>
        <label>
          Password:
          <input
            ref = {PasswordInputRef}
            type='password'
            className='Password'
            placeholder="Password"
          />
        </label>
        <label>
          UserName:
          <input
            ref = {UserNameInputRef}
            type='text'
            className='Username'
            placeholder="Username"
          />
        </label>
        <button type='submit'>SignUp</button>
      </form>
      <p>{JSON.stringify(data)}</p>
    </>
  )
}


export default SignUpComp

