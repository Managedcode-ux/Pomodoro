/**
 * This file was generated by Nexus Schema
 * Do not make changes to this file directly
 */







declare global {
  interface NexusGen extends NexusGenTypes {}
}

export interface NexusGenInputs {
  LoginInputType: { // input type
    Email: string; // String!
    Password: string; // String!
  }
  TaskInputType: { // input type
    CreatedOn: string; // String!
    Description?: string | null; // String
    DueDate?: string | null; // String
    Priority?: NexusGenEnums['Priority'] | null; // Priority
    Title: string; // String!
  }
  UpdateUserInput: { // input type
    Email?: string | null; // String
    Password?: string | null; // String
    Username?: string | null; // String
  }
  UserInputType: { // input type
    Email: string; // String!
    Password: string; // String!
    Username: string; // String!
  }
  UserSearchInput: { // input type
    Email: string; // String!
  }
}

export interface NexusGenEnums {
  Priority: "HIGH" | "LOW" | "MODERATE"
}

export interface NexusGenScalars {
  String: string
  Int: number
  Float: number
  Boolean: boolean
  ID: string
}

export interface NexusGenObjects {
  Mutation: {};
  Query: {};
  SearchedUser: { // root type
    Email: string; // String!
    Username?: string | null; // String
  }
  Task: { // root type
    CompletionStatus: boolean; // Boolean!
    CreatedOn: string; // String!
    Description: string; // String!
    DueDate: string; // String!
    Priority?: NexusGenEnums['Priority'] | null; // Priority
    TaskId: string; // ID!
    Title: string; // String!
    Tomatoes: number; // Int!
    UserId: string; // ID!
  }
  User: { // root type
    Email: string; // String!
    UserId: string; // String!
    Username?: string | null; // String
  }
}

export interface NexusGenInterfaces {
}

export interface NexusGenUnions {
}

export type NexusGenRootTypes = NexusGenObjects

export type NexusGenAllTypes = NexusGenRootTypes & NexusGenScalars & NexusGenEnums

export interface NexusGenFieldTypes {
  Mutation: { // field return type
    CreateTask: boolean | null; // Boolean
    CreateUser: NexusGenRootTypes['User'] | null; // User
    DeleteUser: NexusGenRootTypes['User'] | null; // User
    Login: string | null; // String
    UpdateUser: NexusGenRootTypes['User'] | null; // User
  }
  Query: { // field return type
    FindUser: NexusGenRootTypes['SearchedUser'] | null; // SearchedUser
    Tasks: NexusGenRootTypes['Task'][] | null; // [Task!]
  }
  SearchedUser: { // field return type
    Email: string; // String!
    Username: string | null; // String
  }
  Task: { // field return type
    CompletionStatus: boolean; // Boolean!
    CreatedOn: string; // String!
    Description: string; // String!
    DueDate: string; // String!
    Priority: NexusGenEnums['Priority'] | null; // Priority
    TaskId: string; // ID!
    Title: string; // String!
    Tomatoes: number; // Int!
    UserId: string; // ID!
  }
  User: { // field return type
    Email: string; // String!
    UserId: string; // String!
    Username: string | null; // String
  }
}

export interface NexusGenFieldTypeNames {
  Mutation: { // field return type name
    CreateTask: 'Boolean'
    CreateUser: 'User'
    DeleteUser: 'User'
    Login: 'String'
    UpdateUser: 'User'
  }
  Query: { // field return type name
    FindUser: 'SearchedUser'
    Tasks: 'Task'
  }
  SearchedUser: { // field return type name
    Email: 'String'
    Username: 'String'
  }
  Task: { // field return type name
    CompletionStatus: 'Boolean'
    CreatedOn: 'String'
    Description: 'String'
    DueDate: 'String'
    Priority: 'Priority'
    TaskId: 'ID'
    Title: 'String'
    Tomatoes: 'Int'
    UserId: 'ID'
  }
  User: { // field return type name
    Email: 'String'
    UserId: 'String'
    Username: 'String'
  }
}

export interface NexusGenArgTypes {
  Mutation: {
    CreateTask: { // args
      Task: NexusGenInputs['TaskInputType'][]; // [TaskInputType!]!
    }
    CreateUser: { // args
      UserInput?: NexusGenInputs['UserInputType'] | null; // UserInputType
    }
    DeleteUser: { // args
      InPassword: string; // String!
    }
    Login: { // args
      LoginInput?: NexusGenInputs['LoginInputType'] | null; // LoginInputType
    }
    UpdateUser: { // args
      UserUpdateInput?: NexusGenInputs['UpdateUserInput'] | null; // UpdateUserInput
    }
  }
  Query: {
    FindUser: { // args
      UserSearchInput?: NexusGenInputs['UserSearchInput'] | null; // UserSearchInput
    }
  }
}

export interface NexusGenAbstractTypeMembers {
}

export interface NexusGenTypeInterfaces {
}

export type NexusGenObjectNames = keyof NexusGenObjects;

export type NexusGenInputNames = keyof NexusGenInputs;

export type NexusGenEnumNames = keyof NexusGenEnums;

export type NexusGenInterfaceNames = never;

export type NexusGenScalarNames = keyof NexusGenScalars;

export type NexusGenUnionNames = never;

export type NexusGenObjectsUsingAbstractStrategyIsTypeOf = never;

export type NexusGenAbstractsUsingStrategyResolveType = never;

export type NexusGenFeaturesConfig = {
  abstractTypeStrategies: {
    isTypeOf: false
    resolveType: true
    __typename: false
  }
}

export interface NexusGenTypes {
  context: any;
  inputTypes: NexusGenInputs;
  rootTypes: NexusGenRootTypes;
  inputTypeShapes: NexusGenInputs & NexusGenEnums & NexusGenScalars;
  argTypes: NexusGenArgTypes;
  fieldTypes: NexusGenFieldTypes;
  fieldTypeNames: NexusGenFieldTypeNames;
  allTypes: NexusGenAllTypes;
  typeInterfaces: NexusGenTypeInterfaces;
  objectNames: NexusGenObjectNames;
  inputNames: NexusGenInputNames;
  enumNames: NexusGenEnumNames;
  interfaceNames: NexusGenInterfaceNames;
  scalarNames: NexusGenScalarNames;
  unionNames: NexusGenUnionNames;
  allInputTypes: NexusGenTypes['inputNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['scalarNames'];
  allOutputTypes: NexusGenTypes['objectNames'] | NexusGenTypes['enumNames'] | NexusGenTypes['unionNames'] | NexusGenTypes['interfaceNames'] | NexusGenTypes['scalarNames'];
  allNamedTypes: NexusGenTypes['allInputTypes'] | NexusGenTypes['allOutputTypes']
  abstractTypes: NexusGenTypes['interfaceNames'] | NexusGenTypes['unionNames'];
  abstractTypeMembers: NexusGenAbstractTypeMembers;
  objectsUsingAbstractStrategyIsTypeOf: NexusGenObjectsUsingAbstractStrategyIsTypeOf;
  abstractsUsingStrategyResolveType: NexusGenAbstractsUsingStrategyResolveType;
  features: NexusGenFeaturesConfig;
}


declare global {
  interface NexusGenPluginTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginInputTypeConfig<TypeName extends string> {
  }
  interface NexusGenPluginFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginInputFieldConfig<TypeName extends string, FieldName extends string> {
  }
  interface NexusGenPluginSchemaConfig {
  }
  interface NexusGenPluginArgConfig {
  }
}