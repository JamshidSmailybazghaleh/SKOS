/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Intelligence
 * Module    : Intelligence Engine
 *
 * Build     : BUILD-000167
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    ContentClassifier,
    ClassificationResult
} from "./content-classifier";

import {
    MetadataExtractor,
    ContentMetadata
} from "./metadata-extractor";

import {
    LanguageDetector,
    LanguageDetectionResult
} from "./language-detector";

/**
 * Knowledge Asset.
 */
export interface KnowledgeAsset {

    /**
     * Asset identifier.
     */
    id: string;

    /**
     * Original file name.
     */
    fileName: string;

    /**
     * Classification result.
     */
    classification: ClassificationResult;

    /**
     * Extracted metadata.
     */
    metadata: ContentMetadata;

    /**
     * Language analysis.
     */
    language: LanguageDetectionResult;

    /**
     * Analysis timestamp.
     */
    analyzedAt: number;

}

/**
 * Intelligence Engine.
 */
export class IntelligenceEngine {

    private readonly classifier =
        new ContentClassifier();

    private readonly extractor =
        new MetadataExtractor();

    private readonly detector =
        new LanguageDetector();

    /**
     * Analyze one file.
     *
     * Foundation version.
     */
    public analyze(

        fileName: string,
        filePath: string,
        fileSize: number,
        sampleText: string

    ): KnowledgeAsset {

        const classification =

            this.classifier.classify(

                fileName,
                filePath

            );

        const metadata =

            this.extractor.extract(

                fileName,
                fileSize

            );

        const language =

            this.detector.detect(

                sampleText

            );

        metadata.contentType =
            classification.type;

        metadata.language =
            language.language;

        metadata.title =
            this.extractor.normalizeTitle(

                this.extractor.baseName(

                    fileName

                )

            );

        return {

            id: this.assetId(),

            fileName,

            classification,

            metadata,

            language,

            analyzedAt:

                Date.now()

        };

    }

    /**
     * Generate Knowledge Asset identifier.
     */
    private assetId(): string {

        return `asset-${Date.now()}`;

    }

}
