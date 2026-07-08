/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Connector
 * Module    : Android Connector
 *
 * Build     : BUILD-000168
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    StorageAccess
} from "./storage-access";

import {
    MediaStoreConnector
} from "./mediastore";

import {
    SDCardManager
} from "./sdcard";

import {
    CloudConnector
} from "./cloud-connector";

/**
 * Android Connector.
 *
 * Central gateway between
 * SKOS and Android resources.
 */
export class AndroidConnector {

    /**
     * Storage Access Framework manager.
     */
    public readonly storage =
        new StorageAccess();

    /**
     * Android MediaStore.
     */
    public readonly mediaStore =
        new MediaStoreConnector();

    /**
     * SD Card manager.
     */
    public readonly sdCard =
        new SDCardManager();

    /**
     * Cloud sources manager.
     */
    public readonly cloud =
        new CloudConnector();

    /**
     * Connector health state.
     */
    public isReady(): boolean {

        return true;

    }

    /**
     * Return connector version.
     */
    public version(): string {

        return "0.1.0";

    }

    /**
     * Initialize subsystem.
     */
    public initialize(): void {

        // Foundation version.
        // Android API initialization
        // will be added later.

    }

    /**
     * Shutdown subsystem.
     */
    public shutdown(): void {

        this.storage.clear();

        this.mediaStore.clear();

    }

}
