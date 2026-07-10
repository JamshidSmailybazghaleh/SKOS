/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime Core
 * Module    : Diagnostics
 *
 * Build     : BUILD-000187
 * Version   : 1.0.0
 * ==========================================================
 */

import { RuntimeConfiguration } from "./runtime-config";
import { LifecycleManager } from "./lifecycle-manager";
import { HealthMonitor, HealthReport } from "./health-monitor";
import { Logger } from "./logger";
import { ErrorManager } from "./error-manager";

export interface DiagnosticsReport {

    version: string;

    runtimeMode: string;

    runtimeState: string;

    health: HealthReport;

    logCount: number;

    errorCount: number;

    generatedAt: Date;

}

export class Diagnostics {

    constructor(
        private readonly configuration: RuntimeConfiguration,
        private readonly lifecycle: LifecycleManager,
        private readonly healthMonitor: HealthMonitor,
        private readonly logger: Logger,
        private readonly errorManager: ErrorManager
    ) {}

    /**
     * Generate diagnostics report.
     */
    public generate(): DiagnosticsReport {

        return {

            version: "1.0.0",

            runtimeMode:
                this.configuration.getMode(),

            runtimeState:
                this.lifecycle.getState(),

            health:
                this.healthMonitor.getReport(),

            logCount:
                this.logger.getEntries().length,

            errorCount:
                this.errorManager.getErrors().length,

            generatedAt:
                new Date()

        };

    }

}
