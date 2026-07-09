/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Dashboard
 * Module    : Dashboard State
 *
 * Build     : BUILD-000175
 * Sprint    : Runtime Readiness
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Dashboard operating state.
 */
export enum DashboardState {

    /**
     * System is starting.
     */
    Starting = "starting",

    /**
     * System is idle.
     */
    Idle = "idle",

    /**
     * System is scanning.
     */
    Scanning = "scanning",

    /**
     * System is indexing.
     */
    Indexing = "indexing",

    /**
     * System is synchronizing.
     */
    Synchronizing = "synchronizing",

    /**
     * System is processing workflows.
     */
    Processing = "processing",

    /**
     * System is paused.
     */
    Paused = "paused",

    /**
     * System stopped.
     */
    Stopped = "stopped",

    /**
     * System encountered an error.
     */
    Error = "error"

}

/**
 * Dashboard status snapshot.
 */
export interface DashboardStatus {

    /**
     * Current dashboard state.
     */
    state: DashboardState;

    /**
     * Active execution session.
     */
    sessionId?: string;

    /**
     * Overall progress (0-100).
     */
    progress: number;

    /**
     * Active task count.
     */
    activeTasks: number;

    /**
     * Last update timestamp.
     */
    updatedAt: number;

}

/**
 * Dashboard state manager.
 */
export class DashboardStateManager {

    private status: DashboardStatus = {

        state: DashboardState.Starting,

        progress: 0,

        activeTasks: 0,

        updatedAt: Date.now()

    };

    /**
     * Return current status.
     */
    public getStatus(): DashboardStatus {

        return { ...this.status };

    }

    /**
     * Update dashboard status.
     */
    public update(
        status: Partial<DashboardStatus>
    ): void {

        this.status = {

            ...this.status,

            ...status,

            updatedAt: Date.now()

        };

    }

    /**
     * Reset dashboard state.
     */
    public reset(): void {

        this.status = {

            state: DashboardState.Idle,

            progress: 0,

            activeTasks: 0,

            updatedAt: Date.now()

        };

    }

}
