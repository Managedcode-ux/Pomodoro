import {  extendType, intArg, mutationField, nonNull, objectType, stringArg } from "nexus";
import { DateScalar } from "./CustomTypes/customTypes";
import { Priority } from "./CustomTypes/Enums";
import { data } from "../testData";
import { title } from "process";



export const Task = objectType({
  name:"Task",
  definition(t){
    t.nonNull.id("TaskId")
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
    t.nonNull.field("CreatedOn",{
      type:DateScalar
    })
  }
})


// TODO :- Create a Query to get tasks
// TODO :- Create a mutation to create tasks
// TODO :- Create a mutation to delete tasks
// TODO :- Create a mutation to update tasks
const tasks_list:any = []


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



export const CreateTask  = mutationField('CreateTask',{
  type: "Boolean",
  args:{
    Title:nonNull(stringArg()),
    Description:nonNull(stringArg()),
    DueDate:DateScalar,
    Priority:stringArg(),
    CreatedOn:DateScalar
    
  },
  resolve(parent,args,context){

    const {Title,Description,DueDate,CreatedOn,Priority} = args

    tasks_list.push({
      "Title":Title,
      "Description":Description,
      "DueDate":DueDate,
      "CreatedOn":CreatedOn,
      "Priority":Priority
    })


    console.log("PARENT =>",parent)
    console.log("ARGS =>",args)
    console.log("CONTEXT =>",context)

  }
}) 