import * as Apollo from 'apollo-server';
import { Photon } from '@generated/photon';
import { createContext } from './context';
import schema from './schema'

class GraphQL {

	private photon: Photon;

	constructor() {
		this.photon = new Photon();
	}

	server = (): Apollo.ApolloServer => {
		return new Apollo.ApolloServer({ schema, context: createContext });
	}
}

export default GraphQL;