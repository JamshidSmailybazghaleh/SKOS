/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Engine
 * Module    : Content Reader
 *
 * Build     : BUILD-000180
 * Version   : 1.0.0
 * ==========================================================
 */

import { FileMetadata } from "../../android-connector/src/file-metadata";

/**
 * Result returned after reading content.
 */
export interface ContentReadResult {

    /**
     * Was reading successful?
     */
    success: boolean;

    /**
     * File metadata.
     */
    metadata: FileMetadata;

    /**
     * Extracted raw text.
     */
    text: string;

    /**
     * Reading duration (milliseconds).
     */
    duration: number;

    /**
     * Error message if reading failed.
     */
    error?: string;

}

/**
 * Content Reader Contract.
 */
export interface ContentReader {

    /**
     * Reader name.
     */
    readonly name: string;

    /**
     * Supported file extensions.
     */
    readonly supportedExtensions: string[];

    /**
     * Can this reader handle this extension?
     */
    supports(
        extension: string
    ): boolean;

    /**
     * Read file content.
     */
    read(
        metadata: FileMetadata
    ): Promise<ContentReadResult>;

}
