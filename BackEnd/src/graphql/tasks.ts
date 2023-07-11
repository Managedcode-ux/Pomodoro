import { asNexusMethod, enumType, extendType, objectType, scalarType } from "nexus";
import { DateScalar } from "./CustomTypes/customTypes";
import { Priority } from "./CustomTypes/Enums";
import { title } from "process";
import { data } from "../testData";
// export const date_type = asNexusMethod(DateScalar,"date")

export const Task = objectType({
  name:"Task",
  definition(t){
    t.nonNull.id("Id")
    t.nonNull.id("UserId")
    t.nonNull.string("Title")
    t.nonNull.string("Description")
    t.nonNull.field("DueDate",{
      type:DateScalar
    })
    t.nonNull.int("Tomatoes")
    t.field("Priority",{
      type:Priority
    })
    t.nonNull.boolean("CompletionStatus")
  }
})


export const getAllTasks = extendType({
  type:'Query',
  definition(t){
    t.list.nonNull.field("Tasks",{
      type:'Task',
      resolve(parent,args,context){
        console.log("PARENT =>",parent)
        console.log("ARGS =>",args)
        console.log("CONTEXT =>",context)
        console.log(data)
      }
    })
  }
})