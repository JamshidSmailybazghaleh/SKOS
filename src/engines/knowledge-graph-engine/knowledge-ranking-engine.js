/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Ranking Engine
 * File        : knowledge-ranking-engine.js
 *
 * Build       : BUILD-000423
 * Version     : 1.0.0
 *
 * Mission:
 * Evaluate, score and rank knowledge resources
 * based on quality, trust and relevance.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeRankingEngine {


    constructor(options = {}) {


        this.engineId =
            "KNOWLEDGE-RANKING-ENGINE";


        this.name =
            "Knowledge Ranking Engine";


        this.version =
            "1.0.0";


        this.build =
            "BUILD-000423";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;



        this.rankingHistory =
            [];

    }





    initialize(){


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "KNOWLEDGE_RANKING_ENGINE_INITIALIZED"

        );


        return true;

    }





    start(){


        this.status =
            "RUNNING";


        this.recordEvent(

            "KNOWLEDGE_RANKING_ENGINE_STARTED"

        );


        return true;

    }





    /**
     * Rank knowledge collection
     */


    rank(

        items = [],

        criteria = {}

    ){


        if(

            !Array.isArray(items)

        ){


            throw new Error(

                "Ranking items must be array."

            );

        }



        const ranked =

            items.map(

                item => {


                    const scores =

                        this.calculateScores(

                            item,

                            criteria

                        );



                    return {


                        item,


                        scores,


                        finalScore:

                            this.calculateFinalScore(

                                scores

                            )


                    };


                }

            )

            .sort(

                (

                    a,

                    b

                ) =>

                    b.finalScore -

                    a.finalScore

            );



        const result = {


            count:

                ranked.length,


            ranked,


            createdAt:

                new Date()

        };



        this.rankingHistory.push(

            result

        );



        this.recordEvent(

            "KNOWLEDGE_RANKING_COMPLETED",

            {

                count:

                    ranked.length

            }

        );



        this.updateMetric(

            "rankings"

        );



        return result;

    }





    /**
     * Calculate ranking factors
     */


    calculateScores(

        item,

        criteria

    ){


        return {


            relevance:

                this.normalize(

                    criteria.relevance ??

                    item.relevance ??

                    0.5

                ),



            quality:

                this.normalize(

                    criteria.quality ??

                    item.quality ??

                    0.5

                ),



            trust:

                this.normalize(

                    criteria.trust ??

                    item.trust ??

                    0.5

                ),



            freshness:

                this.normalize(

                    criteria.freshness ??

                    item.freshness ??

                    0.5

                ),



            verification:

                this.normalize(

                    criteria.verification ??

                    item.verification ??

                    0.5

                )

        };

    }





    /**
     * Final score calculation
     */


    calculateFinalScore(

        scores

    ){


        const values =

            Object.values(

                scores

            );



        return (

            values.reduce(

                (

                    sum,

                    value

                ) =>

                    sum + value,

                0

            )

            /

            values.length

        );

    }





    /**
     * Normalize score
     */


    normalize(

        value

    ){


        if(

            value > 1

        )

            return 1;



        if(

            value < 0

        )

            return 0;



        return value;

    }





    /**
     * Get ranking history
     */


    getHistory(){


        return this.rankingHistory;

    }





    clearHistory(){


        this.rankingHistory =

            [];


        return true;

    }





    /**
     * Statistics
     */


    getStatistics(){


        return {


            rankingOperations:

                this.rankingHistory.length,


            rankedItems:

                this.rankingHistory.reduce(

                    (

                        total,

                        item

                    ) =>

                        total +

                        item.count,

                    0

                )

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

            "KNOWLEDGE_RANKING_ENGINE_STOPPED"

        );


        return true;

    }





    shutdown(){


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "KNOWLEDGE_RANKING_ENGINE_SHUTDOWN"

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

    KnowledgeRankingEngine;
