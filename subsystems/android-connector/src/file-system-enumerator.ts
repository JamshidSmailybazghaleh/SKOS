/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module : File System Enumerator
 * Build  : BUILD-000178
 * Version: 1.0.0
 *
 * Responsibility:
 * Enumerate files and directories from a StorageProvider.
 * This module DOES NOT read file contents.
 * ==========================================================
 */

import { StorageProvider } from "./storage-provider";

/**
 * Represents a file system entry.
 */
export interface FileSystemEntry {

    id: string;

    path: string;

    name: string;

    isDirectory: boolean;

    size?: number;

    modifiedAt?: Date;

}

/**
 * File System Enumerator.
 */
export class FileSystemEnumerator {

    constructor(
        private readonly provider: StorageProvider
    ) {}

    /**
     * Enumerate a storage root.
     */
    public async enumerate(
        root: string
    ): Promise<FileSystemEntry[]> {

        const entries: FileSystemEntry[] = [];

        await this.enumerateDirectory(
            root,
            entries
        );

        return entries;

    }

    /**
     * Recursive directory enumeration.
     */
    private async enumerateDirectory(
        path: string,
        entries: FileSystemEntry[]
    ): Promise<void> {

        const directories =
            await this.provider.listDirectories(path);

        for (const directory of directories) {

            entries.push({

                id: directory,

                path: directory,

                name: this.getName(directory),

                isDirectory: true

            });

            await this.enumerateDirectory(
                directory,
                entries
            );

        }

        const files =
            await this.provider.listFiles(path);

        for (const file of files) {

            entries.push({

                id: file,

                path: file,

                name: this.getName(file),

                isDirectory: false

            });

        }

    }

    /**
     * Extract file or directory name.
     */
    private getName(
        path: string
    ): string {

        const parts = path.split("/");

        return parts[parts.length - 1];

    }

}
