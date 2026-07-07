/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Center
 * Module    : Dashboard Status
 *
 * Build     : BUILD-000162
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import { Widget } from "./widget";

/**
 * Overall dashboard health.
 */
export enum DashboardHealth {

    Healthy = "healthy",

    Warning = "warning",

    Critical = "critical",

    Offline = "offline"

}

/**
 * Dashboard execution status.
 */
export enum DashboardStatusType {

    Starting = "starting",

    Running = "running",

    Idle = "idle",

    Maintenance = "maintenance",

    Stopped = "stopped"

}

/**
 * Dashboard status model.
 */
export interface DashboardStatus {

    /**
     * Current dashboard status.
     */
    status: DashboardStatusType;

    /**
     * Overall system health.
     */
    health: DashboardHealth;

    /**
     * Registered widgets.
     */
    widgets: Widget[];

    /**
     * Total widgets.
     */
    widgetCount: number;

    /**
     * Last refresh timestamp.
     */
    lastRefresh: number;

}

/**
 * Dashboard status manager.
 */
export class DashboardStatusManager {

    private readonly widgets: Widget[] = [];

    private status: DashboardStatusType =
        DashboardStatusType.Starting;

    private health: DashboardHealth =
        DashboardHealth.Healthy;

    /**
     * Register widget.
     */
    public registerWidget(

        widget: Widget

    ): void {

        this.widgets.push(widget);

    }

    /**
     * Update dashboard status.
     */
    public setStatus(

        status: DashboardStatusType

    ): void {

        this.status = status;

    }

    /**
     * Update dashboard health.
     */
    public setHealth(

        health: DashboardHealth

    ): void {

        this.health = health;

    }

    /**
     * Get current dashboard snapshot.
     */
    public snapshot(): DashboardStatus {

        return {

            status: this.status,

            health: this.health,

            widgets: [...this.widgets],

            widgetCount: this.widgets.length,

            lastRefresh: Date.now()

        };

    }

}
