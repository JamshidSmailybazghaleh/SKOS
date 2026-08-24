/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Engine Orchestrator
 * File      : engine-orchestrator.js
 *
 * Build     : BUILD-000502.45.216
 * Version   : 1.1.0
 *
 * Mission:
 * Coordinate execution order, dependencies and lifecycle
 * of all SKOS engines while integrating with the canonical
 * Monitoring Engine.
 *
 * Monitoring Contract:
 *
 * EngineOrchestrator does NOT create its own MonitoringEngine.
 *
 * Canonical Monitoring is injected externally through:
 *
 *     setMonitoring(monitoring)
 *
 * Expected architecture:
 *
 *     SKOSAlphaRuntime
 *          │
 *          ├── BootstrapRuntime
 *          │      └── MonitoringEngine
 *          │
 *          └── EngineOrchestrator
 *                   │
 *                   └── injected canonical monitoring
 *
 * Therefore:
 *
 *     BootstrapRuntime.monitoring
 *              ===
 *     EngineOrchestrator.monitoring
 *
 * ==========================================================
 */

class EngineOrchestrator {

    constructor(options = {}) {

        this.name =
            "Engine Orchestrator";

        this.version =
            "1.1.0";

        this.status =
            "CREATED";

        /*
         * ==================================================
         * ENGINE REGISTRY
         * ==================================================
         */

        this.engines =
            new Map();

        /*
         * ==================================================
         * DEPENDENCY GRAPH
         * ==================================================
         */

        this.dependencies =
            new Map();

        /*
         * ==================================================
         * EXECUTION ORDER
         * ==================================================
         */

        this.executionOrder =
            [];

        /*
         * ==================================================
         * ORCHESTRATOR INTERNAL EVENTS
         * ==================================================
         */

        this.events =
            [];

        /*
         * ==================================================
         * CANONICAL MONITORING
         *
         * IMPORTANT:
         *
         * No MonitoringEngine is instantiated here.
         *
         * Monitoring must be injected by the canonical
         * runtime.
         * ==================================================
         */

        this.monitoring =
            options.monitoring || null;

        this.options =
            options;

    }


    /**
     * ======================================================
     * INITIALIZE
     * ======================================================
     */

    initialize() {

        this.status =
            "INITIALIZED";

        this.emit(
            "ORCHESTRATOR_INITIALIZED"
        );

        return true;

    }


    /**
     * ======================================================
     * SET MONITORING
     *
     * Inject the canonical MonitoringEngine.
     * ======================================================
     */

    setMonitoring(
        monitoring
    ) {

        if (!monitoring) {

            throw new Error(
                "Monitoring instance required."
            );

        }

        /*
         * Validate minimum monitoring contract.
         */

        const requiredMethods = [
            "registerComponent",
            "updateHealth",
            "recordEvent"
        ];

        for (
            const method
            of requiredMethods
        ) {

            if (
                typeof monitoring[method]
                !== "function"
            ) {

                throw new Error(
                    `Invalid monitoring contract: missing ${method}().`
                );

            }

        }

        this.monitoring =
            monitoring;

        this.emit(
            "MONITORING_ATTACHED"
        );

        return true;

    }


    /**
     * ======================================================
     * REGISTER ENGINE
     * ======================================================
     */

    registerEngine(
        engineId,
        engine
    ) {

        if (!engineId) {

            throw new Error(
                "Engine id required."
            );

        }

        if (!engine) {

            throw new Error(
                "Engine instance required."
            );

        }

        /*
         * Register engine.
         */

        this.engines.set(
            engineId,
            engine
        );

        /*
         * Ensure dependency bucket exists.
         */

        if (
            !this.dependencies.has(
                engineId
            )
        ) {

            this.dependencies.set(
                engineId,
                []
            );

        }

        /*
         * ==================================================
         * CANONICAL MONITORING REGISTRATION
         * ==================================================
         */

        if (
            this.monitoring &&
            typeof this.monitoring.registerComponent
                === "function"
        ) {

            this.monitoring.registerComponent(
                engineId,
                {
                    name:
                        engine.name ||
                        engineId,

                    version:
                        engine.version ||
                        "1.0.0"
                }
            );

        }

        /*
         * Internal event.
         */

        this.emit(
            "ENGINE_REGISTERED",
            {
                engineId
            }
        );

        /*
         * Monitoring event.
         */

        this.recordMonitoringEvent(
            "ENGINE_REGISTERED",
            {
                engineId
            }
        );

        return true;

    }


