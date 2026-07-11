/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime Foundation
 * Module    : Event Bus
 *
 * Build     : BUILD-000195
 * Version   : 1.0.0
 * ==========================================================
 */

export interface RuntimeEvent {

    /**
     * Event name.
     */
    name: string;

    /**
     * Event timestamp.
     */
    timestamp: Date;

    /**
     * Event payload.
     */
    payload?: unknown;

}

export type EventHandler =
    (event: RuntimeEvent) => void;

export class EventBus {

    private readonly handlers =
        new Map<string, EventHandler[]>();

    /**
     * Subscribe to an event.
     */
    public subscribe(
        eventName: string,
        handler: EventHandler
    ): void {

        const list =
            this.handlers.get(eventName) ?? [];

        list.push(handler);

        this.handlers.set(
            eventName,
            list
        );

    }

    /**
     * Publish an event.
     */
    public publish(
        event: RuntimeEvent
    ): void {

        const list =
            this.handlers.get(event.name);

        if (!list) {

            return;

        }

        for (const handler of list) {

            handler(event);

        }

    }

}
