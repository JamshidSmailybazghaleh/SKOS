/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 * Module    : Knowledge Object Builder
 *
 * Build     : BUILD-000040
 * Sprint    : Sprint 03
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

import { Entity } from "./entity-extractor";
import { Concept } from "./concept-extractor";
import { Relationship } from "./relationship-extractor";

export interface KnowledgeObject {

    id: string;

    createdAt: Date;

    entities: Entity[];

    concepts: Concept[];

    relationships: Relationship[];

}

export class KnowledgeObjectBuilder {

    public build(

        entities: Entity[],

        concepts: Concept[],

        relationships: Relationship[]

    ): KnowledgeObject {

        return {

            id: this.generateId(),

            createdAt: new Date(),

            entities,

            concepts,

            relationships

        };

    }

    private generateId(): string {

        return "KO-" + Date.now();

    }

}
