/**
 * ============================================================
 * SKOS - Smaily Knowledge Operating System
 * PRIMARY RUNTIME KERNEL
 * ------------------------------------------------------------
 * File      : skos-kernel.js
 * Operation : OP-020
 * Build     : BUILD-000423
 * Version   : 2.0.0
 * Status    : ACTIVE
 * Authority : PRIMARY RUNTIME AUTHORITY
 * ============================================================
 *
 * Mission:
 *   Provide the single authoritative runtime lifecycle for
 *   SKOS Mission Control.
 *
 * Responsibilities:
 *   - Runtime Boot
 *   - Runtime Initialization
 *   - Registry Loading
 *   - Module Loading
 *   - Status Loading
 *   - Service / Engine coordination
 *   - Health state
 *   - Diagnostics hooks
 *   - SDKC connection
 *   - Runtime shutdown
 *   - Idempotent lifecycle control
 *
 * IMPORTANT:
 *   No other browser component may independently boot SKOS.
 *
 * ============================================================
 */

class SKOSKernel {

    constructor(config = {}) {

        this.name = "SKOSKernel";
        this.version = "2.0.0";
        this.build = "BUILD-000423";

        this.config = config;

        this.status = "CREATED";

        this.initialized = false;
        this.running = false;

        this.bootState = "IDLE";

        this.bootTime = null;
        this.shutdownTime = null;

        this.engines = new Map();
        this.services = new Map();

        this.modules = [];

        this.events = [];

        this.statistics = {
            bootAttempts: 0,
            successfulBoots: 0,
            failedBoots: 0,
            shutdowns: 0,
            modulesLoaded: 0,
            servicesRegistered: 0,
            enginesRegistered: 0,
            healthChecks: 0
        };

        this.context = {
            registryReady: false,
            modulesReady: false,
            servicesReady: false,
            enginesReady: false,
            healthReady: false,
            sdkcConnected: false
        };
    }


    /**
     * --------------------------------------------------------
     * INITIALIZE
     * --------------------------------------------------------
     */

    async initialize() {

        if (this.initialized) {
            return true;
        }

        this.status = "INITIALIZING";
        this.bootState = "INITIALIZING";

        this.emit(
            "KERNEL_INITIALIZING",
            {
                build: this.build
            }
        );

        this.initialized = true;
        this.status = "INITIALIZED";

        this.emit(
            "KERNEL_INITIALIZED",
            {
                build: this.build
            }
        );

        return true;
    }


    /**
     * --------------------------------------------------------
     * BOOT
     * --------------------------------------------------------
     */

    async boot() {

        /*
         * Idempotency:
         * A second boot request must never create a second
         * runtime instance or repeat the boot chain.
         */

        if (this.running) {
            return this.getStatus();
        }

        this.statistics.bootAttempts++;

        try {

            await this.initialize();

            this.bootState = "BOOTING";
            this.status = "BOOTING";

            this.bootTime = new Date();

            this.emit(
                "KERNEL_BOOT_STARTED",
                {
                    build: this.build
                }
            );


            /*
             * ------------------------------------------------
             * PHASE 1 — REGISTRY
             * ------------------------------------------------
             */

            await this.loadRegistry();


            /*
             * ------------------------------------------------
             * PHASE 2 — MODULES
             * ------------------------------------------------
             */

            await this.loadModules();


            /*
             * ------------------------------------------------
             * PHASE 3 — STATUS
             * ------------------------------------------------
             */

            await this.loadStatus();


            /*
             * ------------------------------------------------
             * PHASE 4 — SERVICES
             * ------------------------------------------------
             */

            await this.initializeServices();


            /*
             * ------------------------------------------------
             * PHASE 5 — ENGINES
             * ------------------------------------------------
             */

            await this.initializeEngines();


            /*
             * ------------------------------------------------
             * PHASE 6 — HEALTH
             * ------------------------------------------------
             */

            await this.healthCheck();


            /*
             * ------------------------------------------------
             * FINALIZE
             * ------------------------------------------------
             */

            this.running = true;

            this.status = "RUNNING";
            this.bootState = "READY";

            this.statistics.successfulBoots++;

            this.emit(
                "KERNEL_BOOT_COMPLETED",
                this.getStatus()
            );

            this.updateRuntimeState(
                "kernel",
                "READY"
            );

            this.updateRuntimeState(
                "system",
                "OPERATIONAL"
            );

            return this.getStatus();

        }
        catch (error) {

            this.running = false;

            this.status = "FAILED";
            this.bootState = "FAILED";

            this.statistics.failedBoots++;

            this.updateRuntimeState(
                "kernel",
                "FAILED"
            );

            this.updateRuntimeState(
                "system",
                "FAILED"
            );

            this.emit(
                "KERNEL_BOOT_FAILED",
                {
                    message: error.message
                }
            );

            if (
                typeof Logger !== "undefined" &&
                Logger.error
            ) {
                Logger.error(
                    "SKOS Kernel Boot Failed:",
                    error
                );
            }

            throw error;
        }
    }


