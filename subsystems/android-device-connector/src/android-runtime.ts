/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Device Connector
 * Module    : Android Runtime
 *
 * Build     : BUILD-000192
 * Version   : 1.0.0
 * ==========================================================
 */

import { AndroidDevice } from "./android-device";
import {
    PermissionManager,
    AndroidPermission,
    PermissionStatus
} from "./permission-manager";
import {
    StorageProvider,
    StorageInfo
} from "./storage-provider";
import {
    ConnectorReport,
    ConnectorReportGenerator
} from "./connector-report";

export interface AndroidRuntimeResult {

    report: ConnectorReport;

    storage: readonly StorageInfo[];

}

export class AndroidRuntime {

    private readonly permissionManager =
        new PermissionManager();

    private readonly storageProvider =
        new StorageProvider();

    private readonly reportGenerator =
        new ConnectorReportGenerator();

    /**
     * Initialize Android connector.
     */
    public initialize(
        device: AndroidDevice
    ): AndroidRuntimeResult {

        const internalPermission =
            this.permissionManager.check(
                AndroidPermission.ReadInternalStorage
            );

        const externalPermission =
            this.permissionManager.check(
                AndroidPermission.ReadExternalStorage
            );

        if (
            internalPermission.status !== PermissionStatus.Granted &&
            externalPermission.status !== PermissionStatus.Granted
        ) {

            return {

                report:
                    this.reportGenerator.generate(
                        device,
                        []
                    ),

                storage: []

            };

        }

        const storage =
            this.storageProvider.discover(
                device
            );

        const report =
            this.reportGenerator.generate(
                device,
                storage
            );

        return {

            report,

            storage

        };

    }

}
