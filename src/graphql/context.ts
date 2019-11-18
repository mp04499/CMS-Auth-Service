import { Photon } from '@generated/photon'
import * as Apollo from 'apollo-server'
import { GraphQLRequestContext } from 'apollo-server-core'

const photon = new Photon()

export type Context = {
	photon: Photon
	req: any
}

export const createContext = (req: GraphQLRequestContext): Context => ({
	...req,
	photon,
})