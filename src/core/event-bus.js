"use strict";

/**
 * ==========================================================
 * SKOS Event Bus
 * ==========================================================
 *
 * BUILD   : BUILD-000909.3
 * VERSION : 1.0.0
 *
 * Responsibility:
 *
 * - Event Publishing
 * - Event Subscription
 * - Inter-Module Communication
 * - Runtime Messaging
 *
 * ==========================================================
 */


class EventBus {


    constructor(options = {}) {


        this.name =

            "SKOS Event Bus";


        this.version =

            "1.0.0";


        this.events =

            new Map();



        this.status =

            "CREATED";



        this.metadata = {


            createdAt:

                new Date(),


            emitted:

                0,


            listeners:

                0



        };


    }

/**
 * ==========================================================
 * Lifecycle
 * ==========================================================
 */


initialize(){


    this.status =

        "READY";


    return true;


}

/**
 * ==========================================================
 * Event Subscription
 * ==========================================================
 */


on(

    event,

    handler

){



    if(

        !this.events.has(

            event

        )

    ){


        this.events.set(

            event,

            []

        );


    }



    this.events

        .get(event)

        .push(

            handler

        );



    this.metadata.listeners++;



    return true;


}
  
hasListener(

    event

){


    return (

        this.events.has(

            event

        )

        &&

        this.events.get(

            event

        ).length > 0

    );


}

id="eventp201"
    /**
     * ==========================================================
     * Event Emission
     * ==========================================================
     */


    emit(

        event,

        payload = {}

    ){


        const listeners =

            this.events.get(

                event

            )

            ||

            [];



        const result = [];



        for(

            const handler

            of

            listeners

        ){



            try {


                const response =

                    handler(

                        payload

                    );



                result.push(

                    {


                        success:

                            true,


                        result:

                            response



                    }

                );



            }

            catch(error){



                result.push(


                    {


                        success:

                            false,


                        error:

                            error.message



                    }


                );


            }


        }



        this.metadata.emitted++;



        return result;


    }

id="eventp202"
    /**
     * ==========================================================
     * Async Event Emission
     * ==========================================================
     */


    async emitAsync(

        event,

        payload = {}

    ){



        const listeners =

            this.events.get(

                event

            )

            ||

            [];



        const results = [];



        for(

            const handler

            of

            listeners

        ){



            try {



                const response =

                    await handler(

                        payload

                    );



                results.push(


                    {


                        success:

                            true,


                        result:

                            response



                    }


                );



            }

            catch(error){



                results.push(


                    {


                        success:

                            false,


                        error:

                            error.message



                    }


                );


            }


        }



        this.metadata.emitted++;



        return results;


    }

  id="eventp203"
/**
 * ==========================================================
 * Remove Listener
 * ==========================================================
 */


off(

    event,

    handler

){



    if(

        !this.events.has(

            event

        )

    ){

        return false;

    }



    const listeners =

        this.events.get(

            event

        );



    const filtered =

        listeners.filter(

            item =>

                item !== handler

        );



    this.events.set(

        event,

        filtered

    );



    return true;


}

id="eventp204"
/**
 * Remove All Listeners
 */


clear(

    event = null

){



    if(

        event

    ){


        this.events.delete(

            event

        );


    }

    else {


        this.events.clear();


    }



    return true;


}

id="eventp205"
/**
 * ==========================================================
 * Event Inspection
 * ==========================================================
 */


getListeners(

    event

){



    return (

        this.events.get(

            event

        )

        ||

        []

    );


}

this.history = [];

this.maxHistory =

    options.maxHistory ||

    1000;

  /**
 * ==========================================================
 * Event History
 * ==========================================================
 */


recordHistory(

    event,

    payload = {}

){


    this.history.push({


        event,


        payload,


        timestamp:

            new Date()



    });



    if(

        this.history.length >

        this.maxHistory

    ){


        this.history.shift();


    }


}

emit()

  return result;

  this.recordHistory(

    event,

    payload

);

/**
 * Get Event History
 */


getHistory(

    limit = null

){


    if(!limit){


        return [

            ...this.history

        ];


    }



    return this.history.slice(

        -limit

    );


}  
  
/**
 * ==========================================================
 * Event Replay
 * ==========================================================
 */


replay(

    eventName = null

){


    const events =

        eventName

        ?

        this.history.filter(

            item =>

                item.event === eventName

        )

        :

        this.history;



    for(

        const item

        of

        events

    ){



        this.emit(

            item.event,

            item.payload

        );


    }



    return true;


}

this.wildcardListeners = [];
  
