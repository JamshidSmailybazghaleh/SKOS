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
 * Central runtime authority of SKOS Mission Control.
 *
 * Responsibilities:
 * - Configuration
 * - Runtime lifecycle
 * - Registry coordination
 * - Module management
 * - Service management
 * - Engine management
 * - Dependency readiness
 * - Runtime state
 * - Health monitoring
 * - Diagnostics
 * - Event emission
 * - SDKC bridge
 * - Graceful shutdown
 *
 * Architectural Rule:
 *
 * There MUST be exactly one browser runtime authority.
 *
 * Bootstrap, KernelAPI, BootSequence, SystemBootstrap,
 * ModuleManager, ServiceManager and EngineManager are
 * subordinate interfaces or adapters.
 *
 * They MUST NOT create an independent runtime.
 * ============================================================
 */

class SKOSKernel {

    constructor(config = {}) {

        this.name = "SKOSKernel";
        this.version = "2.0.0";
        this.build = "BUILD-000423";

        this.authority = "PRIMARY_RUNTIME_AUTHORITY";

        this.config = config;

        this.status = "CREATED";

        this.initialized = false;
        this.running = false;
        this.shuttingDown = false;

        this.bootTime = null;
        this.shutdownTime = null;

        this.engines = new Map();
        this.services = new Map();
        this.modules = new Map();

        this.dependencies = new Map();

        this.events = [];
        this.history = [];

        this.sdkc = null;

        this.runtimeState = {
            configuration: "PENDING",
            registry: "PENDING",
            modules: "PENDING",
            services: "PENDING",
            engines: "PENDING",
            dependencies: "PENDING",
            health: "PENDING",
            diagnostics: "PENDING",
            sdkc: "DISCONNECTED",
            system: "CREATED"
        };

        this.statistics = {
            bootAttempts: 0,
            successfulBoots: 0,
            failedBoots: 0,
            shutdowns: 0,

            enginesRegistered: 0,
            servicesRegistered: 0,
            modulesRegistered: 0,

            eventsEmitted: 0,
            errors: 0,
            healthChecks: 0
        };

        this.bootPromise = null;
    }


    /* ========================================================
       INITIALIZATION
       ======================================================== */

    async initialize() {

        if (this.initialized) {
            return this.getStatus();
        }

        this.status = "INITIALIZING";
        this.runtimeState.system = "INITIALIZING";

        this.emit("KERNEL_INITIALIZING");

        try {

            this.validateConfiguration();

            this.runtimeState.configuration = "READY";

            this.initialized = true;

            this.status = "INITIALIZED";

            this.emit("KERNEL_INITIALIZED");

            return this.getStatus();

        } catch (error) {

            this.statistics.errors++;

            this.status = "FAILED";
            this.runtimeState.system = "FAILED";

            this.emit("KERNEL_INITIALIZATION_FAILED", {
                error: error.message
            });

            throw error;
        }
    }


    /* ========================================================
       BOOT
       ======================================================== */

    async boot() {

        /*
         * Prevent duplicate concurrent boot operations.
         */
        if (this.running) {
            return this.getStatus();
        }

        if (this.bootPromise) {
            return await this.bootPromise;
        }

        this.bootPromise = this._boot();

        try {
            return await this.bootPromise;
        } finally {
            this.bootPromise = null;
        }
    }


    async _boot() {

        this.statistics.bootAttempts++;

        try {

            await this.initialize();

            this.status = "BOOTING";
            this.runtimeState.system = "BOOTING";

            this.bootTime = new Date();

            this.emit("KERNEL_BOOT_STARTED");

            /*
             * ------------------------------------------------
             * Registry
             * ------------------------------------------------
             */

            await this.loadRegistry();

            /*
             * ------------------------------------------------
             * Runtime Components
             * ------------------------------------------------
             */

            await this.initializeServices();

            await this.initializeEngines();

            await this.initializeModules();

            /*
             * ------------------------------------------------
             * Dependency Readiness
             * ------------------------------------------------
             */

            await this.resolveDependencies();

            /*
             * ------------------------------------------------
             * Health
             * ------------------------------------------------
             */

            await this.performHealthCheck();

            /*
             * ------------------------------------------------
             * READY
             * ------------------------------------------------
             */

            this.running = true;
            this.shuttingDown = false;

            this.status = "RUNNING";
            this.runtimeState.system = "OPERATIONAL";

            this.statistics.successfulBoots++;

            this.history.push({
                event: "SYSTEM_READY",
                timestamp: new Date()
            });

            this.emit("KERNEL_READY");

            return this.getStatus();

        } catch (error) {

            this.statistics.failedBoots++;
            this.statistics.errors++;

            this.running = false;

            this.status = "FAILED";
            this.runtimeState.system = "FAILED";

            this.history.push({
                event: "BOOT_FAILED",
                timestamp: new Date(),
                error: error.message
            });

            this.emit("KERNEL_BOOT_FAILED", {
                error: error.message
            });

            throw error;
        }
    }


