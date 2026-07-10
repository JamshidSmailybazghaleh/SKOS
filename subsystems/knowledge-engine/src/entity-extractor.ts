/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Entity Extractor
 *
 * Build     : BUILD-000182
 * Version   : 1.0.0
 * ==========================================================
 */

import {
    TextDocument
} from "../../content-intelligence/src/text-document";

import {
    KnowledgeUnit,
    KnowledgeUnitType
} from "./knowledge-unit";

export enum EntityType {

    Person = "person",

    Organization = "organization",

    Location = "location",

    Date = "date",

    Number = "number"

}

export class EntityExtractor {

    /**
     * Extract basic entities.
     */
    public extract(
        document: TextDocument
    ): KnowledgeUnit[] {

        const entities: KnowledgeUnit[] = [];

        let index = 0;

        // Extract numbers
        const numberPattern = /\b\d+\b/g;

        for (const match of document.normalizedText.matchAll(numberPattern)) {

            entities.push({

                id: `ent-${index++}`,

                document,

                type: KnowledgeUnitType.Entity,

                value: match[0],

                startOffset: match.index ?? -1,

                endOffset:
                    (match.index ?? 0) + match[0].length,

                confidence: 0.90,

                metadata: {

                    entityType: EntityType.Number

                }

            });

        }

        // Future:
        // Person detection
        // Organization detection
        // Location detection
        // Date detection

        return entities;

    }

}
