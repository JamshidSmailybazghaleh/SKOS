/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Subsystem : Operations Dashboard
 * Module    : Runtime Controller
 *
 * Build     : BUILD-000175
 * Sprint    : Runtime Readiness
 * Version   : 0.1.0
 *
 * Status    : Foundation
 * ==========================================================
 */

/**
 * Runtime state.
 */
export enum RuntimeState {

    Stopped = "stopped",

    Starting = "starting",

    Running = "running",

    Paused = "paused",

    Stopping = "stopping",

    Error = "error"

}

/**
 * Runtime Controller.
 */
export class RuntimeController {

    private state: RuntimeState =
        RuntimeState.Stopped;

    /**
     * Return current runtime state.
     */
    public getState(): RuntimeState {

        return this.state;

    }

    /**
     * Start runtime.
     */
    public start(): void {

        if (this.state === RuntimeState.Stopped) {

            this.state = RuntimeState.Starting;

            /**
             * Future startup pipeline.
             */

            this.state = RuntimeState.Running;

        }

    }

    /**
     * Pause runtime.
     */
    public pause(): void {

        if (this.state === RuntimeState.Running) {

            this.state = RuntimeState.Paused;

        }

    }

    /**
     * Resume runtime.
     */
    public resume(): void {

        if (this.state === RuntimeState.Paused) {

            this.state = RuntimeState.Running;

        }

    }

    /**
     * Stop runtime.
     */
    public stop(): void {

        if (
            this.state === RuntimeState.Running ||
            this.state === RuntimeState.Paused
        ) {

            this.state = RuntimeState.Stopping;

            /**
             * Future shutdown pipeline.
             */

            this.state = RuntimeState.Stopped;

        }

    }

    /**
     * Restart runtime.
     */
    public restart(): void {

        this.stop();

        this.start();

    }

}
