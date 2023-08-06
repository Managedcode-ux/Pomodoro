import { makeSchema } from "nexus";
import { join } from "path"
import { DateScalar } from "./graphql/CustomTypes/customTypes";
import * as types from "./graphql"


export const schema = makeSchema({
  types: [types],

  outputs: {
    schema: join(process.cwd(), "schema.graphql"),
    typegen: join(process.cwd(), "nexus.typegen.ts")
  },
})