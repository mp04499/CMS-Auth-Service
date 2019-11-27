import { User } from '@generated/photon';
import { TypeInfo } from 'graphql';
import { Context } from '../context';

const UserDef: { [argName: string]: any; } = {
	__resolveReference: async (user: User, args: any, context: Context, info?: TypeInfo): Promise<User> => {
		return context.photon.users.findOne({
			where: {
				id: user.id,
			},
		});
	}
}

export default UserDef;