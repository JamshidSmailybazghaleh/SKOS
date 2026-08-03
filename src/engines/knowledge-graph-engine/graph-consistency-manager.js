/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-consistency-manager.js
 *
 * Build       : BUILD-000376
 * Version     : 1.0.0
 *
 * Mission:
 * Validate Knowledge Graph integrity,
 * detect conflicts and maintain
 * consistency of knowledge relationships.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphConsistencyManager {


    constructor(options = {}) {


        this.name =
            "Graph Consistency Manager";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.issues =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_CONSISTENCY_MANAGER_INITIALIZED"

        );


        return true;

    }





    /**
     * Validate complete graph
     */


    validate(graph) {


        if (

            !graph ||

            !graph.nodes ||

            !graph.edges

        ) {

            throw new Error(

                "Invalid graph structure."

            );

        }



        this.issues = [];



        this.checkDuplicateNodes(

            graph

        );


        this.checkBrokenRelations(

            graph

        );


        this.checkDuplicateRelations(

            graph

        );



        const result = {


            valid:

                this.issues.length === 0,


            issues:

                this.issues,


            checkedNodes:

                graph.nodes.length,


            checkedRelations:

                graph.edges.length


        };



        this.recordEvent(

            "GRAPH_CONSISTENCY_VALIDATED",

            result

        );


        this.updateMetric(

            "consistencyChecks"

        );



        return result;

    }





    /**
     * Duplicate node detection
     */


    checkDuplicateNodes(graph) {


        const ids =

            new Set();



        graph.nodes.forEach(

            node => {


                if (

                    ids.has(node.id)

                ) {


                    this.addIssue(

                        "DUPLICATE_NODE",

                        {

                            id:

                                node.id

                        }

                    );

                }



                ids.add(

                    node.id

                );


            }

        );


    }





    /**
     * Broken relationship detection
     */


    checkBrokenRelations(graph) {


        const nodeIds =

            new Set(

                graph.nodes.map(

                    node => node.id

                )

            );



        graph.edges.forEach(

            edge => {


                if (

                    !nodeIds.has(

                        edge.from

                    )

                    ||

                    !nodeIds.has(

                        edge.to

                    )

                ) {


                    this.addIssue(

                        "BROKEN_RELATION",

                        edge

                    );

                }


            }

        );


    }





    /**
     * Duplicate edge detection
     */


    checkDuplicateRelations(graph) {


        const relations =

            new Set();



        graph.edges.forEach(

            edge => {


                const key =

                    `${edge.from}:${edge.to}:${edge.type}`;



                if (

                    relations.has(key)

                ) {


                    this.addIssue(

                        "DUPLICATE_RELATION",

                        {

                            relation:

                                key

                        }

                    );

                }



                relations.add(

                    key

                );


            }

        );


    }





    /**
     * Register issue
     */


    addIssue(

        type,

        metadata

    ) {


        this.issues.push(

            {

                type,


                metadata,


                detectedAt:

                    new Date()

            }

        );


    }





    /**
     * Get detected issues
     */


    getIssues() {


        return this.issues;

    }





    /**
     * Resolve issue manually
     */


    clearIssues() {


        this.issues = [];


        this.recordEvent(

            "GRAPH_CONSISTENCY_ISSUES_CLEARED"

        );


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


            issues:

                this.issues.length


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

            "GRAPH_CONSISTENCY_MANAGER_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    GraphConsistencyManager;
