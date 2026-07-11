/**
 * SKOS Runtime Kernel
 * BUILD-000195
 */

export enum RuntimeState {

    Created,

    Initializing,

    Running,

    Stopping,

    Stopped

}

export class RuntimeKernel {

    private state =
        RuntimeState.Created;

    public initialize(): void {

        this.state =
            RuntimeState.Initializing;

    }

    public start(): void {

        this.state =
            RuntimeState.Running;

    }

    public stop(): void {

        this.state =
            RuntimeState.Stopping;

        this.state =
            RuntimeState.Stopped;

    }

    public getState(): RuntimeState {

        return this.state;

    }

}
