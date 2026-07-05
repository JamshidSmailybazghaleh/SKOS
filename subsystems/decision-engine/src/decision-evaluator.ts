/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Decision Engine
 * Module    : Decision Evaluator
 *
 * Build     : BUILD-000073
 * Sprint    : Sprint 08
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { DecisionOption } from "./decision-engine";
import { DecisionPolicy } from "./decision-policy-manager";

export interface EvaluatedDecisionOption extends DecisionOption {

    finalScore: number;

}

export class DecisionEvaluator {

    /**
     * Evaluate decision options using active policies.
     */
    public evaluate(

        options: DecisionOption[],

        policies: DecisionPolicy[]

    ): EvaluatedDecisionOption[] {

        const weight = policies.reduce(

            (sum, policy) => sum + policy.weight,

            0

        );

        const multiplier = weight > 0 ? weight : 1;

        return options.map(option => ({

            ...option,

            finalScore: option.score * multiplier

        }));

    }

}
