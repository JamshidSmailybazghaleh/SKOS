/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Integration
 * Module    : Integration Status
 *
 * Build     : BUILD-000163
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Integration lifecycle status.
 */
export enum IntegrationStatus {

    /**
     * Connector has not been initialized.
     */
    Unknown = "unknown",

    /**
     * Connector is initializing.
     */
    Initializing = "initializing",

    /**
     * Connector is connecting.
     */
    Connecting = "connecting",

    /**
     * Connector is connected.
     */
    Connected = "connected",

    /**
     * Connector is synchronizing.
     */
    Synchronizing = "synchronizing",

    /**
     * Connector is temporarily disconnected.
     */
    Disconnected = "disconnected",

    /**
     * Connector is paused.
     */
    Paused = "paused",

    /**
     * Connector has failed.
     */
    Error = "error"

}

/**
 * Health level of a subsystem.
 */
export enum IntegrationHealth {

    Excellent = "excellent",

    Healthy = "healthy",

    Warning = "warning",

    Critical = "critical",

    Offline = "offline"

}

/**
 * Runtime state of an integrated subsystem.
 */
export interface IntegrationState {

    /**
     * Subsystem identifier.
     */
    subsystemId: string;

    /**
     * Current integration status.
     */
    status: IntegrationStatus;

    /**
     * Current health level.
     */
    health: IntegrationHealth;

    /**
     * Last synchronization timestamp.
     */
    lastSynchronization: number | null;

    /**
     * Last successful communication.
     */
    lastHeartbeat: number | null;

    /**
     * Total synchronization count.
     */
    synchronizationCount: number;

    /**
     * Total communication errors.
     */
    errorCount: number;

}
