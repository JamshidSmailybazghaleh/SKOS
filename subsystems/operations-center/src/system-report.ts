/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Center
 * Module    : System Report
 *
 * Build     : BUILD-000162
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Overall system health.
 */
export enum SystemHealth {

    Healthy = "healthy",

    Warning = "warning",

    Critical = "critical",

    Offline = "offline"

}

/**
 * System report model.
 */
export interface SystemReport {

    /**
     * Overall system health.
     */
    health: SystemHealth;

    /**
     * Registered books.
     */
    books: number;

    /**
     * Registered assets.
     */
    assets: number;

    /**
     * Pending publications.
     */
    pendingPublications: number;

    /**
     * Registered notifications.
     */
    notifications: number;

    /**
     * Last scan timestamp.
     */
    lastScan: number | null;

    /**
     * Last backup timestamp.
     */
    lastBackup: number | null;

    /**
     * Cloud connection state.
     */
    cloudConnected: boolean;

    /**
     * Generated timestamp.
     */
    generatedAt: number;

}

/**
 * System report builder.
 */
export class SystemReportBuilder {

    private report: SystemReport = {

        health: SystemHealth.Healthy,

        books: 0,

        assets: 0,

        pendingPublications: 0,

        notifications: 0,

        lastScan: null,

        lastBackup: null,

        cloudConnected: false,

        generatedAt: Date.now()

    };

    /**
     * Update report values.
     */
    public update(

        values: Partial<SystemReport>

    ): void {

        this.report = {

            ...this.report,

            ...values,

            generatedAt: Date.now()

        };

    }

    /**
     * Get current report.
     */
    public getReport(): SystemReport {

        return {

            ...this.report

        };

    }

    /**
     * Reset report.
     */
    public reset(): void {

        this.report = {

            health: SystemHealth.Healthy,

            books: 0,

            assets: 0,

            pendingPublications: 0,

            notifications: 0,

            lastScan: null,

            lastBackup: null,

            cloudConnected: false,

            generatedAt: Date.now()

        };

    }

}
