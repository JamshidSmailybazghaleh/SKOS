/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Workflow Automation
 * Module    : Workflow Event
 *
 * Build     : BUILD-000173
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Supported workflow events.
 */
export enum WorkflowEventType {

    FileDiscovered = "file-discovered",

    FileModified = "file-modified",

    FileDeleted = "file-deleted",

    ScanCompleted = "scan-completed",

    ContentAnalyzed = "content-analyzed",

    AssetCreated = "asset-created",

    AssetUpdated = "asset-updated",

    GraphUpdated = "graph-updated",

    SearchIndexed = "search-indexed",

    PublicationCompleted = "publication-completed"

}

/**
 * Workflow event.
 */
export interface WorkflowEvent {

    /**
     * Stable event identifier.
     */
    id: string;

    /**
     * Event type.
     */
    type: WorkflowEventType;

    /**
     * Event source.
     */
    source: string;

    /**
     * Optional target.
     */
    target?: string;

    /**
     * Optional payload.
     */
    payload?: Record<string, unknown>;

    /**
     * Event timestamp.
     */
    createdAt: number;

}

/**
 * Workflow Event Bus.
 */
export class WorkflowEventBus {

    private readonly events: WorkflowEvent[] = [];

    /**
     * Publish event.
     */
    public publish(
        event: WorkflowEvent
    ): void {

        this.events.push(event);

    }

    /**
     * Return all events.
     */
    public list(): WorkflowEvent[] {

        return [...this.events];

    }

    /**
     * Return events by type.
     */
    public byType(
        type: WorkflowEventType
    ): WorkflowEvent[] {

        return this.events.filter(

            event => event.type === type

        );

    }

    /**
     * Clear all events.
     */
    public clear(): void {

        this.events.length = 0;

    }

}
