import { Box, TextInput,Select, Textarea, Group, Button } from "@mantine/core";
import {DateTimePicker } from "@mantine/dates";
import {useMutation, gql} from "@apollo/client"
import { useState } from "react";
import { useSelector } from "react-redux";
import { getToken } from "../Users/UserSlice";

const addTaskMutation = gql`
  mutation CreateTask($task: [TaskInputType!]!) {
  CreateTask(Task: $task)
}
`

function AddTasks() {
  const token = useSelector(getToken)
  const [Priorityvalue,setPriorityValue] = useState('')
  const [DueDatevalue, setDueDateValue] = useState<Date | null>(new Date);
  const [DescriptionValue,setDescriptionValue] = useState('')
  const [TitleValue,setTitleValue] = useState('')
  const [addTask,{data,loading,error}] = useMutation(addTaskMutation)
  console.log(new Date().toISOString())
  console.log(token)
  const handlePriorityChange = (value: any) => {
    setPriorityValue(value)
  }

  const submitFormData = (e:any) => {
    console.log(e)
    e.preventDefault()
    console.log("Inside handle form submit")

    const finalTaskVar = {
      "CreatedOn": new Date().toISOString(),
      "Description": DescriptionValue,
      "DueDate": DueDatevalue,
      "Title": TitleValue,
      "Priority": Priorityvalue
    }

    addTask({
      variables:{
        "tasks":[finalTaskVar]
      },
      context:{
        headers:{
          authorization:token
        }
      }
    }
    )
    console.log(data)
    console.log(error)
    console.log(loading)

  }

  return (
    <Box maw={340} mx='auto'>
      <form onSubmit={submitFormData}>
        <TextInput
        label="Title"
        placeholder="Title goes here!"
        withAsterisk
        required
        value={TitleValue}
        onChange={(event) => setTitleValue(event.currentTarget.value)}
        />

        <Textarea 
        withAsterisk 
        label="Description" 
        placeholder="Add details about the task." 
        autosize
        minRows={2}
        value={DescriptionValue}
        onChange={(event) => setDescriptionValue(event.currentTarget.value)}
        />
        
        <DateTimePicker 
        // disabled
        valueFormat="DD MMM YYYY"
        label = 'Due Date.'
        clearable
        minDate={new Date()}
        value={DueDatevalue}
        onChange={setDueDateValue}
        />

        <Select
        checkIconPosition="right"
        allowDeselect
        clearable
        label = 'Priority'
        data={['HIGH','LOW',"MODERATE"]}
        value={Priorityvalue}
        onChange={handlePriorityChange}
        />
      <Group justify="flex-end" mt="md">
        <Button type="submit">Add Task</Button>
      </Group>
      </form>
    </Box>
  );
}

export default AddTasks;
