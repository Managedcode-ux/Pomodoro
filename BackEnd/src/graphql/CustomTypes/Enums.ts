import { enumType } from "nexus"

export const Priority = enumType({
  name:"Priority",
  members:["LOW","MODERATE","HIGH"]
})

export const SortPreference = enumType({
  name:"Sorting",
  members:["ALL","COMPLETED","INCOMPLETE"]
})
