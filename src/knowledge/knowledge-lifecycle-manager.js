/**
 * ==========================================================
 * SKOS
 * Smaily Knowledge Operating System
 * ==========================================================
 *
 * Component : Knowledge Lifecycle Manager
 * File      : knowledge-lifecycle-manager.js
 *
 * Build     : BUILD-000600.5
 * Version   : 1.0.0
 *
 * Mission:
 * Manage lifecycle of Knowledge Objects.
 * ==========================================================
 */


class KnowledgeLifecycleManager {


    constructor() {


        this.name =
            "Knowledge Lifecycle Manager";


        this.version =
            "1.0.0";


        this.status =
            "READY";


        this.history =
            new Map();


        this.allowedTransitions = {


            CREATED:
                [
                    "VALIDATED",
                    "ACTIVE"
                ],


            VALIDATED:
                [
                    "ACTIVE"
                ],


            ACTIVE:
                [
                    "UPDATED",
                    "VERSIONED",
                    "ARCHIVED"
                ],


            UPDATED:
                [
                    "VERSIONED",
                    "ACTIVE"
                ],


            VERSIONED:
                [
                    "ACTIVE",
                    "ARCHIVED"
                ],


            ARCHIVED:
                []

        };

    }




    initialize(object) {


        this.history.set(

            object.id,

            [

                {

                    state:
                        object.state,

                    timestamp:
                        new Date()

                }

            ]

        );


        return true;

    }




    transition(object, newState) {


        const currentState =
            object.state;



        const allowed =
            this.allowedTransitions[
                currentState
            ];



        if (
            !allowed ||
            !allowed.includes(newState)
        ) {

            throw new Error(

                `Invalid lifecycle transition:
                ${currentState} -> ${newState}`

            );

        }



        object.state =
            newState;



        object.updatedAt =
            new Date();



        this.record(

            object

        );


        return true;

    }




    version(object) {


        const parts =
            object.version
                .split(".")
                .map(Number);



        parts[2]++;


        object.version =
            parts.join(".");


        this.transition(

            object,

            "VERSIONED"

        );


        return object.version;

    }




    archive(object) {


        return this.transition(

            object,

            "ARCHIVED"

        );

    }




    record(object) {


        if (
            !this.history.has(object.id)
        ) {

            this.history.set(

                object.id,

                []

            );

        }



        this.history
            .get(object.id)
            .push({

                state:
                    object.state,

                version:
                    object.version,

                timestamp:
                    new Date()

            });


    }




    getHistory(id) {


        return (

            this.history.get(id)
            ||
            []

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


            trackedObjects:
                this.history.size


        };

    }


}


module.exports =
    KnowledgeLifecycleManager;
