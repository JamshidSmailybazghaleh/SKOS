/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Observability
 * Module    : Event Bus
 *
 * Build     : BUILD-000087
 * Sprint    : Sprint 11
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import { SystemEvent } from "./event-engine";

export type EventListener = (

    event: SystemEvent

) => void;

export class EventBus {

    private readonly listeners =
        new Map<string, EventListener[]>();

    /**
     * Subscribe to an event type.
     */
    public subscribe(

        eventType: string,

        listener: EventListener

    ): void {

        const current =

            this.listeners.get(eventType) ?? [];

        current.push(listener);

        this.listeners.set(

            eventType,

            current

        );

    }

    /**
     * Publish an event.
     */
    public publish(

        event: SystemEvent

    ): void {

        const current =

            this.listeners.get(event.type);

        if (!current) {

            return;

        }

        for (const listener of current) {

            listener(event);

        }

    }

}
