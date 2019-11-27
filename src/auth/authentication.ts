import { verify } from 'jsonwebtoken';
import { Context } from '../graphql/context'

interface Token {
	iat: number;
	userId: string;
}

const secretKey = '123';

export const authenticate = (context: Context): void | Token | string => {
	const Authentication: string = context.req.get('Authorization');

	if (Authentication) {
		try {
			const token = Authentication.replace('Bearer: ', '');
			const verifiedToken = verify(token, secretKey) as Token;
			return verifiedToken && verifiedToken.userId;
		} catch (error) {
			throw new Error(error);
		}
	}

	throw new Error('No Authentication Token Found');
}

export const authorize = () => { }