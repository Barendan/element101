import gql from 'graphql-tag';

export const typeDefs = gql`
  type User {
    id: ID!
    firstName: String!
    lastName: String!
    blog: String
    stars: Int
    categories: [String]
  }
  type Color {
    id: ID!
    colorName: String!
    colorList: [String]!
  }
  type Query {
    users: [User]!
    getColors: [Color]!
  }
  type Mutation {
    addColor(colorName: String!, colorList: [String]!): Color
  }
`