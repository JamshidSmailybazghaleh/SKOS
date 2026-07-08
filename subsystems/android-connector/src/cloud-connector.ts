/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Connector
 * Module    : Cloud Connector
 *
 * Build     : BUILD-000168
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Supported cloud providers.
 */
export enum CloudProvider {

    GoogleDrive = "google-drive",

    GitHub = "github",

    Dropbox = "dropbox",

    OneDrive = "onedrive",

    Nextcloud = "nextcloud",

    WebDAV = "webdav",

    S3 = "s3",

    Custom = "custom"

}

/**
 * Connection state.
 */
export enum CloudConnectionState {

    Disconnected = "disconnected",

    Connecting = "connecting",

    Connected = "connected",

    Error = "error"

}

/**
 * Cloud source definition.
 */
export interface CloudSource {

    /**
     * Stable source identifier.
     */
    sourceId: string;

    /**
     * Provider.
     */
    provider: CloudProvider;

    /**
     * Display name.
     */
    name: string;

    /**
     * Root path or folder.
     */
    root: string;

    /**
     * Connection state.
     */
    state: CloudConnectionState;

    /**
     * Last synchronization.
     */
    lastSyncAt?: number;

    /**
     * Number of indexed files.
     */
    indexedFiles: number;

}

/**
 * Cloud Connector.
 */
export class CloudConnector {

    private readonly sources: CloudSource[] = [];

    /**
     * Register one cloud source.
     */
    public register(
        source: CloudSource
    ): void {

        this.sources.push(source);

    }

    /**
     * List all cloud sources.
     */
    public list(): CloudSource[] {

        return [...this.sources];

    }

    /**
     * Find one source.
     */
    public find(
        sourceId: string
    ): CloudSource | undefined {

        return this.sources.find(

            source => source.sourceId === sourceId

        );

    }

    /**
     * Update synchronization information.
     */
    public updateSync(
        sourceId: string,
        indexedFiles: number
    ): boolean {

        const source = this.find(sourceId);

        if (!source) {

            return false;

        }

        source.indexedFiles = indexedFiles;
        source.lastSyncAt = Date.now();

        return true;

    }

    /**
     * Remove one source.
     */
    public remove(
        sourceId: string
    ): boolean {

        const index = this.sources.findIndex(

            source => source.sourceId === sourceId

        );

        if (index < 0) {

            return false;

        }

        this.sources.splice(index, 1);

        return true;

    }

}
