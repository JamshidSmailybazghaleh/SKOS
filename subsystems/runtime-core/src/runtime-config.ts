/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime Core
 * Module    : Runtime Configuration
 *
 * Build     : BUILD-000187
 * Version   : 1.0.0
 * ==========================================================
 */

export enum RuntimeMode {

    Development = "development",

    Testing = "testing",

    Production = "production"

}

export interface RuntimeLimits {

    maxWorkers: number;

    maxMemoryMB: number;

    maxOpenFiles: number;

    maxKnowledgeUnits: number;

}

export interface FeatureFlags {

    enableKnowledgeGraph: boolean;

    enablePerformanceEngine: boolean;

    enableDiagnostics: boolean;

    enableCaching: boolean;

    enableExperimentalFeatures: boolean;

}

export interface RuntimeConfig {

    mode: RuntimeMode;

    workspacePath: string;

    tempDirectory: string;

    logDirectory: string;

    limits: RuntimeLimits;

    features: FeatureFlags;

}

export class RuntimeConfiguration {

    private config: RuntimeConfig;

    constructor(config: RuntimeConfig) {

        this.config = config;

    }

    /**
     * Get current configuration.
     */
    public getConfig(): RuntimeConfig {

        return this.config;

    }

    /**
     * Replace runtime configuration.
     */
    public update(
        config: RuntimeConfig
    ): void {

        this.config = config;

    }

    /**
     * Current runtime mode.
     */
    public getMode(): RuntimeMode {

        return this.config.mode;

    }

    /**
     * Check feature flag.
     */
    public isFeatureEnabled(
        feature: keyof FeatureFlags
    ): boolean {

        return this.config.features[feature];

    }

}
