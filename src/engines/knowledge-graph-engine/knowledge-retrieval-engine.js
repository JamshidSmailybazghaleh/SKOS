/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Retrieval Engine
 * File        : knowledge-retrieval-engine.js
 *
 * Build       : BUILD-000422
 * Version     : 1.0.0
 *
 * Mission:
 * Retrieve, rank and package knowledge resources
 * from SKOS knowledge infrastructure.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeRetrievalEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-RETRIEVAL-ENGINE";


        this.name =
            "Knowledge Retrieval Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000422";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;



        this.graph =
            options.graph || null;



        this.queryEngine =
            options.queryEngine || null;



        this.semanticEngine =
            options.semanticEngine || null;



        this.retrievalHistory =
            [];

    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_RETRIEVAL_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "KNOWLEDGE_RETRIEVAL_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Main retrieval operation
     */


    retrieve(

        request = {}

    ){


        if(

            !request.query

        ){


            throw new Error(

                "Retrieval query required."

            );

        }



        const candidates =

            this.collectCandidates(

                request

            );



        const ranked =

            this.rankResults(

                candidates,

                request

            );



        const packageResult = {


            id:

                this.generateId(),


            query:

                request.query,


            items:

                ranked.slice(

                    0,

                    request.limit || 10

                ),


            strategy:

                request.strategy ||

                "SEMANTIC",


            confidence:

                this.calculateConfidence(

                    ranked

                ),


            createdAt:

                new Date()

        };



        this.retrievalHistory.push(

            packageResult

        );



        this.recordEvent(

            "KNOWLEDGE_RETRIEVAL_COMPLETED",

            {

                retrievalId:

                    packageResult.id

            }

        );



        this.updateMetric(

            "retrievals"

        );



        return packageResult;

    }





    /**
     * Collect candidate knowledge
     */


    collectCandidates(

        request

    ){


        if(

            this.queryEngine

        ){


            const result =

                this.queryEngine.query(

                    {

                        text:

                            request.query

                    }

                );



            return result.results || [];

        }



        if(

            this.graph

        ){


            return this.graph.search(

                request.query

            );

        }



        return [];

    }





    /**
     * Rank retrieved knowledge
     */


    rankResults(

        items,

        request

    ){


        return items.map(

            item => {


                let score = 0;



                if(

                    item.score

                ){


                    score += item.score;

                }



                if(

                    item.node

                ){


                    score += 1;

                }



                return {


                    item,


                    relevance:

                        score,


                    query:

                        request.query


                };


            }

        )

        .sort(

            (

                a,

                b

            ) =>

                b.relevance -

                a.relevance

        );

    }





    /**
     * Confidence calculation
     */


    calculateConfidence(

        results

    ){


        if(

            results.length === 0

        )

            return 0;



        return Math.min(

            results[0].relevance /

            10,


            1

        );

    }





    generateId(){


        return (

            "RETRIEVAL-" +

            Date.now()

        );

    }





    getHistory(){


        return this.retrievalHistory;

    }





    clearHistory(){


        this.retrievalHistory =

            [];


        return true;

    }





    getStatistics(){


        return {


            retrievals:

                this.retrievalHistory.length,


            averageResults:

                this.retrievalHistory.length

                ?

                this.retrievalHistory

                .reduce(

                    (

                        sum,

                        item

                    ) =>

                        sum +

                        item.items.length,

                    0

                )

                /

                this.retrievalHistory.length

                :

                0


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

            "KNOWLEDGE_RETRIEVAL_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "KNOWLEDGE_RETRIEVAL_ENGINE_SHUTDOWN"

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

    KnowledgeRetrievalEngine;
