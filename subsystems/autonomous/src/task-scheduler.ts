/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Autonomous
 * Module    : Task Scheduler
 *
 * Build     : BUILD-000117
 * Sprint    : Sprint 17
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface Task {

    id: string;

    goalId: string;

    title: string;

    priority: number;

    completed: boolean;

}

export class TaskScheduler {

    private readonly queue: Task[] = [];

    /**
     * Schedule task.
     */
    public schedule(

        task: Task

    ): void {

        this.queue.push(task);

        this.queue.sort(

            (a, b) =>

                b.priority - a.priority

        );

    }

    /**
     * Retrieve next task.
     */
    public next(): Task | undefined {

        return this.queue.find(

            task =>

                !task.completed

        );

    }

    /**
     * Mark task completed.
     */
    public complete(

        id: string

    ): boolean {

        const task = this.queue.find(

            t =>

                t.id === id

        );

        if (!task) {

            return false;

        }

        task.completed = true;

        return true;

    }

    /**
     * List scheduled tasks.
     */
    public getTasks(): Task[] {

        return [...this.queue];

    }

}
