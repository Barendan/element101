export const resolvers = {
  Query: {
    users(_, args, context, info) {
      return context.db
        .collection('users')
        .findOne()
        .then((data) => {
          return data.users
        })
    },
    async getColors(_, args, context, info) {
      const colors = context.db.collection("colors").find().toArray()
      return colors
    }
  },
  Mutation: {
    addColor: async (_, { colorName, colorList }, context, info) => {
      const color = {
        colorName: colorName,
        colorList: colorList
      }

      const getColor = await context.db.collection('colors').save(color)
      return color
    }
  }
}