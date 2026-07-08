/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Workflow Automation
 * Module    : Task Executor
 *
 * Build     : BUILD-000173
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Task execution status.
 */
export enum TaskStatus {

    Pending = "pending",

    Running = "running",

    Completed = "completed",

    Failed = "failed",

    Cancelled = "cancelled"

}

/**
 * Executable task.
 */
export interface WorkflowTask {

    /**
     * Stable task identifier.
     */
    id: string;

    /**
     * Task name.
     */
    name: string;

    /**
     * Current status.
     */
    status: TaskStatus;

    /**
     * Optional payload.
     */
    payload?: Record<string, unknown>;

    /**
     * Retry attempts.
     */
    retryCount: number;

    /**
     * Creation timestamp.
     */
    createdAt: number;

}

/**
 * Task Executor.
 */
export class TaskExecutor {

    private readonly queue: WorkflowTask[] = [];

    /**
     * Add task to queue.
     */
    public enqueue(
        task: WorkflowTask
    ): void {

        this.queue.push(task);

    }

    /**
     * Return queued tasks.
     */
    public list(): WorkflowTask[] {

        return [...this.queue];

    }

    /**
     * Execute next task.
     *
     * Foundation implementation.
     */
    public executeNext(): WorkflowTask | undefined {

        const task = this.queue.shift();

        if (!task) {

            return undefined;

        }

        task.status = TaskStatus.Running;

        /**
         * Future execution pipeline:
         *
         * - Execute action
         * - Retry if needed
         * - Error handling
         * - Monitoring
         * - Logging
         */

        task.status = TaskStatus.Completed;

        return task;

    }

    /**
     * Clear queue.
     */
    public clear(): void {

        this.queue.length = 0;

    }

}
