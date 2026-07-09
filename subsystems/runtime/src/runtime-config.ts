/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime
 * Module    : Runtime Configuration
 *
 * Build     : BUILD-000176
 * Sprint    : Runtime Foundation
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Runtime mode.
 */
export enum RuntimeMode {

    Development = "development",

    Testing = "testing",

    Production = "production"

}

/**
 * Runtime configuration.
 */
export interface RuntimeConfiguration {

    /**
     * Runtime mode.
     */
    mode: RuntimeMode;

    /**
     * Workspace directory.
     */
    workspace: string;

    /**
     * Enable monitoring.
     */
    monitoringEnabled: boolean;

    /**
     * Enable workflow automation.
     */
    workflowEnabled: boolean;

    /**
     * Enable scan engine.
     */
    scanEnabled: boolean;

    /**
     * Enable cloud synchronization.
     */
    cloudEnabled: boolean;

    /**
     * Maximum worker threads.
     */
    maxWorkers: number;

    /**
     * Enable verbose logging.
     */
    verboseLogging: boolean;

}

/**
 * Runtime configuration manager.
 */
export class RuntimeConfigurationManager {

    private configuration: RuntimeConfiguration = {

        mode: RuntimeMode.Development,

        workspace: "./workspace",

        monitoringEnabled: true,

        workflowEnabled: true,

        scanEnabled: true,

        cloudEnabled: false,

        maxWorkers: 4,

        verboseLogging: true

    };

    /**
     * Return configuration.
     */
    public get(): RuntimeConfiguration {

        return {

            ...this.configuration

        };

    }

    /**
     * Update configuration.
     */
    public update(
        changes: Partial<RuntimeConfiguration>
    ): void {

        this.configuration = {

            ...this.configuration,

            ...changes

        };

    }

    /**
     * Reset configuration.
     */
    public reset(): void {

        this.configuration = {

            mode: RuntimeMode.Development,

            workspace: "./workspace",

            monitoringEnabled: true,

            workflowEnabled: true,

            scanEnabled: true,

            cloudEnabled: false,

            maxWorkers: 4,

            verboseLogging: true

        };

    }

}
