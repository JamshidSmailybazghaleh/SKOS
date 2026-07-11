/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime Foundation
 * Module    : Task Scheduler
 *
 * Build     : BUILD-000195
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Task status.
 */
export enum TaskStatus {

    Pending = "pending",

    Running = "running",

    Completed = "completed",

    Failed = "failed"

}

/**
 * Runtime task.
 */
export interface RuntimeTask {

    /**
     * Task identifier.
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
     * Execute task.
     */
    execute(): Promise<void>;

}

/**
 * Task scheduler.
 */
export class TaskScheduler {

    private readonly tasks: RuntimeTask[] = [];

    /**
     * Add a task.
     */
    public add(
        task: RuntimeTask
    ): void {

        this.tasks.push(task);

    }

    /**
     * Get all tasks.
     */
    public getTasks():
        readonly RuntimeTask[] {

        return this.tasks;

    }

    /**
     * Execute all pending tasks.
     */
    public async runAll(): Promise<void> {

        for (const task of this.tasks) {

            if (
                task.status !== TaskStatus.Pending
            ) {
                continue;
            }

            task.status = TaskStatus.Running;

            try {

                await task.execute();

                task.status =
                    TaskStatus.Completed;

            } catch {

                task.status =
                    TaskStatus.Failed;

            }

        }

    }

}
