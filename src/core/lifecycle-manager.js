"use strict";

/**
 * ==========================================================
 * SKOS Lifecycle Manager
 * ==========================================================
 *
 * BUILD   : BUILD-000909.3
 * VERSION : 1.0.0
 *
 * Responsibility
 *
 * - Runtime Lifecycle
 * - Engine Startup
 * - Engine Shutdown
 * - State Management
 * - Lifecycle Events
 *
 * ==========================================================
 */


class LifecycleManager {


    constructor(options = {}) {


        this.name =

            "SKOS Lifecycle Manager";


        this.version =

            "1.0.0";


        this.state =

            "CREATED";


        this.runtime =

            null;


        this.registry =

            null;


        this.eventBus =

            null;


        this.metadata = {


            createdAt:

                new Date(),


            initializedAt:

                null,


            startedAt:

                null,


            stoppedAt:

                null


        };


    }
/**
 * ==========================================================
 * Runtime Context
 * ==========================================================
 */


setRuntime(

    runtime

){


    this.runtime =

        runtime;


    return true;


}

 setRegistry(

    registry

){


    this.registry =

        registry;


    return true;


}

setEventBus(

    eventBus

){


    this.eventBus =

        eventBus;


    return true;


}

/**
 * ==========================================================
 * State
 * ==========================================================
 */


getState(){


    return this.state;


}

setState(

    state

){


    this.state =

        state;


    return state;


}
    
/**
 * ==========================================================
 * Initialize Lifecycle
 * ==========================================================
 */

initialize(){

    if(
        this.state !== "CREATED"
    ){
        return false;
    }

    this.metadata.initializedAt =
        new Date();

    this.setState(
        "INITIALIZED"
    );

    if(
        this.eventBus
    ){
        this.eventBus.safeEmit(

            "SKOS.LIFECYCLE.INITIALIZED",

            {
                timestamp:
                    this.metadata.initializedAt
            }

        );
    }

    return true;

}

/**
 * ==========================================================
 * Runtime Start
 * ==========================================================
 */

start(){

    if(
        this.state !== "INITIALIZED"
    ){
        throw new Error(
            "Lifecycle must be initialized first."
        );
    }

    if(
        this.registry
    ){
        this.registry.startResolved();
    }

    this.metadata.startedAt =
        new Date();

    this.setState(
        "RUNNING"
    );

    if(
        this.eventBus
    ){
        this.eventBus.safeEmit(

            "SKOS.LIFECYCLE.STARTED",

            {
                timestamp:
                    this.metadata.startedAt
            }

        );
    }

    return true;

}

/**
 * ==========================================================
 * Pause Runtime
 * ==========================================================
 */

pause(){

    if(
        this.state !== "RUNNING"
    ){
        return false;
    }

    this.setState(
        "PAUSED"
    );

    if(
        this.eventBus
    ){
        this.eventBus.safeEmit(

            "SKOS.LIFECYCLE.PAUSED"

        );
    }

    return true;

}

/**
 * ==========================================================
 * Resume Runtime
 * ==========================================================
 */

resume(){

    if(
        this.state !== "PAUSED"
    ){
        return false;
    }

    this.setState(
        "RUNNING"
    );

    if(
        this.eventBus
    ){
        this.eventBus.safeEmit(

            "SKOS.LIFECYCLE.RESUMED"

        );
    }

    return true;

}

/**
 * ==========================================================
 * Runtime Stop
 * ==========================================================
 */

stop(){

    if(
        this.registry
    ){
        this.registry.stopAll();
    }

    this.metadata.stoppedAt =
        new Date();

    this.setState(
        "STOPPED"
    );

    if(
        this.eventBus
    ){
        this.eventBus.safeEmit(

            "SKOS.LIFECYCLE.STOPPED",

            {
                timestamp:
                    this.metadata.stoppedAt
            }

        );
    }

    return true;

}

/**
 * ==========================================================
 * Restart Runtime
 * ==========================================================
 */

restart(){

    this.stop();

    this.initialize();

    this.start();

    return true;

}

start()

this.registry.startResolved();


restart()

/**
 * ==========================================================
 * Runtime Health
 * ==========================================================
 */

health(){

    return{

        manager:

            this.name,

        version:

            this.version,

        state:

            this.state,

        runtime:

            this.runtime
                ? true
                : false,

        registry:

            this.registry
                ? true
                : false,

        eventBus:

            this.eventBus
                ? true
                : false,

        timestamp:

            new Date()

    };

}

/**
 * ==========================================================
 * Runtime Snapshot
 * ==========================================================
 */

snapshot(){

    return{

        lifecycle:{

            state:

                this.state,

            metadata:

                this.metadata

        },

        health:

            this.health(),

        registry:

            this.registry
                ? this.registry.snapshot()
                : null

    };

}

this.timeline = [];
    
/**
 * ==========================================================
 * Timeline
 * ==========================================================
 */

record(

    action

){

    this.timeline.push({

        action,

        state:

            this.state,

        timestamp:

            new Date()

    });

}

initialize()

start()

pause()

resume()

stop()

restart()    

this.record(
    "INITIALIZE"
);

START
PAUSE
RESUME
STOP
RESTART    

getTimeline(){

    return[
        ...this.timeline
    ];

}

/**
 * ==========================================================
 * Recovery
 * ==========================================================
 */

recover(){

    if(
        this.state ===
        "RUNNING"
    ){
        return true;
    }

    try{

        if(
            this.state ===
            "STOPPED"
        ){

            this.initialize();

            this.start();

        }

        return true;

    }

    catch(error){

        if(
            this.eventBus
        ){

            this.eventBus.safeEmit(

                "SKOS.LIFECYCLE.RECOVERY_FAILED",

                {

                    error:

                        error.message

                }

            );

        }

        return false;

    }

}
    
/**
 * ==========================================================
 * Graceful Shutdown
 * ==========================================================
 */

gracefulShutdown(){

    if(
        this.registry
    ){

        this.registry.stopAll();

    }

    this.setState(

        "SHUTDOWN"

    );

    this.record(

        "GRACEFUL_SHUTDOWN"

    );

    return true;

}

/**
 * ==========================================================
 * Lifecycle Report
 * ==========================================================
 */

report(){

    return{

        state:

            this.state,

        metadata:

            this.metadata,

        timeline:

            this.getTimeline(),

        health:

            this.health()

    };

}

    
    
