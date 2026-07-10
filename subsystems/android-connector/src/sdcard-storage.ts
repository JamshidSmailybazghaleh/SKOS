/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Connector
 * Module    : SD Card Storage Provider
 *
 * Build     : BUILD-000177
 * Phase     : Integration
 * Version   : 1.0.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    StorageInfo,
    StorageProvider,
    StorageSourceType,
    StorageState
} from "./storage-provider";

/**
 * SD Card Storage Provider.
 */
export class SdCardStorageProvider
implements StorageProvider {

    private available = false;

    public async initialize(): Promise<boolean> {

        /**
         * SD Card detection
         * will be implemented
         * in future builds.
         */

        this.available = false;

        return this.available;

    }

    public isAvailable(): boolean {

        return this.available;

    }

    public async getInfo(): Promise<StorageInfo> {

        return {

            id: "sdcard-storage",

            name: "SD Card",

            type: StorageSourceType.SdCard,

            rootPath: "/storage/XXXX-XXXX",

            state: this.available
                ? StorageState.Ready
                : StorageState.Unavailable,

            readable: this.available,

            writable: this.available

        };

    }

    public async getRootPaths(): Promise<string[]> {

        if (!this.available) {

            return [];

        }

        return [

            "/storage/XXXX-XXXX"

        ];

    }

    public async listDirectories(
        path: string
    ): Promise<string[]> {

        /**
         * Android implementation
         * will be added later.
         */

        return [];

    }

    public async listFiles(
        path: string
    ): Promise<string[]> {

        /**
         * Android implementation
         * will be added later.
         */

        return [];

    }

}
