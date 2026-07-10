/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Connector
 * Module    : Storage Factory
 *
 * Build     : BUILD-000177
 * Phase     : Integration
 * Version   : 1.0.0
 * ==========================================================
 */

import {
    StorageProvider,
    StorageSourceType
} from "./storage-provider";

import {
    InternalStorageProvider
} from "./internal-storage";

import {
    SdCardStorageProvider
} from "./sdcard-storage";

/**
 * Storage Factory.
 */
export class StorageFactory {

    /**
     * Create storage provider.
     */
    public static create(
        type: StorageSourceType
    ): StorageProvider {

        switch (type) {

            case StorageSourceType.Internal:

                return new InternalStorageProvider();

            case StorageSourceType.SdCard:

                return new SdCardStorageProvider();

            default:

                throw new Error(
                    `Unsupported storage provider: ${type}`
                );

        }

    }

}
