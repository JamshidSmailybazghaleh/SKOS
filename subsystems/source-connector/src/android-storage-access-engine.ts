/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Connector
 * Module    : Android Storage Access Engine
 *
 * Build     : BUILD-000151
 * Sprint    : Phase 2
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { StorageLocation } from "./storage-location";
import { StoragePermission } from "./storage-permission";
import { StorageAccessResult } from "./storage-access-result";

export class AndroidStorageAccessEngine {

    private readonly permissions =

        new Map<StorageLocation, boolean>();

    /**
     * Register permission.
     */
    public registerPermission(

        permission: StoragePermission

    ): void {

        this.permissions.set(

            permission.location,

            permission.granted

        );

    }

    /**
     * Check permission.
     */
    public hasPermission(

        location: StorageLocation

    ): boolean {

        return this.permissions.get(location) ?? false;

    }

    /**
     * Execute access validation.
     */
    public validate(): StorageAccessResult {

        const total =

            this.permissions.size;

        let granted = 0;

        for (

            const value

            of this.permissions.values()

        ) {

            if (value) {

                granted++;

            }

        }

        return {

            success: granted > 0,

            scannedLocations: total,

            accessibleLocations: granted

        };

    }

}