    /**
     * ======================================================
     * ADD DEPENDENCY
     * ======================================================
     */

    addDependency(
        engineId,
        dependencyId
    ) {

        if (!this.engines.has(engineId)) {

            throw new Error(
                `Engine not registered: ${engineId}`
            );

        }

        if (!this.engines.has(dependencyId)) {

            throw new Error(
                `Dependency engine not registered: ${dependencyId}`
            );

        }

        if (
            !this.dependencies.has(
                engineId
            )
        ) {

            this.dependencies.set(
                engineId,
                []
            );

        }

        const dependencies =
            this.dependencies.get(
                engineId
            );

        /*
         * Prevent duplicate dependencies.
         */

        if (
            !dependencies.includes(
                dependencyId
            )
        ) {

            dependencies.push(
                dependencyId
            );

        }

        this.emit(
            "ENGINE_DEPENDENCY_ADDED",
            {
                engineId,
                dependencyId
            }
        );

        return true;

    }


    /**
     * ======================================================
     * BUILD EXECUTION ORDER
     * ======================================================
     */

    buildExecutionOrder() {

        this.executionOrder =
            [];

        const visited =
            new Set();

        const visiting =
            new Set();

        const visit =
            (engineId) => {

                if (
                    visited.has(
                        engineId
                    )
                ) {

                    return;

                }

                /*
                 * Detect circular dependencies.
                 */

                if (
                    visiting.has(
                        engineId
                    )
                ) {

                    throw new Error(
                        `Circular engine dependency detected: ${engineId}`
                    );

                }

                visiting.add(
                    engineId
                );

                const deps =
                    this.dependencies.get(
                        engineId
                    ) || [];

                for (
                    const dependencyId
                    of deps
                ) {

                    visit(
                        dependencyId
                    );

                }

                visiting.delete(
                    engineId
                );

                visited.add(
                    engineId
                );

                this.executionOrder.push(
                    engineId
                );

            };


        for (
            const engineId
            of this.engines.keys()
        ) {

            visit(
                engineId
            );

        }

        this.emit(
            "EXECUTION_ORDER_BUILT",
            {
                executionOrder:
                    [...this.executionOrder]
            }
        );

        return this.executionOrder;

    }


    /**
     * ======================================================
     * START ALL ENGINES
     * ======================================================
     */

    startAll() {

        if (
            this.executionOrder.length === 0
        ) {

            this.buildExecutionOrder();

        }

        for (
            const engineId
            of this.executionOrder
        ) {

            const engine =
                this.engines.get(
                    engineId
                );

            if (!engine) {

                continue;

            }

            try {

                /*
                 * Initialize engine.
                 */

                if (
                    typeof engine.initialize
                        === "function"
                ) {

                    engine.initialize();

                }

                /*
                 * Internal lifecycle event.
                 */

                this.emit(
                    "ENGINE_STARTED",
                    {
                        engineId
                    }
                );

                /*
                 * Canonical monitoring health.
                 */

                this.updateMonitoringHealth(
                    engineId,
                    "HEALTHY"
                );

                /*
                 * Canonical monitoring event.
                 */

                this.recordMonitoringEvent(
                    "ENGINE_STARTED",
                    {
                        engineId
                    }
                );

            } catch (error) {

                /*
                 * Record failure internally.
                 */

                this.emit(
                    "ENGINE_START_FAILED",
                    {
                        engineId,
                        error:
                            error.message
                    }
                );

                /*
                 * Record failure in canonical
                 * monitoring.
                 */

                this.updateMonitoringHealth(
                    engineId,
                    "FAILED"
                );

                this.recordMonitoringEvent(
                    "ENGINE_START_FAILED",
                    {
                        engineId,
                        error:
                            error.message
                    }
                );

                throw error;

            }

        }

        this.status =
            "RUNNING";

        this.recordMonitoringEvent(
            "ENGINE_ORCHESTRATION_STARTED",
            {
                executionOrder:
                    [...this.executionOrder]
            }
        );

        return true;

    }


    /**
     * ======================================================
     * RECOVER ENGINE
     * ======================================================
     *
     * Reconcile FSP-006 recovery capability with the
     * canonical Remote Monitoring Contract.
     */

