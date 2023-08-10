import {  extendType, inputObjectType, intArg, list, mutationField, nonNull, nullable, objectType, stringArg } from "nexus";
import { DateScalar } from "./CustomTypes/customTypes";
import { Priority } from "./CustomTypes/Enums";
import {prisma_obj} from "../prisma/prisma"
import { GraphQLError } from "graphql";

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
export const TasksQuery = extendType({ type:'Query',
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
  type: 'Boolean',
  args:{
    Task:nonNull(list(nonNull(TaskInput)))
  },
  async resolve(parent,args,context){

    if(!context.finalUser){
      throw new GraphQLError("Unauthenticated",{
        extensions:{
          code:"Please login/Signup to proceed!",
          status:{code:401}
        }
      })
    }

    const InputTask = args.Task
    const UserId = context.finalUser.UserId

    InputTask.forEach((task:any) => {
      task["userId"] = UserId;
    });

    try{
      const insertedData = await prisma_obj.task_coll.createMany({
        data:InputTask
      });

      if(insertedData.count === InputTask.length){ 
        return true;
      }
      else{
        return false;
      }
    }catch(e){
      console.log(e);
      return e;
    }  

  }
})
