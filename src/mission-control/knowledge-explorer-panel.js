/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Knowledge Explorer Panel
 * File      : knowledge-explorer-panel.js
 *
 * Build     : BUILD-000815.1
 * Version   : 1.0.0
 *
 * Mission:
 * Provide visibility into SKOS knowledge
 * repositories, knowledge objects,
 * semantic structures and knowledge graph state.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class KnowledgeExplorerPanel {


    constructor(

        liveController = null,

        options = {}

    ) {


        this.name =
            "Knowledge Explorer Panel";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.liveController =
            liveController;


        this.options =
            options;


        this.knowledgeObjects =
            [];


        this.repositories =
            [];


        this.semanticLayers =
            [];


        this.graphStatus =
            {

                nodes:
                    0,

                relations:
                    0

            };


        this.lastSnapshot =
            null;


        this.history =
            [];

    }





    initialize() {


        this.status =
            "INITIALIZED";


        this.recordHistory({

            type:
                "KNOWLEDGE_EXPLORER_INITIALIZED",

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





    registerRepository(

        repositoryId,

        metadata = {}

    ) {


        if (!repositoryId) {


            throw new Error(

                "Repository id required."

            );

        }



        const repository = {


            id:

                repositoryId,


            name:

                metadata.name ||
                repositoryId,


            type:

                metadata.type ||
                "KNOWLEDGE",


            status:

                "ACTIVE",


            createdAt:

                new Date()

        };



        this.repositories.push(

            repository

        );



        return repository;

    }





    addKnowledgeObject(

        object

    ) {


        if (!object) {


            throw new Error(

                "Knowledge object required."

            );

        }



        this.knowledgeObjects.push({

            id:

                object.id ||
                `KNOWLEDGE-${Date.now()}`,

            type:

                object.type ||
                "GENERAL",

            title:

                object.title ||
                "Untitled",

            status:

                object.status ||
                "ACTIVE",

            createdAt:

                new Date()

        });



        return true;

    }





    registerSemanticLayer(

        layer

    ) {


        if (!layer) {


            throw new Error(

                "Semantic layer required."

            );

        }



        this.semanticLayers.push(

            layer

        );



        return true;

    }





    updateGraphStatus(

        nodes,

        relations

    ) {


        this.graphStatus = {


            nodes,

            relations,


            updatedAt:

                new Date()

        };



        return true;

    }





    generateView() {


        if (!this.liveController) {


            throw new Error(

                "Live controller not connected."

            );

        }



        const runtimeSnapshot =

            this.liveController
                .getSnapshot();



        const view = {


            title:

                this.name,


            repositories:

                this.repositories.length,


            knowledgeObjects:

                this.knowledgeObjects.length,


            semanticLayers:

                this.semanticLayers.length,


            graph:

                this.graphStatus,


            runtime:

                runtimeSnapshot
                    ? runtimeSnapshot.system
                    : null,


            updatedAt:

                new Date()

        };



        this.lastSnapshot =
            view;



        this.recordHistory({

            type:

                "KNOWLEDGE_VIEW_GENERATED",

            timestamp:

                new Date()

        });



        return view;

    }





    refresh() {


        return this.generateView();

    }





    getRepositories() {


        return this.repositories;

    }





    getKnowledgeObjects() {


        return this.knowledgeObjects;

    }





    getSemanticLayers() {


        return this.semanticLayers;

    }





    getGraphStatus() {


        return this.graphStatus;

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


            repositories:

                this.repositories.length,


            objects:

                this.knowledgeObjects.length,


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
                "KNOWLEDGE_EXPLORER_SHUTDOWN",

            timestamp:
                new Date()

        });



        return true;

    }

}



module.exports =
    KnowledgeExplorerPanel;
