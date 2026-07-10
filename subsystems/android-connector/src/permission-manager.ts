/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module : Permission Manager
 * Build  : BUILD-000178
 * ==========================================================
 */

/**
 * Supported runtime permissions.
 */
export enum PermissionType {

    ReadStorage = "read-storage",

    WriteStorage = "write-storage",

    ManageExternalStorage = "manage-external-storage"

}

/**
 * Permission status.
 */
export enum PermissionStatus {

    Unknown = "unknown",

    Granted = "granted",

    Denied = "denied",

    Restricted = "restricted"

}

/**
 * Permission manager contract.
 */
export interface PermissionManager {

    initialize(): Promise<boolean>;

    check(
        permission: PermissionType
    ): Promise<PermissionStatus>;

    request(
        permission: PermissionType
    ): Promise<PermissionStatus>;

    hasRequiredPermissions(): Promise<boolean>;

}
