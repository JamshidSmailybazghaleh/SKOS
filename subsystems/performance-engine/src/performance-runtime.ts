/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Performance Engine
 * Module    : Performance Runtime
 *
 * Build     : BUILD-000183
 * Version   : 1.0.0
 * ==========================================================
 */

import { Task } from "./task";
import { TaskQueue } from "./task-queue";
import { WorkerManager, TaskExecutor } from "./worker-manager";
import { PerformanceMonitor } from "./performance-monitor";

export class PerformanceRuntime {

    private readonly queue = new TaskQueue();

    private readonly monitor = new PerformanceMonitor();

    private readonly workers: WorkerManager;

    constructor(
        maxWorkers: number = 2
    ) {

        this.workers =
            new WorkerManager(
                this.queue,
                maxWorkers
            );

    }

    /**
     * Submit a new task.
     */
    public submit(task: Task): void {

        this.queue.enqueue(task);

    }

    /**
     * Start runtime processing.
     */
    public async run(
        executor: TaskExecutor
    ): Promise<void> {

        await this.workers.start(

            async (task) => {

                await executor(task);

                this.monitor.record(task);

            }

        );

    }

    /**
     * Runtime statistics.
     */
    public getStatistics() {

        return this.monitor.getStatistics();

    }

    /**
     * Queue size.
     */
    public getQueueSize(): number {

        return this.queue.size();

    }

    /**
     * Active workers.
     */
    public getRunningWorkers(): number {

        return this.workers.getRunningWorkers();

    }

}
