/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Reasoning Engine
 * Module    : Inference Pipeline
 *
 * Build     : BUILD-000054
 * Sprint    : Sprint 04
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { KnowledgeObjectSchema } from "../../knowledge-engine/src/knowledge-schema";
import { RuleEngine, RuleExecutionResult } from "./rule-engine";

export interface InferencePipelineResult {

    success: boolean;

    generatedFacts: string[];

}

export class InferencePipeline {

    constructor(

        private readonly ruleEngine: RuleEngine

    ) {}

    /**
     * Execute complete inference pipeline.
     */
    public execute(

        object: KnowledgeObjectSchema

    ): InferencePipelineResult {

        const result: RuleExecutionResult =

            this.ruleEngine.execute(object);

        return {

            success: result.executed,

            generatedFacts: result.generatedFacts

        };

    }

}
