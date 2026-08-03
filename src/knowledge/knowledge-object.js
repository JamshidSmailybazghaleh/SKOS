/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Knowledge Object
 * File      : knowledge-object.js
 *
 * Build     : BUILD-000600.3
 * Version   : 1.0.0
 *
 * Mission:
 * Fundamental unit of knowledge in SKOS.
 * ==========================================================
 */


class KnowledgeObject {


    constructor(data = {}) {


        if (!data.id) {

            throw new Error(
                "Knowledge Object requires id."
            );

        }


        this.id =
            data.id;


        this.type =
            data.type || "UNKNOWN";


        this.title =
            data.title || "";


        this.content =
            data.content || null;


        this.metadata =
            data.metadata || {};



        this.version =
            data.version || "1.0.0";



        this.state =
            "CREATED";



        this.createdAt =
            new Date();



        this.updatedAt =
            new Date();

    }




    update(data = {}) {


        if (data.title !== undefined) {

            this.title =
                data.title;

        }


        if (data.content !== undefined) {

            this.content =
                data.content;

        }


        if (data.metadata !== undefined) {

            this.metadata =
                data.metadata;

        }


        this.updatedAt =
            new Date();



        return true;

    }




    activate() {


        this.state =
            "ACTIVE";


        this.updatedAt =
            new Date();


        return true;

    }




    archive() {


        this.state =
            "ARCHIVED";


        this.updatedAt =
            new Date();


        return true;

    }




    validate() {


        return (

            this.id !== undefined &&
            this.type !== undefined

        );

    }




    getIdentity() {


        return {

            id:
                this.id,

            type:
                this.type,

            version:
                this.version

        };

    }




    getStatus() {


        return {


            id:
                this.id,


            type:
                this.type,


            state:
                this.state,


            version:
                this.version,


            createdAt:
                this.createdAt,


            updatedAt:
                this.updatedAt


        };

    }


}



module.exports =
    KnowledgeObject;
