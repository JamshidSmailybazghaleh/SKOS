/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Import Pipeline
 * Module    : Metadata Extractor
 *
 * Build     : BUILD-000193
 * Version   : 1.0.0
 * ==========================================================
 */

import { ImportSource } from "./import-source";

/**
 * Standard metadata.
 */
export interface MetadataRecord {

    title?: string;

    author?: string;

    subject?: string;

    keywords?: string[];

    language?: string;

    createdAt?: Date;

    modifiedAt?: Date;

    pageCount?: number;

    mimeType?: string;

    checksum?: string;

}

/**
 * Metadata extractor.
 */
export class MetadataExtractor {

    /**
     * Extract metadata.
     *
     * Version 1.0
     * Placeholder implementation.
     */
    public extract(
        source: ImportSource
    ): MetadataRecord {

        return {

            modifiedAt: source.modifiedAt,

            checksum: source.checksum

        };

    }

}
