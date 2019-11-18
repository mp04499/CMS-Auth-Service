import { objectType } from 'nexus';
import { authenticate } from '../../auth/authentication'

export const Query = objectType({
	name: 'Query',
	definition: (t) => {
		t.crud.users({ filtering: true, alias: 'users' })

		t.field('me', {
			type: 'User',
			resolve: (parent, args, ctx) => {
				const userId = authenticate(ctx);
				return ctx.photon.users.findOne({
					where: {
						id: userId,
					},
				})
			},
		})
	}
});

export default Query;