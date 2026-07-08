/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Workflow Automation
 * Module    : Workflow Rule
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
    WorkflowEventType
} from "./workflow-event";

/**
 * Rule execution action.
 */
export interface WorkflowAction {

    /**
     * Action identifier.
     */
    id: string;

    /**
     * Action name.
     */
    name: string;

    /**
     * Optional parameters.
     */
    parameters?: Record<string, unknown>;

}

/**
 * Workflow rule.
 */
export interface WorkflowRule {

    /**
     * Stable rule identifier.
     */
    id: string;

    /**
     * Rule name.
     */
    name: string;

    /**
     * Trigger event.
     */
    trigger: WorkflowEventType;

    /**
     * Rule enabled.
     */
    enabled: boolean;

    /**
     * Action to execute.
     */
    action: WorkflowAction;

}

/**
 * Workflow Rule Registry.
 */
export class WorkflowRuleRegistry {

    private readonly rules: WorkflowRule[] = [];

    /**
     * Register a rule.
     */
    public register(
        rule: WorkflowRule
    ): void {

        this.rules.push(rule);

    }

    /**
     * Return all rules.
     */
    public list(): WorkflowRule[] {

        return [...this.rules];

    }

    /**
     * Return matching rules.
     */
    public match(
        event: WorkflowEvent
    ): WorkflowRule[] {

        return this.rules.filter(

            rule =>

                rule.enabled &&

                rule.trigger === event.type

        );

    }

    /**
     * Remove a rule.
     */
    public remove(
        ruleId: string
    ): boolean {

        const index = this.rules.findIndex(

            rule => rule.id === ruleId

        );

        if (index < 0) {

            return false;

        }

        this.rules.splice(index, 1);

        return true;

    }

}
