import { list, nonNull, objectType } from "nexus";
import { inputObjectType, mutationField, mutationType } from "nexus/dist/core";
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
    let EncPass;

    let { UserInput: { Username, Email, Password } } = args;

    // FIXME :- Using the search query check if the user is already in db

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
      } catch (e) {
        console.error(e);
      }
    }
  },
});
