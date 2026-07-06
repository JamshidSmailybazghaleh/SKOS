/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Connector
 * Module    : Internal Storage Connector
 *
 * Build     : BUILD-000144
 * Sprint    : Phase 2
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { SourceConnector } from "./connector";
import { SourceInfo } from "./source-info";
import { ScanResult } from "./scan-result";
import { StoragePath } from "./storage-path";

export class InternalStorageConnector implements SourceConnector {

    private connected = false;

    private readonly paths: StoragePath[] = [];

    constructor(

        private readonly rootPath: string

    ) {}

    /**
     * Connect.
     */
    public async connect(): Promise<boolean> {

        this.connected = true;

        return true;

    }

    /**
     * Disconnect.
     */
    public async disconnect(): Promise<void> {

        this.connected = false;

    }

    /**
     * Register scan path.
     */
    public addPath(

        path: StoragePath

    ): void {

        this.paths.push(path);

    }

    /**
     * Registered paths.
     */
    public getPaths(): StoragePath[] {

        return [...this.paths];

    }

    /**
     * Scan.
     */
    public async scan(): Promise<ScanResult> {

        return {

            totalFiles: 0,

            scannedFiles: 0,

            errors: 0,

            completed: true

        };

    }

    /**
     * Source information.
     */
    public getSourceInfo(): SourceInfo {

        return {

            id: "internal-storage",

            name: "Internal Storage",

            type: "storage",

            location: this.rootPath,

            available: this.connected

        };

    }

}
