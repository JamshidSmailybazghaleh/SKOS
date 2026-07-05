/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Relationship Extractor
 *
 * Build     : BUILD-000039
 * Sprint    : Sprint 03
 * Version   : 0.0.2
 *
 * Status    : Active
 * ==========================================================
 */

import { Entity } from "./entity-extractor";
import { Concept } from "./concept-extractor";

export interface Relationship {

    source: string;

    target: string;

    type: string;

    confidence: number;

}

export class RelationshipExtractor {

    /**
     * Create relationships
     * between extracted entities
     * and concepts.
     */

    public extract(

        entities: Entity[],

        concepts: Concept[]

    ): Relationship[] {

        const relationships: Relationship[] = [];

        for (const entity of entities) {

            for (const concept of concepts) {

                relationships.push({

                    source: entity.value,

                    target: concept.value,

                    type: "RELATED_TO",

                    confidence: 0.50

                });

            }

        }

        return relationships;

    }

}
