import { ApolloServer, BaseContext } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import "dotenv/config";
import { schema } from "./schema.js";
import * as jwt from "jsonwebtoken";
import { GraphQLError } from "graphql/error";
import { prisma_obj } from "../prisma/prisma.js";

const PORT = 9000;

interface JwtPayload {
  UserId: string;
  Email: string;
}

interface IUser {
  UserId: string;
  Username: string;
  Email: string;
  Password?: string;
}

interface MyContext extends BaseContext {
  finalUser: IUser | undefined | string;
}


// const start = async () => {
//   console.log("INITIALIZAING START OF APOLLO SERVER")
//   const server = new ApolloServer({ schema });
//   const { url } = await startStandaloneServer(server, {
//     listen: { port: PORT },
//     context: async ({ req }) => {
//       // console.log("Request ==>", req)
//       // console.log("INSIDE CONTEXT OF START")
//       const token = req.headers.authorization || " ";
//       if (token != " ") {
//         try {
//           let decoded = jwt.verify(
//             token,
//             String(process.env.SECRET),
//           ) as JwtPayload;
//           const Id = decoded.UserId;
//           try {
//             const user: IUser | null = await prisma_obj.user_coll.findUnique({
//               where: {
//                 UserId: Id,
//               },
//             });
//             if (user !== null) {
//               const { Password: _, ...finalUser } = user;
//
//               return { finalUser };
//             } else {
//               throw new GraphQLError("User Not found", {
//                 extensions: {
//                   code: "Not found",
//                   http: { status: 404 },
//                 },
//               });
//             }
//           } catch (e) {
//             throw new GraphQLError("User Not Found", {
//               extensions: {
//                 code: "Not Found",
//                 http: { status: 404 },
//               },
//             });
//           }
//         } catch (e) {
//           throw new GraphQLError("Invalid token", {
//             extensions: {
//               code: "UNAUTHENTICATED",
//               http: { status: 401 },
//             },
//           });
//         }
//       }
//       else {
//         return " "
//       }
//     },
//   });
//
//   console.log(`🚀 Server ready at: ${url}`);
// };
//
//
// start();



const server = new ApolloServer({ schema })
const { url } = await startStandaloneServer(server, {
  listen: { port: PORT }

})



console.log(`🚀  Server ready at: ${url}`);
