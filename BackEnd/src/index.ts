import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from '@apollo/server/standalone';

import {schema} from "./schema";


const PORT = 3000 

const start = async() => {
  const server = new ApolloServer({ schema });

  const {url} = await startStandaloneServer(server,{listen:{port:PORT}})
  
  console.log(`🚀 Server ready at: ${url}`)

}


start()

