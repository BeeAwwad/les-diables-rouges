import { NextRequest } from "next/server";
import { ApolloServer } from "@apollo/server";
import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { resolvers } from "./resolvers";
import { typeDefs } from "./schema";

const server = new ApolloServer({
  resolvers,
  typeDefs,
});

// const handler = startServerAndCreateNextHandler<NextRequest>(server, {
//   context: async (req) => ({ req }),
// });

const handler = startServerAndCreateNextHandler<NextRequest>(server);

export { handler };
