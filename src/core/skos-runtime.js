"use strict";

/**
 * ==========================================================
 * SKOS Runtime
 * ==========================================================
 *
 * Smaily Knowledge Operating System
 *
 * BUILD   : BUILD-000910
 * VERSION : 1.0.0
 *
 * Responsibility
 * ----------------------------------------------------------
 * - Runtime orchestration
 * - Core component initialization
 * - Lifecycle coordination
 * - Runtime state management
 * - Core status reporting
 *
 * The Runtime does NOT implement:
 * - Module registration
 * - Event dispatching
 * - Module lifecycle logic
 *
 * Those responsibilities belong to:
 * - ModuleRegistry
 * - EventBus
 * - LifecycleManager
 *
 * ==========================================================
 */

const ModuleRegistry =

    require("./module-registry");


const EventBus =

    require("./event-bus");


const LifecycleManager =

    require("./lifecycle-manager");



class SKOSRuntime {


    constructor(

        options = {}

    ){


        this.name =

            "Smaily Knowledge Operating System";


        this.version =

            "1.0.0";


        this.build =

            options.build ||

            "BUILD-000910";


        this.status =

            "CREATED";


        this.options =

            {

                ...options

            };


        /**
         * --------------------------------------------------
         * Core Components
         * --------------------------------------------------
         */


        this.events =

            options.eventBus ||

            new EventBus(

                options.eventBusOptions ||

                {}

            );


        this.registry =

            options.registry ||

            new ModuleRegistry(

                options.registryOptions ||

                {}

            );


        this.lifecycle =

            options.lifecycle ||

            new LifecycleManager(

                options.lifecycleOptions ||

                {}

            );


        /**
         * --------------------------------------------------
         * Runtime Metadata
         * --------------------------------------------------
         */


        this.metadata = {


            createdAt:

                new Date(),


            initializedAt:

                null,


            startedAt:

                null,


            stoppedAt:

                null,


            destroyedAt:

                null



        };


    }


    /**
     * ======================================================
     * Part 1 END
     * ======================================================
     *
     * Part 2 continues with:
     *
     * - Core dependency injection
     * - Lifecycle ↔ Registry connection
     * - Lifecycle ↔ EventBus connection
     *
     * ======================================================
     */

        /**
     * ======================================================
     * Core Dependency Injection
     * ======================================================
     */

    connectCore(){

        /**
         * --------------------------------------------------
         * Connect Lifecycle Manager
         * --------------------------------------------------
         */

        this.lifecycle.setRuntime(

            this

        );


        this.lifecycle.setRegistry(

            this.registry

        );


        this.lifecycle.setEventBus(

            this.events

        );


        /**
         * --------------------------------------------------
         * Connect Registry
         * --------------------------------------------------
         *
         * These methods are expected to exist in the
         * professional ModuleRegistry implementation.
         */

        if(

            typeof this.registry.setEventBus ===

            "function"

        ){

            this.registry.setEventBus(

                this.events

            );

        }


        if(

            typeof this.registry.setLifecycle ===

            "function"

        ){

            this.registry.setLifecycle(

                this.lifecycle

            );

        }


        /**
         * --------------------------------------------------
         * Runtime State
         * --------------------------------------------------
         */

        this.status =

            "CORE_CONNECTED";


        return true;

    }

        /**
     * ======================================================
     * Initialize Core
     * ======================================================
     */

    initialize(){

        if(

            this.status !==

            "CREATED"

        ){

            return false;

        }


        this.connectCore();


        const initialized =

            this.lifecycle.initialize();


        if(

            !initialized

        ){

            this.status =

                "ERROR";


            return false;

        }


        this.metadata.initializedAt =

            new Date();


        this.status =

            "INITIALIZED";


        this.events.safeEmit(

            "SKOS.RUNTIME.INITIALIZED",

            {

                build:

                    this.build,

                version:

                    this.version,

                timestamp:

                    this.metadata.initializedAt

            }

        );


        return true;

    }

       /**
     * ======================================================
     * Core Readiness
     * ======================================================
     */

    isReady(){

        return (

            this.status ===

            "INITIALIZED"

            &&

            this.lifecycle.getState()

                ===

            "INITIALIZED"

        );

    }

        /**
     * ======================================================
     * Runtime Status
     * ======================================================
     */

    getStatus(){

        return {

            name:

                this.name,

            version:

                this.version,

            build:

                this.build,

            status:

                this.status,

            lifecycle:

                this.lifecycle.getState(),

            initialized:

                this.isReady(),

            metadata:

                {

                    ...this.metadata

                }

        };

    }

        /**
     * ======================================================
     * Bootstrap
     * ======================================================
     */

    bootstrap(){

        if(

            this.status ===

            "CREATED"

        ){

            if(

                !this.initialize()

            ){

                return false;

            }

        }


        if(

            !this.isReady()

        ){

            return false;

        }


        this.status =

            "BOOTSTRAPPED";


        this.events.safeEmit(

            "SKOS.RUNTIME.BOOTSTRAPPED",

            {

                build:

                    this.build,

                timestamp:

                    new Date()

            }

        );


        return true;

    }

