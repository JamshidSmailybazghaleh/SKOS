/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Module  : File Metadata
 * Build   : BUILD-000179
 * Version : 1.0.0
 * ==========================================================
 */

/**
 * File category.
 */
export enum FileCategory {

    Document = "document",

    Image = "image",

    Audio = "audio",

    Video = "video",

    Archive = "archive",

    SourceCode = "source-code",

    Database = "database",

    Executable = "executable",

    Unknown = "unknown"

}

/**
 * File metadata.
 */
export interface FileMetadata {

    /**
     * Unique identifier.
     */
    id: string;

    /**
     * File name.
     */
    name: string;

    /**
     * Full file path.
     */
    path: string;

    /**
     * File extension.
     */
    extension: string;

    /**
     * File category.
     */
    category: FileCategory;

    /**
     * File size in bytes.
     */
    size: number;

    /**
     * Creation date (if available).
     */
    createdAt?: Date;

    /**
     * Last modification date.
     */
    modifiedAt?: Date;

    /**
     * Read permission.
     */
    readable: boolean;

    /**
     * Write permission.
     */
    writable: boolean;

    /**
     * Hidden file.
     */
    hidden: boolean;

}
