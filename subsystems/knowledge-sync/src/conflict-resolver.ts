/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Knowledge Synchronization Engine
 * Module    : Conflict Resolver
 *
 * Build     : BUILD-000194
 * Version   : 1.0.0
 * ==========================================================
 */

import { DetectedChange } from "./change-detector";

/**
 * Conflict resolution policy.
 */
export enum ConflictPolicy {

    KeepExisting = "keep-existing",

    ReplaceExisting = "replace-existing",

    KeepBoth = "keep-both",

    ManualReview = "manual-review"

}

/**
 * Conflict resolution result.
 */
export interface ConflictResolution {

    /**
     * Original change.
     */
    change: DetectedChange;

    /**
     * Applied policy.
     */
    policy: ConflictPolicy;

    /**
     * True if the conflict was resolved automatically.
     */
    resolved: boolean;

}

/**
 * Conflict resolver.
 */
export class ConflictResolver {

    /**
     * Resolve one conflict.
     *
     * Version 1.0
     * Placeholder implementation.
     */
    public resolve(
        change: DetectedChange
    ): ConflictResolution {

        return {

            change,

            policy: ConflictPolicy.ManualReview,

            resolved: false

        };

    }

}
