/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Decision Engine
 * Module    : Decision Service
 *
 * Build     : BUILD-000074
 * Sprint    : Sprint 08
 * Version   : 0.1.0
 *
 * Status    : Integration
 * ==========================================================
 */

import {
    DecisionEngine,
    DecisionOption,
    DecisionResult
} from "./decision-engine";

import {
    DecisionEvaluator
} from "./decision-evaluator";

import {
    DecisionPolicyManager
} from "./decision-policy-manager";

export class DecisionService {

    constructor(

        private readonly engine: DecisionEngine,

        private readonly evaluator: DecisionEvaluator,

        private readonly policyManager: DecisionPolicyManager

    ) {}

    /**
     * Evaluate options and return the best decision.
     */
    public decide(

        options: DecisionOption[]

    ): DecisionResult {

        const policies = this.policyManager.getEnabled();

        const evaluated = this.evaluator.evaluate(

            options,

            policies

        );

        return this.engine.decide(

            evaluated.map(item => ({

                id: item.id,

                title: item.title,

                score: item.finalScore

            }))

        );

    }

}
