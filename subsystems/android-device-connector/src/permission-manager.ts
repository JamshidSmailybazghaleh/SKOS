/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Device Connector
 * Module    : Permission Manager
 *
 * Build     : BUILD-000192
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Supported Android permissions.
 */
export enum AndroidPermission {

    ReadInternalStorage = "read-internal-storage",

    ReadExternalStorage = "read-external-storage",

    ManageExternalStorage = "manage-external-storage"

}

/**
 * Permission state.
 */
export enum PermissionStatus {

    Granted = "granted",

    Denied = "denied",

    NotRequested = "not-requested"

}

/**
 * Permission result.
 */
export interface PermissionResult {

    permission: AndroidPermission;

    status: PermissionStatus;

}

/**
 * Permission manager.
 */
export class PermissionManager {

    /**
     * Check permission.
     *
     * Version 1.0
     * Placeholder implementation.
     */
    public check(
        permission: AndroidPermission
    ): PermissionResult {

        return {

            permission,

            status: PermissionStatus.NotRequested

        };

    }

}
