/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Center
 * Module    : Widget
 *
 * Build     : BUILD-000162
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Supported dashboard widget types.
 */
export enum WidgetType {

    SystemHealth = "system-health",

    ImportMonitor = "import-monitor",

    KnowledgeVault = "knowledge-vault",

    AssetRegistry = "asset-registry",

    IntegrityEngine = "integrity-engine",

    PublicationQueue = "publication-queue",

    NotificationCenter = "notification-center",

    ActivityFeed = "activity-feed"

}

/**
 * Widget status.
 */
export enum WidgetStatus {

    Active = "active",

    Inactive = "inactive",

    Loading = "loading",

    Warning = "warning",

    Error = "error"

}

/**
 * Dashboard widget definition.
 */
export interface Widget {

    /**
     * Unique widget identifier.
     */
    id: string;

    /**
     * Widget title.
     */
    title: string;

    /**
     * Widget type.
     */
    type: WidgetType;

    /**
     * Display order.
     */
    order: number;

    /**
     * Current widget status.
     */
    status: WidgetStatus;

    /**
     * Visible on dashboard.
     */
    visible: boolean;

    /**
     * Last update timestamp.
     */
    updatedAt: number;

}

/**
 * Default widget factory.
 */
export class WidgetFactory {

    /**
     * Create dashboard widget.
     */
    public static create(

        id: string,

        title: string,

        type: WidgetType,

        order: number

    ): Widget {

        return {

            id,

            title,

            type,

            order,

            status: WidgetStatus.Active,

            visible: true,

            updatedAt: Date.now()

        };

    }

}
