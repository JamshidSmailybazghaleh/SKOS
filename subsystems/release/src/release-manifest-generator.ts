/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Release
 * Module    : Release Manifest Generator
 *
 * Build     : BUILD-000137
 * Sprint    : Sprint 20
 * Version   : 0.1.0-alpha
 *
 * Status    : Foundation
 * ==========================================================
 */

export interface ReleaseManifest {

    product: string;

    version: string;

    build: string;

    releaseType: string;

    generatedAt: number;

    subsystemCount: number;

    subsystems: string[];

}

export class ReleaseManifestGenerator {

    private readonly subsystems: string[] = [];

    /**
     * Register subsystem.
     */
    public registerSubsystem(
        name: string
    ): void {

        if (!this.subsystems.includes(name)) {

            this.subsystems.push(name);

        }

    }

    /**
     * Generate release manifest.
     */
    public generate(): ReleaseManifest {

        return {

            product: "SKOS",

            version: "0.1.0-alpha",

            build: "BUILD-000137",

            releaseType: "Alpha",

            generatedAt: Date.now(),

            subsystemCount:
                this.subsystems.length,

            subsystems:
                [...this.subsystems]

        };

    }

}
