/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Source Discovery
 * Module    : Source Type
 *
 * Build     : BUILD-000165
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Supported source types.
 */
export enum SourceType {

    /**
     * Android internal storage.
     */
    InternalStorage = "internal-storage",

    /**
     * External SD card.
     */
    SDCard = "sd-card",

    /**
     * Cloud storage provider.
     */
    CloudStorage = "cloud-storage",

    /**
     * Downloads folder.
     */
    Downloads = "downloads",

    /**
     * Documents folder.
     */
    Documents = "documents",

    /**
     * User selected directory.
     */
    UserFolder = "user-folder",

    /**
     * External USB or OTG device.
     */
    ExternalDrive = "external-drive"

}

/**
 * Source availability.
 */
export enum SourceStatus {

    Available = "available",

    Unavailable = "unavailable",

    PermissionRequired = "permission-required",

    Scanning = "scanning",

    Completed = "completed",

    Error = "error"

}

/**
 * Source capability.
 */
export interface SourceCapability {

    /**
     * Source type.
     */
    type: SourceType;

    /**
     * Display name.
     */
    name: string;

    /**
     * Read access supported.
     */
    readable: boolean;

    /**
     * Write access supported.
     *
     * Foundation policy:
     * always false.
     */
    writable: boolean;

    /**
     * Recursive scan supported.
     */
    recursive: boolean;

    /**
     * Current source status.
     */
    status: SourceStatus;

}

/**
 * Default source capabilities.
 */
export const DefaultSources: SourceCapability[] = [

    {
        type: SourceType.InternalStorage,
        name: "Internal Storage",
        readable: true,
        writable: false,
        recursive: true,
        status: SourceStatus.PermissionRequired
    },

    {
        type: SourceType.SDCard,
        name: "SD Card",
        readable: true,
        writable: false,
        recursive: true,
        status: SourceStatus.PermissionRequired
    },

    {
        type: SourceType.CloudStorage,
        name: "Cloud Storage",
        readable: true,
        writable: false,
        recursive: true,
        status: SourceStatus.PermissionRequired
    },

    {
        type: SourceType.Downloads,
        name: "Downloads",
        readable: true,
        writable: false,
        recursive: true,
        status: SourceStatus.PermissionRequired
    },

    {
        type: SourceType.Documents,
        name: "Documents",
        readable: true,
        writable: false,
        recursive: true,
        status: SourceStatus.PermissionRequired
    },

    {
        type: SourceType.UserFolder,
        name: "User Selected Folder",
        readable: true,
        writable: false,
        recursive: true,
        status: SourceStatus.PermissionRequired
    },

    {
        type: SourceType.ExternalDrive,
        name: "External Drive",
        readable: true,
        writable: false,
        recursive: true,
        status: SourceStatus.Unavailable
    }

];
