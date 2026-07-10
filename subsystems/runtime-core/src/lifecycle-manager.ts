/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Runtime Core
 * Module    : Lifecycle Manager
 *
 * Build     : BUILD-000187
 * Version   : 1.0.0
 * ==========================================================
 */

export enum RuntimeState {

    Created = "created",

    Initializing = "initializing",

    Ready = "ready",

    Running = "running",

    Paused = "paused",

    Stopping = "stopping",

    Stopped = "stopped",

    Failed = "failed"

}

export class LifecycleManager {

    private state: RuntimeState =
        RuntimeState.Created;

    /**
     * Get current runtime state.
     */
    public getState(): RuntimeState {

        return this.state;

    }

    /**
     * Update runtime state.
     */
    public transitionTo(
        state: RuntimeState
    ): void {

        this.state = state;

    }

    /**
     * Check whether runtime is running.
     */
    public isRunning(): boolean {

        return this.state === RuntimeState.Running;

    }

    /**
     * Check whether runtime is ready.
     */
    public isReady(): boolean {

        return this.state === RuntimeState.Ready;

    }

    /**
     * Reset lifecycle.
     */
    public reset(): void {

        this.state = RuntimeState.Created;

    }

}
