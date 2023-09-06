import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common'
import { Observable } from 'rxjs'
import { validateRequest } from './helpers/validate-request'
import { Reflector } from '@nestjs/core'
import { validateRoles } from './helpers/validate-role'

@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private reflector: Reflector) {}
	canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
		const roles = this.reflector.get('roles', context.getHandler())
		if (!roles) {
			return true
		}
		const request = context.switchToHttp().getRequest()
		const user = request.user
		return validateRoles(roles, user.role)
	}
}
