/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Learning Engine
 *
 * Build     : BUILD-000057
 * Sprint    : Sprint 05
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { KnowledgeObjectSchema } from "../../knowledge-engine/src/knowledge-schema";

export interface LearningResult {

    success: boolean;

    learnedPatterns: string[];

}

export class LearningEngine {

    /**
     * Learn from a Knowledge Object.
     */

    public learn(

        object: KnowledgeObjectSchema

    ): LearningResult {

        return {

            success: true,

            learnedPatterns: []

        };

    }

}
