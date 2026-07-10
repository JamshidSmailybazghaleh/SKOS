/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Knowledge Validator
 *
 * Build     : BUILD-000182
 * Version   : 1.0.0
 * ==========================================================
 */

import { TextDocument } from "../../content-intelligence/src/text-document";

import { KnowledgeUnit } from "./knowledge-unit";
import { KnowledgeExtractionPipeline } from "./knowledge-extraction-pipeline";

export interface KnowledgeValidationResult {

    success: boolean;

    totalUnits: number;

    keywords: number;

    entities: number;

    averageConfidence: number;

}

export class KnowledgeValidator {

    constructor(

        private readonly pipeline:
        KnowledgeExtractionPipeline

    ) {}

    public validate(

        document: TextDocument

    ): KnowledgeValidationResult {

        const units =
            this.pipeline.extract(document);

        let keywords = 0;
        let entities = 0;
        let confidence = 0;

        for (const unit of units) {

            confidence += unit.confidence;

            switch (unit.type) {

                case "keyword":
                    keywords++;
                    break;

                case "entity":
                    entities++;
                    break;

            }

        }

        return {

            success: units.length > 0,

            totalUnits: units.length,

            keywords,

            entities,

            averageConfidence:

                units.length === 0
                    ? 0
                    : confidence / units.length

        };

    }

}
