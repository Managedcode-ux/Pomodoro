import { nonNull, objectType } from "nexus";
// import { inputObjectType, mutationField, queryField, stringArg } from "nexus/dist/core";
import { inputObjectType, mutationField, queryField, stringArg } from "nexus"
import bcrypt from "bcryptjs";
import { prisma_obj } from "../../prisma/prisma.js";
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

export const SearchedUser = objectType({
  name: "SearchedUserInput",
  definition(t) {
    t.nonNull.string("Email"),
      t.string("Username")
  }
})

export const UserInput = inputObjectType({
  name: "UserInputType",
  definition(t) {
    t.nonNull.string("Username");
    t.nonNull.string("Email");
    t.nonNull.string("Password");
  },
});

export const UserUpdateInput = inputObjectType({
  name: "UpdateUserInput",
  definition(t) {
    t.nullable.string("Username")
    t.nullable.string("Email")
    t.nullable.string("Password")
  }
})

export const UserSearchInput = inputObjectType({
  name: "UserSearchInput",
  definition(t) {
    t.nonNull.string("Email")
  }
})

export const LoginInput = inputObjectType({
  name: "LoginInputType",
  definition(t) {
    t.nonNull.string("Email");
    t.nonNull.string("Password");
  },
});

// TODO 1:- Create a query to find a user (Done)
// TODO 1.2 :-Create a query to login a User (Done)
// TODO 2:- Create a mutation to create User (Done)
// TODO 3:- Create a mutation to delete user (Done)
// TODO 4:- Create a mutation to update user (Done)

export const findUser = queryField('FindUser', {
  type: SearchedUser,
  args: { UserSearchInput },
  async resolve(parents, args, context) {
    console.log("ARGS ==>", args)
    const data = args.UserSearchInput
    console.log("BACKEND DATA ==>", data)
    if (!context.finalUser) {
      throw new GraphQLError("Unauthenticated", {
        extensions: {
          code: "Please Login to proceed!",
          status: { code: 401 }
        }
      })
    }

    try {
      const SearchedData = await prisma_obj.user_coll.findUnique({
        where: {
          Email: data.Email
        },
        select: {
          Username: true,
          Email: true,
          Password: false
        }
      })

      return SearchedData

    } catch (error) {
      console.log("ERROR INSIDE API ==>", error)
      throw new GraphQLError("Something Went Wrong!")
    }

  }
})

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
        throw new Error("Incorrect Username or Password!");
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
        console.log("Success")
        return res;
      } catch (e: any) {
        if (e.code === "P2002") {
          console.debug("Error Occured")
          throw new Error("User already exists!")
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

export const UpdateUser = mutationField("UpdateUser", {
  type: User,
  args: { UserUpdateInput },
  async resolve(parent, args, context) {

    if (context.finalUser) {
      const data = args.UserUpdateInput;

      try {
        const res = await prisma_obj.user_coll.update({
          where: {
            UserId: context.finalUser.UserId
          },
          data: {
            Email: data.Email != null ? data.Email : undefined,
            Username: data.Username != null ? data.Username : undefined,
            Password: data.password != null ? data.password : undefined,
          },
          select: {
            UserId: true,
            Email: true,
            Username: true
          }
        });


        return res;
      } catch (error) {

        throw new GraphQLError("Something Went Wrong! Please try again later")
      }
    }
    else {
      throw new GraphQLError("Unauthenticated", {
        extensions: {
          code: "Please Login to Proceed",
          status: { code: 401 }
        }
      })
    }
  }
})

