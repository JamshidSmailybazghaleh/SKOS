/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Import Pipeline
 * Module    : Import Source
 *
 * Build     : BUILD-000193
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Supported import file types.
 */
export enum ImportFileType {

    PDF = "pdf",

    DOCX = "docx",

    TXT = "txt",

    MARKDOWN = "markdown",

    IMAGE = "image",

    AUDIO = "audio",

    VIDEO = "video",

    UNKNOWN = "unknown"

}

/**
 * Import source definition.
 */
export interface ImportSource {

    /**
     * Unique identifier.
     */
    id: string;

    /**
     * Absolute file path.
     */
    path: string;

    /**
     * File name.
     */
    fileName: string;

    /**
     * File type.
     */
    fileType: ImportFileType;

    /**
     * File size (bytes).
     */
    size: number;

    /**
     * SHA-256 checksum.
     *
     * Optional in version 1.0.
     */
    checksum?: string;

    /**
     * Last modified date.
     */
    modifiedAt: Date;

    /**
     * Optional metadata.
     */
    metadata?: Record<string, unknown>;

}
