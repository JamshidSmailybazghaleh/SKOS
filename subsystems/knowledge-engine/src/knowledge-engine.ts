/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Engine
 *
 * Build     : BUILD-000050
 * Sprint    : Sprint 03
 * Version   : 0.1.0
 *
 * Status    : Integration
 * ==========================================================
 */

import { EntityExtractor } from "./entity-extractor";
import { ConceptExtractor } from "./concept-extractor";
import { RelationshipExtractor } from "./relationship-extractor";
import { KnowledgeObjectBuilder } from "./knowledge-object-builder";
import { KnowledgeValidator } from "./knowledge-validator";
import {
    InMemoryKnowledgeRepository
} from "./knowledge-repository";

export class KnowledgeEngine {

    private readonly entityExtractor =
        new EntityExtractor();

    private readonly conceptExtractor =
        new ConceptExtractor();

    private readonly relationshipExtractor =
        new RelationshipExtractor();

    private readonly objectBuilder =
        new KnowledgeObjectBuilder();

    private readonly validator =
        new KnowledgeValidator();

    private readonly repository =
        new InMemoryKnowledgeRepository();

    public process(text: string): boolean {

        const entities =
            this.entityExtractor.extract(text);

        const concepts =
            this.conceptExtractor.extract(text);

        const relationships =
            this.relationshipExtractor.extract(
                entities,
                concepts
            );

        const object =
            this.objectBuilder.build(
                entities,
                concepts,
                relationships
            );

        const result =
            this.validator.validate(object as any);

        if (!result.valid) {

            console.log(result.errors);

            return false;

        }

        this.repository.save(object as any);

        return true;

    }

}
