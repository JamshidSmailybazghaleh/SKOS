/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Performance Engine
 * Module    : Worker Manager
 *
 * Build     : BUILD-000183
 * Version   : 1.0.0
 * ==========================================================
 */

import { Task, TaskStatus } from "./task";
import { TaskQueue } from "./task-queue";

export type TaskExecutor =
    (task: Task) => Promise<void>;

export class WorkerManager {

    private runningWorkers = 0;

    constructor(
        private readonly queue: TaskQueue,
        private readonly maxWorkers: number = 2
    ) {}

    /**
     * Start processing queued tasks.
     */
    public async start(
        executor: TaskExecutor
    ): Promise<void> {

        while (
            this.runningWorkers < this.maxWorkers &&
            !this.queue.isEmpty()
        ) {

            const task = this.queue.dequeue();

            if (!task) {
                break;
            }

            this.runningWorkers++;

            this.executeTask(task, executor)
                .finally(() => {

                    this.runningWorkers--;

                });

        }

    }

    /**
     * Execute a single task.
     */
    private async executeTask(
        task: Task,
        executor: TaskExecutor
    ): Promise<void> {

        task.status = TaskStatus.Running;
        task.startedAt = new Date();

        try {

            await executor(task);

            task.status = TaskStatus.Completed;

        } catch (error) {

            task.status = TaskStatus.Failed;

            task.error =
                error instanceof Error
                    ? error.message
                    : String(error);

        } finally {

            task.completedAt = new Date();

        }

    }

    /**
     * Current active workers.
     */
    public getRunningWorkers(): number {

        return this.runningWorkers;

    }

    /**
     * Maximum allowed workers.
     */
    public getMaxWorkers(): number {

        return this.maxWorkers;

    }

}
