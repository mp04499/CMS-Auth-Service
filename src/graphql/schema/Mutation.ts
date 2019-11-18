import { mutationType, stringArg } from 'nexus';
import { sign } from 'jsonwebtoken';
import argon2 from 'argon2';

const secretKey = '123';

export const Mutation = mutationType({
	definition: (t) => {
		t.field('signup', {
			type: 'AuthPayload',
			args: {
				displayName: stringArg(),
				email: stringArg({ nullable: false }),
				password: stringArg({ nullable: false })
			},
			resolve: async (parent, { displayName, email, password }, ctx) => {
				try {
					const hashedPassword = await argon2.hash(password);
					const user = await ctx.photon.users.create({
						data: {
							displayName,
							email,
							password: hashedPassword
						}
					})

					const userId = user.id;
					const token = sign({ userId }, secretKey);
					return {
						token,
						user
					}
				} catch (error) {
					throw new Error('Error in user registration');
				}
			}
		});

		t.field('login', {
			type: 'AuthPayload',
			args: {
				email: stringArg(),
				password: stringArg()
			},
			resolve: async (parent, { email, password }, ctx) => {
				try {
					const user = await ctx.photon.users.findOne({
						where: { email }
					});

					if (!user) throw new Error('User not found')

					const hashedPassword = user.password;
					const verify = await argon2.verify(hashedPassword, password);

					if (!verify) throw new Error('Invalid Password')

					const userId = user.id;
					const token = sign({ userId }, secretKey);
					return {
						token,
						user
					}
				} catch (error) {
					throw new Error(error);
				}
			}
		});
	}
})

export default Mutation;