/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Reasoning Engine
 *
 * Build     : BUILD-000051
 * Sprint    : Sprint 04
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { KnowledgeObjectSchema } from "../../knowledge-engine/src/knowledge-schema";

export interface InferenceResult {

    success: boolean;

    generatedFacts: string[];

}

export class ReasoningEngine {

    /**
     * Execute reasoning rules.
     */

    public infer(

        object: KnowledgeObjectSchema

    ): InferenceResult {

        return {

            success: true,

            generatedFacts: []

        };

    }

}
