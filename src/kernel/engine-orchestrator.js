/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Engine Orchestrator
 * File      : engine-orchestrator.js
 *
 * Build     : BUILD-000447
 * Version   : 1.0.0
 *
 * Mission:
 * Coordinate execution order, dependencies and lifecycle
 * of all SKOS engines.
 * ==========================================================
 */

class EngineOrchestrator {

    constructor(options = {}) {

        this.name = "Engine Orchestrator";
        this.version = "1.0.0";
        this.status = "CREATED";

        this.engines = new Map();
        this.dependencies = new Map();
        this.executionOrder = [];
        this.events = [];

        this.options = options;
        this.monitoring =
            options.monitoring || null;
    }


    initialize() {

        this.status = "INITIALIZED";

        this.emit(
            "ORCHESTRATOR_INITIALIZED"
        );

        return true;
    }


    registerEngine(
        engineId,
        engine
    ) {

        if (!engineId) {

            throw new Error(
                "Engine id required."
            );

        }

        this.engines.set(
            engineId,
            engine
        );

        if (
            this.monitoring &&
            typeof this.monitoring.registerComponent === "function"
        ) {
            this.monitoring.registerComponent(
                engineId,
                {
                    name: engineId
                }
            );
        }

        if (!this.dependencies.has(engineId)) {

            this.dependencies.set(
                engineId,
                []
            );

        }

        return true;
    }


    addDependency(
        engineId,
        dependencyId
    ) {

        if (!this.dependencies.has(engineId)) {

            this.dependencies.set(
                engineId,
                []
            );

        }

        this.dependencies
            .get(engineId)
            .push(dependencyId);

        return true;
    }


    buildExecutionOrder() {

        this.executionOrder = [];

        const visited = new Set();

        const visit = (engineId) => {

            if (visited.has(engineId))
                return;

            visited.add(engineId);

            const deps =
                this.dependencies.get(engineId) || [];

            for (const dep of deps) {

                visit(dep);

            }

            this.executionOrder.push(engineId);

        };

        for (const engineId of this.engines.keys()) {

            visit(engineId);

        }

        return this.executionOrder;
    }


    startAll() {

        if (this.executionOrder.length === 0) {
            this.buildExecutionOrder();
        }

        for (const engineId of this.executionOrder) {

            const engine =
                this.engines.get(engineId);

            if (
                engine &&
                typeof engine.initialize === "function"
            ) {

                try {

                    engine.initialize();

                    if (
                        this.monitoring &&
                        typeof this.monitoring.updateHealth === "function"
                    ) {
                        this.monitoring.updateHealth(
                            engineId,
                            "HEALTHY"
                        );
                    }

                    this.emit(
                        "ENGINE_STARTED",
                        {
                            engineId
                        }
                    );

                } catch (error) {

                    if (
                        this.monitoring &&
                        typeof this.monitoring.updateHealth === "function"
                    ) {
                        this.monitoring.updateHealth(
                            engineId,
                            "FAILED"
                        );
                    }

                    this.emit(
                        "ENGINE_FAILED",
                        {
                            engineId,
                            error:
                                error &&
                                error.message
                                    ? error.message
                                    : String(error)
                        }
                    );

                    throw error;
                }
            }
        }

        this.status = "RUNNING";

        return true;
    }

    recoverEngine(engineId) {

        const engine =
            this.engines.get(engineId);

        if (!engine) {
            throw new Error(
                `Engine not found: ${engineId}`
            );
        }

        if (
            typeof engine.initialize !== "function"
        ) {
            throw new Error(
                `Engine cannot be recovered: ${engineId}`
            );
        }

        try {

            engine.initialize();

            if (
                this.monitoring &&
                typeof this.monitoring.updateHealth === "function"
            ) {
                this.monitoring.updateHealth(
                    engineId,
                    "HEALTHY"
                );
            }

            this.emit(
                "ENGINE_RECOVERED",
                {
                    engineId
                }
            );

            return true;

        } catch (error) {

            if (
                this.monitoring &&
                typeof this.monitoring.updateHealth === "function"
            ) {
                this.monitoring.updateHealth(
                    engineId,
                    "FAILED"
                );
            }

            this.emit(
                "ENGINE_RECOVERY_FAILED",
                {
                    engineId,
                    error:
                        error && error.message
                            ? error.message
                            : String(error)
                }
            );

            throw error;
        }
    }

    shutdownAll() {

        const reversed =
            [...this.executionOrder].reverse();

        for (const engineId of reversed) {

            const engine =
                this.engines.get(engineId);

            if (
                engine &&
                typeof engine.shutdown === "function"
            ) {

                engine.shutdown();

                this.emit(
                    "ENGINE_STOPPED",
                    {
                        engineId
                    }
                );

            }

        }

        this.status = "SHUTDOWN";

        return true;
    }


    getExecutionOrder() {

        return this.executionOrder;

    }


    emit(
        event,
        data = {}
    ) {

        const record = {
            event,
            data,
            timestamp: new Date()
        };

        this.events.push(record);

        if (
            this.monitoring &&
            typeof this.monitoring.recordEvent === "function"
        ) {
            this.monitoring.recordEvent(
                event,
                data
            );
        }

    }


    getEvents() {

        return this.events;

    }


    getStatus() {

        return {

            name:
                this.name,

            version:
                this.version,

            status:
                this.status,

            registeredEngines:
                this.engines.size,

            executionOrder:
                this.executionOrder

        };

    }

}

module.exports =
    EngineOrchestrator;
