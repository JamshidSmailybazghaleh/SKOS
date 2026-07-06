/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Connector
 * Module    : SD Card Connector
 *
 * Build     : BUILD-000142
 * Sprint    : Phase 2
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { SourceConnector } from "./connector";
import { SourceInfo } from "./source-info";
import { ScanResult } from "./scan-result";

export class SDCardConnector implements SourceConnector {

    private connected = false;

    constructor(

        private readonly rootPath: string

    ) {}

    /**
     * Connect to SD Card.
     */
    public async connect(): Promise<boolean> {

        this.connected = true;

        return this.connected;

    }

    /**
     * Disconnect.
     */
    public async disconnect(): Promise<void> {

        this.connected = false;

    }

    /**
     * Scan SD Card.
     *
     * Foundation version.
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

            id: "sdcard",

            name: "SD Card",

            type: "storage",

            location: this.rootPath,

            available: this.connected

        };

    }

}
