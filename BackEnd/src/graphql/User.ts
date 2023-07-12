import { list, nonNull, objectType } from "nexus";


export const User = objectType({
  name: "User",
  definition(t) {
      t.nonNull.string("UserId")
      t.nonNull.string("Username");
      t.nonNull.string("Email");
      t.nonNull.string("Password");
      t.field("PreviousTasks",{
        type:list(nonNull('ID')),
        description: "A list of the task's previous tasks id's"
      })
      t.nonNull.id("LatestTask");
  },
})