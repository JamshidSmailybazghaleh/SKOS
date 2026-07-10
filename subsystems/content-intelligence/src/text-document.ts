/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Intelligence
 * Module    : Text Document
 *
 * Build     : BUILD-000181
 * Version   : 1.0.0
 * ==========================================================
 */

import { FileMetadata } from "../../android-connector/src/file-metadata";

/**
 * Supported document languages.
 */
export enum DocumentLanguage {

    Persian = "fa",

    English = "en",

    Arabic = "ar",

    Unknown = "unknown"

}

/**
 * Structured text document.
 */
export interface TextDocument {

    /**
     * Source file information.
     */
    metadata: FileMetadata;

    /**
     * Raw extracted text.
     */
    rawText: string;

    /**
     * Normalized text.
     */
    normalizedText: string;

    /**
     * Detected language.
     */
    language: DocumentLanguage;

    /**
     * Number of paragraphs.
     */
    paragraphCount: number;

    /**
     * Number of sentences.
     */
    sentenceCount: number;

    /**
     * Number of tokens.
     */
    tokenCount: number;

}
