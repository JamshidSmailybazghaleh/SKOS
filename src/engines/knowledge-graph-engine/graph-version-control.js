/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Engine      : Knowledge Graph Engine
 * File        : graph-version-control.js
 *
 * Build       : BUILD-000374
 * Version     : 1.0.0
 *
 * Mission:
 * Manage Knowledge Graph versions,
 * snapshots, history and rollback.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class GraphVersionControl {


    constructor(options = {}) {


        this.name =
            "Graph Version Control";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.monitoring =
            options.monitoring || null;


        this.currentVersion =
            0;


        this.snapshots =
            new Map();


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordEvent(

            "GRAPH_VERSION_CONTROL_INITIALIZED"

        );


        return true;

    }





    /**
     * Create graph snapshot
     */


    createSnapshot(graph, message = "") {


        if (

            !graph

        ) {

            throw new Error(

                "Graph data is required."

            );

        }



        this.currentVersion++;



        const snapshot = {


            version:

                this.currentVersion,


            message,


            timestamp:

                new Date(),


            graph:

                JSON.parse(

                    JSON.stringify(graph)

                )


        };



        this.snapshots.set(

            this.currentVersion,

            snapshot

        );



        this.history.push(

            {

                action:

                    "SNAPSHOT_CREATED",


                version:

                    this.currentVersion,


                timestamp:

                    new Date()

            }

        );



        this.recordEvent(

            "GRAPH_SNAPSHOT_CREATED",

            {

                version:

                    this.currentVersion

            }

        );



        this.updateMetric(

            "snapshotsCreated"

        );



        return snapshot;

    }





    /**
     * Get snapshot
     */


    getSnapshot(version) {


        return (

            this.snapshots.get(version)

            ||

            null

        );

    }





    /**
     * Latest snapshot
     */


    getLatestSnapshot() {


        return (

            this.snapshots.get(

                this.currentVersion

            )

            ||

            null

        );

    }





    /**
     * Rollback graph
     */


    rollback(version) {


        const snapshot =

            this.getSnapshot(

                version

            );



        if (

            !snapshot

        ) {

            throw new Error(

                "Snapshot not found."

            );

        }



        this.history.push(

            {

                action:

                    "ROLLBACK",


                version,


                timestamp:

                    new Date()

            }

        );



        this.recordEvent(

            "GRAPH_ROLLBACK_EXECUTED",

            {

                version

            }

        );



        return JSON.parse(

            JSON.stringify(

                snapshot.graph

            )

        );

    }





    /**
     * Compare versions
     */


    compareVersions(

        versionA,

        versionB

    ) {


        const first =

            this.getSnapshot(

                versionA

            );


        const second =

            this.getSnapshot(

                versionB

            );



        if (

            !first ||

            !second

        ) {

            throw new Error(

                "Version not found."

            );

        }



        return {


            from:

                versionA,


            to:

                versionB,


            nodeDifference:

                second.graph.nodes.length

                -

                first.graph.nodes.length,


            edgeDifference:

                second.graph.edges.length

                -

                first.graph.edges.length


        };

    }





    /**
     * Version history
     */


    getHistory() {


        return this.history;

    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            currentVersion:

                this.currentVersion,


            snapshots:

                this.snapshots.size


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

            "GRAPH_VERSION_CONTROL_SHUTDOWN"

        );


        return true;

    }


}



module.exports =

    GraphVersionControl;