    /**
     * --------------------------------------------------------
     * REGISTRY
     * --------------------------------------------------------
     */

    async loadRegistry() {

        if (this.context.registryReady) {
            return true;
        }

        this.updateRuntimeState(
            "registry",
            "INITIALIZING"
        );

        if (
            typeof Registry !== "undefined" &&
            typeof Registry.load === "function"
        ) {

            const result =
                await Registry.load();

            if (result === false) {
                throw new Error(
                    "Registry loading failed."
                );
            }
        }

        this.context.registryReady = true;

        this.updateRuntimeState(
            "registry",
            "READY"
        );

        this.emit(
            "REGISTRY_READY"
        );

        return true;
    }


    /**
     * --------------------------------------------------------
     * MODULES
     * --------------------------------------------------------
     */

    async loadModules() {

        if (this.context.modulesReady) {
            return true;
        }

        this.updateRuntimeState(
            "moduleLoader",
            "INITIALIZING"
        );

        let modules = [];

        if (
            typeof Registry !== "undefined" &&
            typeof Registry.getModules === "function"
        ) {

            modules =
                await Registry.getModules();

            if (!Array.isArray(modules)) {
                modules = [];
            }
        }

        for (const moduleDefinition of modules) {

            if (!moduleDefinition) {
                continue;
            }

            const moduleName =
                typeof moduleDefinition === "string"
                    ? moduleDefinition
                    : moduleDefinition.name;

            if (!moduleName) {
                continue;
            }

            if (
                this.modules.includes(moduleName)
            ) {
                continue;
            }

            if (
                typeof ModuleLoader !== "undefined" &&
                typeof ModuleLoader.loadModule === "function"
            ) {

                const loaded =
                    await ModuleLoader.loadModule(
                        moduleName
                    );

                if (loaded !== false) {

                    this.modules.push(
                        moduleName
                    );

                    this.statistics.modulesLoaded++;
                }
            }
        }

        this.context.modulesReady = true;

        this.updateRuntimeState(
            "moduleLoader",
            "READY"
        );

        this.emit(
            "MODULES_READY",
            {
                count: this.modules.length
            }
        );

        return true;
    }


    /**
     * --------------------------------------------------------
     * STATUS
     * --------------------------------------------------------
     */

    async loadStatus() {

        try {

            if (
                typeof fetch !== "function" ||
                typeof CONFIG === "undefined"
            ) {
                return true;
            }

            const response =
                await fetch(
                    CONFIG.paths.data +
                    CONFIG.files.status
                );

            if (!response.ok) {
                return true;
            }

            const status =
                await response.json();

            this.emit(
                "STATUS_LOADED",
                status
            );

        }
        catch (error) {

            /*
             * STATUS is informational.
             * Failure here must not destroy the Kernel.
             */

            if (
                typeof Logger !== "undefined" &&
                Logger.warn
            ) {
                Logger.warn(
                    "Runtime status loading skipped."
                );
            }
        }

        return true;
    }


    /**
     * --------------------------------------------------------
     * SERVICES
     * --------------------------------------------------------
     */

