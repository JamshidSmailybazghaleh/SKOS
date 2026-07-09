/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Notification & Monitoring
 * Module    : Notification
 *
 * Build     : BUILD-000174
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Notification severity.
 */
export enum NotificationLevel {

    Information = "information",

    Success = "success",

    Warning = "warning",

    Error = "error",

    Critical = "critical"

}

/**
 * Notification category.
 */
export enum NotificationCategory {

    System = "system",

    Workflow = "workflow",

    Security = "security",

    Scan = "scan",

    Search = "search",

    Knowledge = "knowledge",

    Publishing = "publishing"

}

/**
 * Notification.
 */
export interface Notification {

    /**
     * Stable notification identifier.
     */
    id: string;

    /**
     * Notification title.
     */
    title: string;

    /**
     * Detailed message.
     */
    message: string;

    /**
     * Severity level.
     */
    level: NotificationLevel;

    /**
     * Notification category.
     */
    category: NotificationCategory;

    /**
     * Read flag.
     */
    read: boolean;

    /**
     * Creation timestamp.
     */
    createdAt: number;

}

/**
 * Notification Center.
 */
export class NotificationCenter {

    private readonly notifications: Notification[] = [];

    /**
     * Publish a notification.
     */
    public publish(
        notification: Notification
    ): void {

        this.notifications.push(notification);

    }

    /**
     * Return all notifications.
     */
    public list(): Notification[] {

        return [...this.notifications];

    }

    /**
     * Return unread notifications.
     */
    public unread(): Notification[] {

        return this.notifications.filter(

            notification => !notification.read

        );

    }

    /**
     * Mark notification as read.
     */
    public markAsRead(
        id: string
    ): boolean {

        const notification = this.notifications.find(

            item => item.id === id

        );

        if (!notification) {

            return false;

        }

        notification.read = true;

        return true;

    }

    /**
     * Clear all notifications.
     */
    public clear(): void {

        this.notifications.length = 0;

    }

}
