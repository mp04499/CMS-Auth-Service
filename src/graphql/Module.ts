import { GraphQLSchemaModule } from 'apollo-graphql';
import resolvers from './resolvers';
import typeDefs from './typeDefs';

const Module: GraphQLSchemaModule = { typeDefs, resolvers };

export default Module;