    /* ========================================================
       CONFIGURATION
       ======================================================== */

    validateConfiguration() {

        if (!this.config) {
            this.config = {};
        }

        return true;
    }


    /* ========================================================
       REGISTRY
       ======================================================== */

    async loadRegistry() {

        this.runtimeState.registry = "LOADING";

        this.emit("REGISTRY_LOADING");

        /*
         * Mission Control Registry is optional at the Kernel
         * level. If Registry exists, use it.
         */

        if (
            typeof Registry !== "undefined" &&
            typeof Registry.load === "function"
        ) {

            const loaded = await Registry.load();

            if (!loaded) {
                throw new Error("Registry failed to load.");
            }

            this.runtimeState.registry = "READY";

            this.emit("REGISTRY_READY");

            return true;
        }

        /*
         * A registry implementation is not mandatory for
         * the Kernel object itself.
         */

        this.runtimeState.registry = "AVAILABLE";

        this.emit("REGISTRY_UNAVAILABLE");

        return true;
    }


    /* ========================================================
       MODULES
       ======================================================== */

    registerModule(name, module) {

        if (!name) {
            throw new Error("Module name is required.");
        }

        if (this.modules.has(name)) {
            return false;
        }

        this.modules.set(name, module);

        this.statistics.modulesRegistered++;

        this.emit("MODULE_REGISTERED", {
            name
        });

        return true;
    }


    getModule(name) {
        return this.modules.get(name) || null;
    }


    unregisterModule(name) {

        if (!this.modules.has(name)) {
            return false;
        }

        this.modules.delete(name);

        this.emit("MODULE_UNREGISTERED", {
            name
        });

        return true;
    }


    async initializeModules() {

        this.runtimeState.modules = "INITIALIZING";

        /*
         * Registry-driven module loading.
         */

        if (
            typeof Registry !== "undefined" &&
            typeof Registry.getModules === "function"
        ) {

            const modules = await Registry.getModules();

            if (
                typeof ModuleLoader !== "undefined" &&
                typeof ModuleLoader.loadModule === "function"
            ) {

                for (const module of modules) {

                    const name =
                        typeof module === "string"
                            ? module
                            : module.name;

                    if (!name) {
                        continue;
                    }

                    const loaded =
                        await ModuleLoader.loadModule(name);

                    if (!loaded) {
                        throw new Error(
                            "Module failed to load: " + name
                        );
                    }

                    this.registerModule(name, module);
                }
            }
        }

        this.runtimeState.modules = "READY";

        this.emit("MODULES_READY");

        return true;
    }


    /* ========================================================
       SERVICES
       ======================================================== */

    registerService(name, service) {

        if (!name) {
            throw new Error("Service name is required.");
        }

        if (this.services.has(name)) {
            return false;
        }

        this.services.set(name, service);

        this.statistics.servicesRegistered++;

        this.emit("SERVICE_REGISTERED", {
            name
        });

        return true;
    }


    getService(name) {
        return this.services.get(name) || null;
    }


    unregisterService(name) {

        if (!this.services.has(name)) {
            return false;
        }

        this.services.delete(name);

        this.emit("SERVICE_UNREGISTERED", {
            name
        });

        return true;
    }


    async initializeServices() {

        this.runtimeState.services = "INITIALIZING";

        if (
            typeof ServiceManager !== "undefined" &&
            typeof ServiceManager.initialize === "function"
        ) {

            await ServiceManager.initialize();
        }

        /*
         * Initialize services registered directly with Kernel.
         */

        for (const [name, service] of this.services) {

            if (
                service &&
                typeof service.initialize === "function"
            ) {

                await service.initialize();
            }

            this.emit("SERVICE_READY", {
                name
            });
        }

        this.runtimeState.services = "READY";

        this.emit("SERVICES_READY");

        return true;
    }


    /* ========================================================
       ENGINES
       ======================================================== */

