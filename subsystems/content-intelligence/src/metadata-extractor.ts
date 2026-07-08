/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Intelligence
 * Module    : Metadata Extractor
 *
 * Build     : BUILD-000167
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    ContentLanguage,
    ContentType,
    PublicationStatus
} from "./content-type";

/**
 * Extracted metadata.
 */
export interface ContentMetadata {

    /**
     * Asset identifier.
     */
    assetId?: string;

    /**
     * Book or document title.
     */
    title?: string;

    /**
     * Author.
     */
    author?: string;

    /**
     * Language.
     */
    language: ContentLanguage;

    /**
     * Content type.
     */
    contentType: ContentType;

    /**
     * Publication status.
     */
    publicationStatus: PublicationStatus;

    /**
     * File version.
     */
    version?: string;

    /**
     * Page count.
     */
    pageCount?: number;

    /**
     * File size in bytes.
     */
    fileSize: number;

    /**
     * File extension.
     */
    extension: string;

    /**
     * SHA-256 checksum.
     */
    checksum?: string;

    /**
     * Creation timestamp.
     */
    createdAt?: number;

    /**
     * Last modification timestamp.
     */
    modifiedAt?: number;

    /**
     * Optional keywords.
     */
    keywords: string[];

}

/**
 * Metadata Extractor.
 */
export class MetadataExtractor {

    /**
     * Extract metadata.
     *
     * Foundation version.
     */
    public extract(

        fileName: string,

        fileSize: number

    ): ContentMetadata {

        const extension =

            fileName.split(".").pop()

            ?.toLowerCase() ?? "";

        return {

            language:

                ContentLanguage.Unknown,

            contentType:

                ContentType.Unknown,

            publicationStatus:

                PublicationStatus.Draft,

            fileSize,

            extension,

            keywords: []

        };

    }

    /**
     * Normalize title.
     */
    public normalizeTitle(

        title: string

    ): string {

        return title

            .replace(/[_-]+/g, " ")

            .replace(/\s+/g, " ")

            .trim();

    }

    /**
     * Extract filename
     * without extension.
     */
    public baseName(

        fileName: string

    ): string {

        const index =

            fileName.lastIndexOf(".");

        if (index < 0) {

            return fileName;

        }

        return fileName.substring(0, index);

    }

}
