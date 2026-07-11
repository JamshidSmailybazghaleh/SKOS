/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Device Connector
 * Module    : Connector Report
 *
 * Build     : BUILD-000192
 * Version   : 1.0.0
 * ==========================================================
 */

import { AndroidDevice } from "./android-device";
import { StorageInfo } from "./storage-provider";

/**
 * Android connector report.
 */
export interface ConnectorReport {

    /**
     * Device information.
     */
    device: AndroidDevice;

    /**
     * Connected storage.
     */
    storage: readonly StorageInfo[];

    /**
     * Report creation time.
     */
    generatedAt: Date;

    /**
     * Overall status.
     */
    ready: boolean;

}

/**
 * Connector report generator.
 */
export class ConnectorReportGenerator {

    /**
     * Generate connector report.
     */
    public generate(
        device: AndroidDevice,
        storage: readonly StorageInfo[]
    ): ConnectorReport {

        return {

            device,

            storage,

            generatedAt: new Date(),

            ready:
                device.status === "connected" &&
                storage.length > 0

        };

    }

}
