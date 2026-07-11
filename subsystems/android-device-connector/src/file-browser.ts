/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Android Device Connector
 * Module    : File Browser
 *
 * Build     : BUILD-000192
 * Version   : 1.0.0
 * ==========================================================
 */

import { StorageInfo } from "./storage-provider";

/**
 * File system entry.
 */
export interface FileEntry {

    /**
     * Full path.
     */
    path: string;

    /**
     * File or directory name.
     */
    name: string;

    /**
     * True if directory.
     */
    isDirectory: boolean;

    /**
     * Size in bytes.
     */
    size: number;

    /**
     * Last modified date.
     */
    modifiedAt: Date;

}

/**
 * File browser.
 */
export class FileBrowser {

    /**
     * Browse storage.
     *
     * Version 1.0
     * Placeholder implementation.
     */
    public browse(
        storage: StorageInfo
    ): FileEntry[] {

        void storage;

        /*
         * Future implementation:
         * - Traverse directories
         * - Read file metadata
         * - Respect permission rules
         * - Read-only browsing
         */

        return [];

    }

}
