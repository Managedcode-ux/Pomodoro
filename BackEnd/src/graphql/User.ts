import { list, nonNull, objectType } from "nexus";
import { inputObjectType, mutationField, mutationType } from "nexus/dist/core";


export const User = objectType({
  name: "User",
  definition(t) {
      t.nonNull.string("UserId")
      t.nonNull.string("Username");
      t.nonNull.string("Email");
      t.nonNull.string("Password");
  },
})

export const UserInput = inputObjectType({
  name:"UserInputType",
   definition(t){
      t.nonNull.string("Username");
      t.nonNull.string("Email")
      t.nonNull.string("Password")
    }
  }
)


 export const UserCreation = mutationField("CreateUser",{
  type:User,
  args:{UserInput},
  async resolve(parents,args,context){
    console.log("ARGS ==>", args)
    const[Username, Email, Password] = args.Data
    console.log(Username,Email,Password)
  }
})  
