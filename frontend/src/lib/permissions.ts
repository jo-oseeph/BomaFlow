/**
 * BomaFlow
 * Frontend Permissions
 * File: permissions.ts
 *
 * Purpose:
 * Mirrors backend/src/modules/auth/auth.permissions.ts and
 * auth.roles.ts, so the frontend can make the same role/permission
 * decisions the backend enforces, for UI purposes (showing/hiding
 * actions, gating routes). This is NOT a security boundary — the
 * backend's authenticate + authorize middleware is the actual
 * enforcement point. This file only controls what the UI renders.
 *
 * Keep this in sync with the backend files whenever either changes.
 */

export type AuthRole =
  | "admin"
  | "landlord"
  | "manager"
  | "tenant"
  | "technician";

export const PERMISSIONS = {
  PROFILE_READ: "profile:read",
  PROFILE_UPDATE: "profile:update",
  LISTING_READ: "listing:read",
  LISTING_SAVE: "listing:save",
  LISTING_CREATE: "listing:create",
  LISTING_UPDATE: "listing:update",
  LISTING_DELETE: "listing:delete",
  LISTING_PUBLISH: "listing:publish",
  APPLICATION_CREATE: "application:create",
  APPLICATION_READ: "application:read",
  APPLICATION_UPDATE: "application:update",
  APPLICATION_DELETE: "application:delete",
  PROPERTY_CREATE: "property:create",
  PROPERTY_READ: "property:read",
  PROPERTY_UPDATE: "property:update",
  PROPERTY_DELETE: "property:delete",
  UNIT_CREATE: "unit:create",
  UNIT_READ: "unit:read",
  UNIT_UPDATE: "unit:update",
  UNIT_DELETE: "unit:delete",
  LEASE_CREATE: "lease:create",
  LEASE_READ: "lease:read",
  LEASE_UPDATE: "lease:update",
  PAYMENT_CREATE: "payment:create",
  PAYMENT_READ: "payment:read",
  RECEIPT_READ: "receipt:read",
  MAINTENANCE_CREATE: "maintenance:create",
  MAINTENANCE_READ: "maintenance:read",
  MAINTENANCE_UPDATE: "maintenance:update",
  MAINTENANCE_ASSIGN: "maintenance:assign",
  REPAIR_CREATE: "repair:create",
  REPAIR_UPDATE: "repair:update",
  REPAIR_CLOSE: "repair:close",
  ANALYTICS_READ: "analytics:read",
  ADMIN_ALL: "*",
} as const;

export type Permission = (typeof PERMISSIONS)[keyof typeof PERMISSIONS];

export const ROLE_PERMISSIONS: Record<AuthRole, Permission[]> = {
  tenant: [
    PERMISSIONS.PROFILE_READ,
    PERMISSIONS.PROFILE_UPDATE,
    PERMISSIONS.LISTING_READ,
    PERMISSIONS.LISTING_SAVE,
    PERMISSIONS.APPLICATION_CREATE,
    PERMISSIONS.APPLICATION_UPDATE,
    PERMISSIONS.APPLICATION_DELETE,
    PERMISSIONS.LEASE_READ,
    PERMISSIONS.PAYMENT_CREATE,
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.RECEIPT_READ,
    PERMISSIONS.MAINTENANCE_CREATE,
    PERMISSIONS.MAINTENANCE_READ,
  ],
  landlord: [
    PERMISSIONS.PROFILE_READ,
    PERMISSIONS.PROFILE_UPDATE,
    PERMISSIONS.PROPERTY_CREATE,
    PERMISSIONS.PROPERTY_READ,
    PERMISSIONS.PROPERTY_UPDATE,
    PERMISSIONS.PROPERTY_DELETE,
    PERMISSIONS.UNIT_CREATE,
    PERMISSIONS.UNIT_READ,
    PERMISSIONS.UNIT_UPDATE,
    PERMISSIONS.UNIT_DELETE,
    PERMISSIONS.LISTING_CREATE,
    PERMISSIONS.LISTING_UPDATE,
    PERMISSIONS.LISTING_DELETE,
    PERMISSIONS.LISTING_PUBLISH,
    PERMISSIONS.APPLICATION_READ,
    PERMISSIONS.APPLICATION_UPDATE,
    PERMISSIONS.LEASE_CREATE,
    PERMISSIONS.LEASE_READ,
    PERMISSIONS.LEASE_UPDATE,
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.MAINTENANCE_ASSIGN,
    PERMISSIONS.MAINTENANCE_READ,
    PERMISSIONS.MAINTENANCE_UPDATE,
    PERMISSIONS.ANALYTICS_READ,
  ],
  manager: [
    PERMISSIONS.PROFILE_READ,
    PERMISSIONS.PROFILE_UPDATE,
    PERMISSIONS.PROPERTY_READ,
    PERMISSIONS.PROPERTY_UPDATE,
    PERMISSIONS.UNIT_READ,
    PERMISSIONS.UNIT_UPDATE,
    PERMISSIONS.LISTING_CREATE,
    PERMISSIONS.LISTING_UPDATE,
    PERMISSIONS.LISTING_PUBLISH,
    PERMISSIONS.APPLICATION_READ,
    PERMISSIONS.APPLICATION_UPDATE,
    PERMISSIONS.LEASE_CREATE,
    PERMISSIONS.LEASE_READ,
    PERMISSIONS.LEASE_UPDATE,
    PERMISSIONS.PAYMENT_READ,
    PERMISSIONS.MAINTENANCE_ASSIGN,
    PERMISSIONS.MAINTENANCE_READ,
    PERMISSIONS.MAINTENANCE_UPDATE,
    PERMISSIONS.ANALYTICS_READ,
  ],
  technician: [
    PERMISSIONS.MAINTENANCE_READ,
    PERMISSIONS.MAINTENANCE_UPDATE,
    PERMISSIONS.REPAIR_CREATE,
    PERMISSIONS.REPAIR_UPDATE,
    PERMISSIONS.REPAIR_CLOSE,
  ],
  admin: [PERMISSIONS.ADMIN_ALL],
};

/**
 * Returns true if the given role has the given permission.
 * Admins with ADMIN_ALL ('*') implicitly pass every check.
 */
export function hasPermission(
  role: AuthRole | null | undefined,
  permission: Permission,
): boolean {
  if (!role) return false;

  const rolePermissions = ROLE_PERMISSIONS[role];

  if (!rolePermissions) return false;

  return (
    rolePermissions.includes(permission) ||
    rolePermissions.includes(PERMISSIONS.ADMIN_ALL)
  );
}

/**
 * Returns true if the given role is included in the allowed list.
 * Used for coarse route-level gating (e.g. "only landlord/manager/admin
 * can see this route"), as opposed to hasPermission's fine-grained
 * per-action checks.
 */
export function hasRole(
  role: AuthRole | null | undefined,
  allowedRoles: AuthRole[],
): boolean {
  if (!role) return false;
  return allowedRoles.includes(role);
}