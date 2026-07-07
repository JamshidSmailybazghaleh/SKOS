/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Center
 * Module    : Operations Center
 *
 * Build     : BUILD-000162
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    Widget,
    WidgetFactory,
    WidgetType
} from "./widget";

import {
    DashboardStatus,
    DashboardStatusManager,
    DashboardStatusType,
    DashboardHealth
} from "./dashboard-status";

import {
    Notification,
    NotificationCenter
} from "./notification";

import {
    SystemReport,
    SystemReportBuilder
} from "./system-report";

/**
 * SKOS Operations Center
 */
export class OperationsCenter {

    private readonly dashboard =
        new DashboardStatusManager();

    private readonly notifications =
        new NotificationCenter();

    private readonly report =
        new SystemReportBuilder();

    /**
     * Initialize Operations Center.
     */
    public initialize(): void {

        this.dashboard.setStatus(
            DashboardStatusType.Running
        );

        this.dashboard.setHealth(
            DashboardHealth.Healthy
        );

        this.registerDefaultWidgets();

    }

    /**
     * Register default dashboard widgets.
     */
    private registerDefaultWidgets(): void {

        const widgets: Widget[] = [

            WidgetFactory.create(
                "system-health",
                "System Health",
                WidgetType.SystemHealth,
                1
            ),

            WidgetFactory.create(
                "knowledge-vault",
                "Knowledge Vault",
                WidgetType.KnowledgeVault,
                2
            ),

            WidgetFactory.create(
                "asset-registry",
                "Asset Registry",
                WidgetType.AssetRegistry,
                3
            ),

            WidgetFactory.create(
                "integrity-engine",
                "Integrity Engine",
                WidgetType.IntegrityEngine,
                4
            ),

            WidgetFactory.create(
                "publication-queue",
                "Publication Queue",
                WidgetType.PublicationQueue,
                5
            ),

            WidgetFactory.create(
                "notification-center",
                "Notification Center",
                WidgetType.NotificationCenter,
                6
            )

        ];

        widgets.forEach(

            widget =>

                this.dashboard.registerWidget(

                    widget

                )

        );

    }

    /**
     * Add notification.
     */
    public notify(

        notification: Notification

    ): void {

        this.notifications.add(

            notification

        );

    }

    /**
     * Dashboard snapshot.
     */
    public dashboardStatus(): DashboardStatus {

        return this.dashboard.snapshot();

    }

    /**
     * System report.
     */
    public systemReport(): SystemReport {

        return this.report.getReport();

    }

    /**
     * Update system report.
     */
    public updateReport(

        values: Partial<SystemReport>

    ): void {

        this.report.update(

            values

        );

    }

    /**
     * Get notifications.
     */
    public notificationsList(): Notification[] {

        return this.notifications.getAll();

    }

}
