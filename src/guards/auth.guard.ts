import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { validateRequest } from './helpers/validate-request'

@Injectable()
export class AuthGuard implements CanActivate {
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const request = context.switchToHttp().getRequest()
		request.user = { id: '8539d7ce-9e46-49f3-ad33-e2800e830b33', role: 'admin' }
		return validateRequest(request)
	}
}
