/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime
 * Module    : Startup Manager
 *
 * Build     : BUILD-000176
 * Sprint    : Runtime Foundation
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Startup stage.
 */
export enum StartupStage {

    Pending = "pending",

    Starting = "starting",

    Started = "started",

    Failed = "failed"

}

/**
 * Startup task.
 */
export interface StartupTask {

    /**
     * Stable identifier.
     */
    id: string;

    /**
     * Task name.
     */
    name: string;

    /**
     * Current stage.
     */
    stage: StartupStage;

    /**
     * Startup priority.
     */
    priority: number;

}

/**
 * Startup Manager.
 */
export class StartupManager {

    private readonly tasks: StartupTask[] = [];

    /**
     * Register startup task.
     */
    public register(
        task: StartupTask
    ): void {

        this.tasks.push(task);

        this.tasks.sort(

            (a, b) => a.priority - b.priority

        );

    }

    /**
     * Return startup plan.
     */
    public plan(): StartupTask[] {

        return [...this.tasks];

    }

    /**
     * Start all registered tasks.
     */
    public start(): void {

        for (const task of this.tasks) {

            task.stage = StartupStage.Starting;

            /**
             * Future subsystem initialization.
             */

            task.stage = StartupStage.Started;

        }

    }

    /**
     * Reset startup state.
     */
    public reset(): void {

        for (const task of this.tasks) {

            task.stage = StartupStage.Pending;

        }

    }

}
