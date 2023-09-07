import { Injectable, NestInterceptor, ExecutionContext, CallHandler } from '@nestjs/common'
import { Observable, asyncScheduler, of, scheduled } from 'rxjs'

// Bugged
@Injectable()
export class CacheInterceptor implements NestInterceptor {
	intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
		const isCached = true
		console.log('==> [CacheInterceptor]')
		if (isCached) {
			return of([])
		}
		return next.handle()
	}
}
