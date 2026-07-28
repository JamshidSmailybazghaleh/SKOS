/*
====================================================
SKOS Mission Control

Object Lifecycle Service

File:
object-lifecycle-service.js

Version:
1.0

Status:
ACTIVE
====================================================
*/


const ObjectLifecycleService = {


    states: [

        "DRAFT",

        "VALIDATING",

        "VALIDATED",

        "ACTIVE",

        "UPDATED",

        "PUBLISHED",

        "ARCHIVED"

    ],


    async initialize() {

        Logger.info(
            "Object Lifecycle Service Initializing..."
        );

        return true;

    },


    validateState(state) {


        return this.states.includes(
            state
        );


    },


    async changeState(
        object,
        newState
    ) {


        if (!object) {

            Logger.error(
                "Object Missing."
            );

            return false;

        }


        if (
            !this.validateState(newState)
        ) {

            Logger.error(

                "Invalid Lifecycle State: " +
                newState

            );

            return false;

        }


        const previous =

            object.status;


        object.status = newState;


        if (!object.lifecycle) {

            object.lifecycle = [];

        }


        object.lifecycle.push({

            from: previous,

            to: newState,

            timestamp:

                new Date()
                .toISOString()

        });


        Logger.info(

            "Object Lifecycle Changed: " +

            object.id +

            " " +

            previous +

            " -> " +

            newState

        );


        if (window.EventBus) {

            EventBus.publish(

                "object.lifecycle.changed",

                {

                    id:
                        object.id,

                    from:
                        previous,

                    to:
                        newState

                }

            );

        }


        return true;

    },


    canTransition(
        from,
        to
    ) {


        const transitions = {


            DRAFT: [

                "VALIDATING"

            ],


            VALIDATING: [

                "VALIDATED"

            ],


            VALIDATED: [

                "ACTIVE"

            ],


            ACTIVE: [

                "UPDATED",

                "PUBLISHED",

                "ARCHIVED"

            ],


            UPDATED: [

                "ACTIVE",

                "PUBLISHED"

            ],


            PUBLISHED: [

                "ARCHIVED",

                "UPDATED"

            ],


            ARCHIVED: []

        };


        return (

            transitions[from] &&

            transitions[from]
            .includes(to)

        );

    },


    getHistory(object) {


        return (

            object.lifecycle ||

            []

        );


    },


    getStatus(object) {


        return (

            object.status ||

            "UNKNOWN"

        );


    },


    async archive(object) {


        return await this.changeState(

            object,

            "ARCHIVED"

        );


    },


    status() {

        return "READY";

    }


};


window.ObjectLifecycleService =

    ObjectLifecycleService;


Object.freeze(
    ObjectLifecycleService
);