        /**
     * ======================================================
     * Start Runtime
     * ======================================================
     */

    start(){

        if(

            this.status ===

            "CREATED"

        ){

            if(

                !this.bootstrap()

            ){

                return false;

            }

        }


        if(

            this.status !==

            "BOOTSTRAPPED"

            &&

            this.status !==

            "STOPPED"

        ){

            return false;

        }


        try{


            const started =

                this.lifecycle.start();


            if(

                !started

            ){

                this.status =

                    "ERROR";


                return false;

            }


            this.metadata.startedAt =

                new Date();


            this.status =

                "RUNNING";


            this.events.safeEmit(

                "SKOS.RUNTIME.STARTED",

                {

                    build:

                        this.build,

                    timestamp:

                        this.metadata.startedAt

                }

            );


            return true;


        }

        catch(error){


            this.status =

                "ERROR";


            this.events.safeEmit(

                "SKOS.RUNTIME.START_FAILED",

                {

                    error:

                        error.message,

                    timestamp:

                        new Date()

                }

            );


            return false;

        }

    }

        /**
     * ======================================================
     * Pause Runtime
     * ======================================================
     */

    pause(){

        if(

            this.status !==

            "RUNNING"

        ){

            return false;

        }


        const paused =

            this.lifecycle.pause();


        if(

            !paused

        ){

            return false;

        }


        this.status =

            "PAUSED";


        this.events.safeEmit(

            "SKOS.RUNTIME.PAUSED",

            {

                timestamp:

                    new Date()

            }

        );


        return true;

    }

        /**
     * ======================================================
     * Resume Runtime
     * ======================================================
 */

    resume(){

        if(

            this.status !==

            "PAUSED"

        ){

            return false;

        }


        const resumed =

            this.lifecycle.resume();


        if(

            !resumed

        ){

            return false;

        }


        this.status =

            "RUNNING";


        this.events.safeEmit(

            "SKOS.RUNTIME.RESUMED",

            {

                timestamp:

                    new Date()

            }

        );


        return true;

    }

        /**
     * ======================================================
     * Stop Runtime
     * ======================================================
     */

    stop(){

        if(

            this.status !==

                "RUNNING"

            &&

            this.status !==

                "PAUSED"

        ){

            return false;

        }


        try{


            const stopped =

                this.lifecycle.stop();


            if(

                !stopped

            ){

                this.status =

                    "ERROR";


                return false;

            }


            this.metadata.stoppedAt =

                new Date();


            this.status =

                "STOPPED";


            this.events.safeEmit(

                "SKOS.RUNTIME.STOPPED",

                {

                    build:

                        this.build,

                    timestamp:

                        this.metadata.stoppedAt

                }

            );


            return true;


        }

        catch(error){


            this.status =

                "ERROR";


            this.events.safeEmit(

                "SKOS.RUNTIME.STOP_FAILED",

                {

                    error:

                        error.message,

                    timestamp:

                        new Date()

                }

            );


            return false;

        }

    }

        /**
     * ======================================================
     * Restart Runtime
     * ======================================================
     */

    restart(){

        try{


            if(

                this.status ===

                "RUNNING"

                ||

                this.status ===

                "PAUSED"

            ){

                if(

                    !this.stop()

                ){

                    return false;

                }

            }


            if(

                this.status !==

                "STOPPED"

            ){

                return false;

            }


            this.status =

                "RESTARTING";


            this.events.safeEmit(

                "SKOS.RUNTIME.RESTARTING",

                {

                    timestamp:

                        new Date()

                }

            );


            const initialized =

                this.lifecycle.initialize();


            if(

                !initialized

            ){

                this.status =

                    "ERROR";


                return false;

            }


            this.status =

                "BOOTSTRAPPED";


            return this.start();


        }

        catch(error){


            this.status =

                "ERROR";


            this.events.safeEmit(

                "SKOS.RUNTIME.RESTART_FAILED",

                {

                    error:

                        error.message,

                    timestamp:

                        new Date()

                }

            );


            return false;

        }

    }

        /**
     * ======================================================
     * Graceful Shutdown
     * ======================================================
     */

    gracefulShutdown(){

        try{


            if(

                this.status ===

                    "RUNNING"

                ||

                this.status ===

                    "PAUSED"

            ){

                this.stop();

            }


            this.status =

                "SHUTTING_DOWN";


            this.events.safeEmit(

                "SKOS.RUNTIME.SHUTTING_DOWN",

                {

                    timestamp:

                        new Date()

                }

            );


            if(

                typeof this.lifecycle

                    .gracefulShutdown ===

                    "function"

            ){

                this.lifecycle

                    .gracefulShutdown();

            }


            this.status =

                "SHUTDOWN";


            this.events.safeEmit(

                "SKOS.RUNTIME.SHUTDOWN",

                {

                    timestamp:

                        new Date()

                }

            );


            return true;


        }

        catch(error){


            this.status =

                "ERROR";


            this.events.safeEmit(

                "SKOS.RUNTIME.SHUTDOWN_FAILED",

                {

                    error:

                        error.message,

                    timestamp:

                        new Date()

                }

            );


            return false;

        }

    }