 /**
 * Wildcard Subscription
 */


onAny(

    handler

){


    this.wildcardListeners.push(

        handler

    );


    return true;


} 
  
for(

    const handler

    of

    this.wildcardListeners

){


    handler({

        event,

        payload


    });


}

on(

    event,

    handler,

    priority = 0

){


    if(

        !this.events.has(event)

    ){


        this.events.set(

            event,

            []

        );


    }



    this.events

        .get(event)

        .push({


            handler,


            priority



        });



    this.events

        .get(event)

        .sort(

            (a,b)=>

                b.priority -

                a.priority

        );



    return true;


}

for(

 const handler of listeners

)

for(

    const listener

    of

    listeners

){


    const handler =

        listener.handler;



    ...


}

this.queue = [];


this.processingQueue = false;


this.middlewares = [];


this.errorHandlers = [];

/**
 * ==========================================================
 * Middleware Pipeline
 * ==========================================================
 */


use(

    middleware

){


    if(

        typeof middleware !==

        "function"

    ){

        throw new Error(

            "Middleware must be a function."

        );

    }



    this.middlewares.push(

        middleware

    );



    return true;


}

runMiddleware(

    event,

    payload

){


    let context = {


        event,


        payload



    };



    for(

        const middleware

        of

        this.middlewares

    ){



        context =

            middleware(

                context

            )

            ||

            context;


    }



    return context;


}

/**
 * ==========================================================
 * Event Queue
 * ==========================================================
 */


enqueue(

    event,

    payload = {}

){



    this.queue.push({


        event,


        payload,


        timestamp:

            new Date()



    });



    this.processQueue();



    return true;


}

async processQueue(){



    if(

        this.processingQueue

    ){

        return;

    }



    this.processingQueue = true;



    while(

        this.queue.length > 0

    ){


        const item =

            this.queue.shift();



        try {



            await this.emitAsync(

                item.event,

                item.payload

            );



        }

        catch(error){



            this.handleError(

                error,

                item

            );


        }


    }



    this.processingQueue = false;


}

/**
 * ==========================================================
 * Error Isolation
 * ==========================================================
 */


onError(

    handler

){


    if(

        typeof handler !==

        "function"

    ){

        return false;

    }



    this.errorHandlers.push(

        handler

    );



    return true;


}

handleError(

    error,

    context = {}

){



    for(

        const handler

        of

        this.errorHandlers

    ){


        try{


            handler(

                {


                    error,


                    context



                }

            );


        }

        catch(e){


            console.error(

                e

            );


        }


    }


}

/**
 * Safe Event Emit
 */


safeEmit(

    event,

    payload = {}

){


    try {



        const context =

            this.runMiddleware(

                event,

                payload

            );



        return this.emit(

            context.event,

            context.payload

        );


    }


    catch(error){



        this.handleError(

            error,

            {


                event,


                payload



            }

        );



        return false;


    }


}

this.schemas =

    new Map();


this.metrics = {


    totalEvents:

        0,


    failedEvents:

        0,


    successfulEvents:

        0



};

SKOS.KNOWLEDGE.CREATED

SKOS.AI.REASONING.STARTED

SKOS.SYSTEM.ERROR

/**
 * ==========================================================
 * Event Namespace
 * ==========================================================
 */


createNamespace(

    domain,

    action

){


    return (

        `SKOS.${domain}.${action}`

    createNamespace(

        domain,

        action

    ){


        if(

            !domain ||

            !action

        ){


            throw new Error(

                "Event namespace requires domain and action."

            );


        }



        return (

            `SKOS.${domain}.${action}`

                .toUpperCase()

        );


    }

/**
 * ==========================================================
 * Namespace Validation
 * ==========================================================
 */


validateNamespace(

    event

){



    if(

        typeof event !==

        "string"

    ){

        return false;

    }



    return event.startsWith(

        "SKOS."

    );


}

/**
 * ==========================================================
 * Namespaced Event Registration
 * ==========================================================
 */


registerEvent(

    event,

    schema = null

){


    if(

        !this.validateNamespace(

            event

        )

    ){


        throw new Error(

            `Invalid event namespace: ${event}`

        );


    }



    if(

        schema

    ){


        this.registerSchema(

            event,

            schema

        );


    }



    if(

        !this.events.has(

            event

        )

    ){


        this.events.set(

            event,

            []

        );


    }



    return true;


}

const EVENT =

eventBus.createNamespace(

    "KNOWLEDGE",

    "CREATED"

);

SKOS.KNOWLEDGE.CREATED

eventBus.emitValidated(

    "SKOS.KNOWLEDGE.CREATED",

    {

        id:

        "KNOW-00001"

    }

);

/**
 * ==========================================================
 * Runtime Status
 * ==========================================================
 */


getStatus(){


    return {


        name:

            this.name,


        version:

            this.version,


        status:

            this.status,


        events:

            this.events.size,


        listeners:

            this.metadata.listeners,


        emitted:

            this.metadata.emitted



    };


}

/**
 * ==========================================================
 * Health Monitoring
 * ==========================================================
 */


health(){


    return {


        healthy:

            this.status ===

            "READY",



        status:

            this.status,



        queueSize:

            this.queue.length,



        historySize:

            this.history.length,



        metrics:

            this.getMetrics(),



        timestamp:

            new Date()



    };


}

/**
 * ==========================================================
 * Full Snapshot
 * ==========================================================
 */


snapshot(){


    return {


        identity:{


            name:

                this.name,


            version:

                this.version



        },



        status:

            this.getStatus(),



        health:

            this.health(),



        events:


            Array.from(

                this.events.keys()

            ),



        schemas:


            Array.from(

                this.schemas.keys()

            ),



        history:


            this.getHistory(50),



        metrics:

            this.getMetrics()



    };


}

/**
 * ==========================================================
 * Resource Cleanup
 * ==========================================================
 */


destroy(){


    this.clear();



    this.history =

        [];



    this.queue =

        [];



    this.middlewares =

        [];



    this.errorHandlers =

        [];



    this.status =

        "DESTROYED";



    return true;


}

/**
 * ==========================================================
 * Shutdown
 * ==========================================================
 */


shutdown(){



    this.status =

        "SHUTDOWN";



    this.clear();



    return true;


}

this.events = new Map();

this.history = [];

this.queue = [];

this.middlewares = [];

this.errorHandlers = [];

this.wildcardListeners = [];

this.schemas = new Map();

this.metrics = {

    totalEvents: 0,

    failedEvents: 0,

    successfulEvents: 0

};


}


module.exports = EventBus;
