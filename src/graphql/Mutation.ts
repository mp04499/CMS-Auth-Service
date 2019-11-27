import { User } from '@generated/photon';
import { sign } from 'jsonwebtoken';
import argon2 from 'argon2';
import { TypeInfo } from "graphql";
import { Context } from "./context";

interface AuthPayload {
	code: number;
	success: boolean;
	message: string;
	token: string;
	user: User;
}

const algorithm = "HS512";
const secret: string = process.env.SECRET_KEY || "123";
const key = Buffer.from(secret, 'base64');

const Mutation: { [argName: string]: any; } = {
	signup: async (parent: any, { email, displayName, password }: { email: string, displayName: string, password: string }, context: Context, info: TypeInfo): Promise<AuthPayload> => {
		try {
			const hashedPassword = await argon2.hash(password);
			const user = await context.photon.users.create({
				data: {
					displayName,
					email,
					password: hashedPassword
				}
			});

			const userId = user.id;
			const token = sign({ userId }, key, { algorithm });
			return {
				code: 200,
				success: true,
				message: "User account created successfully",
				token,
				user
			}
		} catch (error) {
			throw new Error(error)
		}
	},
	login: async (parent, { email, password }, context, info) => {
		try {
			const user = await context.photon.users.findOne({
				where: { email }
			});

			if (!user) throw new Error('User not found')

			const hashedPassword = user.password;
			const verify = await argon2.verify(hashedPassword, password);

			if (!verify) throw new Error('Invalid Password')

			const userId = user.id;
			const token = sign({ userId }, key, { algorithm });
			return {
				code: 200,
				success: true,
				message: "User account created successfully",
				token,
				user
			}
		} catch (error) {
			throw new Error(error);
		}
	}
}

export default Mutation;