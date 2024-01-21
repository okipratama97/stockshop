import * as jwt from 'jsonwebtoken'

const privateKey = 'PRIVATE_KEY'

export const jwtSign = (payload: Record<string, any>): string => {
	return jwt.sign(payload, privateKey)
}

export const jwtVerify = (token: string): Record<string, any> => {
	return jwt.verify(token, privateKey) as any
}
