/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Workflow Automation
 * Module    : Scheduler
 *
 * Build     : BUILD-000173
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Schedule frequency.
 */
export enum ScheduleFrequency {

    Once = "once",

    Hourly = "hourly",

    Daily = "daily",

    Weekly = "weekly",

    Monthly = "monthly",

    Custom = "custom"

}

/**
 * Scheduled task definition.
 */
export interface ScheduledTask {

    /**
     * Stable task identifier.
     */
    id: string;

    /**
     * Task name.
     */
    name: string;

    /**
     * Schedule frequency.
     */
    frequency: ScheduleFrequency;

    /**
     * Next execution time.
     */
    nextRunAt: number;

    /**
     * Optional cron expression
     * for custom schedules.
     */
    cronExpression?: string;

    /**
     * Task enabled.
     */
    enabled: boolean;

}

/**
 * Scheduler.
 */
export class Scheduler {

    private readonly tasks: ScheduledTask[] = [];

    /**
     * Register a scheduled task.
     */
    public register(
        task: ScheduledTask
    ): void {

        this.tasks.push(task);

    }

    /**
     * Return all tasks.
     */
    public list(): ScheduledTask[] {

        return [...this.tasks];

    }

    /**
     * Return tasks ready to run.
     */
    public due(
        currentTime: number = Date.now()
    ): ScheduledTask[] {

        return this.tasks.filter(

            task =>

                task.enabled &&

                task.nextRunAt <= currentTime

        );

    }

    /**
     * Remove a scheduled task.
     */
    public remove(
        taskId: string
    ): boolean {

        const index = this.tasks.findIndex(

            task => task.id === taskId

        );

        if (index < 0) {

            return false;

        }

        this.tasks.splice(index, 1);

        return true;

    }

}
