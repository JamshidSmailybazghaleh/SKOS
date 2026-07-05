/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Reasoning Engine
 * Module    : Rule Executor
 *
 * Build     : BUILD-000055
 * Sprint    : Sprint 04
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { Rule } from "./rule-engine";
import { KnowledgeObjectSchema } from "../../knowledge-engine/src/knowledge-schema";

export interface RuleExecutionOutput {

    success: boolean;

    generatedFacts: string[];

}

export class RuleExecutor {

    /**
     * Execute one reasoning rule.
     */
    public execute(

        rule: Rule,

        object: KnowledgeObjectSchema

    ): RuleExecutionOutput {

        if (!rule.enabled) {

            return {

                success: false,

                generatedFacts: []

            };

        }

        return {

            success: true,

            generatedFacts: [

                `Executed rule: ${rule.name}`

            ]

        };

    }

}
