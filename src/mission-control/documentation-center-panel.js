/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Documentation Center Panel
 * File      : documentation-center-panel.js
 *
 * Build     : BUILD-000818.1
 * Version   : 1.0.0
 *
 * Mission:
 * Provide centralized visibility into
 * SKOS documentation ecosystem,
 * standards, specifications and
 * organizational memory.
 *
 * Copyright © Smaily Knowledge Foundation
 * ==========================================================
 */


class DocumentationCenterPanel {


    constructor(

        liveController = null,

        options = {}

    ) {


        this.name =
            "Documentation Center Panel";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.liveController =
            liveController;


        this.options =
            options;


        this.documents =
            [];


        this.categories =
            new Map();


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
                "DOCUMENTATION_CENTER_INITIALIZED",

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





    registerCategory(

        categoryId,

        metadata = {}

    ) {


        if (!categoryId) {


            throw new Error(

                "Category id required."

            );

        }



        const category = {


            id:

                categoryId,


            name:

                metadata.name ||
                categoryId,


            description:

                metadata.description ||
                null,


            createdAt:

                new Date()

        };



        this.categories.set(

            categoryId,

            category

        );



        return category;

    }





    addDocument(

        documentId,

        metadata = {}

    ) {


        if (!documentId) {


            throw new Error(

                "Document id required."

            );

        }



        const document = {


            id:

                documentId,


            title:

                metadata.title ||
                documentId,


            type:

                metadata.type ||
                "GENERAL",


            category:

                metadata.category ||
                null,


            version:

                metadata.version ||
                "1.0.0",


            status:

                metadata.status ||
                "ACTIVE",


            createdAt:

                new Date()

        };



        this.documents.push(

            document

        );



        return document;

    }





    updateDocumentStatus(

        documentId,

        status

    ) {


        const document =

            this.documents.find(

                item =>

                    item.id === documentId

            );



        if (!document) {


            throw new Error(

                "Document not found."

            );

        }



        document.status =
            status;



        return document;

    }





    getDocuments() {


        return this.documents;

    }





    getDocumentsByType(

        type

    ) {


        return this.documents.filter(

            document =>

                document.type === type

        );

    }





    getCategories() {


        return Array.from(

            this.categories.values()

        );

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


            documents:

                this.documents,


            categories:

                this.getCategories(),


            statistics:

                {

                    totalDocuments:

                        this.documents.length,


                    categories:

                        this.categories.size

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

                "DOCUMENTATION_VIEW_GENERATED",

            timestamp:

                new Date()

        });



        return view;

    }





    refresh() {


        return this.generateView();

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


            documents:

                this.documents.length,


            categories:

                this.categories.size,


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
                "DOCUMENTATION_CENTER_SHUTDOWN",

            timestamp:
                new Date()

        });



        return true;

    }

}



module.exports =
    DocumentationCenterPanel;
