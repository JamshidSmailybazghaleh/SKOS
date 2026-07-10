/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime Core
 * Module    : Health Monitor
 *
 * Build     : BUILD-000187
 * Version   : 1.0.0
 * ==========================================================
 */

export enum HealthStatus {

    Healthy = "healthy",

    Warning = "warning",

    Critical = "critical"

}

export interface HealthReport {

    timestamp: Date;

    status: HealthStatus;

    memoryUsageMB: number;

    activePipelineCount: number;

    errorCount: number;

    warningCount: number;

}

export class HealthMonitor {

    private memoryUsageMB = 0;

    private activePipelineCount = 0;

    private errorCount = 0;

    private warningCount = 0;

    /**
     * Update memory usage.
     */
    public setMemoryUsage(
        value: number
    ): void {

        this.memoryUsageMB = value;

    }

    /**
     * Update active pipelines.
     */
    public setActivePipelineCount(
        value: number
    ): void {

        this.activePipelineCount = value;

    }

    /**
     * Update error count.
     */
    public setErrorCount(
        value: number
    ): void {

        this.errorCount = value;

    }

    /**
     * Update warning count.
     */
    public setWarningCount(
        value: number
    ): void {

        this.warningCount = value;

    }

    /**
     * Build current health report.
     */
    public getReport(): HealthReport {

        let status = HealthStatus.Healthy;

        if (this.errorCount > 0) {

            status = HealthStatus.Warning;

        }

        if (this.errorCount >= 10) {

            status = HealthStatus.Critical;

        }

        return {

            timestamp: new Date(),

            status,

            memoryUsageMB: this.memoryUsageMB,

            activePipelineCount: this.activePipelineCount,

            errorCount: this.errorCount,

            warningCount: this.warningCount

        };

    }

}
