/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Decision Engine
 *
 * Build     : BUILD-000071
 * Sprint    : Sprint 08
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface DecisionOption {

    id: string;

    title: string;

    score: number;

}

export interface DecisionResult {

    selected: DecisionOption;

    evaluated: number;

}

export class DecisionEngine {

    /**
     * Select the highest scored option.
     */
    public decide(

        options: DecisionOption[]

    ): DecisionResult {

        if (options.length === 0) {

            throw new Error("No decision options available.");

        }

        const selected = options.reduce(

            (best, current) =>

                current.score > best.score ? current : best

        );

        return {

            selected,

            evaluated: options.length

        };

    }

}
