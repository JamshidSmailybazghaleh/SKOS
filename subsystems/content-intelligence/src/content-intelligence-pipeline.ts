/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Content Intelligence
 * Module    : Content Intelligence Pipeline
 *
 * Build     : BUILD-000181
 * Version   : 1.0.0
 * ==========================================================
 */

import { FileMetadata } from "../../android-connector/src/file-metadata";

import { DocumentLanguage, TextDocument } from "./text-document";
import { TextNormalizer } from "./text-normalizer";
import { LanguageDetector } from "./language-detector";
import { TextSegmentationEngine } from "./text-segmentation-engine";

export class ContentIntelligencePipeline {

    constructor(
        private readonly normalizer: TextNormalizer,
        private readonly languageDetector: LanguageDetector,
        private readonly segmentationEngine: TextSegmentationEngine
    ) {}

    /**
     * Process extracted text into a structured document.
     */
    public process(
        metadata: FileMetadata,
        rawText: string
    ): TextDocument {

        const normalizedText =
            this.normalizer.normalize(rawText);

        const language =
            this.languageDetector.detect(normalizedText);

        const segments =
            this.segmentationEngine.segment(normalizedText);

        return {

            metadata,

            rawText,

            normalizedText,

            language: language ?? DocumentLanguage.Unknown,

            paragraphCount:
                segments.paragraphs.length,

            sentenceCount:
                segments.sentences.length,

            tokenCount:
                segments.tokens.length

        };

    }

}
