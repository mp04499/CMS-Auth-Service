import GraphQL from './graphql/index';

const server = new GraphQL().server();

server.listen({ port: 4000 }, () => console.log(
	`🚀 Server ready at: http://localhost:4000\n⭐️`,
));