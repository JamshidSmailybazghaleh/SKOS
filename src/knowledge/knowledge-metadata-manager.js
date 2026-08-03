/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Knowledge Metadata Manager
 * File      : knowledge-metadata-manager.js
 *
 * Build     : BUILD-000600.7
 * Version   : 1.0.0
 *
 * Mission:
 * Manage metadata identity of Knowledge Objects.
 * ==========================================================
 */


class KnowledgeMetadataManager {


    constructor() {


        this.name =
            "Knowledge Metadata Manager";


        this.version =
            "1.0.0";


        this.status =
            "READY";


        this.metadataStore =
            new Map();


        this.history =
            new Map();

    }




    create(object, metadata = {}) {


        const record = {


            id:
                object.id,


            knowledgeType:
                object.type,


            title:
                object.title,


            source:
                metadata.source || null,


            author:
                metadata.author || null,


            category:
                metadata.category || null,


            tags:
                metadata.tags || [],


            createdAt:
                new Date(),


            updatedAt:
                new Date()



        };



        this.metadataStore.set(

            object.id,

            record

        );



        this.history.set(

            object.id,

            [

                {

                    action:
                        "CREATED",

                    timestamp:
                        new Date()

                }

            ]

        );



        return record;

    }




    update(id, changes = {}) {


        const metadata =
            this.metadataStore.get(id);



        if (!metadata) {

            throw new Error(
                "Metadata not found."
            );

        }



        Object.assign(

            metadata,

            changes

        );



        metadata.updatedAt =
            new Date();



        this.history
            .get(id)
            .push({

                action:
                    "UPDATED",

                timestamp:
                    new Date()

            });



        return true;

    }




    get(id) {


        return (

            this.metadataStore.get(id)

            ||

            null

        );

    }




    validate(id) {


        const metadata =
            this.metadataStore.get(id);



        if (!metadata)
            return false;



        return (

            metadata.id !== undefined &&

            metadata.knowledgeType !== undefined

        );

    }




    getHistory(id) {


        return (

            this.history.get(id)

            ||

            []

        );

    }




    attach(object, metadata) {


        object.metadata =
            metadata;


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


            records:
                this.metadataStore.size


        };

    }


}



module.exports =
    KnowledgeMetadataManager;
