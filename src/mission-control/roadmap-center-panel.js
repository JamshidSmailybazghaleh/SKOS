/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Roadmap Center Panel
 * File      : roadmap-center-panel.js
 *
 * Build     : BUILD-000817.1
 * Version   : 1.0.0
 *
 * Mission:
 * Provide strategic roadmap visibility,
 * objectives, milestones and execution
 * alignment inside Mission Control.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class RoadmapCenterPanel {


    constructor(

        liveController = null,

        options = {}

    ) {


        this.name =
            "Roadmap Center Panel";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.liveController =
            liveController;


        this.options =
            options;


        this.roadmap =
            [];


        this.objectives =
            [];


        this.milestones =
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
                "ROADMAP_CENTER_INITIALIZED",

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





    addObjective(

        objectiveId,

        metadata = {}

    ) {


        if (!objectiveId) {


            throw new Error(

                "Objective id required."

            );

        }



        const objective = {


            id:

                objectiveId,


            title:

                metadata.title ||
                objectiveId,


            status:

                metadata.status ||
                "PLANNED",


            priority:

                metadata.priority ||
                "MEDIUM",


            createdAt:

                new Date()

        };



        this.objectives.push(

            objective

        );



        return objective;

    }





    addMilestone(

        milestoneId,

        metadata = {}

    ) {


        if (!milestoneId) {


            throw new Error(

                "Milestone id required."

            );

        }



        const milestone = {


            id:

                milestoneId,


            title:

                metadata.title ||
                milestoneId,


            target:

                metadata.target ||
                null,


            status:

                metadata.status ||
                "PENDING"

        };



        this.milestones.push(

            milestone

        );



        return milestone;

    }





    addRoadmapItem(

        item

    ) {


        if (!item) {


            throw new Error(

                "Roadmap item required."

            );

        }



        this.roadmap.push({

            id:

                item.id ||
                `ROADMAP-${Date.now()}`,

            title:

                item.title ||
                "Untitled",

            phase:

                item.phase ||
                "GENERAL",

            status:

                item.status ||
                "PLANNED"

        });



        return true;

    }





    updateObjectiveStatus(

        objectiveId,

        status

    ) {


        const objective =

            this.objectives.find(

                item =>

                    item.id === objectiveId

            );



        if (!objective) {


            throw new Error(

                "Objective not found."

            );

        }



        objective.status =
            status;



        return objective;

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


            objectives:

                this.objectives,


            milestones:

                this.milestones,


            roadmap:

                this.roadmap,


            progress:

                {

                    objectives:

                        this.objectives.length,

                    milestones:

                        this.milestones.length

                },


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

                "ROADMAP_VIEW_GENERATED",

            timestamp:

                new Date()

        });



        return view;

    }





    refresh() {


        return this.generateView();

    }





    getObjectives() {


        return this.objectives;

    }





    getMilestones() {


        return this.milestones;

    }





    getRoadmap() {


        return this.roadmap;

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


            objectives:

                this.objectives.length,


            milestones:

                this.milestones.length,


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
                "ROADMAP_CENTER_SHUTDOWN",

            timestamp:
                new Date()

        });



        return true;

    }

}



module.exports =
    RoadmapCenterPanel;
