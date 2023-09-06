import { Request, Response, NextFunction } from 'express'

// Use function based middleware if it's simple
export function report(req: Request, res: Response, next: NextFunction) {
	console.log('==> [Report] Request', req.baseUrl)
	next()
}
