/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Planning Engine
 * Module    : Execution Planner
 *
 * Build     : BUILD-000070
 * Sprint    : Sprint 07
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { Task } from "./task-planner";

export interface ExecutionPlan {

    executionId: string;

    tasks: Task[];

    createdAt: Date;

}

export class ExecutionPlanner {

    /**
     * Build execution queue.
     */
    public createExecutionPlan(

        tasks: Task[]

    ): ExecutionPlan {

        const orderedTasks = [...tasks].sort(

            (a, b) => a.order - b.order

        );

        return {

            executionId: `EXEC-${Date.now()}`,

            tasks: orderedTasks,

            createdAt: new Date()

        };

    }

}
