/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Knowledge Runtime
 * File      : knowledge-runtime.js
 *
 * Build     : BUILD-000600.1
 * Version   : 1.0.0
 *
 * Mission:
 * Core runtime layer for Knowledge Objects.
 * ==========================================================
 */


class KnowledgeRuntime {


    constructor(options = {}) {


        this.name =
            "Knowledge Runtime";


        this.version =
            "1.0.0";


        this.status =
            "CREATED";


        this.objects =
            new Map();


        this.lifecycle =
            new Map();


        this.sdkc =
            null;


        this.startedAt =
            null;


        this.options =
            options;

    }




    attachSDKC(connector) {


        this.sdkc =
            connector;


        return true;

    }




    initialize() {


        this.startedAt =
            new Date();


        this.status =
            "READY";


        return true;

    }




    registerKnowledgeObject(object) {


        if (!object.id) {


            throw new Error(
                "Knowledge Object requires id."
            );

        }



        this.objects.set(
            object.id,
            object
        );



        this.lifecycle.set(
            object.id,
            "CREATED"
        );



        if (
            this.sdkc &&
            this.sdkc.isConnected()
        ) {


            this.sdkc
                .saveKnowledgeObject(object);

        }



        return true;

    }




    getKnowledgeObject(id) {


        return (
            this.objects.get(id)
            ||
            null
        );

    }




    updateKnowledgeState(id, state) {


        if (
            !this.objects.has(id)
        ) {

            throw new Error(
                "Knowledge Object not found."
            );

        }



        this.lifecycle.set(
            id,
            state
        );


        return true;

    }




    getKnowledgeState(id) {


        return (

            this.lifecycle.get(id)
            ||
            "UNKNOWN"

        );

    }




    listKnowledgeObjects() {


        return Array.from(
            this.objects.values()
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


            objectCount:
                this.objects.size,


            startedAt:
                this.startedAt


        };

    }




    shutdown() {


        this.status =
            "SHUTDOWN";


        return true;

    }


}



module.exports =
    KnowledgeRuntime;
