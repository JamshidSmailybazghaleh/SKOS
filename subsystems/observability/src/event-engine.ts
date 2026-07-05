/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Observability
 * Module    : Event Engine
 *
 * Build     : BUILD-000086
 * Sprint    : Sprint 11
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface SystemEvent {

    id: string;

    type: string;

    source: string;

    timestamp: Date;

    payload?: unknown;

}

export class EventEngine {

    private readonly events: SystemEvent[] = [];

    /**
     * Record a system event.
     */
    public emit(

        event: SystemEvent

    ): void {

        this.events.push(event);

    }

    /**
     * Return all recorded events.
     */
    public getEvents(): SystemEvent[] {

        return [...this.events];

    }

    /**
     * Return events by type.
     */
    public getByType(

        type: string

    ): SystemEvent[] {

        return this.events.filter(

            event => event.type === type

        );

    }

}
