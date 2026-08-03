/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-reasoning-engine.js
 *
 * Build       : BUILD-000378
 * Version     : 1.0.0
 *
 * Mission:
 * Perform inference and reasoning over
 * Knowledge Graph relationships.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphReasoningEngine {


    constructor(options = {}) {


        this.name =
            "Graph Reasoning Engine";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.rules =
            [];


        this.inferences =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_REASONING_ENGINE_INITIALIZED"

        );


        return true;

    }





    /**
     * Add reasoning rule
     */


    addRule(

        rule

    ) {


        if (

            !rule ||

            !rule.name ||

            !rule.condition ||

            !rule.conclusion

        ) {


            throw new Error(

                "Invalid reasoning rule."

            );

        }



        this.rules.push(

            rule

        );



        this.recordEvent(

            "REASONING_RULE_ADDED",

            {

                rule:

                    rule.name

            }

        );


        return rule;

    }





    /**
     * Execute reasoning process
     */


    reason(graph) {


        if (

            !graph ||

            !graph.nodes ||

            !graph.edges

        ) {


            throw new Error(

                "Invalid graph."

            );

        }



        this.inferences = [];



        this.rules.forEach(

            rule => {


                const result =

                    rule.condition(

                        graph

                    );



                if (

                    result

                ) {


                    const inference =

                        rule.conclusion(

                            graph

                        );



                    this.inferences.push(

                        {

                            rule:

                                rule.name,


                            result:

                                inference,


                            timestamp:

                                new Date()

                        }

                    );

                }


            }

        );



        this.recordEvent(

            "GRAPH_REASONING_COMPLETED",

            {

                inferenceCount:

                    this.inferences.length

            }

        );


        this.updateMetric(

            "reasoningExecutions"

        );



        return this.inferences;

    }





    /**
     * Simple relationship inference
     */


    inferRelationship(

        graph,

        source,

        relation,

        target

    ) {


        const exists =

            graph.edges.some(

                edge =>

                    edge.from === source &&

                    edge.type === relation &&

                    edge.to === target

            );



        return exists;

    }





    /**
     * Find possible transitive relations
     */


    findTransitiveRelations(

        graph,

        relationType

    ) {


        const results = [];



        graph.edges.forEach(

            first => {


                if (

                    first.type !== relationType

                ) {

                    return;

                }



                graph.edges.forEach(

                    second => {


                        if (

                            second.type === relationType &&

                            first.to === second.from

                        ) {


                            results.push(

                                {

                                    from:

                                        first.from,


                                    to:

                                        second.to,


                                    inferredBy:

                                        "TRANSITIVE_RULE"

                                }

                            );

                        }


                    }

                );


            }

        );



        return results;

    }





    /**
     * Get inference results
     */


    getInferences() {


        return this.inferences;

    }





    clearInferences() {


        this.inferences = [];


        return true;

    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            rules:

                this.rules.length,


            inferences:

                this.inferences.length


        };

    }





    recordEvent(

        event,

        metadata = {}

    ) {


        if (

            this.monitoring

        ) {


            this.monitoring.recordEvent(

                event,

                metadata

            );

        }

    }





    updateMetric(

        metric

    ) {


        if (

            this.monitoring

        ) {


            this.monitoring.updateMetric(

                metric

            );

        }

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordEvent(

            "GRAPH_REASONING_ENGINE_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    GraphReasoningEngine;
