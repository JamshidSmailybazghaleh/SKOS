/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Intake Engine
 * Module    : Knowledge Object Builder
 *
 * Build     : BUILD-000026
 * Sprint    : Sprint 02
 * Version   : 0.0.1
 *
 * Status    : Active
 * ==========================================================
 */

import { Metadata } from "./metadata-extractor";

export interface KnowledgeObject {

    id: string;

    metadata: Metadata;

    content: string;

    createdAt: Date;

}

export class KnowledgeObjectBuilder {

    public build(
        metadata: Metadata,
        content: string
    ): KnowledgeObject {

        return {

            id: "KO-000001",

            metadata,

            content,

            createdAt: new Date()

        };

    }

}
