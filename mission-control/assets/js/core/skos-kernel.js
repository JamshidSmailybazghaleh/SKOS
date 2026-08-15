/**
 * ============================================================
 * SKOS — Smaily Knowledge Operating System
 * PRIMARY RUNTIME KERNEL
 * ------------------------------------------------------------
 * File      : mission-control/assets/js/core/skos-kernel.js
 * Build     : BUILD-000423
 * Version   : 2.0.0
 * Status    : ACTIVE
 * Authority : PRIMARY RUNTIME AUTHORITY
 * ------------------------------------------------------------
 *
 * Mission:
 *   Provide the single authoritative runtime kernel for the
 *   Mission Control browser environment.
 *
 * Architecture:
 *
 *   bootstrap.js
 *        ↓
 *   BootSequence
 *        ↓
 *   SystemBootstrap
 *        ↓
 *   SKOSKernelRuntime
 *        ↓
 *   Runtime / Registry / Services / Engines
 *
 * IMPORTANT:
 *   This file MUST NOT create another kernel.
 *   This file owns the single browser runtime kernel instance.
 *
 * ============================================================
 */

class SKOSKernel {

    constructor(config = {}) {

        this.name = "SKOSKernel";
        this.version = "2.0.0";
        this.build = "BUILD-000423";

        this.config = config;

        /*
         * ------------------------------------------------------
         * Lifecycle
         * ------------------------------------------------------
         */

        this.status = "CREATED";

        this.initialized = false;
        this.running = false;

        this.bootStartedAt = null;
        this.bootCompletedAt = null;
        this.shutdownAt = null;

        /*
         * ------------------------------------------------------
         * Runtime State
         * ------------------------------------------------------
         */

        this.bootState = "IDLE";

        /*
         * ------------------------------------------------------
         * Registries
         * ------------------------------------------------------
         */

        this.engines = new Map();
        this.services = new Map();

        /*
         * ------------------------------------------------------
         * Event History
         * ------------------------------------------------------
         */

        this.events = [];

        /*
         * ------------------------------------------------------
         * Error State
         * ------------------------------------------------------
         */

        this.lastError = null;

        /*
         * ------------------------------------------------------
         * Statistics
         * ------------------------------------------------------
         */

        this.statistics = {

            initializeAttempts: 0,
            initializeSuccesses: 0,

            bootAttempts: 0,
            successfulBoots: 0,
            failedBoots: 0,

            shutdownAttempts: 0,
            successfulShutdowns: 0,

            enginesRegistered: 0,
            servicesRegistered: 0,

            eventsEmitted: 0,
            errors: 0
        };
    }


    /**
     * =========================================================
     * INITIALIZE
     * =========================================================
     */

    async initialize() {

        this.statistics.initializeAttempts++;

        /*
         * Idempotency:
         * Initialization may safely be requested more than once.
         */

        if (this.initialized) {

            return true;
        }

        this.status = "INITIALIZING";
        this.bootState = "INITIALIZING";

        this.emit(
            "KERNEL_INITIALIZING",
            {
                build: this.build,
                version: this.version
            }
        );

        try {

            /*
             * Runtime State
             */

            if (
                typeof window !== "undefined" &&
                window.RuntimeState &&
                typeof window.RuntimeState.set === "function"
            ) {

                window.RuntimeState.set(
                    "kernel",
                    "INITIALIZING"
                );
            }


            /*
             * Runtime
             */

            if (
                typeof window !== "undefined" &&
                window.Runtime &&
                typeof window.Runtime.initialize === "function"
            ) {

                await window.Runtime.initialize();
            }


            this.initialized = true;
            this.status = "INITIALIZED";

            this.statistics.initializeSuccesses++;

            this.emit(
                "KERNEL_INITIALIZED",
                {
                    build: this.build,
                    version: this.version
                }
            );

            return true;

        }
        catch (error) {

            this.handleError(
                "KERNEL_INITIALIZE_FAILED",
                error
            );

            this.status = "FAILED";
            this.bootState = "FAILED";

            return false;
        }
    }


