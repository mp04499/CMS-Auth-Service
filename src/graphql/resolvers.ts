import { GraphQLResolverMap } from 'apollo-graphql';
import { GraphQLSchemaModule } from 'apollo-server';
import Query from './Query';
import Mutation from './Mutation';
import User from './models/User';

const resolvers: GraphQLResolverMap = {
	Query,
	Mutation,
	User
}

export default resolvers;