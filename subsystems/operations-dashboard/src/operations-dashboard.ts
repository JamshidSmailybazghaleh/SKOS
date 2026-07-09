/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Dashboard
 * Module    : Operations Dashboard
 *
 * Build     : BUILD-000175
 * Sprint    : Runtime Readiness
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    DashboardStateManager
} from "./dashboard-state";

import {
    SubsystemRegistry
} from "./subsystem-status";

import {
    RuntimeController
} from "./runtime-controller";

import {
    ExecutionSessionManager
} from "./execution-session";

/**
 * Operations Dashboard.
 */
export class OperationsDashboard {

    /**
     * Dashboard state.
     */
    private readonly dashboard =
        new DashboardStateManager();

    /**
     * Subsystem registry.
     */
    private readonly subsystems =
        new SubsystemRegistry();

    /**
     * Runtime controller.
     */
    private readonly runtime =
        new RuntimeController();

    /**
     * Execution sessions.
     */
    private readonly sessions =
        new ExecutionSessionManager();

    /**
     * Dashboard status.
     */
    public status() {

        return this.dashboard.getStatus();

    }

    /**
     * Runtime state.
     */
    public runtimeState() {

        return this.runtime.getState();

    }

    /**
     * Registered subsystems.
     */
    public subsystemStatus() {

        return this.subsystems.list();

    }

    /**
     * Execution sessions.
     */
    public executionSessions() {

        return this.sessions.list();

    }

    /**
     * Start runtime.
     */
    public start(): void {

        this.runtime.start();

    }

    /**
     * Pause runtime.
     */
    public pause(): void {

        this.runtime.pause();

    }

    /**
     * Resume runtime.
     */
    public resume(): void {

        this.runtime.resume();

    }

    /**
     * Stop runtime.
     */
    public stop(): void {

        this.runtime.stop();

    }

}