    registerEngine(name, engine) {

        if (!name) {
            throw new Error("Engine name is required.");
        }

        if (this.engines.has(name)) {
            return false;
        }

        this.engines.set(name, engine);

        this.statistics.enginesRegistered++;

        this.emit("ENGINE_REGISTERED", {
            name
        });

        return true;
    }


    getEngine(name) {
        return this.engines.get(name) || null;
    }


    unregisterEngine(name) {

        if (!this.engines.has(name)) {
            return false;
        }

        this.engines.delete(name);

        this.emit("ENGINE_UNREGISTERED", {
            name
        });

        return true;
    }


    async initializeEngines() {

        this.runtimeState.engines = "INITIALIZING";

        if (
            typeof EngineManager !== "undefined" &&
            typeof EngineManager.initialize === "function"
        ) {

            await EngineManager.initialize();
        }

        for (const [name, engine] of this.engines) {

            if (
                engine &&
                typeof engine.initialize === "function"
            ) {

                await engine.initialize();
            }

            this.emit("ENGINE_READY", {
                name
            });
        }

        this.runtimeState.engines = "READY";

        this.emit("ENGINES_READY");

        return true;
    }


    async executeEngine(name, payload = {}) {

        const engine = this.getEngine(name);

        if (!engine) {
            throw new Error(
                "Engine not found: " + name
            );
        }

        if (typeof engine.execute !== "function") {
            throw new Error(
                "Engine does not expose execute(): " + name
            );
        }

        this.emit("ENGINE_EXECUTING", {
            name
        });

        return await engine.execute(payload);
    }


    /* ========================================================
       DEPENDENCY MANAGEMENT
       ======================================================== */

    registerDependency(name, dependency) {

        if (!name) {
            throw new Error("Dependency name is required.");
        }

        this.dependencies.set(
            name,
            dependency
        );

        this.emit("DEPENDENCY_REGISTERED", {
            name
        });

        return true;
    }


    async resolveDependencies() {

        this.runtimeState.dependencies = "RESOLVING";

        for (const [name, dependency] of this.dependencies) {

            if (!dependency) {
                throw new Error(
                    "Invalid dependency: " + name
                );
            }

            if (
                typeof dependency.initialize === "function"
            ) {

                await dependency.initialize();
            }
        }

        this.runtimeState.dependencies = "READY";

        this.emit("DEPENDENCIES_READY");

        return true;
    }


    /* ========================================================
       SDKC
       ======================================================== */

    connectSDKC(connector) {

        if (!connector) {
            throw new Error(
                "SDKC connector is required."
            );
        }

        this.sdkc = connector;

        if (
            typeof connector.connect === "function"
        ) {

            connector.connect();
        }

        this.runtimeState.sdkc = "CONNECTED";

        this.emit("SDKC_CONNECTED");

        return true;
    }


    disconnectSDKC() {

        if (!this.sdkc) {
            this.runtimeState.sdkc = "DISCONNECTED";
            return true;
        }

        if (
            typeof this.sdkc.disconnect === "function"
        ) {

            this.sdkc.disconnect();
        }

        this.sdkc = null;

        this.runtimeState.sdkc = "DISCONNECTED";

        this.emit("SDKC_DISCONNECTED");

        return true;
    }


    /* ========================================================
       HEALTH
       ======================================================== */

    async performHealthCheck() {

        this.statistics.healthChecks++;

        this.runtimeState.health = "CHECKING";

        const result = {
            kernel: this.name,
            version: this.version,
            build: this.build,

            initialized: this.initialized,
            running: this.running,

            modules: this.modules.size,
            services: this.services.size,
            engines: this.engines.size,

            sdkc:
                this.runtimeState.sdkc,

            timestamp: new Date()
        };

        this.runtimeState.health = "HEALTHY";

        this.emit("HEALTH_CHECK_COMPLETE", result);

        return result;
    }


    /* ========================================================
       DIAGNOSTICS
       ======================================================== */

    runDiagnostics() {

        this.runtimeState.diagnostics = "RUNNING";

        const diagnostics = {
            kernel: this.name,
            authority: this.authority,
            version: this.version,
            build: this.build,

            status: this.status,

            initialized: this.initialized,
            running: this.running,

            runtimeState: {
                ...this.runtimeState
            },

            counts: {
                modules: this.modules.size,
                services: this.services.size,
                engines: this.engines.size,
                dependencies: this.dependencies.size
            },

            statistics: {
                ...this.statistics
            },

            bootTime: this.bootTime,
            shutdownTime: this.shutdownTime,

            timestamp: new Date()
        };

        this.runtimeState.diagnostics = "READY";

        this.emit(
            "DIAGNOSTICS_COMPLETE",
            diagnostics
        );

        return diagnostics;
    }


