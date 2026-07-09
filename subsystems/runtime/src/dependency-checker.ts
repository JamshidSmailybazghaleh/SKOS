/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime
 * Module    : Dependency Checker
 *
 * Build     : BUILD-000176
 * Sprint    : Runtime Foundation
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Dependency status.
 */
export enum DependencyStatus {

    Available = "available",

    Missing = "missing",

    Warning = "warning"

}

/**
 * Dependency definition.
 */
export interface Dependency {

    /**
     * Stable identifier.
     */
    id: string;

    /**
     * Display name.
     */
    name: string;

    /**
     * Current status.
     */
    status: DependencyStatus;

    /**
     * Optional description.
     */
    description?: string;

}

/**
 * Dependency check result.
 */
export interface DependencyCheckResult {

    /**
     * Overall readiness.
     */
    ready: boolean;

    /**
     * Dependencies.
     */
    dependencies: Dependency[];

}

/**
 * Dependency Checker.
 */
export class DependencyChecker {

    private readonly dependencies: Dependency[] = [];

    /**
     * Register dependency.
     */
    public register(
        dependency: Dependency
    ): void {

        this.dependencies.push(dependency);

    }

    /**
     * Execute dependency check.
     */
    public check(): DependencyCheckResult {

        const ready = this.dependencies.every(

            dependency =>

                dependency.status ===
                DependencyStatus.Available

        );

        return {

            ready,

            dependencies: [...this.dependencies]

        };

    }

    /**
     * Clear dependencies.
     */
    public clear(): void {

        this.dependencies.length = 0;

    }

}
