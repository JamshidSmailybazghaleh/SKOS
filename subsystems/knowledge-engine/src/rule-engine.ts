/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Reasoning Engine
 * Module    : Rule Engine
 *
 * Build     : BUILD-000052
 * Sprint    : Sprint 04
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { KnowledgeObjectSchema } from "../../knowledge-engine/src/knowledge-schema";

export interface Rule {

    id: string;

    name: string;

    description: string;

    enabled: boolean;

}

export interface RuleExecutionResult {

    executed: boolean;

    generatedFacts: string[];

}

export class RuleEngine {

    private readonly rules: Rule[] = [];

    /**
     * Register a new rule.
     */
    public register(rule: Rule): void {

        this.rules.push(rule);

    }

    /**
     * Execute all enabled rules.
     */
    public execute(

        object: KnowledgeObjectSchema

    ): RuleExecutionResult {

        const generatedFacts: string[] = [];

        for (const rule of this.rules) {

            if (!rule.enabled) {

                continue;

            }

            // Placeholder for future reasoning logic.
            generatedFacts.push(`Rule executed: ${rule.name}`);

        }

        return {

            executed: true,

            generatedFacts

        };

    }

    /**
     * Get registered rules.
     */
    public getRules(): Rule[] {

        return [...this.rules];

    }

}
