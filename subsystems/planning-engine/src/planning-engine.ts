/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Planning Engine
 *
 * Build     : BUILD-000067
 * Sprint    : Sprint 07
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface Goal {

    id: string;

    title: string;

    description: string;

    priority: number;

}

export interface Plan {

    id: string;

    goalId: string;

    steps: string[];

}

export class PlanningEngine {

    /**
     * Create a simple execution plan.
     */
    public createPlan(

        goal: Goal

    ): Plan {

        return {

            id: `PLAN-${goal.id}`,

            goalId: goal.id,

            steps: [

                "Analyze Goal",

                "Generate Tasks",

                "Execute Tasks"

            ]

        };

    }

}
