/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module : Runtime Integration Validator
 * Build  : BUILD-000178
 * Version: 1.0.0
 * ==========================================================
 */

import { AndroidStorageManager } from "./android-storage-manager";
import { AndroidPermissionManager } from "./permission-manager";
import { StorageDiscovery } from "./storage-discovery";
import { AndroidPlatformAdapter } from "./android-platform-adapter";

export interface RuntimeValidationResult {

    success: boolean;

    platformReady: boolean;

    permissionsReady: boolean;

    storageReady: boolean;

    discoveredSources: number;

}

export class RuntimeIntegrationValidator {

    constructor(

        private readonly adapter: AndroidPlatformAdapter,

        private readonly permissionManager: AndroidPermissionManager,

        private readonly storageManager: AndroidStorageManager,

        private readonly discovery: StorageDiscovery

    ) {}

    public async validate(): Promise<RuntimeValidationResult> {

        const platformReady =
            await this.adapter.initialize();

        await this.permissionManager.initialize();

        const permissionsReady =
            await this.permissionManager.hasRequiredPermissions();

        await this.storageManager.initialize();

        const sources =
            await this.discovery.discover();

        return {

            success:
                platformReady &&
                permissionsReady,

            platformReady,

            permissionsReady,

            storageReady:
                sources.length > 0,

            discoveredSources:
                sources.length

        };

    }

}
