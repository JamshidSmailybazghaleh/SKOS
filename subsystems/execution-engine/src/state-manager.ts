/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Execution Engine
 * Module    : State Manager
 *
 * Build     : BUILD-000083
 * Sprint    : Sprint 10
 * Version   : 0.0.1
 *
 * Status    : Foundation
 * ==========================================================
 */

export type ExecutionState =

    | "PENDING"
    | "RUNNING"
    | "COMPLETED"
    | "FAILED"
    | "CANCELLED";

export interface StateEntry {

    id: string;

    state: ExecutionState;

    updatedAt: Date;

}

export class StateManager {

    private readonly states =
        new Map<string, StateEntry>();

    /**
     * Create or update state.
     */
    public setState(

        id: string,

        state: ExecutionState

    ): void {

        this.states.set(id, {

            id,

            state,

            updatedAt: new Date()

        });

    }

    /**
     * Retrieve state.
     */
    public getState(

        id: string

    ): StateEntry | undefined {

        return this.states.get(id);

    }

    /**
     * Check whether an entry exists.
     */
    public hasState(

        id: string

    ): boolean {

        return this.states.has(id);

    }

    /**
     * Remove state.
     */
    public removeState(

        id: string

    ): boolean {

        return this.states.delete(id);

    }

    /**
     * Return all runtime states.
     */
    public getAllStates(): StateEntry[] {

        return Array.from(

            this.states.values()

        );

    }

}
