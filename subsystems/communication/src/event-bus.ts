/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Communication
 * Module    : Event Bus
 *
 * Build     : BUILD-000121
 * Sprint    : Sprint 18
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface EventMessage {

    type: string;

    payload: unknown;

}

export type EventHandler = (

    event: EventMessage

) => void;

export class EventBus {

    private readonly handlers =
        new Map<string, EventHandler[]>();

    /**
     * Subscribe.
     */
    public subscribe(

        eventType: string,

        handler: EventHandler

    ): void {

        const list =

            this.handlers.get(eventType) ?? [];

        list.push(handler);

        this.handlers.set(

            eventType,

            list

        );

    }

    /**
     * Publish.
     */
    public publish(

        event: EventMessage

    ): void {

        const list =

            this.handlers.get(event.type);

        if (!list) {

            return;

        }

        for (const handler of list) {

            handler(event);

        }

    }

}
