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
}

module.exports = SKOSRuntime;
