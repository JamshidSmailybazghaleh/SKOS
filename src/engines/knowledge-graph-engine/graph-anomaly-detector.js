/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-anomaly-detector.js
 *
 * Build       : BUILD-000384
 * Version     : 1.0.0
 *
 * Mission:
 * Detect abnormal structures,
 * inconsistent behaviors and
 * suspicious patterns inside
 * Knowledge Graph.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphAnomalyDetector {


    constructor(options = {}) {


        this.name =
            "Graph Anomaly Detector";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.anomalies =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_ANOMALY_DETECTOR_INITIALIZED"

        );


        return true;

    }





    /**
     * Analyze graph for anomalies
     */


    analyze(graph) {


        if (

            !graph ||

            !graph.nodes ||

            !graph.edges

        ) {


            throw new Error(

                "Invalid graph."

            );

        }



        this.anomalies = [];



        this.detectOrphanNodes(

            graph

        );



        this.detectSelfRelations(

            graph

        );



        this.detectDuplicateRelations(

            graph

        );



        this.recordEvent(

            "GRAPH_ANOMALY_ANALYSIS_COMPLETED",

            {

                count:

                    this.anomalies.length

            }

        );


        this.updateMetric(

            "anomaliesDetected"

        );



        return this.anomalies;

    }





    /**
     * Detect nodes without relations
     */


    detectOrphanNodes(graph) {


        graph.nodes.forEach(

            node => {


                const connected =

                    graph.edges.some(

                        edge =>


                            edge.from === node.id

                            ||

                            edge.to === node.id

                    );



                if (

                    !connected

                ) {


                    this.anomalies.push(

                        {

                            type:

                                "ORPHAN_NODE",


                            node:

                                node.id,


                            severity:

                                "MEDIUM"

                        }

                    );

                }


            }

        );

    }





    /**
     * Detect self references
     */


    detectSelfRelations(graph) {


        graph.edges.forEach(

            edge => {


                if (

                    edge.from === edge.to

                ) {


                    this.anomalies.push(

                        {

                            type:

                                "SELF_RELATION",


                            edge,


                            severity:

                                "HIGH"

                        }

                    );

                }


            }

        );


    }





    /**
     * Detect duplicated relations
     */


    detectDuplicateRelations(graph) {


        const registry =

            new Set();



        graph.edges.forEach(

            edge => {


                const key =

                    `${edge.from}:${edge.to}:${edge.type}`;



                if (

                    registry.has(key)

                ) {


                    this.anomalies.push(

                        {

                            type:

                                "DUPLICATE_RELATION",


                            relation:

                                edge,


                            severity:

                                "MEDIUM"

                        }

                    );

                }



                registry.add(

                    key

                );


            }

        );


    }





    /**
     * Add manual anomaly
     */


    addAnomaly(anomaly) {


        this.anomalies.push(

            anomaly

        );


        return anomaly;

    }





    /**
     * Get anomalies
     */


    getAnomalies() {


        return this.anomalies;

    }





    /**
     * Clear anomalies
     */


    clearAnomalies() {


        this.anomalies = [];


        return true;

    }





    /**
     * Statistics
     */


    getStatistics() {


        return {


            total:

                this.anomalies.length,


            high:

                this.anomalies.filter(

                    item =>

                        item.severity ===

                        "HIGH"

                ).length,


            medium:

                this.anomalies.filter(

                    item =>

                        item.severity ===

                        "MEDIUM"

                ).length,


            low:

                this.anomalies.filter(

                    item =>

                        item.severity ===

                        "LOW"

                ).length


        };

    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            anomalies:

                this.anomalies.length


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

            "GRAPH_ANOMALY_DETECTOR_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    GraphAnomalyDetector;
