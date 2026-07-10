/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Connector
 * Module    : Internal Storage Provider
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
 * Internal Storage Provider.
 */
export class InternalStorageProvider
implements StorageProvider {

    private available = false;

    public async initialize(): Promise<boolean> {

        /**
         * Android initialization
         * (implemented in future builds)
         */

        this.available = true;

        return this.available;

    }

    public isAvailable(): boolean {

        return this.available;

    }

    public async getInfo(): Promise<StorageInfo> {

        return {

            id: "internal-storage",

            name: "Internal Storage",

            type: StorageSourceType.Internal,

            rootPath: "/storage/emulated/0",

            state: this.available
                ? StorageState.Ready
                : StorageState.Unavailable,

            readable: true,

            writable: true

        };

    }

    public async getRootPaths(): Promise<string[]> {

        return [

            "/storage/emulated/0"

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
