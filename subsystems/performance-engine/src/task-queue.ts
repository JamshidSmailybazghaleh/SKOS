/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Performance Engine
 * Module    : Task Queue
 *
 * Build     : BUILD-000183
 * Version   : 1.0.0
 * ==========================================================
 */

import {
    Task,
    TaskPriority,
    TaskStatus
} from "./task";

export class TaskQueue {

    private readonly queue: Task[] = [];

    /**
     * Add a task to the queue.
     */
    public enqueue(task: Task): void {

        task.status = TaskStatus.Pending;

        this.queue.push(task);

        this.queue.sort(
            (a, b) => b.priority - a.priority
        );

    }

    /**
     * Remove and return the next task.
     */
    public dequeue(): Task | undefined {

        return this.queue.shift();

    }

    /**
     * Peek without removing.
     */
    public peek(): Task | undefined {

        return this.queue[0];

    }

    /**
     * Number of queued tasks.
     */
    public size(): number {

        return this.queue.length;

    }

    /**
     * Queue is empty?
     */
    public isEmpty(): boolean {

        return this.queue.length === 0;

    }

    /**
     * Remove all tasks.
     */
    public clear(): void {

        this.queue.length = 0;

    }

    /**
     * Snapshot of current queue.
     */
    public getTasks(): readonly Task[] {

        return [...this.queue];

    }

}