    async initializeServices() {

        if (this.context.servicesReady) {
            return true;
        }

        if (
            typeof ServiceManager !== "undefined"
        ) {

            if (
                typeof ServiceManager.initialize ===
                "function"
            ) {

                await ServiceManager.initialize();
            }

            if (
                typeof ServiceManager.list ===
                "function"
            ) {

                const services =
                    ServiceManager.list();

                if (Array.isArray(services)) {

                    for (const service of services) {

                        if (
                            service &&
                            service.name
                        ) {

                            this.services.set(
                                service.name,
                                service
                            );
                        }
                    }
                }
            }
        }

        this.statistics.servicesRegistered =
            this.services.size;

        this.context.servicesReady = true;

        this.updateRuntimeState(
            "services",
            "READY"
        );

        this.emit(
            "SERVICES_READY",
            {
                count: this.services.size
            }
        );

        return true;
    }


    /**
     * --------------------------------------------------------
     * ENGINES
     * --------------------------------------------------------
     */

    async initializeEngines() {

        if (this.context.enginesReady) {
            return true;
        }

        if (
            typeof EngineManager !== "undefined"
        ) {

            if (
                typeof EngineManager.initialize ===
                "function"
            ) {

                await EngineManager.initialize();
            }

            if (
                typeof EngineManager.list ===
                "function"
            ) {

                const engines =
                    EngineManager.list();

                if (Array.isArray(engines)) {

                    for (const engine of engines) {

                        if (
                            engine &&
                            engine.name
                        ) {

                            this.engines.set(
                                engine.name,
                                engine
                            );
                        }
                    }
                }
            }
        }

        this.statistics.enginesRegistered =
            this.engines.size;

        this.context.enginesReady = true;

        this.updateRuntimeState(
            "engines",
            "READY"
        );

        this.emit(
            "ENGINES_READY",
            {
                count: this.engines.size
            }
        );

        return true;
    }


    /**
     * --------------------------------------------------------
     * ENGINE REGISTRATION
     * --------------------------------------------------------
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

        this.engines.set(
            engineId,
            engine
        );

        this.statistics.enginesRegistered =
            this.engines.size;

        this.emit(
            "ENGINE_REGISTERED",
            {
                engineId
            }
        );

        return true;
    }


    /**
     * --------------------------------------------------------
     * SERVICE REGISTRATION
     * --------------------------------------------------------
     */

    registerService(
        serviceId,
        service
    ) {

        if (!serviceId) {
            throw new Error(
                "Service id required."
            );
        }

        this.services.set(
            serviceId,
            service
        );

        this.statistics.servicesRegistered =
            this.services.size;

        this.emit(
            "SERVICE_REGISTERED",
            {
                serviceId
            }
        );

        return true;
    }


    /**
     * --------------------------------------------------------
     * ENGINE ACCESS
     * --------------------------------------------------------
     */

    getEngine(engineId) {

        return (
            this.engines.get(engineId) ||
            null
        );
    }


    /**
     * --------------------------------------------------------
     * SERVICE ACCESS
     * --------------------------------------------------------
     */

    getService(serviceId) {

        return (
            this.services.get(serviceId) ||
            null
        );
    }


    /**
     * --------------------------------------------------------
     * HEALTH
     * --------------------------------------------------------
     */

    async healthCheck() {

        this.statistics.healthChecks++;

        this.context.healthReady = true;

        this.updateRuntimeState(
            "health",
            "READY"
        );

        const report = {

            kernel: this.name,

            version: this.version,

            build: this.build,

            status: this.status,

            bootState: this.bootState,

            initialized:
                this.initialized,

            running:
                this.running,

            modules:
                this.modules.length,

            services:
                this.services.size,

            engines:
                this.engines.size,

            context:
                {
                    ...this.context
                },

            statistics:
                {
                    ...this.statistics
                }
        };

        this.emit(
            "HEALTH_CHECK",
            report
        );

        return report;
    }


    /**
     * --------------------------------------------------------
     * RUNTIME STATUS
     * --------------------------------------------------------
     */

