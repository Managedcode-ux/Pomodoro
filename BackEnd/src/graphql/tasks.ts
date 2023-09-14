import {  extendType, inputObjectType, list, mutationField, nonNull,objectType} from "nexus";
import { DateScalar } from "./CustomTypes/customTypes";
import { Priority,SortPreference } from "./CustomTypes/Enums";
import {prisma_obj} from "../../prisma/prisma"
import { GraphQLError } from "graphql";
import {TYPEGEN_HEADER} from "nexus/dist-esm/lang";
import {stringArg} from "nexus/dist/core";
import {InputDefinitionBlock} from "nexus/dist-esm/definitions/definitionBlocks";

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

export const TaskUpdateInput = inputObjectType({
  name: "UpdateTaskType",
  definition(t) {
    t.nullable.string("Title")
    t.nullable.string("Description")
    t.nullable.string("DueDate")
    t.nullable.field("Priority",{
      type:Priority
    })
  }
})


export const Task = objectType({
  name:"Task",
  definition(t){
    // t.nonNull.id("TaskId")
    // t.nonNull.id("UserId")
    t.nonNull.string("Title")
    t.nonNull.string("Description")
    // t.nonNull.field("DueDate",{
    //   type:DateScalar
    // })
    t.string("DueDate")
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


// TODO 1:- Create a Query to get tasks (Done)
// TODO 2:- Create a mutation to create tasks(Done)
// TODO 3:- Connect graphQL to mongo(Done)
// TODO 4:- Create a mutation to delete tasks(Done)
// TODO 5:- Create a mutation to update tasks




// Get Tasks Query
export const Get_Tasks = extendType({
  type:"Query",
  definition: t=>{
    t.field('GetTasks',{
      type:list(Task),
      args:{SortPreference},
      async resolve(parent,args,context){
        
        const choice = args.SortPreference
        
        if(!context.finalUser){
          throw new GraphQLError("Unauthenticated",{
            extensions:{
              code:"Please login/Signup to proceed!",
              status:{code:401}
            }
          })
        }
        switch (choice) {
          case 'ALL':
            try{
              const AllTasks = await prisma_obj.task_coll.findMany({
                where: {
                  userId: context.UserId
                },
              })
              return AllTasks;
            }catch (e) {
              throw new GraphQLError("Something went wrong!Please try again later")
            }
            break;
          case 'COMPLETED':
            try {
              const CompletedTasks = await prisma_obj.task_coll.findMany({
                where: {
                  AND: [
                    {
                      userId: context.UserId
                    },
                    {
                      CompletionStatus: {
                        not: false
                      }
                    }
                  ]
                }
              })
              return CompletedTasks
            }
            catch (e){
              throw new GraphQLError("Something went wrong!Please try again later")
            }
            break;
          case 'INCOMPLETE':
            try{
              const IncompleteTasks = await prisma_obj.task_coll.findMany({
                where:{
                  AND:[
                      {
                        userId:context.UserId
                      },
                      {
                        CompletionStatus:{
                          not:true
                        }
                      }
                  ]
                }
              })
              return IncompleteTasks
            }catch (e) {
              return e
            }
            break;

        }
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

      return insertedData.count === InputTask.length;
    }catch(e){

      return e;
    }

  }
})

export const DeleteTask = mutationField("DeleteTask",{
  type:"Boolean",
  args:{
    TaskId: nonNull(list(stringArg()))
  },
  async resolve(parents,args,context){
    if(!context.finalUser){
      throw new GraphQLError("Unauthenticated",{
        extensions:{
          code:"Please login/Signup to proceed!",
          status:{code:401}
        }
      })
    }
    const taskId = args.TaskId

    if(taskId.length <= 0){
      throw new GraphQLError("Method not allowed",{
        extensions:{
          code:"List can not be empty, atleast one element should be selected",
          status:{code:"405"}
        }
      })
    }
    try {
      const deletedData = await prisma_obj.task_coll.deleteMany({
        where: {
          id: {in: taskId}
        }
      })

      return deletedData.count === taskId.length;
    }
    catch (e) {
      return false
    }
  }
})

export const updateTask = mutationField("UpdateTask",{
  type:Task,
  args:{TaskUpdateInput},
  async resolve(parents,args,context){
    console
  }
})