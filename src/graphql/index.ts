import * as Apollo from 'apollo-server';
import { buildFederatedSchema } from '@apollo/federation';
import { GraphQLRequestContext } from 'apollo-server-core';
import { Photon } from '@generated/photon';
import Module from './Module';

type Context = {
	photon: Photon;
	req?: any;
}

class GraphQL {

	private photon: Photon;

	constructor() {
		this.photon = new Photon();
	}

	createContext = (req: GraphQLRequestContext): Context => ({
		...req,
		photon: this.photon,
	});

	server = (): Apollo.ApolloServer => {
		return new Apollo.ApolloServer({ schema: buildFederatedSchema([Module]), context: this.createContext });
	}
}

export default GraphQL;