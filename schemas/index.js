const grapsql = require("graphql")
const {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLFloat,
  GraphQLList,
  GraphQlBoolean
} = graphql;

const {User} = require("../models/users")

const {UserType} = require("./typeDefs/UserType")

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        getAllUsers:{
          type: new GraphQLList(UserType),
          args: { id: { type: GraphQLString } }, 
          async resolve(parent, args) {
        
           const userList = await User.find();
           return userList;
          },
        },

        getUser: {
            type: UserType,
            args: {id:{type: GraphQLString}},
            async resolve(parent,args){
                const user = await User.findById(args.id);
                if(!user){
                    throw new Error("User not found")
                }
                return user;
            }

        },
       
    }
})

const Mutation = new GraphQLObjectType({
    type: "Mutation",
    fields:{
         saveUser:{
            type: UserType,
             args: {
                    username: { type: GraphQLString },
                    mobile: { type: GraphQLString },
                    password: { type: GraphQLString },
                    isAdmin: { type: GraphQlBoolean },
             },
             async resolve(parent,args){
                const newUser = new User({
                    username: args.username,
                    mobile: args.mobile,
                    password: args.password,
                    isAdmin: args.isAdmin
                });
                await newUser.save();
                return newUser;
            }

        },
        updateUser:{

        },
        deleteUser:{

        }
    }
})

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});