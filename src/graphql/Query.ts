import { User } from '@generated/photon';
import { TypeInfo } from 'graphql';
import { authenticate } from '../auth/authentication';
import { Context } from './context';

interface Query {
	me: (parent?: any, args?: any, context?: any, info?: any) => Promise<User>;
}

const Query: { [argName: string]: any; } = {
	me: async (parent: any, args: any, context: Context, info?: TypeInfo): Promise<User> => {
		const userId = authenticate(context);
		return context.photon.users.findOne({
			where: {
				id: userId,
			},
		})
	}
}

export default Query;