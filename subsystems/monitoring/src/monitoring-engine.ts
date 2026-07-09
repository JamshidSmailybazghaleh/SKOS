/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Notification & Monitoring
 * Module    : Monitoring Engine
 *
 * Build     : BUILD-000174
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    Notification,
    NotificationCenter
} from "./notification";

import {
    Logger,
    LogEntry
} from "./logger";

import {
    Alert,
    AlertManager
} from "./alert-manager";

import {
    Metric,
    MetricsRegistry
} from "./metrics";

/**
 * Monitoring Engine.
 */
export class MonitoringEngine {

    /**
     * Notification center.
     */
    private readonly notifications =
        new NotificationCenter();

    /**
     * Logger.
     */
    private readonly logger =
        new Logger();

    /**
     * Alert manager.
     */
    private readonly alerts =
        new AlertManager();

    /**
     * Metrics registry.
     */
    private readonly metrics =
        new MetricsRegistry();

    /**
     * Publish notification.
     */
    public notify(
        notification: Notification
    ): void {

        this.notifications.publish(
            notification
        );

    }

    /**
     * Write log.
     */
    public log(
        entry: LogEntry
    ): void {

        this.logger.log(
            entry
        );

    }

    /**
     * Raise alert.
     */
    public raiseAlert(
        alert: Alert
    ): void {

        this.alerts.raise(
            alert
        );

    }

    /**
     * Register or update metric.
     */
    public updateMetric(
        metric: Metric
    ): void {

        this.metrics.upsert(
            metric
        );

    }

    /**
     * Return notifications.
     */
    public getNotifications() {

        return this.notifications.list();

    }

    /**
     * Return logs.
     */
    public getLogs() {

        return this.logger.list();

    }

    /**
     * Return alerts.
     */
    public getAlerts() {

        return this.alerts.list();

    }

    /**
     * Return metrics.
     */
    public getMetrics() {

        return this.metrics.list();

    }

}
