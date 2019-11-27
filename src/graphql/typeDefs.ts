import { gql } from 'apollo-server';
import { DocumentNode } from 'graphql';

const typeDefs: DocumentNode = gql`
	type User @key(fields: "id") {
		id: ID!
		email: String!
		displayName: String!
		role: Role!
	}

	type AuthPayload implements MutationResponse {
		code: Int!
		success: Boolean!
		message: String!
		token: String!
		user: User!
	}

	input SignUpInput {
		"The email address of the user"
		email: String
		"The display name shown for the user"
		displayName: String
		"The password provided by the user"
		password: String
	}

	input LoginInput {
		"The unique email address of the already registered user"
		email: String
		"The password provided by the user for their account"
		password: String
	}

	enum Role {
		USER
		ADMIN
	}

	interface MutationResponse {
		code: Int!
		success: Boolean!
		message: String!
	}

	type Query {
		me: User!
	}

	type Mutation {
		signup(userInfo: SignUpInput): AuthPayload
		login(userInfo: LoginInput): AuthPayload
	}
`;

export default typeDefs;