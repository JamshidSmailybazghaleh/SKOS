/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Connector
 * Module    : Storage Provider
 *
 * Build     : BUILD-000177
 * Phase     : Integration
 * Version   : 1.0.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Storage source type.
 */
export enum StorageSourceType {

    Internal = "internal",

    SdCard = "sdcard",

    Cloud = "cloud",

    GitHub = "github"

}

/**
 * Storage state.
 */
export enum StorageState {

    Unknown = "unknown",

    Initializing = "initializing",

    Ready = "ready",

    Scanning = "scanning",

    Unavailable = "unavailable",

    Error = "error"

}

/**
 * Storage information.
 */
export interface StorageInfo {

    id: string;

    name: string;

    type: StorageSourceType;

    rootPath: string;

    state: StorageState;

    readable: boolean;

    writable: boolean;

}

/**
 * Storage Provider contract.
 */
export interface StorageProvider {

    /**
     * Initialize provider.
     */
    initialize(): Promise<boolean>;

    /**
     * Is provider available?
     */
    isAvailable(): boolean;

    /**
     * Return storage information.
     */
    getInfo(): Promise<StorageInfo>;

    /**
     * Return root directories.
     */
    getRootPaths(): Promise<string[]>;

    /**
     * Return directories.
     */
    listDirectories(
        path: string
    ): Promise<string[]>;

    /**
     * Return files.
     */
    listFiles(
        path: string
    ): Promise<string[]>;

}