    /* ========================================================
       EVENT SYSTEM
       ======================================================== */

    emit(event, payload = {}) {

        const record = {
            event,
            payload,
            timestamp: new Date()
        };

        this.events.push(record);

        this.statistics.eventsEmitted++;

        /*
         * External EventBus integration.
         */

        if (
            typeof EventBus !== "undefined" &&
            typeof EventBus.publish === "function"
        ) {

            try {

                EventBus.publish(
                    event,
                    payload
                );

            } catch (error) {

                this.statistics.errors++;
            }
        }

        return record;
    }


    getEvents() {
        return [...this.events];
    }


    clearEvents() {
        this.events = [];
    }


    /* ========================================================
       STATUS
       ======================================================== */

    getStatus() {

        return {
            name: this.name,
            authority: this.authority,

            version: this.version,
            build: this.build,

            status: this.status,

            initialized: this.initialized,
            running: this.running,
            shuttingDown: this.shuttingDown,

            bootTime: this.bootTime,
            shutdownTime: this.shutdownTime,

            runtimeState: {
                ...this.runtimeState
            },

            counts: {
                modules: this.modules.size,
                services: this.services.size,
                engines: this.engines.size,
                dependencies: this.dependencies.size
            },

            statistics: {
                ...this.statistics
            }
        };
    }


    healthCheck() {

        return this.getStatus();
    }


    /* ========================================================
       SHUTDOWN
       ======================================================== */

    async shutdown() {

        if (this.shuttingDown) {
            return true;
        }

        if (!this.running) {
            return true;
        }

        this.shuttingDown = true;
        this.status = "SHUTTING_DOWN";
        this.runtimeState.system = "SHUTTING_DOWN";

        this.emit("KERNEL_SHUTDOWN_STARTED");

        /*
         * Engines
         */

        for (const [name, engine] of this.engines) {

            if (
                engine &&
                typeof engine.shutdown === "function"
            ) {

                try {
                    await engine.shutdown();
                } catch (error) {
                    this.statistics.errors++;
                }
            }

            this.emit("ENGINE_STOPPED", {
                name
            });
        }

        /*
         * Services
         */

        for (const [name, service] of this.services) {

            if (
                service &&
                typeof service.shutdown === "function"
            ) {

                try {
                    await service.shutdown();
                } catch (error) {
                    this.statistics.errors++;
                }
            }

            this.emit("SERVICE_STOPPED", {
                name
            });
        }

        this.disconnectSDKC();

        this.running = false;
        this.shuttingDown = false;

        this.shutdownTime = new Date();

        this.status = "SHUTDOWN";
        this.runtimeState.system = "STOPPED";

        this.statistics.shutdowns++;

        this.emit("KERNEL_SHUTDOWN_COMPLETE");

        return true;
    }


    /* ========================================================
       RESET
       ======================================================== */

    reset() {

        this.engines.clear();
        this.services.clear();
        this.modules.clear();
        this.dependencies.clear();

        this.events = [];
        this.history = [];

        this.sdkc = null;

        this.initialized = false;
        this.running = false;
        this.shuttingDown = false;

        this.bootTime = null;
        this.shutdownTime = null;

        this.status = "CREATED";

        this.runtimeState = {
            configuration: "PENDING",
            registry: "PENDING",
            modules: "PENDING",
            services: "PENDING",
            engines: "PENDING",
            dependencies: "PENDING",
            health: "PENDING",
            diagnostics: "PENDING",
            sdkc: "DISCONNECTED",
            system: "CREATED"
        };

        return true;
    }
}


/* ============================================================
   EXPORT
   ============================================================ */

if (typeof module !== "undefined") {
    module.exports = SKOSKernel;
}


if (typeof window !== "undefined") {

    /*
     * Primary constructor
     */
    window.SKOSKernel = SKOSKernel;

    /*
     * Singleton runtime authority.
     *
     * This is the ONLY browser Kernel instance.
     */
    if (!window.SKOSKernelRuntime) {
        window.SKOSKernelRuntime =
            new SKOSKernel(
                typeof CONFIG !== "undefined"
                    ? CONFIG
                    : {}
            );
    }

    /*
     * Compatibility alias.
     *
     * Legacy code may use window.SKOSKernelRuntime.
     */
    window.SKOSKernelRuntime =
        window.SKOSKernelRuntime;
}