    /**
     * =========================================================
     * BOOT
     * =========================================================
     *
     * This is the SINGLE authoritative runtime boot method.
     */

    async boot() {

        this.statistics.bootAttempts++;

        /*
         * Already operational:
         * Never execute the boot sequence twice.
         */

        if (
            this.running &&
            this.status === "RUNNING"
        ) {

            return this.getStatus();
        }


        /*
         * Initialize first.
         */

        if (!this.initialized) {

            const initialized =
                await this.initialize();

            if (!initialized) {

                this.statistics.failedBoots++;

                return false;
            }
        }


        this.bootStartedAt = new Date();
        this.bootState = "BOOTING";
        this.status = "BOOTING";

        this.emit(
            "KERNEL_BOOT_STARTED",
            {
                build: this.build,
                version: this.version
            }
        );


        try {

            /*
             * --------------------------------------------------
             * Service Manager
             * --------------------------------------------------
             */

            if (
                typeof window !== "undefined" &&
                window.ServiceManager
            ) {

                if (
                    typeof window.ServiceManager.initialize ===
                    "function"
                ) {

                    await window.ServiceManager.initialize();
                }
            }


            /*
             * --------------------------------------------------
             * Engine Manager
             * --------------------------------------------------
             */

            if (
                typeof window !== "undefined" &&
                window.EngineManager
            ) {

                if (
                    typeof window.EngineManager.initialize ===
                    "function"
                ) {

                    await window.EngineManager.initialize();
                }
            }


            /*
             * --------------------------------------------------
             * Runtime State
             * --------------------------------------------------
             */

            if (
                typeof window !== "undefined" &&
                window.RuntimeState &&
                typeof window.RuntimeState.set === "function"
            ) {

                window.RuntimeState.set(
                    "kernel",
                    "READY"
                );
            }


            /*
             * --------------------------------------------------
             * Runtime Operational
             * --------------------------------------------------
             */

            if (
                typeof window !== "undefined" &&
                window.Runtime &&
                typeof window.Runtime.setState === "function"
            ) {

                window.Runtime.setState(
                    "OPERATIONAL"
                );
            }


            this.running = true;

            this.status = "RUNNING";

            this.bootState = "READY";

            this.bootCompletedAt = new Date();

            this.statistics.successfulBoots++;


            this.emit(
                "KERNEL_BOOT_COMPLETED",
                {
                    build: this.build,
                    version: this.version,
                    bootCompletedAt:
                        this.bootCompletedAt
                }
            );


            return this.getStatus();

        }
        catch (error) {

            this.statistics.failedBoots++;

            this.running = false;

            this.status = "FAILED";
            this.bootState = "FAILED";

            this.handleError(
                "KERNEL_BOOT_FAILED",
                error
            );


            if (
                typeof window !== "undefined" &&
                window.RuntimeState &&
                typeof window.RuntimeState.set === "function"
            ) {

                window.RuntimeState.set(
                    "kernel",
                    "FAILED"
                );

                window.RuntimeState.set(
                    "system",
                    "FAILED"
                );
            }


            return false;
        }
    }


    /**
     * =========================================================
     * REGISTER ENGINE
     * =========================================================
     */

    registerEngine(
        engineId,
        engine
    ) {

        if (!engineId) {

            throw new Error(
                "Engine id is required."
            );
        }

        if (!engine) {

            throw new Error(
                "Engine instance is required."
            );
        }


        /*
         * Replace safely if already registered.
         */

        const alreadyRegistered =
            this.engines.has(engineId);


        this.engines.set(
            engineId,
            engine
        );


        if (!alreadyRegistered) {

            this.statistics.enginesRegistered++;
        }


        this.emit(
            "ENGINE_REGISTERED",
            {
                engineId
            }
        );


        return true;
    }


    /**
     * =========================================================
     * REGISTER SERVICE
     * =========================================================
     */