    /**
     * ======================================================
     * Runtime Health
     * ======================================================
     */

    health(){

        const lifecycleHealth =

            this.lifecycle &&

            typeof this.lifecycle.health ===

                "function"

                ?

            this.lifecycle.health()

                :

            null;


        const registryStatus =

            this.registry &&

            typeof this.registry.getStatus ===

                "function"

                ?

            this.registry.getStatus()

                :

            null;


        return {

            healthy:

                this.status ===

                    "RUNNING",

            status:

                this.status,

            lifecycle:

                lifecycleHealth,

            registry:

                registryStatus,

            eventBus:

                this.events

                    ?

                true

                    :

                false,

            timestamp:

                new Date()

        };

    }

        /**
     * ======================================================
     * Runtime Snapshot
     * ======================================================
     */

    snapshot(){

        return {

            identity: {

                name:

                    this.name,

                version:

                    this.version,

                build:

                    this.build

            },

            status:

                this.getStatus(),

            health:

                this.health(),

            metadata: {

                ...this.metadata

            },

            lifecycle:

                this.lifecycle &&

                typeof this.lifecycle.snapshot ===

                    "function"

                    ?

                this.lifecycle.snapshot()

                    :

                null,

            registry:

                this.registry &&

                typeof this.registry.snapshot ===

                    "function"

                    ?

                this.registry.snapshot()

                    :

                null

        };

    }

        /**
     * ======================================================
     * Runtime Diagnostics
     * ======================================================
 */

    diagnostics(){

        const health =

            this.health();


        const issues = [];


        if(

            !health.lifecycle

        ){

            issues.push(

                "Lifecycle diagnostics unavailable."

            );

        }


        if(

            !health.registry

        ){

            issues.push(

                "Registry diagnostics unavailable."

            );

        }


        if(

            !health.eventBus

        ){

            issues.push(

                "EventBus unavailable."

            );

        }


        if(

            this.status ===

                "ERROR"

        ){

            issues.push(

                "Runtime is in ERROR state."

            );

        }


        return {

            healthy:

                issues.length ===

                    0,

            issues,

            health,

            timestamp:

                new Date()

        };

    }

        /**
     * ======================================================
     * Runtime Report
     * ======================================================
 */

    report(){

        return {

            identity: {

                name:

                    this.name,

                version:

                    this.version,

                build:

                    this.build

            },

            status:

                this.getStatus(),

            health:

                this.health(),

            diagnostics:

                this.diagnostics(),

            metadata: {

                ...this.metadata

            }

        };

    }

    /**
 * ======================================================
 * Runtime Event Subscription
 * ======================================================
 */

on(

    event,

    handler

){

    if(

        !this.events ||

        typeof this.events.on !==

            "function"

    ){

        return false;

    }


    return this.events.on(

        event,

        handler

    );

}

 /**
 * ======================================================
 * Runtime Event Unsubscription
 * ======================================================
 */

off(

    event,

    handler

){

    if(

        !this.events ||

        typeof this.events.off !==

            "function"

    ){

        return false;

    }


    return this.events.off(

        event,

        handler

    );

}

/**
 * ======================================================
 * Destroy Runtime
 * ======================================================
 */

destroy(){

    try{


        if(

            this.status ===

                "RUNNING"

            ||

            this.status ===

                "PAUSED"

        ){

            this.gracefulShutdown();

        }


        if(

            this.registry &&

            typeof this.registry.destroy ===

                "function"

        ){

            this.registry.destroy();

        }


        if(

            this.events &&

            typeof this.events.destroy ===

                "function"

        ){

            this.events.destroy();

        }


        if(

            this.lifecycle &&

            typeof this.lifecycle.destroy ===

                "function"

        ){

            this.lifecycle.destroy();

        }


        this.metadata.destroyedAt =

            new Date();


        this.status =

            "DESTROYED";


        return true;


    }

    catch(error){


        this.status =

            "ERROR";


        return false;

    }

}

/**
 * ======================================================
 * Runtime State Validation
 * ======================================================
 */

isOperational(){

    return (

        this.status ===

            "RUNNING"

        &&

        this.lifecycle

        &&

        this.registry

        &&

        this.events

    );

}

/**
 * ======================================================
 * Version Information
 * ======================================================
 */

getVersion(){

    return {

        name:

            this.name,

        version:

            this.version,

        build:

            this.build

    };

}

/**
 * ======================================================
 * Final Status
 * ======================================================
 */

getRuntimeState(){

    return {

        state:

            this.status,

        operational:

            this.isOperational(),

        lifecycle:

            this.lifecycle

                ?

            this.lifecycle.getState()

                :

            null,

        timestamp:

            new Date()

    };

}
    
}


/**
 * ==========================================================
 * Module Export
 * ==========================================================
 */


module.exports =

    SKOSRuntime;    
