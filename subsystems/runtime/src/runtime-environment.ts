/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime
 * Module    : Runtime Environment
 *
 * Build     : BUILD-000176
 * Sprint    : Runtime Foundation
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Runtime platform.
 */
export enum RuntimePlatform {

    Android = "android",

    Desktop = "desktop",

    Server = "server",

    Web = "web",

    Unknown = "unknown"

}

/**
 * Runtime environment.
 */
export interface RuntimeEnvironment {

    /**
     * Current platform.
     */
    platform: RuntimePlatform;

    /**
     * Environment name.
     */
    name: string;

    /**
     * Environment version.
     */
    version: string;

    /**
     * Development mode.
     */
    development: boolean;

    /**
     * Production mode.
     */
    production: boolean;

    /**
     * File system available.
     */
    fileSystemAvailable: boolean;

    /**
     * Network available.
     */
    networkAvailable: boolean;

}

/**
 * Runtime Environment Manager.
 */
export class RuntimeEnvironmentManager {

    private environment: RuntimeEnvironment = {

        platform: RuntimePlatform.Unknown,

        name: "SKOS Runtime",

        version: "0.1.0",

        development: true,

        production: false,

        fileSystemAvailable: false,

        networkAvailable: false

    };

    /**
     * Return runtime environment.
     */
    public get(): RuntimeEnvironment {

        return {

            ...this.environment

        };

    }

    /**
     * Update runtime environment.
     */
    public update(
        changes: Partial<RuntimeEnvironment>
    ): void {

        this.environment = {

            ...this.environment,

            ...changes

        };

    }

    /**
     * Check whether runtime is ready.
     */
    public isReady(): boolean {

        return (

            this.environment.fileSystemAvailable &&
            this.environment.networkAvailable

        );

    }

}
