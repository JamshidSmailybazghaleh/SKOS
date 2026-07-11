/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Import Pipeline
 * Module    : Content Classifier
 *
 * Build     : BUILD-000193
 * Version   : 1.0.0
 * ==========================================================
 */

import { ImportSource } from "./import-source";
import { MetadataRecord } from "./metadata-extractor";

/**
 * Content category.
 */
export enum ContentCategory {

    Book = "book",

    Article = "article",

    Document = "document",

    Image = "image",

    Audio = "audio",

    Video = "video",

    Archive = "archive",

    Unknown = "unknown"

}

/**
 * Classification result.
 */
export interface ClassificationResult {

    /**
     * Content category.
     */
    category: ContentCategory;

    /**
     * Confidence score (0.0–1.0).
     */
    confidence: number;

}

/**
 * Content classifier.
 */
export class ContentClassifier {

    /**
     * Classify content.
     *
     * Version 1.0
     * Placeholder implementation.
     */
    public classify(
        source: ImportSource,
        metadata: MetadataRecord
    ): ClassificationResult {

        void metadata;

        switch (source.fileType) {

            case "pdf":
                return {
                    category: ContentCategory.Document,
                    confidence: 0.80
                };

            case "image":
                return {
                    category: ContentCategory.Image,
                    confidence: 1.00
                };

            case "audio":
                return {
                    category: ContentCategory.Audio,
                    confidence: 1.00
                };

            case "video":
                return {
                    category: ContentCategory.Video,
                    confidence: 1.00
                };

            default:
                return {
                    category: ContentCategory.Unknown,
                    confidence: 0.10
                };

        }

    }

}
