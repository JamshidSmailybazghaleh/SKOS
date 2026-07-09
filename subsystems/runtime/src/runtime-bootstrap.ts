/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime
 * Module    : Runtime Bootstrap
 *
 * Build     : BUILD-000176
 * Sprint    : Runtime Foundation
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    RuntimeConfigurationManager
} from "./runtime-config";

import {
    RuntimeEnvironmentManager
} from "./runtime-environment";

import {
    DependencyChecker
} from "./dependency-checker";

import {
    StartupManager
} from "./startup-manager";

/**
 * Runtime Bootstrap.
 */
export class RuntimeBootstrap {

    private readonly configuration =
        new RuntimeConfigurationManager();

    private readonly environment =
        new RuntimeEnvironmentManager();

    private readonly dependencyChecker =
        new DependencyChecker();

    private readonly startupManager =
        new StartupManager();

    /**
     * Initialize runtime.
     */
    public initialize(): boolean {

        // Load configuration
        this.configuration.get();

        // Read runtime environment
        this.environment.get();

        // Check dependencies
        const result =
            this.dependencyChecker.check();

        if (!result.ready) {

            return false;

        }

        // Start registered subsystems
        this.startupManager.start();

        return true;

    }

}
