/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Dashboard
 * Module    : Subsystem Status
 *
 * Build     : BUILD-000175
 * Sprint    : Runtime Readiness
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Subsystem health status.
 */
export enum SubsystemHealth {

    Unknown = "unknown",

    Starting = "starting",

    Healthy = "healthy",

    Warning = "warning",

    Error = "error",

    Offline = "offline"

}

/**
 * Subsystem status.
 */
export interface SubsystemStatus {

    /**
     * Stable subsystem identifier.
     */
    id: string;

    /**
     * Display name.
     */
    name: string;

    /**
     * Current health.
     */
    health: SubsystemHealth;

    /**
     * Current version.
     */
    version: string;

    /**
     * Optional status message.
     */
    message?: string;

    /**
     * Last heartbeat timestamp.
     */
    updatedAt: number;

}

/**
 * Subsystem registry.
 */
export class SubsystemRegistry {

    private readonly subsystems: Map<string, SubsystemStatus> =
        new Map();

    /**
     * Register or update subsystem.
     */
    public upsert(
        subsystem: SubsystemStatus
    ): void {

        this.subsystems.set(
            subsystem.id,
            subsystem
        );

    }

    /**
     * Return all subsystem statuses.
     */
    public list(): SubsystemStatus[] {

        return Array.from(
            this.subsystems.values()
        );

    }

    /**
     * Find subsystem by id.
     */
    public find(
        id: string
    ): SubsystemStatus | undefined {

        return this.subsystems.get(id);

    }

    /**
     * Remove subsystem.
     */
    public remove(
        id: string
    ): boolean {

        return this.subsystems.delete(id);

    }

}
