/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Knowledge Extraction Pipeline
 *
 * Build     : BUILD-000182
 * Version   : 1.0.0
 * ==========================================================
 */

import { TextDocument } from "../../content-intelligence/src/text-document";

import { KnowledgeUnit } from "./knowledge-unit";
import { KeywordExtractor } from "./keyword-extractor";
import { EntityExtractor } from "./entity-extractor";

export class KnowledgeExtractionPipeline {

    constructor(
        private readonly keywordExtractor: KeywordExtractor,
        private readonly entityExtractor: EntityExtractor
    ) {}

    /**
     * Extract knowledge from a document.
     */
    public extract(
        document: TextDocument
    ): KnowledgeUnit[] {

        const keywords =
            this.keywordExtractor.extract(document);

        const entities =
            this.entityExtractor.extract(document);

        return [
            ...keywords,
            ...entities
        ];

    }

}
