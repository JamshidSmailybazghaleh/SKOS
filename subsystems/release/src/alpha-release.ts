/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Release
 * Module    : Alpha Release
 *
 * Build     : BUILD-000140
 * Sprint    : Sprint 20
 * Version   : 0.1.0-alpha
 *
 * Status    : RELEASE
 * ==========================================================
 */

import { AlphaReleaseManager } from "./alpha-release-manager";
import { ReleaseManifestGenerator } from "./release-manifest-generator";
import { ReleasePackaging } from "./release-packaging";
import { ArchitectureFreeze } from "./architecture-freeze";

export interface AlphaReleaseResult {

    version: string;

    build: string;

    releasedAt: number;

    success: boolean;

    message: string;

}

export class AlphaRelease {

    public execute(): AlphaReleaseResult {

        const manager =
            new AlphaReleaseManager();

        manager.register({

            name: "Foundation",

            version: "0.1.0-alpha",

            ready: true

        });

        const status =
            manager.generate();

        const manifestGenerator =
            new ReleaseManifestGenerator();

        manifestGenerator.registerSubsystem(
            "Foundation"
        );

        const manifest =
            manifestGenerator.generate();

        const packaging =
            new ReleasePackaging();

        packaging.create(
            status,
            manifest
        );

        const freeze =
            new ArchitectureFreeze();

        freeze.registerModule(
            "Foundation"
        );

        freeze.freeze();

        return {

            version: manifest.version,

            build: "BUILD-000140",

            releasedAt: Date.now(),

            success: status.releaseReady,

            message:
                "SKOS Alpha Release completed successfully."

        };

    }

}
