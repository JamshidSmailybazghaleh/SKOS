/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Permission & Security
 * Module    : Permission Manager
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

import {
    PermissionState,
    PermissionStateFactory,
    PermissionStatus
} from "./permission-state";

/**
 * Permission Manager.
 */
export class PermissionManager {

    /**
     * Registered permission states.
     */
    private readonly permissions =
        new Map<PermissionType, PermissionState>();

    /**
     * Constructor.
     */
    constructor() {

        Object.values(PermissionType).forEach(type => {

            this.permissions.set(

                type,

                PermissionStateFactory.create(type)

            );

        });

    }

    /**
     * Get permission state.
     */
    public getState(

        type: PermissionType

    ): PermissionState {

        return this.permissions.get(type)!;

    }

    /**
     * Check whether permission is granted.
     */
    public isGranted(

        type: PermissionType

    ): boolean {

        return (

            this.getState(type).status ===

            PermissionStatus.Granted

        );

    }

    /**
     * Update permission status.
     */
    public update(

        type: PermissionType,

        status: PermissionStatus,

        message?: string

    ): void {

        const state =

            this.getState(type);

        state.status = status;

        state.checkedAt = Date.now();

        state.message = message;

    }

    /**
     * Register permission request.
     */
    public request(

        type: PermissionType

    ): void {

        const state =

            this.getState(type);

        state.status =

            PermissionStatus.Requesting;

        state.requestCount++;

        state.requestedAt =

            Date.now();

    }

    /**
     * Get all permissions.
     */
    public list(): PermissionState[] {

        return Array.from(

            this.permissions.values()

        );

    }

    /**
     * Reset all permissions.
     */
    public reset(): void {

        this.permissions.clear();

        Object.values(PermissionType).forEach(type => {

            this.permissions.set(

                type,

                PermissionStateFactory.create(type)

            );

        });

    }

}
