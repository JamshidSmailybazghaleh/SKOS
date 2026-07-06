/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Release
 * Module    : Architecture Freeze
 *
 * Build     : BUILD-000139
 * Sprint    : Sprint 20
 * Version   : 0.1.0-alpha
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface ArchitectureSnapshot {

    version: string;

    build: string;

    frozenAt: number;

    foundationCompleted: boolean;

    releaseReady: boolean;

    modules: string[];

}

export class ArchitectureFreeze {

    private readonly modules: string[] = [];

    /**
     * Register module.
     */
    public registerModule(
        name: string
    ): void {

        if (!this.modules.includes(name)) {

            this.modules.push(name);

        }

    }

    /**
     * Freeze architecture.
     */
    public freeze(): ArchitectureSnapshot {

        return {

            version: "0.1.0-alpha",

            build: "BUILD-000139",

            frozenAt: Date.now(),

            foundationCompleted: true,

            releaseReady: true,

            modules: [...this.modules]

        };

    }

}
