/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Integration
 * Module    : Operations Integration
 *
 * Build     : BUILD-000163
 * Sprint    : Phase 3
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

import {
    SubsystemConnector
} from "./subsystem-connector";

import {
    SynchronizationReport,
    SynchronizationReportBuilder
} from "./synchronization-report";

import {
    IntegrationStatus,
    IntegrationHealth
} from "./integration-status";

/**
 * Operations Integration Manager
 */
export class OperationsIntegration {

    /**
     * Registered connectors.
     */
    private readonly connectors =
        new Map<string, SubsystemConnector>();

    /**
     * Synchronization report.
     */
    private readonly reportBuilder =
        new SynchronizationReportBuilder();

    /**
     * Register connector.
     */
    public register(

        connector: SubsystemConnector

    ): void {

        const id =

            connector.info().id;

        this.connectors.set(

            id,

            connector

        );

    }

    /**
     * Retrieve connector.
     */
    public get(

        id: string

    ): SubsystemConnector | undefined {

        return this.connectors.get(id);

    }

    /**
     * Retrieve all connectors.
     */
    public getAll(): SubsystemConnector[] {

        return Array.from(

            this.connectors.values()

        );

    }

    /**
     * Connect every subsystem.
     */
    public connectAll(): void {

        this.getAll().forEach(

            connector =>

                connector.connect()

        );

    }

    /**
     * Synchronize every subsystem.
     */
    public synchronizeAll(): void {

        this.getAll().forEach(

            connector =>

                connector.synchronize()

        );

        this.updateReport();

    }

    /**
     * Send heartbeat.
     */
    public heartbeat(): void {

        this.getAll().forEach(

            connector =>

                connector.heartbeat()

        );

    }

    /**
     * Disconnect every subsystem.
     */
    public disconnectAll(): void {

        this.getAll().forEach(

            connector =>

                connector.disconnect()

        );

    }

    /**
     * Generate synchronization report.
     */
    public report(): SynchronizationReport {

        return this.reportBuilder.getReport();

    }

    /**
     * Update synchronization report.
     */
    private updateReport(): void {

        const states =

            this.getAll()

                .map(

                    connector =>

                        connector.state()

                );

        const connected =

            states.filter(

                state =>

                    state.status ===

                    IntegrationStatus.Connected

            ).length;

        const synchronizing =

            states.filter(

                state =>

                    state.status ===

                    IntegrationStatus.Synchronizing

            ).length;

        const disconnected =

            states.filter(

                state =>

                    state.status ===

                    IntegrationStatus.Disconnected

            ).length;

        const failed =

            states.filter(

                state =>

                    state.status ===

                    IntegrationStatus.Error

            ).length;

        this.reportBuilder.update({

            totalSubsystems:

                states.length,

            connectedSubsystems:

                connected,

            synchronizingSubsystems:

                synchronizing,

            disconnectedSubsystems:

                disconnected,

            failedSubsystems:

                failed,

            health:

                failed > 0

                    ? IntegrationHealth.Warning

                    : IntegrationHealth.Healthy

        });

        this.reportBuilder.complete();

    }

}
