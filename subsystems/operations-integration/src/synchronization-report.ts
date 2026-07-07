/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Integration
 * Module    : Synchronization Report
 *
 * Build     : BUILD-000163
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {

    IntegrationHealth

} from "./integration-status";

/**
 * Synchronization report.
 */
export interface SynchronizationReport {

    /**
     * Total registered subsystems.
     */
    totalSubsystems: number;

    /**
     * Connected subsystems.
     */
    connectedSubsystems: number;

    /**
     * Synchronizing subsystems.
     */
    synchronizingSubsystems: number;

    /**
     * Disconnected subsystems.
     */
    disconnectedSubsystems: number;

    /**
     * Failed subsystems.
     */
    failedSubsystems: number;

    /**
     * Overall integration health.
     */
    health: IntegrationHealth;

    /**
     * Synchronization started at.
     */
    startedAt: number;

    /**
     * Synchronization completed at.
     */
    completedAt: number | null;

    /**
     * Synchronization duration (milliseconds).
     */
    duration: number;

}

/**
 * Synchronization report builder.
 */
export class SynchronizationReportBuilder {

    private report: SynchronizationReport = {

        totalSubsystems: 0,

        connectedSubsystems: 0,

        synchronizingSubsystems: 0,

        disconnectedSubsystems: 0,

        failedSubsystems: 0,

        health: IntegrationHealth.Healthy,

        startedAt: Date.now(),

        completedAt: null,

        duration: 0

    };

    /**
     * Update report values.
     */
    public update(

        values: Partial<SynchronizationReport>

    ): void {

        this.report = {

            ...this.report,

            ...values

        };

    }

    /**
     * Complete synchronization.
     */
    public complete(): void {

        const completedAt = Date.now();

        this.report.completedAt = completedAt;

        this.report.duration =

            completedAt -

            this.report.startedAt;

    }

    /**
     * Retrieve report.
     */
    public getReport(): SynchronizationReport {

        return {

            ...this.report

        };

    }

    /**
     * Reset report.
     */
    public reset(): void {

        this.report = {

            totalSubsystems: 0,

            connectedSubsystems: 0,

            synchronizingSubsystems: 0,

            disconnectedSubsystems: 0,

            failedSubsystems: 0,

            health: IntegrationHealth.Healthy,

            startedAt: Date.now(),

            completedAt: null,

            duration: 0

        };

    }

}
