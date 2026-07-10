/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Performance Engine
 * Module    : Performance Monitor
 *
 * Build     : BUILD-000183
 * Version   : 1.0.0
 * ==========================================================
 */

import { Task, TaskStatus } from "./task";

export interface PerformanceStatistics {

    totalTasks: number;

    completedTasks: number;

    failedTasks: number;

    cancelledTasks: number;

    averageExecutionTimeMs: number;

}

export class PerformanceMonitor {

    private readonly completed: Task[] = [];

    /**
     * Register a finished task.
     */
    public record(task: Task): void {

        this.completed.push(task);

    }

    /**
     * Generate runtime statistics.
     */
    public getStatistics(): PerformanceStatistics {

        const completedTasks =
            this.completed.filter(
                t => t.status === TaskStatus.Completed
            );

        const failedTasks =
            this.completed.filter(
                t => t.status === TaskStatus.Failed
            );

        const cancelledTasks =
            this.completed.filter(
                t => t.status === TaskStatus.Cancelled
            );

        const totalExecutionTime = completedTasks.reduce(

            (sum, task) => {

                if (!task.startedAt || !task.completedAt) {

                    return sum;

                }

                return sum +
                    (
                        task.completedAt.getTime() -
                        task.startedAt.getTime()
                    );

            },

            0

        );

        return {

            totalTasks: this.completed.length,

            completedTasks: completedTasks.length,

            failedTasks: failedTasks.length,

            cancelledTasks: cancelledTasks.length,

            averageExecutionTimeMs:

                completedTasks.length === 0
                    ? 0
                    : totalExecutionTime /
                      completedTasks.length

        };

    }

}
