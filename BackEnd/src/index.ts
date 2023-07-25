import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';
import 'dotenv/config'
import {schema} from "./schema";
const PORT = 9000 

const start = async() => {
  const server = new ApolloServer({ schema });

  const {url} = await startStandaloneServer(server,{
    listen:{port:PORT},
    // context: async({req,res}) => {
    //   // const token = req.headers.authorization || ' '
    //
    //   const user = await getUser(token);
    //
    //   return {user};
    //}
  })
  
  console.log(`🚀 Server ready at: ${url}`)
}


start()

