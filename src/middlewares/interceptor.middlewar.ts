import { Injectable, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

// Use class based middleware if need dependencies
@Injectable()
export class InterceptorMiddleware implements NestMiddleware {
	use(req: Request, res: Response, next: NextFunction) {
		// console.log('==> [Interceptor] Intercepted')
		next()
	}
}
