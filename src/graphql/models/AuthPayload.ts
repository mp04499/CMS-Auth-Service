import { objectType } from 'nexus'

export const AuthPayLoad = objectType({
	name: 'AuthPayload',
	definition: (t) => {
		t.string('token')
		t.field('user', { type: 'User' })
	}
})

export default AuthPayLoad;