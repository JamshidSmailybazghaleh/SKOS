/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Permission & Security
 * Module    : Permission State
 *
 * Build     : BUILD-000166
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    PermissionType
} from "./permission-type";

/**
 * Runtime permission status.
 */
export enum PermissionStatus {

    /**
     * Permission has not been checked.
     */
    Unknown = "unknown",

    /**
     * Permission request is in progress.
     */
    Requesting = "requesting",

    /**
     * Permission granted.
     */
    Granted = "granted",

    /**
     * Permission denied.
     */
    Denied = "denied",

    /**
     * Permanently denied by the user.
     */
    PermanentlyDenied = "permanently-denied",

    /**
     * Restricted by the operating system.
     */
    Restricted = "restricted"

}

/**
 * Permission runtime information.
 */
export interface PermissionState {

    /**
     * Permission type.
     */
    type: PermissionType;

    /**
     * Current permission status.
     */
    status: PermissionStatus;

    /**
     * Last verification time.
     */
    checkedAt: number | null;

    /**
     * Last request time.
     */
    requestedAt: number | null;

    /**
     * Number of request attempts.
     */
    requestCount: number;

    /**
     * Optional status message.
     */
    message?: string;

}

/**
 * Permission state factory.
 */
export class PermissionStateFactory {

    /**
     * Create initial permission state.
     */
    public static create(
        type: PermissionType
    ): PermissionState {

        return {

            type,

            status: PermissionStatus.Unknown,

            checkedAt: null,

            requestedAt: null,

            requestCount: 0

        };

    }

}
