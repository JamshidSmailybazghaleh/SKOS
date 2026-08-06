/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Intelligence Layer
 * File        : knowledge-context-engine.js
 *
 * Build       : BUILD-000911.3
 * Version     : 1.0.0
 *
 * Mission:
 * Manage contextual meaning, relevance and applicability
 * of knowledge objects.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeContextEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-CONTEXT-ENGINE";


        this.name =
            "Knowledge Context Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000911.3";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.contexts =
            new Map();


        this.activeContexts =
            new Map();


        this.contextHistory =
            [];

    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_CONTEXT_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "KNOWLEDGE_CONTEXT_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Create context
     */


    createContext(

        contextId,

        definition = {}

    ){


        if(!contextId){


            throw new Error(

                "Context id required."

            );

        }



        const context = {


            id:

                contextId,


            domain:

                definition.domain || "GENERAL",


            user:

                definition.user || null,


            purpose:

                definition.purpose || null,


            location:

                definition.location || null,


            time:

                definition.time || new Date(),


            tags:

                definition.tags || [],


            metadata:

                definition.metadata || {},


            active:

                true,


            createdAt:

                new Date()

        };



        this.contexts.set(

            contextId,

            context

        );



        this.recordEvent(

            "CONTEXT_CREATED",

            {

                contextId

            }

        );



        return context;

    }





    /**
     * Activate context
     */


    activateContext(

        contextId

    ){


        const context =

            this.contexts.get(

                contextId

            );



        if(!context){


            throw new Error(

                "Context not found."

            );

        }



        this.activeContexts.set(

            contextId,

            context

        );



        context.active = true;



        this.contextHistory.push({


            action:

                "ACTIVATED",


            contextId,


            timestamp:

                new Date()


        });



        return context;

    }





    /**
     * Deactivate context
     */


    deactivateContext(

        contextId

    ){


        const context =

            this.contexts.get(

                contextId

            );



        if(context){


            context.active = false;

        }



        this.activeContexts.delete(

            contextId

        );



        return context;

    }





    /**
     * Evaluate relevance
     */


    evaluateRelevance(

        knowledge,

        context

    ){


        let score = 0;



        if(

            knowledge.domain &&

            knowledge.domain === context.domain

        ){


            score += 0.4;

        }



        if(

            knowledge.tags &&

            context.tags

        ){


            const overlap =

                knowledge.tags.filter(

                    tag =>

                        context.tags.includes(tag)

                );



            score +=

                overlap.length * 0.1;

        }



        if(

            knowledge.purpose &&

            knowledge.purpose === context.purpose

        ){


            score += 0.3;

        }



        return {


            knowledgeId:

                knowledge.id || null,


            contextId:

                context.id,


            relevance:

                Math.min(

                    score,

                    1

                ),


            evaluatedAt:

                new Date()

        };

    }





    /**
     * Find active contexts
     */


    getActiveContexts(){


        return Array.from(

            this.activeContexts.values()

        );

    }





    /**
     * Get context
     */


    getContext(

        contextId

    ){


        return (

            this.contexts.get(

                contextId

            )

            ||

            null

        );

    }





    /**
     * Update context metadata
     */


    updateContext(

        contextId,

        updates = {}

    ){


        const context =

            this.contexts.get(

                contextId

            );



        if(!context){


            return null;

        }



        Object.assign(

            context,

            updates

        );



        return context;

    }





    /**
     * Context history
     */


    getHistory(){


        return this.contextHistory;

    }





    /**
     * Statistics
     */


    getStatistics(){


        return {


            contexts:

                this.contexts.size,


            active:

                this.activeContexts.size,


            history:

                this.contextHistory.length


        };

    }





    getStatus(){


        return {


            engineId:

                this.engineId,


            name:

                this.name,


            version:

                this.version,


            build:

                this.build,


            status:

                this.status,


            statistics:

                this.getStatistics()


        };

    }





    stop(){


        this.status =
            "STOPPED";


        this.recordEvent(

            "KNOWLEDGE_CONTEXT_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "KNOWLEDGE_CONTEXT_ENGINE_SHUTDOWN"

        );


        return true;

    }





    recordEvent(

        event,

        metadata = {}

    ){


        if(this.monitoring){


            this.monitoring.recordEvent(

                event,

                metadata

            );

        }

    }





    updateMetric(

        metric

    ){


        if(this.monitoring){


            this.monitoring.updateMetric(

                metric

            );

        }

    }


}



module.exports =

    KnowledgeContextEngine;
