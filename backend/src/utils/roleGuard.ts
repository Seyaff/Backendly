import { PermissionsType, RoleType } from "../enums/role.enum";
import { UnauthorizedException } from "./appError";
import { RolePermissions } from "./role-permissions";

export const roleGuard = (
  role: keyof typeof RolePermissions,
  requiredPermissions: PermissionsType[],
) => {
  const permissions = RolePermissions[role];
  const hasPermission = permissions.every((permission) =>
    permission.includes(permission),
  );

  if (!hasPermission) {
    throw new UnauthorizedException(
      "You do not have the necessary permissions to perform this action",
    );
  }

  return;
};
