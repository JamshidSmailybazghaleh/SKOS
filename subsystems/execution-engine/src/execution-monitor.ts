/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Execution Engine
 * Module    : Execution Monitor
 *
 * Build     : BUILD-000084
 * Sprint    : Sprint 10
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

import {

    ExecutionState,
    StateEntry

} from "./state-manager";

export interface ExecutionSnapshot {

    timestamp: Date;

    total: number;

    pending: number;

    running: number;

    completed: number;

    failed: number;

    cancelled: number;

}

export class ExecutionMonitor {

    /**
     * Build runtime execution snapshot.
     */
    public snapshot(

        states: StateEntry[]

    ): ExecutionSnapshot {

        const count = (

            state: ExecutionState

        ) =>

            states.filter(

                s => s.state === state

            ).length;

        return {

            timestamp: new Date(),

            total: states.length,

            pending: count("PENDING"),

            running: count("RUNNING"),

            completed: count("COMPLETED"),

            failed: count("FAILED"),

            cancelled: count("CANCELLED")

        };

    }

}
