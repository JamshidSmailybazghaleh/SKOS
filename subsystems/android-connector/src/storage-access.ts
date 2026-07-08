/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Connector
 * Module    : Storage Access
 *
 * Build     : BUILD-000168
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

export enum StorageProvider {

    Internal = "internal",

    SDCard = "sdcard",

    Downloads = "downloads",

    Documents = "documents",

    UserFolder = "user-folder",

    Cloud = "cloud"

}

/**
 * Selected storage location.
 */
export interface StorageLocation {

    /**
     * Provider type.
     */
    provider: StorageProvider;

    /**
     * Android URI.
     */
    uri: string;

    /**
     * Display name.
     */
    name: string;

    /**
     * Read permission.
     */
    readable: boolean;

    /**
     * Write permission.
     *
     * Reserved for future use.
     */
    writable: boolean;

}

/**
 * Storage Access Manager.
 */
export class StorageAccess {

    private readonly locations: StorageLocation[] = [];

    /**
     * Register a selected location.
     */
    public register(
        location: StorageLocation
    ): void {

        this.locations.push(location);

    }

    /**
     * Return all registered locations.
     */
    public getLocations():
        StorageLocation[] {

        return [...this.locations];

    }

    /**
     * Find one location.
     */
    public find(
        uri: string
    ): StorageLocation | undefined {

        return this.locations.find(

            location =>

                location.uri === uri

        );

    }

    /**
     * Remove one location.
     */
    public remove(
        uri: string
    ): boolean {

        const index =

            this.locations.findIndex(

                location =>

                    location.uri === uri

            );

        if (index < 0) {

            return false;

        }

        this.locations.splice(index, 1);

        return true;

    }

    /**
     * Remove all locations.
     */
    public clear(): void {

        this.locations.length = 0;

    }

}
