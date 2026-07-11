/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Synchronization Engine
 * Module    : Sync Source
 *
 * Build     : BUILD-000194
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Supported synchronization source types.
 */
export enum SyncSourceType {

    InternalStorage = "internal-storage",

    SDCard = "sd-card",

    GoogleDrive = "google-drive",

    LocalFolder = "local-folder",

    USBStorage = "usb-storage"

}

/**
 * Synchronization status.
 */
export enum SyncStatus {

    Idle = "idle",

    Synchronizing = "synchronizing",

    Completed = "completed",

    Failed = "failed"

}

/**
 * Synchronization source.
 */
export interface SyncSource {

    /**
     * Unique identifier.
     */
    id: string;

    /**
     * Display name.
     */
    name: string;

    /**
     * Source type.
     */
    type: SyncSourceType;

    /**
     * Root location.
     */
    location: string;

    /**
     * Last successful synchronization.
     */
    lastSyncAt?: Date;

    /**
     * Current synchronization status.
     */
    status: SyncStatus;

    /**
     * Read-only mode.
     */
    readOnly: boolean;

    /**
     * Additional metadata.
     */
    metadata?: Record<string, unknown>;

}