    registerService(
        serviceId,
        service
    ) {

        if (!serviceId) {

            throw new Error(
                "Service id is required."
            );
        }

        if (!service) {

            throw new Error(
                "Service instance is required."
            );
        }


        const alreadyRegistered =
            this.services.has(serviceId);


        this.services.set(
            serviceId,
            service
        );


        if (!alreadyRegistered) {

            this.statistics.servicesRegistered++;
        }


        this.emit(
            "SERVICE_REGISTERED",
            {
                serviceId
            }
        );


        return true;
    }


    /**
     * =========================================================
     * GET ENGINE
     * =========================================================
     */

    getEngine(engineId) {

        return (
            this.engines.get(engineId) ||
            null
        );
    }


    /**
     * =========================================================
     * GET SERVICE
     * =========================================================
     */

    getService(serviceId) {

        return (
            this.services.get(serviceId) ||
            null
        );
    }


    /**
     * =========================================================
     * START ENGINE
     * =========================================================
     */

    async startEngine(engineId) {

        const engine =
            this.getEngine(engineId);


        if (!engine) {

            throw new Error(
                `Engine not found: ${engineId}`
            );
        }


        if (
            typeof engine.initialize ===
            "function"
        ) {

            await engine.initialize();
        }


        this.emit(
            "ENGINE_STARTED",
            {
                engineId
            }
        );


        return true;
    }


    /**
     * =========================================================
     * START SERVICE
     * =========================================================
     */

    async startService(serviceId) {

        const service =
            this.getService(serviceId);


        if (!service) {

            throw new Error(
                `Service not found: ${serviceId}`
            );
        }


        if (
            typeof service.initialize ===
            "function"
        ) {

            await service.initialize();
        }


        if (
            typeof service.start ===
            "function"
        ) {

            await service.start();
        }


        this.emit(
            "SERVICE_STARTED",
            {
                serviceId
            }
        );


        return true;
    }


    /**
     * =========================================================
     * HEALTH CHECK
     * =========================================================
     */

    healthCheck() {

        return {

            name: this.name,

            version: this.version,

            build: this.build,

            authority:
                "PRIMARY_RUNTIME_KERNEL",

            status: this.status,

            initialized:
                this.initialized,

            running:
                this.running,

            bootState:
                this.bootState,

            bootStartedAt:
                this.bootStartedAt,

            bootCompletedAt:
                this.bootCompletedAt,

            shutdownAt:
                this.shutdownAt,

            engines:
                this.engines.size,

            services:
                this.services.size,

            lastError:
                this.lastError,

            statistics:
                {
                    ...this.statistics
                }
        };
    }


    /**
     * =========================================================
     * STATUS
     * =========================================================
     */

    getStatus() {

        return this.healthCheck();
    }


    /**
     * =========================================================
     * EVENT EMITTER
     * =========================================================
     */

    emit(
        event,
        payload = {}
    ) {

        const record = {

            event,

            timestamp:
                new Date().toISOString(),

            payload
        };


        this.events.push(record);

        this.statistics.eventsEmitted++;


        /*
         * Keep history bounded.
         */

        if (this.events.length > 500) {

            this.events.shift();
        }


        /*
         * Forward to EventBus when available.
         */

        if (
            typeof window !== "undefined" &&
            window.EventBus &&
            typeof window.EventBus.publish ===
            "function"
        ) {

            try {

                window.EventBus.publish(
                    event,
                    payload
                );

            }
            catch (eventError) {

                console.warn(
                    "SKOS EventBus publish failed:",
                    eventError
                );
            }
        }


        return record;
    }


    /**
     * =========================================================
     * ERROR HANDLER
     * =========================================================
     */

    handleError(
        code,
        error
    ) {

        this.statistics.errors++;


        this.lastError = {

            code,

            message:
                error instanceof Error
                    ? error.message
                    : String(error),

            timestamp:
                new Date().toISOString()
        };


        this.emit(
            code,
            this.lastError
        );


        if (
            typeof Logger !== "undefined" &&
            Logger.error
        ) {

            Logger.error(
                `[${code}] ${this.lastError.message}`
            );

        }
        else {

            console.error(
                `[${code}]`,
                this.lastError.message
            );
        }
    }


