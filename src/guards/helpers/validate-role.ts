export const validateRoles = (roles: string[], userRole: string): boolean => {
	return roles.includes(userRole)
}