    getStatus() {

        return {

            name: this.name,

            version: this.version,

            build: this.build,

            status: this.status,

            bootState: this.bootState,

            initialized:
                this.initialized,

            running:
                this.running,

            bootTime:
                this.bootTime,

            shutdownTime:
                this.shutdownTime,

            modules:
                [...this.modules],

            services:
                this.services.size,

            engines:
                this.engines.size,

            context:
                {
                    ...this.context
                },

            statistics:
                {
                    ...this.statistics
                }
        };
    }


    /**
     * --------------------------------------------------------
     * EVENT
     * --------------------------------------------------------
     */

    emit(
        event,
        payload = {}
    ) {

        const record = {

            event,

            payload,

            timestamp:
                new Date().toISOString()
        };

        this.events.push(record);

        if (
            typeof EventBus !== "undefined" &&
            typeof EventBus.publish === "function"
        ) {

            try {

                EventBus.publish(
                    event,
                    record
                );

            }
            catch (error) {

                /*
                 * Event transport must never
                 * destroy the Kernel.
                 */
            }
        }

        return record;
    }


    /**
     * --------------------------------------------------------
     * RUNTIME STATE BRIDGE
     * --------------------------------------------------------
     */

    updateRuntimeState(
        engine,
        status
    ) {

        if (
            typeof RuntimeState !== "undefined" &&
            typeof RuntimeState.set === "function"
        ) {

            try {

                RuntimeState.set(
                    engine,
                    status
                );

            }
            catch (error) {

                /*
                 * RuntimeState is observational.
                 * Kernel remains authoritative.
                 */
            }
        }
    }


    /**
     * --------------------------------------------------------
     * SHUTDOWN
     * --------------------------------------------------------
     */

    async shutdown() {

        if (!this.running) {

            this.status = "STOPPED";
            this.bootState = "STOPPED";

            return true;
        }

        this.emit(
            "KERNEL_SHUTDOWN_STARTED"
        );

        /*
         * Engines
         */

        if (
            typeof EngineManager !== "undefined" &&
            typeof EngineManager.shutdown === "function"
        ) {

            await EngineManager.shutdown();
        }

        /*
         * Services
         */

        if (
            typeof ServiceManager !== "undefined" &&
            typeof ServiceManager.shutdown === "function"
        ) {

            await ServiceManager.shutdown();
        }

        this.running = false;

        this.status = "STOPPED";

        this.bootState = "STOPPED";

        this.shutdownTime = new Date();

        this.statistics.shutdowns++;

        this.updateRuntimeState(
            "kernel",
            "STOPPED"
        );

        this.updateRuntimeState(
            "system",
            "STOPPED"
        );

        this.emit(
            "KERNEL_SHUTDOWN_COMPLETED"
        );

        return true;
    }


    /**
     * --------------------------------------------------------
     * RESET
     * --------------------------------------------------------
     */

    reset() {

        this.initialized = false;

        this.running = false;

        this.status = "CREATED";

        this.bootState = "IDLE";

        this.bootTime = null;

        this.shutdownTime = null;

        this.modules = [];

        this.engines.clear();

        this.services.clear();

        this.events = [];

        this.context = {

            registryReady: false,

            modulesReady: false,

            servicesReady: false,

            enginesReady: false,

            healthReady: false,

            sdkcConnected: false
        };

        return true;
    }
}


/**
 * ============================================================
 * SINGLETON RUNTIME AUTHORITY
 * ============================================================
 *
 * There must be exactly one browser runtime kernel instance.
 * ============================================================
 */

let SKOSKernelRuntime;

if (typeof window !== "undefined") {

    if (window.SKOSKernelRuntime) {

        SKOSKernelRuntime =
            window.SKOSKernelRuntime;

    }
    else {

        SKOSKernelRuntime =
            new SKOSKernel(
                typeof CONFIG !== "undefined"
                    ? CONFIG
                    : {}
            );

        window.SKOSKernelRuntime =
            SKOSKernelRuntime;
    }
}


/**
 * Node / CommonJS
 */

if (typeof module !== "undefined") {

    module.exports = SKOSKernel;

    module.exports.SKOSKernelRuntime =
        SKOSKernelRuntime;
}
