import { ApolloServer } from 'apollo-server-micro';
import { MongoClient } from 'mongodb';
import { schema } from '../../apollo/schema';

// const { dbUrl } = require('../../config.js');

let db;

const apolloServer = new ApolloServer({
  schema,
  context: async () => {
    if (!db) {
      try {
        const dbClient = new MongoClient(dbUrl,
          { useNewUrlParser: true, useUnifiedTopology: true }
        )

        if (!dbClient.isConnected()) await dbClient.connect()
        db = dbClient.db('element101')
      } catch (err) {
        console.log('<<<Error while connecting with graphql context>>>', err)
      }
    }

    return { db }
  }
})

export const config = {
  api: {
    bodyParser: false
  }
}

export default apolloServer.createHandler({ path: '/api/graphql' })