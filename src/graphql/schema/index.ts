import * as Nexus from 'nexus'
import { nexusPrismaPlugin } from 'nexus-prisma'
import * as path from 'path';
import * as types from '../types'

export default Nexus.makeSchema({
	types: [types],
	plugins: [nexusPrismaPlugin()],
	outputs: {
		typegen: path.join(
			__dirname,
			'../../node_modules/@types/nexus-typegen/index.d.ts',
		),
	},
	typegenAutoConfig: {
		contextType: 'Context.Context',
		sources: [
			{
				source: '@generated/photon',
				alias: 'photon',
			},
			{
				source: require.resolve('../context'),
				alias: 'Context',
			},
		],
	},
});