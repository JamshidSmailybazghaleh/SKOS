/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Release
 * Module    : Release Packaging
 *
 * Build     : BUILD-000138
 * Sprint    : Sprint 20
 * Version   : 0.1.0-alpha
 *
 * Status    : Foundation
 * ==========================================================
 */

import { AlphaReleaseStatus } from "./alpha-release-manager";
import { ReleaseManifest } from "./release-manifest-generator";

export interface ReleasePackage {

    version: string;

    build: string;

    packageName: string;

    generatedAt: number;

    ready: boolean;

    manifest: ReleaseManifest;

}

export class ReleasePackaging {

    /**
     * Create release package.
     */
    public create(

        status: AlphaReleaseStatus,

        manifest: ReleaseManifest

    ): ReleasePackage {

        return {

            version: manifest.version,

            build: manifest.build,

            packageName:

                `skos-${manifest.version}`,

            generatedAt:

                Date.now(),

            ready:

                status.releaseReady,

            manifest

        };

    }

}
