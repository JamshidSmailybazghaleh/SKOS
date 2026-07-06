/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Reasoning
 * Module    : Planner
 *
 * Build     : BUILD-000114
 * Sprint    : Sprint 16
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface PlanStep {

    id: string;

    title: string;

    completed: boolean;

}

export interface Plan {

    id: string;

    goal: string;

    steps: PlanStep[];

}

export class Planner {

    /**
     * Build execution plan.
     */
    public createPlan(

        goal: string

    ): Plan {

        return {

            id: crypto.randomUUID(),

            goal,

            steps: [

                {

                    id: "STEP-001",

                    title: goal,

                    completed: false

                }

            ]

        };

    }

}
