/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Release
 * Module    : Alpha Release Manager
 *
 * Build     : BUILD-000136
 * Sprint    : Sprint 20
 * Version   : 0.1.0-alpha
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface ReleaseModule {

    name: string;

    version: string;

    ready: boolean;

}

export interface AlphaReleaseStatus {

    version: string;

    generatedAt: number;

    totalModules: number;

    readyModules: number;

    releaseReady: boolean;

}

export class AlphaReleaseManager {

    private readonly modules: ReleaseModule[] = [];

    /**
     * Register a module for Alpha release.
     */
    public register(
        module: ReleaseModule
    ): void {

        this.modules.push(module);

    }

    /**
     * Generate release status.
     */
    public generate(): AlphaReleaseStatus {

        const readyModules =
            this.modules.filter(
                module => module.ready
            ).length;

        return {

            version: "0.1.0-alpha",

            generatedAt: Date.now(),

            totalModules:
                this.modules.length,

            readyModules,

            releaseReady:
                readyModules === this.modules.length &&
                this.modules.length > 0

        };

    }

}
