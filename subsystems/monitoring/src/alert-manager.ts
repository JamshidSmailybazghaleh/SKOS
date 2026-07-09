/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Notification & Monitoring
 * Module    : Alert Manager
 *
 * Build     : BUILD-000174
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Alert severity.
 */
export enum AlertSeverity {

    Low = "low",

    Medium = "medium",

    High = "high",

    Critical = "critical"

}

/**
 * Alert status.
 */
export enum AlertStatus {

    Open = "open",

    Acknowledged = "acknowledged",

    Resolved = "resolved"

}

/**
 * Alert definition.
 */
export interface Alert {

    /**
     * Stable alert identifier.
     */
    id: string;

    /**
     * Alert title.
     */
    title: string;

    /**
     * Alert description.
     */
    description: string;

    /**
     * Severity level.
     */
    severity: AlertSeverity;

    /**
     * Current status.
     */
    status: AlertStatus;

    /**
     * Source subsystem.
     */
    source: string;

    /**
     * Creation timestamp.
     */
    createdAt: number;

}

/**
 * Alert Manager.
 */
export class AlertManager {

    private readonly alerts: Alert[] = [];

    /**
     * Raise an alert.
     */
    public raise(
        alert: Alert
    ): void {

        this.alerts.push(alert);

    }

    /**
     * Return all alerts.
     */
    public list(): Alert[] {

        return [...this.alerts];

    }

    /**
     * Return open alerts.
     */
    public open(): Alert[] {

        return this.alerts.filter(

            alert =>

                alert.status === AlertStatus.Open

        );

    }

    /**
     * Acknowledge an alert.
     */
    public acknowledge(
        id: string
    ): boolean {

        const alert = this.alerts.find(

            item => item.id === id

        );

        if (!alert) {

            return false;

        }

        alert.status = AlertStatus.Acknowledged;

        return true;

    }

    /**
     * Resolve an alert.
     */
    public resolve(
        id: string
    ): boolean {

        const alert = this.alerts.find(

            item => item.id === id

        );

        if (!alert) {

            return false;

        }

        alert.status = AlertStatus.Resolved;

        return true;

    }

}
