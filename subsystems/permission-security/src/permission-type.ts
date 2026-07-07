/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Permission & Security
 * Module    : Permission Type
 *
 * Build     : BUILD-000166
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Supported permission types.
 */
export enum PermissionType {

    /**
     * Internal device storage.
     */
    InternalStorage = "internal-storage",

    /**
     * External SD card.
     */
    SDCard = "sd-card",

    /**
     * Cloud storage providers.
     */
    CloudStorage = "cloud-storage",

    /**
     * User selected folders.
     */
    UserFolder = "user-folder",

    /**
     * Downloads directory.
     */
    Downloads = "downloads",

    /**
     * Documents directory.
     */
    Documents = "documents",

    /**
     * Camera access.
     */
    Camera = "camera",

    /**
     * Internet / network.
     */
    Network = "network",

    /**
     * Notifications.
     */
    Notifications = "notifications",

    /**
     * Background processing.
     */
    BackgroundTasks = "background-tasks",

    /**
     * USB / OTG storage.
     */
    ExternalDrive = "external-drive"

}

/**
 * Permission level.
 */
export enum PermissionLevel {

    /**
     * Read-only access.
     */
    Read = "read",

    /**
     * Read and write access.
     *
     * Reserved for future use.
     */
    ReadWrite = "read-write",

    /**
     * Administrative access.
     */
    Administrative = "administrative"

}

/**
 * Permission definition.
 */
export interface PermissionDefinition {

    /**
     * Permission identifier.
     */
    type: PermissionType;

    /**
     * Human-readable name.
     */
    title: string;

    /**
     * Required access level.
     */
    level: PermissionLevel;

    /**
     * Whether the permission is mandatory.
     */
    required: boolean;

    /**
     * Description shown to the user.
     */
    description: string;

}

/**
 * Default permission definitions.
 */
export const DefaultPermissions: PermissionDefinition[] = [

    {
        type: PermissionType.InternalStorage,
        title: "Internal Storage",
        level: PermissionLevel.Read,
        required: true,
        description: "Read files from the device internal storage."
    },

    {
        type: PermissionType.SDCard,
        title: "SD Card",
        level: PermissionLevel.Read,
        required: true,
        description: "Read files from the SD card."
    },

    {
        type: PermissionType.CloudStorage,
        title: "Cloud Storage",
        level: PermissionLevel.Read,
        required: false,
        description: "Access approved cloud storage providers."
    },

    {
        type: PermissionType.UserFolder,
        title: "User Selected Folder",
        level: PermissionLevel.Read,
        required: true,
        description: "Read files from folders selected by the user."
    },

    {
        type: PermissionType.Network,
        title: "Network",
        level: PermissionLevel.Read,
        required: false,
        description: "Access online services when enabled by the user."
    },

    {
        type: PermissionType.Notifications,
        title: "Notifications",
        level: PermissionLevel.Read,
        required: false,
        description: "Display workflow and system notifications."
    }

];
