import { objectType } from 'nexus';

export const User = objectType({
	name: 'User',
	definition: (t) => {
		t.model.id()
		t.model.displayName()
		t.model.email()
		t.model.role()
	}
})

export default User;