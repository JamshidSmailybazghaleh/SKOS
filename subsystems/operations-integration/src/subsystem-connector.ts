/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Integration
 * Module    : Subsystem Connector
 *
 * Build     : BUILD-000163
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {

    IntegrationHealth,
    IntegrationState,
    IntegrationStatus

} from "./integration-status";

import {

    SubsystemInfo

} from "./subsystem-info";

/**
 * Generic connector contract.
 */
export interface Connector {

    connect(): void;

    disconnect(): void;

    synchronize(): void;

    heartbeat(): void;

    state(): IntegrationState;

}

/**
 * Base subsystem connector.
 */
export class SubsystemConnector implements Connector {

    private readonly runtime: IntegrationState;

    constructor(

        private readonly subsystem: SubsystemInfo

    ) {

        this.runtime = {

            subsystemId:

                subsystem.id,

            status:

                IntegrationStatus.Initializing,

            health:

                IntegrationHealth.Healthy,

            lastSynchronization:

                null,

            lastHeartbeat:

                null,

            synchronizationCount:

                0,

            errorCount:

                0

        };

    }

    /**
     * Connect subsystem.
     */
    public connect(): void {

        this.runtime.status =

            IntegrationStatus.Connected;

        this.runtime.lastHeartbeat =

            Date.now();

    }

    /**
     * Disconnect subsystem.
     */
    public disconnect(): void {

        this.runtime.status =

            IntegrationStatus.Disconnected;

    }

    /**
     * Synchronize subsystem.
     */
    public synchronize(): void {

        this.runtime.status =

            IntegrationStatus.Synchronizing;

        this.runtime.lastSynchronization =

            Date.now();

        this.runtime.synchronizationCount++;

        this.runtime.status =

            IntegrationStatus.Connected;

    }

    /**
     * Update heartbeat.
     */
    public heartbeat(): void {

        this.runtime.lastHeartbeat =

            Date.now();

    }

    /**
     * Report connector state.
     */
    public state(): IntegrationState {

        return {

            ...this.runtime

        };

    }

    /**
     * Retrieve subsystem metadata.
     */
    public info(): SubsystemInfo {

        return {

            ...this.subsystem

        };

    }

    /**
     * Register connector error.
     */
    public registerError(): void {

        this.runtime.errorCount++;

        this.runtime.status =

            IntegrationStatus.Error;

        this.runtime.health =

            IntegrationHealth.Warning;

    }

    /**
     * Restore connector.
     */
    public recover(): void {

        this.runtime.status =

            IntegrationStatus.Connected;

        this.runtime.health =

            IntegrationHealth.Healthy;

    }

}
