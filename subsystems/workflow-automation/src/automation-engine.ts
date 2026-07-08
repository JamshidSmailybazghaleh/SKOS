/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Workflow Automation
 * Module    : Automation Engine
 *
 * Build     : BUILD-000173
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    WorkflowEvent,
    WorkflowEventBus
} from "./workflow-event";

import {
    WorkflowRuleRegistry
} from "./workflow-rule";

import {
    Scheduler
} from "./scheduler";

import {
    TaskExecutor,
    WorkflowTask,
    TaskStatus
} from "./task-executor";

/**
 * Workflow Automation Engine.
 */
export class AutomationEngine {

    /**
     * Event bus.
     */
    private readonly eventBus =
        new WorkflowEventBus();

    /**
     * Rule registry.
     */
    private readonly rules =
        new WorkflowRuleRegistry();

    /**
     * Scheduler.
     */
    private readonly scheduler =
        new Scheduler();

    /**
     * Task executor.
     */
    private readonly executor =
        new TaskExecutor();

    /**
     * Publish an event.
     */
    public publish(
        event: WorkflowEvent
    ): void {

        this.eventBus.publish(event);

        const matchedRules =
            this.rules.match(event);

        for (const rule of matchedRules) {

            const task: WorkflowTask = {

                id: crypto.randomUUID(),

                name: rule.action.name,

                status: TaskStatus.Pending,

                payload: rule.action.parameters,

                retryCount: 0,

                createdAt: Date.now()

            };

            this.executor.enqueue(task);

        }

    }

    /**
     * Execute one pending task.
     */
    public executeNext(): WorkflowTask | undefined {

        return this.executor.executeNext();

    }

    /**
     * Return registered events.
     */
    public events() {

        return this.eventBus.list();

    }

    /**
     * Return scheduled tasks.
     */
    public schedules() {

        return this.scheduler.list();

    }

    /**
     * Return queued tasks.
     */
    public queue() {

        return this.executor.list();

    }

}