    /**
     * =========================================================
     * GET EVENTS
     * =========================================================
     */

    getEvents() {

        return [
            ...this.events
        ];
    }


    /**
     * =========================================================
     * SHUTDOWN
     * =========================================================
     */

    async shutdown() {

        this.statistics.shutdownAttempts++;


        if (
            !this.running &&
            this.status !== "RUNNING"
        ) {

            this.status = "STOPPED";
            this.bootState = "STOPPED";

            return true;
        }


        this.emit(
            "KERNEL_SHUTDOWN_STARTED"
        );


        try {

            /*
             * Shutdown engines in reverse registration order.
             */

            const engines =
                Array.from(
                    this.engines.values()
                ).reverse();


            for (
                const engine of engines
            ) {

                if (
                    engine &&
                    typeof engine.shutdown ===
                    "function"
                ) {

                    await engine.shutdown();
                }
            }


            /*
             * Shutdown services in reverse order.
             */

            const services =
                Array.from(
                    this.services.values()
                ).reverse();


            for (
                const service of services
            ) {

                if (
                    service &&
                    typeof service.shutdown ===
                    "function"
                ) {

                    await service.shutdown();
                }
            }


            this.running = false;

            this.status = "STOPPED";

            this.bootState = "STOPPED";

            this.shutdownAt = new Date();

            this.statistics.successfulShutdowns++;


            if (
                typeof window !== "undefined" &&
                window.RuntimeState &&
                typeof window.RuntimeState.set ===
                "function"
            ) {

                window.RuntimeState.set(
                    "kernel",
                    "STOPPED"
                );
            }


            this.emit(
                "KERNEL_SHUTDOWN_COMPLETED",
                {
                    shutdownAt:
                        this.shutdownAt
                }
            );


            return true;

        }
        catch (error) {

            this.handleError(
                "KERNEL_SHUTDOWN_FAILED",
                error
            );

            return false;
        }
    }


    /**
     * =========================================================
     * RESET
     * =========================================================
     *
     * Intended for controlled testing/reinitialization.
     * It does NOT run during normal startup.
     */

    async reset() {

        await this.shutdown();


        this.engines.clear();
        this.services.clear();
        this.events = [];

        this.initialized = false;
        this.running = false;

        this.status = "CREATED";
        this.bootState = "IDLE";

        this.bootStartedAt = null;
        this.bootCompletedAt = null;
        this.shutdownAt = null;

        this.lastError = null;


        this.statistics = {

            initializeAttempts: 0,
            initializeSuccesses: 0,

            bootAttempts: 0,
            successfulBoots: 0,
            failedBoots: 0,

            shutdownAttempts: 0,
            successfulShutdowns: 0,

            enginesRegistered: 0,
            servicesRegistered: 0,

            eventsEmitted: 0,
            errors: 0
        };


        return true;
    }
}


/**
 * ============================================================
 * SINGLETON RUNTIME AUTHORITY
 * ============================================================
 *
 * IMPORTANT:
 *
 * No other browser module should execute:
 *
 *     new SKOSKernel()
 *
 * The singleton below is the only runtime instance.
 * ============================================================
 */

let SKOSKernelRuntime;


if (
    typeof window !== "undefined"
) {

    if (
        window.SKOSKernelRuntime
    ) {

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

        Object.defineProperty(
            window,
            "SKOSKernelRuntime",
            {
                value:
                    SKOSKernelRuntime,

                writable: false,

                configurable: false,

                enumerable: true
            }
        );
    }
}


/**
 * ============================================================
 * NODE / COMMONJS SUPPORT
 * ============================================================
 */

if (
    typeof module !== "undefined" &&
    module.exports
) {

    module.exports = {

        SKOSKernel,

        get SKOSKernelRuntime() {

            if (
                !SKOSKernelRuntime
            ) {

                SKOSKernelRuntime =
                    new SKOSKernel();
            }

            return SKOSKernelRuntime;
        }
    };
}
