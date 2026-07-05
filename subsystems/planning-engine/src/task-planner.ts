/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Planning Engine
 * Module    : Task Planner
 *
 * Build     : BUILD-000069
 * Sprint    : Sprint 07
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { Goal } from "./planning-engine";

export interface Task {

    id: string;

    goalId: string;

    title: string;

    order: number;

    completed: boolean;

}

export class TaskPlanner {

    /**
     * Generate an initial task list.
     */
    public generateTasks(

        goal: Goal

    ): Task[] {

        return [

            {

                id: `${goal.id}-TASK-001`,

                goalId: goal.id,

                title: "Analyze Goal",

                order: 1,

                completed: false

            },

            {

                id: `${goal.id}-TASK-002`,

                goalId: goal.id,

                title: "Prepare Resources",

                order: 2,

                completed: false

            },

            {

                id: `${goal.id}-TASK-003`,

                goalId: goal.id,

                title: "Execute Plan",

                order: 3,

                completed: false

            }

        ];

    }

}
