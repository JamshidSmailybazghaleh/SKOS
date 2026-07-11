/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime Foundation
 * Module    : Service Registry
 *
 * Build     : BUILD-000195
 * Version   : 1.0.0
 * ==========================================================
 */

/**
 * Base service contract.
 */
export interface RuntimeService {

    /**
     * Unique service name.
     */
    readonly name: string;

    /**
     * Initialize service.
     */
    initialize(): void;

    /**
     * Shutdown service.
     */
    shutdown(): void;

}

/**
 * Service registry.
 */
export class ServiceRegistry {

    private readonly services =
        new Map<string, RuntimeService>();

    /**
     * Register a service.
     */
    public register(
        service: RuntimeService
    ): void {

        this.services.set(
            service.name,
            service
        );

    }

    /**
     * Get a service.
     */
    public get(
        name: string
    ): RuntimeService | undefined {

        return this.services.get(name);

    }

    /**
     * Get all services.
     */
    public getAll():
        readonly RuntimeService[] {

        return Array.from(
            this.services.values()
        );

    }

    /**
     * Check service existence.
     */
    public has(
        name: string
    ): boolean {

        return this.services.has(name);

    }

    /**
     * Remove a service.
     */
    public unregister(
        name: string
    ): boolean {

        return this.services.delete(name);

    }

}
