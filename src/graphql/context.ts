/* eslint-disable import/prefer-default-export */
import { Photon } from '@generated/photon'
import { GraphQLRequestContext } from 'apollo-server-core'

const photon = new Photon()

export type Context = {
	photon: Photon;
	req?: any;
}

export const createContext = (req: GraphQLRequestContext): Context => ({
	...req,
	photon,
})