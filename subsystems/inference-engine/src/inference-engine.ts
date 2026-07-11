/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Inference Engine
 * Module    : Inference Engine
 *
 * Build     : BUILD-000188
 * Version   : 1.0.0
 * ==========================================================
 */

import {
    InferenceRule,
    RuleCondition,
    RuleAction,
    RuleStatus
} from "./inference-rule";

import {
    InferenceFact,
    FactSource
} from "./inference-fact";

export class InferenceEngine {

    /**
     * Execute inference.
     */
    public execute(
        facts: readonly InferenceFact[],
        rules: readonly InferenceRule[]
    ): InferenceFact[] {

        const generatedFacts: InferenceFact[] = [];

        const orderedRules = [...rules]
            .filter(rule => rule.status === RuleStatus.Enabled)
            .sort((a, b) => b.priority - a.priority);

        for (const rule of orderedRules) {

            if (!this.matches(rule.conditions, facts)) {
                continue;
            }

            for (const action of rule.actions) {

                generatedFacts.push({

                    id: crypto.randomUUID(),

                    type: action.factType,

                    value: action.value,

                    source: FactSource.InferenceEngine,

                    confidence: {
                        score: action.confidence
                    },

                    createdAt: new Date()

                });

            }

        }

        return generatedFacts;

    }

    /**
     * Evaluate all rule conditions.
     */
    private matches(
        conditions: readonly RuleCondition[],
        facts: readonly InferenceFact[]
    ): boolean {

        return conditions.every(condition =>
            facts.some(fact =>
                this.matchesCondition(fact, condition)
            )
        );

    }

    /**
     * Evaluate one condition.
     */
    private matchesCondition(
        fact: InferenceFact,
        condition: RuleCondition
    ): boolean {

        if (fact.type !== condition.factType) {
            return false;
        }

        const value =
            condition.attribute &&
            typeof fact.value === "object" &&
            fact.value !== null
                ? (fact.value as Record<string, unknown>)[condition.attribute]
                : fact.value;

        switch (condition.operator) {

            case "==":
                return value === condition.value;

            case "!=":
                return value !== condition.value;

            case ">":
                return value > condition.value;

            case "<":
                return value < condition.value;

            case ">=":
                return value >= condition.value;

            case "<=":
                return value <= condition.value;

            case "contains":
                return typeof value === "string" &&
                    value.includes(String(condition.value));

            case "startsWith":
                return typeof value === "string" &&
                    value.startsWith(String(condition.value));

            case "endsWith":
                return typeof value === "string" &&
                    value.endsWith(String(condition.value));

            default:
                return false;

        }

    }

}
