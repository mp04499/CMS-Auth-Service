import GraphQL from './graphql/index';

const server = new GraphQL().server();

server.listen(4001).then(({ url }) => console.log(`🚀 Server ready at ${url}`));