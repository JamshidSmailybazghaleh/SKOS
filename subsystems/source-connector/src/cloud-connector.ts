/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Connector
 * Module    : Cloud Connector
 *
 * Build     : BUILD-000145
 * Version   : 0.0.1
 * ==========================================================
 */

import { SourceConnector } from "./connector";

import { SourceInfo } from "./source-info";

import { ScanResult } from "./scan-result";

import { CloudProvider } from "./cloud-provider";

export class CloudConnector implements SourceConnector {

    private connected = false;

    constructor(

        private readonly provider: CloudProvider,

        private readonly root: string

    ) {}

    public async connect(): Promise<boolean> {

        this.connected = true;

        return true;

    }

    public async disconnect(): Promise<void> {

        this.connected = false;

    }

    public async scan(): Promise<ScanResult> {

        return {

            totalFiles: 0,

            scannedFiles: 0,

            errors: 0,

            completed: true

        };

    }

    public getSourceInfo(): SourceInfo {

        return {

            id: "cloud",

            name: this.provider,

            type: "cloud",

            location: this.root,

            available: this.connected

        };

    }

}