    recoverEngine(
        engineId
    ) {

        const engine =
            this.engines.get(
                engineId
            );

        if (!engine) {

            throw new Error(
                `Engine not found: ${engineId}`
            );

        }

        if (
            typeof engine.initialize
                !== "function"
        ) {

            throw new Error(
                `Engine cannot be recovered: ${engineId}`
            );

        }

        try {

            engine.initialize();

            /*
             * Canonical monitoring health.
             */

            this.updateMonitoringHealth(
                engineId,
                "HEALTHY"
            );

            /*
             * Internal lifecycle event.
             */

            this.emit(
                "ENGINE_RECOVERED",
                {
                    engineId
                }
            );

            /*
             * Canonical monitoring event.
             */

            this.recordMonitoringEvent(
                "ENGINE_RECOVERED",
                {
                    engineId
                }
            );

            return true;

        } catch (error) {

            /*
             * Recovery failure must remain visible
             * through the canonical monitoring contract.
             */

            this.updateMonitoringHealth(
                engineId,
                "FAILED"
            );

            this.emit(
                "ENGINE_RECOVERY_FAILED",
                {
                    engineId,
                    error:
                        error &&
                        error.message
                            ? error.message
                            : String(error)
                }
            );

            this.recordMonitoringEvent(
                "ENGINE_RECOVERY_FAILED",
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


    /**
     * ======================================================
     * SHUTDOWN ALL ENGINES
     * ======================================================
     */

    shutdownAll() {

        const reversed =
            [
                ...this.executionOrder
            ].reverse();

        for (
            const engineId
            of reversed
        ) {

            const engine =
                this.engines.get(
                    engineId
                );

            if (!engine) {

                continue;

            }

            try {

                if (
                    typeof engine.shutdown
                        === "function"
                ) {

                    engine.shutdown();

                }

                this.emit(
                    "ENGINE_STOPPED",
                    {
                        engineId
                    }
                );

                /*
                 * Canonical monitoring health.
                 */

                this.updateMonitoringHealth(
                    engineId,
                    "OFFLINE"
                );

                this.recordMonitoringEvent(
                    "ENGINE_STOPPED",
                    {
                        engineId
                    }
                );

            } catch (error) {

                this.emit(
                    "ENGINE_STOP_FAILED",
                    {
                        engineId,
                        error:
                            error.message
                    }
                );

                this.updateMonitoringHealth(
                    engineId,
                    "FAILED"
                );

                this.recordMonitoringEvent(
                    "ENGINE_STOP_FAILED",
                    {
                        engineId,
                        error:
                            error.message
                    }
                );

                throw error;

            }

        }

        this.status =
            "SHUTDOWN";

        this.recordMonitoringEvent(
            "ENGINE_ORCHESTRATION_SHUTDOWN"
        );

        return true;

    }


    /**
     * ======================================================
     * MONITORING HEALTH HELPER
     * ======================================================
     */

    updateMonitoringHealth(
        componentId,
        state
    ) {

        if (
            !this.monitoring ||
            typeof this.monitoring.updateHealth
                !== "function"
        ) {

            return false;

        }

        this.monitoring.updateHealth(
            componentId,
            state
        );

        return true;

    }


    /**
     * ======================================================
     * MONITORING EVENT HELPER
     * ======================================================
     */

    recordMonitoringEvent(
        event,
        metadata = {}
    ) {

        if (
            !this.monitoring ||
            typeof this.monitoring.recordEvent
                !== "function"
        ) {

            return false;

        }

        this.monitoring.recordEvent(
            event,
            metadata
        );

        return true;

    }


    /**
     * ======================================================
     * EXECUTION ORDER
     * ======================================================
     */

    getExecutionOrder() {

        return this.executionOrder;

    }


    /**
     * ======================================================
     * INTERNAL EVENT EMITTER
     * ======================================================
     */

    emit(
        event,
        data = {}
    ) {

        const record = {

            event,

            data,

            timestamp:
                new Date()

        };

        this.events.push(
            record
        );

        return record;

    }


    /**
     * ======================================================
     * INTERNAL EVENTS
     * ======================================================
     */

    getEvents() {

        return this.events;

    }


    /**
     * ======================================================
     * STATUS
     * ======================================================
     */

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
                this.executionOrder,

            monitoringAttached:
                !!this.monitoring

        };

    }

}


/**
 * ==========================================================
 * EXPORT
 * ==========================================================
 */

module.exports =
    EngineOrchestrator;
