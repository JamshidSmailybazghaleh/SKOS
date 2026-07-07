/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Center
 * Module    : Notification Center
 *
 * Build     : BUILD-000162
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

    Info = "info",

    Success = "success",

    Warning = "warning",

    Error = "error"

}

/**
 * Notification category.
 */
export enum NotificationCategory {

    System = "system",

    Import = "import",

    Vault = "vault",

    Integrity = "integrity",

    Publication = "publication",

    Library = "library",

    Bookstore = "bookstore",

    AI = "ai"

}

/**
 * Notification model.
 */
export interface Notification {

    /**
     * Notification identifier.
     */
    id: string;

    /**
     * Notification title.
     */
    title: string;

    /**
     * Notification message.
     */
    message: string;

    /**
     * Notification category.
     */
    category: NotificationCategory;

    /**
     * Notification severity.
     */
    level: NotificationLevel;

    /**
     * Read state.
     */
    read: boolean;

    /**
     * Creation timestamp.
     */
    createdAt: number;

}

/**
 * Notification manager.
 */
export class NotificationCenter {

    private readonly notifications: Notification[] = [];

    /**
     * Add notification.
     */
    public add(

        notification: Notification

    ): void {

        this.notifications.unshift(

            notification

        );

    }

    /**
     * Mark notification as read.
     */
    public markAsRead(

        id: string

    ): boolean {

        const notification =

            this.notifications.find(

                item => item.id === id

            );

        if (!notification) {

            return false;

        }

        notification.read = true;

        return true;

    }

    /**
     * Retrieve all notifications.
     */
    public getAll(): Notification[] {

        return [

            ...this.notifications

        ];

    }

    /**
     * Retrieve unread notifications.
     */
    public getUnread(): Notification[] {

        return this.notifications.filter(

            item => !item.read

        );

    }

    /**
     * Total notifications.
     */
    public count(): number {

        return this.notifications.length;

    }

    /**
     * Clear notification history.
     */
    public clear(): void {

        this.notifications.length = 0;

    }

}
