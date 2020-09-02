const graphql = require("graphql");
const _ = require("lodash");

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList
} = graphql;

var books = [
  { name: "Book1", genre: "Fantasy", id: "1", authorId: '1' },
  { name: "Book2", genre: "Fantasy", id: "2", authorId: '2' },
  { name: "Book3", genre: "Fantasy", id: "3", authorId: '3' },
  { name: "Book4", genre: "Fantasy", id: "4", authorId: '2' },
  { name: "Book5", genre: "Fantasy", id: "5", authorId: '1' },
  { name: "Book6", genre: "Fantasy", id: "6", authorId: '1' },
];

var authors = [
  { name: "Patrick", age: 44, id: "1" },
  { name: "Alex", age: 56, id: "2" },
  { name: "Boomer", age: 88, id: "3" },
];

const BookType = new GraphQLObjectType({
  name: "Book",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
        type: AuthorType,
        resolve(parent, args){
            return _.find(authors, {id: parent.authorId})
        }
    }
  }),
});

const AuthorType = new GraphQLObjectType({
  name: "Author",
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args) {
            return _.filter(books, { authorId: parent.id});
        }
    }
  }),
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        //grab data from database

        return _.find(books, { id: args.id });
      },
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
        type: new GraphQLList(BookType),
        resolve(parent, args){
            return books
        }
    },
    authors: {
        type: new GraphQLList(AuthorType),
        resolve(parent,args){
            return authors;
        }
    }
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
