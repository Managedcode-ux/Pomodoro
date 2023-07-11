import { asNexusMethod, scalarType } from "nexus";
import {Kind, parseValue} from 'graphql';

export const DateScalar = scalarType({
  name:'Date',
  description:'Date custom scalar type',
  asNexusMethod:"date",

  serialize(value){
    if(value instanceof Date){
      return new Date(value);
    }
    throw new Error("GraphQL Date Scaler expected a `Date` object")
  },

  parseValue(value){
    if(typeof value === 'number'){
      return new Date(value)
    }
    throw new Error("GraphQL Date Scaler expected a number")
  },
  
  parseLiteral(ast){
    if(ast.kind === Kind.INT){
      return new Date(ast.value)
    }
    return null;
  }
})

