/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Migration Engine
 * Module    : Migration Source
 *
 * Build     : BUILD-000191
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Supported migration source types.
 */
export enum MigrationSourceType {

    InternalStorage = "internal-storage",

    SDCard = "sd-card",

    GoogleDrive = "google-drive",

    LocalFolder = "local-folder",

    USBStorage = "usb-storage",

    ManualImport = "manual-import"

}

/**
 * Current source status.
 */
export enum MigrationSourceStatus {

    Available = "available",

    Unavailable = "unavailable",

    Scanning = "scanning",

    Completed = "completed",

    Failed = "failed"

}

/**
 * Migration source definition.
 */
export interface MigrationSource {

    /**
     * Unique source identifier.
     */
    id: string;

    /**
     * Source display name.
     */
    name: string;

    /**
     * Source type.
     */
    type: MigrationSourceType;

    /**
     * Root location.
     */
    location: string;

    /**
     * Current status.
     */
    status: MigrationSourceStatus;

    /**
     * Read-only mode.
     */
    readOnly: boolean;

    /**
     * Optional metadata.
     */
    metadata?: Record<string, unknown>;

}
