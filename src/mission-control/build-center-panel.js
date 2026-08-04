/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Build Center Panel
 * File      : build-center-panel.js
 *
 * Build     : BUILD-000816.1
 * Version   : 1.0.0
 *
 * Mission:
 * Provide centralized visibility into
 * SKOS build lifecycle, releases,
 * sprints and development pipeline.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class BuildCenterPanel {


    constructor(

        liveController = null,

        options = {}

    ) {


        this.name =
            "Build Center Panel";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.liveController =
            liveController;


        this.options =
            options;


        this.currentBuild =
            null;


        this.currentSprint =
            null;


        this.currentRelease =
            null;


        this.pipeline =
            [];


        this.history =
            [];


        this.lastSnapshot =
            null;

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordHistory({

            type:
                "BUILD_CENTER_INITIALIZED",

            timestamp:
                new Date()

        });


        return true;

    }





    connectController(

        controller

    ) {


        if (!controller) {


            throw new Error(

                "Live controller required."

            );

        }



        this.liveController =
            controller;



        this.status =
            "CONNECTED";



        this.recordHistory({

            type:
                "CONTROLLER_CONNECTED",

            timestamp:
                new Date()

        });



        return true;

    }





    setBuild(

        buildId,

        metadata = {}

    ) {


        if (!buildId) {


            throw new Error(

                "Build id required."

            );

        }



        this.currentBuild = {


            id:

                buildId,


            version:

                metadata.version ||
                "1.0.0",


            status:

                metadata.status ||
                "ACTIVE",


            createdAt:

                new Date()

        };



        return this.currentBuild;

    }





    setSprint(

        sprintId,

        metadata = {}

    ) {


        if (!sprintId) {


            throw new Error(

                "Sprint id required."

            );

        }



        this.currentSprint = {


            id:

                sprintId,


            title:

                metadata.title ||
                sprintId,


            status:

                metadata.status ||
                "ACTIVE"

        };



        return this.currentSprint;

    }





    setRelease(

        releaseId,

        metadata = {}

    ) {


        if (!releaseId) {


            throw new Error(

                "Release id required."

            );

        }



        this.currentRelease = {


            id:

                releaseId,


            version:

                metadata.version ||
                releaseId,


            status:

                metadata.status ||
                "PLANNED"

        };



        return this.currentRelease;

    }





    addPipelineStage(

        stage

    ) {


        if (!stage) {


            throw new Error(

                "Pipeline stage required."

            );

        }



        this.pipeline.push({

            name:

                stage.name ||
                stage,


            status:

                stage.status ||
                "PENDING",


            timestamp:

                new Date()

        });



        return true;

    }





    updatePipelineStage(

        stageName,

        status

    ) {


        const stage =

            this.pipeline.find(

                item =>

                    item.name === stageName

            );



        if (!stage) {


            throw new Error(

                "Pipeline stage not found."

            );

        }



        stage.status =
            status;



        return stage;

    }





    generateView() {


        if (!this.liveController) {


            throw new Error(

                "Live controller not connected."

            );

        }



        const runtime =

            this.liveController
                .getSnapshot();



        const view = {


            title:

                this.name,


            build:

                this.currentBuild,


            sprint:

                this.currentSprint,


            release:

                this.currentRelease,


            pipeline:

                this.pipeline,


            runtime:

                runtime
                    ? runtime.system
                    : null,


            updatedAt:

                new Date()

        };



        this.lastSnapshot =
            view;



        this.recordHistory({

            type:

                "BUILD_VIEW_GENERATED",

            timestamp:

                new Date()

        });



        return view;

    }





    refresh() {


        return this.generateView();

    }





    getBuild() {


        return this.currentBuild;

    }





    getSprint() {


        return this.currentSprint;

    }





    getRelease() {


        return this.currentRelease;

    }





    getPipeline() {


        return this.pipeline;

    }





    getSnapshot() {


        return this.lastSnapshot;

    }





    getHistory() {


        return this.history;

    }





    recordHistory(

        event

    ) {


        this.history.push(

            event

        );

    }





    getStatus() {


        return {


            name:

                this.name,


            version:

                this.version,


            status:

                this.status,


            build:

                this.currentBuild
                    ? this.currentBuild.id
                    : null,


            connected:

                Boolean(
                    this.liveController
                )

        };

    }





    shutdown() {


        this.status =
            "SHUTDOWN";


        this.recordHistory({

            type:
                "BUILD_CENTER_SHUTDOWN",

            timestamp:
                new Date()

        });


        return true;

    }

}



module.exports =
    BuildCenterPanel;
