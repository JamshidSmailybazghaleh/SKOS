/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Connector
 * Module    : Android Storage Manager
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
    StorageFactory
} from "./storage-factory";

export class AndroidStorageManager {

    private providers: StorageProvider[] = [];

    /**
     * Initialize storage providers.
     */
    public async initialize(): Promise<void> {

        this.providers = [

            StorageFactory.create(
                StorageSourceType.Internal
            ),

            StorageFactory.create(
                StorageSourceType.SdCard
            )

        ];

        for (const provider of this.providers) {

            await provider.initialize();

        }

    }

    /**
     * Return active providers.
     */
    public getProviders(): StorageProvider[] {

        return this.providers;

    }

}
