import {  extendType, inputObjectType, intArg, list, mutationField, nonNull, nullable, objectType, stringArg } from "nexus";
import { DateScalar } from "./CustomTypes/customTypes";
import { Priority } from "./CustomTypes/Enums";
import { Task_db } from "nexus-prisma";
import {prisma_obj} from "../prisma/prisma"

export const TaskInput = inputObjectType({
  name:"TaskInputType",
  definition(t) {
    t.nonNull.string("Title")
    t.string("Description")
    // t.field("DueDate", {type:DateScalar});
    // t.nonNull.field("CreatedOn",{
    //   type:DateScalar
    // })
    t.string("DueDate")
    t.nonNull.string("CreatedOn")
    t.field("Priority",{
      type:Priority
    })
  },
})



export const Task = objectType({
  name:"Task",
  definition(t){
    t.nonNull.id("TaskId")
    t.nonNull.id("UserId")
    t.nonNull.string("Title")
    t.nonNull.string("Description")
    // t.nonNull.field("DueDate",{
    //   type:DateScalar
    // })
    t.nonNull.string("DueDate")
    t.nonNull.int("Tomatoes")
    t.field("Priority",{
      type:Priority
    })
    t.nonNull.boolean("CompletionStatus")
    // t.nonNull.field("CreatedOn",{
    //   type:DateScalar
    // })
    t.nonNull.string("CreatedOn")
  }
})

// FIXME:- Convert CreatedOn and DueDate inside Task(ObjectType) and TaskInput to DateScalar when frontend is completed


// TODO 1:- Create a Query to get tasks 
// TODO 2:- Create a mutation to create tasks
// TODO 3:- Connect graphQL to mongo
// TODO 4:- Create a mutation to delete tasks
// TODO 5:- Create a mutation to update tasks
const tasks_list:any = []



// Get Tasks Query
export const TasksQuery = extendType({
  type:'Query',
  definition(t){
    t.list.nonNull.field("Tasks",{
      type:'Task',
      resolve(parent,args,context){

        
        console.log("PARENT =>",parent)
        console.log("ARGS =>",args)
        console.log("CONTEXT =>",context)
        // console.log(data)
        console.log(tasks_list)
        return tasks_list
      }
    })
  }
})




// CREATE TASK MUTATION



export const CreateTask = mutationField('CreateTask',{
  type: list(nonNull(Task)),
  args:{
    Task:list(nonNull(TaskInput))
  },
  async resolve(parent,args,context){
    
      const InputTask = args.Task

    // console.log("INPUT TASK ==>", InputTask)

    // const res = 
    try{
      // await prisma_obj.task_db.createMany({
      //   data:InputTask
      // })

      const res = await prisma_obj.$runCommandRaw({
        insert:'Task_db',
        bypassDocumentValidation:false,
        documents:InputTask
      })


      console.log(res)
      console.log(typeof(res))

      
    }catch(e){
      console.log("Something went wrong")
      console.log(e)
    }
    // if(typeof(res))

    // console.log("Result ==>",res)
    // console.log("Result type ==>",typeof(res))

    

    
  }
}) 