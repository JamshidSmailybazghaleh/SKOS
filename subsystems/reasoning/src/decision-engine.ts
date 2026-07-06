/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Reasoning
 * Module    : Decision Engine
 *
 * Build     : BUILD-000113
 * Sprint    : Sprint 16
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface DecisionInput {

    reasoningSuccessful: boolean;

    conclusion: string;

}

export interface DecisionOutput {

    accepted: boolean;

    decision: string;

}

export class DecisionEngine {

    /**
     * Produce decision.
     */
    public decide(

        input: DecisionInput

    ): DecisionOutput {

        if (!input.reasoningSuccessful) {

            return {

                accepted: false,

                decision: "Decision rejected."

            };

        }

        return {

            accepted: true,

            decision:

                `Decision accepted: ${input.conclusion}`

        };

    }

}
