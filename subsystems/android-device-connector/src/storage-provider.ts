/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Device Connector
 * Module    : Storage Provider
 *
 * Build     : BUILD-000192
 * Version   : 1.0.0
 * ==========================================================
 */

import { AndroidDevice } from "./android-device";

/**
 * Storage type.
 */
export enum StorageType {

    Internal = "internal",

    SDCard = "sd-card"

}

/**
 * Storage information.
 */
export interface StorageInfo {

    /**
     * Storage identifier.
     */
    id: string;

    /**
     * Storage type.
     */
    type: StorageType;

    /**
     * Root path.
     */
    rootPath: string;

    /**
     * Total capacity (bytes).
     */
    totalBytes: number;

    /**
     * Available space (bytes).
     */
    availableBytes: number;

    /**
     * Read-only flag.
     */
    readOnly: boolean;

}

/**
 * Storage provider.
 */
export class StorageProvider {

    /**
     * Discover available storage.
     *
     * Version 1.0
     * Placeholder implementation.
     */
    public discover(
        device: AndroidDevice
    ): StorageInfo[] {

        void device;

        /*
         * Future implementation:
         * - Detect internal storage
         * - Detect SD Card
         * - Read capacity
         * - Read free space
         */

        return [];

    }

}
