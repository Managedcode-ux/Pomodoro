import { list, nonNull, objectType } from "nexus";
import { inputObjectType, mutationField, mutationType, stringArg } from "nexus/dist/core";
import bcrypt from "bcryptjs";
import { prisma_obj } from "../prisma/prisma";
import { GraphQLError } from "graphql";
import * as jwt from "jsonwebtoken";

export const User = objectType({
  name: "User",
  definition(t) {
    t.nonNull.string("UserId");
    t.string("Username");
    t.nonNull.string("Email");
  },
});

export const UserInput = inputObjectType({
  name: "UserInputType",
  definition(t) {
    t.nonNull.string("Username");
    t.nonNull.string("Email");
    t.nonNull.string("Password");
  },
});

export const LoginInput = inputObjectType({
  name: "LoginInputType",
  definition(t) {
    t.nonNull.string("Email");
    t.nonNull.string("Password");
  },
});

// TODO 1:- Create a query to find a user
// TODO 1.2 :-Create a query to login a User (Done)
// TODO 2:- Create a mutation to create User (Done)
// TODO 3:- Create a mutation to delete user
// TODO 4:- Create a mutation to update user

export const loginUser = mutationField("Login", {
  type: "String",
  args: { LoginInput },
  async resolve(parents, args, context) {
    let { LoginInput: { Email, Password } } = args;

    let user = await prisma_obj.user_coll.findUnique({
      where: {
        Email: Email,
      },
    });

    if (Object.is(user, null)) {
      throw new Error("No record found!");
    }

    if (user) {
      const isValid = bcrypt.compareSync(Password, user?.Password);

      if (!isValid) {
        throw new Error("Incorrect Password!");
      }

      const { Password: _, ...tokenUser } = user; // This step is used to remove password field from the user object before jwtencoding

      const token = jwt.sign(tokenUser, String(process.env.SECRET));

      return token;
    }
    // return user
  },
});

export const UserCreation = mutationField("CreateUser", {
  type: User,
  args: { UserInput },
  async resolve(parents, args, context) {
    console.log("INSIDE USER CREATION");
    debugger;
    let EncPass;
    let { UserInput: { Username, Email, Password } } = args;
    console.log(Username, Email, Password);
    debugger;
    if (typeof (process.env.SALT_ROUND) === "string") {
      EncPass = bcrypt.hashSync(Password, parseInt(process.env.SALT_ROUND));
      try {
        const res = await prisma_obj.user_coll.create({
          data: {
            Username: Username,
            Email: Email,
            Password: EncPass,
          },
          select: {
            UserId: true,
            Username: true,
            Email: true,
          },
        });

        return res;
      } catch (e: any) {
        if (e.code === "P2002") {
          throw new GraphQLError("User already exits", {
            extensions: {
              code: "Duplicate Found",
              http: { status: 403 },
            },
          });
        }
      }
    }
  },
});



export const DeleteUser = mutationField("DeleteUser", {
  type: User,
  args: {
    InPassword: nonNull(stringArg())
  },
  async resolve(parents, args, context) {

    let deletedUser: any
    const hash: { Password: string } | null = await prisma_obj.user_coll.findUnique({
      where: {
        UserId: context.finalUser.UserId
      },
      select: {
        Password: true
      }
    })


    if (!context.finalUser) {
      throw new GraphQLError("Unauthenticated", {
        extensions: {
          code: "Please Login To Proceed !!",
          status: { code: 401 }
        }
      })
    }

    try {
      if (hash !== null && bcrypt.compareSync(args.InPassword, hash.Password)) {
        deletedUser = await prisma_obj.user_coll.delete({
          where: {
            UserId: context.finalUser.UserId,
            Email: context.finalUser.Email,
          },
          select: {
            UserId: true,
            Username: true,
            Email: true,
          }
        });
      }

    } finally {
      return deletedUser
    }
  }
})

